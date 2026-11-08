/**
 * Constantes partagées entre le formulaire de devis, l'action serveur et l'administration.
 * Les valeurs de ces listes sont celles acceptées par le serveur.
 */

export const sectorOptions = [
  "Entreprise commerciale",
  "Institution publique",
  "Université ou établissement scolaire",
  "Organisation non gouvernementale (ONG)",
  "Association",
  "Organisation religieuse",
  "Immobilier",
  "Santé",
  "Gestion administrative",
  "Entrepreneur individuel",
  "Autre",
] as const;

export const solutionOptions = [
  "Application mobile",
  "Plateforme web",
  "Site internet professionnel",
  "Digitalisation de l'institution",
  "Automatisation des processus administratifs",
  "Système de gestion et d'administration",
  "Gestion et sécurisation des données",
  "Intelligence artificielle appliquée",
  "Solution sur mesure",
  "Je ne sais pas encore, j'ai besoin de conseils",
] as const;

export const budgetOptions = [
  "Moins de 500 USD",
  "Entre 500 et 2 000 USD",
  "Entre 2 000 et 5 000 USD",
  "Plus de 5 000 USD",
  "À discuter",
] as const;

export const deadlineOptions = [
  "Urgent (moins de 2 semaines)",
  "Dans le mois",
  "Entre 1 et 3 mois",
  "Plus de 3 mois",
  "Pas de date précise",
] as const;

/** Statuts de suivi d'une demande (ordre = avancement du dossier). */
export const statuses = [
  { value: "nouvelle", label: "Nouvelle demande", tone: "bg-brand-cyan/15 text-brand-cyan ring-brand-cyan/30" },
  { value: "en_analyse", label: "En cours d'analyse", tone: "bg-amber-400/15 text-amber-300 ring-amber-300/30" },
  { value: "proposition_envoyee", label: "Proposition envoyée", tone: "bg-indigo-400/15 text-indigo-300 ring-indigo-300/30" },
  { value: "en_negociation", label: "En négociation", tone: "bg-fuchsia-400/15 text-fuchsia-300 ring-fuchsia-300/30" },
  { value: "acceptee", label: "Projet accepté", tone: "bg-brand-green/15 text-brand-green ring-brand-green/30" },
  { value: "terminee", label: "Projet terminé", tone: "bg-brand-lime/15 text-brand-lime ring-brand-lime/30" },
  { value: "refusee", label: "Demande refusée", tone: "bg-red-400/15 text-red-300 ring-red-300/30" },
] as const;

export type QuoteStatus = (typeof statuses)[number]["value"];

export const statusValues = statuses.map((s) => s.value) as QuoteStatus[];

export function statusMeta(value: string) {
  return statuses.find((s) => s.value === value) ?? statuses[0];
}

/** Ligne de la table public.quote_requests. */
export type QuoteRequest = {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  organization: string;
  job_title: string | null;
  email: string;
  phone: string;
  sector: string;
  solution_type: string;
  description: string;
  budget: string | null;
  deadline: string | null;
  status: QuoteStatus;
  admin_notes: string | null;
};

/** Date lisible, toujours à l'heure de Kinshasa. */
export function formatDate(iso: string, withTime = false): string {
  return new Date(iso).toLocaleString("fr-FR", {
    timeZone: "Africa/Kinshasa",
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}
