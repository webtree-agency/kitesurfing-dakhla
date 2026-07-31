/**
 * CMS-First-Loader für die Datenschutz-Seite (`privacy-policy-page`-Global).
 * Fallback: PRIVACY_POLICY_CONTENT aus privacy-policy.ts — pro Feld via nz().
 */
import 'server-only';
import { cache } from 'react';

import { getPayloadClient } from '@/lib/payload';
import { PRIVACY_POLICY_CONTENT, type PrivacyPolicyContent } from './privacy-policy';
import { nz } from './helpers';

type PayloadPrivacyPolicyDoc = {
  eyebrow?: string | null;
  heading?: string | null;
  intro?: string | null;
  sections?: Array<{
    heading?: string | null;
    paragraphs?: Array<{ text?: string | null }> | null;
  }> | null;
  contact?: {
    companyLabel?: string | null;
    companyName?: string | null;
    addressLabel?: string | null;
    address?: string | null;
    phoneLabel?: string | null;
    phoneDisplay?: string | null;
    telHref?: string | null;
    emailLabel?: string | null;
    email?: string | null;
  } | null;
};

export const getPrivacyPolicyContent = cache(async (): Promise<PrivacyPolicyContent> => {
  const F = PRIVACY_POLICY_CONTENT;
  try {
    const payload = await getPayloadClient();
    const g = (await payload.findGlobal({
      slug: 'privacy-policy-page',
      depth: 1,
    })) as PayloadPrivacyPolicyDoc;
    if (!g) return F;

    const sections =
      Array.isArray(g.sections) && g.sections.length > 0
        ? g.sections
            .filter((s) => s.heading)
            .map((s) => ({
              heading: s.heading ?? '',
              paragraphs: (s.paragraphs ?? [])
                .map((p) => p.text ?? '')
                .filter((t) => t.trim() !== ''),
            }))
        : F.sections;

    return {
      eyebrow: nz(g.eyebrow, F.eyebrow),
      heading: nz(g.heading, F.heading),
      intro: nz(g.intro, F.intro),
      sections,
      contact: {
        companyLabel: nz(g.contact?.companyLabel, F.contact.companyLabel),
        companyName: nz(g.contact?.companyName, F.contact.companyName),
        addressLabel: nz(g.contact?.addressLabel, F.contact.addressLabel),
        address: nz(g.contact?.address, F.contact.address),
        phoneLabel: nz(g.contact?.phoneLabel, F.contact.phoneLabel),
        phoneDisplay: nz(g.contact?.phoneDisplay, F.contact.phoneDisplay),
        telHref: nz(g.contact?.telHref, F.contact.telHref),
        emailLabel: nz(g.contact?.emailLabel, F.contact.emailLabel),
        email: nz(g.contact?.email, F.contact.email),
      },
    };
  } catch {
    return F;
  }
});
