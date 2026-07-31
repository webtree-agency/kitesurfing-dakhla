'use client';

import { useEffect } from 'react';

// Lädt die Vanilla-Scripts der alten statischen Seite NACH der React-Hydration.
//
// WARUM NICHT einfach <script>-Tags im Layout: Die Scripts mutieren den DOM
// (Jahr-Span, body.loaded, Video-src, Swiper-Bullets, Isotope-Styles). Laufen
// sie vor Abschluss der Hydration, sieht React einen Server/Client-Mismatch
// (React #418), verwirft den Server-DOM und rendert neu — dabei gehen die
// Script-Mutationen verloren (Video ohne src, Banner-Listener auf entferntem
// Element). Nach der Hydration sind DOM-Mutationen für React unsichtbar.
//
// async=false garantiert Ausführung in Array-Reihenfolge (script.js braucht
// jQuery, Bootstrap und Swiper). script.js/cookie-banner.js haben readyState-
// Guards, da DOMContentLoaded/load zu diesem Zeitpunkt gefeuert sein können.
const SCRIPTS = [
  '/js/jquery-1.11.0.min.js',
  '/js/bootstrap.bundle.min.js',
  '/js/plugins.js',
  'https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js',
  '/js/script.js',
  '/js/cookie-banner.js',
];

export function ScriptLoader() {
  useEffect(() => {
    if (document.querySelector('script[data-site-scripts]')) return;
    for (const src of SCRIPTS) {
      const el = document.createElement('script');
      el.src = src;
      el.async = false;
      el.dataset.siteScripts = 'true';
      document.body.appendChild(el);
    }
  }, []);

  return null;
}
