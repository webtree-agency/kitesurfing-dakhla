/**
 * CMS-First-Loader für die Material-Miete (`kitesurf-rental`-Global).
 * Fallback: KITESURF_RENTAL_CONTENT aus kitesurf-rental.ts — pro Feld via nz()/strArr().
 */
import 'server-only';
import { cache } from 'react';

import { getPayloadClient } from '@/lib/payload';
import { KITESURF_RENTAL_CONTENT, type RentalContent, type RentalTab } from './kitesurf-rental';
import { nz, strArr } from './helpers';

type PayloadRentalTab = {
  tabLabel?: string | null;
  title?: string | null;
  priceRows?: Array<{
    label?: string | null;
    price?: string | null;
    highlighted?: boolean | null;
  }> | null;
};

type PayloadRentalDoc = {
  hero?: { eyebrow?: string | null; heading?: string | null } | null;
  fullGear?: PayloadRentalTab | null;
  kiteOnly?: PayloadRentalTab | null;
  boardOnly?: PayloadRentalTab | null;
  insurance?: PayloadRentalTab | null;
  howItWorks?: {
    heading?: string | null;
    paragraphs?: Array<{ text?: string | null }> | null;
  } | null;
  iconFeatures?: Array<{ iconClass?: string | null; label?: string | null }> | null;
  cta?: { buttonLabel?: string | null; buttonHref?: string | null } | null;
  contactInfo?: {
    heading?: string | null;
    textLines?: Array<{ text?: string | null }> | null;
    buttonLabel?: string | null;
    buttonHref?: string | null;
  } | null;
};

function mapTab(t: PayloadRentalTab | null | undefined, fb: RentalTab): RentalTab {
  const priceRows =
    Array.isArray(t?.priceRows) && t.priceRows.length > 0
      ? t.priceRows
          .filter((r) => r.label)
          .map((r) => ({
            label: r.label ?? '',
            price: r.price ?? '',
            highlighted: r.highlighted ?? false,
          }))
      : fb.priceRows;

  return {
    tabLabel: nz(t?.tabLabel, fb.tabLabel),
    title: nz(t?.title, fb.title),
    priceRows,
  };
}

export const getKitesurfRentalContent = cache(async (): Promise<RentalContent> => {
  const F = KITESURF_RENTAL_CONTENT;
  try {
    const payload = await getPayloadClient();
    const g = (await payload.findGlobal({
      slug: 'kitesurf-rental',
      depth: 1,
    })) as PayloadRentalDoc;
    if (!g) return F;

    const iconFeatures =
      Array.isArray(g.iconFeatures) && g.iconFeatures.length > 0
        ? g.iconFeatures
            .filter((f) => f.label)
            .map((f) => ({ iconClass: f.iconClass ?? '', label: f.label ?? '' }))
        : F.iconFeatures;

    return {
      hero: {
        eyebrow: nz(g.hero?.eyebrow, F.hero.eyebrow),
        heading: nz(g.hero?.heading, F.hero.heading),
      },
      fullGear: mapTab(g.fullGear, F.fullGear),
      kiteOnly: mapTab(g.kiteOnly, F.kiteOnly),
      boardOnly: mapTab(g.boardOnly, F.boardOnly),
      insurance: mapTab(g.insurance, F.insurance),
      howItWorks: {
        heading: nz(g.howItWorks?.heading, F.howItWorks.heading),
        paragraphs: strArr(g.howItWorks?.paragraphs, 'text', F.howItWorks.paragraphs),
      },
      iconFeatures,
      cta: {
        buttonLabel: nz(g.cta?.buttonLabel, F.cta.buttonLabel),
        buttonHref: nz(g.cta?.buttonHref, F.cta.buttonHref),
      },
      contactInfo: {
        heading: nz(g.contactInfo?.heading, F.contactInfo.heading),
        textLines: strArr(g.contactInfo?.textLines, 'text', F.contactInfo.textLines),
        buttonLabel: nz(g.contactInfo?.buttonLabel, F.contactInfo.buttonLabel),
        buttonHref: nz(g.contactInfo?.buttonHref, F.contactInfo.buttonHref),
      },
    };
  } catch {
    return F;
  }
});
