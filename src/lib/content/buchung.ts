// Inhalte der Buchungsseite (book.html) inkl. success.html.
// Hinweis: Die <label>-Elemente im Original sind leer, daher nur Placeholder.

export interface BuchungSelectOption {
  value: string;
  label: string;
}

export interface BuchungContent {
  hero: {
    eyebrow: string;
    /** enthält HTML */
    heading: string;
  };
  form: {
    action: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    telephonePlaceholder: string;
    /** Text der disabled/hidden Platzhalter-Option des Selects */
    servicePlaceholder: string;
    serviceOptions: BuchungSelectOption[];
    messagePlaceholder: string;
    submitLabel: string;
  };
  /** Text ueber dem WhatsApp-Icon */
  contactViaText: string;
  whatsappUrl: string;
  success: {
    eyebrow: string;
    /** enthält HTML */
    heading: string;
    buttonLabel: string;
    buttonHref: string;
  };
}

export const BUCHUNG_CONTENT: BuchungContent = {
  hero: {
    eyebrow: "BOOK",
    heading: 'We are happy to see you <span class="orange-dot">soon!</span>',
  },
  form: {
    action: "https://usebasin.com/f/f80dc0ab53ae",
    namePlaceholder: "My name is",
    emailPlaceholder: "My e-mail is",
    telephonePlaceholder: "My number is",
    servicePlaceholder: "Choose a service:",
    serviceOptions: [
      {
        value: "7 Day All-inclusive Kitesurf Adventure",
        label: "7 Day All-inclusive Kitesurf Adventure",
      },
      {
        value: "Kitesurfing Lesson Private",
        label: "Kitesurfing Lesson Private",
      },
      {
        value: "Kitesurfing Lesson Semi-Private",
        label: "Kitesurfing Lesson Semi-Private",
      },
      { value: "Surfing Lesson Private", label: "Surfing Lesson Private" },
      {
        value: "Surfing Lesson Semi-Private",
        label: "Surfing Lesson Semi-Private",
      },
      { value: "Kitesurfing Trips", label: "Kitesurfing Trips" },
      { value: "Kitesurfing Rental", label: "Kitesurfing Rental" },
    ],
    messagePlaceholder: "I'd like to chat about",
    submitLabel: "Send Message",
  },
  contactViaText: "OR CONTACT US VIA",
  whatsappUrl: "https://wa.me/212628283870",
  success: {
    eyebrow: "Thank you!",
    heading: 'We\'ll get back to you <span class="orange-dot">soon!</span>',
    buttonLabel: "Back to Home",
    buttonHref: "./index.html",
  },
};
