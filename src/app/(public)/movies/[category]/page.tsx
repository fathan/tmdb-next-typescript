'use client';

import { useCallback, useEffect, useState } from 'react';

import SectionHeadingTitle from "@/components/SectionHeadingTitle";
import CardContentItem from "@/components/CardContentItem";
import { IHeading } from '@/@types/types';

import { setNowPlayings, setUpcomings, setTopRateds, reset } from "@/redux/features/moviesSlice";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import MoviesService from '@/services/httpRequest/movies';

import * as Constant from '@/utils/constants';
import Head from 'next/head';

export default function MovieCategory ({ params }: { params: { category: string } }) {
  const dispatch = useAppDispatch();

  const nowPlayings = useAppSelector((state) => state.moviesReducer.nowPlayings);
  const upcomings = useAppSelector((state) => state.moviesReducer.upcomings);
  const topRateds = useAppSelector((state) => state.moviesReducer.topRateds);

  const [page, setPage] = useState(1);

  const objHeading: IHeading = {
    title: '-',
    link: ''
  };

  // /////////////////////////////////

  switch (params.category) {
    case Constant.TYPE_MOVIE_NOW_PLAYING:
      objHeading.title = 'Now Playing';
      break;
    case Constant.TYPE_MOVIE_UPCOMING:
      objHeading.title = 'Upcoming';
      break;
    case Constant.TYPE_MOVIE_TOP_RATED:
      objHeading.title = 'Top Rated';
      break;
    default:
      objHeading.title = '-';
  }

  // /////////////////////////////////

  const onHandleSetNowPlayings = useCallback((results: any[]): void => {
    if (page === 1) {
      dispatch(setNowPlayings(results));
      setPage((prevPage) => prevPage + 1);
    } 
    else {
      dispatch(setNowPlayings([...nowPlayings, ...results]));
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, dispatch, nowPlayings]);
  
  const onHandleSetUpcomings = useCallback((results: any[]): void => {
    if (page === 1) {
      dispatch(setUpcomings(results));
      setPage((prevPage) => prevPage + 1);
    }
    else {
      dispatch(setUpcomings([...upcomings, ...results]));
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, dispatch, upcomings]);
  
  const onHandleSetTopRateds = useCallback((results: any[]): void => {
    if (page === 1) {
      dispatch(setTopRateds(results));
      setPage((prevPage) => prevPage + 1);
    }
    else {
      dispatch(setTopRateds([...topRateds, ...results]));
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, dispatch, topRateds]);

  // /////////////////////////////////

  const fetchMovieNowPlaying = useCallback(async (): Promise<void> => {
    try {
      const queryParam = `?page=${page}`
      const response = await MoviesService.getNowPlaying(queryParam);
      onHandleSetNowPlayings(response.data.results);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
  }, [page, onHandleSetNowPlayings]);

  const fetchMovieUpcoming = useCallback(async (): Promise<void> => {
    try {
      const queryParam = `?page=${page}`
      const response = await MoviesService.getUpcoming(queryParam);
      onHandleSetUpcomings(response.data.results);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
  }, [page, onHandleSetUpcomings]);
  
  const fetchMovieTopRated = useCallback(async (): Promise<void> => {
    try {
      const queryParam = `?page=${page}`
      const response = await MoviesService.getTopRated(queryParam);
      onHandleSetTopRateds(response.data.results);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
  }, [page, onHandleSetTopRateds]);

  // /////////////////////////////////

  const movies = () => {
    if (params.category === Constant.TYPE_MOVIE_NOW_PLAYING)
      return (nowPlayings.map((item, idx) => <CardContentItem key={idx} type="movie" isFullWidth {...item} />))
    else if (params.category === Constant.TYPE_MOVIE_UPCOMING)
      return (upcomings.map((item, idx) => <CardContentItem key={idx} type="movie" isFullWidth {...item} />))
    else if (params.category === Constant.TYPE_MOVIE_TOP_RATED)
      return (topRateds.map((item, idx) => <CardContentItem key={idx} type="movie" isFullWidth {...item} />))
  }

  const onHandleLoadMore = (): void => {
    if (params.category === Constant.TYPE_MOVIE_NOW_PLAYING) {
      fetchMovieNowPlaying();
    }
    else if (params.category === Constant.TYPE_MOVIE_UPCOMING) {
      fetchMovieUpcoming();
    }
    else if (params.category === Constant.TYPE_MOVIE_TOP_RATED) {
      fetchMovieTopRated();
    }
  };

  useEffect(() => {
    dispatch(reset());

    if (params.category === Constant.TYPE_MOVIE_NOW_PLAYING) {
      fetchMovieNowPlaying();
    }
    else if (params.category === Constant.TYPE_MOVIE_UPCOMING) {
      fetchMovieUpcoming();
    }
    else if (params.category === Constant.TYPE_MOVIE_TOP_RATED) {
      fetchMovieTopRated();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, params.category]);
  
  return (
    <>
      <Head>
        <title>Movies - TMDB</title>
        <meta name="description" content="This is Movies List" />
      </Head>
      <div className="p-4">
        <SectionHeadingTitle {...objHeading} />

        <section className="grid grid-cols-2 gap-4 mb-5">
          {movies()}
        </section>

        <section>
          <button
            type="button"
            className="w-full text-white bg-[#01b4e4] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
            onClick={onHandleLoadMore}
          >
            Load More
          </button>
        </section>
      </div>
    </>
  )
}