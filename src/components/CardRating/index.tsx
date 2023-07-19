import IconRating from '@/components/Icon/Rating';

interface CardRatingProps {
  average?: number | string
}

export default function CardRating ({average}: CardRatingProps) {
  return (
    <div className="bg-black py-1 px-2 lg:px-3 rounded-md flex flex-row">
      <div className="mr-2">
        <IconRating />
      </div>
      <div>
        <span className="text-xs lg:text-sm font-bold text-white">
          {average}
        </span>
      </div>
    </div>
  )
}