import SectionListHeaderTitle from "@/components/Fragments/Home/SectionListHeaderTitle";
import SectionListAiringToday from "@/components/Fragments/Tv/List/SectionListAiringToday";
import SectionListPopular from "@/components/Fragments/Tv/List/SectionListPopular";
import SectionListTopRated from "@/components/Fragments/Tv/List/SectionListTopRated";

export default function Tv () {
  return (
    <div className="">
      <section className="mb-5">
        <SectionListHeaderTitle title="TV Shows Series" type="tv" />

        <div className="p-4">
          <SectionListAiringToday />
          <SectionListPopular />
          <SectionListTopRated />
        </div>
      </section>
    </div>
  )
}
