// Inhalte der Seite all-inclusive.html.

export interface AllInclusiveIconFeature {
  iconClass: string;
  label: string;
}

export interface AllInclusiveCarouselImage {
  src: string;
  alt: string;
}

export interface AllInclusivePriceRow {
  roomType: string;
  people: string;
  price: string;
}

export interface AllInclusiveContent {
  hero: {
    eyebrow: string;
    /** enthält HTML */
    heading: string;
  };
  lead: string;
  iconFeatures: AllInclusiveIconFeature[];
  carouselImages: AllInclusiveCarouselImage[];
  includedHeading: string;
  includedItems: string[];
  notIncludedHeading: string;
  notIncludedItems: string[];
  priceTable: {
    columnLabels: {
      roomType: string;
      people: string;
      price: string;
    };
    rows: AllInclusivePriceRow[];
  };
  /** enthält HTML */
  alertText: string;
  cta: {
    buttonLabel: string;
    buttonHref: string;
  };
  contactInfo: {
    heading: string;
    /** Zeilen des Absatzes; im Original durch <br> getrennt */
    textLines: string[];
    buttonLabel: string;
    buttonHref: string;
  };
}

export const ALL_INCLUSIVE_CONTENT: AllInclusiveContent = {
  hero: {
    eyebrow: "Services",
    heading:
      '7 Day All-inclusive Kitesurf <span class="orange-dot">Adventure</span>',
  },
  lead: "Join us for an unforgettable 7-day kitesurfing adventure in Dakhla, a world-renowned paradise. Whether you're a beginner or experienced, this all-inclusive camp offers perfect conditions. Our IKO-certified, multilingual instructors focus on safety and effective teaching to help you become an independent kitesurfer fast.",
  iconFeatures: [
    { iconClass: "fas fa-level-up-alt", label: "All Levels" },
    { iconClass: "fas fa-user-friends", label: "Maximum 3 Persons" },
    { iconClass: "fas fa-utensils", label: "Breakfast Included" },
    { iconClass: "fas fa-calendar-alt", label: "7 Days 6 Nights" },
  ],
  carouselImages: [
    {
      src: "images/bedroom/image00001.webp",
      alt: "All inclusive package private double bedroom",
    },
    {
      src: "images/bedroom/image00002.webp",
      alt: "All inclusive package private double bedroom white",
    },
    {
      src: "images/bedroom/image00003.webp",
      alt: "All inclusive package private bedroom",
    },
    {
      src: "images/bedroom/image00004.webp",
      alt: "All inclusive package private double bedroom close",
    },
    {
      src: "images/bedroom/image00005.webp",
      alt: "All inclusive package private bedroom close",
    },
    {
      src: "images/bedroom/image00006.webp",
      alt: "All inclusive package private double bedroom darkened",
    },
    {
      src: "images/bedroom/image00007.webp",
      alt: "All inclusive package private double bedroom princess bed",
    },
  ],
  includedHeading: "What's included",
  includedItems: [
    "Daily kitesurfing lessons with certified instructors",
    "Unlimited use of top notch kitesurfing equipment and supervision",
    "6 nights/ 7 days accommodation in a private room or double room",
    "Delicious daily breakfast and lunch",
    "Airport transfers and local transportation",
  ],
  notIncludedHeading: "What's not included",
  notIncludedItems: [
    "Flight tickets",
    "Insurance",
    "Dinner",
    "Personal extras (souvenirs, drinks, etc.)",
  ],
  priceTable: {
    columnLabels: {
      roomType: "Room Type",
      people: "People in Package",
      price: "Price",
    },
    rows: [
      { roomType: "Private Single Room", people: "1 Person", price: "799€" },
      { roomType: "Private Double Room", people: "2 People", price: "1598€" },
      { roomType: "Private Double Room", people: "4 People", price: "3196€" },
    ],
  },
  // enthält HTML
  alertText:
    "<strong>Spots are limited </strong>book now and let the <strong>adventure</strong> begin!",
  cta: {
    buttonLabel: "Book now",
    buttonHref: "./book",
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
