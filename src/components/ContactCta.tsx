import React from 'react';

export interface ContactCtaProps {
  heading: string;
  /** Absatz-Zeilen; im Original durch <br> getrennt */
  textLines: string[];
  buttonLabel: string;
  /** Bereits normalisierter Href (z.B. "/book") */
  buttonHref: string;
}

// #contact-info-CTA — Struktur identisch auf Startseite und Service-Seiten,
// nur die Texte unterscheiden sich (kommen aus dem jeweiligen Content-Modul).
export function ContactCta({ heading, textLines, buttonLabel, buttonHref }: ContactCtaProps) {
  return (
    <section id="contact-info" className="padding-small bg-gray">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <div>
            <h3 className="display-5 fw-bold mb-3">{heading}</h3>
            <p>
              {textLines.map((line, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <br />}
                  {line}{' '}
                </React.Fragment>
              ))}
            </p>
          </div>
          <a className="button-48" role="button" href={buttonHref}>
            <span className="text">{buttonLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
