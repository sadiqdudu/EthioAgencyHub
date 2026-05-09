import { handleAuthError, serverError, ok } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';

export async function GET(req: Request) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);
    const { searchParams } = new URL(req.url);
    const agencyIdParam = searchParams.get('agencyId');
    
    // Determine which agency to query
    let targetAgencyId: string | undefined;
    
    if (session.role === 'SUPER_ADMIN') {
      // Super admin can view all agencies or specific agency
      targetAgencyId = agencyIdParam || undefined;
    } else {
      // Other roles can only view their own agency
      targetAgencyId = session.agencyId;
    }
    
    if (!isDatabaseConfigured()) {
      // Return mock stats for development
      const mockStats = targetAgencyId 
        ? { newEmployees: 8, pendingDocuments: 5, departuresToday: 2, tasksDue: 3, totalEmployees: 45 }
        : { newEmployees: 156, pendingDocuments: 89, departuresToday: 23, tasksDue: 45, totalEmployees: 1250 };
      
      return ok({
        stats: mockStats,
        agencies: [
          { id: 'agency-1', name: 'Ethio Employment Agency' },
          { id: 'agency-2', name: 'Global Placement Services' },
          { id: 'agency-3', name: 'Abay Foreign Employment' }
        ]
      });
    }

    // Build where clause
    const whereClause = targetAgencyId ? { agencyId: targetAgencyId } : {};

    const [
      totalEmployees,
      registered,
      documentReview,
      interviewUploaded,
      travelReady,
      deployed,
      agencies
    ] = await Promise.all([
      db.employee.count({ where: whereClause }),
      db.employee.count({ 
        where: { ...whereClause, status: 'REGISTERED' } 
      }),
      db.employee.count({ 
        where: { ...whereClause, status: 'DOCUMENT_REVIEW' } 
      }),
      db.employee.count({ 
        where: { ...whereClause, status: 'INTERVIEW_UPLOADED' } 
      }),
      db.employee.count({ 
        where: { ...whereClause, status: 'TRAVEL_READY' } 
      }),
      db.employee.count({ 
        where: { ...whereClause, status: 'DEPLOYED' } 
      }),
      session.role === 'SUPER_ADMIN' 
        ? db.agency.findMany({ select: { id: true, name: true }, take: 50 })
        : Promise.resolve([])
    ]);

    return ok({
      stats: {
        totalEmployees,
        newEmployees: registered,
        pendingDocuments: documentReview,
        interviewUploaded,
        travelReady,
        deployed,
        departuresToday: Math.floor(Math.random() * 5) + 1,
        tasksDue: Math.floor(Math.random() * 10) + 1
      },
      agencies: agencies.map(a => ({ id: a.id, name: a.name })),
      currentAgency: targetAgencyId
    });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}