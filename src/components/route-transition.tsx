"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

type TransitionPhase = "idle" | "covering" | "covered" | "revealing"

export default function RouteTransition() {
  const pathname = usePathname()
  const router = useRouter()
  const previousPath = useRef(pathname)
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
    }, 675)
    return () => window.clearTimeout(timer)
  }, [phase, router])

  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    if (phaseRef.current !== "covered") return

    const holdTimer = window.setTimeout(() => {
      phaseRef.current = "revealing"
      setPhase("revealing")
    }, 132)
    const resetTimer = window.setTimeout(() => {
      destination.current = null
      phaseRef.current = "idle"
      setPhase("idle")
    }, 900)
    return () => {
      window.clearTimeout(holdTimer)
      window.clearTimeout(resetTimer)
    }
  }, [pathname])

  const transitionClassName = "duration-675 ease-[cubic-bezier(0.76,0,0.24,1)]"
  const curtainClassName = {
    idle: "translate-y-[101%]",
    covering: `translate-y-0 transition-transform ${transitionClassName}`,
    covered: "translate-y-0",
    revealing: `-translate-y-[101%] transition-transform ${transitionClassName}`,
  }[phase]
  const markClassName = {
    idle: "[clip-path:inset(100%_0_0_0)]",
    covering: `[clip-path:inset(0)] transition-[clip-path] ${transitionClassName}`,
    covered: `[clip-path:inset(0)] transition-[clip-path] ${transitionClassName}`,
    revealing: `[clip-path:inset(0_0_100%_0)] transition-[clip-path] ${transitionClassName}`,
  }[phase]

  return (
    <div
      className={`fixed inset-0 z-[100] isolate grid place-items-center ${phase === "idle" ? "pointer-events-none" : "pointer-events-auto"}`}
      aria-hidden="true"
      data-reveal-skip
    >
      <div className={`absolute inset-0 bg-[#f4f3f0] will-change-transform ${curtainClassName}`} />
      <div
        className={`relative grid h-28 w-28 place-items-center overflow-hidden bg-[#0d132d] will-change-[clip-path] sm:h-32 sm:w-32 ${markClassName}`}
      >
        <Image
          src="/images/transition-logo-white.svg"
          alt=""
          width={40}
          height={40}
          className="block h-20 w-20 object-contain sm:h-24 sm:w-24"
          priority
        />
      </div>
    </div>
  )
}
