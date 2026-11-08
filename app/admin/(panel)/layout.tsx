import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, ShieldAlert } from "lucide-react";
import { Logo } from "@/components/Logo";
import { logout } from "@/app/admin/actions";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Enveloppe de toutes les pages protégées de l'administration.
 * 1) il faut être connecté ; 2) il faut figurer dans la table admin_users.
 */
export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) redirect("/admin/login");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <div className="card max-w-md p-8 text-center">
          <ShieldAlert className="mx-auto h-10 w-10 text-amber-300" aria-hidden />
          <h1 className="mt-5 text-xl font-semibold">Accès refusé</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Le compte {user.email} n'a pas les droits d'administration. Contactez le responsable du site.
          </p>
          <form action={logout} className="mt-6">
            <button type="submit" className="btn-ghost">Se déconnecter</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-950/90 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" aria-label="Tableau de bord">
              <Logo className="h-10 w-auto" />
            </Link>
            <span className="hidden rounded-full border border-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-ink-muted sm:inline">
              Administration
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden text-sm text-ink-muted transition hover:text-white sm:inline">
              Voir le site
            </Link>
            <span className="hidden max-w-[14rem] truncate text-sm text-ink-faint md:inline">{user.email}</span>
            <form action={logout}>
              <button type="submit" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:border-white/30 hover:bg-white/[0.06]">
                <LogOut className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </form>
          </div>
        </div>
      </header>
      <main id="contenu" className="container-x py-10">{children}</main>
    </div>
  );
}
