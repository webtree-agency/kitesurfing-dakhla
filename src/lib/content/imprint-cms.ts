/**
 * CMS-First-Loader für das Impressum (`imprint-page`-Global).
 * Fallback: IMPRINT_CONTENT aus imprint.ts — pro Feld via nz().
 */
import 'server-only';
import { cache } from 'react';

import { getPayloadClient } from '@/lib/payload';
import { IMPRINT_CONTENT, type ImprintContent } from './imprint';
import { nz } from './helpers';

type PayloadImprintDoc = {
  eyebrow?: string | null;
  heading?: string | null;
  intro?: string | null;
  companyLabel?: string | null;
  companyName?: string | null;
  addressLabel?: string | null;
  address?: string | null;
  phoneLabel?: string | null;
  phoneDisplay?: string | null;
  telHref?: string | null;
  emailLabel?: string | null;
  email?: string | null;
  legalReference?: string | null;
  responsibleNameLabel?: string | null;
  responsibleName?: string | null;
  responsibleAddressLabel?: string | null;
  responsibleAddress?: string | null;
  followUsHeading?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
};

export const getImprintContent = cache(async (): Promise<ImprintContent> => {
  const F = IMPRINT_CONTENT;
  try {
    const payload = await getPayloadClient();
    const g = (await payload.findGlobal({ slug: 'imprint-page', depth: 1 })) as PayloadImprintDoc;
    if (!g) return F;

    return {
      eyebrow: nz(g.eyebrow, F.eyebrow),
      heading: nz(g.heading, F.heading),
      intro: nz(g.intro, F.intro),
      companyLabel: nz(g.companyLabel, F.companyLabel),
      companyName: nz(g.companyName, F.companyName),
      addressLabel: nz(g.addressLabel, F.addressLabel),
      address: nz(g.address, F.address),
      phoneLabel: nz(g.phoneLabel, F.phoneLabel),
      phoneDisplay: nz(g.phoneDisplay, F.phoneDisplay),
      telHref: nz(g.telHref, F.telHref),
      emailLabel: nz(g.emailLabel, F.emailLabel),
      email: nz(g.email, F.email),
      legalReference: nz(g.legalReference, F.legalReference),
      responsibleNameLabel: nz(g.responsibleNameLabel, F.responsibleNameLabel),
      responsibleName: nz(g.responsibleName, F.responsibleName),
      responsibleAddressLabel: nz(g.responsibleAddressLabel, F.responsibleAddressLabel),
      responsibleAddress: nz(g.responsibleAddress, F.responsibleAddress),
      followUsHeading: nz(g.followUsHeading, F.followUsHeading),
      instagramUrl: nz(g.instagramUrl, F.instagramUrl),
      facebookUrl: nz(g.facebookUrl, F.facebookUrl),
    };
  } catch {
    return F;
  }
});
