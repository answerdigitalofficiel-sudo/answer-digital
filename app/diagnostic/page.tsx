import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Diagnostic } from "@/components/Diagnostic";

export const metadata: Metadata = {
  title: "Diagnostic numérique",
  description:
    "Répondez à 5 questions et découvrez quelle solution numérique correspond le mieux à votre organisation. Gratuit, sans engagement.",
};

export default function DiagnosticPage() {
  return (
    <>
      <Header />
      <main id="contenu" className="pb-8 pt-32 sm:pt-40">
        <div className="container-x">
          <div className="max-w-3xl">
            <span className="eyebrow">Diagnostic numérique</span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
              Quelle solution est <span className="gradient-text">faite pour vous</span> ?
            </h1>
            <p className="section-lead">
              Cinq questions, une minute. Vous obtenez une première orientation et pouvez ensuite demander un
              devis déjà pré-rempli.
            </p>
          </div>
          <div className="mt-10 max-w-4xl">
            <Diagnostic />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
