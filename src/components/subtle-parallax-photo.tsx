"use client"
import { useEffect, useMemo, useRef } from "react"
import { useEditingMode } from "./editing-mode"

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
  const editing = useEditingMode()
  const photoRef = useRef<HTMLDivElement>(null)
  const backgroundStyle = useMemo(
    () => (src ? { backgroundImage: `url("${src}")` } : undefined),
    [src],
  )

  useEffect(() => {
    if (editing) return
    const photo = photoRef.current
    if (!photo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let previousOffset: string | undefined

    const update = () => {
      frame = 0
      const rect = photo.getBoundingClientRect()
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
      )
      const offset = `${(progress - 0.5) * strength}px`
      if (offset !== previousOffset) {
        photo.style.setProperty("--parallax-y", offset)
        previousOffset = offset
      }
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
  }, [strength, editing])

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
