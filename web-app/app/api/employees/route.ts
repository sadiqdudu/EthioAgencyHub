import { employees } from '@/lib/mock-data';
import { employeeCreateSchema } from '@/lib/validations/employee.schema';
import { created, ok, serverError, validationError } from '@/lib/api/responses';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';

export async function GET(req: Request) {
  if (!isDatabaseConfigured()) {
    return ok(employees, { total: employees.length, source: 'mock' });
  }

  try {
    const { searchParams } = new URL(req.url);
    const agencyId = searchParams.get('agencyId') ?? undefined;
    const data = await db.employee.findMany({
      where: agencyId ? { agencyId } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    return ok(data, { total: data.length, source: 'database' });
  } catch (error) {
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
    const employee = await db.employee.create({ data: parsed.data });
    return created(employee);
  } catch (error) {
    if (isDatabaseConnectionError(error)) {
      return created({ ...parsed.data, status: 'REGISTERED', source: 'mock' });
    }
    return serverError();
  }
}
