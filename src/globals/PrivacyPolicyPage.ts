import type { GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { PRIVACY_POLICY_CONTENT as C } from '@/lib/content/privacy-policy';

export const PrivacyPolicyPage: GlobalConfig = {
  slug: 'privacy-policy-page',
  label: 'Privacy Policy',
  admin: {
    group: 'Content',
    description: 'Content of the Privacy Policy page: policy sections and contact block.',
  },
  access: { read: publicRead, update: authenticated },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small heading', defaultValue: C.eyebrow },
    {
      name: 'heading',
      type: 'text',
      label: 'Title',
      defaultValue: C.heading,
      admin: {
        description:
          'Contains HTML markup (<span class="orange-dot">…</span>) — please keep it, only change the text.',
      },
    },
    { name: 'intro', type: 'textarea', label: 'Intro text', defaultValue: C.intro },
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      labels: { singular: 'Section', plural: 'Sections' },
      fields: [
        { name: 'heading', type: 'text', required: true, label: 'Heading' },
        {
          name: 'paragraphs',
          type: 'array',
          label: 'Paragraphs',
          labels: { singular: 'Paragraph', plural: 'Paragraphs' },
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
      label: 'Contact block',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'companyLabel',
              type: 'text',
              label: '"Company" label',
              defaultValue: C.contact.companyLabel,
              admin: { width: '50%' },
            },
            {
              name: 'companyName',
              type: 'text',
              label: 'Company name',
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
              label: '"Address" label',
              defaultValue: C.contact.addressLabel,
              admin: { width: '50%' },
            },
            {
              name: 'address',
              type: 'text',
              label: 'Address',
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
              label: '"Phone" label',
              defaultValue: C.contact.phoneLabel,
              admin: { width: '33%' },
            },
            {
              name: 'phoneDisplay',
              type: 'text',
              label: 'Phone number (displayed)',
              defaultValue: C.contact.phoneDisplay,
              admin: { width: '33%' },
            },
            {
              name: 'telHref',
              type: 'text',
              label: 'Phone link (tel:…)',
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
              label: '"Email" label',
              defaultValue: C.contact.emailLabel,
              admin: { width: '50%' },
            },
            {
              name: 'email',
              type: 'text',
              label: 'Email address',
              defaultValue: C.contact.email,
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
  ],
};
