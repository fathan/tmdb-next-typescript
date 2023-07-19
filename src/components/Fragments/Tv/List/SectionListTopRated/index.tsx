'use client';

import SectionHeadingTitle from "@/components/SectionHeadingTitle";
import CardContentItem from "@/components/CardContentItem";

import { IHeading } from "@/@types/types";

import { setTopRateds } from "@/redux/features/tvSeriesSlice";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useCallback, useEffect, useState } from 'react';
import TvSeriesService from '@/services/httpRequest/tv_series';
import LoaderCardContentItem from "@/components/SkeletonLoader/LoaderCardContentItem";
import EmptyData from "@/components/EmptyData";

export default function SectionListTopRated () {
  const topRateds = useAppSelector((state) => state.tvSeriesReducer.topRateds);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const objHeading: IHeading = {
    title: 'Top Rated',
    link: '/tv/top-rated'
  };

  const onHandleSetTopRateds = useCallback((results: Array<any>) => {
    dispatch(setTopRateds(results));
  }, [dispatch]);

  const fetchTvSeriesTopRated = useCallback(async () => {
    setIsLoading(true);

    try {
      const queryParam = '?page=1'
      const response = await TvSeriesService.getTopRated(queryParam);
      onHandleSetTopRateds(response.data.results.slice(0, 10));

      setIsLoaded(true);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
    finally {
      setIsLoading(false);
    }
  }, [onHandleSetTopRateds]);

  useEffect(() => {
    fetchTvSeriesTopRated();
  }, [fetchTvSeriesTopRated]);

  return (
    <>
      <SectionHeadingTitle {...objHeading} />

      {(topRateds.length > 0 && isLoaded) && (
        <section className="flex snap-x overflow-scroll gap-4 mb-5 z-9">
          {topRateds.map((item, idx) => (
            <CardContentItem
              key={idx}
              type="tv"
              {...item}
            />
          ))}
        </section>
      )}
      {(!topRateds.length && isLoading) && (
        <LoaderCardContentItem />
      )}
      {(!topRateds.length && isLoaded) && (
        <EmptyData />
      )}
    </>
  )
}