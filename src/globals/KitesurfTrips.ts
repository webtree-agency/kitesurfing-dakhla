import type { Field, GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { KITESURF_TRIPS_CONTENT as C, type TripVariant } from '@/lib/content/kitesurf-trips';

const HTML_HINT =
  'Contains HTML markup (e.g. <strong>…</strong>) — please keep it, only change the text.';

// Alle drei Trips haben identische Struktur → gemeinsamer Feld-Builder.
function tripVariantGroup(name: string, label: string, v: TripVariant): Field {
  return {
    name,
    type: 'group',
    label,
    fields: [
      { name: 'tabLabel', type: 'text', label: 'Tab label', defaultValue: v.tabLabel },
      { name: 'title', type: 'text', label: 'Title', defaultValue: v.title },
      { name: 'intro', type: 'textarea', label: 'Intro text', defaultValue: v.intro },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Image',
        admin: { description: 'Leave empty to use the default photo for this trip.' },
      },
      { name: 'imageAlt', type: 'text', label: 'Image description (alt text)', defaultValue: v.imageAlt },
      {
        name: 'whatToExpectHeading',
        type: 'text',
        label: '"What to Expect" heading',
        defaultValue: v.whatToExpectHeading,
      },
      {
        name: 'whatToExpectParagraphs',
        type: 'array',
        label: '"What to Expect" paragraphs',
        labels: { singular: 'Paragraph', plural: 'Paragraphs' },
        fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
        defaultValue: v.whatToExpectParagraphs.map((text) => ({ text })),
      },
      {
        name: 'howItWorksHeading',
        type: 'text',
        label: '"How It Works" heading',
        defaultValue: v.howItWorksHeading,
      },
      {
        name: 'howItWorksItems',
        type: 'array',
        label: '"How It Works" items',
        labels: { singular: 'Item', plural: 'Items' },
        fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
        defaultValue: v.howItWorksItems.map((text) => ({ text })),
      },
      {
        name: 'priceInfo',
        type: 'group',
        label: 'Price info',
        fields: [
          {
            name: 'columnLabels',
            type: 'group',
            label: 'Column headings',
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'price',
                    type: 'text',
                    label: '"Price" column',
                    defaultValue: v.priceInfo.columnLabels.price,
                    admin: { width: '33%' },
                  },
                  {
                    name: 'groupSize',
                    type: 'text',
                    label: '"Group size" column',
                    defaultValue: v.priceInfo.columnLabels.groupSize,
                    admin: { width: '33%' },
                  },
                  {
                    name: 'skillRequirement',
                    type: 'text',
                    label: '"Level" column',
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
                label: 'Price',
                defaultValue: v.priceInfo.price,
                admin: { width: '33%' },
              },
              {
                name: 'groupSize',
                type: 'text',
                label: 'Group size',
                defaultValue: v.priceInfo.groupSize,
                admin: { width: '33%' },
              },
              {
                name: 'skillRequirement',
                type: 'text',
                label: 'Level requirement',
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
        label: 'Notice box',
        defaultValue: v.alertText,
        admin: { description: HTML_HINT },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'ctaButtonLabel',
            type: 'text',
            label: 'Button text',
            defaultValue: v.ctaButtonLabel,
            admin: { width: '50%' },
          },
          {
            name: 'ctaButtonHref',
            type: 'text',
            label: 'Button link',
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
  label: 'Trips & Excursions',
  admin: {
    group: 'Content',
    description:
      'Content of the "Kitesurf Trips" page: White Dune, Secret Spot and Oyster Farm with texts, images and prices.',
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
          ],
        },
        {
          label: 'White Dune',
          fields: [tripVariantGroup('whiteDune', 'Trip to the White Dune', C.whiteDune)],
        },
        {
          label: 'Secret Spot',
          fields: [tripVariantGroup('secretSpot', 'Trip to the Secret Spot', C.secretSpot)],
        },
        {
          label: 'Oyster Farm',
          fields: [tripVariantGroup('oysterFarm', 'Trip to the Oyster Farm', C.oysterFarm)],
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
