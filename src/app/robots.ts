import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/utils/site';

/**
 * Robots-Direktiven. Suchmaschinen dürfen die Marketing-Seiten crawlen,
 * aber NICHT das Payload-Admin und die API.
 *
 * WARUM: Ein indexiertes /admin lädt Bots und Angreifer direkt auf die
 * Login-Maske ein (Lehre aus dem Wunderli-Vorfall). Die alte statische
 * robots.txt hatte nur den Sitemap-Eintrag und keine Disallow-Regeln —
 * damals gab es aber auch kein Admin auf der Domain.
 */
const DISALLOW = ['/admin', '/admin/*', '/api/', '/api/*', '/_next/', '/static/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: DISALLOW }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
