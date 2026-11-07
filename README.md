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

## Règles du projet

- **Logo** : fichiers dans `public/brand/`, simplement recadrés. Ne pas déformer, redessiner ni recolorer.
- **Palette** : définie dans `tailwind.config.ts`, extraite du logo.
- **Aucune donnée inventée** : clients, chiffres et résultats n'apparaissent que s'ils sont réels.
- **Ajouter une réalisation** : ajouter un objet dans `projects` (`lib/content.tsx`), déposer la capture dans `public/projects/` et renseigner `screenshot` et `demoUrl`.
- **Secrets** : jamais dans le code. Utiliser `.env.local` (ignoré par Git) et les variables d'environnement Vercel.

## Feuille de route

1. ✅ Fondations, design system, page d'accueil
2. Formulaire de devis + base de données Supabase
3. Pages détaillées des services et des secteurs
4. Portfolio détaillé
5. Diagnostic numérique
6. Espace d'administration sécurisé
7. SEO avancé, sitemap, analytics, nom de domaine
