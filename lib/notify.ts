import { site } from "@/lib/content";

type QuoteSummary = {
  full_name: string;
  organization: string;
  job_title: string;
  email: string;
  phone: string;
  sector: string;
  solution_type: string;
  description: string;
  budget: string;
  deadline: string;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Envoie un email d'alerte à l'équipe pour chaque nouvelle demande de devis (via Resend).
 * Nécessite la variable d'environnement RESEND_API_KEY ; sans elle, la fonction ne fait rien.
 * Ne lève jamais d'erreur : une panne d'email ne doit jamais faire perdre une demande déjà enregistrée.
 */
export async function notifyNewQuote(q: QuoteSummary): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[notify] RESEND_API_KEY absente : aucune alerte email envoyée.");
    return;
  }
  const to = process.env.NOTIFY_EMAIL_TO || site.email;
  const from = process.env.NOTIFY_EMAIL_FROM || "ANSWER DIGITAL <onboarding@resend.dev>";

  const rows: [string, string][] = [
    ["Nom", q.full_name],
    ["Organisation", q.organization],
    ["Fonction", q.job_title || "—"],
    ["Téléphone", q.phone],
    ["Email", q.email],
    ["Secteur", q.sector],
    ["Solution", q.solution_type],
    ["Budget", q.budget || "Non précisé"],
    ["Délai", q.deadline || "Non précisé"],
  ];
  const html = `<div style="font-family:Arial,sans-serif;max-width:600px;color:#0b1f3a">
<h2 style="margin:0 0 12px">Nouvelle demande de devis</h2>
<table style="border-collapse:collapse;width:100%">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5b6b82;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`,
    )
    .join("")}</table>
<p style="margin:16px 0 4px;color:#5b6b82">Description</p>
<p style="margin:0;white-space:pre-wrap">${esc(q.description)}</p>
<p style="margin:24px 0 0"><a href="${esc(site.url)}/admin">Ouvrir l'administration</a></p></div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: q.email,
        subject: `Nouvelle demande de devis : ${q.organization} (${q.solution_type})`,
        html,
      }),
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) console.error("[notify] Échec de l'envoi :", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("[notify] Erreur d'envoi :", err instanceof Error ? err.message : err);
  }
}
