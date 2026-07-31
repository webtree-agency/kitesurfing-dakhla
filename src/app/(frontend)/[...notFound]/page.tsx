import { notFound } from 'next/navigation';

/**
 * Catch-All für unbekannte URLs: ohne Root-Layout (beide Route-Groups haben
 * eigene <html>-Layouts) greift Nexts globales not-found nicht — dieser
 * Catch-All leitet unmatched Routen auf (frontend)/not-found.tsx um, damit
 * die 404-Seite im Frontend-Layout (mit CSS/Scripts) rendert. Echte Routen
 * (/admin, /api, definierte Seiten) haben Vorrang vor dem Catch-All.
 */
export default function CatchAllNotFound(): never {
  notFound();
}
