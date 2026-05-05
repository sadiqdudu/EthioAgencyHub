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
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const verified = searchParams.get('verified');

    if (!isDatabaseConfigured()) {
      return ok({
        documents: [],
        summary: { total: 0, verified: 0, pending: 0, rejected: 0 },
        byType: {},
        pagination: { page, limit, total: 0, totalPages: 0, hasNext: false, hasPrev: false }
      });
    }

    const where: any = { employee: { agencyId: session.agencyId } };
    if (type) where.type = type;
    if (status) where.status = status;

    const [documents, total, verifiedCount, pendingCount, rejectedCount, byType] = await Promise.all([
      db.document.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { employee: { select: { id: true, name: true, role: true } } }
      }),
      db.document.count({ where }),
      db.document.count({ where: { ...where, status: 'VERIFIED' } }),
      db.document.count({ where: { ...where, status: 'PENDING' } }),
      db.document.count({ where: { ...where, status: 'REJECTED' } }),
      db.document.groupBy({ by: ['type'], where, _count: true })
    ]);

    return ok({
      documents: documents.map(doc => ({
        id: doc.id,
        type: doc.type,
        status: doc.status,
        employeeId: doc.employeeId,
        employeeName: doc.employee.name,
        expiresAt: doc.expiresAt,
        createdAt: doc.createdAt
      })),
      summary: {
        total,
        verified: verifiedCount,
        pending: pendingCount,
        rejected: rejectedCount
      },
      byType: Object.fromEntries(byType.map(g => [g.type, g._count])),
      pagination: buildPaginatedResponse(documents, total, page, limit).pagination
    });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}