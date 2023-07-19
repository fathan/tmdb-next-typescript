import { useAppSelector } from "@/redux/hooks";
import { arrayStringToTextString, formatDate, isValidDate } from "@/utils/app";

export default function InfoTitle () {
  const moviesDetail = useAppSelector((state) => state.moviesReducer.moviesDetail);

  return (
    <>
      <section className="text-center py-5">
        <h3 className="text-lg text-[#01b4e4]">
          {moviesDetail.title}
        </h3>
      </section>

      <section className="text-center justify-center items-center py-5 bg-[#102845]">
        <p className="text-white">
          {isValidDate(moviesDetail.release_date) ? formatDate(moviesDetail.release_date) : '-'}
        </p>
        <p className="text-white font-light">
          {arrayStringToTextString(moviesDetail.genres, 'name')}
        </p>
      </section>
    </>
  )
}