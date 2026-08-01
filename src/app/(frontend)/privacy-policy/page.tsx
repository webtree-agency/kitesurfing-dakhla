import React from 'react';

import type { Metadata } from 'next';

import { Preloader } from '@/components/Preloader';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { WhatsAppPopup } from '@/components/WhatsAppPopup';
import { getPrivacyPolicyContent } from '@/lib/content/privacy-policy-cms';
import { getSettingsContent } from '@/lib/content/settings-cms';

// Metadaten 1:1 aus dem <head> von privacy-policy.html — og:url zeigt dort
// (Original-Copy-Paste) auf 404.html; Wert beibehalten, nur extensionslos.
export const metadata: Metadata = {
  robots: 'noindex, nofollow',
  title: 'Kitesurfing Dakhla | Privacy Policy | Kitesurfingdakhla.com',
  keywords: 'privacy policy, data protection, Kitesurfing Dakhla',
  openGraph: {
    title: 'Kitesurfing Dakhla | Privacy Policy | Kitesurfingdakhla.com',
    url: 'https://kitesurfingdakhla.com/privacy-policy',
    type: 'website',
  },
};

export default async function PrivacyPolicyPage() {
  const [settings, content] = await Promise.all([
    getSettingsContent(),
    getPrivacyPolicyContent(),
  ]);

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
        style={{ minHeight: '50vh' }}
      >
        <div className="container text-start">
          <h6 className="text-primary">{content.eyebrow}</h6>
          <h3
            className="display-5 fw-bold"
            dangerouslySetInnerHTML={{ __html: content.heading }}
          />
          <p className="mb-5">{content.intro}</p>
          {content.sections.map((section, index) => (
            <React.Fragment key={index}>
              <h4 className="fw-bold">{section.heading}</h4>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph}</p>
              ))}
            </React.Fragment>
          ))}
          <p className="mb-1">
            <strong>{content.contact.companyLabel}</strong> {content.contact.companyName}
          </p>
          <p className="mb-1">
            <strong>{content.contact.addressLabel}</strong> {content.contact.address}
          </p>
          <p className="mb-1">
            <strong>{content.contact.phoneLabel}</strong>{' '}
            <a href={content.contact.telHref}>{content.contact.phoneDisplay}</a>
          </p>
          <p className="mb-1">
            <strong>{content.contact.emailLabel}</strong>{' '}
            <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
          </p>
        </div>
      </section>
      <SiteFooter settings={settings} variant="sub" />
    </>
  );
}
