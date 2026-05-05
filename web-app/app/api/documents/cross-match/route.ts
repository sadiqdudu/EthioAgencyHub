import { handleAuthError, ok, serverError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';

export async function POST() {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);

    if (!isDatabaseConfigured()) {
      return ok({ checked: 23, matched: 21, flagged: 2, source: 'mock' });
    }

    const employees = await db.employee.findMany({
      where: { agencyId: session.agencyId },
      include: { documents: true }
    });

    const requiredTypes = ['PASSPORT', 'VISA', 'MEDICAL'];
    let checked = 0;
    let matched = 0;
    const flagged: { employeeId: string; missing: string[] }[] = [];

    for (const emp of employees) {
      checked += 1;
      const present = new Set(emp.documents.map((d) => d.type));
      const missing = requiredTypes.filter((t) => !present.has(t as typeof emp.documents[number]['type']));
      if (missing.length === 0) {
        matched += 1;
      } else {
        flagged.push({ employeeId: emp.id, missing });
      }
    }

    return ok({ checked, matched, flagged: flagged.length, details: flagged });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}
