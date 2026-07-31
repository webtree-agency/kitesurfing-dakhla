// Inhalte der Seite kitesurf-trips.html.

export interface TripPriceInfo {
  columnLabels: {
    price: string;
    groupSize: string;
    skillRequirement: string;
  };
  price: string;
  groupSize: string;
  skillRequirement: string;
}

export interface TripVariant {
  /** Label des Filter-/Tab-Buttons */
  tabLabel: string;
  title: string;
  intro: string;
  imageSrc: string;
  imageAlt: string;
  whatToExpectHeading: string;
  whatToExpectParagraphs: string[];
  howItWorksHeading: string;
  howItWorksItems: string[];
  priceInfo: TripPriceInfo;
  /** enthält HTML */
  alertText: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
}

export interface TripsContent {
  hero: {
    eyebrow: string;
    /** enthält HTML */
    heading: string;
  };
  whiteDune: TripVariant;
  secretSpot: TripVariant;
  oysterFarm: TripVariant;
  contactInfo: {
    heading: string;
    /** Zeilen des Absatzes; im Original durch <br> getrennt */
    textLines: string[];
    buttonLabel: string;
    buttonHref: string;
  };
}

const TRIP_COLUMN_LABELS = {
  price: "Price",
  groupSize: "Group Size",
  skillRequirement: "Skill Requirement",
};

export const KITESURF_TRIPS_CONTENT: TripsContent = {
  hero: {
    eyebrow: "Services",
    heading: 'Kitesurf <span class="orange-dot">Trips</span>',
  },
  whiteDune: {
    tabLabel: "White Dune",
    title: "Trip to the White Dune",
    intro:
      "Experience a thrilling, exclusive journey to the White Dune, with stunning landscapes and hidden kite spots in Dakhla.",
    imageSrc: "images/trips/trip-white-dune.webp",
    imageAlt: "White Dune",
    whatToExpectHeading: "What to Expect",
    whatToExpectParagraphs: [
      "Begin with a comfortable pick-up from your hotel, followed by a drive to the main lagoon where our team prepares your kitesurfing equipment.",
      "Enjoy an exciting 40-minute downwind ride to the stunning White Dune, soaking in breathtaking views. With some luck, you might even spot dolphins along the way.",
      "At the White Dune, kitesurf in one of the most scenic spots before heading back to your hotel with unforgettable memories.",
    ],
    howItWorksHeading: "How It Works",
    howItWorksItems: [
      "Meet your guide in Dakhla for a brief safety introduction.",
      "Head out for a downwind adventure to exclusive kite spots.",
      "Stop at the oyster farm to enjoy fresh seafood and lagoon views.",
      "Return to the meeting point with unforgettable memories.",
    ],
    priceInfo: {
      columnLabels: TRIP_COLUMN_LABELS,
      price: "25€ per person",
      groupSize: "4-6 people",
      skillRequirement: "Independent kiter",
    },
    // enthält HTML
    alertText:
      "<strong>This is more than a vacation—</strong>it’s your ticket to an unforgettable escape into Dakhla’s untouched beauty.",
    ctaButtonLabel: "Book now",
    ctaButtonHref: "./book",
  },
  secretSpot: {
    tabLabel: "Secret Spot",
    title: "Trip to the Secret Spot",
    intro:
      "Discover the secluded beauty of the Secret Spot, with breathtaking views and hidden kite locations in Dakhla.",
    imageSrc: "images/trips/kitesurfers-trip.webp",
    imageAlt: "Secret Spot",
    whatToExpectHeading: "What to Expect",
    whatToExpectParagraphs: [
      "Begin with a pick-up from your hotel, followed by a scenic drive to the lagoon where your kitesurfing equipment will be prepared.",
      "Glide through pristine waters on a 40-minute downwind ride to the Secret Spot, a hidden paradise with perfect conditions. Keep an eye out for dolphins during this serene journey.",
      "Enjoy a kitesurfing session in this untouched gem before being comfortably transported back to your hotel with unforgettable memories.",
    ],
    howItWorksHeading: "How It Works",
    howItWorksItems: [
      "Meet your guide in Dakhla for a brief safety introduction.",
      "Head out on an exciting downwind ride to a hidden kite spot.",
      "Explore the Secret Spot with a kitesurfing session in perfect conditions.",
      "Return to your hotel with unforgettable memories.",
    ],
    priceInfo: {
      columnLabels: TRIP_COLUMN_LABELS,
      price: "25€ per person",
      groupSize: "4-6 people",
      skillRequirement: "Independent kiter",
    },
    // enthält HTML
    alertText:
      "<strong>This is more than a vacation—</strong>it’s your chance to explore Dakhla’s hidden wonders.",
    ctaButtonLabel: "Book now",
    ctaButtonHref: "./book",
  },
  oysterFarm: {
    tabLabel: "Oyster Farm",
    title: "Trip to the Oyster Farm",
    intro:
      "Discover the Oyster Farm, where nature and local tradition come together in Dakhla.",
    imageSrc: "images/trips/surfspot2-dakhla.webp",
    imageAlt: "Oyster Farm",
    whatToExpectHeading: "What to Expect",
    whatToExpectParagraphs: [
      "Start with a hotel pick-up and a scenic drive to the lagoon, where your kitesurfing equipment will be prepared.",
      "Enjoy a stunning downwind ride through clear waters and breathtaking landscapes on your way to the Oyster Farm.",
      "Upon arrival, savor freshly cooked fish and oysters while soaking in the serene lagoon views, creating a truly unforgettable experience.",
    ],
    howItWorksHeading: "How It Works",
    howItWorksItems: [
      "Meet your guide in Dakhla for a safety introduction.",
      "Embark on a scenic downwind ride through the lagoon.",
      "Indulge in fresh seafood at the Oyster Farm with stunning views.",
      "Return to your hotel with lasting memories.",
    ],
    priceInfo: {
      columnLabels: TRIP_COLUMN_LABELS,
      price: "25€ per person",
      groupSize: "4-6 people",
      skillRequirement: "Independent kiter",
    },
    // enthält HTML
    alertText:
      "<strong>This is more than a vacation—</strong>it’s your gateway to Dakhla’s hidden treasures.",
    ctaButtonLabel: "Book now",
    ctaButtonHref: "./book",
  },
  contactInfo: {
    heading: "Your are in good hands!",
    textLines: [
      "Meet Our Team - passionate kitesurfing experts, dedicated to sharing their love for the sport through safe, personalized lessons.",
      "With years of experience, they welcome all skill levels and inspire a respect for nature and responsible water sports.",
    ],
    buttonLabel: "Book now",
    buttonHref: "./book",
  },
};
