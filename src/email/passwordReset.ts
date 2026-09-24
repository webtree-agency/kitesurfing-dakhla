import type { PayloadRequest } from 'payload';

/**
 * **Die Passwort-Mail des CMS — bei jedem Kunden gleich** (Webtree-Standard seit
 * 24.09.2026, Vorlage im `webtree-payload-starter`, `src/email/passwordReset.ts`).
 * Neutral statt im Kundendesign: Sie geht nur an Leute, die im CMS arbeiten.
 * Tabellen und Inline-Styles, weil E-Mail-Programme `<style>`-Blöcke wegwerfen;
 * Farben als Werte, weil sie keine CSS-Variablen kennen.
 */
export const RESET_GUELTIG_MINUTEN = 60;

const FARBE = {
  accent: '#18181b',
  onAccent: '#ffffff',
  heading: '#18181b',
  text: '#3f3f46',
  muted: '#71717a',
  page: '#f4f4f5',
  card: '#ffffff',
  border: '#e4e4e7',
};
const SCHRIFT = "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;";

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const buildPasswordResetEmail = ({
  company,
  name,
  url,
}: {
  company: string;
  name?: null | string;
  url: string;
}): { html: string; subject: string } => {
  const f = SCHRIFT;
  const firma = escapeHtml(company);
  const link = escapeHtml(url);
  const anrede = name?.trim() ? `Hallo ${escapeHtml(name.trim())}` : 'Hallo';
  const absatz = (text: string) =>
    `<p style="${f}font-size:15px;line-height:1.6;color:${FARBE.text};margin:16px 0 0;">${text}</p>`;

  const html = `<!doctype html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:${FARBE.page};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${FARBE.page}" style="background:${FARBE.page};">
<tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${FARBE.card}" style="max-width:560px;background:${FARBE.card};border:1px solid ${FARBE.border};border-top:3px solid ${FARBE.accent};border-radius:6px;">
<tr><td style="padding:28px 32px 24px;border-bottom:1px solid ${FARBE.border};"><span style="${f}font-size:15px;font-weight:700;color:${FARBE.heading};">${firma}</span></td></tr>
<tr><td style="padding:28px 32px 0;">
<h1 style="${f}font-size:22px;line-height:1.3;font-weight:700;color:${FARBE.heading};margin:0;">Passwort zurücksetzen</h1>
${absatz(anrede)}
${absatz(`Für dein Konto im CMS von ${firma} wurde ein neues Passwort angefordert. Über die Schaltfläche legst du es fest. Der Link gilt ${RESET_GUELTIG_MINUTEN} Minuten.`)}
</td></tr>
<tr><td style="padding:28px 32px 0;"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="${FARBE.accent}" style="background:${FARBE.accent};border-radius:6px;"><a href="${link}" style="display:inline-block;padding:12px 22px;${f}font-size:15px;font-weight:600;color:${FARBE.onAccent};text-decoration:none;border-radius:6px;">Neues Passwort festlegen</a></td></tr></table></td></tr>
<tr><td style="padding:24px 32px 0;${f}font-size:13px;line-height:1.6;color:${FARBE.muted};">Funktioniert die Schaltfläche nicht, kopiere diese Adresse in den Browser:<br><a href="${link}" style="color:${FARBE.text};word-break:break-all;">${link}</a></td></tr>
<tr><td style="padding:28px 32px 32px;"><div style="border-top:1px solid ${FARBE.border};padding-top:20px;${f}font-size:13px;line-height:1.6;color:${FARBE.muted};">Du hast nichts angefordert? Dann ignoriere diese Mail — dein Passwort bleibt, wie es ist.</div></td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  return { html, subject: `Passwort zurücksetzen – ${company}` };
};

/**
 * Für `auth.forgotPassword` der Benutzer. Das Projekt sagt nur, woher der
 * Firmenname kommt (in der Regel aus den Website-Einstellungen).
 *
 * Mit eigener Vorlage baut Payload den Link nicht mehr selbst; er entsteht wie
 * dort aus der `serverURL` der Konfiguration
 * (`payload/dist/auth/operations/forgotPassword.js`, `getRequestOrigin`).
 */
export const passwordResetEmail = ({
  companyName,
}: {
  companyName: (req?: PayloadRequest) => Promise<null | string | undefined>;
}) => ({
  expiration: RESET_GUELTIG_MINUTEN * 60 * 1000,
  generateEmailHTML: async ({
    req,
    token,
    user,
  }: { req?: PayloadRequest; token?: string; user?: { name?: null | string } } = {}) => {
    const serverURL = (req?.payload.config.serverURL ?? '').replace(/\/$/, '');
    const url = `${serverURL}${req?.payload.config.routes.admin ?? '/admin'}/reset/${token}`;
    return buildPasswordResetEmail({ company: await firma(companyName, req), name: user?.name, url }).html;
  },
  generateEmailSubject: async ({ req }: { req?: PayloadRequest } = {}) =>
    buildPasswordResetEmail({ company: await firma(companyName, req), url: '' }).subject,
});

/**
 * Der Firmenname des Projekts, sonst der Absendername des Mail-Adapters. Die
 * Mail darf am Namen nicht scheitern, sonst kommt niemand mehr ins CMS.
 */
const firma = async (
  companyName: (req?: PayloadRequest) => Promise<null | string | undefined>,
  req?: PayloadRequest,
): Promise<string> => {
  try {
    const name = (await companyName(req))?.trim();
    if (name) return name;
  } catch {
    // weiter mit dem Absendernamen
  }
  return req?.payload.email?.defaultFromName?.trim() || 'CMS';
};
