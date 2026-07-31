/**
 * Initial-Seed der Payload-DB.
 *
 * Idempotent: legt Testimonials/FAQs nur an, wenn die Collection leer ist.
 * Die Globals brauchen keinen Seed — alle Felder haben defaultValues aus
 * lib/content/* und das Frontend fällt bei leerer DB ohnehin auf die
 * statischen Konstanten zurück.
 *
 * Aufruf: `pnpm seed` (läuft via tsx — `payload run` bricht mit Payload 3.86 still ab).
 */
import { getPayload } from 'payload';
import config from '../src/payload.config';

import { TESTIMONIALS_CONTENT } from '../src/lib/content/testimonials';
import { FAQS_CONTENT } from '../src/lib/content/faqs';

async function main() {
  const payload = await getPayload({ config });

  // 1) Testimonials
  const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 1 });
  if (existingTestimonials.totalDocs > 0) {
    console.log(`[seed] testimonials: ${existingTestimonials.totalDocs} vorhanden — skip.`);
  } else {
    let i = 0;
    for (const t of TESTIMONIALS_CONTENT) {
      await payload.create({
        collection: 'testimonials',
        data: { name: t.name, text: t.text, rating: t.rating, sort: i++ } as never,
      });
    }
    console.log(`[seed] testimonials: ${TESTIMONIALS_CONTENT.length} angelegt.`);
  }

  // 2) FAQs
  const existingFaqs = await payload.find({ collection: 'faqs', limit: 1 });
  if (existingFaqs.totalDocs > 0) {
    console.log(`[seed] faqs: ${existingFaqs.totalDocs} vorhanden — skip.`);
  } else {
    let i = 0;
    for (const f of FAQS_CONTENT) {
      await payload.create({
        collection: 'faqs',
        data: {
          question: f.question,
          paragraphs: f.answer.map((text) => ({ text })),
          sort: i++,
        } as never,
      });
    }
    console.log(`[seed] faqs: ${FAQS_CONTENT.length} angelegt.`);
  }

  console.log('[seed] fertig.');
  process.exit(0);
}

main().catch((err) => {
  console.error('[seed] fatal:', err);
  process.exit(1);
});
