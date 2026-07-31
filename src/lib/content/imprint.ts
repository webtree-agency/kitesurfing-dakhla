// Inhalte der Seite imprint.html.
// Hinweis: imprint.html nutzt "tel:+212628283870" (ohne Leerzeichen/U+2011),
// der Footer dagegen "tel:+212 628‑283870".

export interface ImprintContent {
  eyebrow: string;
  /** enthält HTML */
  heading: string;
  intro: string;
  companyLabel: string;
  companyName: string;
  addressLabel: string;
  address: string;
  phoneLabel: string;
  phoneDisplay: string;
  telHref: string;
  emailLabel: string;
  email: string;
  /** Rechtlicher Hinweis-Absatz */
  legalReference: string;
  responsibleNameLabel: string;
  responsibleName: string;
  responsibleAddressLabel: string;
  responsibleAddress: string;
  followUsHeading: string;
  instagramUrl: string;
  facebookUrl: string;
}

export const IMPRINT_CONTENT: ImprintContent = {
  eyebrow: "Legal",
  heading: '<span class="orange-dot">Imprint</span>',
  intro: "This website is operated by:",
  companyLabel: "Company Name:",
  companyName: "Kitesurfing Dakhla",
  addressLabel: "Address:",
  address: "Dakhla, Morocco",
  phoneLabel: "Phone:",
  phoneDisplay: "+212 628‑283870",
  telHref: "tel:+212628283870",
  emailLabel: "Email:",
  email: "kitesurfingdakhla@gmail.com",
  legalReference: "Responsible for content according to § 55 Abs. 2 RStV:",
  responsibleNameLabel: "Name:",
  responsibleName: "Lahcen Ouazzan",
  responsibleAddressLabel: "Address:",
  responsibleAddress: "Dakhla, Morocco",
  followUsHeading: "Follow Us",
  instagramUrl:
    "https://www.instagram.com/kitesurfing_dakhla?igsh=djJvMThvZTlpczZ1&utm_source=qr",
  facebookUrl: "https://www.facebook.com/kitesurfingdakhla",
};
