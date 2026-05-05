import { NextResponse } from 'next/server';
import { handleAuthError, created, validationError, serverError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/prisma';
import { isDatabaseConfigured, isDatabaseConnectionError } from '@/lib/db/errors';
import { PLANS } from '@/config/subscription';
import { z } from 'zod';

const paymentSchema = z.object({
  planId: z.enum(['BASIC', 'PREMIUM', 'ENTERPRISE']),
  paymentMethod: z.enum(['telebirr', 'cbe', 'awash', 'card']),
  amount: z.number().positive()
});

export async function POST(req: Request) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN']);
    const body = await req.json();
    const parsed = paymentSchema.safeParse(body);

    if (!parsed.success) {
      return validationError('Invalid payment data', parsed.error.flatten());
    }

    if (!isDatabaseConfigured()) {
      return validationError('Payment processing requires database configuration.');
    }

    const plan = PLANS[parsed.data.planId as keyof typeof PLANS];
    if (!plan) {
      return validationError('Invalid plan selected.');
    }

    const amountInETB = parsed.data.amount;
    if (amountInETB !== plan.monthlyPrice && amountInETB !== plan.yearlyPrice / 12) {
      return validationError('Amount does not match plan pricing.');
    }

    const paymentRecord = {
      id: `pay_${Date.now()}`,
      userId: session.userId,
      agencyId: session.agencyId,
      planId: parsed.data.planId,
      amount: amountInETB,
      currency: 'ETB',
      paymentMethod: parsed.data.paymentMethod,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    return created({
      payment: paymentRecord,
      message: 'Payment initiated. Complete payment via selected method.',
      instructions: getPaymentInstructions(parsed.data.paymentMethod, amountInETB)
    });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    if (isDatabaseConnectionError(error)) return serverError('Database unavailable.');
    return serverError();
  }
}

function getPaymentInstructions(method: string, amount: number): string {
  const instructions: Record<string, string> = {
    telebirr: ` Dial *822# and follow prompts. Enter amount: ${amount} ETB`,
    cbe: `Visit nearest CBE branch. Use reference: PAY-${Date.now()}`,
    awash: `Use Awash Bank app or visit branch. Ref: PAY-${Date.now()}`,
    card: `Redirect to secure payment gateway for card processing`
  };
  return instructions[method] || 'Contact support for payment instructions.';
}

export async function GET() {
  try {
    requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN']);
    
    if (!isDatabaseConfigured()) {
      return created({ payments: [] });
    }

    const payments: any[] = [];
    
    return created({ payments, supportedMethods: ['telebirr', 'cbe', 'awash', 'card'] });
  } catch (error) {
    const authRes = handleAuthError(error);
    if (authRes) return authRes;
    return serverError();
  }
}