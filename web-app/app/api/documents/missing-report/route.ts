import { z } from 'zod';
import { created, handleAuthError, ok, serverError, validationError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';

const RESOURCE = 'mols_missing_abroad_case';

const prioritySchema = z.enum(['critical', 'high', 'medium']);
const statusSchema = z.enum(['draft', 'submitted_to_mols', 'under_review', 'resolved']);

const missingAbroadCaseSchema = z.object({
  id: z.string().min(3),
  employeeId: z.string().min(1),
  employeeName: z.string().min(1),
  passportNo: z.string().min(1),
  destinationCountry: z.string().min(1),
  employerName: z.string().min(1),
  missingSince: z.string().min(1),
  lastContactDate: z.string().min(1),
  agencyContactName: z.string().min(1),
  agencyContactPhone: z.string().min(1),
  priority: prioritySchema,
  status: statusSchema,
  molsReference: z.string().optional(),
  notes: z.string().default(''),
  letterText: z.string().optional()
});

const upsertSchema = z.object({
  case: missingAbroadCaseSchema,
  reason: z.string().optional()
});

const mockCases = [
  {
    id: 'MOLS-MISS-001',
    employeeId: 'EAH-1024',
    employeeName: 'Mekdes Tesfaye',
    passportNo: 'ET1234567',
    destinationCountry: 'Saudi Arabia',
    employerName: 'Al Noor Services',
    missingSince: '2026-04-26',
    lastContactDate: '2026-04-24',
    agencyContactName: 'Abel Hailu',
    agencyContactPhone: '+251911223344',
    priority: 'critical',
    status: 'submitted_to_mols',
    molsReference: 'MOLS-2026-00421',
    notes: 'Family confirms no contact for 12 days. Employer gave inconsistent update.'
  },
  {
    id: 'MOLS-MISS-002',
    employeeId: 'EAH-1098',
    employeeName: 'Hana Bekele',
    passportNo: 'ET9988776',
    destinationCountry: 'UAE',
    employerName: 'Gulf Care Group',
    missingSince: '2026-05-01',
    lastContactDate: '2026-04-29',
    agencyContactName: 'Marta Desta',
    agencyContactPhone: '+251944112233',
    priority: 'high',
    status: 'under_review',
    molsReference: 'MOLS-2026-00439',
    notes: 'Case escalated to labor attache. Awaiting embassy coordination.'
  },
  {
    id: 'MOLS-MISS-003',
    employeeId: 'EAH-1133',
    employeeName: 'Rahel Tadesse',
    passportNo: 'ET5566778',
    destinationCountry: 'Kuwait',
    employerName: 'Al Bayan Recruitment',
    missingSince: '2026-05-04',
    lastContactDate: '2026-05-03',
    agencyContactName: 'Samuel Kebede',
    agencyContactPhone: '+251933765432',
    priority: 'medium',
    status: 'draft',
    notes: 'Preliminary report drafted. Family statement collected.'
  }
];

function normalizeStoredCase(value: unknown) {
  const parsed = missingAbroadCaseSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

export async function GET() {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);

    if (!isDatabaseConfigured()) {
      return ok(mockCases, { source: 'mock', total: mockCases.length });
    }

    const logs = await db.auditLog.findMany({
      where: { agencyId: session.agencyId, resource: RESOURCE, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 500
    });

    const latestByCaseId = new Map<string, z.infer<typeof missingAbroadCaseSchema>>();

    for (const log of logs) {
      const metadata = log.metadata as Record<string, unknown> | null;
      const caseData = metadata?.case;
      const normalized = normalizeStoredCase(caseData);
      if (!normalized) continue;
      if (!latestByCaseId.has(normalized.id)) {
        latestByCaseId.set(normalized.id, normalized);
      }
    }

    const cases = [...latestByCaseId.values()].sort((a, b) => b.missingSince.localeCompare(a.missingSince));
    return ok(cases, { source: 'database', total: cases.length });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) {
      return ok(mockCases, { source: 'mock', total: mockCases.length });
    }
    return serverError();
  }
}

export async function POST(req: Request) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);
    const body = await req.json();
    const parsed = upsertSchema.safeParse(body);

    if (!parsed.success) {
      return validationError('Invalid missing abroad case payload', parsed.error.flatten());
    }

    if (!isDatabaseConfigured()) {
      return created({ ...parsed.data.case, source: 'mock' });
    }

    const now = new Date().toISOString();
    await db.auditLog.create({
      data: {
        agencyId: session.agencyId,
        actorId: session.userId,
        action: 'missing_case_created',
        resource: RESOURCE,
        resourceId: parsed.data.case.id,
        metadata: {
          case: parsed.data.case,
          reason: parsed.data.reason ?? 'case_created',
          updatedAt: now
        }
      }
    });

    return created(parsed.data.case);
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}

export async function PATCH(req: Request) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);
    const body = await req.json();
    const parsed = upsertSchema.safeParse(body);

    if (!parsed.success) {
      return validationError('Invalid missing abroad case payload', parsed.error.flatten());
    }

    if (!isDatabaseConfigured()) {
      return ok({ ...parsed.data.case, source: 'mock' });
    }

    const now = new Date().toISOString();
    await db.auditLog.create({
      data: {
        agencyId: session.agencyId,
        actorId: session.userId,
        action: 'missing_case_updated',
        resource: RESOURCE,
        resourceId: parsed.data.case.id,
        metadata: {
          case: parsed.data.case,
          reason: parsed.data.reason ?? 'case_updated',
          updatedAt: now
        }
      }
    });

    return ok(parsed.data.case);
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}
