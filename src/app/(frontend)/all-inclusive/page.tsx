import React from 'react';

import type { Metadata } from 'next';

import { ContactCta } from '@/components/ContactCta';
import { Preloader } from '@/components/Preloader';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { TestimonialSection } from '@/components/TestimonialSection';
import { WhatsAppPopup } from '@/components/WhatsAppPopup';
import { getAllInclusiveContent } from '@/lib/content/all-inclusive-cms';
import { assetUrl } from '@/lib/content/helpers';
import { getSettingsContent } from '@/lib/content/settings-cms';
import { getStartseiteContent } from '@/lib/content/startseite-cms';
import { getTestimonialsContent } from '@/lib/content/testimonials-cms';
import { routeHref } from '@/lib/links';

// Metadaten 1:1 aus dem <head> von all-inclusive.html (og:url extensionslos).
export const metadata: Metadata = {
  title:
    'Kitesurfing Dakhla | Explore Our All-inclusive Kitesurfing Adventure | Kitesurfingdakhla.com',
  description:
    'Join our 7-day all-inclusive kitesurfing adventure in Dakhla with Kitesurfing Dakhla. Enjoy daily lessons, top-notch equipment, beachfront camp, meals, and much more. Book your spot today!',
  keywords:
    'kitesurfing, Dakhla, adventure, all-inclusive, kitesurf lessons, beachfront accommodation, kitesurfing package, IKO certified, beginners, advanced',
  robots: 'index, follow',
  openGraph: {
    title:
      'Kitesurfing Dakhla | Explore Our All-inclusive Kitesurfing Adventure | Kitesurfingdakhla.com',
    description:
      'Join our 7-day all-inclusive kitesurfing adventure in Dakhla with Kitesurfing Dakhla. Enjoy daily lessons, top-notch equipment, beachfront camp, meals, and much more. Book your spot today!',
    url: 'https://kitesurfingdakhla.com/all-inclusive',
    images: ['https://kitesurfingdakhla.com/images/logo/google-image.png'],
    type: 'website',
  },
};

// Galerie unter den Testimonials — alt-Texte exakt wie in all-inclusive.html
// (Platzhalter-Alts des Originals, abweichend von den Startseiten-Alts).
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

const GALLERY_MOBILE_IMAGES = [
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

export default async function AllInclusivePage() {
  const [settings, content, startseite, testimonials] = await Promise.all([
    getSettingsContent(),
    getAllInclusiveContent(),
    getStartseiteContent(),
    getTestimonialsContent(),
  ]);

  return (
    <>
      <Preloader />
      <WhatsAppPopup />
      <SiteHeader
        settings={settings}
        variant="image"
        active="services"
        togglerAriaLabel="Toggle navigation menu"
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
          {/* Detail View for Kitesurf Lessons */}
          <div className="detail-view kitesurf-semi-private-lessons active">
            <div className="container">
              <div className="text-lg-center mb-3 mx-auto w-md-100 w-lg-75">
                <p className="lead">{content.lead}</p>
              </div>
              {/* Key Benefits */}
              <div className="row text-center mb-3">
                {content.iconFeatures.map((feature, index) => (
                  <div className="col-6 col-md-3" key={index}>
                    <i className={`${feature.iconClass} fa-2x text-primary mb-2`}></i>
                    <p>{feature.label}</p>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center">
                <div
                  id="imageCarousel"
                  className="carousel slide responsive-carousel"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {content.carouselImages.map((image, index) => (
                      <div
                        className={index === 0 ? 'carousel-item active' : 'carousel-item'}
                        key={index}
                      >
                        <img
                          src={assetUrl(image.src)}
                          className="d-block w-100"
                          alt={image.alt}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Carousel Indicators */}
                  <div className="carousel-indicators">
                    {content.carouselImages.map((_, index) => (
                      <button
                        type="button"
                        data-bs-target="#imageCarousel"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : undefined}
                        aria-current={index === 0 ? 'true' : undefined}
                        aria-label={`Slide ${index + 1}`}
                        key={index}
                      ></button>
                    ))}
                  </div>
                  {/* Carousel Controls */}
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
              </div>
              <div className="container mt-5">
                {/* What's Included Title */}
                <h2 className="fw-bold text-start">{content.includedHeading}</h2>
                {/* What's Included List */}
                <ul className="list-unstyled text-start mt-4" style={{ maxWidth: '600px' }}>
                  {content.includedItems.map((item, index) => {
                    // Quirk des Originals: der 5. Punkt nutzt ein <ip>-Tag statt
                    // <p> (kein Browser-Default-Margin) — 1:1 beibehalten.
                    const IconTag = (index === 4 ? 'ip' : 'p') as React.ElementType;
                    return (
                      <li className="mb-2" key={index}>
                        <IconTag className="fas fa-check-circle text-primary me-2"></IconTag>{' '}
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="container mt-5">
                {/* What's Included Title */}
                <h2 className="fw-bold text-start">{content.notIncludedHeading}</h2>
                {/* What's Included List */}
                <ul className="list-unstyled text-start mt-4" style={{ maxWidth: '600px' }}>
                  {content.notIncludedItems.map((item, index) => (
                    <li className="mb-2" key={index}>
                      <p className="fas fa-times-circle text-primary me-2"></p> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="list-group mb-3">
                {/* Header Row */}
                <div className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                  <span className="text-start flex-grow-1">
                    {content.priceTable.columnLabels.roomType}
                  </span>
                  <span className="text-center flex-grow-1">
                    {content.priceTable.columnLabels.people}
                  </span>
                  <span className="text-end flex-grow-1">
                    {content.priceTable.columnLabels.price}
                  </span>
                </div>
                {/* Content Rows */}
                {content.priceTable.rows.map((row, index) => (
                  <div
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={index}
                  >
                    <span className="text-start flex-grow-1">{row.roomType}</span>
                    <span className="text-center flex-grow-1 fw-bold">{row.people}</span>
                    <span className="text-end flex-grow-1 fw-bold">{row.price}</span>
                  </div>
                ))}
              </div>
              {/* Recommendation */}
              <div
                className="alert alert-info-orange text-start text-lg-center"
                dangerouslySetInnerHTML={{ __html: content.alertText }}
              />
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
            {GALLERY_MOBILE_IMAGES.map((image, index) => (
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
          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {GALLERY_MOBILE_IMAGES.map((_, index) => (
              <button
                type="button"
                data-bs-target="#imageCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : undefined}
                aria-current={index === 0 ? 'true' : undefined}
                aria-label={`Slide ${index + 1}`}
                key={index}
              ></button>
            ))}
          </div>
          {/* Carousel Controls */}
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
