import { storageRoutes } from '@/lib/mock-data';
import { documentCreateSchema } from '@/lib/validations/document.schema';
import { created, ok, serverError, validationError } from '@/lib/api/responses';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';

export async function GET(req: Request) {
  if (!isDatabaseConfigured()) {
    return ok(storageRoutes, { source: 'mock' });
  }

  try {
    const { searchParams } = new URL(req.url);
    const employeeId = searchParams.get('employeeId') ?? undefined;
    const data = await db.document.findMany({
      where: employeeId ? { employeeId } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    return ok(data, { total: data.length, source: 'database' });
  } catch (error) {
    if (isDatabaseConnectionError(error)) {
      return ok(storageRoutes, { source: 'mock' });
    }
    return serverError();
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = documentCreateSchema.safeParse(body);

  if (!parsed.success) {
    return validationError('Invalid document payload', parsed.error.flatten());
  }

  if (!isDatabaseConfigured()) {
    return created({ ...parsed.data, status: 'PENDING', source: 'mock' });
  }

  try {
    const document = await db.document.create({ data: parsed.data });
    return created(document);
  } catch (error) {
    if (isDatabaseConnectionError(error)) {
      return created({ ...parsed.data, status: 'PENDING', source: 'mock' });
    }
    return serverError();
  }
}
