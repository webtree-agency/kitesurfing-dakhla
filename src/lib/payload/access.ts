import type { Access } from 'payload';

/** Nur Admin-Rolle (Webtree). */
export const adminOnly: Access = ({ req }) => req.user?.role === 'admin';

/** Jeder eingeloggte User (Admin oder Editor). */
export const authenticated: Access = ({ req }) => Boolean(req.user);

/** Public read – für Globals/Collections die im Frontend gebraucht werden. */
export const publicRead: Access = () => true;
