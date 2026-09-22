"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

type TransitionPhase = "idle" | "covering" | "covered" | "revealing"

export default function RouteTransition() {
  const pathname = usePathname()
  const router = useRouter()
  const previousPath = useRef(pathname)
  const blurPath = useRef(pathname)
  const phaseRef = useRef<TransitionPhase>("idle")
  const destination = useRef<string | null>(null)
  const [phase, setPhase] = useState<TransitionPhase>("idle")

  const beginTransition = useCallback((href: string) => {
    destination.current = href
    phaseRef.current = "covering"
    setPhase("covering")
  }, [])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        phase !== "idle"
      )
        return

      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest("a")
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return

      event.preventDefault()
      beginTransition(`${url.pathname}${url.search}${url.hash}`)
    }

    document.addEventListener("click", handleClick, true)
    return () => document.removeEventListener("click", handleClick, true)
  }, [beginTransition, phase])

  useEffect(() => {
    if (phase !== "covering") return
    const timer = window.setTimeout(() => {
      phaseRef.current = "covered"
      setPhase("covered")
      if (destination.current) router.push(destination.current)
    }, 900)
    return () => window.clearTimeout(timer)
  }, [phase, router])

  useEffect(() => {
    if (blurPath.current === pathname) return
    blurPath.current = pathname

    const restoreNavBlur = () => document.body.classList.remove("nav-blur-suspended")

    document.body.classList.add("nav-blur-suspended")
    window.addEventListener("pointermove", restoreNavBlur, { once: true, passive: true })

    return () => window.removeEventListener("pointermove", restoreNavBlur)
  }, [pathname])

  useEffect(
    () => () => {
      document.body.classList.remove("nav-blur-suspended")
    },
    [],
  )

  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    if (phaseRef.current !== "covered") return

    const holdTimer = window.setTimeout(() => {
      phaseRef.current = "revealing"
      setPhase("revealing")
    }, 500)
    const resetTimer = window.setTimeout(() => {
      destination.current = null
      phaseRef.current = "idle"
      setPhase("idle")
    }, 1450)
    return () => {
      window.clearTimeout(holdTimer)
      window.clearTimeout(resetTimer)
    }
  }, [pathname])

  return (
    <div
      className={`page-transition page-transition--${phase}`}
      aria-hidden="true"
      data-reveal-skip
    >
      <div className="page-transition-curtain" />
      <div className="page-transition-mark">
        <Image
          src="/images/harkcon-favicon.png"
          alt=""
          width={102}
          height={102}
          className="page-transition-logo"
          priority
        />
      </div>
    </div>
  )
}
