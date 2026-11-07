import { Check } from "lucide-react";
import { approach, site } from "@/lib/content";
import { LogoSymbol } from "./Logo";

const points = [
  "Nous partons de votre problème réel avant de proposer une technologie.",
  "Des solutions sur mesure, conçues pour durer et évoluer avec vous.",
  "Un accompagnement de l'idée jusqu'à la maintenance.",
];

export function About() {
  return (
    <section id="a-propos" className="section">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 rounded-[2rem] bg-brand-gradient-soft blur-2xl" aria-hidden />
            <div className="card relative flex aspect-square items-center justify-center overflow-hidden !rounded-[2rem]">
              <div className="grid-pattern absolute inset-0" aria-hidden />
              <LogoSymbol className="relative h-3/4 w-3/4 rounded-2xl" />
            </div>
          </div>

          <div>
            <span className="eyebrow">À propos</span>
            <h2 className="section-title">
              La technologie au service des <span className="gradient-text">organisations</span>
            </h2>
            <p className="section-lead">
              {site.name} est une entreprise de développement technologique basée à {site.city}. Nous
              accompagnons entreprises, institutions, universités, ONG, associations et
              entrepreneurs dans la résolution de leurs problèmes opérationnels grâce au numérique.
            </p>
            <ul className="mt-8 space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-center text-xl font-semibold sm:text-2xl">Notre méthode</h3>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((a) => (
              <li key={a.step} className="card p-6">
                <span className="gradient-text font-display text-3xl font-semibold">{a.step}</span>
                <h4 className="mt-4 text-lg font-semibold">{a.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{a.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
