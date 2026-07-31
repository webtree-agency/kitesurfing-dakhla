import type { GlobalConfig } from 'payload';

import { authenticated, publicRead } from '@/lib/payload/access';
import { BUCHUNG_CONTENT as C } from '@/lib/content/buchung';

const HTML_HINT =
  'Achtung: enthält HTML-Markup (<span class="orange-dot">…</span>) — bitte nicht entfernen, nur den Text anpassen.';

export const Buchung: GlobalConfig = {
  slug: 'buchung',
  label: 'Buchungsseite',
  admin: {
    group: 'Inhalte',
    description:
      'Inhalte der Buchungsseite: Überschriften, Formular-Platzhalter, wählbare Services und die Danke-Seite nach dem Absenden.',
  },
  access: { read: publicRead, update: authenticated },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Formular',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Kopfbereich',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Kleine Überschrift',
                  defaultValue: C.hero.eyebrow,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Titel',
                  defaultValue: C.hero.heading,
                  admin: { description: HTML_HINT },
                },
              ],
            },
            {
              name: 'form',
              type: 'group',
              label: 'Buchungsformular',
              fields: [
                {
                  name: 'action',
                  type: 'text',
                  label: 'Formular-Ziel (Basin-URL)',
                  defaultValue: C.form.action,
                  admin: {
                    description:
                      'Technisch: URL, an die das Formular gesendet wird. Nur ändern, wenn Sie wissen, was Sie tun.',
                  },
                },
                {
                  name: 'namePlaceholder',
                  type: 'text',
                  label: 'Platzhalter „Name"',
                  defaultValue: C.form.namePlaceholder,
                },
                {
                  name: 'emailPlaceholder',
                  type: 'text',
                  label: 'Platzhalter „E-Mail"',
                  defaultValue: C.form.emailPlaceholder,
                },
                {
                  name: 'telephonePlaceholder',
                  type: 'text',
                  label: 'Platzhalter „Telefon"',
                  defaultValue: C.form.telephonePlaceholder,
                },
                {
                  name: 'servicePlaceholder',
                  type: 'text',
                  label: 'Platzhalter Service-Auswahl',
                  defaultValue: C.form.servicePlaceholder,
                },
                {
                  name: 'serviceOptions',
                  type: 'array',
                  label: 'Wählbare Services',
                  labels: { singular: 'Service', plural: 'Services' },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'value',
                          type: 'text',
                          required: true,
                          label: 'Wert (wird im E-Mail-Eingang angezeigt)',
                          admin: { width: '50%' },
                        },
                        {
                          name: 'label',
                          type: 'text',
                          required: true,
                          label: 'Anzeigetext',
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
                  label: 'Platzhalter „Nachricht"',
                  defaultValue: C.form.messagePlaceholder,
                },
                {
                  name: 'submitLabel',
                  type: 'text',
                  label: 'Absenden-Button',
                  defaultValue: C.form.submitLabel,
                },
              ],
            },
            {
              name: 'contactViaText',
              type: 'text',
              label: 'Text über dem WhatsApp-Icon',
              defaultValue: C.contactViaText,
            },
            {
              name: 'whatsappUrl',
              type: 'text',
              label: 'WhatsApp-Link',
              defaultValue: C.whatsappUrl,
            },
          ],
        },
        {
          label: 'Danke-Seite',
          fields: [
            {
              name: 'success',
              type: 'group',
              label: 'Danke-Seite (nach dem Absenden)',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Kleine Überschrift',
                  defaultValue: C.success.eyebrow,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Titel',
                  defaultValue: C.success.heading,
                  admin: { description: HTML_HINT },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'buttonLabel',
                      type: 'text',
                      label: 'Button-Text',
                      defaultValue: C.success.buttonLabel,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'buttonHref',
                      type: 'text',
                      label: 'Button-Link',
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
