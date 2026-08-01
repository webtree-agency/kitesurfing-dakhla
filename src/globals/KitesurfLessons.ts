import type { Field, GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { KITESURF_LESSONS_CONTENT as C, type LessonVariant } from '@/lib/content/kitesurf-lessons';

const HTML_HINT =
  'Contains HTML markup (e.g. <strong>…</strong>) — please keep it, only change the text.';

// Semi-Private und Private haben identische Struktur → gemeinsamer Feld-Builder.
function lessonVariantGroup(name: string, label: string, v: LessonVariant): Field {
  return {
    name,
    type: 'group',
    label,
    fields: [
      { name: 'tabLabel', type: 'text', label: 'Tab label', defaultValue: v.tabLabel },
      { name: 'title', type: 'text', label: 'Title', defaultValue: v.title },
      {
        name: 'description',
        type: 'array',
        label: 'Description (paragraphs)',
        labels: { singular: 'Paragraph', plural: 'Paragraphs' },
        fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
        defaultValue: v.description.map((text) => ({ text })),
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
        defaultValue: v.iconFeatures.map((f) => ({ ...f })),
      },
      {
        name: 'priceRows',
        type: 'array',
        label: 'Price table',
        labels: { singular: 'Row', plural: 'Rows' },
        fields: [
          {
            type: 'row',
            fields: [
              { name: 'label', type: 'text', required: true, label: 'Label', admin: { width: '30%' } },
              // Preis als Text, damit Formate wie "40€" möglich bleiben.
              { name: 'price', type: 'text', required: true, label: 'Price', admin: { width: '20%' } },
              {
                name: 'note',
                type: 'text',
                label: 'Note',
                admin: { width: '35%', description: 'e.g. "(Recommended for beginners)" — leave empty if none.' },
              },
              {
                name: 'highlighted',
                type: 'checkbox',
                label: 'Highlight',
                defaultValue: false,
                admin: { width: '15%', description: 'Give this row an orange background.' },
              },
            ],
          },
        ],
        defaultValue: v.priceRows.map((r) => ({ ...r })),
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

export const KitesurfLessons: GlobalConfig = {
  slug: 'kitesurf-lessons',
  label: 'Kitesurf Lessons',
  admin: {
    group: 'Content',
    description:
      'Content of the "Kitesurf Lessons" page: semi-private and private lessons with their price tables.',
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
          label: 'Semi-Private',
          fields: [lessonVariantGroup('semiPrivate', 'Semi-Private lessons', C.semiPrivate)],
        },
        {
          label: 'Private',
          fields: [lessonVariantGroup('private', 'Private lessons', C.private)],
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
