/**
 * CMS-First-Loader für die Kitesurf-Kurse (`kitesurf-lessons`-Global).
 * Fallback: KITESURF_LESSONS_CONTENT aus kitesurf-lessons.ts — pro Feld via nz()/strArr().
 */
import 'server-only';
import { cache } from 'react';

import { getPayloadClient } from '@/lib/payload';
import { KITESURF_LESSONS_CONTENT, type LessonsContent, type LessonVariant } from './kitesurf-lessons';
import { nz, strArr } from './helpers';

type PayloadLessonVariant = {
  tabLabel?: string | null;
  title?: string | null;
  description?: Array<{ text?: string | null }> | null;
  iconFeatures?: Array<{ iconClass?: string | null; label?: string | null }> | null;
  priceRows?: Array<{
    label?: string | null;
    price?: string | null;
    note?: string | null;
    highlighted?: boolean | null;
  }> | null;
  alertText?: string | null;
  ctaButtonLabel?: string | null;
  ctaButtonHref?: string | null;
};

type PayloadLessonsDoc = {
  hero?: { eyebrow?: string | null; heading?: string | null } | null;
  semiPrivate?: PayloadLessonVariant | null;
  private?: PayloadLessonVariant | null;
  contactInfo?: {
    heading?: string | null;
    textLines?: Array<{ text?: string | null }> | null;
    buttonLabel?: string | null;
    buttonHref?: string | null;
  } | null;
};

function mapVariant(v: PayloadLessonVariant | null | undefined, fb: LessonVariant): LessonVariant {
  const iconFeatures =
    Array.isArray(v?.iconFeatures) && v.iconFeatures.length > 0
      ? v.iconFeatures
          .filter((f) => f.label)
          .map((f) => ({ iconClass: f.iconClass ?? '', label: f.label ?? '' }))
      : fb.iconFeatures;

  const priceRows =
    Array.isArray(v?.priceRows) && v.priceRows.length > 0
      ? v.priceRows
          .filter((r) => r.label)
          .map((r) => ({
            label: r.label ?? '',
            price: r.price ?? '',
            note: r.note ?? '',
            highlighted: r.highlighted ?? false,
          }))
      : fb.priceRows;

  return {
    tabLabel: nz(v?.tabLabel, fb.tabLabel),
    title: nz(v?.title, fb.title),
    description: strArr(v?.description, 'text', fb.description),
    iconFeatures,
    priceRows,
    alertText: nz(v?.alertText, fb.alertText),
    ctaButtonLabel: nz(v?.ctaButtonLabel, fb.ctaButtonLabel),
    ctaButtonHref: nz(v?.ctaButtonHref, fb.ctaButtonHref),
  };
}

export const getKitesurfLessonsContent = cache(async (): Promise<LessonsContent> => {
  const F = KITESURF_LESSONS_CONTENT;
  try {
    const payload = await getPayloadClient();
    const g = (await payload.findGlobal({
      slug: 'kitesurf-lessons',
      depth: 1,
    })) as PayloadLessonsDoc;
    if (!g) return F;

    return {
      hero: {
        eyebrow: nz(g.hero?.eyebrow, F.hero.eyebrow),
        heading: nz(g.hero?.heading, F.hero.heading),
      },
      semiPrivate: mapVariant(g.semiPrivate, F.semiPrivate),
      private: mapVariant(g.private, F.private),
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
