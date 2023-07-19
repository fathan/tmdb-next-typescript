import { ITVSeriesDetail } from '@/@types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITvSeriesState {
  airingTodays: Array<any>;
  populars: Array<any>;
  topRateds: Array<any>;
  tvSeries: Array<any>;
  tvSeriesDetail: ITVSeriesDetail
};

const initialState: ITvSeriesState = {
  airingTodays: [],
  populars: [],
  topRateds: [],
  tvSeries: [],
  tvSeriesDetail: {
    backdrop_path: '',
    created_by: [],
    episode_runtime: [],
    first_air_date: '',
    genres: [],
    homepage: '',
    id: null,
    last_air_date: '',
    last_episode_to_air: {
      id: null,
      name: '',
      overview: '',
    },
    name: '',
    next_episode_to_air: {
      id: null,
      name: '',
      overview: '',
    },
    networks: [],
    number_of_episodes: 0,
    number_of_seasons: 0,
    original_language: '',
    original_name: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    production_companies: [],
    production_countries: [],
    seasons: [],
    spoken_languages: [],
    status: '',
    tagline: '',
    type: '',
    vote_average: 0,
    vote_count: 0
  }
};

export const tvSeasons = createSlice({
  name: 'tvSeries',
  initialState,
  reducers: {
    reset: () => initialState,
    setAiringTodays: (state, action: PayloadAction<Array<any>>): void => {
      state.airingTodays = action.payload;
    },
    setPopulars: (state, action: PayloadAction<Array<any>>): void => {
      state.populars = action.payload;
    },
    setTopRateds: (state, action: PayloadAction<Array<any>>): void => {
      state.topRateds = action.payload;
    },
    setTvSeries: (state, action: PayloadAction<Array<any>>): void => {
      state.tvSeries = action.payload;
    },
    setTvSeriesDetail: (state, action: PayloadAction<ITVSeriesDetail>): void => {
      state.tvSeriesDetail = action.payload;
    },
  },
});

export const {
  setAiringTodays,
  setPopulars,
  setTopRateds,
  setTvSeries,
  setTvSeriesDetail,
  reset,
} = tvSeasons.actions;

export default tvSeasons.reducer;
