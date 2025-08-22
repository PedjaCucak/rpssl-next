import { NextResponse } from 'next/server';
import { getOrSetUserId } from '../_session';
import { getRecent, clearRecent } from '@/server/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const uid = await getOrSetUserId();
  return NextResponse.json(getRecent(uid));
}

export async function DELETE() {
  const uid = await getOrSetUserId();
  clearRecent(uid);
  return NextResponse.json({ ok: true });
}
