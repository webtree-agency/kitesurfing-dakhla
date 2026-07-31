import type { CollectionConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'updatedAt'],
    group: 'Inhalte',
    description:
      'Fragen und Antworten für das FAQ-Accordion auf der Startseite ("Frequently Asked Questions").',
  },
  access: {
    read: publicRead,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Frage',
      admin: {
        description:
          'Achtung: Die Frage enthält HTML für die orange Hervorhebung, z. B. <span class="text-orange">…</span>. Dieses Markup bitte nicht entfernen — nur den Text dazwischen anpassen.',
      },
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Antwort (Absätze)',
      labels: { singular: 'Absatz', plural: 'Absätze' },
      fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
    },
    // Sortierung: kleinere Zahl = weiter oben. Im Admin ausgeblendet
    // (simplifyAdmin in payload.config.ts).
    { name: 'sort', type: 'number', defaultValue: 0 },
  ],
};
