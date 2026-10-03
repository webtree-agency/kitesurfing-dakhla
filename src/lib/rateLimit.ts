/**
 * **Rate Limit im Prozess.** Die Seite läuft als genau ein Container; ein
 * Zähler im Speicher sieht damit alle Anfragen. Nach einem Neustart beginnt er
 * bei null — hinnehmbar, ein Angreifer kann den Container nicht neu starten.
 * Mit mehreren Instanzen müsste der Zähler in die Datenbank oder an den Proxy.
 */

/**
 * Die IP, von der die Anfrage wirklich kam. **Der letzte Eintrag in
 * `X-Forwarded-For`, nicht der erste:** den ersten kann jeder selbst
 * mitschicken und so bei jedem Versuch eine neue „IP“ vorgeben. Den letzten
 * hängt Traefik an, er ist die Adresse, die sich mit dem Server verbunden hat.
 *
 * Hinter dem Cloudflare-Proxy wäre das die Adresse von Cloudflare. Nur dann
 * gilt `CF-Connecting-IP`, und nur wenn `TRUST_CLOUDFLARE_IP=true` gesetzt ist —
 * sonst könnte jeder den Header fälschen.
 */
export const clientIp = (
  headers: Headers | undefined,
  source: Record<string, string | undefined> = process.env,
): string | undefined => {
  if (!headers) return undefined;

  if (source.TRUST_CLOUDFLARE_IP === 'true') {
    const cf = headers.get('cf-connecting-ip')?.trim();
    if (cf) return cf;
  }

  const forwarded = headers
    .get('x-forwarded-for')
    ?.split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  return forwarded?.at(-1) || headers.get('x-real-ip')?.trim() || undefined;
};

export type RateLimiter = {
  /** Zählt den Versuch und sagt, ob er noch erlaubt ist. */
  hit: (key: string, now?: number) => boolean;
  reset: () => void;
};

/** Gleitendes Fenster: höchstens `limit` Versuche je Schlüssel in `windowMs`. */
export const createRateLimiter = ({
  limit,
  windowMs,
}: {
  limit: number;
  windowMs: number;
}): RateLimiter => {
  const hits = new Map<string, number[]>();

  return {
    hit: (key, now = Date.now()) => {
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

      if (recent.length >= limit) {
        hits.set(key, recent);
        return false;
      }

      recent.push(now);
      hits.set(key, recent);

      // Abgelaufene Schlüssel wegräumen, damit eine Flut wechselnder IPs den
      // Speicher nicht füllt.
      if (hits.size > 10_000) {
        for (const [k, times] of hits) {
          if (times.every((t) => now - t >= windowMs)) hits.delete(k);
        }
      }

      return true;
    },
    reset: () => hits.clear(),
  };
};
