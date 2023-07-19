import { TIncludeAdult } from '@/@types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchState {
  isShowSearch: boolean;
  include_adult: TIncludeAdult;
  year: string;
  query: string;
};

const initialState: ISearchState = {
  isShowSearch: false,
  include_adult: '1', 
  year: '2023',
  query: ''
};

export const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: () => initialState,
    setIsShowSearch: (state, action: PayloadAction<boolean>): void => {
      state.isShowSearch = action.payload;
    },
    setIncludeAdult: (state, action: PayloadAction<TIncludeAdult>): void => {
      state.include_adult = action.payload;
    },
    setYear: (state, action: PayloadAction<string>): void => {
      state.year = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>): void => {
      state.query = action.payload;
    }
  },
});

export const {
  reset,
  setIsShowSearch,
  setIncludeAdult,
  setYear,
  setQuery
} = search.actions;

export default search.reducer;
