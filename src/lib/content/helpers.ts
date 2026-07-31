/**
 * Helpers für die *-cms.ts-Loader (CMS-first mit statischem Fallback).
 */

/** Nicht-leerer String aus dem CMS, sonst Fallback. */
export function nz(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() !== '' ? value : fallback;
}

/** String-Array aus dem CMS (Payload-Array-Field mit einem Textfeld), sonst Fallback. */
export function strArr(
  value: unknown,
  key: string,
  fallback: string[],
): string[] {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const out = value
    .map((row) => (row && typeof row === 'object' ? (row as Record<string, unknown>)[key] : undefined))
    .filter((v): v is string => typeof v === 'string' && v.trim() !== '');
  return out.length > 0 ? out : fallback;
}

type MediaRel = { url?: string | null } | number | string | null | undefined;

/**
 * URL eines Payload-Media-Uploads (depth ≥ 1), sonst statischer Fallback-Pfad.
 * Fallback-Pfade aus lib/content/* sind relativ ("images/…") — für die
 * Auslieferung unter beliebigen Routen mit führendem Slash normalisieren.
 */
export function mediaUrl(rel: MediaRel, fallback: string): string {
  if (rel && typeof rel === 'object' && typeof rel.url === 'string' && rel.url !== '') {
    return rel.url;
  }
  return assetUrl(fallback);
}

/** Statischen Asset-Pfad aus lib/content/* normalisieren ("images/x" → "/images/x"). */
export function assetUrl(src: string): string {
  if (src.startsWith('http') || src.startsWith('/')) return src;
  return `/${src}`;
}
