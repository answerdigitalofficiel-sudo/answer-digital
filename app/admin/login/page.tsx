import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LoginForm } from "@/components/admin/LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default function AdminLoginPage() {
  return (
    <main id="contenu" className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <Link href="/" aria-label="Retour au site">
            <Logo className="h-14 w-auto" />
          </Link>
        </div>

        <div className="card mt-10 p-7 sm:p-9">
          <h1 className="text-2xl font-semibold">Administration</h1>
          <p className="mt-2 text-sm text-ink-muted">Accès réservé à l'équipe d'ANSWER DIGITAL.</p>

          <div className="mt-7">
            {isSupabaseConfigured() ? (
              <LoginForm />
            ) : (
              <p role="alert" className="rounded-xl border border-amber-300/40 bg-amber-300/10 p-4 text-sm text-amber-200">
                La connexion n'est pas encore configurée : les variables d'environnement Supabase sont manquantes.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
