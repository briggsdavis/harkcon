"use client"

import { useEffect, useRef } from "react"

export default function SubtleParallaxPhoto({
  className,
  label,
}: {
  className: string
  label: string
}) {
  const photoRef = useRef<HTMLDivElement>(null)

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
      photo.style.setProperty("--parallax-y", `${(progress - 0.5) * 42}px`)
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
  }, [])

  return (
    <div ref={photoRef} className={`parallax-photo ${className}`} role="img" aria-label={label} />
  )
}
