import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const SESSION_COOKIE_NAME = 'ethio_agency_session';

export const sessionCookieOptions: Partial<ResponseCookie> = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 15
};
