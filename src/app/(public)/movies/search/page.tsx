'use client';

import { useCallback, useEffect, useState } from 'react';
import qs from 'qs';

import CardContentItem from "@/components/CardContentItem";

import { setMovies, reset } from "@/redux/features/moviesSlice";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import MoviesService from '@/services/httpRequest/movies';
import { IHeading } from '@/@types/types';
import SectionHeadingTitle from '@/components/SectionHeadingTitle';
import EmptyData from '@/components/EmptyData';
import LoadingPage from '@/components/LoadingPage';

export default function SearchMovies () {
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.moviesReducer.movies);
  
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const objHeading: IHeading = {
    title: 'Search Movies Results',
    link: ''
  };

   // /////////////////////////////////

   const onHandleSetMovies = useCallback((results: Array<any>): void => {
    if (page === 1) {
      dispatch(setMovies(results));
      setPage((prevPage) => prevPage + 1);
    } 
    else {
      dispatch(setMovies([...movies, ...results]));
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, movies, dispatch]);

  // /////////////////////////////////

  const fetchMoviesSearch = useCallback(async (): Promise<void> => {
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

      const response = await MoviesService.getSearch(queryParam);
      onHandleSetMovies(response.data.results);

      setIsLoaded(true);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
    finally {
      setIsLoading(false);
    }
  }, [page, onHandleSetMovies]);

  // /////////////////////////////////

  const onHandleLoadMore = (): void => {
    fetchMoviesSearch();
  };

  useEffect(() => {
    dispatch(reset());
    fetchMoviesSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  
  return (
    <>
      <div className="p-4">
        {(movies.length > 0 && isLoaded) && (
          <div>
            <SectionHeadingTitle {...objHeading} />

            <section className="grid grid-cols-2 gap-4 mb-5">
              {movies.map((item, idx) => (
                <CardContentItem
                  key={idx}
                  type="movie"
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

        {(!movies.length && isLoading) && (
          <LoadingPage />
        )}

        {(!movies.length && isLoaded) && (
          <EmptyData />
        )}
      </div>
    </>
  )
}