import { ISeasons } from '@/@types/types';
import CardRating from '@/components/CardRating';
import { getYearFromDate, roundingNumberAverage } from '@/utils/app';
import Image from 'next/image';

export default function SeasonListItem (props: ISeasons) {
  const TMDB_IMAGE_ASSET_URL: string = process.env.NEXT_PUBLIC_TMDB_ASSET_IMAGE_URL;

  const {
    air_date,
    episode_count,
    name,
    overview,
    poster_path,
    vote_average,
  } = props;

  return (
    <div className="flex flex-col border-b border-[#102845]">
      <div className="bg-[#90cea1] p-3 py-6 flex flex-row gap-4">
        <div className="w-1/5">
          <Image
            src={`${TMDB_IMAGE_ASSET_URL}/original${poster_path}`}
            width={500}
            height={500}
            alt="Image Seasons"
            className="rounded-lg"
            loading="lazy"
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="flex flex-row mb-2">
            <h2 className="mr-2 justify-center text-xl text-[#153d4d]">
              {name}
            </h2>
            <CardRating average={roundingNumberAverage(vote_average)} />
          </div>
          <div>
            <span className="text-sm md:text-base text-[#153d4d]">
              {getYearFromDate(air_date)} | {episode_count} Episodes
            </span>
          </div>
          <div className="mt-5">
            <p className="text-[#153d4d] text-xs md:text-sm">
              {(overview !== '' ? overview : '-')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}