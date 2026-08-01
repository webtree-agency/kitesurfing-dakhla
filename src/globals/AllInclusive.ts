import type { GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { ALL_INCLUSIVE_CONTENT as C } from '@/lib/content/all-inclusive';

const HTML_HINT =
  'Contains HTML markup (e.g. <span class="orange-dot">…</span> or <strong>…</strong>) — please keep it, only change the text.';

export const AllInclusive: GlobalConfig = {
  slug: 'all-inclusive',
  label: 'All-Inclusive Package',
  admin: {
    group: 'Content',
    description:
      'Content of the "7 Day All-inclusive Kitesurf Adventure" page: texts, room images, what is included and the price table.',
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
                  admin: { description: HTML_HINT },
                },
              ],
            },
            { name: 'lead', type: 'textarea', label: 'Intro text', defaultValue: C.lead },
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
          ],
        },
        {
          label: 'Room images',
          fields: [
            {
              name: 'carouselImages',
              type: 'array',
              label: 'Room carousel',
              labels: { singular: 'Image', plural: 'Images' },
              admin: {
                description:
                  'Upload your own room photos. If the list stays empty, the website shows the default photos.',
              },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Image' },
                {
                  name: 'alt',
                  type: 'text',
                  label: 'Image description (alt text)',
                  admin: { description: 'Empty = description from the media library.' },
                },
              ],
            },
          ],
        },
        {
          label: 'What is included',
          fields: [
            {
              name: 'includedHeading',
              type: 'text',
              label: 'Heading "Included"',
              defaultValue: C.includedHeading,
            },
            {
              name: 'includedItems',
              type: 'array',
              label: 'Included items',
              labels: { singular: 'Item', plural: 'Items' },
              fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
              defaultValue: C.includedItems.map((text) => ({ text })),
            },
            {
              name: 'notIncludedHeading',
              type: 'text',
              label: 'Heading "Not included"',
              defaultValue: C.notIncludedHeading,
            },
            {
              name: 'notIncludedItems',
              type: 'array',
              label: 'Not included items',
              labels: { singular: 'Item', plural: 'Items' },
              fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
              defaultValue: C.notIncludedItems.map((text) => ({ text })),
            },
          ],
        },
        {
          label: 'Prices & CTA',
          fields: [
            {
              name: 'priceTable',
              type: 'group',
              label: 'Price table',
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
                          name: 'roomType',
                          type: 'text',
                          label: 'Column "Room type"',
                          defaultValue: C.priceTable.columnLabels.roomType,
                          admin: { width: '33%' },
                        },
                        {
                          name: 'people',
                          type: 'text',
                          label: 'Column "People"',
                          defaultValue: C.priceTable.columnLabels.people,
                          admin: { width: '33%' },
                        },
                        {
                          name: 'price',
                          type: 'text',
                          label: 'Column "Price"',
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
                  label: 'Rows',
                  labels: { singular: 'Row', plural: 'Rows' },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'roomType',
                          type: 'text',
                          required: true,
                          label: 'Room type',
                          admin: { width: '40%' },
                        },
                        {
                          name: 'people',
                          type: 'text',
                          label: 'People',
                          admin: { width: '30%' },
                        },
                        // Preis als Text, damit Formate wie "799€" möglich bleiben.
                        {
                          name: 'price',
                          type: 'text',
                          required: true,
                          label: 'Price',
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
              label: 'Notice box',
              defaultValue: C.alertText,
              admin: { description: HTML_HINT },
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
          label: 'Contact section',
          fields: [
            {
              name: 'contactInfo',
              type: 'group',
              label: 'Contact section ("You are in good hands")',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Title',
                  defaultValue: C.contactInfo.heading,
                },
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
