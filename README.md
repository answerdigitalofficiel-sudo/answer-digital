# ANSWER DIGITAL — Site officiel

*Technology. Innovation. Solutions.*

Stack : Next.js 15 (App Router) · TypeScript · Tailwind CSS · (Supabase à partir de l'étape 2) · Vercel.

## Démarrer

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run typecheck  # vérification TypeScript
npm run build      # build de production
```

## Structure

```
app/            Pages et mise en page (layout, page d'accueil, icônes)
components/     Sections de la page d'accueil, header, footer, logo
lib/content.tsx Source unique du contenu (services, secteurs, réalisations…)
public/brand/   Logos officiels (ne pas modifier)
```

## Supabase (formulaire de devis + administration)

- Base : projet Supabase `dvelieaemwqmrnebdtib`. Tables `quote_requests` et `admin_users` (migration `quote_requests_and_admin`).
- Sécurité : RLS activée. Le public peut **uniquement déposer** une demande (colonnes du formulaire, statut forcé à « nouvelle »). Seuls les comptes listés dans `admin_users` peuvent lire et modifier.
- Variables d'environnement requises (Vercel et `.env.local`) : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (voir `.env.example`).
- Créer un administrateur : Supabase → Authentication → Users → Add user, puis exécuter dans le SQL Editor :
  `insert into public.admin_users (user_id) select id from auth.users where email = 'EMAIL_ADMIN';`
- Pages : `/devis` (public), `/admin/login`, `/admin`, `/admin/demandes/[id]` (protégées).

## Règles du projet

- **Logo** : fichiers dans `public/brand/`, simplement recadrés. Ne pas déformer, redessiner ni recolorer.
- **Palette** : définie dans `tailwind.config.ts`, extraite du logo.
- **Aucune donnée inventée** : clients, chiffres et résultats n'apparaissent que s'ils sont réels.
- **Ajouter une réalisation** : ajouter un objet dans `projects` (`lib/content.tsx`), déposer la capture dans `public/projects/` et renseigner `screenshots`, `features` et `demoUrl`.
- **Secrets** : jamais dans le code. Utiliser `.env.local` (ignoré par Git) et les variables d'environnement Vercel.

## Feuille de route

1. ✅ Fondations, design system, page d'accueil
2. ✅ Formulaire de devis + base de données Supabase + administration des demandes
3. Pages détaillées des services et des secteurs
4. Portfolio détaillé
5. Diagnostic numérique
6. Administration : services, réalisations, informations du site
7. SEO avancé, sitemap, analytics, nom de domaine
