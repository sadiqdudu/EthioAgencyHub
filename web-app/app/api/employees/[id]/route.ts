import { employees } from '@/lib/mock-data';
import { employeeCreateSchema } from '@/lib/validations/employee.schema';
import { handleAuthError, notFound, ok, serverError, validationError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);

    if (!isDatabaseConfigured()) {
      const mock = employees.find((e) => e.id === params.id);
      if (!mock) return notFound('Employee not found');
      return ok(mock, { source: 'mock' });
    }

    const employee = await db.employee.findFirst({
      where: { id: params.id, agencyId: session.agencyId }
    });
    if (!employee) return notFound('Employee not found');
    return ok(employee);
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
    const parsed = employeeCreateSchema.partial().safeParse(body);
    if (!parsed.success) return validationError('Invalid update payload', parsed.error.flatten());

    if (!isDatabaseConfigured()) {
      return ok({ id: params.id, ...parsed.data, source: 'mock' });
    }

    const existing = await db.employee.findFirst({ where: { id: params.id, agencyId: session.agencyId } });
    if (!existing) return notFound('Employee not found');

    const { personal, skills, documents, ...rest } = parsed.data;
    
    const data: any = {
      ...rest,
      ...personal,
      ...skills,
    };

    if (personal?.firstName && personal?.lastName) {
      data.name = `${personal.firstName} ${personal.lastName}`.trim();
    } else if (personal?.firstName || personal?.lastName) {
      // If only one is provided, we might need to fetch the other or just update what we have
      // For simplicity, we'll just update the individual fields
    }

    if (skills?.languages) {
      data.languages = JSON.stringify(skills.languages);
    }
    
    if (documents?.docPath) data.docPath = documents.docPath;
    if (documents?.tgVideoId) {
      data.tgVideoId = documents.tgVideoId;
      data.status = 'INTERVIEW_UPLOADED';
    }

    if (personal?.dateOfBirth) data.dateOfBirth = new Date(personal.dateOfBirth);
    if (personal?.passportExpiryDate) data.passportExpiryDate = new Date(personal.passportExpiryDate);

    const updated = await db.employee.update({ where: { id: params.id }, data });
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

    if (!isDatabaseConfigured()) {
      return ok({ id: params.id, deleted: true, source: 'mock' });
    }

    const existing = await db.employee.findFirst({ where: { id: params.id, agencyId: session.agencyId } });
    if (!existing) return notFound('Employee not found');

    const updated = await db.employee.update({ where: { id: params.id }, data: { status: 'ARCHIVED' } });
    return ok({ id: updated.id, archived: true });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}
