/* eslint-disable @next/next/no-html-link-for-pages --
 * Bewusst normale <a>-Tags statt next/link: jede Navigation muss ein Full-Page-
 * Load sein, damit js/script.js (Preloader, Swiper, Offcanvas) neu initialisiert. */
import React from 'react';

import type { SettingsContent } from '@/lib/content/settings';

/** Lange Google-Maps-URL aus der Header-Top-Leiste (in allen Originalen identisch). */
const MAPS_URL_LONG =
  'https://www.google.com/maps/place/Ad-Dakhla+73000/@23.7054794,-16.0235144,13z/data=!3m1!4b1!4m10!1m2!2m1!1sdakhla+morocco!3m6!1s0xc2248393aa06243:0x2572dbf2ee5f0172!8m2!3d23.7221111!4d-15.9347384!15sCg5kYWtobGEgbW9yb2Njb5IBCGxvY2FsaXR54AEA!16zL20vMDIzXzN2?entry=ttu&g_ep=EgoyMDI0MDkxMS4wIKXMDSoASAFQAw%3D%3D';

/** Kurze Google-Maps-URL aus dem Offcanvas-Kontaktblock. */
const MAPS_URL_SHORT =
  'https://www.google.com/maps/place/Ad-Dakhla+73000/@23.7054794,-16.0235144,13z/data=!3m1!4b1!4m10!1m2!2m1!1sdakhla+morocco!3m6!1s0xc2248393aa06243:0x2572dbf2ee5f0172!8m2!3d23.7221111!4d-15.9347384';

export interface SiteHeaderProps {
  settings: SettingsContent;
  /**
   * 'video' = Startseite (Hero-Video im Header), 'image' und 'plain' = Unterseiten.
   * Hinweis: Die Service-Seiten ("image") nutzen im Original exakt dasselbe
   * Header-Markup wie die Plain-Seiten — der Bild-Hero liegt ausserhalb des Headers.
   */
  variant: 'video' | 'image' | 'plain';
  /**
   * Aktiver Navigationspunkt, exakt wie in den Originalen markiert:
   * - 'home':      Home-Link aktiv + aria-current (index.html); Anker in-page ("#services")
   * - 'services':  Services-Link aktiv + aria-current (Service-Seiten; Home-Link mit
   *                doppeltem Leerzeichen "nav-link  p-0" wie im Original)
   * - 'book':      Book-Button aktiv, href="#", aria-current (book/imprint/privacy/404)
   * - 'book-link': Book-Button aktiv, href="/book", ohne aria-current (success)
   */
  active?: 'home' | 'services' | 'book' | 'book-link';
  /** aria-label des Navbar-Togglers (Originale variieren pro Seite). Default: "Toggle navigation" */
  togglerAriaLabel?: string;
  /** aria-hidden="true" auf dem Burger-Icon (index.html, success.html). Default: false */
  togglerIconAriaHidden?: boolean;
  /** aria-label des Offcanvas-Close-Buttons. Default: "Close navigation menu" (index: "Close navigation") */
  closeAriaLabel?: string;
  /** Wird direkt nach </header> gerendert (Hero-Section der Startseite). */
  heroContent?: React.ReactNode;
}

export function SiteHeader({
  settings,
  variant,
  active,
  togglerAriaLabel = 'Toggle navigation',
  togglerIconAriaHidden = false,
  closeAriaLabel = 'Close navigation menu',
  heroContent,
}: SiteHeaderProps) {
  // Auf der Startseite sind About/Services In-Page-Anker, sonst Anker auf "/".
  const anchorPrefix = active === 'home' ? '' : '/';

  return (
    <>
      <header id="header">
        {variant === 'video' && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1,
            }}
          >
            <source data-src="/videos/trailer-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <nav className="header-top bg-dark py-1">
          <div className="container">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              <ul className="info d-flex flex-wrap list-unstyled m-0">
                <li className="location text-white text-capitalize d-flex align-items-center me-4">
                  <i className="fa-solid fa-location-dot text-primary me-1"></i>
                  <a href={MAPS_URL_LONG} target="_blank">
                    {settings.address}
                  </a>
                </li>
                <li className="phone text-white text-capitalize d-flex align-items-center me-4">
                  <i className="fa-solid fa-phone text-primary me-1"></i>
                  <a href={settings.telHref}>{settings.phoneDisplay}</a>
                </li>
                <li className="time text-white text-capitalize d-flex align-items-center me-4">
                  <i className="fa-solid fa-clock text-primary me-1"></i>
                  Mo-Fr: 9:00-18:00
                </li>
              </ul>
              <ul className="social-links d-flex flex-wrap list-unstyled m-0">
                <li className="social">
                  <a href={settings.facebookUrl} target="_blank">
                    <i className="fa-brands fa-facebook-f me-1"></i>
                  </a>
                </li>
                <li className="social ms-2">
                  <a href={settings.instagramUrl} target="_blank">
                    <i className="fa-brands fa-instagram me-1"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <nav id="primary-header" className="navbar navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img
                src="/images/logo/logo.svg"
                className="logo img-fluid"
                alt="Kitesurfing Dakhla Logo"
              />
            </a>
            <button
              className="navbar-toggler border-0 d-flex d-lg-none order-3 p-2 shadow-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#bdNavbar"
              aria-controls="bdNavbar"
              aria-expanded="false"
              aria-label={togglerAriaLabel}
            >
              <i
                className="fa-solid fa-bars navbar-icon"
                style={{ fontSize: '36px' }}
                aria-hidden={togglerIconAriaHidden ? 'true' : undefined}
              ></i>
            </button>
            <div
              className="header-bottom offcanvas offcanvas-end"
              id="bdNavbar"
              aria-labelledby="bdNavbarOffcanvasLabel"
            >
              <div className="offcanvas-header px-4 pb-0">
                <button
                  type="button"
                  className="btn-close btn-close-black mt-2"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#bdNavbar"
                  aria-label={closeAriaLabel}
                ></button>
              </div>
              <div className="offcanvas-body align-items-center justify-content-end">
                <ul className="navbar-nav align-items-center mb-2 mb-lg-0">
                  <li className="nav-item px-3">
                    {active === 'home' ? (
                      <a className="nav-link active p-0" aria-current="page" href="/">
                        Home
                      </a>
                    ) : active === 'services' ? (
                      // Doppeltes Leerzeichen wie im Original der Service-Seiten
                      <a className="nav-link  p-0" href="/">
                        Home
                      </a>
                    ) : (
                      <a className="nav-link p-0" href="/">
                        Home
                      </a>
                    )}
                  </li>
                  <li className="nav-item px-3">
                    <a className="nav-link p-0" href={`${anchorPrefix}#about-us`}>
                      About
                    </a>
                  </li>
                  <li className="nav-item px-3">
                    {active === 'services' ? (
                      <a className="nav-link active p-0" aria-current="page" href="/#services">
                        Services
                      </a>
                    ) : (
                      <a className="nav-link p-0" href={`${anchorPrefix}#services`}>
                        Services
                      </a>
                    )}
                  </li>
                  <li className="nav-item mt-4 mt-lg-0">
                    {active === 'book' ? (
                      <a
                        className="button-48-transparent active"
                        role="button"
                        href="#"
                        aria-current="page"
                      >
                        <span className="text">Book</span>
                      </a>
                    ) : active === 'book-link' ? (
                      <a className="button-48-transparent active" role="button" href="/book">
                        <span className="text">Book</span>
                      </a>
                    ) : (
                      <a className="button-48-transparent" role="button" href="/book">
                        <span className="text">Book</span>
                      </a>
                    )}
                  </li>
                </ul>
                <div className="contact-social p-4 d-lg-flex flex-column align-items-end position-fixed">
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-envelope text-primary me-2"></i>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-decoration-none text-body"
                      >
                        {settings.email}
                      </a>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-phone text-primary me-2"></i>
                      <a href="tel:+212628283870" className="text-decoration-none text-body">
                        {settings.phoneDisplay}
                      </a>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="fas fa-location-dot text-primary me-2"></i>
                      <a
                        href={MAPS_URL_SHORT}
                        target="_blank"
                        className="text-decoration-none text-body"
                      >
                        {settings.address}
                      </a>
                    </div>
                  </div>
                  <div className="social-media">
                    <a href={settings.instagramUrl} className="text-primary me-3" target="_blank">
                      <i className="fab fa-instagram fa-lg"></i>
                    </a>
                    <a href={settings.facebookUrl} className="text-primary me-3" target="_blank">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {heroContent}
    </>
  );
}
