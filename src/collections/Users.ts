import type { CollectionConfig } from 'payload';

import { adminOnly } from '@/lib/payload/access';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  auth: {
    tokenExpiration: 60 * 60 * 8, // 8h Sessions
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
    maxLoginAttempts: 5,
    lockTime: 1000 * 60 * 10,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role'],
    group: 'System',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: adminOnly,
    update: ({ req, id }) => req.user?.role === 'admin' || req.user?.id === id,
    delete: adminOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin (Webtree, full access)', value: 'admin' },
        { label: 'Editor (client)', value: 'editor' },
      ],
      access: {
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
};
