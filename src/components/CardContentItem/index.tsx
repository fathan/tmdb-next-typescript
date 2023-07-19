'use client';

import Image from 'next/image';
import CardRating from '@/components/CardRating';
import Link from 'next/link';
import { formatDate, roundingNumberAverage } from '@/utils/app';
import NoImage from '@/assets/images/no-image.png';

const defaultIsFullWidth = false;

interface CardContentItemProps {
  type: 'movie' | 'tv';
  id?: number;
  vote_average?: number | string | undefined;
  name?: string;
  title?: string;
  release_date: string;
  first_air_date: string;
  poster_path?: string;
  isFullWidth?: boolean;
}

export default function CardContentItem (props: CardContentItemProps) {
  const {
    type,
    id,
    vote_average,
    name,
    title,
    release_date,
    first_air_date,
    poster_path,
    isFullWidth = defaultIsFullWidth
  } = props;

  const TMDB_IMAGE_ASSET_URL: string = process.env.NEXT_PUBLIC_TMDB_ASSET_IMAGE_URL;

  const linkPath = (): string => {
    let result = '';

    if (type === 'movie') {
      return `/movies/detail/${id}`;
    }
    if (type === 'tv') {
      return `/tv/detail/${id}`;
    }

    return result;
  };
  
  return (
    <>
      <Link
        href={linkPath()}
        className={
          (!isFullWidth ? 'w-5/12' : 'w-full') +
          ' bg-white snap-start flex-shrink-0 rounded-lg shadow mb-1'
        }
      >
        <div className="relative gap-2 flex justify-center overflow-hidden rounded-t-lg">
          <div className="w-full overflow-hidden transform transition-transform duration-500 ease-in-out hover:scale-110">
            {poster_path !== null ? (
              <Image
                src={`${TMDB_IMAGE_ASSET_URL}/original${poster_path}`}
                width={500}
                height={500}
                alt="Picture"
              />
            ) : (
              <Image
                src={NoImage}
                width={500}
                height={500}
                alt="Picture"
              />
            )}
          </div>
          {/* <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/50 overlay-4" />
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-800" /> */}
          <div className="absolute left-2 top-2 z-10">
            <CardRating average={ roundingNumberAverage(vote_average)} />
          </div>
        </div>

        <div className="flex flex-col p-2 py-3">
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-[#01b4e4]">
              {(type === 'movie' ? title : name)}
            </h3>
          </div>
          <div>
            <p className="text-xs font-light text-gray-500">
              {(type === 'movie' ? (
                formatDate(release_date)
              ) : (
                formatDate(first_air_date)
              ))}
            </p>
          </div>
        </div>
      </Link>
    </>
  )
}