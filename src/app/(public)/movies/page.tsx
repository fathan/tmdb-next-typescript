import SectionListHeaderTitle from "@/components/Fragments/Home/SectionListHeaderTitle";
import SectionListNowPlaying from "@/components/Fragments/Movies/List/SectionListNowPlaying";
import SectionListUpcoming from "@/components/Fragments/Movies/List/SectionListUpcoming";
import SectionListTopRated from "@/components/Fragments/Movies/List/SectionListTopRated";

export default function Movies () {
  return (
    <div className="">
      <section className="mb-5">
        <SectionListHeaderTitle title="Movies" type="movies" />

        <div className="p-4">
          <SectionListNowPlaying />
          <SectionListUpcoming />
          <SectionListTopRated />
        </div>
      </section>
    </div>
  )
}
