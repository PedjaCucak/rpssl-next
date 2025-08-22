import { NextResponse } from 'next/server';
import { getOrSetUserId } from '../_session';
import { randomChoiceId } from '@/server/rand';
import { getChoiceById, pushRecent } from '@/server/db';
import { judge } from '@/lib/rules';
import type { ChoiceId } from '@/types/model';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const uid = await getOrSetUserId();

  const body = (await req.json().catch(() => ({}))) as Partial<{ player: ChoiceId }>;
  const player = Number(body.player) as ChoiceId;
  if (![1,2,3,4,5].includes(player)) {
    return NextResponse.json({ error: 'Invalid player choice' }, { status: 400 });
  }
  if (!getChoiceById(player)) {
    return NextResponse.json({ error: 'Unknown choice' }, { status: 400 });
  }

  const computer = await randomChoiceId();
  const results = judge(player, computer);

  const payload = { results, player, computer } as const;

  // update per-user scoreboard (newest first, max 10)
  pushRecent(uid, payload);

  return NextResponse.json(payload);
}
