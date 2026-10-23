"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

export default function HeroParallaxImage({
  src,
  alt,
  imageClassName,
}: {
  src: string
  alt: string
  imageClassName: string
}) {
  const mediaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = mediaRef.current
    if (!media || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0

    const update = () => {
      frame = 0
      const heroHeight = media.parentElement?.offsetHeight ?? window.innerHeight
      const progress = Math.min(Math.max(window.scrollY, 0), heroHeight)
      media.style.setProperty("--page-hero-parallax", `${progress * 0.15}px`)
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
    <div
      ref={mediaRef}
      className="absolute -top-[16%] right-0 -bottom-[16%] left-0 translate-y-(--page-hero-parallax) will-change-transform"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        unoptimized={src.startsWith("http")}
        quality={85}
        sizes="(max-width: 1920px) 1920px, 100vw"
        className={imageClassName}
      />
    </div>
  )
}
