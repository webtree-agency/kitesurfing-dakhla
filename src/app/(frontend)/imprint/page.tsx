import type { Metadata } from 'next';

import { Preloader } from '@/components/Preloader';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { WhatsAppPopup } from '@/components/WhatsAppPopup';
import { getImprintContent } from '@/lib/content/imprint-cms';
import { getSettingsContent } from '@/lib/content/settings-cms';

// Metadaten 1:1 aus dem <head> von imprint.html — og:url zeigt dort (Original-
// Copy-Paste) auf 404.html; Wert beibehalten, nur extensionslos.
export const metadata: Metadata = {
  robots: 'noindex, nofollow',
  title: 'Kitesurfing Dakhla | Imprint | Kitesurfingdakhla.com',
  keywords: 'imprint, legal notice, Kitesurfing Dakhla, contact',
  openGraph: {
    title: 'Kitesurfing Dakhla | Imprint | Kitesurfingdakhla.com',
    url: 'https://kitesurfingdakhla.com/imprint',
    type: 'website',
  },
};

export default async function ImprintPage() {
  const [settings, content] = await Promise.all([getSettingsContent(), getImprintContent()]);

  return (
    <>
      <Preloader />
      <WhatsAppPopup />
      <SiteHeader
        settings={settings}
        variant="plain"
        active="book"
        togglerAriaLabel="Toggle navigation menu"
      />
      <section
        className="padding-small d-flex align-items-center justify-content-center"
        id="imprint"
        style={{ minHeight: '50vh' }}
      >
        <div className="container text-start">
          <h6 className="text-primary">{content.eyebrow}</h6>
          <h3
            className="display-5 fw-bold"
            dangerouslySetInnerHTML={{ __html: content.heading }}
          />
          <p className="mb-5">{content.intro}</p>
          <p className="mb-1">
            <strong>{content.companyLabel}</strong> {content.companyName}
          </p>
          <p className="mb-1">
            <strong>{content.addressLabel}</strong> {content.address}
          </p>
          <p className="mb-1">
            <strong>{content.phoneLabel}</strong>{' '}
            <a href={content.telHref}>{content.phoneDisplay}</a>
          </p>
          <p className="mb-1">
            <strong>{content.emailLabel}</strong>{' '}
            <a href={`mailto:${content.email}`}>{content.email}</a>
          </p>
          <p className="mb-5">{content.legalReference}</p>
          <p className="mb-1">
            <strong>{content.responsibleNameLabel}</strong> {content.responsibleName}
          </p>
          <p className="mb-1">
            <strong>{content.responsibleAddressLabel}</strong> {content.responsibleAddress}
          </p>
          <div className="social-media mt-4">
            <h6 className="text-primary">{content.followUsHeading}</h6>
            <a href={content.instagramUrl} className="text-primary me-3" target="_blank">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a href={content.facebookUrl} className="text-primary me-3" target="_blank">
              <i className="fab fa-facebook-f fa-lg"></i>
            </a>
          </div>
        </div>
      </section>
      <SiteFooter settings={settings} variant="sub" />
    </>
  );
}
