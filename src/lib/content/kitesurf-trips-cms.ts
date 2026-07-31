/**
 * CMS-First-Loader für die Trips (`kitesurf-trips`-Global).
 * Fallback: KITESURF_TRIPS_CONTENT aus kitesurf-trips.ts — pro Feld via nz()/strArr().
 */
import 'server-only';
import { cache } from 'react';

import { getPayloadClient } from '@/lib/payload';
import { KITESURF_TRIPS_CONTENT, type TripsContent, type TripVariant } from './kitesurf-trips';
import { nz, strArr, mediaUrl } from './helpers';

type PayloadMedia = { url?: string | null; alt?: string | null };
type UploadRel = PayloadMedia | number | string | null | undefined;

type PayloadTripVariant = {
  tabLabel?: string | null;
  title?: string | null;
  intro?: string | null;
  image?: UploadRel;
  imageAlt?: string | null;
  whatToExpectHeading?: string | null;
  whatToExpectParagraphs?: Array<{ text?: string | null }> | null;
  howItWorksHeading?: string | null;
  howItWorksItems?: Array<{ text?: string | null }> | null;
  priceInfo?: {
    columnLabels?: {
      price?: string | null;
      groupSize?: string | null;
      skillRequirement?: string | null;
    } | null;
    price?: string | null;
    groupSize?: string | null;
    skillRequirement?: string | null;
  } | null;
  alertText?: string | null;
  ctaButtonLabel?: string | null;
  ctaButtonHref?: string | null;
};

type PayloadTripsDoc = {
  hero?: { eyebrow?: string | null; heading?: string | null } | null;
  whiteDune?: PayloadTripVariant | null;
  secretSpot?: PayloadTripVariant | null;
  oysterFarm?: PayloadTripVariant | null;
  contactInfo?: {
    heading?: string | null;
    textLines?: Array<{ text?: string | null }> | null;
    buttonLabel?: string | null;
    buttonHref?: string | null;
  } | null;
};

function mapVariant(v: PayloadTripVariant | null | undefined, fb: TripVariant): TripVariant {
  return {
    tabLabel: nz(v?.tabLabel, fb.tabLabel),
    title: nz(v?.title, fb.title),
    intro: nz(v?.intro, fb.intro),
    imageSrc: mediaUrl(v?.image, fb.imageSrc),
    imageAlt: nz(v?.imageAlt, fb.imageAlt),
    whatToExpectHeading: nz(v?.whatToExpectHeading, fb.whatToExpectHeading),
    whatToExpectParagraphs: strArr(v?.whatToExpectParagraphs, 'text', fb.whatToExpectParagraphs),
    howItWorksHeading: nz(v?.howItWorksHeading, fb.howItWorksHeading),
    howItWorksItems: strArr(v?.howItWorksItems, 'text', fb.howItWorksItems),
    priceInfo: {
      columnLabels: {
        price: nz(v?.priceInfo?.columnLabels?.price, fb.priceInfo.columnLabels.price),
        groupSize: nz(v?.priceInfo?.columnLabels?.groupSize, fb.priceInfo.columnLabels.groupSize),
        skillRequirement: nz(
          v?.priceInfo?.columnLabels?.skillRequirement,
          fb.priceInfo.columnLabels.skillRequirement,
        ),
      },
      price: nz(v?.priceInfo?.price, fb.priceInfo.price),
      groupSize: nz(v?.priceInfo?.groupSize, fb.priceInfo.groupSize),
      skillRequirement: nz(v?.priceInfo?.skillRequirement, fb.priceInfo.skillRequirement),
    },
    alertText: nz(v?.alertText, fb.alertText),
    ctaButtonLabel: nz(v?.ctaButtonLabel, fb.ctaButtonLabel),
    ctaButtonHref: nz(v?.ctaButtonHref, fb.ctaButtonHref),
  };
}

export const getKitesurfTripsContent = cache(async (): Promise<TripsContent> => {
  const F = KITESURF_TRIPS_CONTENT;
  try {
    const payload = await getPayloadClient();
    const g = (await payload.findGlobal({
      slug: 'kitesurf-trips',
      depth: 1,
    })) as PayloadTripsDoc;
    if (!g) return F;

    return {
      hero: {
        eyebrow: nz(g.hero?.eyebrow, F.hero.eyebrow),
        heading: nz(g.hero?.heading, F.hero.heading),
      },
      whiteDune: mapVariant(g.whiteDune, F.whiteDune),
      secretSpot: mapVariant(g.secretSpot, F.secretSpot),
      oysterFarm: mapVariant(g.oysterFarm, F.oysterFarm),
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
