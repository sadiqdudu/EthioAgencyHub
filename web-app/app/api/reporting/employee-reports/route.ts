import { handleAuthError, ok, serverError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { getPaginationParams, buildPaginatedResponse } from '@/lib/db/pagination';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';

export async function GET(req: Request) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN']);
    const { searchParams } = new URL(req.url);
    const { page, limit } = getPaginationParams({ page: Number(searchParams.get('page')), limit: Number(searchParams.get('limit')) });
    const status = searchParams.get('status');
    const destination = searchParams.get('destination');
    const dateFrom = searchParams.get('from');
    const dateTo = searchParams.get('to');

    if (!isDatabaseConfigured()) {
      return ok({
        employees: [],
        pagination: { page, limit, total: 0, totalPages: 0, hasNext: false, hasPrev: false }
      });
    }

    const where: any = { agencyId: session.agencyId };
    if (status) where.status = status;
    if (destination) where.destination = { contains: destination };
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt.gte = new Date(dateFrom);
      if (dateTo) where.createdAt.lte = new Date(dateTo);
    }

    const [employees, total] = await Promise.all([
      db.employee.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { documents: true, travels: true }
      }),
      db.employee.count({ where })
    ]);

    const enriched = employees.map(emp => ({
      id: emp.id,
      name: emp.name,
      role: emp.role,
      destination: emp.destination,
      status: emp.status,
      documentsCount: emp.documents.length,
      travelsCount: emp.travels.length,
      createdAt: emp.createdAt
    }));

    return ok(buildPaginatedResponse(enriched, total, page, limit));
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}