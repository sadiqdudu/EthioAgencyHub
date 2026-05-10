import { handleAuthError, ok, serverError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured } from '@/lib/db/errors';

export async function GET(req: Request) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.toLowerCase() || '';

    if (!query.trim()) {
      return ok([]);
    }

    if (!isDatabaseConfigured()) {
      return ok([]);
    }

    const employees = await db.employee.findMany({
      where: {
        agencyId: session.agencyId,
        OR: [
          { firstName: { contains: query } },
          { lastName: { contains: query } },
          { passportNumber: { contains: query } },
          { contactPhone: { contains: query } },
          { email: { contains: query } },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        passportNumber: true,
        contactPhone: true,
        email: true,
        status: true,
        createdAt: true,
      },
      take: 20,
      orderBy: { createdAt: 'desc' },
    });

    return ok(employees);
  } catch (error) {
    const authResponse = handleAuthError(error);
    if (authResponse) return authResponse;
    console.error('Employee search error:', error);
    return serverError('Search failed');
  }
}