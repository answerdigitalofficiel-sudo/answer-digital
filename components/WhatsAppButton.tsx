import { whatsappLink } from "@/lib/content";

/** Bouton WhatsApp flottant, visible sur toutes les pages publiques. */
export function WhatsAppButton() {
  const href = whatsappLink("Bonjour ANSWER DIGITAL, je viens de votre site et je souhaite discuter de mon projet.");
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrire à ANSWER DIGITAL sur WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition duration-200 hover:scale-105 hover:shadow-[0_14px_36px_-8px_rgba(37,211,102,0.85)] sm:bottom-7 sm:right-7 sm:pr-5"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden>
        <path d="M16.02 3C9.38 3 4 8.37 4 15c0 2.35.68 4.55 1.86 6.4L4 29l7.77-1.82A12 12 0 0 0 16.02 27C22.65 27 28 21.63 28 15S22.65 3 16.02 3zm0 21.8c-1.8 0-3.5-.5-4.95-1.36l-.36-.21-4.6 1.08 1.1-4.48-.23-.37A9.78 9.78 0 0 1 6.2 15c0-5.42 4.4-9.8 9.82-9.8 5.4 0 9.8 4.38 9.8 9.8s-4.4 9.8-9.8 9.8zm5.4-7.34c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      </svg>
      <span className="hidden text-sm font-semibold sm:inline">Écrire sur WhatsApp</span>
    </a>
  );
}
