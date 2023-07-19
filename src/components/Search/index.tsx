'use client';

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSelector } from "react-redux";
import { setIncludeAdult, setYear, setQuery, setIsShowSearch, reset } from "@/redux/features/searchSlice";
import { getYearOptions } from "@/utils/app";
import { TMediaCategoryMovies, TMediaCategoryTv, TIncludeAdult } from "@/@types/types";
import { useRouter } from "next/navigation";
import * as Constant from '@/utils/constants';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SearchProps {
  type: TMediaCategoryMovies | TMediaCategoryTv
}

interface IIncludeAdultOptions {
  label: string;
  value: TIncludeAdult;
}

export default function Search (props: SearchProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { type } = props;

  const isShowSearch = useAppSelector((state) => state.searchReducer.isShowSearch);
  const {
    include_adult,
    year,
    query
  } = useSelector(
    (state: any) => state.searchReducer
  );

  const yearOptions: number[] = getYearOptions(1960, 2023);
  const includeAdultOptions: Array<IIncludeAdultOptions> = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '2' }
  ]

  // //////////////////////////////

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'query') {
      dispatch(setQuery(value));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'year') {
      dispatch(setYear(value));
    }
    else if (name === 'include_adult') {
      dispatch(setIncludeAdult(value as TIncludeAdult));
    }
  };

  const validateSearch = (): boolean => {
    let result = true;
    let queryLabel = '';

    if (query === '') {
      if (type === 'movies') queryLabel = 'Movie Title';
      else queryLabel = 'TV Series Name';

      toast.dismiss();
      toast
        .error(`${ queryLabel } is required!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

      result = false;
    }

    return result;
  };

  const onHandleSubmitSearch = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!validateSearch()) {
      return;
    }
    
    let params = {
      year: year,
      include_adult: include_adult,
      q: query
    };

    const searchParams = new URLSearchParams(params).toString();

    if (type === Constant.TYPE_MOVIES) {
      router.push(`/movies/search?${searchParams}`);
    }
    else if (type === Constant.TYPE_TV) {
      router.push(`/tv/search?${searchParams}`);
    }

    dispatch(reset());
    dispatch(setIsShowSearch(false));
  };


  return (
    isShowSearch && (
      <>
        <form onSubmit={onHandleSubmitSearch} className="bg-[#102845] p-4">
          <div className="grid gap-6 mb-6 grid-cols-2">
            <div>
              <label
                htmlFor="year"
                className="block mb-2 text-sm font-medium text-[#90cea1]"
              >
                Year
              </label>
              <select
                id="year"
                name="year"
                className="bg-[#01b4e4] border border-[#01b4e4] text-[#102845] text-sm rounded-lg focus:ring-[#01b4e4] focus:border-[#01b4e4] block w-full p-2.5"
                value={year}
                onChange={handleSelectChange}
              >
                {yearOptions.map((year, idx) => (
                  <option key={idx} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="include_adult"
                className="block mb-2 text-sm font-medium text-[#90cea1]"
              >
                Include Adult
              </label>
              <select
                id="include_adult"
                name="include_adult"
                className="bg-[#01b4e4] border border-[#01b4e4] text-[#102845] text-sm rounded-lg focus:ring-[#01b4e4] focus:border-[#01b4e4] block w-full p-2.5"
                value={include_adult}
                onChange={handleSelectChange}
              >
                {includeAdultOptions.map((item, idx) => (
                  <option key={idx} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-6 mb-6 grid-cols-1">
            <div>
              <label
                htmlFor="query"
                className="block mb-2 text-sm font-medium text-[#90cea1]"
              >
                {
                  (type === 'movies' ? 
                  (<span> Movie Title</span>) : 
                  (<span> TV Series Name</span>))
                }
              </label>
              <input
                type="text"
                id="query"
                name="query"
                className="bg-[#01b4e4] border border-[#01b4e4] text-[#102845] text-sm rounded-lg focus:ring-[#01b4e4] focus:border-[#01b4e4] block w-full p-2.5"
                placeholder=""
                value={query}
                onChange={handleInputChange}
              />
            </div>

            <section>
              <button
                type="submit"
                className="w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
              >
                Search
              </button>
            </section>     
          </div>
        </form>

        <ToastContainer />
      </>
    )
  )
}