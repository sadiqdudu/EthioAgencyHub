import { handleAuthError, serverError, ok } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';

export async function GET(req: Request) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);
    
    if (!isDatabaseConfigured()) {
      // Return mock stats for development
      return ok({
        total: 156,
        registered: 45,
        documentReview: 28,
        interviewUploaded: 32,
        travelReady: 38,
        deployed: 13
      });
    }

    const [
      total,
      registered,
      documentReview,
      interviewUploaded,
      travelReady,
      deployed
    ] = await Promise.all([
      db.employee.count({ where: { agencyId: session.agencyId } }),
      db.employee.count({ 
        where: { 
          agencyId: session.agencyId,
          status: 'REGISTERED' 
        } 
      }),
      db.employee.count({ 
        where: { 
          agencyId: session.agencyId,
          status: 'DOCUMENT_REVIEW' 
        } 
      }),
      db.employee.count({ 
        where: { 
          agencyId: session.agencyId,
          status: 'INTERVIEW_UPLOADED' 
        } 
      }),
      db.employee.count({ 
        where: { 
          agencyId: session.agencyId,
          status: 'TRAVEL_READY' 
        } 
      }),
      db.employee.count({ 
        where: { 
          agencyId: session.agencyId,
          status: 'DEPLOYED' 
        } 
      })
    ];

    return ok({
      total,
      registered,
      documentReview,
      interviewUploaded,
      travelReady,
      deployed
    });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}