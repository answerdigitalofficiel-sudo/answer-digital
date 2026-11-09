"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { nav } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu avec la touche Échap et verrouille le défilement quand il est ouvert.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-navy-950/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between">
        <Link href="/#accueil" aria-label="ANSWER DIGITAL — retour à l'accueil" className="shrink-0">
          <Logo className="h-11 w-auto sm:h-12" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.slice(1, -1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/diagnostic"
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition hover:bg-white/[0.06] hover:text-white"
              >
                Diagnostic
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/devis" className="btn-primary hidden !py-2.5 sm:inline-flex">
            Parler de votre projet
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-mobile" className="container-x pb-8 lg:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-white/10">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-lg font-medium text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-white/10">
              <Link href="/diagnostic" onClick={() => setOpen(false)} className="block py-4 text-lg font-medium text-white">
                Diagnostic numérique
              </Link>
            </li>
          </ul>
          <Link
            href="/devis"
            onClick={() => setOpen(false)}
            className="btn-primary mt-6 w-full"
          >
            Parler de votre projet
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      )}
    </header>
  );
}
