import { handleAuthError, notFound, ok, serverError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);

    if (!isDatabaseConfigured()) {
      return ok({ id: params.id, status: 'PENDING', source: 'mock' });
    }

    const document = await db.document.findFirst({
      where: { id: params.id, employee: { agencyId: session.agencyId } }
    });
    if (!document) return notFound('Document not found');
    return ok(document);
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

    if (!isDatabaseConfigured()) {
      return ok({ id: params.id, deleted: true, source: 'mock' });
    }

    const existing = await db.document.findFirst({
      where: { id: params.id, employee: { agencyId: session.agencyId } }
    });
    if (!existing) return notFound('Document not found');

    await db.document.delete({ where: { id: params.id } });
    return ok({ id: params.id, deleted: true });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}
