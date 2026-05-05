import { handleAuthError, ok, serverError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';
import { PLANS, subscriptionPlans } from '@/config/subscription';

export async function GET(req: Request) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN']);
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || 'month';
    const dateFrom = searchParams.get('from');
    const dateTo = searchParams.get('to');

    if (!isDatabaseConfigured()) {
      return ok({
        revenue: 0,
        expenses: 0,
        profit: 0,
        byPeriod: [],
        revenueBySource: {},
        trend: []
      });
    }

    const employeeCount = await db.employee.count({ where: { agencyId: session.agencyId } });
    const agentCount = await db.agent.count({ where: { agencyId: session.agencyId, active: true } });

    let monthlyRate: number = PLANS.BASIC.monthlyPrice;
    if (employeeCount > 100) monthlyRate = PLANS.PREMIUM.monthlyPrice;
    if (employeeCount > 500) monthlyRate = PLANS.ENTERPRISE.monthlyPrice;

    const months = period === 'year' ? 12 : period === 'month' ? 1 : 6;
    const revenue = monthlyRate * months;
    const expenses = employeeCount * 50 + agentCount * 100;
    const profit = revenue - expenses;

    const now = new Date();
    const trend = [];
    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      
      const [empCount, docCount] = await Promise.all([
        db.employee.count({ where: { agencyId: session.agencyId, createdAt: { gte: monthStart, lte: monthEnd } } }),
        db.document.count({ where: { employee: { agencyId: session.agencyId }, createdAt: { gte: monthStart, lte: monthEnd } } })
      ]);
      
      trend.push({
        month: monthStart.toISOString().slice(0, 7),
        revenue: monthlyRate,
        expenses: empCount * 50 + agentCount * 100,
        employees: empCount,
        documents: docCount
      });
    }

    return ok({
      revenue,
      expenses,
      profit,
      currentRate: monthlyRate,
      totalEmployees: employeeCount,
      totalAgents: agentCount,
      revenueBySource: {
        subscription: revenue,
        documents: 0,
        services: 0
      },
      byPeriod: trend.slice(-months),
      trend
    });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}