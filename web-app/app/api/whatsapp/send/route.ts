import { NextRequest, NextResponse } from 'next/server';
import { whatsappService } from '@/lib/whatsapp';
import { handleAuthError, ok, serverError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const session = requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN']);

    if (!whatsappService.isConfigured()) {
      return NextResponse.json(
        { success: false, error: 'WhatsApp not configured. Please set WHATSAPP_PHONE_ID and WHATSAPP_ACCESS_TOKEN in environment variables.' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { phone, message, templateType, pilgrimName, additionalData } = body;

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    let result;

    if (templateType) {
      result = await whatsappService.sendTemplate(phone, {
        type: templateType,
        pilgrimName: pilgrimName || 'Pilgrim',
        pilgrimPhone: phone,
        additionalData: additionalData || {},
      });
    } else if (message) {
      result = await whatsappService.sendMessage(phone, message);
    } else {
      return NextResponse.json(
        { success: false, error: 'Either message or templateType is required' },
        { status: 400 }
      );
    }

    if (result.success) {
      return ok({
        success: true,
        messageId: result.messageId,
        sentTo: phone,
        sentAt: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { success: false, error: result.error || 'Failed to send message' },
      { status: 500 }
    );
  } catch (error) {
    const authResponse = handleAuthError(error);
    if (authResponse) return authResponse;
    console.error('WhatsApp API error:', error);
    return serverError('Failed to send WhatsApp message');
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const verifyToken = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    const isValid = whatsappService.verifyWebhook(verifyToken || '');

    if (isValid && challenge) {
      return new NextResponse(challenge, { status: 200 });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid verification token' },
      { status: 403 }
    );
  } catch (error) {
    return serverError('Verification failed');
  }
}