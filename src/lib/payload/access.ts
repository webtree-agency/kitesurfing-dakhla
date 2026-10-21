import type { Access } from 'payload';

/** Nur Admin-Rolle (Webtree). */
export const adminOnly: Access = ({ req }) => req.user?.role === 'admin';

/** Jeder eingeloggte User (Admin oder Editor). */
export const authenticated: Access = ({ req }) => Boolean(req.user);

/** Public read – für Globals/Collections die im Frontend gebraucht werden. */
export const publicRead: Access = () => true;

/**
 * Admin alles, sonst nur das eigene Konto. Ohne Benutzer nichts: Die
 * Massenänderung (`PATCH /api/users?where=…`) ruft die Regel ohne `id` auf,
 * ein Vergleich `user?.id === id` wäre dort für Anonyme `true`.
 */
export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return { id: { equals: user.id } };
};
