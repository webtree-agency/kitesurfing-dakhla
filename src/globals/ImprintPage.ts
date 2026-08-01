import type { GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { IMPRINT_CONTENT as C } from '@/lib/content/imprint';

export const ImprintPage: GlobalConfig = {
  slug: 'imprint-page',
  label: 'Imprint',
  admin: {
    group: 'Content',
    description: 'Content of the Imprint page: company details, responsible person and social links.',
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
      type: 'row',
      fields: [
        {
          name: 'companyLabel',
          type: 'text',
          label: '"Company" label',
          defaultValue: C.companyLabel,
          admin: { width: '50%' },
        },
        {
          name: 'companyName',
          type: 'text',
          label: 'Company name',
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
          label: '"Address" label',
          defaultValue: C.addressLabel,
          admin: { width: '50%' },
        },
        {
          name: 'address',
          type: 'text',
          label: 'Address',
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
          label: '"Phone" label',
          defaultValue: C.phoneLabel,
          admin: { width: '33%' },
        },
        {
          name: 'phoneDisplay',
          type: 'text',
          label: 'Phone number (displayed)',
          defaultValue: C.phoneDisplay,
          admin: { width: '33%' },
        },
        {
          name: 'telHref',
          type: 'text',
          label: 'Phone link (tel:…)',
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
          label: '"Email" label',
          defaultValue: C.emailLabel,
          admin: { width: '50%' },
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email address',
          defaultValue: C.email,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'legalReference',
      type: 'textarea',
      label: 'Legal notice',
      defaultValue: C.legalReference,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'responsibleNameLabel',
          type: 'text',
          label: '"Name" label',
          defaultValue: C.responsibleNameLabel,
          admin: { width: '50%' },
        },
        {
          name: 'responsibleName',
          type: 'text',
          label: 'Responsible person (name)',
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
          label: '"Address" label',
          defaultValue: C.responsibleAddressLabel,
          admin: { width: '50%' },
        },
        {
          name: 'responsibleAddress',
          type: 'text',
          label: 'Responsible person (address)',
          defaultValue: C.responsibleAddress,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'followUsHeading',
      type: 'text',
      label: '"Follow Us" heading',
      defaultValue: C.followUsHeading,
    },
    { name: 'instagramUrl', type: 'text', label: 'Instagram link', defaultValue: C.instagramUrl },
    { name: 'facebookUrl', type: 'text', label: 'Facebook link', defaultValue: C.facebookUrl },
  ],
};
