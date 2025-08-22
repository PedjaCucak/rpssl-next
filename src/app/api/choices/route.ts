import { NextResponse } from 'next/server';
import { CHOICES } from '@/server/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(CHOICES);
}
