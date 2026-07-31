// Inhalte der Seite privacy-policy.html.
// Der Kontaktblock (Company/Address/Phone/Email) folgt direkt auf die
// "Contact Us"-Sektion und wird separat gefuehrt.

export interface PrivacyPolicySection {
  heading: string;
  paragraphs: string[];
}

export interface PrivacyPolicyContent {
  eyebrow: string;
  /** enthält HTML – Achtung: Leerzeichen vor </span> ist im Original vorhanden */
  heading: string;
  intro: string;
  sections: PrivacyPolicySection[];
  contact: {
    companyLabel: string;
    companyName: string;
    addressLabel: string;
    address: string;
    phoneLabel: string;
    phoneDisplay: string;
    telHref: string;
    emailLabel: string;
    email: string;
  };
}

export const PRIVACY_POLICY_CONTENT: PrivacyPolicyContent = {
  eyebrow: "Privacy",
  heading: 'Privacy <span class="orange-dot">Policy </span>',
  intro:
    "This Privacy Policy explains how we collect, use, and protect your personal information.",
  sections: [
    {
      heading: "Information We Collect",
      paragraphs: [
        "We collect information that you provide to us directly, such as when you create an account, make a purchase, or contact us for support. This information may include your name, email address, phone number, and payment information.",
      ],
    },
    {
      heading: "How We Use Your Information",
      paragraphs: [
        "We use your information to provide and improve our services, process transactions, communicate with you, and for other customer service purposes.",
      ],
    },
    {
      heading: "Sharing Your Information",
      paragraphs: [
        "We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights.",
      ],
    },
    {
      heading: "Your Choices",
      paragraphs: [
        "You can update your account information and preferences at any time by logging into your account or contacting us directly.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.",
      ],
    },
    {
      heading: "Changes to This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website.",
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: [
        "If you have any questions about this Privacy Policy, please contact us at:",
      ],
    },
  ],
  contact: {
    companyLabel: "Company Name:",
    companyName: "Kitesurfing Dakhla",
    addressLabel: "Address:",
    address: "Dakhla, Morocco",
    phoneLabel: "Phone:",
    phoneDisplay: "+212 628‑283870",
    telHref: "tel:+212628283870",
    emailLabel: "Email:",
    email: "kitesurfingdakhla@gmail.com",
  },
};
