import React from 'react';

import type { Metadata } from 'next';

import { ContactCta } from '@/components/ContactCta';
import { Preloader } from '@/components/Preloader';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { TestimonialSection } from '@/components/TestimonialSection';
import { WhatsAppPopup } from '@/components/WhatsAppPopup';
import { assetUrl } from '@/lib/content/helpers';
import { getKitesurfLessonsContent } from '@/lib/content/kitesurf-lessons-cms';
import { getSettingsContent } from '@/lib/content/settings-cms';
import { getStartseiteContent } from '@/lib/content/startseite-cms';
import { getTestimonialsContent } from '@/lib/content/testimonials-cms';
import { routeHref } from '@/lib/links';

// Metadaten 1:1 aus dem <head> von kitesurf-lessons.html
// (kein canonical, kein og:url/og:type im Original).
export const metadata: Metadata = {
  title: 'Kitesurfing Dakhla | Kitesurf Lessons | Kitesurfingdakhla.com',
  description:
    'Join our Kitesurfing Dakhla lessons for an unforgettable experience. We offer semi-private and private lessons with certified instructors.',
  keywords:
    'Kitesurfing lessons, Dakhla kitesurf, private kitesurf lessons, semi-private kitesurf lessons, kitesurf instructors, kiteboarding, Dakhla watersports',
  robots: 'index, follow',
  openGraph: {
    title: 'Kitesurfing Dakhla | Kitesurf Lessons | Kitesurfingdakhla.com',
    description:
      'Join our Kitesurfing Dakhla lessons for an unforgettable experience. We offer semi-private and private lessons with certified instructors.',
    images: ['https://kitesurfingdakhla.com/images/logo/google-image.png'],
  },
};

// Galerie-Bilder mit den seitenspezifischen Alt-Texten aus kitesurf-lessons.html
// (Struktur/Attribute sind Markup, keine CMS-Inhalte).
const GALLERY_DESKTOP_ROWS = [
  [
    { src: 'images/gallery/surfboards-beach.webp', alt: 'Surfboards on beach' },
    { src: 'images/gallery/walking-out.webp', alt: 'People carrying kites' },
    { src: 'images/gallery/team-and-clients.webp', alt: 'Team and clients picture' },
  ],
  [
    { src: 'images/gallery/kite-in-air.webp', alt: 'Kite in the air' },
    { src: 'images/gallery/simo-with-woman.webp', alt: 'Instructor happy with women' },
    { src: 'images/gallery/simo-showing.webp', alt: 'Instructor explaining' },
  ],
  [
    { src: 'images/gallery/simo-explaining.webp', alt: 'Instructor holding bar' },
    { src: 'images/gallery/simo-instructor.webp', alt: 'Instructor happy with client' },
    { src: 'images/gallery/man-kiting.webp', alt: 'Client kiting after making progress' },
  ],
];

const GALLERY_CAROUSEL_IMAGES = [
  { src: 'images/gallery/surfboards-beach.webp', alt: 'Surfboards on beach' },
  { src: 'images/gallery/walking-out.webp', alt: 'People carrying kites' },
  { src: 'images/gallery/team-and-clients.webp', alt: 'Team and clients picture' },
  { src: 'images/gallery/simo-instructor.webp', alt: 'Kite in the air' },
  { src: 'images/gallery/man-kiting.webp', alt: 'Instructor happy with women' },
  { src: 'images/gallery/simo-explaining.webp', alt: 'Instructor explaining' },
  { src: 'images/gallery/simo-with-woman.webp', alt: 'Instructor holding bar' },
  { src: 'images/gallery/kite-in-air.webp', alt: 'Instructor happy with client' },
  { src: 'images/gallery/simo-showing.webp', alt: 'Client kiting after making progress' },
];

export default async function KitesurfLessonsPage() {
  const [settings, content, startseite, testimonials] = await Promise.all([
    getSettingsContent(),
    getKitesurfLessonsContent(),
    getStartseiteContent(),
    getTestimonialsContent(),
  ]);

  // Filter-Klassen sind Load-bearing Hooks für js/script.js (jQuery Isotope):
  // '.kitesurf-semi-private-lessons' ist der Initial-Filter beim Laden.
  const variants = [
    { data: content.semiPrivate, filterClass: 'kitesurf-semi-private-lessons', active: true },
    { data: content.private, filterClass: 'kitesurf-private-lessons', active: false },
  ];

  return (
    <>
      <Preloader />
      <WhatsAppPopup />
      <SiteHeader
        settings={settings}
        variant="image"
        active="services"
        togglerAriaLabel="Open navigation menu"
        closeAriaLabel="Close navigation menu"
      />
      <section id="services" className="padding-small">
        <div className="container">
          <div className="container text-center">
            <h6 className="text-primary">{content.hero.eyebrow}</h6>
            <h3
              className="display-5 fw-bold"
              dangerouslySetInnerHTML={{ __html: content.hero.heading }}
            />
          </div>
          <div className="my-4 w-100 w-lg-50 mx-auto">
            <div className="row justify-content-center">
              {variants.map(({ data, filterClass, active }) => (
                <div className="col-12 col-md-6 mb-3" key={filterClass}>
                  <button
                    className={active ? 'filter-button w-100 px-3 active' : 'filter-button w-100 px-3'}
                    data-filter={`.${filterClass}`}
                    aria-label={`Filter ${data.tabLabel}`}
                  >
                    {data.tabLabel}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {variants.map(({ data, filterClass, active }) => (
            <div
              className={active ? `detail-view ${filterClass} active` : `detail-view ${filterClass} d-none`}
              key={filterClass}
            >
              <div className="container">
                <div className="text-center mb-3">
                  <h2 className="fw-bold text-start text-lg-center">{data.title}</h2>
                  {data.description.map((paragraph, index) => (
                    <p className="text-start text-lg-center" key={index}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                {/* Key Benefits */}
                <div className="row text-center mb-3">
                  {data.iconFeatures.map((feature, index) => (
                    <div className="col-6 col-md-3" key={index}>
                      <i className={`${feature.iconClass} fa-2x text-primary mb-2`}></i>
                      <p>{feature.label}</p>
                    </div>
                  ))}
                </div>
                {/* Pricing Table */}
                <div className="list-group mb-3">
                  {data.priceRows.map((row, index) => (
                    <div
                      className={
                        row.highlighted
                          ? 'list-group-item d-flex justify-content-between align-items-center bg-light-orange'
                          : 'list-group-item d-flex justify-content-between align-items-center'
                      }
                      key={index}
                    >
                      {row.highlighted ? (
                        <span>
                          <strong>{row.label}</strong>
                          <br /> <small className="text-muted">{row.note}</small>
                        </span>
                      ) : (
                        <span>{row.label}</span>
                      )}
                      <span className="fw-bold text-end">{row.price}</span>
                    </div>
                  ))}
                </div>
                {/* Recommendation */}
                <div
                  className="alert alert-info-orange text-start text-lg-center"
                  dangerouslySetInnerHTML={{ __html: data.alertText }}
                />
                {/* CTA */}
                <div className="text-center mt-4">
                  <a className="button-48" role="button" href={routeHref(data.ctaButtonHref)}>
                    <span className="text">{data.ctaButtonLabel}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ContactCta
        heading={content.contactInfo.heading}
        textLines={content.contactInfo.textLines}
        buttonLabel={content.contactInfo.buttonLabel}
        buttonHref={routeHref(content.contactInfo.buttonHref)}
      />
      <TestimonialSection
        eyebrow={startseite.testimonialSection.eyebrow}
        heading={startseite.testimonialSection.heading}
        testimonials={testimonials}
      >
        {GALLERY_DESKTOP_ROWS.map((row, rowIndex) => (
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
            {GALLERY_CAROUSEL_IMAGES.map((image, index) => (
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
            {GALLERY_CAROUSEL_IMAGES.map((_, index) => (
              <button
                type="button"
                data-bs-target="#imageCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : undefined}
                aria-current={index === 0 ? 'true' : undefined}
                aria-label={`Go to Slide ${index + 1}`}
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
      <SiteFooter settings={settings} variant="sub" />
    </>
  );
}
