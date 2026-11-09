"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, RotateCcw } from "lucide-react";
import { budgetOptions, deadlineOptions, sectorOptions } from "@/lib/quote";

type Need = { label: string; solution: string; why: string };

/** Les « besoins » proposés et la solution recommandée pour chacun (valeurs acceptées par le formulaire de devis). */
const needs: Need[] = [
  {
    label: "Nous travaillons surtout sur papier ou sur Excel",
    solution: "Digitalisation de l'institution",
    why: "Remplacer les papiers et les tableaux dispersés par un système numérique centralisé fait gagner du temps et évite les pertes d'information.",
  },
  {
    label: "Nos démarches administratives sont lentes et répétitives",
    solution: "Automatisation des processus administratifs",
    why: "Les tâches répétitives (validations, rappels, rapports) peuvent être automatisées pour libérer votre équipe.",
  },
  {
    label: "Nous n'avons pas de présence en ligne crédible",
    solution: "Site internet professionnel",
    why: "Un site soigné présente votre organisation, rassure vos partenaires et permet d'être contacté facilement.",
  },
  {
    label: "Nos clients, membres ou étudiants ont besoin d'une application",
    solution: "Application mobile",
    why: "Une application installable depuis le téléphone rapproche votre organisation de ses utilisateurs, même avec une connexion limitée.",
  },
  {
    label: "Nous avons besoin d'une plateforme en ligne (comptes, services, suivi)",
    solution: "Plateforme web",
    why: "Une plateforme web permet à vos utilisateurs de se connecter, d'accéder à vos services et de suivre leurs démarches.",
  },
  {
    label: "Nos données sont dispersées ou mal protégées",
    solution: "Gestion et sécurisation des données",
    why: "Centraliser, sauvegarder et protéger vos données réduit les risques de perte et de fuite.",
  },
  {
    label: "Je ne sais pas encore, j'ai besoin de conseils",
    solution: "Je ne sais pas encore, j'ai besoin de conseils",
    why: "Aucun souci : décrivez-nous votre situation et nous vous orienterons vers la solution la plus adaptée.",
  },
];

const users = ["Mon équipe interne", "Mes clients ou membres", "Les deux"];

type Answers = { sector: string; need: string; users: string; deadline: string; budget: string };

const steps: { key: keyof Answers; title: string; options: readonly string[] }[] = [
  { key: "sector", title: "Dans quel secteur travaillez-vous ?", options: sectorOptions as readonly string[] },
  { key: "need", title: "Quelle situation vous ressemble le plus ?", options: needs.map((n) => n.label) },
  { key: "users", title: "Qui utilisera la solution ?", options: users },
  { key: "deadline", title: "Quel est votre délai ?", options: deadlineOptions as readonly string[] },
  { key: "budget", title: "Quel budget envisagez-vous ?", options: budgetOptions as readonly string[] },
];

export function Diagnostic() {
  const [i, setI] = useState(0);
  const [a, setA] = useState<Partial<Answers>>({});
  const done = i >= steps.length;
  const step = steps[Math.min(i, steps.length - 1)];

  const choose = (value: string) => {
    setA((prev) => ({ ...prev, [step.key]: value }));
    setI((n) => n + 1);
  };

  if (done) {
    const need = needs.find((n) => n.label === a.need) ?? needs[needs.length - 1];
    const note = [
      "Résultat du diagnostic numérique.",
      `Situation : ${need.label}.`,
      a.users ? `Utilisateurs de la solution : ${a.users}.` : "",
    ]
      .filter(Boolean)
      .join(" ");
    const qs = new URLSearchParams({
      sector: a.sector ?? "",
      solution: need.solution,
      budget: a.budget ?? "",
      deadline: a.deadline ?? "",
      note,
    });
    return (
      <div className="card p-7 sm:p-10" role="status">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-brand-cyan">Notre recommandation</p>
        <h2 className="gradient-text mt-2 text-2xl font-semibold sm:text-3xl">{need.solution}</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{need.why}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-faint">
          Il s'agit d'une première orientation, pas d'un devis. Nous affinerons ensemble après avoir étudié votre situation.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={`/devis?${qs.toString()}`} className="btn-primary">
            Demander un devis pour cette solution
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          <button type="button" className="btn-ghost" onClick={() => { setA({}); setI(0); }}>
            <RotateCcw className="h-4 w-4" aria-hidden />
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 sm:p-10">
      <div className="flex items-center justify-between gap-4 text-sm text-ink-muted">
        <span>Question {i + 1} sur {steps.length}</span>
        {i > 0 && (
          <button type="button" onClick={() => setI((n) => n - 1)} className="inline-flex items-center gap-1.5 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Précédent
          </button>
        )}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]" aria-hidden>
        <div className="h-full rounded-full bg-brand-gradient transition-all duration-500" style={{ width: `${(i / steps.length) * 100}%` }} />
      </div>
      <h2 className="mt-8 text-xl font-semibold sm:text-2xl">{step.title}</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {step.options.map((o) => {
          const selected = a[step.key] === o;
          return (
            <li key={o}>
              <button
                type="button"
                onClick={() => choose(o)}
                aria-pressed={selected}
                className={`flex h-full w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition ${
                  selected
                    ? "border-brand-green/60 bg-brand-green/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-ink-muted hover:border-brand-cyan/50 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <span>{o}</span>
                <ArrowRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
