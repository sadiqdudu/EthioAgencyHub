import { handleAuthError, ok, serverError, created, notFound, validationError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';

export async function GET() {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);

    if (!isDatabaseConfigured()) {
      return ok([], { source: 'mock' });
    }

    const cvs = await db.generatedCv.findMany({
      where: { employee: { agencyId: session.agencyId } },
      include: { employee: true },
      orderBy: { createdAt: 'desc' },
      take: 100
    });

    return ok(cvs, { total: cvs.length });
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
    const { employeeId, template, language, pdfData, htmlContent } = body;

    if (!employeeId || !template || !language) {
      return validationError('Missing required fields');
    }

    if (!isDatabaseConfigured()) {
      return created({ id: 'mock-' + Date.now(), employeeId, template, language, status: 'generated', source: 'mock' });
    }

    const employee = await db.employee.findFirst({ where: { id: employeeId, agencyId: session.agencyId } });
    if (!employee) return notFound('Employee not found');

    const cv = await db.generatedCv.create({
      data: {
        employeeId,
        template,
        language,
        pdfData: pdfData ? Buffer.from(pdfData, 'base64') : null,
        htmlContent,
        generatedBy: session.userId,
        status: 'generated'
      }
    });

    return created(cv);
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}