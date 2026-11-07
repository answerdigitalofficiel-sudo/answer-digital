import { advantages } from "@/lib/content";

export function WhyUs() {
  return (
    <section id="avantages" className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-navy-800/60 px-6 py-14 sm:px-12 sm:py-20">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-gradient opacity-15 blur-3xl" aria-hidden />
          <div className="relative max-w-3xl">
            <span className="eyebrow">Pourquoi ANSWER DIGITAL</span>
            <h2 className="section-title">
              Un partenaire qui <span className="gradient-text">résout</span>, pas seulement un
              prestataire qui livre
            </h2>
          </div>
          <ul className="relative mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {advantages.map((a, i) => (
              <li key={a.title} className="flex gap-5">
                <span className="gradient-text font-display text-2xl font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
