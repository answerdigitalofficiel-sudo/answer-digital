import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
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

        <div className="mt-14 space-y-10">
          {projects.map((p) => (
            <article key={p.slug} className="card overflow-hidden">
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
                <p className="mt-4 max-w-3xl leading-relaxed text-ink-muted">{p.description}</p>

                <dl className="mt-8 grid gap-8 lg:grid-cols-3">
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
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-lime">
                      Fonctionnalités
                    </dt>
                    <dd className="mt-2">
                      <ul className="space-y-2">
                        {p.features.map((f) => (
                          <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                {p.demoUrl && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-9"
                  >
                    Ouvrir l'application
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                )}
              </div>

              {/* Captures d'écran réelles */}
              <div className="relative border-t border-white/10 bg-navy-900 px-5 py-10 sm:px-10">
                <div className="grid-pattern absolute inset-0" aria-hidden />
                <div className="absolute -inset-10 bg-brand-gradient-soft blur-3xl" aria-hidden />
                <ul className="relative mx-auto flex max-w-5xl snap-x snap-mandatory gap-5 overflow-x-auto pb-2 sm:justify-center sm:overflow-visible">
                  {p.screenshots.length > 0 ? (
                    p.screenshots.map((s) => (
                      <li
                        key={s.src}
                        className="w-44 shrink-0 snap-center rounded-[1.7rem] border border-white/15 bg-navy-950 p-1.5 shadow-card sm:w-52"
                      >
                        <Image
                          src={s.src}
                          alt={s.alt}
                          width={540}
                          height={1100}
                          className="h-auto w-full rounded-[1.35rem]"
                        />
                      </li>
                    ))
                  ) : (
                    <li className="flex h-64 w-44 items-center justify-center rounded-[1.7rem] border border-white/15 bg-navy-950">
                      <LogoSymbol className="h-24 w-24 rounded-xl" />
                    </li>
                  )}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
