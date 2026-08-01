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
      { name: 'tabLabel', type: 'text', label: 'Tab label', defaultValue: t.tabLabel },
      { name: 'title', type: 'text', label: 'Title', defaultValue: t.title },
      {
        name: 'priceRows',
        type: 'array',
        label: 'Price table',
        labels: { singular: 'Row', plural: 'Rows' },
        fields: [
          {
            type: 'row',
            fields: [
              { name: 'label', type: 'text', required: true, label: 'Label', admin: { width: '40%' } },
              // Preis als Text, damit Formate wie "+30€" möglich bleiben.
              { name: 'price', type: 'text', required: true, label: 'Price', admin: { width: '30%' } },
              {
                name: 'highlighted',
                type: 'checkbox',
                label: 'Highlight',
                defaultValue: false,
                admin: { width: '30%', description: 'Give the row an orange background (e.g. Extra Day).' },
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
  label: 'Equipment Rental',
  admin: {
    group: 'Content',
    description:
      'Content of the "Kitesurf Rental" page: price tables for Full Gear, Kite Only, Board Only and Insurance.',
  },
  access: { read: publicRead, update: authenticated },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Header',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Small heading',
                  defaultValue: C.hero.eyebrow,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Title',
                  defaultValue: C.hero.heading,
                  admin: {
                    description:
                      'Contains HTML markup (<span class="orange-dot">…</span>) — please keep it, only change the text.',
                  },
                },
              ],
            },
            {
              name: 'howItWorks',
              type: 'group',
              label: '"How it works" section',
              fields: [
                { name: 'heading', type: 'text', label: 'Title', defaultValue: C.howItWorks.heading },
                {
                  name: 'paragraphs',
                  type: 'array',
                  label: 'Paragraphs',
                  labels: { singular: 'Paragraph', plural: 'Paragraphs' },
                  fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
                  defaultValue: C.howItWorks.paragraphs.map((text) => ({ text })),
                },
              ],
            },
            {
              name: 'iconFeatures',
              type: 'array',
              label: 'Icon features',
              labels: { singular: 'Feature', plural: 'Features' },
              fields: [
                { name: 'iconClass', type: 'text' },
                { name: 'label', type: 'text', required: true, label: 'Text' },
              ],
              defaultValue: C.iconFeatures.map((f) => ({ ...f })),
            },
            {
              name: 'cta',
              type: 'group',
              label: 'Booking button',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'buttonLabel',
                      type: 'text',
                      label: 'Button text',
                      defaultValue: C.cta.buttonLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'buttonHref',
                      type: 'text',
                      label: 'Button link',
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
          label: 'Insurance',
          fields: [rentalTabGroup('insurance', 'Insurance', C.insurance)],
        },
        {
          label: 'Contact section',
          fields: [
            {
              name: 'contactInfo',
              type: 'group',
              label: 'Contact section ("You are in good hands")',
              fields: [
                { name: 'heading', type: 'text', label: 'Title', defaultValue: C.contactInfo.heading },
                {
                  name: 'textLines',
                  type: 'array',
                  label: 'Text lines',
                  labels: { singular: 'Line', plural: 'Lines' },
                  fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
                  defaultValue: C.contactInfo.textLines.map((text) => ({ text })),
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'buttonLabel',
                      type: 'text',
                      label: 'Button text',
                      defaultValue: C.contactInfo.buttonLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'buttonHref',
                      type: 'text',
                      label: 'Button link',
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
