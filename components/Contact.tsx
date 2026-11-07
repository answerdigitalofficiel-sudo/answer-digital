import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { mailto, site } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-navy-900 px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="grid-pattern absolute inset-0 opacity-70" aria-hidden />
          <div className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand-gradient opacity-20 blur-3xl" aria-hidden />

          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow">Contact</span>
            <h2 className="section-title">
              Parlons de <span className="gradient-text">votre projet</span>
            </h2>
            <p className="section-lead mx-auto">
              Décrivez-nous votre difficulté : nous vous répondons avec une première orientation claire
              et réaliste.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={mailto()} className="btn-primary">
                <Mail className="h-4 w-4" aria-hidden />
                Nous écrire
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 text-sm text-ink-muted sm:flex-row sm:gap-8">
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-brand-cyan" aria-hidden />
                {site.email}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-green" aria-hidden />
                {site.city}, {site.country}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
