// Inhalte der Startseite (index.html).
// Ueberschriften mit farbigen Spans werden als Roh-HTML gefuehrt, damit das
// Rendering pixel-identisch bleibt.

export interface IconFeature {
  iconClass: string;
  label: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  linkHref: string;
  buttonLabel: string;
}

export interface AboutBullet {
  iconClass: string;
  /** enthält HTML (<strong>…</strong>) */
  text: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface StartseiteContent {
  hero: {
    title: string;
    subtitle: string;
    buttonLabel: string;
    buttonHref: string;
  };
  services: {
    eyebrow: string;
    /** enthält HTML */
    heading: string;
    intro: string;
    iconFeatures: IconFeature[];
    /** enthält HTML */
    cardsHeading: string;
    cards: ServiceCard[];
  };
  parallax: {
    /** enthält HTML */
    heading: string;
  };
  aboutUs: {
    eyebrow: string;
    /** enthält HTML */
    heading: string;
    intro: string;
    imageSrc: string;
    imageAlt: string;
    whyChooseHeading: string;
    whyChooseText: string;
    bullets: AboutBullet[];
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
  testimonialSection: {
    eyebrow: string;
    /** enthält HTML */
    heading: string;
  };
  gallery: {
    /** Desktop-Grid (3x3), Reihenfolge wie im Markup */
    desktopImages: GalleryImage[];
    /**
     * Mobile-Carousel: gleiche 9 Bilder, aber eigene Reihenfolge und teils
     * abweichende alt-Texte (z.B. "with a student" statt "with student") –
     * deshalb separat gefuehrt.
     */
    mobileCarouselImages: GalleryImage[];
  };
  faqSection: {
    eyebrow: string;
    /** enthält HTML */
    heading: string;
  };
}

export const STARTSEITE_CONTENT: StartseiteContent = {
  hero: {
    title: "Kitesurfing Dakhla",
    subtitle: "ENJOY WHAT YOU LOVE AND WE TAKE CARE OF THE REST",
    buttonLabel: "Services",
    buttonHref: "#services",
  },
  services: {
    eyebrow: "Kitesurfing Dakhla Services",
    heading:
      'Explore Our Kitesurfing <span class="orange-dot">Packages</span>',
    intro:
      "Experience the thrill of kitesurfing in Dakhla. Whether you're a beginner or experienced rider, our expert instructors ensure fast progression in ideal conditions.",
    iconFeatures: [
      { iconClass: "fas fa-chart-line", label: "For All Skill Levels" },
      { iconClass: "fas fa-rocket", label: "Fast Progression" },
      { iconClass: "fas fa-lock", label: "Safety First" },
    ],
    cardsHeading:
      'Choose Your Kitesurfing Package<span class="text-orange">:</span>',
    cards: [
      {
        title: "All-Inclusive Kitesurfing Adventure",
        description:
          "Enjoy a 7-day all-inclusive kitesurfing package in Dakhla. Everything is covered for the perfect adventure.",
        imageSrc: "images/gallery/simo-explaining.webp",
        imageAlt: "All inclusive kitesurfing adventure Dakhla",
        linkHref: "./all-inclusive.html",
        buttonLabel: "Pricing",
      },
      {
        title: "Kitesurf Lessons",
        description:
          "Learn kitesurfing in Dakhla with certified instructors. Perfect for all levels, with fast and safe progress.",
        imageSrc: "images/trips/instructor-helps-client-kitesurf.webp",
        imageAlt: "Kitesurf lessons Dakhla",
        linkHref: "./kitesurf-lessons.html",
        buttonLabel: "Pricing",
      },
      {
        title: "Kitesurf Rental",
        description:
          "Rent premium kitesurfing gear in Dakhla. Choose from flexible rental options for your perfect experience.",
        imageSrc: "images/trips/three-kitesurfers-with-beautiful-bg.webp",
        imageAlt: "Kitesurf rental Dakhla",
        linkHref: "./kitesurf-rental.html",
        buttonLabel: "Pricing",
      },
      {
        title: "Kitesurfing Trips",
        description:
          "Explore Dakhla’s top kitesurfing spots with guided trips. Discover hidden gems while enjoying the ride.",
        imageSrc: "images/trips/happy-people-trip-car.webp",
        imageAlt: "Kitesurfing trips Dakhla",
        linkHref: "./kitesurf-trips.html",
        buttonLabel: "Pricing",
      },
    ],
  },
  parallax: {
    heading: 'We Teach With Passion<span class="text-orange">.</span>',
  },
  aboutUs: {
    eyebrow: "About Us",
    heading: 'Meet <span class="orange-dot">Kitesurfing Dakhla</span>',
    intro:
      "At Kitesurfing Dakhla, we’re a family of water sports enthusiasts, dedicated to sharing the excitement of kitesurfing in Dakhla's perfect conditions.",
    imageSrc: "images/gallery/about-us.webp",
    imageAlt: "Kitesurfing Dakhla team in Morocco",
    whyChooseHeading: "Why Choose Us?",
    whyChooseText:
      "Join us for the ultimate kitesurfing experience in Dakhla. We offer top-notch lessons, a safe environment, and fun for all skill levels.",
    bullets: [
      {
        iconClass: "fas fa-medal",
        text: "<strong>Expert Team</strong> - 15+ years of water sports experience.",
      },
      {
        iconClass: "fas fa-user-graduate",
        text: "<strong>Certified Instructors</strong> - Skilled and focused on your progress.",
      },
      {
        iconClass: "fas fa-fingerprint",
        text: "<strong>Personalized Lessons</strong> - Tailored to your skills and goals.",
      },
      {
        iconClass: "fas fa-location",
        text: "<strong>Prime Location</strong> - Best kitesurfing spots in Dakhla.",
      },
    ],
    buttonLabel: "Learn More",
    buttonHref: "#about-us",
  },
  contactInfo: {
    heading: "Ready for the adventure?",
    textLines: [
      "If you have any questions contact us via kitesurfingdakhla@gmail.com, Whatsapp",
      "or just call us at +212 628‑283870.",
    ],
    buttonLabel: "Book now",
    buttonHref: "./book",
  },
  testimonialSection: {
    eyebrow: "Testimonials",
    heading: 'What our customers <span class="orange-dot">say</span>',
  },
  gallery: {
    desktopImages: [
      {
        src: "images/gallery/surfboards-beach.webp",
        alt: "Kitesurf boards on a sunny beach in Dakhla, Morocco",
      },
      {
        src: "images/gallery/walking-out.webp",
        alt: "Kitesurfer walking into the water with a kite in Dakhla, Morocco",
      },
      {
        src: "images/gallery/team-and-clients.webp",
        alt: "Group of kitesurfing instructors and students on the beach in Morocco",
      },
      {
        src: "images/gallery/kite-in-air.webp",
        alt: "Colorful kite flying high above the waters of Dakhla, Morocco",
      },
      {
        src: "images/gallery/simo-with-woman.webp",
        alt: "Kitesurfing instructor with student on the beach in Morocco",
      },
      {
        src: "images/gallery/simo-showing.webp",
        alt: "Instructor demonstrating kitesurfing techniques in Dakhla, Morocco",
      },
      {
        src: "images/gallery/simo-explaining.webp",
        alt: "Kitesurfing instructor explaining techniques on the beach in Morocco",
      },
      {
        src: "images/gallery/simo-instructor.webp",
        alt: "Kitesurfing instructor in Dakhla, Morocco, ready to teach",
      },
      {
        src: "images/gallery/man-kiting.webp",
        alt: "Kitesurfer riding the waves in Dakhla, Morocco",
      },
    ],
    mobileCarouselImages: [
      {
        src: "images/gallery/surfboards-beach.webp",
        alt: "Kitesurf boards on a sunny beach in Dakhla, Morocco",
      },
      {
        src: "images/gallery/walking-out.webp",
        alt: "Kitesurfer walking into the water with a kite in Dakhla, Morocco",
      },
      {
        src: "images/gallery/team-and-clients.webp",
        alt: "Group of kitesurfing instructors and students on the beach in Morocco",
      },
      {
        src: "images/gallery/simo-instructor.webp",
        alt: "Kitesurfing instructor in Dakhla, Morocco, ready to teach",
      },
      {
        src: "images/gallery/man-kiting.webp",
        alt: "Kitesurfer riding the waves in Dakhla, Morocco",
      },
      {
        src: "images/gallery/simo-explaining.webp",
        alt: "Kitesurfing instructor explaining techniques on the beach in Morocco",
      },
      {
        src: "images/gallery/simo-with-woman.webp",
        alt: "Kitesurfing instructor with a student on the beach in Morocco",
      },
      {
        src: "images/gallery/kite-in-air.webp",
        alt: "Colorful kite flying high above the waters of Dakhla, Morocco",
      },
      {
        src: "images/gallery/simo-showing.webp",
        alt: "Instructor demonstrating kitesurfing techniques in Dakhla, Morocco",
      },
    ],
  },
  faqSection: {
    eyebrow: "FAQs",
    heading: 'Frequently Asked <span class="orange-dot">Questions</span>',
  },
};
