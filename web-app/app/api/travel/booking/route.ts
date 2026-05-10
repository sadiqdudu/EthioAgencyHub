import { created, handleAuthError, notFound, ok, serverError, validationError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';
import { bookingCreateSchema } from '@/lib/validations/travel.schema';
import { writeAuditLog } from '@/lib/audit/log';

export async function GET() {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);

    if (!isDatabaseConfigured()) {
      return ok([], { source: 'mock' });
    }

    const data = await db.travel.findMany({
      where: { 
        employee: { agencyId: session.agencyId },
        bookingReference: { not: null }
      },
      orderBy: { departureAt: 'asc' },
      include: { employee: true },
      take: 100
    });
    return ok(data, { total: data.length });
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
    const parsed = bookingCreateSchema.safeParse(body);
    if (!parsed.success) return validationError('Invalid booking payload', parsed.error.flatten());

    const employee = await db.employee.findFirst({ where: { id: parsed.data.employeeId, agencyId: session.agencyId } });
    if (!employee) return notFound('Employee not found for this agency');

    const travelData = {
      employeeId: parsed.data.employeeId,
      destination: parsed.data.destination,
      departureAt: new Date(parsed.data.departureDate),
      airline: parsed.data.airline,
      flightNumber: parsed.data.flightNumber,
      departureTime: parsed.data.departureTime,
      arrivalTime: parsed.data.arrivalTime,
      origin: parsed.data.origin,
      terminal: parsed.data.terminal,
      class: parsed.data.class,
      ticketCost: parsed.data.ticketCost,
      currency: parsed.data.currency,
      paymentStatus: 'paid',
      bookingReference: parsed.data.bookingReference || `BK-${Date.now()}`,
      status: 'TICKETED' as const
    };

    if (!isDatabaseConfigured()) {
      return created({ ...travelData, id: 'mock-' + Date.now(), source: 'mock' });
    }

    const travel = await db.travel.create({ data: travelData as any });
    await writeAuditLog({ 
      agencyId: session.agencyId, 
      actorId: session.userId, 
      action: 'create', 
      resource: 'travel_booking', 
      resourceId: travel.id, 
      metadata: { destination: travel.destination, cost: travel.ticketCost || 0 }
    });
    return created(travel);
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}