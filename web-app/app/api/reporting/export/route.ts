import { handleAuthError, ok, serverError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';

export async function GET(req: Request) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN']);
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'employees';
    const format = searchParams.get('format') || 'csv';

    if (!isDatabaseConfigured()) {
      return ok({ data: [], message: 'Database not configured' });
    }

    let data: any[] = [];
    let headers: string[] = [];

    switch (type) {
      case 'employees':
        const employees = await db.employee.findMany({
          where: { agencyId: session.agencyId },
          orderBy: { createdAt: 'desc' },
          include: { documents: true, travels: true }
        });
        headers = ['ID', 'Name', 'Role', 'Destination', 'Status', 'Documents', 'Travels', 'Created At'];
        data = employees.map(e => [e.id, e.name, e.role || '', e.destination || '', e.status, e.documents.length, e.travels.length, e.createdAt.toISOString()]);
        break;

      case 'documents':
        const documents = await db.document.findMany({
          where: { employee: { agencyId: session.agencyId } },
          orderBy: { createdAt: 'desc' },
          include: { employee: { select: { name: true } } }
        });
        headers = ['ID', 'Employee', 'Type', 'Status', 'Expires At', 'Created At'];
        data = documents.map(d => [d.id, d.employee.name, d.type, d.status, d.expiresAt?.toISOString() || '', d.createdAt.toISOString()]);
        break;

      case 'travels':
        const travels = await db.travel.findMany({
          where: { employee: { agencyId: session.agencyId } },
          orderBy: { departureAt: 'desc' },
          include: { employee: { select: { name: true } } }
        });
        headers = ['ID', 'Employee', 'Destination', 'Departure', 'Status', 'Ticket'];
        data = travels.map(t => [t.id, t.employee.name, t.destination, t.departureAt.toISOString(), t.status, t.ticket || '']);
        break;

      case 'pilgrims':
        const pilgrims = await db.pilgrim.findMany({
          where: { agencyId: session.agencyId },
          orderBy: { createdAt: 'desc' }
        });
        headers = ['ID', 'Name', 'Passport', 'Group', 'Season', 'Status'];
        data = pilgrims.map(p => [p.id, p.name, p.passportNo || '', p.groupName || '', p.season || '', p.status]);
        break;

      default:
        return serverError('Invalid export type');
    }

    if (format === 'csv') {
      const csv = [headers.join(','), ...data.map(row => row.map((cell: string | number) => `"${String(cell).replace(/"/g, '""')}"`).join(','))].join('\n');
      return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${type}-export-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    }

    return ok({ data, headers, count: data.length });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}