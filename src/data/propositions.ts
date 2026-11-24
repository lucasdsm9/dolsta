// ─────────────────────────────────────────────────────────────
//  Propositions commerciales : une page par prospect,
//  servie sur /proposition/<slug>.
//
//  Pour ajouter un prospect :
//   1. créer sa maquette dans src/pages/<slug>/index.astro (noindex + bandeau DOLSTA)
//   2. ajouter ses captures dans public/propositions/<slug>-desktop.webp et -mobile.webp
//   3. ajouter un bloc ci-dessous
//   4. ajouter '/<slug>' dans la liste PRIVATE de astro.config.mjs (hors sitemap)
// ─────────────────────────────────────────────────────────────

export type Proposition = {
  slug: string;
  business: string; // nom de l'entreprise
  firstName: string; // prénom du gérant, pour le « Bonjour … »
  trade: string; // métier, ex. « électricien »
  city: string; // ville principale, pour l'exemple de recherche Google
  intro: string; // phrase d'accroche personnalisée
  siteUrl: string; // adresse de la maquette
  preview: { desktop: string; mobile: string };
};

export const propositions: Proposition[] = [
  {
    slug: 'martel-elec',
    business: 'Martel Électricité',
    firstName: 'Léo',
    trade: 'électricien',
    city: 'Aire-sur-la-Lys',
    intro:
      "Vos clients vous notent 5,0/5 sur Google, mais Martel Électricité n'a pas encore de site internet. Alors on vous en a préparé un, à partir de votre page Facebook et de votre fiche Google. Il est prêt : jetez-y un œil.",
    siteUrl: '/martel-elec/',
    preview: {
      desktop: '/propositions/martel-elec-desktop.webp',
      mobile: '/propositions/martel-elec-mobile.webp',
    },
  },
];

// Offre commune à toutes les propositions
export const offer = {
  site: {
    price: '299 €',
    note: 'paiement unique',
    items: [
      'Le site complet que vous venez de découvrir',
      'Adapté aux ordinateurs et aux téléphones',
      '7 jours de modifications inclus : textes, éléments, photos',
    ],
  },
  hosting: [
    {
      name: 'Pack Tranquillité',
      price: '30 €',
      period: '/ mois',
      recommended: true,
      text: "On héberge et on met en ligne votre site : vous n'avez rien à gérer.",
      items: ['Hébergement de votre site', 'Mise en ligne par nos soins', 'Connexion sécurisée (HTTPS)'],
    },
    {
      name: 'En autonomie',
      price: 'Inclus',
      period: '',
      recommended: false,
      text: 'Vous préférez gérer vous-même ? On vous fournit un guide pour héberger votre site.',
      items: ['Guide pas à pas', 'Vous choisissez votre hébergeur'],
    },
  ],
};
