"use client";

import { useState } from "react";
import { sectors } from "@/lib/content";

const columns = [
  { key: "challenges", title: "Difficultés courantes", dot: "bg-brand-cyan" },
  { key: "solutions", title: "Solutions envisageables", dot: "bg-brand-green" },
  { key: "benefits", title: "Bénéfices attendus", dot: "bg-brand-lime" },
] as const;

export function Solutions() {
  const [activeId, setActiveId] = useState(sectors[0].id);
  const active = sectors.find((s) => s.id === activeId) ?? sectors[0];

  return (
    <section id="solutions" className="section">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="eyebrow">Nos solutions</span>
          <h2 className="section-title">
            Des solutions adaptées à <span className="gradient-text">votre secteur</span>
          </h2>
          <p className="section-lead">
            Chaque secteur a ses contraintes. Choisissez le vôtre pour découvrir les difficultés que nous
            rencontrons le plus souvent et les réponses technologiques que nous pouvons concevoir.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Secteurs d'activité"
          className="-mx-5 mt-12 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {sectors.map(({ id, label, icon: Icon }) => {
            const selected = id === activeId;
            return (
              <button
                key={id}
                role="tab"
                id={`tab-${id}`}
                aria-selected={selected}
                aria-controls={`panel-${id}`}
                type="button"
                onClick={() => setActiveId(id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                  selected
                    ? "border-transparent bg-brand-gradient text-navy-950"
                    : "border-white/10 bg-white/[0.04] text-ink-muted hover:border-white/25 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="mt-8 grid gap-5 lg:grid-cols-3"
        >
          {columns.map(({ key, title, dot }) => (
            <div key={key} className="card p-7">
              <h3 className="flex items-center gap-2.5 text-base font-semibold">
                <span className={`h-2.5 w-2.5 rounded-full ${dot}`} aria-hidden />
                {title}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {active[key].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-ink-faint">
          Ces solutions sont conçues sur mesure selon votre besoin. Les projets déjà réalisés sont
          présentés dans la section « Réalisations ».
        </p>
      </div>
    </section>
  );
}
