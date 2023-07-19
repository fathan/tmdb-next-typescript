import CardDetailInfo from '@/components/CardDetailInfo';
import { useAppSelector } from '@/redux/hooks';
import { arrayStringToTextString, numberToDollar } from '@/utils/app';

export default function InfoList () {
  const moviesDetail = useAppSelector((state) => state.moviesReducer.moviesDetail);

  return (
    <section className="p-4 border-t-2 border-gray-500">
      <CardDetailInfo
        title="Status"
        content={moviesDetail.status}
      />
      <CardDetailInfo
        title="Original Language"
        content={moviesDetail.original_language}
      />
      <CardDetailInfo
        title="Budget"
        content={numberToDollar(moviesDetail.budget)}
      />
      <CardDetailInfo
        title="Revenue"
        content={numberToDollar(moviesDetail.revenue)}
      />
      <CardDetailInfo
        title="Production Countries"
        content={arrayStringToTextString(moviesDetail.production_countries, 'name')}
      />
    </section>
  )
}