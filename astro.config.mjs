// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// URL publique du site (utilisée pour le sitemap, les balises canonical et Open Graph)
const SITE_URL = process.env.SITE_URL || 'https://dolsta.fr';

// Pages privées (propositions et maquettes de prospects) : jamais dans le sitemap.
// Ajoute ici le chemin de chaque nouvelle maquette.
const PRIVATE = ['/proposition/', '/martel-elec'];

export default defineConfig({
  site: SITE_URL,
  // Les pages sont générées en HTML statique ; seule la route /api/contact tourne côté serveur.
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    sitemap({
      filter: (page) => !PRIVATE.some((p) => new URL(page).pathname.startsWith(p)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  server: { host: true },
});
