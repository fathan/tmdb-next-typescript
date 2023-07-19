import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';

interface HeroBannerProps {
  type: 'movie' | 'tv';
}

export default function HeroBanner (props: HeroBannerProps) {
  const {
    type
  } = props;

  const moviesDetail = useAppSelector((state) => state.moviesReducer.moviesDetail);
  const tvSeriesDetail = useAppSelector((state) => state.tvSeriesReducer.tvSeriesDetail);

  const TMDB_IMAGE_ASSET_URL: string = process.env.NEXT_PUBLIC_TMDB_ASSET_IMAGE_URL;

  return (
    <section className="relative">
      <div
        style={{
          height: '250px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '',
          backgroundImage: `url(${TMDB_IMAGE_ASSET_URL}/original${
            (type === 'movie' ? moviesDetail.backdrop_path : tvSeriesDetail.backdrop_path)
          })`
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundImage: 'linear-gradient(to right, rgb(13 43 78) 20%, rgba(32, 32, 74, 0) 50%)'
        }} />

        <Image
          src={`${TMDB_IMAGE_ASSET_URL}/original${
            (type === 'movie' ? moviesDetail.poster_path : tvSeriesDetail.poster_path)
          }`}
          style={{
            position: 'absolute',
            top: '30px',
            left: '20px',
            width: '130px',
            height: 'auto',
            borderRadius: '10px',
            zIndex: 4
          }}
          width={500}
          height={500}
          alt="Picture"
          loading="lazy"
        />
      </div>
    </section>
  )
}