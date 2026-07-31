import type { Field, GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { KITESURF_LESSONS_CONTENT as C, type LessonVariant } from '@/lib/content/kitesurf-lessons';

const HTML_HINT =
  'Achtung: enthält HTML-Markup (z. B. <strong>…</strong>) — bitte nicht entfernen, nur den Text anpassen.';

// Semi-Private und Private haben identische Struktur → gemeinsamer Feld-Builder.
function lessonVariantGroup(name: string, label: string, v: LessonVariant): Field {
  return {
    name,
    type: 'group',
    label,
    fields: [
      { name: 'tabLabel', type: 'text', label: 'Tab-Beschriftung', defaultValue: v.tabLabel },
      { name: 'title', type: 'text', label: 'Titel', defaultValue: v.title },
      {
        name: 'description',
        type: 'array',
        label: 'Beschreibung (Absätze)',
        labels: { singular: 'Absatz', plural: 'Absätze' },
        fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
        defaultValue: v.description.map((text) => ({ text })),
      },
      {
        name: 'iconFeatures',
        type: 'array',
        label: 'Icon-Merkmale',
        labels: { singular: 'Merkmal', plural: 'Merkmale' },
        fields: [
          { name: 'iconClass', type: 'text' },
          { name: 'label', type: 'text', required: true, label: 'Text' },
        ],
        defaultValue: v.iconFeatures.map((f) => ({ ...f })),
      },
      {
        name: 'priceRows',
        type: 'array',
        label: 'Preistabelle',
        labels: { singular: 'Zeile', plural: 'Zeilen' },
        fields: [
          {
            type: 'row',
            fields: [
              { name: 'label', type: 'text', required: true, label: 'Bezeichnung', admin: { width: '30%' } },
              // Preis als Text, damit Formate wie "40€" möglich bleiben.
              { name: 'price', type: 'text', required: true, label: 'Preis', admin: { width: '20%' } },
              {
                name: 'note',
                type: 'text',
                label: 'Notiz',
                admin: { width: '35%', description: 'z. B. "(Recommended for beginners)" — leer lassen wenn keine.' },
              },
              {
                name: 'highlighted',
                type: 'checkbox',
                label: 'Hervorheben',
                defaultValue: false,
                admin: { width: '15%', description: 'Zeile orange hinterlegen.' },
              },
            ],
          },
        ],
        defaultValue: v.priceRows.map((r) => ({ ...r })),
      },
      {
        name: 'alertText',
        type: 'textarea',
        label: 'Hinweis-Box',
        defaultValue: v.alertText,
        admin: { description: HTML_HINT },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'ctaButtonLabel',
            type: 'text',
            label: 'Button-Text',
            defaultValue: v.ctaButtonLabel,
            admin: { width: '50%' },
          },
          {
            name: 'ctaButtonHref',
            type: 'text',
            label: 'Button-Link',
            defaultValue: v.ctaButtonHref,
            admin: { width: '50%' },
          },
        ],
      },
    ],
  };
}

export const KitesurfLessons: GlobalConfig = {
  slug: 'kitesurf-lessons',
  label: 'Kitesurf-Kurse',
  admin: {
    group: 'Inhalte',
    description:
      'Inhalte der Seite „Kitesurf Lessons": Semi-Private- und Private-Kurse mit Preistabellen.',
  },
  access: { read: publicRead, update: authenticated },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Allgemein',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Kopfbereich',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Kleine Überschrift',
                  defaultValue: C.hero.eyebrow,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Titel',
                  defaultValue: C.hero.heading,
                  admin: {
                    description:
                      'Achtung: enthält HTML-Markup (<span class="orange-dot">…</span>) — bitte nicht entfernen.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Semi-Private',
          fields: [lessonVariantGroup('semiPrivate', 'Semi-Private Kurse', C.semiPrivate)],
        },
        {
          label: 'Private',
          fields: [lessonVariantGroup('private', 'Private Kurse', C.private)],
        },
        {
          label: 'Kontakt-Abschnitt',
          fields: [
            {
              name: 'contactInfo',
              type: 'group',
              label: 'Kontakt-Abschnitt („You are in good hands")',
              fields: [
                { name: 'heading', type: 'text', label: 'Titel', defaultValue: C.contactInfo.heading },
                {
                  name: 'textLines',
                  type: 'array',
                  label: 'Textzeilen',
                  labels: { singular: 'Zeile', plural: 'Zeilen' },
                  fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
                  defaultValue: C.contactInfo.textLines.map((text) => ({ text })),
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'buttonLabel',
                      type: 'text',
                      label: 'Button-Text',
                      defaultValue: C.contactInfo.buttonLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'buttonHref',
                      type: 'text',
                      label: 'Button-Link',
                      defaultValue: C.contactInfo.buttonHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
