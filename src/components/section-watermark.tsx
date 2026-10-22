export default function SectionWatermark() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 [clip-path:inset(0)]">
      <span className="absolute top-1/2 left-1/2 block aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 bg-white mask-[url('/images/logo-white.svg')] [mask-size:contain] mask-center mask-no-repeat opacity-5 lg:fixed" />
    </div>
  )
}
