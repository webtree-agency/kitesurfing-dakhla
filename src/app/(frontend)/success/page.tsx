import type { Metadata } from 'next';

import { Preloader } from '@/components/Preloader';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { WhatsAppPopup } from '@/components/WhatsAppPopup';
import { getBuchungContent } from '@/lib/content/buchung-cms';
import { getSettingsContent } from '@/lib/content/settings-cms';
import { routeHref } from '@/lib/links';

// Metadaten 1:1 aus dem <head> von success.html (og:url extensionslos).
// Hinweis: Das tote, duplizierte Formular-Script aus success.html wird bewusst
// weggelassen (es referenziert ein hier nicht existierendes #contact_form).
export const metadata: Metadata = {
  title: 'Kitesurfing Dakhla | Success Message | Kitesurfingdakhla.com',
  robots: 'follow',
  openGraph: {
    title: 'Kitesurfing Dakhla | Success Message | Kitesurfingdakhla.com',
    images: ['https://kitesurfingdakhla.com/images/logo/google-image.png'],
    url: 'https://www.kitesurfingdakhla.com/success',
    type: 'website',
  },
};

export default async function SuccessPage() {
  const [settings, content] = await Promise.all([getSettingsContent(), getBuchungContent()]);

  return (
    <>
      <Preloader />
      <WhatsAppPopup />
      <SiteHeader settings={settings} variant="plain" active="book-link" togglerIconAriaHidden />
      <section className="padding-small vh-60 d-flex flex-column" id="contact">
        <div className="container flex-grow-1">
          <div className="text-center mb-3">
            <h6 className="text-primary">{content.success.eyebrow}</h6>
            <h3
              className="display-5 fw-bold"
              dangerouslySetInnerHTML={{ __html: content.success.heading }}
            />
          </div>
          <div className="text-center">
            <a href={routeHref(content.success.buttonHref)} className="button-48-transparent">
              {content.success.buttonLabel}
            </a>
          </div>
        </div>
      </section>
      <SiteFooter settings={settings} variant="sub" />
    </>
  );
}
