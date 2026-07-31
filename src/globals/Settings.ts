import type { GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { SETTINGS_CONTENT as C } from '@/lib/content/settings';

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Kontakt & Socials',
  admin: {
    group: 'Inhalte',
    description:
      'Globale Kontaktdaten und Social-Media-Links. Erscheinen sitewide im Footer und in den Kontakt-Abschnitten.',
  },
  access: { read: publicRead, update: authenticated },
  fields: [
    {
      name: 'phoneDisplay',
      type: 'text',
      label: 'Telefonnummer (Anzeigetext)',
      defaultValue: C.phoneDisplay,
    },
    {
      name: 'telHref',
      type: 'text',
      label: 'Telefon-Link',
      defaultValue: C.telHref,
      admin: { description: 'Format: tel:+212… — wird beim Klick auf die Nummer gewählt.' },
    },
    { name: 'whatsappUrl', type: 'text', label: 'WhatsApp-Link', defaultValue: C.whatsappUrl },
    { name: 'email', type: 'text', label: 'E-Mail-Adresse', defaultValue: C.email },
    { name: 'address', type: 'text', label: 'Adresse', defaultValue: C.address },
    { name: 'instagramUrl', type: 'text', label: 'Instagram-Link', defaultValue: C.instagramUrl },
    { name: 'facebookUrl', type: 'text', label: 'Facebook-Link', defaultValue: C.facebookUrl },
    {
      name: 'mapsEmbedSrc',
      type: 'textarea',
      label: 'Google-Maps-Embed-URL',
      defaultValue: C.mapsEmbedSrc,
      admin: { description: 'Die src-URL des Google-Maps-Iframes im Footer.' },
    },
  ],
};
