// Globale Kontakt- und Standortdaten, extrahiert aus Footer/Imprint der statischen Seiten.
// Achtung: Telefonnummer enthaelt U+2011 (non-breaking hyphen) – nicht normalisieren!

export interface SettingsContent {
  /** Anzeigetext der Telefonnummer (mit U+2011 non-breaking hyphen) */
  phoneDisplay: string;
  /** tel:-Href wie im Footer (imprint.html nutzt abweichend "tel:+212628283870") */
  telHref: string;
  whatsappUrl: string;
  email: string;
  /** Adresse wie im Footer angezeigt */
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  /** src des Google-Maps-Iframes im Footer */
  mapsEmbedSrc: string;
}

export const SETTINGS_CONTENT: SettingsContent = {
  phoneDisplay: "+212 628‑283870",
  telHref: "tel:+212 628‑283870",
  whatsappUrl: "https://wa.me/212628283870",
  email: "kitesurfingdakhla@gmail.com",
  address: "Dakhla, Morocco",
  instagramUrl:
    "https://www.instagram.com/kitesurfing_dakhla?igsh=djJvMThvZTlpczZ1&utm_source=qr",
  facebookUrl: "https://www.facebook.com/kitesurfingdakhla",
  mapsEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58450.77778633404!2d-15.98677539801059!3d23.705493487153525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc2248393aa06243%3A0x2572dbf2ee5f0172!2sAd-Dakhla%2073000!5e0!3m2!1sde!2sch!4v1726513776347!5m2!1sde!2sch",
};
