/**
 * CMS-First-Loader für die Testimonials (`testimonials`-Collection).
 * Leere Collection oder DB-Fehler → TESTIMONIALS_CONTENT aus testimonials.ts.
 */
import 'server-only';
import { cache } from 'react';

import { getPayloadClient } from '@/lib/payload';
import { TESTIMONIALS_CONTENT, type TestimonialItem } from './testimonials';

type PayloadTestimonialDoc = {
  name?: string | null;
  text?: string | null;
  rating?: number | null;
};

export const getTestimonialsContent = cache(async (): Promise<TestimonialItem[]> => {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'testimonials',
      sort: 'sort',
      limit: 100,
    });
    if (docs.length === 0) return TESTIMONIALS_CONTENT;

    return (docs as PayloadTestimonialDoc[]).map((d) => ({
      name: d.name ?? '',
      text: d.text ?? '',
      rating: typeof d.rating === 'number' ? d.rating : 5,
    }));
  } catch {
    return TESTIMONIALS_CONTENT;
  }
});
