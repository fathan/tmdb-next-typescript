interface CardDetailInfoProps {
  title: string,
  content: string | number | null
}

export default function CardDetailInfo ({ title, content }: CardDetailInfoProps) {
  return (
    <div className="flex flex-col mb-4">
      <div>
        <span className="text-sm font-bold mb-2 text-[#01b4e4]">
          {title}
        </span>
      </div>
      <div>
        <p className="text-xs lg:text-sm text-white font-light">
          {content}
        </p>
      </div>
    </div>
  )
}