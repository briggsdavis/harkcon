"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"

type Phase = "idle" | "covering" | "covered" | "uncovering"

const TransitionContext = createContext<(href: string) => void>(() => {})

const clip = {
  idle: "[clip-path:inset(100%_0_0_0)]",
  covering: "[clip-path:inset(0_0_0_0)]",
  covered: "[clip-path:inset(0_0_0_0)]",
  uncovering: "[clip-path:inset(0_0_100%_0)]",
}

export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>("idle")
  const target = useRef<string | null>(null)
  const busy = useRef(false)

  useEffect(() => {
    if (phase !== "covered" || !target.current) return
    const destination = new URL(target.current, window.location.origin)
    let positionFrame = 0
    let revealFrame = 0
    let revealTimer = 0
    const fallback = window.setTimeout(() => window.location.assign(target.current!), 8000)

    if (pathname === destination.pathname) {
      positionFrame = window.requestAnimationFrame(() => {
        const anchor =
          destination.hash && document.getElementById(decodeURIComponent(destination.hash.slice(1)))
        if (anchor) anchor.scrollIntoView({ behavior: "instant" })
        else window.scrollTo({ top: 0, behavior: "instant" })
        revealFrame = window.requestAnimationFrame(() => {
          revealTimer = window.setTimeout(() => setPhase("uncovering"), 160)
        })
      })
    }

    return () => {
      window.clearTimeout(fallback)
      window.clearTimeout(revealTimer)
      window.cancelAnimationFrame(positionFrame)
      window.cancelAnimationFrame(revealFrame)
    }
  }, [phase, pathname])

  function navigate(href: string) {
    if (busy.current) return
    busy.current = true
    target.current = href
    setPhase("covering")
  }

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <div
        aria-hidden="true"
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget || event.propertyName !== "clip-path") return
          if (phase === "covering") {
            document.documentElement.setAttribute("data-page-transition", "")
            setPhase("covered")
            router.push(target.current!, { scroll: false })
          } else if (phase === "uncovering") {
            document.documentElement.removeAttribute("data-page-transition")
            setPhase("idle")
            target.current = null
            busy.current = false
          }
        }}
        className={`fixed inset-0 z-100 flex items-center justify-center bg-brand-transition ${clip[phase]} ${phase === "idle" ? "pointer-events-none transition-none" : "transition-[clip-path] duration-600 ease-in-out"}`}
      >
        <Image src="/logo-navy.svg" alt="" width={80} height={80} preload className="size-20" />
      </div>
    </TransitionContext.Provider>
  )
}

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onNavigate"> & {
  href: string
}

export function TransitionLink({ href, ...props }: TransitionLinkProps) {
  const navigate = useContext(TransitionContext)

  return (
    <Link
      {...props}
      href={href}
      onNavigate={(event) => {
        const destination = new URL(href, window.location.href)
        if (
          destination.origin !== window.location.origin ||
          destination.pathname === window.location.pathname ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return
        event.preventDefault()
        navigate(destination.pathname + destination.search + destination.hash)
      }}
    />
  )
}
