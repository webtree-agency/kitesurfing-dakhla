import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
      'react/jsx-curly-brace-presence': ['error', 'never'],
      // Interne Links sind bewusst plain <a> statt next/link: jede Navigation
      // muss ein Full-Page-Load sein, damit js/script.js (Swiper, Isotope-Tabs,
      // Offcanvas, Preloader) auf jeder Seite frisch initialisiert — genau wie
      // auf der alten statischen Seite. Mit next/link würde die Client-Navigation
      // die Vanilla-Initialisierung überspringen.
      '@next/next/no-html-link-for-pages': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
    },
  },
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'src/payload-types.ts',
      'src/migrations/**',
      'public/**',
      'scripts/**',
      'src/app/\\(payload\\)/admin/importMap.js',
    ],
  },
];

export default config;
