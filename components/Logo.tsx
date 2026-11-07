import Image from "next/image";

/**
 * Logo officiel ANSWER DIGITAL.
 * Les fichiers proviennent des logos fournis (simple recadrage des marges).
 * Ne jamais déformer, redessiner ni recolorer.
 */
export function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-horizontal.png"
      alt="ANSWER DIGITAL — Technology. Innovation. Solutions."
      width={1108}
      height={460}
      priority
      className={className}
    />
  );
}

export function LogoSymbol({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-symbol.png"
      alt="ANSWER DIGITAL"
      width={563}
      height={563}
      className={className}
    />
  );
}
