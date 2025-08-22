import reducer, { resetScoreboard } from '@/store/slices/gameSlice';
import { selectRecent } from '@/store/selectors/gameSelectors';
import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '..';

function makeStore(pre?: RootState) {
  return configureStore({ reducer: { game: reducer }, preloadedState: pre });
}

const result = (
  player: number,
  computer: number,
  results: 'win' | 'lose' | 'tie' = 'win'
) => ({ player, computer, results });

test('caps recent to 10 with newest first', () => {
  const store = makeStore();
  // simulate fulfilled play actions
  for (let i = 1; i < 13; i++) {
    store.dispatch({
      type: 'game/play/fulfilled',
      payload: result(i as any, 1, 'win'),
    });
  }
  const recent = selectRecent(store.getState());
  expect(recent).toHaveLength(10);
  expect(recent[0].player).toBe(12); // newest first
  expect(recent[9].player).toBe(3); // oldest kept
});

test('resetScoreboard clears recent on fulfilled', () => {
  const store = makeStore({
    game: {
      choices: [],
      choicesStatus: 'idle',
      playStatus: 'idle',
      lastRound: undefined,
      recent: [{ player: 1, computer: 2, results: 'win' }],
    },
  });
  store.dispatch({
    type: resetScoreboard.fulfilled.type,
    payload: { ok: true },
  });
  expect(selectRecent(store.getState())).toEqual([]);
});
