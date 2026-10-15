"use client"

import { useEffect, useMemo, useRef } from "react"

export default function SubtleParallaxPhoto({
  src,
  sizeClassName = "bg-cover",
  label,
  strength = 42,
}: {
  src?: string
  sizeClassName?: string
  label: string
  strength?: number
}) {
  const photoRef = useRef<HTMLDivElement>(null)
  const backgroundStyle = useMemo(
    () => (src ? { backgroundImage: `url("${src}")` } : undefined),
    [src],
  )

  useEffect(() => {
    const photo = photoRef.current
    if (!photo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0

    const update = () => {
      frame = 0
      const rect = photo.getBoundingClientRect()
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
      )
      photo.style.setProperty("--parallax-y", `${(progress - 0.5) * strength}px`)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [strength])

  return (
    <div
      ref={photoRef}
      className={`h-full w-full bg-[position:50%_calc(50%+var(--parallax-y,0px))] bg-no-repeat will-change-[background-position] ${sizeClassName}`}
      style={backgroundStyle}
    >
      <span className="sr-only">{label}</span>
    </div>
  )
}
