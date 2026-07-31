/**
 * CMS-First-Loader für das All-Inclusive-Paket (`all-inclusive`-Global).
 * Fallback: ALL_INCLUSIVE_CONTENT aus all-inclusive.ts — pro Feld via nz()/strArr().
 */
import 'server-only';
import { cache } from 'react';

import { getPayloadClient } from '@/lib/payload';
import {
  ALL_INCLUSIVE_CONTENT,
  type AllInclusiveContent,
  type AllInclusiveCarouselImage,
} from './all-inclusive';
import { nz, strArr } from './helpers';

type PayloadMedia = { url?: string | null; alt?: string | null };
type UploadRel = PayloadMedia | number | string | null | undefined;
type ImgRow = { image?: UploadRel; alt?: string | null };

type PayloadAllInclusiveDoc = {
  hero?: { eyebrow?: string | null; heading?: string | null } | null;
  lead?: string | null;
  iconFeatures?: Array<{ iconClass?: string | null; label?: string | null }> | null;
  carouselImages?: ImgRow[] | null;
  includedHeading?: string | null;
  includedItems?: Array<{ text?: string | null }> | null;
  notIncludedHeading?: string | null;
  notIncludedItems?: Array<{ text?: string | null }> | null;
  priceTable?: {
    columnLabels?: {
      roomType?: string | null;
      people?: string | null;
      price?: string | null;
    } | null;
    rows?: Array<{
      roomType?: string | null;
      people?: string | null;
      price?: string | null;
    }> | null;
  } | null;
  alertText?: string | null;
  cta?: { buttonLabel?: string | null; buttonHref?: string | null } | null;
  contactInfo?: {
    heading?: string | null;
    textLines?: Array<{ text?: string | null }> | null;
    buttonLabel?: string | null;
    buttonHref?: string | null;
  } | null;
};

/** Zimmer-Karussell: leer/ungefüllt → komplette statische Liste. */
function imgArr(
  rows: ImgRow[] | null | undefined,
  fallback: AllInclusiveCarouselImage[],
): AllInclusiveCarouselImage[] {
  if (!Array.isArray(rows) || rows.length === 0) return fallback;
  const out: AllInclusiveCarouselImage[] = [];
  for (const r of rows) {
    const m = r.image;
    if (m && typeof m === 'object' && typeof m.url === 'string' && m.url !== '') {
      out.push({ src: m.url, alt: nz(r.alt, m.alt ?? '') });
    }
  }
  return out.length > 0 ? out : fallback;
}

export const getAllInclusiveContent = cache(async (): Promise<AllInclusiveContent> => {
  const F = ALL_INCLUSIVE_CONTENT;
  try {
    const payload = await getPayloadClient();
    const g = (await payload.findGlobal({
      slug: 'all-inclusive',
      depth: 1,
    })) as PayloadAllInclusiveDoc;
    if (!g) return F;

    const iconFeatures =
      Array.isArray(g.iconFeatures) && g.iconFeatures.length > 0
        ? g.iconFeatures
            .filter((f) => f.label)
            .map((f) => ({ iconClass: f.iconClass ?? '', label: f.label ?? '' }))
        : F.iconFeatures;

    const rows =
      Array.isArray(g.priceTable?.rows) && g.priceTable.rows.length > 0
        ? g.priceTable.rows
            .filter((r) => r.roomType || r.price)
            .map((r) => ({
              roomType: r.roomType ?? '',
              people: r.people ?? '',
              price: r.price ?? '',
            }))
        : F.priceTable.rows;

    return {
      hero: {
        eyebrow: nz(g.hero?.eyebrow, F.hero.eyebrow),
        heading: nz(g.hero?.heading, F.hero.heading),
      },
      lead: nz(g.lead, F.lead),
      iconFeatures,
      carouselImages: imgArr(g.carouselImages, F.carouselImages),
      includedHeading: nz(g.includedHeading, F.includedHeading),
      includedItems: strArr(g.includedItems, 'text', F.includedItems),
      notIncludedHeading: nz(g.notIncludedHeading, F.notIncludedHeading),
      notIncludedItems: strArr(g.notIncludedItems, 'text', F.notIncludedItems),
      priceTable: {
        columnLabels: {
          roomType: nz(g.priceTable?.columnLabels?.roomType, F.priceTable.columnLabels.roomType),
          people: nz(g.priceTable?.columnLabels?.people, F.priceTable.columnLabels.people),
          price: nz(g.priceTable?.columnLabels?.price, F.priceTable.columnLabels.price),
        },
        rows,
      },
      alertText: nz(g.alertText, F.alertText),
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
