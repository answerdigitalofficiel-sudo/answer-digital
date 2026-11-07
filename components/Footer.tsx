import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1.4fr]">
          <div>
            <Logo className="h-14 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              « Nous ne vendons pas seulement la technologie. Nous apportons des solutions. »
            </p>
          </div>

          <nav aria-label="Pied de page">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Navigation</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ink-muted transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-ink-muted">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-brand-cyan" aria-hidden />
                <a href={`mailto:${site.email}`} className="transition hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-brand-green" aria-hidden />
                {site.city}, {site.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </p>
          <p>{site.signature}</p>
        </div>
      </div>
    </footer>
  );
}
