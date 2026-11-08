import type { Metadata } from "next";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteForm } from "@/components/QuoteForm";
import { mailto, site, whatsappLink } from "@/lib/content";

export const metadata: Metadata = {
  title: "Demander un devis",
  description:
    "Décrivez votre projet à ANSWER DIGITAL : application, plateforme web, site internet, digitalisation. Nous étudions votre demande et revenons vers vous.",
};

const steps = [
  { title: "Vous décrivez votre besoin", text: "Quelques minutes suffisent pour nous expliquer votre difficulté." },
  { title: "Nous étudions votre demande", text: "Nous analysons votre situation et les solutions envisageables." },
  { title: "Nous revenons vers vous", text: "Nous vous contactons pour échanger et vous faire une proposition adaptée." },
];

export default function DevisPage() {
  const wa = whatsappLink("Bonjour ANSWER DIGITAL, je souhaite discuter de mon projet.");

  return (
    <>
      <Header />
      <main id="contenu" className="pb-8 pt-32 sm:pt-40">
        <div className="container-x">
          <div className="max-w-3xl">
            <span className="eyebrow">Demande de devis</span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
              Parlons de <span className="gradient-text">votre projet</span>
            </h1>
            <p className="section-lead">
              Décrivez-nous votre difficulté. Plus votre description est précise, plus notre première
              réponse sera utile.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <QuoteForm whatsappHref={wa} />

            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="card p-7">
                <h2 className="text-lg font-semibold">Et ensuite ?</h2>
                <ol className="mt-5 space-y-5">
                  {steps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="gradient-text font-display text-xl font-semibold">{i + 1}</span>
                      <div>
                        <p className="font-medium text-white">{s.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card p-7">
                <h2 className="text-lg font-semibold">Préférez-vous nous écrire ?</h2>
                <ul className="mt-5 space-y-4 text-sm text-ink-muted">
                  {wa && (
                    <li>
                      <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition hover:text-white">
                        <MessageCircle className="h-5 w-5 text-brand-green" aria-hidden />
                        WhatsApp : {site.whatsappDisplay}
                      </a>
                    </li>
                  )}
                  <li>
                    <a href={mailto("Demande de devis")} className="flex items-center gap-3 transition hover:text-white">
                      <Mail className="h-5 w-5 text-brand-cyan" aria-hidden />
                      {site.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-brand-lime" aria-hidden />
                    {site.city}, {site.country}
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
