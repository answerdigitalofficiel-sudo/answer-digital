import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { LogoSymbol } from "./Logo";

export function Showcase() {
  return (
    <section id="realisations" className="section">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="eyebrow">Nos réalisations</span>
          <h2 className="section-title">
            Des projets <span className="gradient-text">concrets</span>, pas des promesses
          </h2>
          <p className="section-lead">
            Voici ce que nous avons déjà construit. Chaque projet est présenté tel qu'il est, avec son
            statut réel.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {projects.map((p) => (
            <article key={p.slug} className="card grid overflow-hidden lg:grid-cols-[0.8fr_1.2fr]">
              {/* Zone visuelle : capture d'écran si disponible */}
              <div className="relative flex min-h-[18rem] items-center justify-center overflow-hidden bg-navy-900 p-8">
                <div className="grid-pattern absolute inset-0" aria-hidden />
                <div className="absolute -inset-10 bg-brand-gradient-soft blur-3xl" aria-hidden />
                <div className="relative w-44 rounded-[1.8rem] border border-white/15 bg-navy-950 p-2 shadow-card">
                  <div className="flex aspect-[9/17] items-center justify-center overflow-hidden rounded-[1.4rem] bg-navy-800">
                    {p.screenshot ? (
                      <Image
                        src={p.screenshot}
                        alt={`Capture d'écran de ${p.name}`}
                        width={360}
                        height={680}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <LogoSymbol className="h-24 w-24 rounded-xl opacity-90" />
                    )}
                  </div>
                </div>
              </div>

              <div className="p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-brand-green/15 px-3 py-1 text-xs font-semibold text-brand-green">
                    {p.status}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-ink-muted">
                    {p.kind}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">{p.name}</h3>
                <p className="mt-4 leading-relaxed text-ink-muted">{p.description}</p>

                <dl className="mt-7 grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-cyan">
                      Problème initial
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{p.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
                      Solution développée
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{p.solution}</dd>
                  </div>
                </dl>

                {p.demoUrl && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-8"
                  >
                    Voir la démonstration
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
