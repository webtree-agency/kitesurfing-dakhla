import type { Metadata } from 'next';

import { ContactCta } from '@/components/ContactCta';
import { Preloader } from '@/components/Preloader';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { TestimonialSection } from '@/components/TestimonialSection';
import { WhatsAppPopup } from '@/components/WhatsAppPopup';
import { assetUrl } from '@/lib/content/helpers';
import { getKitesurfTripsContent } from '@/lib/content/kitesurf-trips-cms';
import { getSettingsContent } from '@/lib/content/settings-cms';
import { getStartseiteContent } from '@/lib/content/startseite-cms';
import { getTestimonialsContent } from '@/lib/content/testimonials-cms';
import { routeHref } from '@/lib/links';

// Metadaten 1:1 aus dem <head> von kitesurf-trips.html (og:url extensionslos).
export const metadata: Metadata = {
  title: 'Kitesurfing Dakhla | Kitesurf Trips | Kitesurfingdakhla.com',
  description:
    'Discover thrilling kitesurf trips with Kitesurfing Dakhla, including White Dune, Secret Spot, and Oyster Farm. Explore hidden kite spots with expert guides and enjoy unforgettable experiences. Book now!',
  keywords:
    'kitesurf trips, Dakhla kitesurfing, kiteboarding Dakhla, White Dune kitesurfing, Secret Spot kitesurf, Oyster Farm Dakhla, kitesurfing tours, kite trip Dakhla',
  robots: 'follow, index',
  alternates: { canonical: 'https://kitesurfingdakhla.com/kitesurf-trips' },
  openGraph: {
    title: 'Kitesurfing Dakhla | Kitesurf Trips | Kitesurfingdakhla.com',
    description:
      'Discover thrilling kitesurf trips with Kitesurfing Dakhla, including White Dune, Secret Spot, and Oyster Farm. Explore hidden kite spots with expert guides and enjoy unforgettable experiences. Book now!',
    images: ['https://kitesurfingdakhla.com/images/logo/google-image.png'],
    url: 'https://www.kitesurfingdakhla.com/kitesurf-trips',
    type: 'website',
  },
};

// Isotope-Filterklassen exakt wie in kitesurf-trips.html — js/script.js
// schaltet die .detail-view-Blöcke über diese data-filter-Werte um.
const TRIP_FILTER_CLASSES = [
  'kitesurf-trip-white-dune',
  'kitesurf-trip-secret-spot',
  'kitesurf-trip-oyster-farm',
];

// Galerie unter den Testimonials — alt-Texte exakt wie in kitesurf-trips.html
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

export default async function KitesurfTripsPage() {
  const [settings, content, startseite, testimonials] = await Promise.all([
    getSettingsContent(),
    getKitesurfTripsContent(),
    getStartseiteContent(),
    getTestimonialsContent(),
  ]);

  const trips = [
    { filterClass: TRIP_FILTER_CLASSES[0], variant: content.whiteDune },
    { filterClass: TRIP_FILTER_CLASSES[1], variant: content.secretSpot },
    { filterClass: TRIP_FILTER_CLASSES[2], variant: content.oysterFarm },
  ];

  return (
    <>
      <Preloader />
      <WhatsAppPopup />
      <SiteHeader
        settings={settings}
        variant="image"
        active="services"
        togglerIconAriaHidden
        closeAriaLabel="Close"
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
              {trips.map((trip, index) => (
                <div className="col-12 col-md-6 mb-3" key={index}>
                  <button
                    className={index === 0 ? 'filter-button w-100 px-3 active' : 'filter-button w-100 px-3'}
                    data-filter={`.${trip.filterClass}`}
                    aria-label={trip.variant.tabLabel}
                  >
                    {trip.variant.tabLabel}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {trips.map((trip, index) => (
            <div
              className={`detail-view ${trip.filterClass} ${index === 0 ? 'active' : 'd-none'}`}
              key={index}
            >
              <div className="container">
                {/* Title and Introduction */}
                <div className="text-center mb-5">
                  <h2 className="fw-bold text-start text-lg-center">{trip.variant.title}</h2>
                  <p className="text-start text-lg-center">{trip.variant.intro}</p>
                  <img
                    src={assetUrl(trip.variant.imageSrc)}
                    alt={trip.variant.imageAlt}
                    className="trips-img mt-3"
                  />
                </div>
                {/* What to Expect Section */}
                <div className="container mt-5 mb-5">
                  <h2 className="fw-bold text-start">{trip.variant.whatToExpectHeading}</h2>
                  {trip.variant.whatToExpectParagraphs.map((paragraph, paragraphIndex) => (
                    <p className="text-start" key={paragraphIndex}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                {/* How It Works Section */}
                <div className="container mb-5">
                  <h2 className="fw-bold text-start">{trip.variant.howItWorksHeading}</h2>
                  <ul className="list-unstyled text-start mt-4">
                    {trip.variant.howItWorksItems.map((item, itemIndex) => (
                      <li className="mb-2" key={itemIndex}>
                        <p className="fas fa-check-circle text-primary me-2"></p> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Pricing Section */}
                <div className="list-group mb-3">
                  <div className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                    <span className="text-start flex-grow-1">
                      {trip.variant.priceInfo.columnLabels.price}
                    </span>
                    <span className="text-center flex-grow-1">
                      {trip.variant.priceInfo.columnLabels.groupSize}
                    </span>
                    <span className="text-end flex-grow-1">
                      {trip.variant.priceInfo.columnLabels.skillRequirement}
                    </span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="text-start flex-grow-1">{trip.variant.priceInfo.price}</span>
                    <span className="text-center flex-grow-1">
                      {trip.variant.priceInfo.groupSize}
                    </span>
                    <span className="text-end flex-grow-1">
                      {trip.variant.priceInfo.skillRequirement}
                    </span>
                  </div>
                </div>
                {/* Recommendation Section */}
                <div
                  className="alert alert-info-orange text-start text-lg-center"
                  dangerouslySetInnerHTML={{ __html: trip.variant.alertText }}
                />
                {/* Call to Action */}
                <div className="text-center mt-4">
                  <a
                    className="button-48"
                    role="button"
                    href={routeHref(trip.variant.ctaButtonHref)}
                  >
                    <span className="text">{trip.variant.ctaButtonLabel}</span>
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
            aria-label="Previous"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#imageCarousel"
            data-bs-slide="next"
            aria-label="Next"
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
