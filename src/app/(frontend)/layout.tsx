import React from 'react';

import { SiteShell } from '@/components/SiteShell';

/**
 * Frontend-Layout — das <html>/<head>/<body>-Gerüst liegt in SiteShell, damit
 * die Root-404 (src/app/not-found.tsx) dasselbe Gerüst nutzen kann.
 */
export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
