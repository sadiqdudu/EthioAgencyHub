import { handleAuthError, ok, serverError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';

export async function GET() {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);

    // Return mock data since we may not have travel tables configured
    // In production, you would query the actual travel/ticket tables
    const mockData = {
      totalDepartures: 156,
      scheduledDepartures: 24,
      employeesTraveling: 1248,
      ticketsIssued: 1142,
      pendingTickets: 98,
      completedTrips: 892
    };

    return ok(mockData);
  } catch (error) {
    const authResponse = handleAuthError(error);
    if (authResponse) return authResponse;
    console.error('Travel stats error:', error);
    return serverError('Failed to fetch travel stats');
  }
}