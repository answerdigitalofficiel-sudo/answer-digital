"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { budgetOptions, deadlineOptions, sectorOptions, solutionOptions } from "@/lib/quote";

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<string, string>>;
  /** Valeurs saisies, pour ne pas faire perdre son texte à l'utilisateur en cas d'erreur. */
  values?: Record<string, string>;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE_RE = /^[+0-9 ().\-]{6,40}$/;

const field = (formData: FormData, name: string) => String(formData.get(name) ?? "").trim();

/**
 * Enregistre une demande de devis dans Supabase.
 * La base n'autorise le public qu'à INSÉRER (jamais lire) : voir la migration « quote_requests_and_admin ».
 */
export async function submitQuote(_prev: QuoteFormState, formData: FormData): Promise<QuoteFormState> {
  const values = {
    full_name: field(formData, "full_name"),
    organization: field(formData, "organization"),
    job_title: field(formData, "job_title"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    sector: field(formData, "sector"),
    solution_type: field(formData, "solution_type"),
    description: field(formData, "description"),
    budget: field(formData, "budget"),
    deadline: field(formData, "deadline"),
  };

  // Anti-spam : champ piège (invisible pour un humain) et délai minimal de remplissage.
  const honeypot = field(formData, "website");
  const startedAt = Number(field(formData, "started_at"));
  const tooFast = !startedAt || Date.now() - startedAt < 3000;
  if (honeypot || tooFast) {
    // On répond « succès » pour ne pas informer les robots.
    return { status: "success" };
  }

  const errors: Record<string, string> = {};
  if (values.full_name.length < 2 || values.full_name.length > 120) errors.full_name = "Indiquez vos nom et prénom.";
  if (values.organization.length < 2 || values.organization.length > 160) errors.organization = "Indiquez le nom de votre organisation.";
  if (values.job_title.length > 120) errors.job_title = "Fonction trop longue (120 caractères maximum).";
  if (!EMAIL_RE.test(values.email) || values.email.length > 200) errors.email = "Adresse électronique invalide.";
  if (!PHONE_RE.test(values.phone)) errors.phone = "Numéro invalide. Exemple : +243 999 000 000.";
  if (!(sectorOptions as readonly string[]).includes(values.sector)) errors.sector = "Choisissez votre secteur d'activité.";
  if (!(solutionOptions as readonly string[]).includes(values.solution_type)) errors.solution_type = "Choisissez le type de solution recherché.";
  if (values.description.length < 20) errors.description = "Décrivez votre problème en quelques phrases (20 caractères minimum).";
  if (values.description.length > 4000) errors.description = "Description trop longue (4 000 caractères maximum).";
  if (values.budget && !(budgetOptions as readonly string[]).includes(values.budget)) errors.budget = "Choix de budget invalide.";
  if (values.deadline && !(deadlineOptions as readonly string[]).includes(values.deadline)) errors.deadline = "Choix de délai invalide.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Veuillez corriger les champs signalés.", errors, values };
  }

  if (!isSupabaseConfigured()) {
    console.error("[devis] Supabase n'est pas configuré (variables d'environnement manquantes).");
    return {
      status: "error",
      message: "Le service est momentanément indisponible. Écrivez-nous directement par WhatsApp ou par email.",
      values,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("quote_requests").insert({
    full_name: values.full_name,
    organization: values.organization,
    job_title: values.job_title || null,
    email: values.email,
    phone: values.phone,
    sector: values.sector,
    solution_type: values.solution_type,
    description: values.description,
    budget: values.budget || null,
    deadline: values.deadline || null,
  });

  if (error) {
    console.error("[devis] Échec de l'enregistrement :", error.code, error.message);
    return {
      status: "error",
      message: "Votre demande n'a pas pu être enregistrée. Réessayez, ou écrivez-nous par WhatsApp ou par email.",
      values,
    };
  }

  return { status: "success" };
}
