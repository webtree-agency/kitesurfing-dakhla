import React from 'react';

import { SiteShell } from '@/components/SiteShell';

// Der Build hat keine DB: statisch vorgerendert stünde auf jeder Seite der
// Fallback, bis jemand im CMS speichert (Deploy 27.08.2026 hat so die
// Kunden-Texte überdeckt). Deshalb rendert das Frontend zur Laufzeit.
export const dynamic = 'force-dynamic';

/**
 * Frontend-Layout — das <html>/<head>/<body>-Gerüst liegt in SiteShell, damit
 * die Root-404 (src/app/not-found.tsx) dasselbe Gerüst nutzen kann.
 */
export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
