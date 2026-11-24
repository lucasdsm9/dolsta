# DOLSTA — site vitrine

Astro + Tailwind CSS, formulaire de contact par SMTP, déploiement Docker derrière nginx.

## Modifier le contenu

Tous les textes (services, projets, process, email, ville) sont dans **`src/data/site.ts`**.
Les remplacer suffit : pas besoin de toucher aux composants.

| Fichier | Rôle |
|---|---|
| `src/data/site.ts` | Contenu du site |
| `src/components/` | Sections de la page (Hero, Projets, Services, Process, Contact…) |
| `src/styles/global.css` | Couleurs et polices (bloc `@theme`) |
| `src/pages/api/contact.ts` | Envoi du formulaire par email |
| `src/pages/mentions-legales.astro` | Mentions légales (provisoires : à compléter une fois la structure créée) |
| `public/og-image.png` | Image affichée quand le lien est partagé (LinkedIn, WhatsApp…) |

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

Le site tourne derrière le **nginx déjà présent** sur le VPS (projet `~/app`) : le conteneur `dolsta` rejoint le réseau Docker `app_app_network`, et `nginx/dolsta.conf` dit à nginx d'envoyer `dolsta.fr` vers lui.

1. DNS : enregistrements **A** `dolsta.fr` et `www.dolsta.fr` → `54.37.159.172` (supprimer les A/AAAA par défaut d'OVH).
2. Envoyer le projet : `rsync -av --exclude node_modules --exclude dist --exclude .astro --exclude .env ./ debian@54.37.159.172:~/dolsta/`
3. Sur le VPS : `cd ~/dolsta && cp .env.example .env && nano .env` puis `docker compose up -d --build`
4. Certificat (coupe nginx ~30 s) : `cd ~/app && docker compose stop nginx && sudo certbot certonly --standalone -d dolsta.fr -d www.dolsta.fr; docker compose start nginx`
5. `cp ~/dolsta/nginx/dolsta.conf ~/app/nginx/`, ajouter le volume `./nginx/dolsta.conf:/etc/nginx/conf.d/dolsta.conf:ro` au service nginx de `~/app/docker-compose.yml`, puis `docker compose up -d nginx`.

Mettre à jour le site ensuite : relancer le `rsync` depuis le Mac, puis sur le VPS `cd ~/dolsta && docker compose up -d --build`.

Logs : `docker logs -f dolsta`.

## Ajouter un projet

Dans `src/data/site.ts`, copie le bloc de Rubea dans `projects` et change les textes.
`visual` choisit l'illustration : `rendezvous`, `vitrine`, `metier`, `flux`, `seo` ou `outil`.
La carte « Votre projet pourrait être le prochain » reste toujours en dernier.

## Formulaire de contact (Gmail)

1. Active la validation en deux étapes sur ton compte Google.
2. Crée un mot de passe d'application sur https://myaccount.google.com/apppasswords (nom : `dolsta`).
3. Sur le VPS : `nano ~/dolsta/.env`, remplis `SMTP_USER`, `SMTP_PASS` (les 16 lettres, sans espaces), `SMTP_FROM` et `CONTACT_TO`.
4. `cd ~/dolsta && docker compose up -d` pour recharger la config.

## SEO déjà en place

- Pages en HTML statique (très rapides)
- `sitemap-index.xml` généré au build, `robots.txt`
- Balises title / description / canonical / Open Graph
- Données structurées schema.org (`ProfessionalService`)

À faire de ton côté : remplacer `dolsta.fr` dans `public/robots.txt` si le domaine change, ajouter une image Open Graph, et déclarer le site dans Google Search Console.
