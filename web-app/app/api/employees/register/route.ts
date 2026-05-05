import { z } from 'zod';
import { created, handleAuthError, serverError, validationError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';
import { writeAuditLog } from '@/lib/audit/log';

const registerEmployeeSchema = z.object({
  personal: z.object({
    name: z.string().min(2),
    contactPhone: z.string().optional(),
    emergencyContact: z.string().optional()
  }),
  skills: z.object({
    role: z.string().optional(),
    destination: z.string().optional(),
    languages: z.array(z.string()).optional(),
    experienceYears: z.number().int().nonnegative().optional()
  }).optional(),
  documents: z.object({
    docPath: z.string().optional(),
    tgVideoId: z.string().optional()
  }).optional()
});

export async function POST(req: Request) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);
    const body = await req.json();
    const parsed = registerEmployeeSchema.safeParse(body);

    if (!parsed.success) {
      return validationError('Invalid employee registration payload', parsed.error.flatten());
    }

    const data = {
      agencyId: session.agencyId,
      name: parsed.data.personal.name,
      role: parsed.data.skills?.role,
      destination: parsed.data.skills?.destination,
      docPath: parsed.data.documents?.docPath,
      tgVideoId: parsed.data.documents?.tgVideoId,
      status: parsed.data.documents?.tgVideoId ? 'INTERVIEW_UPLOADED' as const : 'REGISTERED' as const
    };

    if (!isDatabaseConfigured()) {
      return created({ ...data, id: 'mock-' + Date.now(), source: 'mock' });
    }

    const employee = await db.employee.create({ data });
    await writeAuditLog({ agencyId: session.agencyId, actorId: session.userId, action: 'create', resource: 'employee', resourceId: employee.id, metadata: { name: employee.name, destination: employee.destination } });
    return created(employee);
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}
