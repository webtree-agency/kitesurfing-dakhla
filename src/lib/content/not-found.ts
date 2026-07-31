// Inhalte der Seite 404.html.

export interface NotFoundContent {
  eyebrow: string;
  /** enthält HTML */
  heading: string;
  paragraph: string;
  buttonLabel: string;
  buttonHref: string;
  /** Text ueber dem WhatsApp-Icon */
  contactViaText: string;
  whatsappUrl: string;
}

export const NOT_FOUND_CONTENT: NotFoundContent = {
  eyebrow: "404",
  heading: 'Oops page not <span class="orange-dot">found</span>',
  paragraph:
    "Sorry, the page you're looking for doesn't exist or has been moved.",
  buttonLabel: "Back to Home",
  buttonHref: "/",
  contactViaText: "Need help? Contact us via",
  whatsappUrl: "https://wa.me/212628283870",
};
