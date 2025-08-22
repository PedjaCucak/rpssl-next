import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { LoadStatus } from '@/types/ui';
import type { Choice, GameResult } from '@/types/model';
import { api } from '@/lib/api';

type GameState = {
  choices: Choice[];
  choicesStatus: LoadStatus;
  playStatus: LoadStatus;
  lastRound?: GameResult;
  recent: GameResult[]; // mirrored from server
};

const initialState: GameState = {
  choices: [],
  choicesStatus: 'loading',
  playStatus: 'idle',
  lastRound: undefined,
  recent: [],
};

export const fetchChoices = createAsyncThunk('game/choices', async () => {
  return await api.getChoices();
});

export const fetchScoreboard = createAsyncThunk('game/scoreboard', async () => {
  return await api.getScoreboard();
});

export const resetScoreboard = createAsyncThunk(
  'game/resetScoreboard',
  async () => {
    const data = await api.resetScoreboard();
    return data;
  }
);

export const playRound = createAsyncThunk(
  'game/play',
  async (choiceId: number) => {
    return await api.play(choiceId);
  }
);

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchChoices.pending, (s) => {
      s.choicesStatus = 'loading';
    })
      .addCase(fetchChoices.fulfilled, (s, a) => {
        s.choicesStatus = 'success';
        s.choices = a.payload;
      })
      .addCase(fetchChoices.rejected, (s) => {
        s.choicesStatus = 'error';
      });

    b.addCase(fetchScoreboard.fulfilled, (s, a) => {
      s.recent = a.payload.slice(0, 10);
    });

    b.addCase(resetScoreboard.fulfilled, (s, a) => {
      if (a.payload?.ok) {
        s.recent = [];
      }
    });

    b.addCase(playRound.pending, (s) => {
      s.playStatus = 'loading';
    })
      .addCase(playRound.fulfilled, (s, a) => {
        s.playStatus = 'success';
        s.lastRound = a.payload;
        s.recent.unshift(a.payload);
        if (s.recent.length > 10) s.recent.pop();
      })
      .addCase(playRound.rejected, (s) => {
        s.playStatus = 'error';
      });
  },
});

export default slice.reducer;
