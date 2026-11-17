// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// URL publique du site (utilisée pour le sitemap, les balises canonical et Open Graph)
const SITE_URL = process.env.SITE_URL || 'https://dolsta.fr';

export default defineConfig({
  site: SITE_URL,
  // Les pages sont générées en HTML statique ; seule la route /api/contact tourne côté serveur.
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: { host: true },
});
