'use client';

import SectionHeadingTitle from "@/components/SectionHeadingTitle";
import CardContentItem from "@/components/CardContentItem";

import { IHeading } from "@/@types/types";

import { setUpcomings } from "@/redux/features/moviesSlice";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useCallback, useEffect, useState } from 'react';
import MoviesService from '@/services/httpRequest/movies';
import LoaderCardContentItem from "@/components/SkeletonLoader/LoaderCardContentItem";
import EmptyData from "@/components/EmptyData";

export default function SectionListUpcoming () {
  const upcomings = useAppSelector((state) => state.moviesReducer.upcomings);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const objHeading: IHeading = {
    title: 'Upcoming',
    link: '/movies/upcoming'
  };

  const onHandleSetUpcomings = useCallback((results: Array<any>) => {
    dispatch(setUpcomings(results));
  }, [dispatch]);

  const fetchMovieUpcoming = useCallback(async () => {
    setIsLoading(true);

    try {
      const queryParam = '?page=1'
      const response = await MoviesService.getUpcoming(queryParam);
      onHandleSetUpcomings(response.data.results.slice(0, 10));

      setIsLoaded(true);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
    finally {
      setIsLoading(false);
    }
  }, [onHandleSetUpcomings]);

  useEffect(() => {
    fetchMovieUpcoming();
  }, [fetchMovieUpcoming]);

  return (
    <>
      <SectionHeadingTitle {...objHeading} />

      {(upcomings.length > 0 && isLoaded) && (
        <section className="flex snap-x overflow-scroll gap-4 mb-5 z-9">
          {upcomings.map((item, idx) => (
            <CardContentItem
              key={idx}
              type="movie"
              {...item}
            />
          ))}
        </section>
      )}
      {(!upcomings.length && isLoading) && (
        <LoaderCardContentItem />
      )}
      {(!upcomings.length && isLoaded) && (
        <EmptyData />
      )}
    </>
  )
}