import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

const COOKIE = 'rpssl_uid';

export async function getOrSetUserId(): Promise<string> {
  const store = await cookies();
  let uid = store.get(COOKIE)?.value;
  if (!uid) {
    uid = randomUUID();
    store.set(COOKIE, uid, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
  }
  return uid;
}
