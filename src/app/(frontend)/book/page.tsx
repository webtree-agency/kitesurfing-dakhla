import type { Metadata } from 'next';

import { BookingForm } from '@/components/BookingForm';
import { Preloader } from '@/components/Preloader';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { WhatsAppPopup } from '@/components/WhatsAppPopup';
import { getBuchungContent } from '@/lib/content/buchung-cms';
import { getSettingsContent } from '@/lib/content/settings-cms';

// Metadaten 1:1 aus dem <head> von book.html (og:url extensionslos).
export const metadata: Metadata = {
  title: 'Kitesurfing Dakhla | Book your Watersport | Kitesurfingdakhla.com',
  description:
    'Book your next exciting watersport adventure at Kitesurfing Dakhla! Experience thrilling kitesurfing, windsurfing, and more at one of the best destinations in the world.',
  keywords:
    'kitesurfing, watersports, Dakhla, book watersport, windsurfing, kitesurfing Dakhla, adventure sports, water sports booking, kiteboarding',
  robots: 'index, follow',
  alternates: { canonical: 'https://kitesurfingdakhla.com/book' },
  openGraph: {
    title: 'Kitesurfing Dakhla | Book your Watersport | Kitesurfingdakhla.com',
    description:
      'Book your next exciting watersport adventure at Kitesurfing Dakhla! Experience thrilling kitesurfing, windsurfing, and more at one of the best destinations in the world.',
    url: 'https://kitesurfingdakhla.com/book',
    images: ['https://kitesurfingdakhla.com/images/logo/google-image.png'],
    type: 'website',
  },
};

export default async function BookPage() {
  const [settings, content] = await Promise.all([getSettingsContent(), getBuchungContent()]);

  return (
    <>
      <Preloader />
      <WhatsAppPopup />
      <SiteHeader settings={settings} variant="plain" active="book" />
      <section className="padding-small" id="contact">
        <div className="container">
          <div className="container text-center mb-3">
            <h6 className="text-primary">{content.hero.eyebrow}</h6>
            <h3
              className="display-5 fw-bold"
              dangerouslySetInnerHTML={{ __html: content.hero.heading }}
            />
          </div>
          <BookingForm form={content.form} />
          <hr className="fine-line" />
          <p className="contact-via">{content.contactViaText}</p>
          <a href={content.whatsappUrl} target="_blank" className="whatsapp-link">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </section>
      <SiteFooter settings={settings} variant="sub" />
    </>
  );
}
