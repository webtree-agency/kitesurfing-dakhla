// Inhalte der Seite kitesurf-rental.html.

export interface RentalPriceRow {
  label: string;
  price: string;
  /** true = Zeile mit bg-light-orange (Extra Day) */
  highlighted?: boolean;
}

export interface RentalTab {
  /** Label des Filter-/Tab-Buttons */
  tabLabel: string;
  title: string;
  priceRows: RentalPriceRow[];
}

export interface RentalIconFeature {
  iconClass: string;
  label: string;
}

export interface RentalContent {
  hero: {
    eyebrow: string;
    /** enthält HTML */
    heading: string;
  };
  fullGear: RentalTab;
  kiteOnly: RentalTab;
  boardOnly: RentalTab;
  insurance: RentalTab;
  howItWorks: {
    heading: string;
    paragraphs: string[];
  };
  iconFeatures: RentalIconFeature[];
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

export const KITESURF_RENTAL_CONTENT: RentalContent = {
  hero: {
    eyebrow: "Services",
    heading: 'Kitesurf <span class="orange-dot">Rental</span>',
  },
  fullGear: {
    tabLabel: "Full Gear",
    title: "Full Gear",
    priceRows: [
      { label: "1 Day", price: "75€" },
      { label: "2 Days", price: "120€" },
      { label: "3 Days", price: "155€" },
      { label: "4 Days", price: "190€" },
      { label: "5 Days", price: "220€" },
      { label: "6 Days", price: "250€" },
      { label: "7 Days", price: "280€" },
      { label: "Extra Day", price: "+30€", highlighted: true },
    ],
  },
  kiteOnly: {
    tabLabel: "Kite Only",
    title: "Kite Only",
    priceRows: [
      { label: "1 Day", price: "53€" },
      { label: "2 Days", price: "84€" },
      { label: "3 Days", price: "109€" },
      { label: "4 Days", price: "133€" },
      { label: "5 Days", price: "154€" },
      { label: "6 Days", price: "175€" },
      { label: "7 Days", price: "196€" },
      { label: "Extra Day", price: "+21€", highlighted: true },
    ],
  },
  boardOnly: {
    tabLabel: "Board Only",
    title: "Board Only",
    priceRows: [
      { label: "1 Day", price: "23€" },
      { label: "2 Days", price: "36€" },
      { label: "3 Days", price: "47€" },
      { label: "4 Days", price: "57€" },
      { label: "5 Days", price: "66€" },
      { label: "6 Days", price: "75€" },
      { label: "7 Days", price: "84€" },
      { label: "Extra Day", price: "+9€", highlighted: true },
    ],
  },
  insurance: {
    tabLabel: "Insurance",
    title: "Insurance",
    priceRows: [
      { label: "1 Day", price: "20€" },
      { label: "2 Days", price: "35€" },
      { label: "3 Days", price: "40€" },
      { label: "4 Days", price: "45€" },
      { label: "5 Days", price: "50€" },
      { label: "6 Days", price: "55€" },
      { label: "7 Days", price: "60€" },
      { label: "Extra Day", price: "+5€", highlighted: true },
    ],
  },
  howItWorks: {
    heading: "How it works",
    paragraphs: [
      "Choose your kite and board depending on the wind. Swap equipment if conditions change, based on availability. Valid Level 3 IKO qualification or proof of competency required.",
    ],
  },
  iconFeatures: [
    { iconClass: "fas fa-exchange-alt", label: "Flexible Equipment" },
    { iconClass: "fas fa-id-card", label: "IKO Level 3" },
    { iconClass: "fas fa-shield-alt", label: "Quality Equipment" },
    { iconClass: "fas fa-cogs", label: "Expert Support" },
  ],
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
