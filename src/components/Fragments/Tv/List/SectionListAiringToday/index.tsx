'use client';

import SectionHeadingTitle from "@/components/SectionHeadingTitle";
import CardContentItem from "@/components/CardContentItem";

import { IHeading } from "@/@types/types";

import { setAiringTodays } from "@/redux/features/tvSeriesSlice";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useCallback, useEffect, useState } from 'react';
import TvSeriesService from '@/services/httpRequest/tv_series';
import LoaderCardContentItem from "@/components/SkeletonLoader/LoaderCardContentItem";
import EmptyData from "@/components/EmptyData";

export default function SectionListUpcoming () {
  const airingTodays = useAppSelector((state) => state.tvSeriesReducer.airingTodays);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const objHeading: IHeading = {
    title: 'Airing Today',
    link: '/tv/airing-today'
  };

  const onHandleSetAiringTodays = useCallback((results: Array<any>) => {
    dispatch(setAiringTodays(results));
  }, [dispatch]);

  const fetchTvSeries = useCallback(async () => {
    setIsLoading(true);

    try {
      const queryParam = '?page=1'
      const response = await TvSeriesService.getAiringToday(queryParam);
      onHandleSetAiringTodays(response.data.results.slice(0, 10));

      setIsLoaded(true);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
    finally {
      setIsLoading(false);
    }
  }, [onHandleSetAiringTodays]);

  useEffect(() => {
    fetchTvSeries();
  }, [fetchTvSeries]);

  return (
    <>
      <SectionHeadingTitle {...objHeading} />

      {(airingTodays.length > 0 && isLoaded) && (
        <section className="flex snap-x overflow-scroll gap-4 mb-5 z-9">
          {airingTodays.map((item, idx) => (
            <CardContentItem
              key={idx}
              type="tv"
              {...item}
            />
          ))}
        </section>
      )}
      {(!airingTodays.length && isLoading) && (
        <LoaderCardContentItem />
      )}
      {(!airingTodays.length && isLoaded) && (
        <EmptyData />
      )}
    </>
  )
}