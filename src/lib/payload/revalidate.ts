import { revalidatePath } from 'next/cache';
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload';

/**
 * Revalidiert die gesamte Site (alle Routen unter dem Root-Layout).
 *
 * WARUM: Der Production-Build erreicht die DB NICHT (kein DATABASE_URI-Build-
 * ARG) → alle Seiten werden zur Build-Zeit aus dem Static-Fallback generiert.
 * Ohne Revalidation würden CMS-Edits NIE auf der Live-Site erscheinen. Mit
 * diesem Hook wird der statische Cache nach jeder Änderung invalidiert → der
 * nächste Request re-rendert serverseitig (Runtime hat DB-Zugriff).
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
