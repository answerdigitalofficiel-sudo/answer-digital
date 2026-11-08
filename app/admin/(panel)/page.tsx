import Link from "next/link";
import { ChevronRight, Inbox, Search } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { createClient } from "@/lib/supabase/server";
import { formatDate, statuses, type QuoteRequest } from "@/lib/quote";

const LIMIT = 1000;

const monthKey = (d: Date) =>
  d.toLocaleDateString("fr-CA", { timeZone: "Africa/Kinshasa", year: "numeric", month: "2-digit" });

function lastMonths(count: number) {
  const now = new Date();
  const out: { key: string; label: string }[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 15);
    out.push({
      key: monthKey(d),
      label: d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" }),
    });
  }
  return out;
}

function Bars({ rows }: { rows: { label: string; value: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={r.label} className="grid grid-cols-[minmax(0,9rem)_1fr_2rem] items-center gap-3 text-sm sm:grid-cols-[minmax(0,12rem)_1fr_2rem]">
          <span className="truncate text-ink-muted" title={r.label}>{r.label}</span>
          <span className="h-2.5 overflow-hidden rounded-full bg-white/[0.07]">
            <span className="block h-full rounded-full bg-brand-gradient" style={{ width: `${(r.value / max) * 100}%` }} />
          </span>
          <span className="text-right font-medium text-white">{r.value}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string; q?: string }>;
}) {
  const { statut, q } = await searchParams;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(LIMIT);

  if (error) {
    console.error("[admin] lecture des demandes impossible :", error.code, error.message);
    return (
      <div role="alert" className="card border-red-400/40 p-6 text-red-200">
        Impossible de charger les demandes pour le moment. Rechargez la page ; si le problème persiste, vérifiez la configuration Supabase.
      </div>
    );
  }

  const all = (data ?? []) as QuoteRequest[];

  // --- Statistiques ---
  const countBy = (value: string) => all.filter((r) => r.status === value).length;
  const thirtyDaysAgo = Date.now() - 30 * 24 * 3600 * 1000;
  const recent = all.filter((r) => new Date(r.created_at).getTime() >= thirtyDaysAgo).length;

  const bySector = Object.entries(
    all.reduce<Record<string, number>>((acc, r) => ({ ...acc, [r.sector]: (acc[r.sector] ?? 0) + 1 }), {}),
  )
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const monthCounts = all.reduce<Record<string, number>>((acc, r) => {
    const k = monthKey(new Date(r.created_at));
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
  const byMonth = lastMonths(6).map((m) => ({ label: m.label, value: monthCounts[m.key] ?? 0 }));

  // --- Filtres ---
  const activeStatus = statuses.find((s) => s.value === statut)?.value;
  const query = (q ?? "").trim().toLowerCase();
  const filtered = all.filter((r) => {
    if (activeStatus && r.status !== activeStatus) return false;
    if (!query) return true;
    return [r.full_name, r.organization, r.email, r.phone, r.sector, r.solution_type, r.description]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const cards = [
    { label: "Demandes reçues", value: all.length },
    { label: "Nouvelles à traiter", value: countBy("nouvelle"), accent: true },
    { label: "30 derniers jours", value: recent },
    { label: "Projets acceptés", value: countBy("acceptee") + countBy("terminee") },
  ];

  const chip = (active: boolean) =>
    `inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
      active ? "border-transparent bg-brand-gradient text-navy-950" : "border-white/10 bg-white/[0.04] text-ink-muted hover:border-white/25 hover:text-white"
    }`;
  const href = (s?: string) => {
    const p = new URLSearchParams();
    if (s) p.set("statut", s);
    if (q) p.set("q", q);
    const str = p.toString();
    return str ? `/admin?${str}` : "/admin";
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold">Tableau de bord</h1>
        <p className="mt-2 text-ink-muted">Suivez les demandes de devis reçues sur le site.</p>
      </div>

      <section aria-label="Statistiques" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="card p-5">
            <p className="text-sm text-ink-muted">{c.label}</p>
            <p className={`mt-2 font-display text-4xl font-semibold ${c.accent ? "gradient-text" : "text-white"}`}>{c.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2" aria-label="Répartition">
        <div className="card p-6">
          <h2 className="mb-5 text-base font-semibold">Demandes par mois</h2>
          <Bars rows={byMonth} />
        </div>
        <div className="card p-6">
          <h2 className="mb-5 text-base font-semibold">Secteurs les plus actifs</h2>
          {bySector.length > 0 ? <Bars rows={bySector} /> : <p className="text-sm text-ink-muted">Aucune donnée pour le moment.</p>}
        </div>
      </section>

      <section aria-label="Demandes">
        <h2 className="text-xl font-semibold">Demandes</h2>

        <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          <Link href={href()} className={chip(!activeStatus)}>Toutes <span className="opacity-70">{all.length}</span></Link>
          {statuses.map((s) => (
            <Link key={s.value} href={href(s.value)} className={chip(activeStatus === s.value)}>
              {s.label} <span className="opacity-70">{countBy(s.value)}</span>
            </Link>
          ))}
        </div>

        <form action="/admin" method="get" className="mt-4 flex gap-2">
          {activeStatus && <input type="hidden" name="statut" value={activeStatus} />}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" aria-hidden />
            <input name="q" defaultValue={q ?? ""} type="search" placeholder="Rechercher un nom, une organisation, un email…" aria-label="Rechercher une demande" className="input !pl-11" />
          </div>
          <button type="submit" className="btn-ghost !py-3">Rechercher</button>
        </form>

        {filtered.length === 0 ? (
          <div className="card mt-6 flex flex-col items-center p-12 text-center">
            <Inbox className="h-10 w-10 text-ink-faint" aria-hidden />
            <p className="mt-4 font-medium text-white">
              {all.length === 0 ? "Aucune demande pour le moment" : "Aucune demande ne correspond à ce filtre"}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              {all.length === 0 ? "Les demandes envoyées depuis le formulaire du site apparaîtront ici." : "Essayez un autre statut ou une autre recherche."}
            </p>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {filtered.map((r) => (
              <li key={r.id}>
                <Link href={`/admin/demandes/${r.id}`} className="card-hover group flex items-center gap-4 p-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <p className="truncate font-semibold text-white">{r.full_name}</p>
                      <StatusBadge status={r.status} />
                    </div>
                    <p className="mt-1 truncate text-sm text-ink-muted">
                      {r.organization} · {r.sector}
                    </p>
                    <p className="mt-1 truncate text-sm text-ink-faint">
                      {r.solution_type} · {formatDate(r.created_at, true)}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-ink-faint transition group-hover:text-white" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        )}

        {all.length >= LIMIT && (
          <p className="mt-4 text-sm text-amber-200">Seules les {LIMIT} demandes les plus récentes sont affichées.</p>
        )}
      </section>
    </div>
  );
}
