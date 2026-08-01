import type { CollectionConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'updatedAt'],
    group: 'Content',
    description:
      'Questions and answers for the FAQ accordion on the home page ("Frequently Asked Questions").',
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
      label: 'Question',
      admin: {
        description:
          'The question contains HTML markup for the orange highlight, e.g. <span class="text-orange">…</span> — please keep it, only change the text in between.',
      },
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Answer (paragraphs)',
      labels: { singular: 'Paragraph', plural: 'Paragraphs' },
      fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
    },
    // Sortierung: kleinere Zahl = weiter oben. Im Admin ausgeblendet
    // (simplifyAdmin in payload.config.ts).
    { name: 'sort', type: 'number', defaultValue: 0 },
  ],
};
