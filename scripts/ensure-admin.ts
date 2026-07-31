/**
 * Legt einen Payload-User mit Rolle `admin` an (Webtree-Zugang).
 *
 * Aufruf (lokal):  ADMIN_EMAIL=… ADMIN_PASSWORD=… pnpm ensure-admin
 * Aufruf (Prod):   docker exec <app> env ADMIN_EMAIL=… ADMIN_PASSWORD=… \
 *                    node_modules/.bin/tsx scripts/ensure-admin.ts
 *
 * Idempotent: existiert die E-Mail bereits, passiert nichts.
 */
import { getPayload } from 'payload';
import config from '../src/payload.config';

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? 'Webtree Admin';

  if (!email || !password) {
    console.error('[ensure-admin] ADMIN_EMAIL + ADMIN_PASSWORD env-vars erforderlich.');
    process.exit(1);
  }

  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  });
  if (existing.docs.length > 0) {
    console.log(`[ensure-admin] User ${email} existiert bereits — skip.`);
    process.exit(0);
  }

  await payload.create({
    collection: 'users',
    data: { email, password, name, role: 'admin' } as never,
  });
  console.log(`[ensure-admin] Admin-User "${email}" (${name}) angelegt.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('[ensure-admin] fatal:', err);
  process.exit(1);
});
