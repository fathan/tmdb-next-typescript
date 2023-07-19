import { IMovieDetail } from '@/@types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface IMoviesState {
  nowPlayings: Array<any>;
  upcomings: Array<any>;
  topRateds: Array<any>;
  movies: Array<any>;
  moviesDetail: IMovieDetail
};

const initialState: IMoviesState = {
  movies: [],
  nowPlayings: [],
  upcomings: [],
  topRateds: [],
  moviesDetail: {
    backdrop_path: '',
    budget: 0,
    genres: [],
    homepage: '',
    id: 0,
    imdbId: '',
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    production_companies: [],
    production_countries: [],
    release_date: '',
    revenue: 0,
    runtime: 0,
    spoken_languages: [],
    status: '',
    tagline: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
  }
};

export const movies = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    reset: () => initialState,
    setMovies: (state, action: PayloadAction<Array<any>>): void => {
      state.movies = action.payload;
    },
    setNowPlayings: (state, action: PayloadAction<Array<any>>): void => {
      state.nowPlayings = action.payload;
    },
    setUpcomings: (state, action: PayloadAction<Array<any>>): void => {
      state.upcomings = action.payload;
    },
    setTopRateds: (state, action: PayloadAction<Array<any>>): void => {
      state.topRateds = action.payload;
    },
    setMoviesDetail: (state, action: PayloadAction<IMovieDetail>): void => {
      state.moviesDetail = action.payload;
    },
  },
});

export const {
  reset,
  setMovies,
  setNowPlayings,
  setUpcomings,
  setTopRateds,
  setMoviesDetail,
} = movies.actions;

export default movies.reducer;
