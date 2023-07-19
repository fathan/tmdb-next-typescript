'use client';

import SectionHeadingTitle from "@/components/SectionHeadingTitle";
import CardContentItem from "@/components/CardContentItem";

import { IHeading } from "@/@types/types";

import { setNowPlayings } from "@/redux/features/moviesSlice";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useCallback, useEffect, useState } from 'react';
import MoviesService from '@/services/httpRequest/movies';
import LoaderCardContentItem from "@/components/SkeletonLoader/LoaderCardContentItem";
import EmptyData from "@/components/EmptyData";

export default function SectionListNowPlaying () {
  const nowPlayings = useAppSelector((state) => state.moviesReducer.nowPlayings);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const objHeading: IHeading = {
    title: 'Now Playing',
    link: '/movies/now-playing'
  };

  const onHandleSetNowPlayings = useCallback((results: any[]): void => {
    dispatch(setNowPlayings(results));
  }, [dispatch]);

  const fetchMovieNowPlaying = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      const queryParam = '?page=1'
      const response = await MoviesService.getNowPlaying(queryParam);
      onHandleSetNowPlayings(response.data.results.slice(0, 10));

      setIsLoaded(true);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
    finally {
      setIsLoading(false);
    }
  }, [onHandleSetNowPlayings]);

  useEffect(() => {
    fetchMovieNowPlaying();
  }, [fetchMovieNowPlaying]);

  return (
    <>
      <SectionHeadingTitle {...objHeading} />

      {(nowPlayings.length > 0 && isLoaded) && (
        <section className="flex snap-x overflow-scroll gap-4 mb-5 z-9">
          {nowPlayings.map((item, idx) => (
            <CardContentItem
              key={idx}
              type="movie"
              {...item}
            />
          ))}
        </section>
      )}
      {(!nowPlayings.length && isLoading) && (
        <LoaderCardContentItem />
      )}
      {(!nowPlayings.length && isLoaded) && (
        <EmptyData />
      )}
    </>
  )
}