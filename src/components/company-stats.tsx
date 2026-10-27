"use client"
import { useEffect, useRef, useState } from "react"

export default function CompanyStats() {
  const root = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setProgress(1)
          return
        }
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1800, 1)
          setProgress(1 - Math.pow(1 - t, 3))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )
    if (root.current) observer.observe(root.current)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])
  return (
    <section
      ref={root}
      aria-label="Harkcon in numbers"
      className="bg-white py-16 md:py-20"
      data-reveal-skip
    >
      <div className="site-gutter grid gap-12 text-center md:grid-cols-3 md:gap-8">
        {[
          [Math.round(3422 * progress).toLocaleString("en-US"), "3,422", "Contracts executed"],
          [`$${(20.2 * progress).toFixed(1)}M`, "$20.2 million", "Revenue over the past 20 years"],
          [`${Math.round(40 * progress)}+`, "40+", "Government agencies worked with"],
        ].map(([value, final, label]) => (
          <div key={label}>
            <p className="font-header text-[clamp(2.75rem,5vw,5.5rem)] leading-tight font-medium tracking-[-0.04em] text-[#0d132d]">
              <span aria-hidden="true">{value}</span>
              <span className="sr-only">{final}</span>
            </p>
            <p className="mt-4 text-sm text-[#5f626b]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
