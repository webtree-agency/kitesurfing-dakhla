// Aktualisiert die Payload-Live-Vorschau (iframe) beim Speichern.
// WICHTIG: Nur im iframe (Vorschau-Kontext) aktiv — für normale Besucher wird
// nichts gerendert. Sonst wirft RefreshRouteOnSave bei leerem serverURL
// (NEXT_PUBLIC_SERVER_URL im Client-Bundle leer) einen postMessage-Fehler und
// crasht jede Seite.
'use client';

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function LivePreviewListener() {
  const router = useRouter();
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.self !== window.top) {
      setOrigin(window.location.origin);
    }
  }, []);

  if (!origin) return null;
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={origin} />;
}
