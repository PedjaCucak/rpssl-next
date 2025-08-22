import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      game: gameReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
