import Link from "next/link";

interface HeadingTitleProps {
  title: string,
  link: string
}

export default function SectionHeadingTitle ({ title, link }: HeadingTitleProps) {
  return (
    <div className="flex flex-row justify-between mb-4">
      <div>
        <h3 className="text-base font-bold text-[#90cea1]">
          {title}
        </h3>
      </div>

      {link !== '' ? (
        <div>
          <Link href={link} className="text-sm text-[#01b4e4]">
            See All
          </Link>
        </div>
      ) : ''}
    </div>
  )
}