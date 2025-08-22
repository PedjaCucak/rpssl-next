import type { Choice, ChoiceId, GameResult } from '@/types/model';

export const CHOICES = [
  { id: 1, name: 'rock' },
  { id: 2, name: 'paper' },
  { id: 3, name: 'scissors' },
  { id: 4, name: 'lizard' },
  { id: 5, name: 'spock' },
] as const satisfies Readonly<Choice[]>;

export type UserId = string;

// scoreboard per user (newest first, cap 10)
const recentByUser = new Map<UserId, GameResult[]>();

export function getRecent(userId: UserId): GameResult[] {
  return recentByUser.get(userId) ?? [];
}

export function pushRecent(userId: UserId, result: GameResult) {
  const arr = recentByUser.get(userId) ?? [];
  arr.unshift(result);
  if (arr.length > 10) arr.pop();
  recentByUser.set(userId, arr);
}

export function clearRecent(userId: UserId) {
  recentByUser.delete(userId);
}

export function getChoiceById(id: ChoiceId) {
  return CHOICES.find(c => c.id === id);
}
