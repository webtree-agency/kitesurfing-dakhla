// Inhalte der Seite kitesurf-lessons.html.

export interface LessonIconFeature {
  iconClass: string;
  label: string;
}

export interface LessonPriceRow {
  label: string;
  price: string;
  /** z.B. "(Recommended for beginners)"; leer wenn keine Notiz */
  note: string;
  /** true = Zeile mit bg-light-orange */
  highlighted: boolean;
}

export interface LessonVariant {
  /** Label des Filter-/Tab-Buttons */
  tabLabel: string;
  title: string;
  description: string[];
  iconFeatures: LessonIconFeature[];
  priceRows: LessonPriceRow[];
  /** enthält HTML */
  alertText: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
}

export interface LessonsContent {
  hero: {
    eyebrow: string;
    /** enthält HTML */
    heading: string;
  };
  semiPrivate: LessonVariant;
  private: LessonVariant;
  contactInfo: {
    heading: string;
    /** Zeilen des Absatzes; im Original durch <br> getrennt */
    textLines: string[];
    buttonLabel: string;
    buttonHref: string;
  };
}

export const KITESURF_LESSONS_CONTENT: LessonsContent = {
  hero: {
    eyebrow: "Services",
    heading: 'Kitesurf <span class="orange-dot">Lessons</span>',
  },
  semiPrivate: {
    tabLabel: "Semi Private Lessons",
    title: "Semi-Private Kitesurfing Lessons",
    description: [
      "Progress quickly and safely with certified instructors at scenic, uncrowded kite spots in Dakhla.",
    ],
    iconFeatures: [
      { iconClass: "fas fa-users", label: "2 People / 1 Instructor" },
      { iconClass: "fas fa-check-circle", label: "Certified Instructors" },
      { iconClass: "fas fa-water", label: "Top Kite Locations" },
      { iconClass: "fas fa-check-circle", label: "Results Promised" },
    ],
    priceRows: [
      { label: "2 Hours", price: "100€", note: "", highlighted: false },
      { label: "4 Hours", price: "180€", note: "", highlighted: false },
      { label: "6 Hours", price: "270€", note: "", highlighted: false },
      { label: "8 Hours", price: "360€", note: "", highlighted: false },
      { label: "10 Hours", price: "440€", note: "", highlighted: false },
      {
        label: "12 Hours",
        price: "520€",
        note: "(Recommended for beginners)",
        highlighted: true,
      },
      { label: "Additional Hour", price: "40€", note: "", highlighted: false },
    ],
    // enthält HTML
    alertText:
      "<strong>Beginner? </strong>We recommend the <b>12-hour package</b> for a comprehensive 3-day learning experience (weather permitting).",
    ctaButtonLabel: "Book now",
    ctaButtonHref: "./book",
  },
  private: {
    tabLabel: "Private Lessons",
    title: "Private Kitesurfing Lessons",
    description: [
      "Enjoy one-on-one instruction with certified instructors, filmed lessons, and exclusive attention to boost your skills.",
    ],
    iconFeatures: [
      { iconClass: "fas fa-user", label: "1 Person / 1 Instructor" },
      { iconClass: "fas fa-video", label: "Filmed Lessons" },
      { iconClass: "fas fa-water", label: "Top Kite Locations" },
      { iconClass: "fas fa-check-circle", label: "Results Promised" },
    ],
    priceRows: [
      { label: "2 Hours", price: "140€", note: "", highlighted: false },
      { label: "4 Hours", price: "255€", note: "", highlighted: false },
      { label: "6 Hours", price: "380€", note: "", highlighted: false },
      { label: "8 Hours", price: "505€", note: "", highlighted: false },
      { label: "10 Hours", price: "625€", note: "", highlighted: false },
      {
        label: "12 Hours",
        price: "745€",
        note: "(Recommended for beginners)",
        highlighted: true,
      },
      { label: "Additional Hour", price: "60€", note: "", highlighted: false },
    ],
    // enthält HTML
    alertText:
      "<strong>Beginner? </strong>We recommend the <b>12-hour package</b> for a comprehensive 3-day learning experience (weather permitting).",
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
