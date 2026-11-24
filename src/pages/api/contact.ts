import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

// Cette route tourne côté serveur (les autres pages sont statiques).
export const prerender = false;

const env = (key: string) => process.env[key] ?? '';

const transporter = nodemailer.createTransport({
  host: env('SMTP_HOST'),
  port: Number(env('SMTP_PORT') || 587),
  secure: env('SMTP_SECURE') === 'true', // true pour le port 465
  auth: env('SMTP_USER') ? { user: env('SMTP_USER'), pass: env('SMTP_PASS') } : undefined,
});

// Limitation simple : 5 envois par IP toutes les 10 minutes
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const clean = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || clientAddress || 'unknown';
  if (rateLimited(ip)) return json({ error: 'Trop de demandes, réessayez dans quelques minutes.' }, 429);

  let data: Record<string, unknown>;
  try {
    const type = request.headers.get('content-type') ?? '';
    data = type.includes('application/json')
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return json({ error: 'Requête invalide.' }, 400);
  }

  // Champ piège rempli = robot : on fait semblant que tout va bien
  if (clean(data.website, 200)) return json({ ok: true });

  const name = clean(data.name, 120);
  const company = clean(data.company, 160);
  const email = clean(data.email, 200);
  const need = clean(data.need, 80);
  const message = clean(data.message, 5000);
  const source = clean(data.source, 120);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Merci de remplir votre nom, un email valide et votre message.' }, 400);
  }

  const to = env('CONTACT_TO');
  if (!env('SMTP_HOST') || !to) {
    console.error('[contact] SMTP_HOST ou CONTACT_TO manquant dans les variables d’environnement');
    return json({ error: "Le formulaire n'est pas encore configuré." }, 500);
  }

  const text = `Nom : ${name}\nEntreprise : ${company || '—'}\nEmail : ${email}\nBesoin : ${need}${source ? `\nProvenance : ${source}` : ''}\n\n${message}`;
  try {
    await transporter.sendMail({
      from: env('SMTP_FROM') || env('SMTP_USER'),
      to,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `${source ? '[Proposition] ' : '[Site] '}${need || 'Nouvelle demande'} — ${company || name}`,
      text,
      html: `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
    });
    return json({ ok: true });
  } catch (err) {
    console.error('[contact] échec SMTP', err);
    return json({ error: "L'envoi a échoué." }, 502);
  }
};
