/**
 * Server-only Payload-Client. Wird in Server Components für CMS-Lesezugriffe
 * genutzt.
 *
 * CMS-First-with-Static-Fallback: Frontend liest erst aus Payload, fällt bei
 * leerer DB oder DB-Fehler auf die statischen Konstanten in lib/content/*
 * zurück (siehe lib/content/*-cms.ts).
 */
import 'server-only';
import { getPayload } from 'payload';
import config from '@payload-config';
import type { Payload } from 'payload';

let cached: Payload | null = null;

export async function getPayloadClient(): Promise<Payload> {
  if (cached) return cached;
  cached = await getPayload({ config });
  return cached;
}
