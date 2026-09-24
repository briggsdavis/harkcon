"use client"

import Lenis from "lenis"
import { useEffect } from "react"

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      anchors: {
        duration: 4.05,
        easing: (progress) => 1 - Math.pow(1 - progress, 4),
      },
      autoRaf: true,
      duration: 0.318,
      easing: (progress) => 1 - Math.pow(1 - progress, 3),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.88,
      prevent: (node) => Boolean(node.closest(".mobile-nav")),
    })

    return () => lenis.destroy()
  }, [])

  return null
}
