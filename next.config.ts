import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kitesurfingdakhla.com';

// Die alte statische Seite lief mit .html-Endungen (so auch in Sitemap und
// externen Links indexiert) — dauerhaft auf die neuen Routen umleiten.
const HTML_PAGES = [
  'all-inclusive',
  'book',
  'kitesurf-lessons',
  'kitesurf-rental',
  'kitesurf-trips',
  'imprint',
  'privacy-policy',
  'success',
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // R2-CDN — Payload-Media wird via media.webtree.ch ausgeliefert
      {
        protocol: 'https',
        hostname: 'media.webtree.ch',
      },
    ],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=15768000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/videos/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },

  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      ...HTML_PAGES.map((page) => ({
        source: `/${page}.html`,
        destination: `/${page}`,
        permanent: true,
      })),
      {
        source: '/:path*',
        has: [{ type: 'host' as const, value: 'www.kitesurfingdakhla.com' }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
    ];
  },

  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
  output: 'standalone',
};

export default withPayload(nextConfig);
