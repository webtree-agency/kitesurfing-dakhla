import type { GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { STARTSEITE_CONTENT as C } from '@/lib/content/startseite';

// Hinweis für Felder, deren Wert HTML-Markup enthält (orange Hervorhebung).
const HTML_HINT =
  'Achtung: enthält HTML-Markup (z. B. <span class="orange-dot">…</span>) für die orange Hervorhebung — bitte nicht entfernen, nur den Text anpassen.';

export const Startseite: GlobalConfig = {
  slug: 'startseite',
  label: 'Startseite',
  admin: {
    group: 'Inhalte',
    description:
      'Alle Texte und Bilder der Startseite: Hero, Services-Karten, Über uns, Galerie sowie die Überschriften der Testimonial- und FAQ-Abschnitte.',
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
              label: 'Hero (Bild ganz oben)',
              fields: [
                { name: 'title', type: 'text', label: 'Titel', defaultValue: C.hero.title },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Untertitel',
                  defaultValue: C.hero.subtitle,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'buttonLabel',
                      type: 'text',
                      label: 'Button-Text',
                      defaultValue: C.hero.buttonLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'buttonHref',
                      type: 'text',
                      label: 'Button-Link',
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
              label: 'Services-Abschnitt',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Kleine Überschrift',
                  defaultValue: C.services.eyebrow,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Titel',
                  defaultValue: C.services.heading,
                  admin: { description: HTML_HINT },
                },
                {
                  name: 'intro',
                  type: 'textarea',
                  label: 'Einleitungstext',
                  defaultValue: C.services.intro,
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
                  defaultValue: C.services.iconFeatures.map((f) => ({ ...f })),
                },
                {
                  name: 'cardsHeading',
                  type: 'text',
                  label: 'Überschrift über den Karten',
                  defaultValue: C.services.cardsHeading,
                  admin: { description: HTML_HINT },
                },
                {
                  name: 'cards',
                  type: 'array',
                  label: 'Service-Karten',
                  labels: { singular: 'Karte', plural: 'Karten' },
                  fields: [
                    { name: 'title', type: 'text', required: true, label: 'Titel' },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Beschreibung',
                    },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Bild',
                      admin: { description: 'Leer = Standard-Bild der Karte.' },
                    },
                    { name: 'imageAlt', type: 'text', label: 'Bild-Beschreibung (Alt-Text)' },
                    { name: 'linkHref', type: 'text', label: 'Link' },
                    { name: 'buttonLabel', type: 'text', label: 'Button-Text' },
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
          label: 'Über uns',
          fields: [
            {
              name: 'aboutUs',
              type: 'group',
              label: 'Über-uns-Abschnitt',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Kleine Überschrift',
                  defaultValue: C.aboutUs.eyebrow,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Titel',
                  defaultValue: C.aboutUs.heading,
                  admin: { description: HTML_HINT },
                },
                {
                  name: 'intro',
                  type: 'textarea',
                  label: 'Einleitungstext',
                  defaultValue: C.aboutUs.intro,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Foto',
                  admin: { description: 'Leer = Standard-Foto (Team).' },
                },
                {
                  name: 'imageAlt',
                  type: 'text',
                  label: 'Foto-Beschreibung (Alt-Text)',
                  defaultValue: C.aboutUs.imageAlt,
                },
                {
                  name: 'whyChooseHeading',
                  type: 'text',
                  label: '„Warum wir"-Überschrift',
                  defaultValue: C.aboutUs.whyChooseHeading,
                },
                {
                  name: 'whyChooseText',
                  type: 'textarea',
                  label: '„Warum wir"-Text',
                  defaultValue: C.aboutUs.whyChooseText,
                },
                {
                  name: 'bullets',
                  type: 'array',
                  label: 'Stichpunkte',
                  labels: { singular: 'Stichpunkt', plural: 'Stichpunkte' },
                  fields: [
                    { name: 'iconClass', type: 'text' },
                    {
                      name: 'text',
                      type: 'text',
                      required: true,
                      label: 'Text',
                      admin: {
                        description:
                          'Enthält HTML (<strong>…</strong>) für den fett gedruckten Anfang — bitte beibehalten.',
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
                      label: 'Button-Text',
                      defaultValue: C.aboutUs.buttonLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'buttonHref',
                      type: 'text',
                      label: 'Button-Link',
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
          label: 'Galerie',
          fields: [
            {
              name: 'parallax',
              type: 'group',
              label: 'Parallax-Banner',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Titel',
                  defaultValue: C.parallax.heading,
                  admin: { description: HTML_HINT },
                },
              ],
            },
            {
              name: 'gallery',
              type: 'group',
              label: 'Galerie',
              admin: {
                description:
                  'Eigene Galerie-Bilder hochladen. Bleiben die Listen leer, zeigt die Website die Standard-Galerie.',
              },
              fields: [
                {
                  name: 'desktopImages',
                  type: 'array',
                  label: 'Galerie-Bilder (Desktop, 3×3-Raster)',
                  labels: { singular: 'Bild', plural: 'Bilder' },
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
                {
                  name: 'mobileCarouselImages',
                  type: 'array',
                  label: 'Galerie-Bilder (Mobil-Karussell)',
                  labels: { singular: 'Bild', plural: 'Bilder' },
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
          ],
        },
        {
          label: 'CTA & Abschnitts-Titel',
          fields: [
            {
              name: 'contactInfo',
              type: 'group',
              label: 'Kontakt-CTA („Ready for the adventure?")',
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
            {
              name: 'testimonialSection',
              type: 'group',
              label: 'Testimonial-Abschnitt (Überschriften)',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Kleine Überschrift',
                  defaultValue: C.testimonialSection.eyebrow,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Titel',
                  defaultValue: C.testimonialSection.heading,
                  admin: { description: HTML_HINT },
                },
              ],
            },
            {
              name: 'faqSection',
              type: 'group',
              label: 'FAQ-Abschnitt (Überschriften)',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Kleine Überschrift',
                  defaultValue: C.faqSection.eyebrow,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Titel',
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
