import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/utils/site';

// Entspricht der alten sitemap.xml, nur mit extensionless URLs
// (die alten .html-URLs werden via next.config.ts 301-redirected).
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Array<{ path: string; priority: number }> = [
    { path: '/', priority: 1.0 },
    { path: '/book', priority: 0.9 },
    { path: '/success', priority: 0.1 },
    { path: '/all-inclusive', priority: 0.8 },
    { path: '/kitesurf-lessons', priority: 0.8 },
    { path: '/kitesurf-rental', priority: 0.8 },
    { path: '/kitesurf-trips', priority: 0.8 },
    { path: '/imprint', priority: 0.3 },
    { path: '/privacy-policy', priority: 0.3 },
  ];

  return entries.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === '/' ? '/' : path}`,
    priority,
  }));
}
