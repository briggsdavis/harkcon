"use client"

import { useEffect, useRef, useState } from "react"

const careersUrl =
  "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=15aa7385-7aee-410b-90e3-5972b600f083&ccId=19000101_000001&type=JS&lang=en_US&selectedMenuKey=CurrentOpenings"

export default function CareersPositionsEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setShouldLoad(true)
        observer.disconnect()
      },
      { threshold: 0.01 },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!shouldLoad || !iframe) return

    let lastVisitorPosition = window.scrollY
    let guardActive = true

    const rememberVisitorPosition = () => {
      if (document.activeElement !== iframe) lastVisitorPosition = window.scrollY
    }

    const preventInitialFocusJump = () => {
      if (!guardActive) return

      requestAnimationFrame(() => {
        if (Math.abs(window.scrollY - lastVisitorPosition) < 120) return
        iframe.blur()
        window.scrollTo({ top: lastVisitorPosition, behavior: "instant" })
      })
    }

    const finishGuarding = () => {
      window.setTimeout(() => {
        guardActive = false
      }, 1000)
    }

    window.addEventListener("scroll", rememberVisitorPosition, { passive: true })
    iframe.addEventListener("focus", preventInitialFocusJump)
    iframe.addEventListener("load", finishGuarding)

    return () => {
      guardActive = false
      window.removeEventListener("scroll", rememberVisitorPosition)
      iframe.removeEventListener("focus", preventInitialFocusJump)
      iframe.removeEventListener("load", finishGuarding)
    }
  }, [shouldLoad])

  return (
    <div ref={containerRef} className="positions-embed">
      {shouldLoad ? (
        <iframe
          ref={iframeRef}
          src={careersUrl}
          title="Harkcon available positions"
          tabIndex={-1}
        />
      ) : (
        <div className="positions-embed-placeholder" aria-hidden="true" />
      )}
    </div>
  )
}
