export default function Custom404 () {
  return (
    <>
      <div className="flex flex-col text-center items-center py-60">
        <div className="text-[#01b4e4] font-bold text-7xl">
          404
        </div>
        <div className="font-bold text-white text-3xl mt-5">
          This page does not exist
        </div>
        <div className="text-gray-400 font-medium text-lg mt-4">
          The page you are looking for could not be found.
        </div>
      </div>
    </>
  )
}