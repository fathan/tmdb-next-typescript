'use client';

import { FaFilm, FaTv, FaFilter } from "react-icons/fa6";
import Search from '@/components/Search';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsShowSearch, reset } from "@/redux/features/searchSlice";
import { TMediaCategoryMovies, TMediaCategoryTv } from "@/@types/types";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface SectionHeadingTitleProps {
  type: TMediaCategoryMovies | TMediaCategoryTv,
  title: string
}

export default function SectionListHeadingTitle (props: SectionHeadingTitleProps) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const isShowSearch = useAppSelector((state) => state.searchReducer.isShowSearch);
  
  const { type, title } = props;

  const onHandleVisibilitySearch = () => {
    if (isShowSearch) {
      dispatch(setIsShowSearch(false));
    }
    else {
      dispatch(setIsShowSearch(true));
    }
  }

  useEffect(() => {
    dispatch(reset());
    dispatch(setIsShowSearch(false));
  }, [dispatch]);

  return (
    <div className="mb-3">
      <div className="text-[#01b4e4]">
        <div className="p-4 w-full flex flex-row justify-between">
          <div className="flex flex-row">
            {
              type === 'movies' ? 
              (<FaFilm className="mt-1 mr-3" />) : 
              (<FaTv className="mt-1 mr-3" />)
            }
            <h1 className="font-bold text-lg mb-2">
              {title}
            </h1>
          </div>
          
          {pathname !== '/' && (
            <div
              className="flex flex-row text-white justify-center mt-1 cursor-pointer"
              onClick={onHandleVisibilitySearch}
            >
              <span className="mr-2">Filter</span>
              <FaFilter className="mt-1" />
            </div>
          )}
        </div>
      </div>
      <hr className="border border-[#091e36]" />
      
      {pathname !== '/' && (
        <Search type={type} />
      )}
    </div>
  )
}