import { NextResponse, type NextRequest } from 'next/server';

/**
 * Erst-Registrierung des CMS dichtmachen.
 *
 * Solange in der Datenbank kein Konto existiert, liefert Payload unter
 * `/admin/create-first-user` ein offenes Registrierungsformular aus und nimmt
 * unter `POST /api/<collection>/first-register` beliebige Konten entgegen —
 * wer die URL in diesem Fenster aufruft, wird Administrator. Das Fenster
 * oeffnet sich bei jedem frischen Deploy, jeder Wiederherstellung und jeder
 * geleerten Datenbank.
 *
 * Zum einmaligen Einrichten `ALLOW_ADMIN_SETUP=true` setzen, Konto anlegen,
 * Variable wieder entfernen und neu deployen.
 */
function isAdminSetupRoute(path: string): boolean {
  return path === '/admin/create-first-user' || /^\/api\/[^/]+\/first-register$/.test(path);
}

export function middleware(request: NextRequest) {
  if (isAdminSetupRoute(request.nextUrl.pathname) && process.env.ALLOW_ADMIN_SETUP !== 'true') {
    // 404 statt 403: verraet nicht einmal, dass es die Route gibt.
    return new NextResponse('Not Found', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex' },
    });
  }

  return NextResponse.next();
}

export const config = {
  // Bewusst eng: nur die beiden Registrierungs-Routen. Die Middleware soll
  // nicht bei jeder Seitenanfrage mitlaufen.
  matcher: ['/admin/create-first-user', '/api/:collection/first-register'],
};
