import { NextResponse } from 'next/server';

export function ok<T>(data: T, meta?: Record<string, unknown>) {
  return NextResponse.json({ success: true, data, ...(meta ? { meta } : {}) });
}

export function created<T>(data: T) {
  return NextResponse.json({ success: true, data }, { status: 201 });
}

export function validationError(message: string, details?: unknown) {
  return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message, details } }, { status: 400 });
}

export function unauthorized(message = 'Authentication required') {
  return NextResponse.json({ success: false, error: { code: 'UNAUTHORIZED', message } }, { status: 401 });
}

export function serverError(message = 'Unexpected server error') {
  return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR', message } }, { status: 500 });
}
