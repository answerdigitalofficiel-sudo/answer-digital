import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { formatDate, type QuoteRequest } from "@/lib/quote";

export const dynamic = "force-dynamic";

/** Neutralise l'injection de formules (Excel) et protège les champs CSV. */
const cell = (value: unknown): string => {
  let s = value == null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

/** Export CSV de toutes les demandes de devis. Réservé aux administrateurs (contrôle refait ici). */
export async function GET() {
  if (!isSupabaseConfigured()) return new NextResponse("Service indisponible", { status: 503 });

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Non autorisé", { status: 401 });
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) return new NextResponse("Accès refusé", { status: 403 });

  const { data, error } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10000);
  if (error) return new NextResponse("Erreur de lecture", { status: 500 });

  const rows = (data ?? []) as QuoteRequest[];
  const header = ["Date", "Nom", "Organisation", "Fonction", "Email", "Téléphone", "Secteur", "Solution", "Budget", "Délai", "Statut", "Description", "Notes internes"];
  const lines = rows.map((r) =>
    [
      formatDate(r.created_at, true), r.full_name, r.organization, r.job_title, r.email, r.phone,
      r.sector, r.solution_type, r.budget, r.deadline, r.status, r.description, r.admin_notes,
    ].map(cell).join(","),
  );
  const csv = "﻿" + [header.map(cell).join(","), ...lines].join("\r\n");
  const day = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="demandes-answer-digital-${day}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
