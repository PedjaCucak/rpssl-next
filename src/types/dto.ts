import type { Choice, ChoiceId, ChoiceName } from './model';

export interface ChoiceDto {
  id: ChoiceId;
  name: ChoiceName;
}

export interface GameResultDto {
  results: 'win' | 'lose' | 'tie';
  player: ChoiceId;
  computer: ChoiceId;
}
