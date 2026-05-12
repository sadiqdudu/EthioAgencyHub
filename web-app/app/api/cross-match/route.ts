import { created, handleAuthError, ok, serverError, validationError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';

export async function GET() {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);
    if (!isDatabaseConfigured()) return ok([], { source: 'mock' });

    const data = await db.crossMatchResult.findMany({
      where: { employee: { agencyId: session.agencyId } },
      include: { employee: { select: { id: true, name: true, firstName: true, lastName: true, passportNumber: true } } },
      orderBy: { checkedAt: 'desc' },
      take: 100
    });
    return ok(data, { total: data.length });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}

export async function POST(req: Request) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN']);
    const body = await req.json();
    const { employeeId, results } = body;
    if (!employeeId || !results) return validationError('Missing required fields');

    if (!isDatabaseConfigured()) return created({
      id: 'mock-' + Date.now(), employeeId, allPass: results.allPass || false,
      errors: results.errors?.join('; ') || '', source: 'mock'
    });

    const data = await db.crossMatchResult.create({
      data: {
        employeeId,
        allPass: results.allPass || false,
        nameMatch: results.nameMatch !== false,
        passportMatch: results.passportMatch !== false,
        visaCountryMatch: results.visaCountryMatch !== false,
        passportExpiryOk: results.passportExpiryOk !== false,
        visaExpiryOk: results.visaExpiryOk !== false,
        errors: results.errors?.join('; ') || null,
      }
    });
    return created(data);
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}
