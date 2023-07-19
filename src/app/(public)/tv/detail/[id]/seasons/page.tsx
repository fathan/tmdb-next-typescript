'use client';

import SeasonListItem from '@/components/Fragments/Tv/Detail/Seasons/SeasonListItem';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import TvSeriesServices from '@/services/httpRequest/tv_series';
import { setTvSeriesDetail } from '@/redux/features/tvSeriesSlice';
import { ITVSeriesDetail } from '@/@types/types';
import { getYearFromDate } from '@/utils/app';
import Image from 'next/image';

export default function Seasons ({ params }: { params: { id: number } }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tvSeriesDetail = useAppSelector((state) => state.tvSeriesReducer.tvSeriesDetail);

  const TMDB_IMAGE_ASSET_URL: string = process.env.NEXT_PUBLIC_TMDB_ASSET_IMAGE_URL;

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
    if (tvSeriesDetail.id === null) {
      fetchDetailData();
    }
  }, [tvSeriesDetail.id, fetchDetailData]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-4 pt-6 gap-4">
        <div className="w-2/12">
          <Image
            src={`${TMDB_IMAGE_ASSET_URL}/original${tvSeriesDetail.poster_path}`}
            width={500}
            height={500}
            alt="Picture"
            loading="lazy"
            className="rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <p className="mb-3 text-xl text-white">
            {tvSeriesDetail.name} ({getYearFromDate(tvSeriesDetail.first_air_date)})
          </p>
          <p
            className="text-white text-lg"
            onClick={() => router.back()}  
          >
            Back to main
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        {tvSeriesDetail.seasons.map((item, idx) => (
          <SeasonListItem
            key={idx}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}