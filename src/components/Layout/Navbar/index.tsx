'use client';

import Image from "next/image";
import LogoTMDB from "@/assets/svg/logo-tmdb.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const currentRoute = usePathname();

  return (
    <div>
      <nav className="fixed w-full max-w-[500px] 5:block bg-[#071626] border-gray-200 dark:bg-gray-900 z-9999">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
            <Image
              src={LogoTMDB}
              className="h-4 sm:h-8 mr-3"
              width={150}
              height={150}
              alt="TMDB"
            />
          </Link>

          <div>
            <Link
              href="/"
              className={
                currentRoute === '/' 
                ? 'text-white text-xs sm:text-sm mr-2 bg-[#01b4e4] p-2 py-1 rounded-sm'
                : 'text-white text-xs sm:text-sm mr-2'
              }
            >
              Home
            </Link>
            <Link
              href="/movies"
              className={
                currentRoute === '/movies' 
                ? 'text-white text-xs sm:text-sm mr-2 bg-[#01b4e4] p-2 py-1 rounded-sm'
                : 'text-white text-xs sm:text-sm mr-2'
              }
            >
              Movies
            </Link>
            <Link
              href="/tv"
              className={
                currentRoute === '/tv' 
                ? 'text-white text-xs sm:text-sm mr-2 bg-[#01b4e4] p-2 py-1 rounded-sm'
                : 'text-white text-xs sm:text-sm mr-2'
              }
            >
              TV Shows
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}