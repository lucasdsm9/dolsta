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
    trade: 'électricien',
    city: 'Aire-sur-la-Lys',
    intro:
      "Vos clients vous notent 5,0/5 sur Google : votre travail parle pour vous. Avec un site à votre image, vous gagnez en visibilité auprès de ceux qui ne vous connaissent pas encore et vous affichez une image vraiment professionnelle. On vous l'a déjà préparé, à partir de votre page Facebook et de votre fiche Google : découvrez-le.",
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
      price: '29 €',
      period: '/ mois',
      recommended: true,
      text: "On s'occupe de tout : votre site reste en ligne, à jour et sécurisé, sans que vous ayez à y penser.",
      items: [
        'Hébergement et mise en ligne',
        'Nom de domaine inclus, enregistré à votre nom',
        'Mises à jour techniques et de sécurité',
        'Connexion sécurisée (HTTPS)',
      ],
    },
    {
      name: 'En autonomie',
      price: 'Inclus',
      period: '',
      recommended: false,
      text: 'On met votre site en ligne pour vous, puis vous gérez la suite vous-même.',
      items: [
        'Mise en ligne par nos soins',
        'Nom de domaine et hébergement à votre charge',
        'Renouvellements et mises à jour gérés par vous',
      ],
    },
  ],
  // Encadré « nom de domaine » sous les tarifs
  domain: {
    title: 'Et le nom de domaine ?',
    text: "C'est l'adresse de votre site (par exemple votre-entreprise.fr). Dans tous les cas, il est enregistré à votre nom : il vous appartient. Avec le Pack Tranquillité, on l'achète et on le renouvelle pour vous, c'est inclus. En autonomie, vous l'achetez vous-même (comptez quelques euros par an) et on vous aide à le relier à votre site.",
  },
};
