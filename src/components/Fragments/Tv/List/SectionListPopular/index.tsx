'use client';

import SectionHeadingTitle from "@/components/SectionHeadingTitle";
import CardContentItem from "@/components/CardContentItem";

import { IHeading } from "@/@types/types";

import { setPopulars } from "@/redux/features/tvSeriesSlice";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useCallback, useEffect, useState } from 'react';
import TvSeriesService from '@/services/httpRequest/tv_series';
import LoaderCardContentItem from "@/components/SkeletonLoader/LoaderCardContentItem";
import EmptyData from "@/components/EmptyData";

export default function SectionListPopular () {
  const populars = useAppSelector((state) => state.tvSeriesReducer.populars);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const objHeading: IHeading = {
    title: 'Popular',
    link: '/tv/popular'
  };

  const onHandleSetPopulars = useCallback((results: Array<any>) => {
    dispatch(setPopulars(results));
  }, [dispatch]);

  const fetchTvSeriesPopular = useCallback(async () => {
    setIsLoading(true);

    try {
      const queryParam = '?page=1'
      const response = await TvSeriesService.getPopular(queryParam);
      onHandleSetPopulars(response.data.results.slice(0, 10));

      setIsLoaded(true);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
    finally {
      setIsLoading(false);
    }
  }, [onHandleSetPopulars]);

  useEffect(() => {
    fetchTvSeriesPopular();
  }, [fetchTvSeriesPopular]);

  return (
    <>
      <SectionHeadingTitle {...objHeading} />

      {(populars.length > 0 && isLoaded) && (
        <section className="flex snap-x overflow-scroll gap-4 mb-5 z-9">
          {populars.map((item, idx) => (
            <CardContentItem
              key={idx}
              type="tv"
              {...item}
            />
          ))}
        </section>
      )}
      {(!populars.length && isLoading) && (
        <LoaderCardContentItem />
      )}
      {(!populars.length && isLoaded) && (
        <EmptyData />
      )}
    </>
  )
}