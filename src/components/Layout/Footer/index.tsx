import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <nav className="w-full bg-[#071626] border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between p-4">
          <span className="text-white text-xs sm:text-sm">
            TMDB API By - 
            <Link
              href="https://github.com/fathan"
              target="_blank"
              className="text-[#01b4e4]"
            >
              &nbsp;Fathan Rohman&nbsp;
            </Link>
            - Build with ❤
          </span>
        </div>
      </nav>
    </div>
  )
}