import { revalidatePath } from 'next/cache';
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload';

/**
 * Wirft den Router-Cache der Site weg, damit ein CMS-Edit sofort sichtbar ist.
 * Die Seiten selbst rendern seit dem 11.09.2026 zur Laufzeit
 * (`dynamic = 'force-dynamic'` im Frontend-Layout) — der Build hat keine DB
 * und backte sonst den statischen Fallback ein.
 */
function revalidateSite(): void {
  try {
    revalidatePath('/', 'layout');
  } catch {
    // Ausserhalb eines Request-Kontexts (z. B. Seed-Script) wirft
    // revalidatePath — bewusst ignorieren.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateSite();
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateSite();
  return doc;
};

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc }) => {
  revalidateSite();
  return doc;
};
