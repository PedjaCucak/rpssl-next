export type ChoiceId = 1 | 2 | 3 | 4 | 5;
export type ChoiceName =  'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';

export interface Choice {
  id: ChoiceId;
  name: ChoiceName;
}

export interface GameResult {
  results: 'win' | 'lose' | 'tie';
  player: ChoiceId;
  computer: ChoiceId;
}
