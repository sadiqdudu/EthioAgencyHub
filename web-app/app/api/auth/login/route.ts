import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth.schema';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';
import { verifyPassword } from '@/lib/auth/password';
import { signSessionToken } from '@/lib/auth/jwt';
import { SESSION_COOKIE_NAME, sessionCookieOptions } from '@/lib/auth/cookies';
import { serverError, unauthorized, validationError } from '@/lib/api/responses';

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return validationError('Invalid login payload', parsed.error.flatten());
  }

  if (!isDatabaseConfigured()) {
    return unauthorized('Database is not configured for authentication.');
  }

  try {
    const user = await db.user.findUnique({ where: { email: parsed.data.email } });

    if (!user) {
      return unauthorized('Invalid email or password.');
    }

    const passwordOk = await verifyPassword(parsed.data.password, user.passwordHash);

    if (!passwordOk) {
      return unauthorized('Invalid email or password.');
    }

    const token = signSessionToken({ userId: user.id, agencyId: user.agencyId, role: user.role });
    const response = NextResponse.json({
      success: true,
      data: { user: { id: user.id, email: user.email, agencyId: user.agencyId, role: user.role } }
    });
    response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions);
    return response;
  } catch (error) {
    if (isDatabaseConnectionError(error)) {
      return unauthorized('Authentication database is unavailable.');
    }
    return serverError();
  }
}
