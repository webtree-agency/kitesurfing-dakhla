import type { Metadata } from 'next';

import { NotFoundContent } from '@/components/NotFoundContent';
import { SiteShell } from '@/components/SiteShell';

// Metadaten 1:1 aus 404.html (keine description im Original).
export const metadata: Metadata = {
  title: 'Kitesurfing Dakhla | 404 Error | Kitesurfingdakhla.com',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Kitesurfing Dakhla | 404 Error | Kitesurfingdakhla.com',
    url: 'https://kitesurfingdakhla.com/404',
    type: 'website',
  },
};

/**
 * Root-404 für URLs, die auf keine Route passen (ersetzt 404.html).
 *
 * Liegt bewusst auf Root-Ebene statt in (frontend): Next prerendert diese Datei
 * beim Build statisch (/_not-found) und liefert sie server-seitig aus. Ein
 * Catch-All mit notFound() rendert die Seite dagegen erst im Client — der
 * ausgelieferte Body wäre leer, ohne JavaScript bliebe die Seite weiss. Das
 * Original war statisches HTML, also muss auch hier alles im SSR-Markup stehen.
 *
 * Da beide Route-Groups eigene Root-Layouts haben, gibt es kein übergeordnetes
 * Layout — das <html>-Gerüst kommt deshalb direkt aus SiteShell.
 */
export default function RootNotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}
