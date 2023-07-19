'use client'

import HeroBanner from '@/components/HeroBanner';
import InfoTitle from '@/components/Fragments/Tv/Detail/InfoTitle';
import Overview from '@/components/Fragments/Tv/Detail/Overview';
import CurrentSeason from '@/components/Fragments/Tv/Detail/CurrentSeason';
import InfoList from '@/components/Fragments/Tv/Detail/InfoList';
import ProductionCompanies from '@/components/ProductionCompanies';

import { useAppDispatch } from '@/redux/hooks';
import { useCallback, useEffect } from 'react';
import TvSeriesServices from '@/services/httpRequest/tv_series';
import { setTvSeriesDetail } from '@/redux/features/tvSeriesSlice';
import { ITVSeriesDetail } from '@/@types/types';

export default function TvDetail ({ params }: { params: { id: number } }) {
  const dispatch = useAppDispatch();

  const onHandleSetDetail = useCallback((results: ITVSeriesDetail): void => {
    dispatch(setTvSeriesDetail(results));
  }, [dispatch]);

  const fetchDetailData = useCallback(async (): Promise<void> => {
    try {
      const id: number = params.id
      const response = await TvSeriesServices.getDetail(id);
      onHandleSetDetail(response.data);
    }
    catch (error) {
      console.error('Error fetching:', error);
    }
  }, [params.id, onHandleSetDetail]);

  useEffect(() => {
    fetchDetailData();
  }, [fetchDetailData]);

  return (
    <>
      <div>
        <HeroBanner type="tv" />
        <InfoTitle />
        <Overview />
        <CurrentSeason />
        <InfoList />
        <ProductionCompanies type='tv' />
      </div>
    </>
  )
}