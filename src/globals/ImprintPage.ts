import type { GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { IMPRINT_CONTENT as C } from '@/lib/content/imprint';

export const ImprintPage: GlobalConfig = {
  slug: 'imprint-page',
  label: 'Impressum',
  admin: {
    group: 'Inhalte',
    description: 'Inhalte der Impressum-Seite: Firmenangaben, Verantwortlicher und Social-Links.',
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
      type: 'row',
      fields: [
        {
          name: 'companyLabel',
          type: 'text',
          label: 'Beschriftung „Firma"',
          defaultValue: C.companyLabel,
          admin: { width: '50%' },
        },
        {
          name: 'companyName',
          type: 'text',
          label: 'Firmenname',
          defaultValue: C.companyName,
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
          defaultValue: C.addressLabel,
          admin: { width: '50%' },
        },
        {
          name: 'address',
          type: 'text',
          label: 'Adresse',
          defaultValue: C.address,
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
          defaultValue: C.phoneLabel,
          admin: { width: '33%' },
        },
        {
          name: 'phoneDisplay',
          type: 'text',
          label: 'Telefonnummer (Anzeige)',
          defaultValue: C.phoneDisplay,
          admin: { width: '33%' },
        },
        {
          name: 'telHref',
          type: 'text',
          label: 'Telefon-Link (tel:…)',
          defaultValue: C.telHref,
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
          defaultValue: C.emailLabel,
          admin: { width: '50%' },
        },
        {
          name: 'email',
          type: 'text',
          label: 'E-Mail-Adresse',
          defaultValue: C.email,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'legalReference',
      type: 'textarea',
      label: 'Rechtlicher Hinweis',
      defaultValue: C.legalReference,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'responsibleNameLabel',
          type: 'text',
          label: 'Beschriftung „Name"',
          defaultValue: C.responsibleNameLabel,
          admin: { width: '50%' },
        },
        {
          name: 'responsibleName',
          type: 'text',
          label: 'Verantwortlicher (Name)',
          defaultValue: C.responsibleName,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'responsibleAddressLabel',
          type: 'text',
          label: 'Beschriftung „Adresse"',
          defaultValue: C.responsibleAddressLabel,
          admin: { width: '50%' },
        },
        {
          name: 'responsibleAddress',
          type: 'text',
          label: 'Verantwortlicher (Adresse)',
          defaultValue: C.responsibleAddress,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'followUsHeading',
      type: 'text',
      label: '„Follow Us"-Überschrift',
      defaultValue: C.followUsHeading,
    },
    { name: 'instagramUrl', type: 'text', label: 'Instagram-Link', defaultValue: C.instagramUrl },
    { name: 'facebookUrl', type: 'text', label: 'Facebook-Link', defaultValue: C.facebookUrl },
  ],
};
