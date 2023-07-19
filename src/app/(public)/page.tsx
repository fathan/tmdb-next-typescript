import SectionListHeaderTitle from "@/components/Fragments/Home/SectionListHeaderTitle";
import SectionListNowPlaying from "@/components/Fragments/Movies/List/SectionListNowPlaying";
import SectionListUpcoming from "@/components/Fragments/Movies/List/SectionListUpcoming";
import SectionListTopRated from "@/components/Fragments/Movies/List/SectionListTopRated";
import SectionListAiringToday from "@/components/Fragments/Tv/List/SectionListAiringToday";

export default function Home () {
  return (
    <div className="">
      <SectionListHeaderTitle title="Movies" type="movies" />
      <section className="p-4 mb-5">
        <SectionListNowPlaying />
        <SectionListUpcoming />
        <SectionListTopRated />
      </section>

      <SectionListHeaderTitle title="TV Shows Series" type="tv" />
      <section className="p-4 mb-5">
        <SectionListAiringToday />
      </section>
    </div>
  )
}
