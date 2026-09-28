"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

export default function HeroImage() {
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0

    function updatePosition() {
      frame = 0
      const image = imageRef.current
      if (!image) return
      image.style.transform = reducedMotion.matches
        ? ""
        : `translate3d(0, ${Math.max(0, Math.min(window.scrollY, window.innerHeight)) * 0.18}px, 0)`
    }

    function requestUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updatePosition)
    }

    updatePosition()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)
    reducedMotion.addEventListener("change", requestUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      reducedMotion.removeEventListener("change", requestUpdate)
    }
  }, [])

  return (
    <div ref={imageRef} className="absolute inset-0">
      <Image
        src="/capital.jpg"
        alt="United States Capitol seen from the west lawn"
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[40%] bg-linear-to-b from-black/55 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-black/70 to-transparent"
      />
    </div>
  )
}
