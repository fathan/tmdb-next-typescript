'use client';

import CardRating from '@/components/CardRating';
import { useAppSelector } from '@/redux/hooks';
import { formatDate, roundingNumberAverage } from '@/utils/app';
import { useRouter } from 'next/navigation';

export default function CurrentSeason () {
  const router = useRouter();

  const tvSeriesDetail = useAppSelector((state) => state.tvSeriesReducer.tvSeriesDetail);
  const lastIndex = tvSeriesDetail.seasons.length - 1;
  const lastSeason =  tvSeriesDetail.seasons[lastIndex];

  const handleClick = () => {
    router.push(`/tv/detail/${tvSeriesDetail.id}/seasons`);
  };

  if (typeof lastSeason !== 'undefined') {
    return (
      <section className="p-4 py-8 bg-[#102845]">
        <div className="flex flex-col">
          <div className="mb-5">
            <span className="text-xl font-bold mb-2 text-[#01b4e4] border-l-4 border-[#2e6b3f] pl-2">
              Current Season
            </span>
          </div>
  
          <div className="bg-[#01b4e4] p-3 flex flex-col rounded-lg">
            <div className="flex flex-row mb-2">
              <h2 className="mr-4 text-3xl text-[#153d4d]">
                {lastSeason.name}
              </h2>
              <CardRating average={ roundingNumberAverage(lastSeason.vote_average) } />
            </div>
            <div>
              <span className="text-base text-[#153d4d]">
                {formatDate(lastSeason.air_date)} | {lastSeason.episode_count} Episodes
              </span>
            </div>
            <div className="mt-5">
              <p className="text-sm text-[#153d4d]">
                {lastSeason.overview}
              </p>
            </div>
            <div className="mt-10">
              <button
                className="bg-[#90cea1] p-2 px-6 text-[#2e6b3f] rounded-md hover:bg-[#78c28c] text-base"
                onClick={handleClick}
              >
                View All Season
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}