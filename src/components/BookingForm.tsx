'use client';

import React from 'react';

import type { BuchungContent } from '@/lib/content/buchung';

export interface BookingFormProps {
  form: BuchungContent['form'];
}

/**
 * Buchungsformular aus book.html inkl. des Original-Submit-Verhaltens
 * (XHR-POST an usebasin, bei 200 → /success, sonst Alert) — 1:1 uebernommen.
 */
export function BookingForm({ form }: BookingFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', formEl.action, true);
    xhr.send(formData);

    xhr.onload = function () {
      if (xhr.status === 200) {
        window.location.href = '/success';
        formEl.reset();
      } else {
        // Wie im Original: Response wird geparst, aber nicht verwendet.
        JSON.parse(xhr.response);
        window.alert('Oops, there is a error, try again!');
      }
    };
  };

  return (
    <form
      action={form.action}
      method="POST"
      id="contact_form"
      onSubmit={handleSubmit}
    >
      <div className="name">
        <label htmlFor="name"></label>
        <input
          type="text"
          placeholder={form.namePlaceholder}
          name="name"
          id="name_input"
          required
        />
      </div>
      <div className="email">
        <label htmlFor="email"></label>
        <input
          type="email"
          placeholder={form.emailPlaceholder}
          name="email"
          id="email_input"
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          required
        />
      </div>
      <div className="telephone">
        <label htmlFor="telephone"></label>
        <input
          type="text"
          placeholder={form.telephonePlaceholder}
          name="telephone"
          id="telephone_input"
          required
        />
      </div>
      <div className="subject">
        <label htmlFor="subject"></label>
        <select name="subject" id="subject_input" required defaultValue={form.servicePlaceholder}>
          <option disabled hidden>
            {form.servicePlaceholder}
          </option>
          {form.serviceOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="message">
        <label htmlFor="message"></label>
        <textarea
          name="message"
          placeholder={form.messagePlaceholder}
          id="message_input"
          cols={30}
          rows={5}
          required
        ></textarea>
      </div>
      <div className="submit">
        <input type="submit" value={form.submitLabel} className="button-48 mt-2" />
      </div>
    </form>
  );
}
