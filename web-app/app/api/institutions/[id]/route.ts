import { handleAuthError, notFound, ok, serverError, validationError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';
import { writeAuditLog } from '@/lib/audit/log';
import { z } from 'zod';

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  type: z.string().optional(),
  contact: z.string().optional(),
  country: z.string().optional(),
  active: z.boolean().optional()
});

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);
    if (!isDatabaseConfigured()) return ok({ id: params.id, source: 'mock' });
    const inst = await db.institution.findFirst({ where: { id: params.id, agencyId: session.agencyId } });
    if (!inst) return notFound('Institution not found');
    return ok(inst);
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN']);
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) return validationError('Invalid update', parsed.error.flatten());
    if (!isDatabaseConfigured()) return ok({ id: params.id, ...parsed.data, source: 'mock' });
    const existing = await db.institution.findFirst({ where: { id: params.id, agencyId: session.agencyId } });
    if (!existing) return notFound('Institution not found');
    const updated = await db.institution.update({ where: { id: params.id }, data: parsed.data });
    await writeAuditLog({ agencyId: session.agencyId, actorId: session.userId, action: 'update', resource: 'institution', resourceId: updated.id });
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
    const existing = await db.institution.findFirst({ where: { id: params.id, agencyId: session.agencyId } });
    if (!existing) return notFound('Institution not found');
    await db.institution.update({ where: { id: params.id }, data: { active: false } });
    await writeAuditLog({ agencyId: session.agencyId, actorId: session.userId, action: 'deactivate', resource: 'institution', resourceId: params.id });
    return ok({ id: params.id, deactivated: true });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}
