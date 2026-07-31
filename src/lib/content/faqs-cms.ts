/**
 * CMS-First-Loader für die FAQs (`faqs`-Collection).
 * Leere Collection oder DB-Fehler → FAQS_CONTENT aus faqs.ts.
 */
import 'server-only';
import { cache } from 'react';

import { getPayloadClient } from '@/lib/payload';
import { FAQS_CONTENT, type FaqItem } from './faqs';

type PayloadFaqDoc = {
  question?: string | null;
  paragraphs?: Array<{ text?: string | null }> | null;
};

export const getFaqsContent = cache(async (): Promise<FaqItem[]> => {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'faqs',
      sort: 'sort',
      limit: 100,
    });
    if (docs.length === 0) return FAQS_CONTENT;

    return (docs as PayloadFaqDoc[]).map((d) => ({
      question: d.question ?? '',
      answer: (d.paragraphs ?? [])
        .map((p) => p.text ?? '')
        .filter((t) => t.trim() !== ''),
    }));
  } catch {
    return FAQS_CONTENT;
  }
});
