import { services } from "@/lib/content";

/** Bandeau défilant des services proposés (contenu réel, tiré de la liste des services). */
export function Marquee() {
  const items = services.map((s) => s.title);
  const loop = [...items, ...items];
  return (
    <div
      className="marquee relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      aria-label="Nos services"
    >
      <ul className="marquee-track">
        {loop.map((title, i) => (
          <li
            key={`${title}-${i}`}
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center gap-6 pr-6 text-sm font-medium uppercase tracking-[0.16em] text-ink-muted"
          >
            <span>{title}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}
