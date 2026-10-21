export default function SectionWatermark() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 bg-white mask-[url('/images/logo-white.svg')] [mask-size:contain] mask-center mask-no-repeat opacity-5"
    />
  )
}
