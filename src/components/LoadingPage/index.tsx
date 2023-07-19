export default function LoadingPage () {
  return (
    <div className="flex flex-col my-8 items-center justify-center py-60">
      <div className="lds-ripple">
        <div />
        <div />
      </div>
      <div>
        <span className="text-[#01b4e4] text-lg">
          Please wait ...
        </span>
      </div>
    </div>
  )
}