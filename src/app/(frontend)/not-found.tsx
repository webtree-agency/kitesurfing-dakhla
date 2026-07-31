import { Preloader } from '@/components/Preloader';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { WhatsAppPopup } from '@/components/WhatsAppPopup';
import { NOT_FOUND_CONTENT } from '@/lib/content/not-found';
import { SETTINGS_CONTENT } from '@/lib/content/settings';

// 404-Seite (404.html) — bewusst rein statisch (keine CMS-Loader), damit sie
// auch bei Datenbank-Problemen zuverlässig rendert.
export default function NotFound() {
  const content = NOT_FOUND_CONTENT;
  const settings = SETTINGS_CONTENT;

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
      <section className="padding-small vh-100 d-flex align-items-center justify-content-center">
        <div className="container text-center">
          <h6 className="text-primary">{content.eyebrow}</h6>
          <h3
            className="display-5 fw-bold"
            dangerouslySetInnerHTML={{ __html: content.heading }}
          />
          <p className="mb-5">{content.paragraph}</p>
          <a href={content.buttonHref} className="button-48 btn btn-primary">
            {content.buttonLabel}
          </a>
          <hr className="fine-line mt-5" />
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
