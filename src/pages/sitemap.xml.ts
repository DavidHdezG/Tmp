import type { APIRoute } from 'astro';

const PAGES = [
  { path: '/',             priority: '1.0', changefreq: 'weekly'  },
  { path: '/about',        priority: '0.8', changefreq: 'monthly' },
  { path: '/events',       priority: '0.9', changefreq: 'weekly'  },
  { path: '/artists',      priority: '0.8', changefreq: 'monthly' },
  { path: '/scholarships', priority: '0.9', changefreq: 'monthly' },
  { path: '/donate',       priority: '0.7', changefreq: 'monthly' },
];

export const GET: APIRoute = () => {
  const siteUrl = (import.meta.env.PUBLIC_SITE_URL || 'https://aclatx.org').replace(/\/$/, '');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(p => `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
