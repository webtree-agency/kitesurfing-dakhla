import type { GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { SETTINGS_CONTENT as C } from '@/lib/content/settings';

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Contact & Social Links',
  admin: {
    group: 'Content',
    description:
      'Global contact details and social media links. They appear sitewide in the footer and in the contact sections.',
  },
  access: { read: publicRead, update: authenticated },
  fields: [
    {
      name: 'phoneDisplay',
      type: 'text',
      label: 'Phone number (displayed text)',
      defaultValue: C.phoneDisplay,
    },
    {
      name: 'telHref',
      type: 'text',
      label: 'Phone link',
      defaultValue: C.telHref,
      admin: { description: 'Format: tel:+212… — dialled when the number is tapped.' },
    },
    { name: 'whatsappUrl', type: 'text', label: 'WhatsApp link', defaultValue: C.whatsappUrl },
    { name: 'email', type: 'text', label: 'Email address', defaultValue: C.email },
    { name: 'address', type: 'text', label: 'Address', defaultValue: C.address },
    { name: 'instagramUrl', type: 'text', label: 'Instagram link', defaultValue: C.instagramUrl },
    { name: 'facebookUrl', type: 'text', label: 'Facebook link', defaultValue: C.facebookUrl },
    {
      name: 'mapsEmbedSrc',
      type: 'textarea',
      label: 'Google Maps embed URL',
      defaultValue: C.mapsEmbedSrc,
      admin: { description: 'The src URL of the Google Maps iframe in the footer.' },
    },
  ],
};
