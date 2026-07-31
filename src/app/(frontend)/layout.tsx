import React from 'react';

import { LivePreviewListener } from '@/components/LivePreviewListener';
import { ScriptLoader } from '@/components/ScriptLoader';

/**
 * Frontend-Layout — repliziert das <head>/<body>-Gerüst der alten statischen
 * Seite 1:1. Alle Assets (Bootstrap, style.css, vendored JS) liegen unverändert
 * unter public/, CDN-Deps (Swiper, ldrs, Font Awesome, Google Fonts) werden wie
 * bisher geladen.
 *
 * WICHTIG: Seiten verlinken mit normalen <a>-Tags (kein next/link) → jede
 * Navigation ist ein Full-Page-Load, wodurch js/script.js (Swiper-Init,
 * Isotope-Tabs, Preloader) auf jeder Seite frisch läuft — exakt wie auf der
 * alten Seite. Die <script>-Tags stehen wie im Original am Ende des <body>
 * und laufen in Dokument-Reihenfolge.
 */
export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo/google-image.png" />
        <link rel="icon" href="/images/logo/favicon.svg" type="image/svg+xml" />
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Outfit:wght@100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Syne:wght@400..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <LivePreviewListener />
        {/* ldrs (Preloader-Custom-Element) darf früh laden: Upgrade nutzt
            Shadow DOM und verursacht keinen Hydration-Mismatch. Alle anderen
            Scripts mutieren den DOM und werden deshalb vom ScriptLoader erst
            NACH der Hydration sequentiell geladen (sonst React #418 →
            Client-Re-Render → Video/Cookie-Banner brechen). */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- type=module lädt ohnehin deferred */}
        <script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/lineWobble.js" />
        <ScriptLoader />
      </body>
    </html>
  );
}
