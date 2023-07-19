interface IProps {
  isFullWidth?: boolean
}

export default function LoaderCardContentItem(props: IProps) {
  const { isFullWidth = false } = props;

  return (
    <section className="flex snap-x overflow-scroll gap-4 mb-5 z-9">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
        <div
          key={item}
          className={
            (!isFullWidth ? 'w-5/12' : 'w-full') +
            ' snap-start flex-shrink-0 relative p-2 bg-white rounded-lg overflow-hidden shadow hover:shadow-md rounded-lg'
          }
        >
          <div className="animate-pulse flex flex-col">
            <div className="rounded w-full h-40 bg-gray-200"></div>
            <div className="flex flex-col mt-5">
              <div className="w-full h-5 bg-gray-200 rounded"></div>
              <div className="mt-2 w-10/12 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}