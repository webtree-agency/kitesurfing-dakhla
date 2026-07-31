/**
 * CMS-First-Loader für die Buchungsseite (`buchung`-Global).
 * Fallback: BUCHUNG_CONTENT aus buchung.ts — pro Feld via nz().
 */
import 'server-only';
import { cache } from 'react';

import { getPayloadClient } from '@/lib/payload';
import { BUCHUNG_CONTENT, type BuchungContent } from './buchung';
import { nz } from './helpers';

type PayloadBuchungDoc = {
  hero?: { eyebrow?: string | null; heading?: string | null } | null;
  form?: {
    action?: string | null;
    namePlaceholder?: string | null;
    emailPlaceholder?: string | null;
    telephonePlaceholder?: string | null;
    servicePlaceholder?: string | null;
    serviceOptions?: Array<{ value?: string | null; label?: string | null }> | null;
    messagePlaceholder?: string | null;
    submitLabel?: string | null;
  } | null;
  contactViaText?: string | null;
  whatsappUrl?: string | null;
  success?: {
    eyebrow?: string | null;
    heading?: string | null;
    buttonLabel?: string | null;
    buttonHref?: string | null;
  } | null;
};

export const getBuchungContent = cache(async (): Promise<BuchungContent> => {
  const F = BUCHUNG_CONTENT;
  try {
    const payload = await getPayloadClient();
    const g = (await payload.findGlobal({ slug: 'buchung', depth: 1 })) as PayloadBuchungDoc;
    if (!g) return F;

    const serviceOptions =
      Array.isArray(g.form?.serviceOptions) && g.form.serviceOptions.length > 0
        ? g.form.serviceOptions
            .filter((o) => o.value || o.label)
            .map((o) => ({ value: o.value ?? o.label ?? '', label: o.label ?? o.value ?? '' }))
        : F.form.serviceOptions;

    return {
      hero: {
        eyebrow: nz(g.hero?.eyebrow, F.hero.eyebrow),
        heading: nz(g.hero?.heading, F.hero.heading),
      },
      form: {
        action: nz(g.form?.action, F.form.action),
        namePlaceholder: nz(g.form?.namePlaceholder, F.form.namePlaceholder),
        emailPlaceholder: nz(g.form?.emailPlaceholder, F.form.emailPlaceholder),
        telephonePlaceholder: nz(g.form?.telephonePlaceholder, F.form.telephonePlaceholder),
        servicePlaceholder: nz(g.form?.servicePlaceholder, F.form.servicePlaceholder),
        serviceOptions,
        messagePlaceholder: nz(g.form?.messagePlaceholder, F.form.messagePlaceholder),
        submitLabel: nz(g.form?.submitLabel, F.form.submitLabel),
      },
      contactViaText: nz(g.contactViaText, F.contactViaText),
      whatsappUrl: nz(g.whatsappUrl, F.whatsappUrl),
      success: {
        eyebrow: nz(g.success?.eyebrow, F.success.eyebrow),
        heading: nz(g.success?.heading, F.success.heading),
        buttonLabel: nz(g.success?.buttonLabel, F.success.buttonLabel),
        buttonHref: nz(g.success?.buttonHref, F.success.buttonHref),
      },
    };
  } catch {
    return F;
  }
});
