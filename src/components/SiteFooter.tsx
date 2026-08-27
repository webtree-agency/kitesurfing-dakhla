import type { SettingsContent } from '@/lib/content/settings';

/** Lange Google-Maps-URL aus dem Footer (in allen Originalen identisch). */
const MAPS_URL_LONG =
  'https://www.google.com/maps/place/Ad-Dakhla+73000/@23.7054794,-16.0235144,13z/data=!3m1!4b1!4m10!1m2!2m1!1sdakhla+morocco!3m6!1s0xc2248393aa06243:0x2572dbf2ee5f0172!8m2!3d23.7221111!4d-15.9347384!15sCg5kYWtobGEgbW9yb2Njb5IBCGxvY2FsaXR54AEA!16zL20vMDIzXzN2?entry=ttu&g_ep=EgoyMDI0MDkxMS4wIKXMDSoASAFQAw%3D%3D';

export interface SiteFooterProps {
  settings: SettingsContent;
  /**
   * Einziger Unterschied im Original: die Quick-Links zeigen auf der Startseite
   * auf In-Page-Anker ("#about-us"), auf Unterseiten auf "index.html#about-us" ("/#about-us").
   */
  variant: 'index' | 'sub';
}

export function SiteFooter({ settings, variant }: SiteFooterProps) {
  const anchorPrefix = variant === 'index' ? '' : '/';

  return (
    <section id="footer" className="footer-background">
      <div className="container footer-container mt-3 pt-3">
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-4 my-5 py-5">
          <div className="col-md-6 col-lg-3 mb-3 mb-lg-0 d-flex align-items-center">
            <img
              src="/images/logo/logo.svg"
              alt="Kitesurfing Dakhla Logo"
              className="footer-logo img-fluid"
            />
          </div>
          <div className="col-md-6 col-lg-3 mb-3 mb-lg-0">
            <h5 className="py-3">Our Address</h5>
            <ul className="nav flex-column">
              <li className="location text-capitalize d-flex align-items-center">
                <i className="fa-solid fa-location-dot text-primary me-1"></i>
                <a href={MAPS_URL_LONG} target="_blank">
                  {settings.address}
                </a>
              </li>
              <li className="phone text-capitalize d-flex align-items-center">
                <i className="fa-solid fa-phone text-primary me-1"></i>
                <a href={settings.telHref}>{settings.phoneDisplay}</a>
              </li>
              <li className="time d-flex align-items-center">
                <i className="fa-solid fa-envelope text-primary me-1"></i>
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 mb-3 mb-lg-0">
            <h5 className="py-3">Quick Links</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a href={`${anchorPrefix}#about-us`} className="text-uppercase p-0">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href={`${anchorPrefix}#services`} className="text-uppercase p-0">
                  Our Services
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="text-uppercase p-0">
                  Book
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 mb-3 mb-lg-0">
            <h5 className="py-3">Our Location</h5>
            <div className="map-container">
              <iframe
                src={settings.mapsEmbedSrc}
                height="150"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map of Ad-Dakhla, showing location details"
              ></iframe>
            </div>
          </div>
        </footer>
      </div>
      <hr className="text-black" />
      <div className="container">
        <footer className="row align-items-center py-2">
          <div className="col-md-6 d-flex flex-column flex-md-row align-items-start justify-content-center justify-content-md-between">
            <div className="mb-2 mb-md-0 text-start">
              <a href="/privacy-policy" className="text-decoration-underline me-2">
                Privacy Policy
              </a>
              <a href="/imprint" className="text-decoration-underline">
                Imprint
              </a>
            </div>
            {/* #current-year bleibt leer — wird von js/script.js befuellt */}
            <p className="mb-0 text-start text-md-center">
              <span id="current-year"></span> @ Kitesurfing Dakhla
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="">
              Website by{' '}
              <a
                href="https://www.webtree.ch/"
                className="text-decoration-underline"
                target="_blank"
              >
                Webtree
              </a>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
