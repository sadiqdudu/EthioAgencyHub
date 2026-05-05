import { z } from 'zod';
import { ok, validationError } from '@/lib/api/responses';
import { LANGUAGE_COOKIE_NAME } from '@/lib/i18n/server';
import { supportedLanguages } from '@/config/languages';

const schema = z.object({
  code: z.enum(supportedLanguages.map((l) => l.code) as [string, ...string[]])
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return validationError('Invalid language code', parsed.error.flatten());

  const response = ok({ code: parsed.data.code });
  response.cookies.set(LANGUAGE_COOKIE_NAME, parsed.data.code, {
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365
  });
  return response;
}
