import type { CollectionConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media item', plural: 'Media' },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'filename', 'mimeType', 'updatedAt'],
    group: 'Content',
    description: 'Images for the gallery, rooms and pages. Alt tags are required.',
  },
  access: {
    read: publicRead,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    // Original auf max 2400 px Breite verkleinern — verhindert, dass
    // 12-MP-Handy-Fotos als 8 MB+ im R2 landen.
    resizeOptions: {
      width: 2400,
      withoutEnlargement: true,
    },
    formatOptions: {
      format: 'webp',
      options: { quality: 82 },
    },
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 576, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    crop: true,
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Required. Briefly describe what the image shows.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional: image caption.' },
    },
  ],
};
