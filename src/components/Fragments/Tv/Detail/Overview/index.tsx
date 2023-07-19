import CardDetailInfo from '@/components/CardDetailInfo';
import { useAppSelector } from '@/redux/hooks';
import { arrayStringToTextString } from '@/utils/app';

export default function Overview () {
  const tvSeriesDetail = useAppSelector((state) => state.tvSeriesReducer.tvSeriesDetail);

  return (
    <section className="p-4 py-6">
      <p className="italic text-white mb-4">
        {tvSeriesDetail.tagline}
      </p>

      <CardDetailInfo
        title="Overview"
        content={tvSeriesDetail.overview}
      />

      <div className='mt-10'>
        <h3 className="text-white">
          {arrayStringToTextString(tvSeriesDetail.created_by, 'name')}
        </h3>
      </div>
    </section>
  )
}