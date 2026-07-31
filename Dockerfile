# syntax=docker/dockerfile:1.7

# ─── Stage 1: deps ────────────────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm-store \
    pnpm config set store-dir /pnpm-store && \
    pnpm install --frozen-lockfile --prod=false


# ─── Stage 2: builder ─────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# payload-types.ts ist gitignored und wird im Build erzeugt.
# importMap.js dagegen ist eingecheckt und darf hier NICHT regeneriert
# werden: zur Build-Zeit fehlen die S3-Env-Vars (hasS3 = false), wodurch
# der s3Storage-Plugin nicht lädt und der S3ClientUploadHandler-Eintrag
# aus der Map fliegt → Runtime crasht beim Admin-Render (blank screen).
RUN pnpm payload generate:types

# ─── Security-Gate ────────────────────────────────────────────────
# Blockt verwundbare Next.js-Versionen (Server-Actions-RCE < 15.4.11) BEIM BUILD.
# Failt der Build, schlaegt der Dokploy-Deploy fehl und die alte, funktionierende
# Version bleibt live (0 Downtime).
RUN node -e "let v;try{v=require('next/package.json').version}catch(e){console.log('security-gate: kein next, skip');process.exit(0)}var p=v.split('.').map(Number);if(p[0]<=14||(p[0]===15&&(p[1]<4||(p[1]===4&&p[2]<11)))){console.error('SECURITY-GATE: next '+v+' verwundbar (<15.4.11 Server-Actions-RCE). Build blockiert. Auf >=15.4.11 bumpen.');process.exit(1)}console.log('security-gate ok: next '+v)"

RUN pnpm run build

# Hinweis: KEIN prune/prod-reinstall nach dem Build. Next.js standalone-Output
# erzeugt Symlinks von .next/standalone/node_modules/* in die originale
# /app/node_modules-Struktur (pnpm content-hashed Pfade). Ein
# `pnpm install --prod` würde diese Hashes neu rechnen, wodurch die
# Standalone-Symlinks ins Leere zeigen und das Runtime crasht.


# ─── Stage 3: runner ──────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
# Next-Standalone bindet sonst u. U. nur auf localhost — Traefik käme nicht rein.
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache curl tini
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Standalone-Output (Next-Server + bundled deps)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Migrate-Support: Payload-CLI braucht Source + full deps, damit `payload migrate`
# beim Boot das DB-Schema synchron hält. Full node_modules ÜBERSCHREIBT das
# standalone-Subset — die pnpm content-hashed Symlinks bleiben gültig
# (gleicher Dependency-Tree, nur Superset).
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/package.json /app/pnpm-lock.yaml /app/tsconfig.json /app/next.config.ts ./
RUN rm -rf /app/node_modules
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# scripts/ ins Runner-Image kopieren — Maintenance-Skripte (seed, ensure-admin).
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts

# Boot-Skript: erst Migration (idempotent), dann Next-Server starten.
COPY --chown=nextjs:nodejs scripts/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER nextjs
EXPOSE 3000

# 127.0.0.1 statt localhost: musl-Resolver auf Alpine liefert sonst ::1 zuerst,
# Next-Standalone bindet aber IPv4 → curl läuft in den Timeout.
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3000/api/health || exit 1

ENTRYPOINT ["/sbin/tini", "--", "/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "server.js"]
