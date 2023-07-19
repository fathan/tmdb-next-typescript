'use client';

import { useCallback, useEffect, useState } from 'react';
import qs from 'qs';

import CardContentItem from "@/components/CardContentItem";

import { setTvSeries, reset } from "@/redux/features/tvSeriesSlice";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import TvSeriesService from '@/services/httpRequest/tv_series';
import SectionHeadingTitle from '@/components/SectionHeadingTitle';
import { IHeading } from '@/@types/types';
import EmptyData from '@/components/EmptyData';
import LoadingPage from '@/components/LoadingPage';

export default function SearchTv () {
  const dispatch = useAppDispatch();
  const tvSeries = useAppSelector((state) => state.tvSeriesReducer.tvSeries);
  
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [page, setPage] = useState(1);

  const objHeading: IHeading = {
    title: 'Search TV Series Results',
    link: ''
  };

  const onHandleSetTvSeries = useCallback((results: Array<any>): void => {
    if (page === 1) {
      dispatch(setTvSeries(results));
      setPage((prevPage) => prevPage + 1);
    } 
    else {
      dispatch(setTvSeries([...tvSeries, ...results]));
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, dispatch, tvSeries]);

  // /////////////////////////////////

  const fetchTvSeriesSearch = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      let queryParam = `?page=${page}`;

      const url = window.location.href;
      const [, params] = url.split('?');
      const parsedParams = qs.parse(params);

      if (typeof parsedParams.include_adult !== 'undefined') {
        if (parsedParams.include_adult === '1') {
          queryParam += `&include_adult=true`;
        }
        else {
          queryParam += `&include_adult=false`;
        }
      }
      if (typeof parsedParams.year !== 'undefined') {
        queryParam += `&year=${parsedParams.year}`;
      }
      if (typeof parsedParams.q !== 'undefined') {
        queryParam += `&query=${parsedParams.q}`;
      }

      const response = await TvSeriesService.getSearch(queryParam);
      onHandleSetTvSeries(response.data.results);

      setIsLoaded(true);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
    finally {
      setIsLoading(false);
    }
  }, [page, onHandleSetTvSeries]);

  // /////////////////////////////////

  const onHandleLoadMore = (): void => {
    fetchTvSeriesSearch();
  };

  useEffect(() => {
    dispatch(reset());
    fetchTvSeriesSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  
  return (
    <>
      <div className="p-4">
        {tvSeries.length > 0 && (
          <div>
            <SectionHeadingTitle {...objHeading} />

            <section className="grid grid-cols-2 gap-4 mb-5">
              {tvSeries.map((item, idx) => (
                <CardContentItem
                  key={idx}
                  type="tv"
                  isFullWidth {...item}
                />
              ))}
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
        )}

        {(!tvSeries.length && isLoading) && (
          <LoadingPage />
        )}

        {(!tvSeries.length && isLoaded) && (
          <EmptyData />
        )}
      </div>
    </>
  )
}