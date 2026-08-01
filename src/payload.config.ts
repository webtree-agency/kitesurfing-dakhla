import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import type { CollectionConfig, GlobalConfig } from 'payload';
import { en } from 'payload/i18n/en';
import sharp from 'sharp';

import { Testimonials } from './collections/Testimonials';
import { FAQs } from './collections/FAQs';
import { Media } from './collections/Media';
import { Users } from './collections/Users';

import { Settings } from './globals/Settings';
import { Startseite } from './globals/Startseite';
import { AllInclusive } from './globals/AllInclusive';
import { KitesurfLessons } from './globals/KitesurfLessons';
import { KitesurfRental } from './globals/KitesurfRental';
import { KitesurfTrips } from './globals/KitesurfTrips';
import { Buchung } from './globals/Buchung';
import { ImprintPage } from './globals/ImprintPage';
import { PrivacyPolicyPage } from './globals/PrivacyPolicyPage';

import {
  revalidateAfterChange,
  revalidateAfterDelete,
  revalidateGlobalAfterChange,
} from './lib/payload/revalidate';
import { SITE_TITLE_SUFFIX } from './lib/utils/site';

/**
 * Hängt Revalidation-Hooks an eine Collection (bestehende Hooks bleiben).
 * So gehen CMS-Edits sofort live (siehe lib/payload/revalidate.ts).
 */
function withRevalidation(c: CollectionConfig): CollectionConfig {
  return {
    ...c,
    hooks: {
      ...c.hooks,
      afterChange: [...(c.hooks?.afterChange ?? []), revalidateAfterChange],
      afterDelete: [...(c.hooks?.afterDelete ?? []), revalidateAfterDelete],
    },
  };
}

function withGlobalRevalidation(g: GlobalConfig): GlobalConfig {
  return {
    ...g,
    hooks: {
      ...g.hooks,
      afterChange: [...(g.hooks?.afterChange ?? []), revalidateGlobalAfterChange],
    },
  };
}

// Vereinfachung für den Kunden: technische Felder im Admin ausblenden.
// Sie bleiben im Schema — der Editor sieht nur die Inhaltsfelder.
const HIDDEN_ADMIN_FIELDS = new Set(['sort', 'iconClass', 'imageFallback']);

type AdminField = {
  name?: string;
  admin?: Record<string, unknown>;
  fields?: AdminField[];
  tabs?: Array<{ fields?: AdminField[] }>;
};

function hideTechnicalFields(fields: AdminField[]): void {
  for (const f of fields) {
    if (f.name && HIDDEN_ADMIN_FIELDS.has(f.name)) {
      f.admin = { ...(f.admin ?? {}), hidden: true };
    }
    if (Array.isArray(f.fields)) hideTechnicalFields(f.fields);
    if (Array.isArray(f.tabs)) {
      for (const t of f.tabs) if (Array.isArray(t.fields)) hideTechnicalFields(t.fields);
    }
  }
}

function simplifyAdmin(c: CollectionConfig): CollectionConfig {
  hideTechnicalFields(c.fields as unknown as AdminField[]);
  return c;
}

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const hasS3 = Boolean(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && process.env.S3_ENDPOINT);

/**
 * Erlaubte Origins für CORS + CSRF.
 *
 * Payload macht string-exaktes Origin-Matching gegen csrf[] beim JWT-Extract.
 * Schon ein trailing slash oder www. statt Apex heisst: Cookie wird ignoriert
 * → req.user = null → 403 im Admin (z. B. beim Media-Upload).
 *
 * Die Produktions-Domains stehen deshalb fest im Code und nicht nur in der
 * env — eine fehlende oder vertippte Env-Variable darf das Admin nicht
 * lahmlegen (Lehre aus wunderli-immobilien).
 */
function getAllowedOrigins(): string[] {
  const stripSlash = (u: string) => u.replace(/\/+$/, '');
  const fromEnv = [process.env.NEXT_PUBLIC_SERVER_URL, process.env.NEXT_PUBLIC_SITE_URL]
    .filter((u): u is string => Boolean(u))
    .map(stripSlash);
  return Array.from(
    new Set([
      ...fromEnv,
      'https://kitesurfingdakhla.com',
      'https://www.kitesurfingdakhla.com',
      'http://localhost:3000',
    ]),
  );
}

// Global-Slug → Frontend-Pfad (Live-Preview + Revalidation-Ziel).
const GLOBAL_PATHS: Record<string, string> = {
  startseite: '/',
  'all-inclusive': '/all-inclusive',
  'kitesurf-lessons': '/kitesurf-lessons',
  'kitesurf-rental': '/kitesurf-rental',
  'kitesurf-trips': '/kitesurf-trips',
  buchung: '/book',
  'imprint-page': '/imprint',
  'privacy-policy-page': '/privacy-policy',
  settings: '/',
};

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // Light-Theme erzwingen: Default 'auto' liest prefers-color-scheme. Bei
    // Dark-Mode-Browser rendert Payload weissen Text → unlesbare Felder.
    theme: 'light',
    // Live-Vorschau: Split-Screen im Admin (links bearbeiten, rechts die Seite).
    livePreview: {
      url: ({ collectionConfig, globalConfig }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL ?? '';
        const slug = globalConfig?.slug ?? collectionConfig?.slug ?? '';
        return `${base}${GLOBAL_PATHS[slug] ?? '/'}`;
      },
      collections: ['testimonials', 'faqs'],
      globals: [
        'settings',
        'startseite',
        'all-inclusive',
        'kitesurf-lessons',
        'kitesurf-rental',
        'kitesurf-trips',
        'buchung',
        'imprint-page',
        'privacy-policy-page',
      ],
      breakpoints: [
        { label: 'Mobil', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
    meta: {
      titleSuffix: ` | ${SITE_TITLE_SUFFIX} Admin`,
      icons: [{ type: 'image/x-icon', rel: 'icon', url: '/images/favicon.ico' }],
    },
  },

  collections: [
    ...[Testimonials, FAQs, Media].map((c) => withRevalidation(simplifyAdmin(c))),
    // Users ausgenommen: Login-Versuche/Lock-Updates sollen nicht die ganze
    // Site revalidieren.
    Users,
  ],

  globals: [
    Settings,
    Startseite,
    AllInclusive,
    KitesurfLessons,
    KitesurfRental,
    KitesurfTrips,
    Buchung,
    ImprintPage,
    PrivacyPolicyPage,
  ].map(withGlobalRevalidation),

  editor: lexicalEditor({}),

  // Admin-UI auf Englisch: Der Kunde (Lahcen) spricht kein Deutsch.
  // Code-Kommentare bleiben deutsch — die sind für uns.
  i18n: {
    supportedLanguages: { en },
    fallbackLanguage: 'en',
  },

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI ?? '' },
    // Schema-Sync läuft via Migrations + entrypoint (siehe scripts/docker-entrypoint.sh).
    // push:true bleibt für lokale Dev-Quick-Iteration aktiv.
    push: true,
  }),

  // Secret nur zur tatsächlichen Server-Runtime hart erzwingen.
  // Dokploy stellt env-Vars per Default nur zur Runtime bereit, nicht zur Build-Zeit.
  // Build-Steps (`payload generate:importmap`, `payload generate:types`) und Boot-
  // Migrate (`payload migrate`) laden die Config, brauchen aber den JWT-Secret nicht.
  secret: (() => {
    if (process.env.PAYLOAD_SECRET) return process.env.PAYLOAD_SECRET;
    if (process.env.NEXT_PHASE === 'phase-production-server') {
      throw new Error('PAYLOAD_SECRET muss zur Server-Runtime in Production gesetzt sein.');
    }
    return 'BUILD_TIME_PLACEHOLDER_NEVER_USED_AT_RUNTIME';
  })(),

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  sharp,

  plugins: [
    seoPlugin({
      globals: [
        'startseite',
        'all-inclusive',
        'kitesurf-lessons',
        'kitesurf-rental',
        'kitesurf-trips',
        'buchung',
      ],
      uploadsCollection: 'media',
      // SEO-Felder im Admin ausblenden (zu technisch für den Kunden). Die
      // Meta-Tags kommen hardcodiert aus den Page-Komponenten (identisch zur
      // alten Seite); CMS-Overrides bleiben für später im Schema.
      fields: ({ defaultFields }) =>
        defaultFields.map((f) => ({
          ...f,
          admin: { ...(f as { admin?: Record<string, unknown> }).admin, hidden: true },
        })) as typeof defaultFields,
    }),

    ...(hasS3
      ? [
          s3Storage({
            collections: {
              media: {
                // Prefix isoliert pro Projekt im Shared-Bucket
                // (webtree-media/kitesurfing-dakhla/…).
                prefix: process.env.S3_PREFIX ?? 'media',
                // Wenn S3_PUBLIC_URL gesetzt: Bilder direkt vom CDN-Hostname
                // ausliefern statt durch Payload-Proxy (media.webtree.ch).
                ...(process.env.S3_PUBLIC_URL
                  ? {
                      generateFileURL: ({ filename, prefix }) => {
                        const base = process.env.S3_PUBLIC_URL!.replace(/\/$/, '');
                        return prefix ? `${base}/${prefix}/${filename}` : `${base}/${filename}`;
                      },
                    }
                  : {}),
              },
            },
            bucket: process.env.S3_BUCKET!,
            config: {
              endpoint: process.env.S3_ENDPOINT,
              region: process.env.S3_REGION ?? 'auto',
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID!,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
              },
              forcePathStyle: true,
            },
          }),
        ]
      : []),
  ],

  // Globales Upload-Limit. Payload-Sharp resized danach automatisch auf
  // 2400 px Breite und konvertiert zu WebP (siehe Media-Collection).
  upload: {
    limits: {
      fileSize: 20 * 1024 * 1024,
    },
  },

  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,

  cors: getAllowedOrigins(),
  csrf: getAllowedOrigins(),

  // Angriffsfläche schliessen — Frontend nutzt ausschliesslich die Local API.
  graphQL: {
    disable: true,
  },
});
