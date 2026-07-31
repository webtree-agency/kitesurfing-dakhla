import type { GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { PRIVACY_POLICY_CONTENT as C } from '@/lib/content/privacy-policy';

export const PrivacyPolicyPage: GlobalConfig = {
  slug: 'privacy-policy-page',
  label: 'Datenschutz',
  admin: {
    group: 'Inhalte',
    description: 'Inhalte der Datenschutz-Seite: Abschnitte der Privacy Policy und Kontaktblock.',
  },
  access: { read: publicRead, update: authenticated },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Kleine Überschrift', defaultValue: C.eyebrow },
    {
      name: 'heading',
      type: 'text',
      label: 'Titel',
      defaultValue: C.heading,
      admin: {
        description:
          'Achtung: enthält HTML-Markup (<span class="orange-dot">…</span>) — bitte nicht entfernen.',
      },
    },
    { name: 'intro', type: 'textarea', label: 'Einleitungstext', defaultValue: C.intro },
    {
      name: 'sections',
      type: 'array',
      label: 'Abschnitte',
      labels: { singular: 'Abschnitt', plural: 'Abschnitte' },
      fields: [
        { name: 'heading', type: 'text', required: true, label: 'Überschrift' },
        {
          name: 'paragraphs',
          type: 'array',
          label: 'Absätze',
          labels: { singular: 'Absatz', plural: 'Absätze' },
          fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
        },
      ],
      defaultValue: C.sections.map((s) => ({
        heading: s.heading,
        paragraphs: s.paragraphs.map((text) => ({ text })),
      })),
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Kontaktblock',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'companyLabel',
              type: 'text',
              label: 'Beschriftung „Firma"',
              defaultValue: C.contact.companyLabel,
              admin: { width: '50%' },
            },
            {
              name: 'companyName',
              type: 'text',
              label: 'Firmenname',
              defaultValue: C.contact.companyName,
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'addressLabel',
              type: 'text',
              label: 'Beschriftung „Adresse"',
              defaultValue: C.contact.addressLabel,
              admin: { width: '50%' },
            },
            {
              name: 'address',
              type: 'text',
              label: 'Adresse',
              defaultValue: C.contact.address,
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'phoneLabel',
              type: 'text',
              label: 'Beschriftung „Telefon"',
              defaultValue: C.contact.phoneLabel,
              admin: { width: '33%' },
            },
            {
              name: 'phoneDisplay',
              type: 'text',
              label: 'Telefonnummer (Anzeige)',
              defaultValue: C.contact.phoneDisplay,
              admin: { width: '33%' },
            },
            {
              name: 'telHref',
              type: 'text',
              label: 'Telefon-Link (tel:…)',
              defaultValue: C.contact.telHref,
              admin: { width: '33%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'emailLabel',
              type: 'text',
              label: 'Beschriftung „E-Mail"',
              defaultValue: C.contact.emailLabel,
              admin: { width: '50%' },
            },
            {
              name: 'email',
              type: 'text',
              label: 'E-Mail-Adresse',
              defaultValue: C.contact.email,
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
  ],
};
