// ─────────────────────────────────────────────────────────────
//  Tout le contenu du site est ici : modifie ce fichier pour
//  changer les textes, les services, les projets ou le process.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'DOLSTA',
  title: 'DOLSTA — Sites vitrines, applications sur mesure et référencement',
  description:
    "Agence de développement : sites vitrines qui vous font trouver sur Google et applications sur mesure qui simplifient le quotidien des entreprises.",
  // Laisse vide tant que l'adresse n'existe pas : elle ne s'affiche nulle part.
  email: '',
  year: new Date().getFullYear(),
};

// Liens du menu, dans l'ordre des sections de la page
export const nav = [
  { label: 'Réalisations', href: '/#projets' },
  { label: 'Services', href: '/#services' },
  { label: 'Notre méthode', href: '/#process' },
];

// Bouton mis en avant à droite du menu
export const navCta = { label: 'Nous contacter', href: '/#contact' };

export type ProjectVisual = 'rendezvous' | 'vitrine' | 'metier' | 'flux' | 'seo' | 'outil';

// Pour ajouter un projet : copie un bloc, change les textes.
// visual = illustration utilisée (voir ProjectVisual.astro), bg = couleur de fond de la carte.
// url est facultatif : sans url, la carte n'a pas de lien.
// screenshot (facultatif) : capture d'écran mobile placée dans public/projets/,
// affichée dans un téléphone à la place de l'illustration.
export const projects: {
  name: string;
  tag: string;
  description: string;
  url?: string;
  bg: string;
  visual: ProjectVisual;
  screenshot?: { src: string; alt: string };
}[] = [
  {
    name: 'Rubea',
    tag: 'Application SaaS',
    description:
      "Plateforme de prise de rendez-vous en ligne pour les salons et praticiens : page de réservation, agenda, rappels par email et abonnement intégré.",
    url: 'https://rubea.fr',
    bg: '#FFE8D6',
    visual: 'rendezvous',
    screenshot: {
      src: '/projets/rubea-mobile.webp',
      alt: 'Page de réservation Rubea sur mobile : choix des prestations et bouton « Prendre rendez-vous »',
    },
  },
];

export type ServiceTheme = 'lavender' | 'white' | 'red' | 'night';

export const services: {
  num: string;
  title: string;
  text: string;
  items: string[];
  theme: ServiceTheme;
}[] = [
  {
    num: '01',
    title: 'Sites vitrines',
    text: 'Un site rapide et clair qui présente votre activité, inspire confiance et transforme les visiteurs en demandes de contact.',
    items: [
      'Création & refonte de site',
      'Pages services & réalisations',
      'Formulaires & prise de rendez-vous',
      'Contenu modifiable en autonomie',
      'Hébergement & nom de domaine',
    ],
    theme: 'lavender',
  },
  {
    num: '02',
    title: 'Applications sur mesure',
    text: "Des outils web taillés pour vos process : moins de tâches répétitives, moins d'erreurs, plus de temps pour votre cœur de métier.",
    items: [
      'Applications métier & extranets',
      'Automatisation des tâches',
      'Tableaux de bord & reporting',
      'Connexion à vos outils (CRM, ERP, compta)',
      'Remplacement des fichiers Excel',
    ],
    theme: 'white',
  },
  {
    num: '03',
    title: 'Référencement (SEO)',
    text: 'Être trouvé par vos clients au bon moment : on optimise votre site pour remonter sur Google, durablement.',
    items: [
      'Audit SEO & technique',
      'Recherche de mots-clés',
      'Référencement local (Google Business)',
      'Optimisation de la vitesse',
      'Suivi des positions',
    ],
    theme: 'red',
  },
  {
    num: '04',
    title: 'Maintenance & évolution',
    text: 'On reste à vos côtés après la mise en ligne : correctifs, performance, nouvelles fonctionnalités.',
    items: [
      'Hébergement & sauvegardes',
      'Mises à jour de sécurité',
      'Nouvelles fonctionnalités',
      'Optimisation des performances',
      'Support réactif',
    ],
    theme: 'night',
  },
];

export const process = [
  { num: '01', title: 'Découverte', text: 'On analyse votre activité, vos process et ce qui vous fait perdre du temps.', tone: 'pink' },
  { num: '02', title: 'Conception', text: 'Cahier des charges, fonctionnalités et choix techniques validés ensemble.', tone: 'blue' },
  { num: '03', title: 'Développement', text: 'Sprints courts, démos régulières et code testé.', tone: 'pink' },
  { num: '04', title: 'Lancement & suivi', text: 'Mise en ligne, formation de votre équipe, référencement et améliorations continues.', tone: 'blue' },
] as const;
