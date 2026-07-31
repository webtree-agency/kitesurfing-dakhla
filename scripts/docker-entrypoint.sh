#!/bin/sh
set -e

# Kitesurfing Dakhla Container-Entrypoint.
#
# 1. Payload-Migrate (idempotent) — synchronisiert DB-Schema mit dem Code-Stand.
#    Bei DB-Ausfall kein Hard-Fail: Server startet trotzdem (alle Seiten rendern
#    aus den statischen Fallbacks in src/lib/content/), nur /admin gäbe dann 500.
#
# 2. Next-Server starten (CMD-Argument).

if [ -n "$DATABASE_URI" ] && [ -d /app/node_modules ]; then
  echo "[entrypoint] running payload migrations…"

  # Echte bin.js suchen (pnpm-.bin-Shim ist ein Shell-Wrapper, den Node nicht
  # direkt parsen kann — daher die JS-Datei direkt aufrufen).
  PAYLOAD_BIN=$(find /app/node_modules -maxdepth 5 -path '*/payload/bin.js' -type f 2>/dev/null | head -1)

  if [ -n "$PAYLOAD_BIN" ]; then
    node "$PAYLOAD_BIN" migrate \
      || echo "[entrypoint] migrate exited non-zero — continuing, /admin will be unavailable but site stays up."
  else
    echo "[entrypoint] payload binary not found — skipping migrate."
  fi
else
  echo "[entrypoint] DATABASE_URI not set or deps missing, skipping migrate."
fi

echo "[entrypoint] starting Next.js standalone server: $*"
exec "$@"
