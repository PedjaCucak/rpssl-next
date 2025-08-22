import type { ChoiceId } from '@/types/model';

// adjacency list: who each id beats
export const BEATS: Record<ChoiceId, ChoiceId[]> = {
  1: [3, 4], // rock > scissors, lizard
  2: [1, 5], // paper > rock, spock
  3: [2, 4], // scissors > paper, lizard
  4: [2, 5], // lizard > paper, spock
  5: [1, 3], // spock > rock, scissors
};

export function judge(player: ChoiceId, computer: ChoiceId): 'win' | 'lose' | 'tie' {
  if (player === computer) return 'tie';
  if (BEATS[player].includes(computer)) return 'win';
  return 'lose';
}
