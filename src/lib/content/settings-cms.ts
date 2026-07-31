/**
 * CMS-First-Loader für Kontakt & Socials (`settings`-Global).
 * Fallback: SETTINGS_CONTENT aus settings.ts — pro Feld via nz().
 */
import 'server-only';
import { cache } from 'react';

import { getPayloadClient } from '@/lib/payload';
import { SETTINGS_CONTENT, type SettingsContent } from './settings';
import { nz } from './helpers';

type PayloadSettingsDoc = {
  phoneDisplay?: string | null;
  telHref?: string | null;
  whatsappUrl?: string | null;
  email?: string | null;
  address?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  mapsEmbedSrc?: string | null;
};

export const getSettingsContent = cache(async (): Promise<SettingsContent> => {
  try {
    const payload = await getPayloadClient();
    const g = (await payload.findGlobal({ slug: 'settings', depth: 1 })) as PayloadSettingsDoc;
    if (!g) return SETTINGS_CONTENT;

    return {
      phoneDisplay: nz(g.phoneDisplay, SETTINGS_CONTENT.phoneDisplay),
      telHref: nz(g.telHref, SETTINGS_CONTENT.telHref),
      whatsappUrl: nz(g.whatsappUrl, SETTINGS_CONTENT.whatsappUrl),
      email: nz(g.email, SETTINGS_CONTENT.email),
      address: nz(g.address, SETTINGS_CONTENT.address),
      instagramUrl: nz(g.instagramUrl, SETTINGS_CONTENT.instagramUrl),
      facebookUrl: nz(g.facebookUrl, SETTINGS_CONTENT.facebookUrl),
      mapsEmbedSrc: nz(g.mapsEmbedSrc, SETTINGS_CONTENT.mapsEmbedSrc),
    };
  } catch {
    return SETTINGS_CONTENT;
  }
});
