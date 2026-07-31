/**
 * Legt einen Payload-User mit Rolle `editor` an (für Kunden-Onboarding).
 *
 * Aufruf (lokal):  EDITOR_EMAIL=… EDITOR_PASSWORD=… pnpm create-editor
 * Aufruf (Prod):   docker exec <app> env EDITOR_EMAIL=… EDITOR_PASSWORD=… \
 *                    node_modules/.bin/tsx scripts/create-editor.ts
 *
 * Idempotent: existiert die E-Mail bereits, passiert nichts.
 */
import { getPayload } from 'payload';
import config from '../src/payload.config';

async function main() {
  const email = process.env.EDITOR_EMAIL;
  const password = process.env.EDITOR_PASSWORD;
  const name = process.env.EDITOR_NAME ?? 'Editor';

  if (!email || !password) {
    console.error('[create-editor] EDITOR_EMAIL + EDITOR_PASSWORD env-vars erforderlich.');
    process.exit(1);
  }

  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  });
  if (existing.docs.length > 0) {
    console.log(`[create-editor] User ${email} existiert bereits — skip.`);
    process.exit(0);
  }

  await payload.create({
    collection: 'users',
    data: { email, password, name, role: 'editor' } as never,
  });
  console.log(`[create-editor] Editor-User "${email}" (${name}) angelegt.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('[create-editor] fatal:', err);
  process.exit(1);
});
