import jwt from 'jsonwebtoken';

export type SessionPayload = {
  userId: string;
  agencyId: string;
  role: 'SUPER_ADMIN' | 'AGENCY_ADMIN' | 'AGENT' | 'VIEWER';
};

const TOKEN_TTL = '15m';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be set and at least 32 characters long.');
  }
  return secret;
}

export function signSessionToken(payload: SessionPayload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: TOKEN_TTL });
}

export function verifySessionToken(token: string) {
  return jwt.verify(token, getJwtSecret()) as SessionPayload;
}
