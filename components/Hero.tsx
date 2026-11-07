import Link from "next/link";
import { ArrowRight, ArrowUpRight, Smartphone, Workflow, ShieldCheck } from "lucide-react";

/** Illustration d'interface (100 % CSS) : aucune fausse donnée chiffrée. */
function InterfaceIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]" aria-hidden>
      <div className="absolute -inset-10 rounded-full bg-brand-gradient opacity-20 blur-3xl" />

      {/* Fenêtre d'application */}
      <div className="card relative overflow-hidden !bg-navy-900/90">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-3 h-5 flex-1 rounded-md bg-white/[0.06]" />
        </div>
        <div className="grid grid-cols-[4.5rem_1fr] gap-4 p-4 sm:grid-cols-[5.5rem_1fr] sm:p-5">
          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-8 rounded-lg ${i === 0 ? "bg-brand-gradient" : "bg-white/[0.06]"}`}
              />
            ))}
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {["from-brand-cyan/40", "from-brand-green/40", "from-brand-lime/40"].map((c) => (
                <div key={c} className={`h-16 rounded-xl bg-gradient-to-br ${c} to-transparent border border-white/10`} />
              ))}
            </div>
            {/* Courbe décorative */}
            <div className="relative h-36 rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:h-44">
              <svg viewBox="0 0 300 120" className="h-full w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hero-line" x1="0" x2="1">
                    <stop offset="0" stopColor="#21d3ed" />
                    <stop offset="0.55" stopColor="#4ade80" />
                    <stop offset="1" stopColor="#a3e636" />
                  </linearGradient>
                  <linearGradient id="hero-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#4ade80" stopOpacity="0.28" />
                    <stop offset="1" stopColor="#4ade80" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 95 C 40 90, 55 60, 95 66 S 160 90, 195 48 S 265 18, 300 10 L300 120 L0 120 Z" fill="url(#hero-fill)" />
                <path d="M0 95 C 40 90, 55 60, 95 66 S 160 90, 195 48 S 265 18, 300 10" fill="none" stroke="url(#hero-line)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-4/5 rounded bg-white/[0.07]" />
              <div className="h-3 w-3/5 rounded bg-white/[0.05]" />
            </div>
          </div>
        </div>
      </div>

      {/* Téléphone */}
      <div className="absolute -bottom-8 -right-2 w-28 animate-float rounded-[1.6rem] border border-white/15 bg-navy-950 p-2 shadow-card sm:-right-6 sm:w-32">
        <div className="space-y-2 rounded-[1.2rem] bg-navy-800 p-2.5">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-white/20" />
          <div className="h-14 rounded-lg bg-brand-gradient opacity-90" />
          <div className="h-2.5 w-4/5 rounded bg-white/10" />
          <div className="h-2.5 w-3/5 rounded bg-white/10" />
          <div className="h-8 rounded-lg bg-white/[0.07]" />
        </div>
      </div>

      {/* Pastilles flottantes */}
      <div className="card absolute -left-3 top-10 hidden items-center gap-2.5 !rounded-full !bg-navy-950/90 py-2 pl-2 pr-4 sm:flex lg:-left-10">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cyan/15 text-brand-cyan">
          <Smartphone className="h-4 w-4" />
        </span>
        <span className="text-xs font-semibold text-white">Applications PWA</span>
      </div>
      <div className="card absolute -right-2 top-1/3 hidden items-center gap-2.5 !rounded-full !bg-navy-950/90 py-2 pl-2 pr-4 sm:flex lg:-right-8">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
          <Workflow className="h-4 w-4" />
        </span>
        <span className="text-xs font-semibold text-white">Automatisation</span>
      </div>
      <div className="card absolute -bottom-6 left-6 hidden items-center gap-2.5 !rounded-full !bg-navy-950/90 py-2 pl-2 pr-4 sm:flex">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-lime/15 text-brand-lime">
          <ShieldCheck className="h-4 w-4" />
        </span>
        <span className="text-xs font-semibold text-white">Données sécurisées</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div className="grid-pattern pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="reveal">
          <span className="eyebrow">Technology · Innovation · Solutions</span>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            Vos défis méritent des <span className="gradient-text">solutions intelligentes.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Nous concevons des applications, plateformes web et systèmes numériques qui transforment
            les défis des organisations en opportunités de croissance.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/#services" className="btn-primary">
              Découvrir nos solutions
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/#contact" className="btn-ghost">
              Parler de votre projet
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <p className="mt-8 text-sm text-ink-faint">
            Entreprises · Institutions · Universités · ONG · Associations · Organisations religieuses
          </p>
        </div>

        <div className="reveal [animation-delay:150ms]">
          <InterfaceIllustration />
        </div>
      </div>
    </section>
  );
}
