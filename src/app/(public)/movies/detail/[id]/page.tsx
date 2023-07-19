'use client';

import HeroBanner from '@/components/HeroBanner';
import InfoTitle from '@/components/Fragments/Movies/Detail/InfoTitle';
import Overview from '@/components/Fragments/Movies/Detail/Overview';
import InfoList from '@/components/Fragments/Movies/Detail/InfoList';
import ProductionCompanies from '@/components/ProductionCompanies';

import { useAppDispatch } from '@/redux/hooks';
import { useCallback, useEffect } from 'react';
import MoviesService from '@/services/httpRequest/movies';
import { setMoviesDetail } from '@/redux/features/moviesSlice';
import { IMovieDetail } from '@/@types/types';

export default function MovieDetail ({ params }: { params: { id: number } }) {
  const dispatch = useAppDispatch();

  const onHandleSetDetail = useCallback((result: IMovieDetail): void => {
    dispatch(setMoviesDetail(result));
  }, [dispatch]);

  const fetchDetailData = useCallback(async (): Promise<void> => {
    try {
      const id: number = params.id
      const response = await MoviesService.getDetail(id);
      onHandleSetDetail(response.data);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
  }, [params.id, onHandleSetDetail]);

  useEffect(() => {
    fetchDetailData();
  }, [fetchDetailData, dispatch]);

  return (
    <>
      <div>
        <HeroBanner type="movie" />
        <InfoTitle />
        <Overview />
        <InfoList />
        <ProductionCompanies type='movie' />
      </div>
    </>
  )
}