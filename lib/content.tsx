import {
  Smartphone,
  Globe,
  LayoutTemplate,
  Landmark,
  Workflow,
  ClipboardList,
  ShieldCheck,
  BrainCircuit,
  Puzzle,
  Store,
  GraduationCap,
  Users,
  Church,
  Building2,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

/**
 * Source unique du contenu du site.
 * Règle du projet : aucune donnée inventée (clients, chiffres, résultats).
 */

export const site = {
  name: "ANSWER DIGITAL",
  signature: "Technology. Innovation. Solutions.",
  email: "answerdigitalofficiel@gmail.com",
  city: "Kinshasa",
  country: "République démocratique du Congo",
  /** Numéro WhatsApp au format international, sans « + » ni espaces. */
  whatsapp: "243999983163" as string | null,
  whatsappDisplay: "+243 999 983 163",
  /** URL de la page Facebook. À renseigner : le lien n'est affiché que s'il existe. */
  facebook: "https://www.facebook.com/share/19hxVg1UKn/" as string | null,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "ANSWER DIGITAL conçoit des applications, plateformes web et systèmes numériques qui transforment les défis des organisations en opportunités de croissance.",
};

/** Navigation : uniquement des ancres existantes sur la page d'accueil. */
export const nav = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Services", href: "/#services" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Contact", href: "/#contact" },
] as const;

export const mailto = (subject = "Parler de mon projet") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const whatsappLink = (message = "Bonjour ANSWER DIGITAL, je souhaite parler de mon projet.") =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}` : null;

/** Chiffre d'usage communiqué par ANSWER DIGITAL (à justifier avec les statistiques d'utilisation). */
export const usage = {
  headline: "Plus de 6 000 étudiants",
  text: "utilisent nos applications Drapp et Cahier numérique.",
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "applications-mobiles",
    title: "Applications mobiles",
    summary:
      "Applications installables, rapides et pensées d'abord pour le téléphone, y compris en PWA pour fonctionner malgré une connexion limitée.",
    icon: Smartphone,
  },
  {
    slug: "plateformes-web",
    title: "Plateformes web",
    summary:
      "Portails, espaces membres et plateformes métier sécurisés, conçus pour gérer des utilisateurs, des contenus et des processus.",
    icon: Globe,
  },
  {
    slug: "sites-internet",
    title: "Sites internet professionnels",
    summary:
      "Sites institutionnels et commerciaux soignés, rapides et bien référencés, qui inspirent confiance dès la première visite.",
    icon: LayoutTemplate,
  },
  {
    slug: "digitalisation-institutions",
    title: "Digitalisation des institutions",
    summary:
      "Passage progressif des procédures papier vers des outils numériques fiables, adaptés à la réalité de votre organisation.",
    icon: Landmark,
  },
  {
    slug: "automatisation-administrative",
    title: "Automatisation des processus administratifs",
    summary:
      "Moins de saisies répétitives et de dossiers égarés : circuits de validation, notifications et suivi automatisés.",
    icon: Workflow,
  },
  {
    slug: "systemes-de-gestion",
    title: "Systèmes de gestion et d'administration",
    summary:
      "Tableaux de bord et outils de gestion pour piloter vos activités, vos membres, vos ressources ou vos dossiers.",
    icon: ClipboardList,
  },
  {
    slug: "donnees-securite",
    title: "Gestion et sécurisation des données",
    summary:
      "Organisation, sauvegarde et protection de vos données, avec des accès maîtrisés selon le rôle de chacun.",
    icon: ShieldCheck,
  },
  {
    slug: "intelligence-artificielle",
    title: "Intelligence artificielle appliquée",
    summary:
      "Intégration d'assistants et d'analyses intelligentes là où elles apportent une vraie valeur, sans gadget.",
    icon: BrainCircuit,
  },
  {
    slug: "solutions-sur-mesure",
    title: "Solutions technologiques sur mesure",
    summary:
      "Lorsque rien d'existant ne convient, nous concevons le logiciel qui correspond exactement à votre besoin.",
    icon: Puzzle,
  },
];

export type Sector = {
  id: string;
  label: string;
  icon: LucideIcon;
  challenges: string[];
  solutions: string[];
  benefits: string[];
};

export const sectors: Sector[] = [
  {
    id: "commerce",
    label: "Entreprises commerciales",
    icon: Store,
    challenges: [
      "Suivi des ventes et du stock dispersé entre carnets et tableurs",
      "Visibilité en ligne limitée",
      "Difficulté à fidéliser et relancer les clients",
    ],
    solutions: [
      "Application de gestion des ventes et du stock",
      "Site vitrine ou boutique en ligne",
      "Outils de suivi clients et de relance",
    ],
    benefits: [
      "Décisions appuyées sur des données fiables",
      "Moins d'erreurs et de pertes",
      "Image plus professionnelle auprès des clients",
    ],
  },
  {
    id: "institutions",
    label: "Institutions publiques",
    icon: Landmark,
    challenges: [
      "Dossiers papier lents à traiter et difficiles à retrouver",
      "Manque de traçabilité des démarches",
      "Information peu accessible aux usagers",
    ],
    solutions: [
      "Système de gestion électronique des dossiers",
      "Portails de démarches et de suivi pour les usagers",
      "Tableaux de bord de pilotage",
    ],
    benefits: [
      "Traitement plus rapide des demandes",
      "Transparence et traçabilité renforcées",
      "Meilleur service rendu aux usagers",
    ],
  },
  {
    id: "education",
    label: "Universités et établissements scolaires",
    icon: GraduationCap,
    challenges: [
      "Gestion manuelle des inscriptions, notes et paiements",
      "Communication difficile avec étudiants et parents",
      "Supports de cours encore très dépendants du papier",
    ],
    solutions: [
      "Plateforme de gestion académique et administrative",
      "Espaces étudiants et parents sur mobile",
      "Outils numériques d'apprentissage et de prise de notes",
    ],
    benefits: [
      "Administration allégée",
      "Étudiants mieux informés et mieux organisés",
      "Données académiques centralisées et sécurisées",
    ],
  },
  {
    id: "ong",
    label: "Organisations non gouvernementales",
    icon: Globe,
    challenges: [
      "Collecte de données terrain peu structurée",
      "Rapports aux bailleurs longs à produire",
      "Suivi des projets et des bénéficiaires dispersé",
    ],
    solutions: [
      "Applications de collecte de données utilisables sur mobile",
      "Tableaux de bord de suivi-évaluation",
      "Bases de données bénéficiaires sécurisées",
    ],
    benefits: [
      "Rapports produits plus rapidement",
      "Données fiables pour démontrer l'impact",
      "Meilleure coordination des équipes",
    ],
  },
  {
    id: "associations",
    label: "Associations",
    icon: Users,
    challenges: [
      "Registre des membres et cotisations difficiles à tenir à jour",
      "Communication irrégulière avec les membres",
      "Peu de visibilité sur les activités",
    ],
    solutions: [
      "Gestion des membres et des cotisations",
      "Espace membres et annonces",
      "Site de présentation de l'association",
    ],
    benefits: [
      "Suivi clair des adhésions et contributions",
      "Membres mieux informés et plus engagés",
      "Gain de temps pour les responsables",
    ],
  },
  {
    id: "religieux",
    label: "Organisations religieuses",
    icon: Church,
    challenges: [
      "Suivi des fidèles, des activités et des contributions",
      "Diffusion de l'information à une large communauté",
      "Gestion transparente des ressources",
    ],
    solutions: [
      "Gestion des membres et des activités",
      "Application de communication avec la communauté",
      "Suivi des contributions et rapports financiers",
    ],
    benefits: [
      "Communauté mieux connectée",
      "Gestion plus transparente",
      "Responsables libérés des tâches répétitives",
    ],
  },
  {
    id: "immobilier",
    label: "Immobilier",
    icon: Building2,
    challenges: [
      "Gestion des biens, locataires et loyers sur papier",
      "Annonces peu visibles",
      "Suivi des paiements et des contrats complexe",
    ],
    solutions: [
      "Plateforme de gestion locative",
      "Catalogue de biens en ligne",
      "Suivi automatisé des échéances et des paiements",
    ],
    benefits: [
      "Vision claire du portefeuille de biens",
      "Moins d'impayés oubliés",
      "Meilleure relation avec locataires et propriétaires",
    ],
  },
  {
    id: "sante",
    label: "Santé",
    icon: Stethoscope,
    challenges: [
      "Dossiers patients sur papier, difficiles à partager",
      "Gestion des rendez-vous et des stocks de médicaments",
      "Statistiques difficiles à consolider",
    ],
    solutions: [
      "Dossier patient numérique sécurisé",
      "Prise de rendez-vous et rappels",
      "Suivi des stocks et indicateurs de l'établissement",
    ],
    benefits: [
      "Informations médicales plus facilement retrouvées",
      "Organisation plus fluide des consultations",
      "Confidentialité des données mieux protégée",
    ],
  },
  {
    id: "administration",
    label: "Gestion administrative",
    icon: ClipboardList,
    challenges: [
      "Courriers, validations et archives gérés manuellement",
      "Tâches répétitives et risques d'erreur",
      "Difficulté à suivre l'avancement des dossiers",
    ],
    solutions: [
      "Circuits de validation numériques",
      "Archivage et recherche de documents",
      "Notifications et tableaux de suivi",
    ],
    benefits: [
      "Temps libéré pour les tâches à valeur ajoutée",
      "Dossiers traçables de bout en bout",
      "Fonctionnement plus fiable au quotidien",
    ],
  },
];

/** Réalisations réelles uniquement. Ajouter un projet ici l'affiche sur le site. */
export type Project = {
  slug: string;
  name: string;
  /** Phrase d'accroche affichée sous le nom. */
  tagline: string;
  status: "Réalisé" | "Prototype" | "Expérimental";
  kind: string;
  description: string;
  /** Titre de la liste de fonctionnalités. */
  featuresTitle: string;
  /** Fonctionnalités réellement présentes dans l'application. */
  features: { icon: string; text: string }[];
  /** Encadré facultatif (ex. « Pourquoi c'est une avancée »). */
  highlight?: { title: string; text: string };
  /** Phrase de conclusion facultative. */
  closing?: string;
  /** Mention de prudence facultative. */
  note?: string;
  /** Captures d'écran (chemins dans /public). Liste vide si aucune. */
  screenshots: { src: string; alt: string }[];
  /** Lien de démonstration, sinon null (le bouton n'est alors pas affiché). */
  demoUrl: string | null;
};

export const projects: Project[] = [
  {
    slug: "cahier-numerique",
    name: "Cahier numérique",
    tagline: "Vos cours. Vos notes. Pour toujours.",
    status: "Réalisé",
    kind: "Application web progressive (PWA)",
    description:
      "Un cahier par cours, des pages qui se remplissent en écrivant, en dictant, en enregistrant ou en scannant. Le tout s'installe comme une application, sans magasin.",
    featuresTitle: "Ce que vous y trouvez",
    features: [
      { icon: "🎙", text: "Enregistrez vos cours, puis obtenez la transcription complète ou un résumé en un geste." },
      { icon: "📄", text: "Scannez vos pages papier : le texte est reconnu et mis en forme automatiquement (titres, paragraphes, listes)." },
      { icon: "🗣", text: "Dictez vos notes, écoutez-les à voix haute." },
      { icon: "🎴", text: "Surlignez un passage : il devient une fiche de révision." },
      { icon: "✨", text: "Complétez vos notes avec Wikipédia et l'IA, jusqu'à une leçon détaillée." },
      { icon: "🔤", text: "Éditeur complet : 8 polices, couleurs, surlignage, listes numérotées." },
      { icon: "📅", text: "Notez cours et examens, avec rappels dans votre calendrier." },
      { icon: "📤", text: "Envoyez une page à un camarade, ou sauvegardez dans Google Drive." },
      { icon: "🔒", text: "Ne perdez rien : enregistrement automatique et compte en ligne pour retrouver ses cahiers sur tout téléphone." },
    ],
    closing: "Écrivez, parlez, scannez, enregistrez. Il s'occupe du reste.",
    screenshots: [
      { src: "/projects/cahier-numerique-1.jpg", alt: "Écran d'accueil de l'application Cahier numérique" },
      { src: "/projects/cahier-numerique-2.jpg", alt: "Bibliothèque de cahiers avec recherche, favoris et tri" },
      { src: "/projects/cahier-numerique-3.jpg", alt: "Éditeur de notes d'un cahier" },
    ],
    demoUrl: "https://nepios-creator.github.io/Cahier-num-rique-/installer.html",
  },
  {
    slug: "drapp",
    name: "Drapp : le droit congolais, à portée de main",
    tagline: "L'application des étudiants en droit de RDC : lois, manuels, notes et assistant d'étude dans un seul téléphone.",
    status: "Réalisé",
    kind: "Application web progressive (PWA)",
    description:
      "En L1, les textes sont longs, les manuels lourds et on étudie souvent seul. Drapp réunit tout et le rend lisible partout.",
    featuresTitle: "Ce que vous y trouvez",
    features: [
      { icon: "📚", text: "Bibliothèque juridique : droit congolais, droit international, manuels et ressources, lisibles article par article." },
      { icon: "🌅", text: "Article du jour à lire et à partager." },
      { icon: "🔍", text: "Recherche instantanée dans tous les textes." },
      { icon: "✏️", text: "Annotations : surlignage en 4 couleurs, commentaires, export et import, le tout sur votre téléphone." },
      { icon: "📖", text: "Lecture confortable : taille du texte réglable, mode sombre, reprise là où vous vous êtes arrêté." },
      { icon: "✨", text: "Assistant d'étude : il cherche d'abord dans les documents de Drapp, puis dans les sites officiels, et cite ses sources." },
      { icon: "💬", text: "Groupe d'étude anonyme et modéré, ouvert à toute heure." },
      { icon: "📰", text: "Actualités du droit chaque jour, avec leur source." },
      { icon: "📲", text: "Installation simple par code QR ou depuis l'écran d'accueil, sans boutique d'applications." },
    ],
    highlight: {
      title: "Pourquoi c'est une avancée pour les L1",
      text: "Tout est au même endroit, pensé d'abord pour le droit congolais. On étudie partout avec un simple téléphone, on ne reste plus seul face à ses questions, et on prend le réflexe d'apprendre chaque jour.",
    },
    note: "Drapp est un outil d'étude : vérifiez toujours le texte officiel.",
    screenshots: [
      { src: "/projects/drapp-1.jpg", alt: "Écran d'accueil de l'application Drapp" },
      { src: "/projects/drapp-2.jpg", alt: "Article du jour et sujets d'étude dans Drapp" },
      { src: "/projects/drapp-3.jpg", alt: "Bibliothèque des textes du droit congolais dans Drapp" },
      { src: "/projects/drapp-4.jpg", alt: "Assistant juridique de Drapp" },
    ],
    demoUrl: "https://nepios-creator.github.io/droit-rdc/",
  },
];

export const advantages = [
  {
    title: "Des solutions sur mesure",
    text: "Nous partons de votre problème réel, pas d'un modèle préfabriqué. Chaque outil est conçu pour votre façon de travailler.",
  },
  {
    title: "Pensé pour le terrain",
    text: "Mobile d'abord, interfaces légères et applications installables : nous concevons pour les usages et les contraintes de connexion d'ici.",
  },
  {
    title: "Sécurité dès la conception",
    text: "Authentification, accès par rôle et protection des données font partie de l'architecture, pas d'une option ajoutée à la fin.",
  },
  {
    title: "Un interlocuteur direct",
    text: "Une équipe basée à Kinshasa, joignable et impliquée, qui vous accompagne de l'idée jusqu'à l'évolution de votre outil.",
  },
];

export const approach = [
  {
    step: "01",
    title: "Comprendre",
    text: "Nous analysons votre organisation, vos difficultés et vos priorités avant de proposer quoi que ce soit.",
  },
  {
    step: "02",
    title: "Concevoir",
    text: "Nous définissons une solution claire, réaliste et adaptée à votre budget et à vos équipes.",
  },
  {
    step: "03",
    title: "Construire",
    text: "Nous développons par étapes, avec des points réguliers pour que vous voyiez avancer le projet.",
  },
  {
    step: "04",
    title: "Accompagner",
    text: "Nous formons vos équipes, assurons la maintenance et faisons évoluer la solution avec vous.",
  },
];
