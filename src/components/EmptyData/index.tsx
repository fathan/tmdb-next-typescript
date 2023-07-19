import { FaFaceFrown } from "react-icons/fa6";

export default function EmptyData () {
  return (
    <>
      <div className="flex flex-col items-center py-52">
        <div className="mb-5">
          <FaFaceFrown className="text-7xl text-[#01b4e4]" />
        </div>
        <div className="text-[#01b4e4] font-bold text-3xl">
          No results found
        </div>
        <div className="font-bold text-[#90cea1] text-2xl mt-5 text-center">
          We couldn&apos;t find what you searched for. Try searching again.
        </div>
      </div>
    </>
  )
}