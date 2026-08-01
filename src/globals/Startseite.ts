import type { GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { STARTSEITE_CONTENT as C } from '@/lib/content/startseite';

// Hinweis für Felder, deren Wert HTML-Markup enthält (orange Hervorhebung).
const HTML_HINT =
  'Contains HTML markup (e.g. <span class="orange-dot">…</span>) for the orange highlight — please keep it, only change the text.';

export const Startseite: GlobalConfig = {
  slug: 'startseite',
  label: 'Home page',
  admin: {
    group: 'Content',
    description:
      'All texts and images of the home page: hero, service cards, about us, gallery and the headings of the testimonial and FAQ sections.',
  },
  access: { read: publicRead, update: authenticated },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Hero (image at the very top)',
              fields: [
                { name: 'title', type: 'text', label: 'Title', defaultValue: C.hero.title },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Subtitle',
                  defaultValue: C.hero.subtitle,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'buttonLabel',
                      type: 'text',
                      label: 'Button text',
                      defaultValue: C.hero.buttonLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'buttonHref',
                      type: 'text',
                      label: 'Button link',
                      defaultValue: C.hero.buttonHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Services',
          fields: [
            {
              name: 'services',
              type: 'group',
              label: 'Services section',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Small heading',
                  defaultValue: C.services.eyebrow,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Title',
                  defaultValue: C.services.heading,
                  admin: { description: HTML_HINT },
                },
                {
                  name: 'intro',
                  type: 'textarea',
                  label: 'Intro text',
                  defaultValue: C.services.intro,
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
                  defaultValue: C.services.iconFeatures.map((f) => ({ ...f })),
                },
                {
                  name: 'cardsHeading',
                  type: 'text',
                  label: 'Heading above the cards',
                  defaultValue: C.services.cardsHeading,
                  admin: { description: HTML_HINT },
                },
                {
                  name: 'cards',
                  type: 'array',
                  label: 'Service cards',
                  labels: { singular: 'Card', plural: 'Cards' },
                  fields: [
                    { name: 'title', type: 'text', required: true, label: 'Title' },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Description',
                    },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Image',
                      admin: { description: 'Empty = default image of the card.' },
                    },
                    { name: 'imageAlt', type: 'text', label: 'Image description (alt text)' },
                    { name: 'linkHref', type: 'text', label: 'Link' },
                    { name: 'buttonLabel', type: 'text', label: 'Button text' },
                  ],
                  // imageSrc bleibt bewusst statisch (Fallback im Loader,
                  // index-basiert) — im CMS wird nur ein optionaler Upload gepflegt.
                  defaultValue: C.services.cards.map((c) => ({
                    title: c.title,
                    description: c.description,
                    imageAlt: c.imageAlt,
                    linkHref: c.linkHref,
                    buttonLabel: c.buttonLabel,
                  })),
                },
              ],
            },
          ],
        },
        {
          label: 'About us',
          fields: [
            {
              name: 'aboutUs',
              type: 'group',
              label: 'About us section',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Small heading',
                  defaultValue: C.aboutUs.eyebrow,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Title',
                  defaultValue: C.aboutUs.heading,
                  admin: { description: HTML_HINT },
                },
                {
                  name: 'intro',
                  type: 'textarea',
                  label: 'Intro text',
                  defaultValue: C.aboutUs.intro,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Photo',
                  admin: { description: 'Empty = default photo (team).' },
                },
                {
                  name: 'imageAlt',
                  type: 'text',
                  label: 'Photo description (alt text)',
                  defaultValue: C.aboutUs.imageAlt,
                },
                {
                  name: 'whyChooseHeading',
                  type: 'text',
                  label: '"Why us" heading',
                  defaultValue: C.aboutUs.whyChooseHeading,
                },
                {
                  name: 'whyChooseText',
                  type: 'textarea',
                  label: '"Why us" text',
                  defaultValue: C.aboutUs.whyChooseText,
                },
                {
                  name: 'bullets',
                  type: 'array',
                  label: 'Bullet points',
                  labels: { singular: 'Bullet point', plural: 'Bullet points' },
                  fields: [
                    { name: 'iconClass', type: 'text' },
                    {
                      name: 'text',
                      type: 'text',
                      required: true,
                      label: 'Text',
                      admin: {
                        description:
                          'Contains HTML (<strong>…</strong>) for the bold beginning — please keep it.',
                      },
                    },
                  ],
                  defaultValue: C.aboutUs.bullets.map((b) => ({ ...b })),
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'buttonLabel',
                      type: 'text',
                      label: 'Button text',
                      defaultValue: C.aboutUs.buttonLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'buttonHref',
                      type: 'text',
                      label: 'Button link',
                      defaultValue: C.aboutUs.buttonHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Gallery',
          fields: [
            {
              name: 'parallax',
              type: 'group',
              label: 'Parallax banner',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Title',
                  defaultValue: C.parallax.heading,
                  admin: { description: HTML_HINT },
                },
              ],
            },
            {
              name: 'gallery',
              type: 'group',
              label: 'Gallery',
              admin: {
                description:
                  'Upload your own gallery images. If the lists stay empty, the website shows the default gallery.',
              },
              fields: [
                {
                  name: 'desktopImages',
                  type: 'array',
                  label: 'Gallery images (desktop, 3×3 grid)',
                  labels: { singular: 'Image', plural: 'Images' },
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
                {
                  name: 'mobileCarouselImages',
                  type: 'array',
                  label: 'Gallery images (mobile carousel)',
                  labels: { singular: 'Image', plural: 'Images' },
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
          ],
        },
        {
          label: 'CTA & section titles',
          fields: [
            {
              name: 'contactInfo',
              type: 'group',
              label: 'Contact CTA ("Ready for the adventure?")',
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
            {
              name: 'testimonialSection',
              type: 'group',
              label: 'Testimonial section (headings)',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Small heading',
                  defaultValue: C.testimonialSection.eyebrow,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Title',
                  defaultValue: C.testimonialSection.heading,
                  admin: { description: HTML_HINT },
                },
              ],
            },
            {
              name: 'faqSection',
              type: 'group',
              label: 'FAQ section (headings)',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Small heading',
                  defaultValue: C.faqSection.eyebrow,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Title',
                  defaultValue: C.faqSection.heading,
                  admin: { description: HTML_HINT },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
