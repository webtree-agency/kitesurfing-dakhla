import type { CollectionConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'rating', 'updatedAt'],
    group: 'Inhalte',
    description:
      'Kundenbewertungen für den Bewertungs-Slider. Erscheinen auf allen Seiten der Website im Abschnitt "What our customers say".',
  },
  access: {
    read: publicRead,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Name' },
    { name: 'text', type: 'textarea', required: true, label: 'Bewertungstext' },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      label: 'Sterne (1–5)',
    },
    // Sortierung: kleinere Zahl = weiter vorne. Im Admin ausgeblendet
    // (simplifyAdmin in payload.config.ts).
    { name: 'sort', type: 'number', defaultValue: 0 },
  ],
};
