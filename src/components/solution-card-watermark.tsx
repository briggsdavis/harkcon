export default function SolutionCardWatermark() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-[opacity,clip-path] duration-900 ease-[cubic-bezier(0.45,0,0.2,1)] [clip-path:inset(0_100%_0_0)] group-hover:opacity-10 group-hover:[clip-path:inset(0)] group-focus-visible:opacity-10 group-focus-visible:[clip-path:inset(0)] motion-reduce:transition-none"
    >
      <span className="absolute top-1/2 left-1/2 aspect-square h-[85%] max-h-[260px] -translate-x-1/2 -translate-y-1/2 bg-[#8b8e96] mask-[url('/images/logo-white.svg')] [mask-size:contain] mask-center mask-no-repeat" />
    </span>
  )
}
