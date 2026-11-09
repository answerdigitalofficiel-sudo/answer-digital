"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowUpRight, CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { submitQuote, type QuoteFormState } from "@/app/devis/actions";
import { budgetOptions, deadlineOptions, sectorOptions, solutionOptions } from "@/lib/quote";

const initialState: QuoteFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Envoi en cours…
        </>
      ) : (
        <>
          Envoyer ma demande
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </>
      )}
    </button>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {optional && <span className="ml-1.5 font-normal text-ink-faint">(facultatif)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export function QuoteForm({
  whatsappHref,
  prefill = {},
}: {
  whatsappHref: string | null;
  /** Valeurs proposées par défaut (par exemple depuis le diagnostic numérique). */
  prefill?: Partial<Record<"sector" | "solution_type" | "budget" | "deadline" | "description", string>>;
}) {
  const [state, formAction] = useActionState(submitQuote, initialState);
  const [startedAt, setStartedAt] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  // Horodatage d'ouverture du formulaire (anti-robots).
  useEffect(() => setStartedAt(String(Date.now())), []);

  // Ramène l'utilisateur en haut du formulaire après un envoi (succès ou erreur).
  useEffect(() => {
    if (state.status !== "idle") topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={topRef} className="card p-8 text-center sm:p-12" role="status">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
          <CheckCircle2 className="h-8 w-8" aria-hidden />
        </span>
        <h2 className="mt-6 text-2xl font-semibold">Demande envoyée</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-muted">
          Merci. Nous avons bien reçu votre demande et nous l'étudions. Nous revenons vers vous à
          l'adresse et au numéro que vous avez indiqués.
        </p>
        {whatsappHref && (
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-8">
            Nous écrire aussi sur WhatsApp
          </a>
        )}
      </div>
    );
  }

  const e = state.errors ?? {};
  const v = state.values ?? {};
  const invalid = (name: string) => (e[name] ? true : undefined);
  const describedBy = (name: string) => (e[name] ? `${name}-error` : undefined);

  return (
    <form action={formAction} noValidate className="card space-y-6 p-6 sm:p-10">
      <div ref={topRef} />

      {state.status === "error" && state.message && (
        <div role="alert" className="flex gap-3 rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-sm text-red-200">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p>{state.message}</p>
        </div>
      )}

      {/* Champs anti-spam : invisibles pour les humains */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="started_at" value={startedAt} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="full_name" label="Nom et prénom" error={e.full_name}>
          <input id="full_name" name="full_name" type="text" autoComplete="name" required defaultValue={v.full_name}
            aria-invalid={invalid("full_name")} aria-describedby={describedBy("full_name")} className="input" />
        </Field>
        <Field id="organization" label="Organisation" error={e.organization}>
          <input id="organization" name="organization" type="text" autoComplete="organization" required defaultValue={v.organization}
            aria-invalid={invalid("organization")} aria-describedby={describedBy("organization")} className="input" />
        </Field>
        <Field id="job_title" label="Fonction" error={e.job_title} optional>
          <input id="job_title" name="job_title" type="text" autoComplete="organization-title" defaultValue={v.job_title}
            aria-invalid={invalid("job_title")} aria-describedby={describedBy("job_title")} className="input" />
        </Field>
        <Field id="phone" label="Téléphone (WhatsApp de préférence)" error={e.phone}>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+243 …" defaultValue={v.phone}
            aria-invalid={invalid("phone")} aria-describedby={describedBy("phone")} className="input" />
        </Field>
        <div className="sm:col-span-2">
          <Field id="email" label="Adresse électronique" error={e.email}>
            <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required defaultValue={v.email}
              aria-invalid={invalid("email")} aria-describedby={describedBy("email")} className="input" />
          </Field>
        </div>
        <Field id="sector" label="Secteur d'activité" error={e.sector}>
          <select id="sector" name="sector" required defaultValue={v.sector ?? prefill.sector ?? ""}
            aria-invalid={invalid("sector")} aria-describedby={describedBy("sector")} className="input">
            <option value="" disabled>Choisir…</option>
            {sectorOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="solution_type" label="Type de solution recherchée" error={e.solution_type}>
          <select id="solution_type" name="solution_type" required defaultValue={v.solution_type ?? prefill.solution_type ?? ""}
            aria-invalid={invalid("solution_type")} aria-describedby={describedBy("solution_type")} className="input">
            <option value="" disabled>Choisir…</option>
            {solutionOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      <Field id="description" label="Décrivez votre problème ou votre projet" error={e.description}>
        <textarea id="description" name="description" rows={6} required maxLength={4000} defaultValue={v.description ?? prefill.description}
          placeholder="Quelle difficulté rencontrez-vous ? Qu'aimeriez-vous améliorer ?"
          aria-invalid={invalid("description")} aria-describedby={describedBy("description")} className="input resize-y" />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="budget" label="Budget indicatif" error={e.budget} optional>
          <select id="budget" name="budget" defaultValue={v.budget ?? prefill.budget ?? ""} aria-invalid={invalid("budget")} className="input">
            <option value="">Non précisé</option>
            {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="deadline" label="Délai souhaité" error={e.deadline} optional>
          <select id="deadline" name="deadline" defaultValue={v.deadline ?? prefill.deadline ?? ""} aria-invalid={invalid("deadline")} className="input">
            <option value="">Non précisé</option>
            {deadlineOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton />
        <p className="text-xs leading-relaxed text-ink-faint sm:max-w-xs">
          Vos informations servent uniquement à répondre à votre demande et ne sont pas partagées.
        </p>
      </div>
    </form>
  );
}
