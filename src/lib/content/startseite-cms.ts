/**
 * CMS-First-Loader für die Startseite (`startseite`-Global).
 * Fallback: STARTSEITE_CONTENT aus startseite.ts — pro Feld via nz()/strArr().
 */
import 'server-only';
import { cache } from 'react';

import { getPayloadClient } from '@/lib/payload';
import { STARTSEITE_CONTENT, type StartseiteContent, type GalleryImage } from './startseite';
import { nz, strArr, mediaUrl } from './helpers';

type PayloadMedia = { url?: string | null; alt?: string | null };
type UploadRel = PayloadMedia | number | string | null | undefined;
type ImgRow = { image?: UploadRel; alt?: string | null };
type IconFeatureRow = { iconClass?: string | null; label?: string | null };

type PayloadStartseiteDoc = {
  hero?: {
    title?: string | null;
    subtitle?: string | null;
    buttonLabel?: string | null;
    buttonHref?: string | null;
  } | null;
  services?: {
    eyebrow?: string | null;
    heading?: string | null;
    intro?: string | null;
    iconFeatures?: IconFeatureRow[] | null;
    cardsHeading?: string | null;
    cards?: Array<{
      title?: string | null;
      description?: string | null;
      image?: UploadRel;
      imageAlt?: string | null;
      linkHref?: string | null;
      buttonLabel?: string | null;
    }> | null;
  } | null;
  parallax?: { heading?: string | null } | null;
  aboutUs?: {
    eyebrow?: string | null;
    heading?: string | null;
    intro?: string | null;
    image?: UploadRel;
    imageAlt?: string | null;
    whyChooseHeading?: string | null;
    whyChooseText?: string | null;
    bullets?: Array<{ iconClass?: string | null; text?: string | null }> | null;
    buttonLabel?: string | null;
    buttonHref?: string | null;
  } | null;
  contactInfo?: {
    heading?: string | null;
    textLines?: Array<{ text?: string | null }> | null;
    buttonLabel?: string | null;
    buttonHref?: string | null;
  } | null;
  testimonialSection?: { eyebrow?: string | null; heading?: string | null } | null;
  gallery?: {
    desktopImages?: ImgRow[] | null;
    mobileCarouselImages?: ImgRow[] | null;
  } | null;
  faqSection?: { eyebrow?: string | null; heading?: string | null } | null;
};

/**
 * Bild-Array aus dem CMS: nur Zeilen mit aufgelöstem Upload zählen;
 * leer/ungefüllt → komplette statische Liste.
 */
function imgArr(rows: ImgRow[] | null | undefined, fallback: GalleryImage[]): GalleryImage[] {
  if (!Array.isArray(rows) || rows.length === 0) return fallback;
  const out: GalleryImage[] = [];
  for (const r of rows) {
    const m = r.image;
    if (m && typeof m === 'object' && typeof m.url === 'string' && m.url !== '') {
      out.push({ src: m.url, alt: nz(r.alt, m.alt ?? '') });
    }
  }
  return out.length > 0 ? out : fallback;
}

export const getStartseiteContent = cache(async (): Promise<StartseiteContent> => {
  const F = STARTSEITE_CONTENT;
  try {
    const payload = await getPayloadClient();
    const g = (await payload.findGlobal({ slug: 'startseite', depth: 1 })) as PayloadStartseiteDoc;
    if (!g) return F;

    const iconFeatures =
      Array.isArray(g.services?.iconFeatures) && g.services.iconFeatures.length > 0
        ? g.services.iconFeatures
            .filter((f) => f.label)
            .map((f) => ({ iconClass: f.iconClass ?? '', label: f.label ?? '' }))
        : F.services.iconFeatures;

    // imageSrc kommt aus dem optionalen Upload; Fallback index-basiert auf
    // die statische Karte (Karten sind stabil, nur Texte/Bilder ändern sich).
    const cards =
      Array.isArray(g.services?.cards) && g.services.cards.length > 0
        ? g.services.cards.map((c, i) => {
            // noUncheckedIndexedAccess: bei mehr CMS-Karten als statischen
            // Karten gibt es keinen Fallback → leere Strings.
            const fb = F.services.cards[i] ?? {
              title: '',
              description: '',
              imageSrc: '',
              imageAlt: '',
              linkHref: '',
              buttonLabel: '',
            };
            return {
              title: nz(c.title, fb.title),
              description: nz(c.description, fb.description),
              imageSrc: mediaUrl(c.image, fb.imageSrc),
              imageAlt: nz(c.imageAlt, fb.imageAlt),
              linkHref: nz(c.linkHref, fb.linkHref),
              buttonLabel: nz(c.buttonLabel, fb.buttonLabel),
            };
          })
        : F.services.cards;

    const bullets =
      Array.isArray(g.aboutUs?.bullets) && g.aboutUs.bullets.length > 0
        ? g.aboutUs.bullets
            .filter((b) => b.text)
            .map((b) => ({ iconClass: b.iconClass ?? '', text: b.text ?? '' }))
        : F.aboutUs.bullets;

    return {
      hero: {
        title: nz(g.hero?.title, F.hero.title),
        subtitle: nz(g.hero?.subtitle, F.hero.subtitle),
        buttonLabel: nz(g.hero?.buttonLabel, F.hero.buttonLabel),
        buttonHref: nz(g.hero?.buttonHref, F.hero.buttonHref),
      },
      services: {
        eyebrow: nz(g.services?.eyebrow, F.services.eyebrow),
        heading: nz(g.services?.heading, F.services.heading),
        intro: nz(g.services?.intro, F.services.intro),
        iconFeatures,
        cardsHeading: nz(g.services?.cardsHeading, F.services.cardsHeading),
        cards,
      },
      parallax: {
        heading: nz(g.parallax?.heading, F.parallax.heading),
      },
      aboutUs: {
        eyebrow: nz(g.aboutUs?.eyebrow, F.aboutUs.eyebrow),
        heading: nz(g.aboutUs?.heading, F.aboutUs.heading),
        intro: nz(g.aboutUs?.intro, F.aboutUs.intro),
        imageSrc: mediaUrl(g.aboutUs?.image, F.aboutUs.imageSrc),
        imageAlt: nz(g.aboutUs?.imageAlt, F.aboutUs.imageAlt),
        whyChooseHeading: nz(g.aboutUs?.whyChooseHeading, F.aboutUs.whyChooseHeading),
        whyChooseText: nz(g.aboutUs?.whyChooseText, F.aboutUs.whyChooseText),
        bullets,
        buttonLabel: nz(g.aboutUs?.buttonLabel, F.aboutUs.buttonLabel),
        buttonHref: nz(g.aboutUs?.buttonHref, F.aboutUs.buttonHref),
      },
      contactInfo: {
        heading: nz(g.contactInfo?.heading, F.contactInfo.heading),
        textLines: strArr(g.contactInfo?.textLines, 'text', F.contactInfo.textLines),
        buttonLabel: nz(g.contactInfo?.buttonLabel, F.contactInfo.buttonLabel),
        buttonHref: nz(g.contactInfo?.buttonHref, F.contactInfo.buttonHref),
      },
      testimonialSection: {
        eyebrow: nz(g.testimonialSection?.eyebrow, F.testimonialSection.eyebrow),
        heading: nz(g.testimonialSection?.heading, F.testimonialSection.heading),
      },
      gallery: {
        desktopImages: imgArr(g.gallery?.desktopImages, F.gallery.desktopImages),
        mobileCarouselImages: imgArr(
          g.gallery?.mobileCarouselImages,
          F.gallery.mobileCarouselImages,
        ),
      },
      faqSection: {
        eyebrow: nz(g.faqSection?.eyebrow, F.faqSection.eyebrow),
        heading: nz(g.faqSection?.heading, F.faqSection.heading),
      },
    };
  } catch {
    return F;
  }
});
