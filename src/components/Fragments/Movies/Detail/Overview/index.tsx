import CardDetailInfo from '@/components/CardDetailInfo';
import { useAppSelector } from '@/redux/hooks';

export default function Overview () {
  const moviesDetail = useAppSelector((state) => state.moviesReducer.moviesDetail);

  return (
    <section className="p-4">
      <p className="italic text-white mb-4">
        {moviesDetail.tagline}
      </p>

      <CardDetailInfo
        title="Overview"
        content={moviesDetail.overview}
      />
    </section>
  )
}