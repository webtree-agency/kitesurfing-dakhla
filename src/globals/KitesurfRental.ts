import type { Field, GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { KITESURF_RENTAL_CONTENT as C, type RentalTab } from '@/lib/content/kitesurf-rental';

// Alle vier Miet-Tabs haben identische Struktur → gemeinsamer Feld-Builder.
function rentalTabGroup(name: string, label: string, t: RentalTab): Field {
  return {
    name,
    type: 'group',
    label,
    fields: [
      { name: 'tabLabel', type: 'text', label: 'Tab-Beschriftung', defaultValue: t.tabLabel },
      { name: 'title', type: 'text', label: 'Titel', defaultValue: t.title },
      {
        name: 'priceRows',
        type: 'array',
        label: 'Preistabelle',
        labels: { singular: 'Zeile', plural: 'Zeilen' },
        fields: [
          {
            type: 'row',
            fields: [
              { name: 'label', type: 'text', required: true, label: 'Bezeichnung', admin: { width: '40%' } },
              // Preis als Text, damit Formate wie "+30€" möglich bleiben.
              { name: 'price', type: 'text', required: true, label: 'Preis', admin: { width: '30%' } },
              {
                name: 'highlighted',
                type: 'checkbox',
                label: 'Hervorheben',
                defaultValue: false,
                admin: { width: '30%', description: 'Zeile orange hinterlegen (z. B. Extra Day).' },
              },
            ],
          },
        ],
        defaultValue: t.priceRows.map((r) => ({ ...r, highlighted: r.highlighted ?? false })),
      },
    ],
  };
}

export const KitesurfRental: GlobalConfig = {
  slug: 'kitesurf-rental',
  label: 'Material-Miete',
  admin: {
    group: 'Inhalte',
    description:
      'Inhalte der Seite „Kitesurf Rental": Preistabellen für Full Gear, Kite Only, Board Only und Versicherung.',
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
            {
              name: 'howItWorks',
              type: 'group',
              label: '„How it works"-Abschnitt',
              fields: [
                { name: 'heading', type: 'text', label: 'Titel', defaultValue: C.howItWorks.heading },
                {
                  name: 'paragraphs',
                  type: 'array',
                  label: 'Absätze',
                  labels: { singular: 'Absatz', plural: 'Absätze' },
                  fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
                  defaultValue: C.howItWorks.paragraphs.map((text) => ({ text })),
                },
              ],
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
              defaultValue: C.iconFeatures.map((f) => ({ ...f })),
            },
            {
              name: 'cta',
              type: 'group',
              label: 'Buchen-Button',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'buttonLabel',
                      type: 'text',
                      label: 'Button-Text',
                      defaultValue: C.cta.buttonLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'buttonHref',
                      type: 'text',
                      label: 'Button-Link',
                      defaultValue: C.cta.buttonHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Full Gear',
          fields: [rentalTabGroup('fullGear', 'Full Gear', C.fullGear)],
        },
        {
          label: 'Kite Only',
          fields: [rentalTabGroup('kiteOnly', 'Kite Only', C.kiteOnly)],
        },
        {
          label: 'Board Only',
          fields: [rentalTabGroup('boardOnly', 'Board Only', C.boardOnly)],
        },
        {
          label: 'Versicherung',
          fields: [rentalTabGroup('insurance', 'Versicherung (Insurance)', C.insurance)],
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
