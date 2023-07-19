import { useAppSelector } from "@/redux/hooks";
import { arrayStringToTextString, formatDate, isValidDate } from "@/utils/app";

export default function InfoTitle () {
  const tvSeriesDetail = useAppSelector((state) => state.tvSeriesReducer.tvSeriesDetail);

  return (
    <>
      <section className="text-center py-5">
        <h3 className="text-lg text-[#01b4e4]">
          {tvSeriesDetail.name}
        </h3>
      </section>

      <section className="text-center justify-center items-center py-5 bg-[#102845]">
        <p className="text-white">
          {isValidDate(tvSeriesDetail.first_air_date) ? formatDate(tvSeriesDetail.first_air_date) : '-'}
        </p>
        <p className="text-white font-light">
          {arrayStringToTextString(tvSeriesDetail.genres, 'name')}
        </p>
      </section>
    </>
  )
}