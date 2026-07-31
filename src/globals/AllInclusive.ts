import type { GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { ALL_INCLUSIVE_CONTENT as C } from '@/lib/content/all-inclusive';

const HTML_HINT =
  'Achtung: enthält HTML-Markup (z. B. <span class="orange-dot">…</span> oder <strong>…</strong>) — bitte nicht entfernen, nur den Text anpassen.';

export const AllInclusive: GlobalConfig = {
  slug: 'all-inclusive',
  label: 'All-Inclusive Paket',
  admin: {
    group: 'Inhalte',
    description:
      'Inhalte der Seite „7 Day All-inclusive Kitesurf Adventure": Texte, Zimmer-Bilder, Leistungen und Preistabelle.',
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
                  admin: { description: HTML_HINT },
                },
              ],
            },
            { name: 'lead', type: 'textarea', label: 'Einleitungstext', defaultValue: C.lead },
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
          ],
        },
        {
          label: 'Zimmer-Bilder',
          fields: [
            {
              name: 'carouselImages',
              type: 'array',
              label: 'Zimmer-Karussell',
              labels: { singular: 'Bild', plural: 'Bilder' },
              admin: {
                description:
                  'Eigene Zimmer-Fotos hochladen. Bleibt die Liste leer, zeigt die Website die Standard-Fotos.',
              },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Bild' },
                {
                  name: 'alt',
                  type: 'text',
                  label: 'Bild-Beschreibung (Alt-Text)',
                  admin: { description: 'Leer = Beschreibung aus der Mediathek.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Leistungen',
          fields: [
            {
              name: 'includedHeading',
              type: 'text',
              label: 'Überschrift „Inklusive"',
              defaultValue: C.includedHeading,
            },
            {
              name: 'includedItems',
              type: 'array',
              label: 'Inklusive Leistungen',
              labels: { singular: 'Leistung', plural: 'Leistungen' },
              fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
              defaultValue: C.includedItems.map((text) => ({ text })),
            },
            {
              name: 'notIncludedHeading',
              type: 'text',
              label: 'Überschrift „Nicht inklusive"',
              defaultValue: C.notIncludedHeading,
            },
            {
              name: 'notIncludedItems',
              type: 'array',
              label: 'Nicht inklusive Leistungen',
              labels: { singular: 'Leistung', plural: 'Leistungen' },
              fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
              defaultValue: C.notIncludedItems.map((text) => ({ text })),
            },
          ],
        },
        {
          label: 'Preise & CTA',
          fields: [
            {
              name: 'priceTable',
              type: 'group',
              label: 'Preistabelle',
              fields: [
                {
                  name: 'columnLabels',
                  type: 'group',
                  label: 'Spaltenüberschriften',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'roomType',
                          type: 'text',
                          label: 'Spalte „Zimmertyp"',
                          defaultValue: C.priceTable.columnLabels.roomType,
                          admin: { width: '33%' },
                        },
                        {
                          name: 'people',
                          type: 'text',
                          label: 'Spalte „Personen"',
                          defaultValue: C.priceTable.columnLabels.people,
                          admin: { width: '33%' },
                        },
                        {
                          name: 'price',
                          type: 'text',
                          label: 'Spalte „Preis"',
                          defaultValue: C.priceTable.columnLabels.price,
                          admin: { width: '33%' },
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'rows',
                  type: 'array',
                  label: 'Zeilen',
                  labels: { singular: 'Zeile', plural: 'Zeilen' },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'roomType',
                          type: 'text',
                          required: true,
                          label: 'Zimmertyp',
                          admin: { width: '40%' },
                        },
                        {
                          name: 'people',
                          type: 'text',
                          label: 'Personen',
                          admin: { width: '30%' },
                        },
                        // Preis als Text, damit Formate wie "799€" möglich bleiben.
                        {
                          name: 'price',
                          type: 'text',
                          required: true,
                          label: 'Preis',
                          admin: { width: '30%' },
                        },
                      ],
                    },
                  ],
                  defaultValue: C.priceTable.rows.map((r) => ({ ...r })),
                },
              ],
            },
            {
              name: 'alertText',
              type: 'textarea',
              label: 'Hinweis-Box',
              defaultValue: C.alertText,
              admin: { description: HTML_HINT },
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
          label: 'Kontakt-Abschnitt',
          fields: [
            {
              name: 'contactInfo',
              type: 'group',
              label: 'Kontakt-Abschnitt („You are in good hands")',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Titel',
                  defaultValue: C.contactInfo.heading,
                },
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
