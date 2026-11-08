import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Vrai si les variables d'environnement Supabase sont renseignées. */
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/**
 * Client Supabase côté serveur (actions serveur, pages serveur).
 * Utilise la clé publique : toutes les autorisations passent par les règles RLS de la base.
 * La clé « service_role » n'est jamais utilisée dans ce projet.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Appelé depuis un composant serveur : le middleware rafraîchit déjà la session.
          }
        },
      },
    },
  );
}
