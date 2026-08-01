import type { GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { BUCHUNG_CONTENT as C } from '@/lib/content/buchung';

const HTML_HINT =
  'Contains HTML markup (<span class="orange-dot">…</span>) — please keep it, only change the text.';

export const Buchung: GlobalConfig = {
  slug: 'buchung',
  label: 'Booking Page',
  admin: {
    group: 'Content',
    description:
      'Content of the booking page: headings, form placeholders, selectable services and the thank-you page shown after sending.',
  },
  access: { read: publicRead, update: authenticated },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Form',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Header',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Small heading',
                  defaultValue: C.hero.eyebrow,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Title',
                  defaultValue: C.hero.heading,
                  admin: { description: HTML_HINT },
                },
              ],
            },
            {
              name: 'form',
              type: 'group',
              label: 'Booking form',
              fields: [
                {
                  name: 'action',
                  type: 'text',
                  label: 'Form target (Basin URL)',
                  defaultValue: C.form.action,
                  admin: {
                    description:
                      'Technical: the URL the form is sent to. Only change this if you know what you are doing.',
                  },
                },
                {
                  name: 'namePlaceholder',
                  type: 'text',
                  label: 'Placeholder "Name"',
                  defaultValue: C.form.namePlaceholder,
                },
                {
                  name: 'emailPlaceholder',
                  type: 'text',
                  label: 'Placeholder "Email"',
                  defaultValue: C.form.emailPlaceholder,
                },
                {
                  name: 'telephonePlaceholder',
                  type: 'text',
                  label: 'Placeholder "Phone"',
                  defaultValue: C.form.telephonePlaceholder,
                },
                {
                  name: 'servicePlaceholder',
                  type: 'text',
                  label: 'Placeholder for the service selection',
                  defaultValue: C.form.servicePlaceholder,
                },
                {
                  name: 'serviceOptions',
                  type: 'array',
                  label: 'Selectable services',
                  labels: { singular: 'Service', plural: 'Services' },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'value',
                          type: 'text',
                          required: true,
                          label: 'Value (shown in the email you receive)',
                          admin: { width: '50%' },
                        },
                        {
                          name: 'label',
                          type: 'text',
                          required: true,
                          label: 'Displayed text',
                          admin: { width: '50%' },
                        },
                      ],
                    },
                  ],
                  defaultValue: C.form.serviceOptions.map((o) => ({ ...o })),
                },
                {
                  name: 'messagePlaceholder',
                  type: 'text',
                  label: 'Placeholder "Message"',
                  defaultValue: C.form.messagePlaceholder,
                },
                {
                  name: 'submitLabel',
                  type: 'text',
                  label: 'Submit button',
                  defaultValue: C.form.submitLabel,
                },
              ],
            },
            {
              name: 'contactViaText',
              type: 'text',
              label: 'Text above the WhatsApp icon',
              defaultValue: C.contactViaText,
            },
            {
              name: 'whatsappUrl',
              type: 'text',
              label: 'WhatsApp link',
              defaultValue: C.whatsappUrl,
            },
          ],
        },
        {
          label: 'Thank-you page',
          fields: [
            {
              name: 'success',
              type: 'group',
              label: 'Thank-you page (after sending)',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Small heading',
                  defaultValue: C.success.eyebrow,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Title',
                  defaultValue: C.success.heading,
                  admin: { description: HTML_HINT },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'buttonLabel',
                      type: 'text',
                      label: 'Button text',
                      defaultValue: C.success.buttonLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'buttonHref',
                      type: 'text',
                      label: 'Button link',
                      defaultValue: C.success.buttonHref,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
