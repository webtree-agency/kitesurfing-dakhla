const SETUP_PATH = /^\/(admin\/create-first-user|api\/[^/]+\/first-register)$/;

/**
 * Erkennt die Registrierungs-Routen von Payload auch in kodierter Form.
 * Payload dekodiert den Pfad, ein exakter Vergleich liesse `first%2Dregister`
 * durch. Darum: dekodieren (bis zu dreimal, gegen doppelte Kodierung), klein
 * schreiben, doppelte und abschliessende Schraegstriche weg. Was sich nicht
 * dekodieren laesst, gilt als Registrierungs-Route und wird gesperrt.
 */
export function isAdminSetupRoute(pathname: string): boolean {
  let path = pathname;
  for (let i = 0; i < 3; i++) {
    let decoded: string;
    try {
      decoded = decodeURIComponent(path);
    } catch {
      return true;
    }
    if (decoded === path) break;
    path = decoded;
  }
  const normalized = path
    .toLowerCase()
    .replace(/\/{2,}/g, '/')
    .replace(/\/+$/, '');
  return SETUP_PATH.test(normalized);
}
