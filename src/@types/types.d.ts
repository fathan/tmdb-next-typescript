type TNumberTrue = '1';
type TNumberFalse = '2';
type TMediaCategoryMovies = 'movies';
type TMediaCategoryTv = 'tv';
type TIncludeAdult = TNumberTrue | TNumberFalse;

// ////////////////////

interface IHeading {
  title: string,
  link: string
}

interface IMovieDetail {
  backdrop_path: string;
  budget: number;
  genres: any[];
  homepage: string;
  id: number;
  imdbId: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: any[];
  production_countries: any[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: any[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number
}

interface IEpisodeToAir {
  id: number | null;
  name: string;
  overview: string;
  vote_average?: number;
  vote_count?: number;
  air_date?: string;
  episode_number?: number;
  production_code?: string;
  runtime?: number;
  season_number?: number;
  show_id?: number;
  still_path?: string;
}

interface ISeasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface ITVSeriesDetail {
  backdrop_path: string;
  created_by: any[];
  episode_runtime: any[];
  first_air_date: string;
  genres: any[];
  homepage: string;
  id: number | null;
  last_air_date: string;
  last_episode_to_air: IEpisodeToAir;
  name: string;
  next_episode_to_air: IEpisodeToAir;
  networks: any[];
  number_of_episodes: number;
  number_of_seasons: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: any[];
  production_countries: any[];
  seasons: Array<ISeasons>;
  spoken_languages: any[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number
}

export type {
  TNumberTrue,
  TNumberFalse,
  TMediaCategoryMovies,
  TMediaCategoryTv,
  TIncludeAdult,
  IHeading,
  IMovieDetail,
  ISeasons,
  ITVSeriesDetail
};
