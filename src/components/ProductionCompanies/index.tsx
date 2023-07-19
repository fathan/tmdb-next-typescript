import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";

interface ProductionCompaniesProps {
  type: 'movie' | 'tv';
}

export default function ProductionCompanies (props: ProductionCompaniesProps) {
  const {
    type
  } = props;

  const moviesDetail = useAppSelector((state) => state.moviesReducer.moviesDetail);
  const tvSeriesDetail = useAppSelector((state) => state.tvSeriesReducer.tvSeriesDetail);

  const TMDB_IMAGE_ASSET_URL: string = process.env.NEXT_PUBLIC_TMDB_ASSET_IMAGE_URL;

  return (
    <section className="p-4 py-6 bg-[#102845]">
      <div className="flex flex-col">
        <div className="mb-5">
          <span className="text-sm font-bold mb-2 text-[#01b4e4] border-l-4 border-[#2e6b3f] pl-2">
            Production Companies
          </span>
        </div>

        <div className="flex snap-x overflow-scroll gap-4">
          {(type === 'movie' ? moviesDetail : tvSeriesDetail).production_companies.map((item, idx) => (
            item.logo_path !== null ? (
              <div key={idx} className="bg-white rounded-lg flex items-center p-2 w-3/12 snap-start flex-shrink-0">
                <Image
                  src={`${TMDB_IMAGE_ASSET_URL}/original${item.logo_path}`}
                  width={500}
                  height={500}
                  alt="Production Countries"
                  loading="lazy"
                />
              </div>
            ) : ''
          ))}
        </div>
      </div>
    </section>
  )
}