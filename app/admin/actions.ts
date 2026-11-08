"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { statusValues } from "@/lib/quote";

export type LoginState = { error?: string };

/** Connexion de l'administrateur (email + mot de passe Supabase Auth). */
export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isSupabaseConfigured()) {
    return { error: "La connexion n'est pas encore configurée sur ce site." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Renseignez votre email et votre mot de passe." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  // Message volontairement générique : on ne révèle pas si l'adresse existe.
  if (error) return { error: "Identifiants incorrects." };

  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/**
 * Met à jour le statut et les notes internes d'une demande.
 * Même si cette action était appelée par un non-administrateur, la base (RLS) refuserait la modification.
 */
export async function updateRequest(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const notes = String(formData.get("admin_notes") ?? "").trim();

  if (!/^[0-9a-f-]{36}$/i.test(id) || !(statusValues as string[]).includes(status) || notes.length > 5000) {
    redirect(`/admin/demandes/${encodeURIComponent(id)}?erreur=1`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quote_requests")
    .update({ status, admin_notes: notes || null })
    .eq("id", id)
    .select("id");

  if (error || !data || data.length === 0) {
    if (error) console.error("[admin] mise à jour impossible :", error.code, error.message);
    redirect(`/admin/demandes/${id}?erreur=1`);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/demandes/${id}`);
  redirect(`/admin/demandes/${id}?enregistre=1`);
}
