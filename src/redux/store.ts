import { configureStore } from '@reduxjs/toolkit';

import moviesReducer from './features/moviesSlice';
import tvSeriesReducer from './features/tvSeriesSlice';
import searchReducer from './features/searchSlice';

export const store = configureStore({
  reducer: {
    moviesReducer,
    tvSeriesReducer,
    searchReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
