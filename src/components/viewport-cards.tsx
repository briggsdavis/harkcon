"use client"

import { useEffect, useRef, type ReactNode } from "react"

/** Touch layouts use the viewport center as their hover target. */
export default function ViewportCards({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)")
    let frame = 0
    const update = () => {
      frame = 0
      const cards = Array.from(
        root.current?.querySelectorAll<HTMLElement>("[data-center-card]") ?? [],
      )
      const center = window.innerHeight / 2
      let closest: HTMLElement | undefined
      let distance = Infinity
      if (media.matches)
        for (const card of cards) {
          const rect = card.getBoundingClientRect()
          const delta = Math.abs(rect.top + rect.height / 2 - center)
          if (rect.bottom > center && rect.top < center && delta < distance) {
            closest = card
            distance = delta
          }
        }
      for (const card of cards) card.dataset.centerActive = String(card === closest)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    const observer = new ResizeObserver(schedule)
    if (root.current) observer.observe(root.current)
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    media.addEventListener("change", schedule)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      media.removeEventListener("change", schedule)
    }
  }, [])
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  )
}
