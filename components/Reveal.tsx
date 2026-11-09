"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Apparition douce d'un bloc quand il entre dans l'écran.
 * Sans JavaScript (ou si l'utilisateur préfère moins d'animations), le contenu reste simplement visible :
 * la classe « js » est ajoutée par un script en tête de page, et les règles CSS correspondantes
 * sont désactivées par prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`rv ${className}`}
    >
      {children}
    </div>
  );
}
