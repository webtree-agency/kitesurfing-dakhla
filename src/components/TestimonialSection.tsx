import React from 'react';

import type { TestimonialItem } from '@/lib/content/testimonials';

export interface TestimonialSectionProps {
  eyebrow: string;
  /** enthält HTML (orange-dot-Span) */
  heading: string;
  testimonials: TestimonialItem[];
  /**
   * Zusatzinhalt (Galerie-Grid + Mobile-Carousel), der im Original innerhalb
   * desselben .container nach dem Swiper steht (die Original-Container-Div ist
   * unbalanciert und wird vom Browser erst am </section> geschlossen).
   */
  children?: React.ReactNode;
}

export function TestimonialSection({
  eyebrow,
  heading,
  testimonials,
  children,
}: TestimonialSectionProps) {
  return (
    <section id="testimonial" className="padding-small">
      <div className="container">
        <div className="container text-center">
          <h6 className="text-primary">{eyebrow}</h6>
          <h3 className="display-5 fw-bold" dangerouslySetInnerHTML={{ __html: heading }} />
        </div>
        <div className="row mb-3">
          <div className="col-md-1 offset-md-1 ">
            <div className="me-3">
              <i
                className="fa-solid fa-quote-left text-primary me-1"
                style={{ fontSize: '60px' }}
              ></i>
            </div>
          </div>
          <div className="col-md-9">
            <div className="swiper testimonial-swiper mt-3">
              <div className="swiper-wrapper">
                {testimonials.map((testimonial, index) => (
                  <div className="swiper-slide" key={index}>
                    <div className="review">
                      <div className="review-content">
                        <p className="fs-3 fst-italic fw-light lh-base">{testimonial.text}</p>
                        <h6 className="fw-bold">
                          {testimonial.name}{' '}
                          <span className="fw-normal">
                            |{' '}
                            <span className="text-warning">
                              {Array.from({ length: testimonial.rating }, (_, starIndex) => (
                                <React.Fragment key={starIndex}>
                                  <i className="fas fa-star"></i>{' '}
                                </React.Fragment>
                              ))}
                            </span>
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="swiper-pagination testimonial-pagination text-start position-relative mt-4"></div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
