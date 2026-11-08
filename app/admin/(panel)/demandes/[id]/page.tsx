import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Mail, MessageCircle, Phone, TriangleAlert } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { updateRequest } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";
import { formatDate, statuses, type QuoteRequest } from "@/lib/quote";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-cyan">{label}</dt>
      <dd className="mt-1.5 break-words text-ink">{children || <span className="text-ink-faint">Non renseigné</span>}</dd>
    </div>
  );
}

export default async function RequestDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ enregistre?: string; erreur?: string }>;
}) {
  const { id } = await params;
  const { enregistre, erreur } = await searchParams;
  if (!UUID_RE.test(id)) notFound();

  const supabase = await createClient();
  const { data } = await supabase.from("quote_requests").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const r = data as QuoteRequest;

  // Lien WhatsApp uniquement si le numéro est au format international (+…).
  const digits = r.phone.replace(/\D/g, "");
  const waHref = r.phone.trim().startsWith("+") && digits.length >= 8 ? `https://wa.me/${digits}` : null;

  return (
    <div className="space-y-8">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-ink-muted transition hover:text-white">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Retour aux demandes
      </Link>

      {enregistre && (
        <div role="status" className="flex items-center gap-3 rounded-xl border border-brand-green/40 bg-brand-green/10 p-4 text-sm text-brand-green">
          <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />
          Modifications enregistrées.
        </div>
      )}
      {erreur && (
        <div role="alert" className="flex items-center gap-3 rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-sm text-red-200">
          <TriangleAlert className="h-5 w-5 shrink-0" aria-hidden />
          La modification n'a pas pu être enregistrée. Réessayez.
        </div>
      )}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{r.full_name}</h1>
          <p className="mt-2 text-ink-muted">
            {r.organization}
            {r.job_title ? ` · ${r.job_title}` : ""}
          </p>
          <p className="mt-1 text-sm text-ink-faint">Reçue le {formatDate(r.created_at, true)}</p>
        </div>
        <StatusBadge status={r.status} />
      </div>

      <div className="flex flex-wrap gap-3">
        <a href={`mailto:${r.email}`} className="btn-ghost !py-2.5"><Mail className="h-4 w-4" aria-hidden />Écrire</a>
        <a href={`tel:${r.phone.replace(/[^\d+]/g, "")}`} className="btn-ghost !py-2.5"><Phone className="h-4 w-4" aria-hidden />Appeler</a>
        {waHref && (
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">
            <MessageCircle className="h-4 w-4 text-brand-green" aria-hidden />WhatsApp
          </a>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="card p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Détail de la demande</h2>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <Info label="Email">{r.email}</Info>
            <Info label="Téléphone">{r.phone}</Info>
            <Info label="Secteur">{r.sector}</Info>
            <Info label="Solution recherchée">{r.solution_type}</Info>
            <Info label="Budget indicatif">{r.budget}</Info>
            <Info label="Délai souhaité">{r.deadline}</Info>
          </dl>
          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-cyan">Description du problème</h3>
            {/* whitespace-pre-wrap conserve les retours à la ligne ; React échappe le contenu (aucun HTML interprété). */}
            <p className="mt-2 whitespace-pre-wrap break-words leading-relaxed text-ink">{r.description}</p>
          </div>
        </section>

        <section className="card p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Suivi</h2>
          <form action={updateRequest} className="mt-6 space-y-5">
            <input type="hidden" name="id" value={r.id} />
            <div>
              <label htmlFor="status" className="label">Statut</label>
              <select id="status" name="status" defaultValue={r.status} className="input">
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="admin_notes" className="label">Notes internes</label>
              <textarea id="admin_notes" name="admin_notes" rows={7} maxLength={5000} defaultValue={r.admin_notes ?? ""}
                placeholder="Échanges, prochaine étape, montant proposé…" className="input resize-y" />
              <p className="mt-1.5 text-xs text-ink-faint">Visibles uniquement par l'administration.</p>
            </div>
            <button type="submit" className="btn-primary w-full">Enregistrer</button>
            <p className="text-xs text-ink-faint">Dernière modification : {formatDate(r.updated_at, true)}</p>
          </form>
        </section>
      </div>
    </div>
  );
}
