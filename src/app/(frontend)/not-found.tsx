import { NotFoundContent } from '@/components/NotFoundContent';

// 404 für notFound()-Aufrufe aus Frontend-Routen. Unbekannte URLs landen
// dagegen auf src/app/not-found.tsx (statisch prerendert, inkl. eigenem
// <html>-Gerüst) — hier liefert das Frontend-Layout das Gerüst.
export default function NotFound() {
  return <NotFoundContent />;
}
