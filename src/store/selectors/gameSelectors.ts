import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

const selectGame = (s: RootState) => s.game;
export const selectChoices = createSelector(selectGame, (g) => g.choices);
export const selectChoicesStatus = createSelector(
  selectGame,
  (g) => g.choicesStatus
);
export const selectRecent = createSelector(selectGame, (g) => g.recent);
export const selectLastRound = createSelector(selectGame, (g) => g.lastRound);
export const selectPlayStatus = createSelector(selectGame, (g) => g.playStatus);

export const selectChoiceNameById = createSelector(selectChoices, (choices) => {
  const map = new Map<number, string>();
  choices.forEach((c) => map.set(c.id, c.name));
  return (id: number) => map.get(id) ?? `#${id}`;
});
