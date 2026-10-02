import { APIError, type CollectionBeforeOperationHook } from 'payload';

import { clientIp, createRateLimiter } from '@/lib/rateLimit';

/** Wer es fünfmal in einer Viertelstunde braucht, wartet. */
export const FORGOT_PASSWORD_RATE_LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 };

// Admin-Oberfläche ist englisch (der Kunde spricht kein Deutsch).
export const TOO_MANY_REQUESTS =
  'Too many requests in a short time. Please try again in a few minutes.';

export const forgotPasswordLimiter = createRateLimiter(FORGOT_PASSWORD_RATE_LIMIT);

/**
 * „Passwort vergessen“ verschickt eine Mail an eine Adresse, die jeder
 * eintippen kann. Payload sperrt nur Fehlanmeldungen je Konto
 * (`maxLoginAttempts`) und Wiederholungen je Konto (`minRequestInterval`),
 * nicht diesen Weg je Absender. Gezählt wird je IP, nicht je Adresse — sonst
 * verriete die Antwort, welche Adressen ein Konto haben. Ohne IP (Local API,
 * Skripte) gibt es nichts zu zählen.
 */
export const limitForgotPassword: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if (operation !== 'forgotPassword') return args;

  const ip = clientIp(req.headers);

  if (ip && !forgotPasswordLimiter.hit(ip)) {
    req.payload.logger.warn(`Passwort vergessen: Rate Limit für ${ip} erreicht.`);
    throw new APIError(TOO_MANY_REQUESTS, 429);
  }

  return args;
};
