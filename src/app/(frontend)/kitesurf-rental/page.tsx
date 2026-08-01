import React from 'react';

import type { Metadata } from 'next';

import { ContactCta } from '@/components/ContactCta';
import { Preloader } from '@/components/Preloader';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { TestimonialSection } from '@/components/TestimonialSection';
import { WhatsAppPopup } from '@/components/WhatsAppPopup';
import { assetUrl } from '@/lib/content/helpers';
import { getKitesurfRentalContent } from '@/lib/content/kitesurf-rental-cms';
import { getSettingsContent } from '@/lib/content/settings-cms';
import { getStartseiteContent } from '@/lib/content/startseite-cms';
import { getTestimonialsContent } from '@/lib/content/testimonials-cms';
import { routeHref } from '@/lib/links';

// Metadaten 1:1 aus dem <head> von kitesurf-rental.html (og:url extensionslos).
export const metadata: Metadata = {
  title: 'Kitesurfing Dakhla | Kitesurf Rental | Kitesurfingdakhla.com',
  description:
    'Rent premium kitesurfing equipment in Dakhla with Kitesurfing Dakhla. Choose from full gear, kite-only, board-only, and insurance options to suit your needs. Flexible rental terms available for up to 7 days.',
  keywords:
    'kitesurfing rental, Dakhla kitesurfing, kite rental, board rental, kitesurf gear rental, kite insurance, kitesurf Dakhla, kiteboarding rental',
  robots: 'follow, index',
  alternates: { canonical: 'https://kitesurfingdakhla.com/kitesurf-rental' },
  openGraph: {
    title: 'Kitesurfing Dakhla | Kitesurf Rental | Kitesurfingdakhla.com',
    description:
      'Rent premium kitesurfing equipment in Dakhla with Kitesurfing Dakhla. Choose from full gear, kite-only, board-only, and insurance options to suit your needs. Flexible rental terms available for up to 7 days.',
    images: ['https://kitesurfingdakhla.com/images/logo/google-image.png'],
    url: 'https://kitesurfingdakhla.com/kitesurf-rental',
    type: 'website',
  },
};

// Galerie-Bilder mit den seitenspezifischen Alt-Texten aus kitesurf-rental.html
// (Struktur/Attribute sind Markup, keine CMS-Inhalte).
const GALLERY_DESKTOP_ROWS = [
  [
    { src: 'images/gallery/surfboards-beach.webp', alt: 'Boat on Calm Water' },
    { src: 'images/gallery/walking-out.webp', alt: 'Wintry Mountain Landscape' },
    { src: 'images/gallery/team-and-clients.webp', alt: 'Yosemite National Park' },
  ],
  [
    { src: 'images/gallery/kite-in-air.webp', alt: 'Mountains in the Clouds' },
    { src: 'images/gallery/simo-with-woman.webp', alt: 'Boat on Calm Water' },
    { src: 'images/gallery/simo-showing.webp', alt: 'Waves at Sea' },
  ],
  [
    { src: 'images/gallery/simo-explaining.webp', alt: 'Mountains in the Clouds' },
    { src: 'images/gallery/simo-instructor.webp', alt: 'Boat on Calm Water' },
    { src: 'images/gallery/man-kiting.webp', alt: 'Waves at Sea' },
  ],
];

const GALLERY_CAROUSEL_IMAGES = [
  { src: 'images/gallery/surfboards-beach.webp', alt: 'Boat on Calm Water' },
  { src: 'images/gallery/walking-out.webp', alt: 'Wintry Mountain Landscape' },
  { src: 'images/gallery/team-and-clients.webp', alt: 'Mountains in the Clouds' },
  { src: 'images/gallery/simo-instructor.webp', alt: 'Boat on Calm Water' },
  { src: 'images/gallery/man-kiting.webp', alt: 'Waves at Sea' },
  { src: 'images/gallery/simo-explaining.webp', alt: 'Yosemite National Park' },
  { src: 'images/gallery/simo-with-woman.webp', alt: 'Yosemite National Park' },
  { src: 'images/gallery/kite-in-air.webp', alt: 'Yosemite National Park' },
  { src: 'images/gallery/simo-showing.webp', alt: 'Yosemite National Park' },
];

export default async function KitesurfRentalPage() {
  const [settings, content, startseite, testimonials] = await Promise.all([
    getSettingsContent(),
    getKitesurfRentalContent(),
    getStartseiteContent(),
    getTestimonialsContent(),
  ]);

  // Filter-Klassen sind Load-bearing Hooks für js/script.js (jQuery Isotope):
  // '.full-gear' ist der aktive Tab beim Laden.
  const tabs = [
    { data: content.fullGear, filterClass: 'full-gear', active: true },
    { data: content.kiteOnly, filterClass: 'kite-only', active: false },
    { data: content.boardOnly, filterClass: 'board-only', active: false },
    { data: content.insurance, filterClass: 'insurance', active: false },
  ];

  return (
    <>
      <Preloader />
      <WhatsAppPopup />
      <SiteHeader
        settings={settings}
        variant="image"
        active="services"
        togglerAriaLabel="Toggle navigation menu"
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
          <div className="my-4 text-center">
            <div className="row">
              {tabs.map(({ data, filterClass, active }) => (
                <div className="col-6 col-md-3 mb-3" key={filterClass}>
                  <button
                    className={active ? 'filter-button w-100 px-3 active' : 'filter-button w-100 px-3'}
                    data-filter={`.${filterClass}`}
                    aria-label={`Filter: ${data.tabLabel}`}
                  >
                    {data.tabLabel}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="container">
              {/* Pricing Tables */}
              {tabs.map(({ data, filterClass, active }) => (
                <div
                  className={
                    active ? `detail-view ${filterClass} active` : `detail-view ${filterClass} d-none`
                  }
                  key={filterClass}
                >
                  <h2 className="text-center fw-bold mb-3">{data.title}</h2>
                  <div className="list-group">
                    {data.priceRows.map((row, index) => (
                      <div
                        className={
                          row.highlighted
                            ? 'list-group-item d-flex justify-content-between bg-light-orange'
                            : 'list-group-item d-flex justify-content-between'
                        }
                        key={index}
                      >
                        <span>{row.label}</span>
                        <span className="fw-bold text-end">{row.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="text-center mt-5 w-100 w-lg-75 mx-auto">
                <h3 className="fw-bold">{content.howItWorks.heading}</h3>
                {content.howItWorks.paragraphs.map((paragraph, index) => (
                  <p className="text-start text-lg-center" key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="row text-center mb-3">
                {content.iconFeatures.map((feature, index) => (
                  <div className="col-6 col-md-3" key={index}>
                    <i className={`${feature.iconClass} fa-2x text-primary mb-2`}></i>
                    <p>{feature.label}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <a className="button-48" role="button" href={routeHref(content.cta.buttonHref)}>
                  <span className="text">{content.cta.buttonLabel}</span>
                </a>
              </div>
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
      <SiteFooter settings={settings} variant="sub" />
    </>
  );
}
