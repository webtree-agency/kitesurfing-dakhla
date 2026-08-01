import { SETTINGS_CONTENT } from '@/lib/content/settings';

// JSON-LD für lokale Suche und KI-Antworten. Rein im <head>/<body> —
// unsichtbar, ändert die Darstellung der Seite nicht.
const DATA = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  name: 'Kitesurfing Dakhla',
  url: 'https://kitesurfingdakhla.com',
  image: 'https://kitesurfingdakhla.com/images/logo/google-image.png',
  description:
    'Kitesurfing school in Dakhla, Morocco. Semi-private and private lessons, equipment rental, downwind trips and all-inclusive packages.',
  telephone: SETTINGS_CONTENT.phoneDisplay,
  email: SETTINGS_CONTENT.email,
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dakhla',
    addressCountry: 'MA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.7221111,
    longitude: -15.9347384,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: [SETTINGS_CONTENT.instagramUrl, SETTINGS_CONTENT.facebookUrl],
  sport: 'Kitesurfing',
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(DATA) }}
    />
  );
}
