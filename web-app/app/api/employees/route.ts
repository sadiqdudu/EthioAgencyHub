import { employees } from '@/lib/mock-data';
import { employeeCreateSchema } from '@/lib/validations/employee.schema';
import { created, ok, serverError, validationError, handleAuthError } from '@/lib/api/responses';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';
import { getSession } from '@/lib/auth/session';

export async function GET(req: Request) {
  if (!isDatabaseConfigured()) {
    return ok(employees, { total: employees.length, source: 'mock' });
  }

  try {
    const session = getSession();
    const { searchParams } = new URL(req.url);
    
    const query = searchParams.get('q') || '';
    const status = searchParams.get('status') || '';
    const destination = searchParams.get('destination') || '';
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '50'));
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (session?.agencyId) {
      where.agencyId = session.agencyId;
    }
    
    if (query) {
      where.OR = [
        { name: { contains: query } },
        { role: { contains: query } },
        { destination: { contains: query } }
      ];
    }
    
    if (status) {
      where.status = status;
    }
    
    if (destination) {
      where.destination = destination;
    }

    const [data, total] = await Promise.all([
      db.employee.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          _count: {
            select: { documents: true, travels: true }
          }
        }
      }),
      db.employee.count({ where })
    ]);

    return ok(data, { total, page, limit, source: 'database' });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) {
      return ok(employees, { total: employees.length, source: 'mock' });
    }
    return serverError();
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = employeeCreateSchema.safeParse(body);

  if (!parsed.success) {
    return validationError('Invalid employee payload', parsed.error.flatten());
  }

  if (!isDatabaseConfigured()) {
    return created({ ...parsed.data, status: 'REGISTERED', source: 'mock' });
  }

  try {
    const session = getSession();
    const { personal, skills, documents } = parsed.data;
    
    const data = {
      agencyId: session?.agencyId || parsed.data.agencyId,
      name: `${personal.firstName} ${personal.lastName}`.trim(),
      ...personal,
      ...skills,
      languages: skills?.languages ? JSON.stringify(skills.languages) : undefined,
      docPath: documents?.docPath,
      tgVideoId: documents?.tgVideoId,
      status: documents?.tgVideoId ? 'INTERVIEW_UPLOADED' as const : 'REGISTERED' as const,
      dateOfBirth: personal.dateOfBirth ? new Date(personal.dateOfBirth) : undefined,
      passportExpiryDate: personal.passportExpiryDate ? new Date(personal.passportExpiryDate) : undefined,
    };
    
    const employee = await db.employee.create({ data });
    return created(employee);
  } catch (error) {
    if (isDatabaseConnectionError(error)) {
      return created({ ...parsed.data, status: 'REGISTERED', source: 'mock' });
    }
    return serverError();
  }
}