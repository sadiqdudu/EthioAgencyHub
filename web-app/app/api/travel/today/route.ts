import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ success: true, data: [{ flight: 'ET-412', destination: 'Riyadh', ready: 12 }, { flight: 'ET-602', destination: 'Dubai', ready: 9 }] });
}
