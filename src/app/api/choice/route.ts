import { NextResponse } from 'next/server';
import { CHOICES } from '@/server/db';
import { randomChoiceId } from '@/server/rand';

export const dynamic = 'force-dynamic';

export async function GET() {
  const id = await randomChoiceId();
  const choice = CHOICES.find((c) => c.id === id)!;
  return NextResponse.json(choice);
}
