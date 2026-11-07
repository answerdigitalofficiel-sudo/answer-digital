import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="eyebrow">Nos services</span>
          <h2 className="section-title">
            Neuf expertises pour <span className="gradient-text">faire avancer votre organisation</span>
          </h2>
          <p className="section-lead">
            Du site internet au système d'information complet, nous couvrons l'ensemble de vos besoins
            numériques avec une même exigence de qualité.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ slug, title, summary, icon: Icon }) => (
            <li key={slug} className="card-hover group p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-green ring-1 ring-white/10 transition group-hover:text-brand-lime">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold leading-snug">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
