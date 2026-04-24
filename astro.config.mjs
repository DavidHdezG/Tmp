// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Reads from env so changing domain only requires updating PUBLIC_SITE_URL
  site: process.env.PUBLIC_SITE_URL || 'https://aclatx.org',
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});