import React from 'react';

import type { Metadata } from 'next';

import { ContactCta } from '@/components/ContactCta';
import { CookieBanner } from '@/components/CookieBanner';
import { Preloader } from '@/components/Preloader';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { TestimonialSection } from '@/components/TestimonialSection';
import { WhatsAppPopup } from '@/components/WhatsAppPopup';
import { getFaqsContent } from '@/lib/content/faqs-cms';
import { assetUrl } from '@/lib/content/helpers';
import { getSettingsContent } from '@/lib/content/settings-cms';
import { getStartseiteContent } from '@/lib/content/startseite-cms';
import type { GalleryImage } from '@/lib/content/startseite';
import { getTestimonialsContent } from '@/lib/content/testimonials-cms';
import { routeHref } from '@/lib/links';

// Metadaten 1:1 aus dem <head> von index.html.
export const metadata: Metadata = {
  title: 'Kitesurfing Dakhla | #1 Watersports in Morocco | Kitesurfingdakhla.com',
  description:
    'Discover the best kitesurfing, windsurfing, and SUP experiences in Dakhla, Morocco. Book your adventure with Kitesurfing Dakhla for unforgettable water sports.',
  keywords:
    'kitesurfing, windsurfing, Dakhla, Morocco, kitesurfing lessons, windsurfing trips, stand up paddleboarding, SUP, Dakhla watersports, kiteboarding, kitesurfing school, kite trips, Dakhla tours, adventure trips Morocco, surf lessons, watersports Morocco, kiteboarding holidays, Dakhla kiteboarding, windsurfing lessons, Morocco adventure sports, beach activities Morocco, Dakhla sports, extreme sports Morocco, kite surf package, water sport tours, beach vacation Morocco, sports dakhla, kitesurfing dakhla',
  robots: 'index, follow',
  alternates: { canonical: 'https://kitesurfingdakhla.com/' },
  openGraph: {
    title: 'Kitesurfing Dakhla | #1 Watersports in Dakhla | Kitesurfingdakhla.com',
    description:
      'Discover the best kitesurfing, windsurfing, and SUP experiences in Dakhla, Morocco. Book your adventure with Kitesurfing Dakhla for unforgettable water sports.',
    images: ['https://kitesurfingdakhla.com/images/logo/google-image.png'],
    url: 'https://kitesurfingdakhla.com',
    type: 'website',
    siteName: 'Kitesurfing Dakhla',
  },
};

// Accordion-IDs und aria-Labels exakt wie in index.html (Reihenfolge der FAQs).
const FAQ_IDS = ['One', 'Four', 'Two', 'Three'];
const FAQ_ARIA_LABELS = [
  'Toggle kite lessons FAQ',
  'Toggle independent kitesurfer FAQ',
  'Toggle private lesson FAQ (1 person)',
  'Toggle semi-private lesson FAQ (2 persons)',
];

/** Galerie-Bilder in Dreierreihen aufteilen (3x3-Grid wie im Original). */
function chunkRows(images: GalleryImage[]): GalleryImage[][] {
  const rows: GalleryImage[][] = [];
  for (let i = 0; i < images.length; i += 3) {
    rows.push(images.slice(i, i + 3));
  }
  return rows;
}

export default async function HomePage() {
  const [settings, content, testimonials, faqs] = await Promise.all([
    getSettingsContent(),
    getStartseiteContent(),
    getTestimonialsContent(),
    getFaqsContent(),
  ]);

  return (
    <>
      <Preloader />
      <WhatsAppPopup />
      <SiteHeader
        settings={settings}
        variant="video"
        active="home"
        togglerAriaLabel="Toggle navigation"
        togglerIconAriaHidden
        closeAriaLabel="Close navigation"
        heroContent={
          <section>
            <div className="swiper-wrapper">
              <div className="swiper-slide d-flex justify-content-center align-items-center custom-height">
                <div className="container text-center">
                  <div className="col-md-10 offset-md-1">
                    <h2
                      className="display-1 fw-bold text-white"
                      style={{ fontDisplay: 'swap' } as React.CSSProperties}
                    >
                      {content.hero.title}
                    </h2>
                    <h4 className="fw-light text-white">{content.hero.subtitle}</h4>
                    <a className="button-48 mt-2" role="button" href={content.hero.buttonHref}>
                      <span className="text">{content.hero.buttonLabel}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        }
      />
      <section id="services" className="padding-small">
        <div className="container-fluid">
          <div className="container text-center">
            <h6 className="text-primary">{content.services.eyebrow}</h6>
            <h2
              className="display-5 fw-bold mb-3"
              dangerouslySetInnerHTML={{ __html: content.services.heading }}
            />
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <p className="text-start text-lg-center">{content.services.intro}</p>
              </div>
            </div>
            <div className="row text-center mb-3">
              {content.services.iconFeatures.map((feature, index) => (
                <div className="col-4 col-md-4" key={index}>
                  <i className={`${feature.iconClass} fa-2x text-primary mb-2`}></i>
                  <p>{feature.label}</p>
                </div>
              ))}
            </div>
          </div>
          <h3
            className="fw-bold text-center mb-3"
            dangerouslySetInnerHTML={{ __html: content.services.cardsHeading }}
          />
          <div className="row serviceshome g-1">
            {content.services.cards.map((card, index) => (
              <div className="col-md-6 serviceshome col-lg-6 col-xxl-3" key={index}>
                <a href={routeHref(card.linkHref)} className="service-link">
                  <div className="service-post position-relative bg-light-orange">
                    <img
                      src={assetUrl(card.imageSrc)}
                      className="service-img img-fluid img-overlay"
                      alt={card.imageAlt}
                      loading="lazy"
                    />
                    <div className="position-absolute bottom-0 p-5">
                      <h4 className="text-white">{card.title}</h4>
                      <p className="text-white">{card.description}</p>
                      <div className="button-48 mt-2">
                        <span className="text">{card.buttonLabel}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="parallax-section" className="parallax-section text-center">
        <div className="parallax-content">
          <h2
            className="display-4 fw-bold text-white"
            dangerouslySetInnerHTML={{ __html: content.parallax.heading }}
          />
        </div>
      </section>
      <section id="about-us" className="padding-small">
        <div className="container text-center">
          <h6 className="text-primary">{content.aboutUs.eyebrow}</h6>
          <h2
            className="display-5 fw-bold mb-3"
            dangerouslySetInnerHTML={{ __html: content.aboutUs.heading }}
          />
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <p className="text-start text-lg-center">{content.aboutUs.intro}</p>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="imageblock me-4 position-relative">
                <img
                  className="img-fluid"
                  src={assetUrl(content.aboutUs.imageSrc)}
                  alt={content.aboutUs.imageAlt}
                />
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <h2 className="fw-bold mb-3">{content.aboutUs.whyChooseHeading}</h2>
              <p>{content.aboutUs.whyChooseText}</p>
              <ul className="list-unstyled">
                {content.aboutUs.bullets.map((bullet, index) => (
                  <li
                    className={
                      index < content.aboutUs.bullets.length - 1
                        ? 'mb-3 d-flex align-items-center'
                        : 'd-flex align-items-center'
                    }
                    key={index}
                  >
                    <i className={`${bullet.iconClass} me-2 fa-lg text-primary`}></i>
                    <span dangerouslySetInnerHTML={{ __html: bullet.text }} />
                  </li>
                ))}
              </ul>
              <a className="button-48" role="button" href={content.aboutUs.buttonHref}>
                <span className="text">{content.aboutUs.buttonLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <ContactCta
        heading={content.contactInfo.heading}
        textLines={content.contactInfo.textLines}
        buttonLabel={content.contactInfo.buttonLabel}
        buttonHref={routeHref(content.contactInfo.buttonHref)}
      />
      <TestimonialSection
        eyebrow={content.testimonialSection.eyebrow}
        heading={content.testimonialSection.heading}
        testimonials={testimonials}
      >
        {chunkRows(content.gallery.desktopImages).map((row, rowIndex) => (
          <div className="row d-none d-lg-flex" key={rowIndex}>
            {row.map((image, index) => (
              <div className="col-lg-4 col-md-4 mb-2" key={index}>
                <img
                  src={assetUrl(image.src)}
                  className="w-100 shadow-1-strong rounded mb-4 hover-effect"
                  loading="lazy"
                  alt={image.alt}
                />
              </div>
            ))}
          </div>
        ))}
        {/* Carousel für kleinere Geräte */}
        <div id="imageCarousel" className="carousel slide d-lg-none" data-bs-ride="carousel">
          <div className="carousel-inner">
            {content.gallery.mobileCarouselImages.map((image, index) => (
              <div className={index === 0 ? 'carousel-item active' : 'carousel-item'} key={index}>
                <img
                  src={assetUrl(image.src)}
                  className="d-block w-100"
                  alt={image.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="carousel-indicators">
            {content.gallery.mobileCarouselImages.map((_, index) => (
              <button
                type="button"
                data-bs-target="#imageCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : undefined}
                aria-current={index === 0 ? 'true' : undefined}
                aria-label={`Go to slide ${index + 1}`}
                key={index}
              ></button>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#imageCarousel"
            data-bs-slide="prev"
            aria-label="Previous slide"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#imageCarousel"
            data-bs-slide="next"
            aria-label="Next slide"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </TestimonialSection>
      <section className="padding-small-bottom">
        <div className="container">
          <div className="container text-center mb-3">
            <h6 className="text-primary">{content.faqSection.eyebrow}</h6>
            <h3
              className="display-5 fw-bold"
              dangerouslySetInnerHTML={{ __html: content.faqSection.heading }}
            />
          </div>
          <div className="accordion" id="accordionExample">
            {faqs.map((faq, index) => {
              const id = FAQ_IDS[index] ?? `Item${index + 1}`;
              const ariaLabel = FAQ_ARIA_LABELS[index] ?? 'Toggle FAQ';
              const isFirst = index === 0;
              return (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${id}`}>
                    <button
                      className={isFirst ? 'accordion-button' : 'accordion-button collapsed'}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${id}`}
                      aria-expanded={isFirst ? 'true' : 'false'}
                      aria-controls={`collapse${id}`}
                      aria-label={ariaLabel}
                    >
                      <strong dangerouslySetInnerHTML={{ __html: faq.question }} />
                    </button>
                  </h2>
                  <div
                    id={`collapse${id}`}
                    className={
                      isFirst ? 'accordion-collapse collapse show' : 'accordion-collapse collapse'
                    }
                    aria-labelledby={`heading${id}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {faq.answer.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <SiteFooter settings={settings} variant="index" />
      <CookieBanner />
    </>
  );
}
