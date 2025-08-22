import { CHOICES } from './db';

export async function randomChoiceId(
  signal?: AbortSignal
): Promise<1 | 2 | 3 | 4 | 5> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 800);
    const res = await fetch('https://codechallenge.boohma.com/random', {
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (!res.ok) throw new Error('random service error');
    const data = (await res.json()) as { random_number: number };
    const n = Math.max(1, Math.min(100, Number(data?.random_number ?? 1)));
    // map 1..100 evenly to 1..5
    const idx = (n - 1) % CHOICES.length; // 0..4
    return CHOICES[idx].id;
  } catch {
    // fallback
    const idx = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[idx].id;
  }
}
