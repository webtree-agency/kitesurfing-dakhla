import type { Field, GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { KITESURF_TRIPS_CONTENT as C, type TripVariant } from '@/lib/content/kitesurf-trips';

const HTML_HINT =
  'Achtung: enthält HTML-Markup (z. B. <strong>…</strong>) — bitte nicht entfernen, nur den Text anpassen.';

// Alle drei Trips haben identische Struktur → gemeinsamer Feld-Builder.
function tripVariantGroup(name: string, label: string, v: TripVariant): Field {
  return {
    name,
    type: 'group',
    label,
    fields: [
      { name: 'tabLabel', type: 'text', label: 'Tab-Beschriftung', defaultValue: v.tabLabel },
      { name: 'title', type: 'text', label: 'Titel', defaultValue: v.title },
      { name: 'intro', type: 'textarea', label: 'Einleitungstext', defaultValue: v.intro },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Bild',
        admin: { description: 'Leer = Standard-Foto des Trips.' },
      },
      { name: 'imageAlt', type: 'text', label: 'Bild-Beschreibung (Alt-Text)', defaultValue: v.imageAlt },
      {
        name: 'whatToExpectHeading',
        type: 'text',
        label: '„What to Expect"-Überschrift',
        defaultValue: v.whatToExpectHeading,
      },
      {
        name: 'whatToExpectParagraphs',
        type: 'array',
        label: '„What to Expect"-Absätze',
        labels: { singular: 'Absatz', plural: 'Absätze' },
        fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
        defaultValue: v.whatToExpectParagraphs.map((text) => ({ text })),
      },
      {
        name: 'howItWorksHeading',
        type: 'text',
        label: '„How It Works"-Überschrift',
        defaultValue: v.howItWorksHeading,
      },
      {
        name: 'howItWorksItems',
        type: 'array',
        label: '„How It Works"-Punkte',
        labels: { singular: 'Punkt', plural: 'Punkte' },
        fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
        defaultValue: v.howItWorksItems.map((text) => ({ text })),
      },
      {
        name: 'priceInfo',
        type: 'group',
        label: 'Preis-Infos',
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
                    name: 'price',
                    type: 'text',
                    label: 'Spalte „Preis"',
                    defaultValue: v.priceInfo.columnLabels.price,
                    admin: { width: '33%' },
                  },
                  {
                    name: 'groupSize',
                    type: 'text',
                    label: 'Spalte „Gruppengrösse"',
                    defaultValue: v.priceInfo.columnLabels.groupSize,
                    admin: { width: '33%' },
                  },
                  {
                    name: 'skillRequirement',
                    type: 'text',
                    label: 'Spalte „Level"',
                    defaultValue: v.priceInfo.columnLabels.skillRequirement,
                    admin: { width: '33%' },
                  },
                ],
              },
            ],
          },
          {
            type: 'row',
            fields: [
              // Preis als Text, damit Formate wie "25€ per person" möglich bleiben.
              {
                name: 'price',
                type: 'text',
                label: 'Preis',
                defaultValue: v.priceInfo.price,
                admin: { width: '33%' },
              },
              {
                name: 'groupSize',
                type: 'text',
                label: 'Gruppengrösse',
                defaultValue: v.priceInfo.groupSize,
                admin: { width: '33%' },
              },
              {
                name: 'skillRequirement',
                type: 'text',
                label: 'Level-Anforderung',
                defaultValue: v.priceInfo.skillRequirement,
                admin: { width: '33%' },
              },
            ],
          },
        ],
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

export const KitesurfTrips: GlobalConfig = {
  slug: 'kitesurf-trips',
  label: 'Ausflüge/Trips',
  admin: {
    group: 'Inhalte',
    description:
      'Inhalte der Seite „Kitesurf Trips": White Dune, Secret Spot und Oyster Farm mit Texten, Bildern und Preisen.',
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
          label: 'White Dune',
          fields: [tripVariantGroup('whiteDune', 'Trip zur White Dune', C.whiteDune)],
        },
        {
          label: 'Secret Spot',
          fields: [tripVariantGroup('secretSpot', 'Trip zum Secret Spot', C.secretSpot)],
        },
        {
          label: 'Oyster Farm',
          fields: [tripVariantGroup('oysterFarm', 'Trip zur Oyster Farm', C.oysterFarm)],
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
