import { handleAuthError, notFound, ok, serverError, validationError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';
import { writeAuditLog } from '@/lib/audit/log';
import { z } from 'zod';

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  passportNo: z.string().optional(),
  groupName: z.string().optional(),
  season: z.string().optional(),
  requirements: z.record(z.unknown()).optional(),
  status: z.string().optional(),
  departureDate: z.coerce.date().optional()
});

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);
    if (!isDatabaseConfigured()) return ok({ id: params.id, source: 'mock' });
    const pilgrim = await db.pilgrim.findFirst({ where: { id: params.id, agencyId: session.agencyId } });
    if (!pilgrim) return notFound('Pilgrim not found');
    return ok(pilgrim);
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) return validationError('Invalid update', parsed.error.flatten());
    if (!isDatabaseConfigured()) return ok({ id: params.id, ...parsed.data, source: 'mock' });
    const existing = await db.pilgrim.findFirst({ where: { id: params.id, agencyId: session.agencyId } });
    if (!existing) return notFound('Pilgrim not found');
    const updated = await db.pilgrim.update({ where: { id: params.id }, data: parsed.data as any });
    await writeAuditLog({ agencyId: session.agencyId, actorId: session.userId, action: 'update', resource: 'pilgrim', resourceId: updated.id });
    return ok(updated);
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN']);
    if (!isDatabaseConfigured()) return ok({ id: params.id, deleted: true, source: 'mock' });
    const existing = await db.pilgrim.findFirst({ where: { id: params.id, agencyId: session.agencyId } });
    if (!existing) return notFound('Pilgrim not found');
    await db.pilgrim.delete({ where: { id: params.id } });
    await writeAuditLog({ agencyId: session.agencyId, actorId: session.userId, action: 'delete', resource: 'pilgrim', resourceId: params.id });
    return ok({ id: params.id, deleted: true });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}
