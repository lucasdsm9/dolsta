# DOLSTA — site vitrine

Astro + Tailwind CSS, formulaire de contact par SMTP, déploiement Docker + Caddy (HTTPS automatique).

## Modifier le contenu

Tous les textes (services, projets, process, email, ville) sont dans **`src/data/site.ts`**.
Les remplacer suffit : pas besoin de toucher aux composants.

| Fichier | Rôle |
|---|---|
| `src/data/site.ts` | Contenu du site |
| `src/components/` | Sections de la page (Hero, Projets, Services, Process, Contact…) |
| `src/styles/global.css` | Couleurs et polices (bloc `@theme`) |
| `src/pages/api/contact.ts` | Envoi du formulaire par email |
| `src/pages/mentions-legales.astro` | Mentions légales (à compléter) |

## En local

Node.js **22.23.4 minimum** (exigé par Astro). Avec nvm : `nvm install && nvm use` (lit le fichier `.nvmrc`).

```bash
npm install
cp .env.example .env    # remplis les infos SMTP pour tester le formulaire
npm run dev             # http://localhost:4321
```

> En `npm run dev`, les variables du `.env` ne sont pas chargées automatiquement par le formulaire :
> lance `node --env-file=.env ./node_modules/.bin/astro dev` pour tester l'envoi réel.

Build de production : `npm run build` puis `node --env-file=.env ./dist/server/entry.mjs`.

## Déployer sur le VPS

Prérequis : Docker + Docker Compose sur le VPS, et un enregistrement DNS **A** (`dolsta.fr` et `www.dolsta.fr`) qui pointe vers l'IP du VPS. Ports 80 et 443 ouverts.

```bash
# sur le VPS
git clone <ton-repo> dolsta && cd dolsta
cp .env.example .env && nano .env     # DOMAIN + SMTP
docker compose up -d --build
```

Caddy récupère le certificat HTTPS tout seul au premier démarrage.

Mettre à jour après une modification :

```bash
git pull && docker compose up -d --build
```

Voir les logs : `docker compose logs -f web`.

## SEO déjà en place

- Pages en HTML statique (très rapides)
- `sitemap-index.xml` généré au build, `robots.txt`
- Balises title / description / canonical / Open Graph
- Données structurées schema.org (`ProfessionalService`)

À faire de ton côté : remplacer `dolsta.fr` dans `public/robots.txt` si le domaine change, ajouter une image Open Graph, et déclarer le site dans Google Search Console.
