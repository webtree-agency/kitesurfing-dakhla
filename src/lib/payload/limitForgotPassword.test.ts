import type { PayloadRequest } from 'payload';
import { afterEach, describe, expect, it } from 'vitest';

import { clientIp, createRateLimiter } from '@/lib/rateLimit';

import {
  FORGOT_PASSWORD_RATE_LIMIT,
  forgotPasswordLimiter,
  limitForgotPassword,
  TOO_MANY_REQUESTS,
} from './limitForgotPassword';

/**
 * Formularschutz für „Passwort vergessen“. Sicherheitsfunktion, also mit
 * negativen Tests — vor allem, dass eine selbst mitgeschickte IP das Limit
 * nicht aushebelt.
 */
const headers = (init: Record<string, string>) => new Headers(init);

describe('clientIp nimmt die Adresse, die Traefik anhängt', () => {
  it('nimmt den letzten Eintrag von X-Forwarded-For, nicht den ersten', () => {
    // Den ersten Eintrag schreibt, wer die Anfrage schickt — frei erfunden.
    expect(clientIp(headers({ 'x-forwarded-for': '1.2.3.4, 203.0.113.9' }), {})).toBe(
      '203.0.113.9',
    );
  });

  it('kommt ohne X-Forwarded-For mit X-Real-IP aus und ohne beides mit nichts', () => {
    expect(clientIp(headers({ 'x-real-ip': '203.0.113.9' }), {})).toBe('203.0.113.9');
    expect(clientIp(headers({}), {})).toBeUndefined();
    expect(clientIp(undefined, {})).toBeUndefined();
  });

  it('glaubt CF-Connecting-IP nur mit TRUST_CLOUDFLARE_IP=true', () => {
    const h = headers({ 'cf-connecting-ip': '198.51.100.7', 'x-forwarded-for': '172.70.1.1' });

    expect(clientIp(h, {})).toBe('172.70.1.1');
    expect(clientIp(h, { TRUST_CLOUDFLARE_IP: 'true' })).toBe('198.51.100.7');
  });
});

describe('Rate Limit', () => {
  it('lässt das Limit durch und sperrt den nächsten Versuch, bis das Fenster vorbei ist', () => {
    const limiter = createRateLimiter({ limit: 3, windowMs: 1000 });

    expect([0, 1, 2].map((t) => limiter.hit('a', t))).toEqual([true, true, true]);
    expect(limiter.hit('a', 500)).toBe(false);
    // Eine andere IP ist davon nicht betroffen.
    expect(limiter.hit('b', 500)).toBe(true);
    expect(limiter.hit('a', 1001)).toBe(true);
  });
});

describe('limitForgotPassword', () => {
  afterEach(() => forgotPasswordLimiter.reset());

  const vergessen = (forwardedFor: string, operation = 'forgotPassword') =>
    limitForgotPassword({
      args: {},
      operation,
      req: {
        headers: headers({ 'x-forwarded-for': forwardedFor }),
        payload: { logger: { warn: () => {} } },
      } as unknown as PayloadRequest,
    } as Parameters<typeof limitForgotPassword>[0]);

  it(`lässt ${FORGOT_PASSWORD_RATE_LIMIT.limit} Versuche je IP durch und weist den nächsten mit 429 ab`, () => {
    for (let i = 0; i < FORGOT_PASSWORD_RATE_LIMIT.limit; i++) {
      expect(() => vergessen('203.0.113.40')).not.toThrow();
    }

    expect(() => vergessen('203.0.113.40')).toThrow(
      expect.objectContaining({ message: TOO_MANY_REQUESTS, status: 429 }),
    );
    expect(() => vergessen('203.0.113.41')).not.toThrow();
  });

  it('lässt sich nicht mit erfundenen Adressen vorne in X-Forwarded-For umgehen', () => {
    for (let i = 0; i < FORGOT_PASSWORD_RATE_LIMIT.limit; i++) {
      vergessen(`10.0.0.${i}, 203.0.113.50`);
    }

    expect(() => vergessen('10.9.9.9, 203.0.113.50')).toThrow(
      expect.objectContaining({ status: 429 }),
    );
  });

  it('zählt Anmeldungen und andere Operationen nicht mit', () => {
    for (let i = 0; i < FORGOT_PASSWORD_RATE_LIMIT.limit + 3; i++) {
      expect(() => vergessen('203.0.113.60', 'login')).not.toThrow();
    }
  });
});
