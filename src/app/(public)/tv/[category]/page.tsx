'use client';

import { useCallback, useEffect, useState } from 'react';

import SectionHeadingTitle from "@/components/SectionHeadingTitle";
import CardContentItem from "@/components/CardContentItem";
import { IHeading } from '@/@types/types';

import { setAiringTodays, setPopulars, setTopRateds } from "@/redux/features/tvSeriesSlice";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import TvSeriesService from '@/services/httpRequest/tv_series';

import * as Constant from '@/utils/constants';

export default function TvCategory ({ params }: { params: { category: string } }) {
  const dispatch = useAppDispatch();

  const airingTodays = useAppSelector((state) => state.tvSeriesReducer.airingTodays);
  const populars = useAppSelector((state) => state.tvSeriesReducer.populars);
  const topRateds = useAppSelector((state) => state.tvSeriesReducer.topRateds);

  const [page, setPage] = useState(1);

  const objHeading: IHeading = {
    title: '-',
    link: ''
  };

  // /////////////////////////////////

  switch (params.category) {
    case 'airing-today':
      objHeading.title = 'Airing Today';
      break;
    case 'popular':
      objHeading.title = 'Popular';
      break;
    case 'top-rated':
      objHeading.title = 'Top Rated';
      break;
    default:
      objHeading.title = '-';
  }

  // /////////////////////////////////

  const onHandleSetAiringTodays = useCallback((results: Array<any>): void => {
    if (page === 1) {
      dispatch(setAiringTodays(results));
      setPage((prevPage) => prevPage + 1);
    }
    else {
      dispatch(setAiringTodays([...airingTodays, ...results]));
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, dispatch, airingTodays]);
  
  const onHandleSetPopulars = useCallback((results: Array<any>): void => {
    if (page === 1) {
      dispatch(setPopulars(results));
      setPage((prevPage) => prevPage + 1);
    }
    else {
      dispatch(setPopulars([...populars, ...results]));
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, dispatch, populars]);
  
  const onHandleSetTopRateds = useCallback((results: Array<any>): void => {
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

  const fetchTvAiringToday = useCallback(async (): Promise<void> => {
    try {
      const queryParam = `?page=${page}`
      const response = await TvSeriesService.getAiringToday(queryParam);
      onHandleSetAiringTodays(response.data.results);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
  }, [page, onHandleSetAiringTodays]);

  const fetchTvSeriesPopular = useCallback(async (): Promise<void> => {
    try {
      const queryParam = `?page=${page}`
      const response = await TvSeriesService.getPopular(queryParam);
      onHandleSetPopulars(response.data.results);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
  }, [page, onHandleSetPopulars]);
  
  const fetchTvSeriesTopRateds = useCallback(async (): Promise<void> => {
    try {
      const queryParam = `?page=${page}`
      const response = await TvSeriesService.getTopRated(queryParam);
      onHandleSetTopRateds(response.data.results);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
  }, [page, onHandleSetTopRateds]);

  // /////////////////////////////////

  const onHandleLoadMore = (): void => {
    if (params.category === Constant.TYPE_TV_SERIES_AIRING_TODAY) {
      fetchTvAiringToday();
    }
    else if (params.category === Constant.TYPE_TV_SERIES_POPULAR) {
      fetchTvSeriesPopular();
    }
    else if (params.category === Constant.TYPE_TV_SERIES_TOP_RATED) {
      fetchTvSeriesTopRateds();
    }
  }

  const tvSeries = () => {
    if (params.category === Constant.TYPE_TV_SERIES_AIRING_TODAY)
      return (airingTodays.map((item, idx) => <CardContentItem key={idx} type="tv" isFullWidth {...item} />))
    else if (params.category === Constant.TYPE_TV_SERIES_POPULAR)
      return (populars.map((item, idx) => <CardContentItem key={idx} type="tv" isFullWidth {...item} />))
    else if (params.category === Constant.TYPE_TV_SERIES_TOP_RATED)
      return (topRateds.map((item, idx) => <CardContentItem key={idx} type="tv" isFullWidth {...item} />))
  }

  useEffect(() => {
    if (params.category === Constant.TYPE_TV_SERIES_AIRING_TODAY) {
      fetchTvAiringToday();
    }
    else if (params.category === Constant.TYPE_TV_SERIES_POPULAR) {
      fetchTvSeriesPopular();
    }
    else if (params.category === Constant.TYPE_TV_SERIES_TOP_RATED) {
      fetchTvSeriesTopRateds();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.category]);
  
  return (
    <>
      <div className="p-4">
        <SectionHeadingTitle {...objHeading} />

        <section className="grid grid-cols-2 gap-4 mb-5">
          {tvSeries()}
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