"use client"

import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  LinkedinLogo,
  Minus,
  Plus,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react"
import Image from "next/image"
import Link from "next/link"
import { FocusEvent, useCallback, useEffect, useRef, useState } from "react"
import FeaturedNews from "~/components/featured-news"

const statement =
  "Harkcon is committed to providing customized, comprehensive performance management and technology solutions that improve people and organizational performance at all levels."

const solutionLinks = [
  {
    title: "Workforce & Organizational Analysis",
    href: "/solutions/workforce-organizational-analysis",
  },
  {
    title: "Training & Human Systems Integration",
    href: "/solutions/training-human-systems-integration",
  },
  {
    title: "Process Improvement & Transformation",
    href: "/solutions/process-improvement-transformation",
  },
  {
    title: "Policy, Strategy, & Program Support",
    href: "/solutions/policy-strategy-program-support",
  },
  {
    title: "International Advisory & Capacity Building",
    href: "/solutions/international-advisory-capacity-building",
  },
  {
    title: "Administrative & Compliance Support",
    href: "/solutions/administrative-compliance-support",
  },
  {
    title: "Emergency Management & Continuity Support",
    href: "/solutions/emergency-management-continuity-support",
  },
]

const socialLinkClassName =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white/80 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0d132d] focus-visible:border-white focus-visible:bg-white focus-visible:text-[#0d132d] focus-visible:outline-none"

const clientLogos = [
  {
    name: "Bureau of Safety and Environmental Enforcement",
    src: "/images/bsee-logo.jpg",
  },
  { name: "Cellebrite", src: "/images/cellebrite-logo.webp" },
  { name: "Conservation International", src: "/images/conservation-international-logo.webp" },
  { name: "U.S. Department of Justice", src: "/images/justice-department-logo.webp" },
  {
    name: "U.S. Department of Homeland Security",
    src: "/images/homeland-security-logo.png",
  },
  { name: "Florida State University", src: "/images/florida-state-university-logo.jpeg" },
  { name: "Liquid Robotics", src: "/images/liquid-robotics-logo.png" },
  { name: "USAID", src: "/images/usaid-logo.webp" },
  { name: "Unisys Federal", src: "/images/unisys-federal-logo.webp" },
  { name: "United States Coast Guard", src: "/images/coast-guard-logo.png" },
  { name: "U.S. Customs and Border Protection", src: "/images/customs-border-protection-logo.png" },
  {
    name: "Defense Threat Reduction Agency",
    src: "/images/defense-threat-reduction-logo.png",
  },
  { name: "U.S. Department of Commerce", src: "/images/commerce-department-logo.webp" },
  { name: "U.S. Department of State", src: "/images/state-department-logo.webp" },
  {
    name: "U.S. Department of Veterans Affairs",
    src: "/images/veterans-affairs-logo.webp",
  },
  { name: "Office of Personnel Management", src: "/images/personnel-management-logo.png" },
  { name: "Thrive", src: "/images/thrive-logo.jpeg" },
  {
    name: "Transportation Security Administration",
    src: "/images/transportation-security-logo.jpeg",
  },
  { name: "U.S. Fire Administration", src: "/images/us-fire-administration-logo.webp" },
  { name: "WildAid Marine Program", src: "/images/wildaid-marine-logo.png" },
]

const solutions = [
  {
    number: "01",
    color: "#ff334f",
    title: "Workforce & Organizational Analysis",
    href: solutionLinks[0].href,
    detail: "Readiness, staffing, and actionable workforce strategy.",
  },
  {
    number: "02",
    color: "#246bff",
    title: "Training & Human Systems Integration",
    href: solutionLinks[1].href,
    detail: "High-impact learning built for mission effectiveness.",
  },
  {
    number: "03",
    color: "#ffc400",
    title: "Process Improvement & Transformation",
    href: solutionLinks[2].href,
    detail: "Modern operations that reduce risk and create momentum.",
  },
  {
    number: "04",
    color: "#16c172",
    title: "Policy, Strategy & Program Support",
    href: solutionLinks[3].href,
    detail: "Clear direction for complex programs and decisions.",
  },
  {
    number: "05",
    color: "#a23cff",
    title: "International Advisory & Capacity Building",
    href: solutionLinks[4].href,
    detail: "Stronger partnerships and operational readiness abroad.",
  },
  {
    number: "06",
    color: "#ff7a1a",
    title: "Emergency Management & Continuity",
    href: solutionLinks[6].href,
    detail: "Preparedness that protects mission-critical functions.",
  },
]

export function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean
  className?: string
}) {
  return diagonal ? (
    <ArrowUpRight aria-hidden="true" className={`h-5 w-5 ${className}`} />
  ) : (
    <ArrowRight aria-hidden="true" className={`h-5 w-5 ${className}`} />
  )
}

const navLinkClassName =
  "relative py-2 text-action opacity-85 transition-opacity after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:opacity-100 hover:after:scale-x-100 focus-visible:after:scale-x-100"

const mobileNavLinkClassName =
  "flex items-center justify-between border-b border-white/15 py-4 text-lg"

export function Header({ initialSurface = "dark" }: { initialSurface?: "dark" | "light" }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [headerVisible, setHeaderVisible] = useState(true)
  const solutionsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const openSolutions = useCallback(() => {
    if (solutionsCloseTimer.current) clearTimeout(solutionsCloseTimer.current)
    setSolutionsOpen(true)
  }, [])
  const closeSolutions = useCallback(() => {
    if (solutionsCloseTimer.current) clearTimeout(solutionsCloseTimer.current)
    setSolutionsOpen(false)
  }, [])
  const scheduleSolutionsClose = useCallback(() => {
    if (solutionsCloseTimer.current) clearTimeout(solutionsCloseTimer.current)
    solutionsCloseTimer.current = setTimeout(() => setSolutionsOpen(false), 280)
  }, [])
  const toggleMobileSolutions = useCallback(() => setMobileSolutionsOpen((open) => !open), [])
  const handleSolutionsBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setSolutionsOpen(false)
  }, [])

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const currentY = window.scrollY
      const delta = currentY - lastY

      if (currentY <= 24) {
        setAtTop(true)
        setHeaderVisible(true)
      } else {
        setAtTop(false)
        if (menuOpen || solutionsOpen) {
          setHeaderVisible(true)
        } else if (delta > 5 && currentY > 120) {
          setHeaderVisible(false)
          setSolutionsOpen(false)
        } else if (delta < -5) {
          setHeaderVisible(true)
        }
      }

      lastY = currentY
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [menuOpen, solutionsOpen])

  useEffect(
    () => () => {
      if (solutionsCloseTimer.current) clearTimeout(solutionsCloseTimer.current)
    },
    [],
  )

  const expanded = solutionsOpen || menuOpen
  const darkSurface = (atTop && initialSurface === "dark") || expanded
  const menuButtonLight = !menuOpen && (!atTop || initialSurface === "light")
  const surfaceClassName = expanded
    ? "bg-[#0d132d] text-white shadow-none"
    : atTop
      ? initialSurface === "dark"
        ? "text-white"
        : "text-[#0d132d]"
      : "bg-white text-[#0d132d] shadow-[0_8px_30px_rgba(13,19,45,0.08)]"

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-30 ${surfaceClassName} ${headerVisible || expanded ? "" : "-translate-y-[105%]"}`}
    >
      <div className="site-gutter flex h-24 items-center justify-between">
        <Link href="/" aria-label="Harkcon home" className="block shrink-0">
          <Image
            src={
              darkSurface ? "/images/harkcon-logo-white.avif" : "/images/harkcon-logo-black.avif"
            }
            alt=""
            width={336}
            height={86}
            className="h-auto w-[155px] sm:w-[180px]"
            priority
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex xl:gap-8">
          <Link className={navLinkClassName} href="/about">
            About
          </Link>
          <Link className={navLinkClassName} href="/news-insights">
            News
          </Link>
          <Link className={navLinkClassName} href="/contracts">
            Contracts
          </Link>
          <Link className={navLinkClassName} href="/careers">
            Careers
          </Link>
          <div
            className="flex h-24 items-center pb-px"
            onMouseEnter={openSolutions}
            onMouseLeave={scheduleSolutionsClose}
            onFocus={openSolutions}
            onBlur={handleSolutionsBlur}
          >
            <button
              type="button"
              className={`${navLinkClassName} flex items-center gap-2`}
              aria-expanded={solutionsOpen}
              aria-controls="solutions-mega-menu"
              onClick={openSolutions}
            >
              Solutions
              <span
                aria-hidden="true"
                className={`inline-flex transition-transform duration-300 ${solutionsOpen ? "rotate-180" : ""}`}
              >
                <Arrow />
              </span>
            </button>

            <div
              id="solutions-mega-menu"
              className={`mega-menu absolute top-24 right-0 left-0 overflow-hidden border-t border-white/15 bg-[#0d132d] ${solutionsOpen ? "pointer-events-auto max-h-[430px] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}
            >
              <div className="site-gutter grid min-h-[350px] grid-cols-[0.82fr_1.18fr] gap-16 py-10 xl:gap-24 xl:py-11">
                <div className="flex flex-col items-start border-r border-white/15 pr-16">
                  <p className="eyebrow text-white/55">Our solutions</p>
                  <p className="mt-7 max-w-md font-header text-xl leading-[1.25] tracking-[-0.02em] text-white">
                    Customized expertise that strengthens workforces, modernizes operations, and
                    improves mission performance at every level.
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="eyebrow text-white/55">Explore</p>
                  <div className="mt-5 grid gap-0">
                    {solutionLinks.map((solution) => (
                      <Link
                        key={solution.href}
                        href={solution.href}
                        onClick={closeSolutions}
                        className="group flex items-center gap-4 border-b border-white/15 py-2 font-header text-base leading-tight tracking-[-0.015em] text-white transition-colors hover:text-white/55 focus-visible:text-white/55 focus-visible:outline-none xl:text-[1.05rem]"
                      >
                        <Plus
                          aria-hidden="true"
                          className="h-4 w-4 text-white/50 transition-transform duration-300 group-hover:rotate-90 group-focus-visible:rotate-90"
                        />
                        {solution.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link
            className={`pill-button ml-2 ${darkSurface ? "pill-button--light" : ""}`}
            href="/contact"
          >
            Contact <Arrow />
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
          className={`flex h-11 w-11 flex-col items-center justify-center gap-2 rounded-full border lg:hidden ${menuButtonLight ? "border-[#0d132d]/35" : "border-white/40"}`}
        >
          <span
            className={`block h-px w-5 transition-transform duration-300 ${menuButtonLight ? "bg-[#0d132d]" : "bg-white"} ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-5 transition-transform duration-300 ${menuButtonLight ? "bg-[#0d132d]" : "bg-white"} ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-nav absolute top-24 right-0 left-0 flex max-h-[calc(100svh-6rem)] flex-col overflow-y-auto bg-[#0d132d] px-5 py-5 transition-all duration-300 sm:px-8 ${menuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`}
      >
        <Link href="/about" onClick={closeMenu} className={mobileNavLinkClassName}>
          About <Arrow diagonal />
        </Link>
        <Link href="/news-insights" onClick={closeMenu} className={mobileNavLinkClassName}>
          News <Arrow diagonal />
        </Link>
        <Link href="/contracts" onClick={closeMenu} className={mobileNavLinkClassName}>
          Contracts <Arrow diagonal />
        </Link>
        <Link href="/careers" onClick={closeMenu} className={mobileNavLinkClassName}>
          Careers <Arrow diagonal />
        </Link>
        <button
          type="button"
          className="flex w-full items-center justify-between border-b border-white/15 py-4 text-left text-lg"
          aria-expanded={mobileSolutionsOpen}
          aria-controls="mobile-solutions-list"
          onClick={toggleMobileSolutions}
        >
          Solutions{" "}
          {mobileSolutionsOpen ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}
        </button>
        <div
          id="mobile-solutions-list"
          className={`grid overflow-hidden pl-4 transition-all duration-500 ${mobileSolutionsOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          {solutionLinks.map((solution) => (
            <Link
              key={solution.href}
              href={solution.href}
              onClick={closeMenu}
              className="flex items-center justify-between border-b border-white/15 py-3 text-sm leading-snug text-white/70"
            >
              {solution.title}
            </Link>
          ))}
        </div>
        <Link
          href="/contact"
          onClick={closeMenu}
          className="mt-5 flex items-center justify-center gap-4 rounded-full border border-white bg-white px-6 py-3 text-sm font-medium text-[#0d132d]"
        >
          Contact <Arrow diagonal />
        </Link>
      </div>
    </header>
  )
}

function ClientMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const directionRef = useRef(1)

  useEffect(() => {
    const track = trackRef.current
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let lastY = window.scrollY
    let scrollFrame = 0
    let animationFrame = 0
    let lastTime = performance.now()
    let position = 0
    let velocity = 1

    const updateDirection = () => {
      scrollFrame = 0
      const currentY = window.scrollY
      if (Math.abs(currentY - lastY) > 3) {
        directionRef.current = currentY > lastY ? 1 : -1
        lastY = currentY
      }
    }

    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateDirection)
    }

    const animate = (time: number) => {
      const delta = Math.min(time - lastTime, 48)
      lastTime = time
      const halfWidth = track.scrollWidth / 2
      if (halfWidth > 0) {
        const easing = 1 - Math.exp(-delta / 260)
        velocity += (directionRef.current - velocity) * easing
        position = (position + (halfWidth / 48_000) * delta * velocity + halfWidth) % halfWidth
        track.style.transform = `translate3d(${-position}px, 0, 0)`
      }
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (scrollFrame) cancelAnimationFrame(scrollFrame)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  const repeatedLogos = ["first", "second"].flatMap((copy) =>
    clientLogos.map((logo) => [copy, logo] as const),
  )

  return (
    <section
      className="client-marquee bg-white py-10 md:py-12"
      aria-labelledby="client-marquee-title"
    >
      <div className="site-gutter mb-7 flex items-center justify-between gap-6">
        <p id="client-marquee-title" className="eyebrow">
          Trusted across missions
        </p>
        <p className="text-sm text-[#5f626b]">Organizations we have served</p>
      </div>
      <div className="marquee-viewport overflow-hidden">
        <div ref={trackRef} className="flex w-max items-center will-change-transform">
          {repeatedLogos.map(([copy, logo]) => (
            <div
              className="mr-6 flex h-24 w-44 shrink-0 items-center justify-center px-7 py-5 md:h-28 md:w-52"
              key={`${copy}-${logo.src}`}
              aria-hidden={copy === "second"}
            >
              <Image
                src={logo.src}
                alt={copy === "first" ? logo.name : ""}
                width={180}
                height={90}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Hero() {
  const mediaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = mediaRef.current
    if (!media || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0

    const update = () => {
      frame = 0
      const heroHeight = media.parentElement?.offsetHeight ?? window.innerHeight
      const progress = Math.min(Math.max(window.scrollY, 0), heroHeight)
      media.style.setProperty("--hero-parallax", `${progress * 0.24}px`)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      className="hero relative h-[100svh] max-h-[1050px] min-h-[650px] overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div
        ref={mediaRef}
        className="absolute -top-[24%] right-0 -bottom-[24%] left-0 translate-y-(--hero-parallax) will-change-transform"
      >
        <Image
          src="/images/capitol-hero.png"
          alt="The United States Capitol at sunrise"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="hero-overlay absolute inset-0 z-[1]" />
      <div className="site-gutter relative z-10 flex h-full items-end pb-12 md:pb-16">
        <div className="max-w-5xl text-white">
          <h1 id="hero-title" className="max-w-3xl font-header text-display font-medium">
            Better people.
            <br />
            Stronger missions.
          </h1>
          <div className="mt-7 flex items-center gap-4 pt-5 md:mt-9 md:pt-6" data-reveal-line>
            <p className="max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
              Purpose-built solutions for the organizations that serve us all.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScrollStatement() {
  const containerRef = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLParagraphElement>(null)
  const [visibleCharacters, setVisibleCharacters] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const element = statementRef.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const startTop = window.innerHeight * 0.86
      const centeredTop = window.innerHeight * 0.5 - rect.height * 0.5
      const progress = Math.min(
        1,
        Math.max(0, (startTop - rect.top) / Math.max(1, startTop - centeredTop)),
      )
      setVisibleCharacters(Math.round(progress * statement.length))
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
    <section
      ref={containerRef}
      className="flex min-h-[100vh] items-center py-[6.16rem] text-center md:py-[7.92rem]"
      aria-label="What Harkcon does"
    >
      <div className="site-gutter">
        <p className="eyebrow mb-10">What we do</p>
        <p
          ref={statementRef}
          className="mx-auto max-w-[1050px] font-header text-[clamp(1.65rem,2.55vw,2.75rem)] leading-[1.15] tracking-[-0.025em] text-[#c6c8cc]"
          aria-label={statement}
        >
          <span aria-hidden="true">
            {Array.from(statement).map((character, index) => (
              <span
                key={statement.slice(0, index + 1)}
                className={`transition-colors duration-120 ease-linear ${index < visibleCharacters ? "text-[#0d132d]" : ""}`}
              >
                {character}
              </span>
            ))}
          </span>
        </p>
      </div>
    </section>
  )
}

const footerNavLinkClassName =
  "w-fit text-sm leading-snug text-white/85 transition-colors hover:text-white/45 focus-visible:text-white/45 focus-visible:outline-none"
const footerBottomLinkClassName =
  "transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"

export function SiteFooter() {
  return (
    <footer id="site-footer" className="relative z-10 bg-[#0d132d] text-white">
      <div className="site-gutter">
        <div className="grid gap-14 py-20 sm:grid-cols-2 md:py-24 lg:grid-cols-[0.7fr_1.65fr_0.75fr_0.9fr] lg:gap-14 xl:gap-24 xl:py-28">
          <div>
            <Link
              href="/"
              aria-label="Harkcon home"
              className="block w-[4.25rem] overflow-hidden [--image-wipe-color:#0d132d]"
            >
              <Image
                src="/images/harkcon-logo-white.avif"
                alt=""
                width={336}
                height={86}
                className="h-[4.25rem] w-auto max-w-none"
              />
            </Link>
            <p className="mt-8 text-xs leading-tight font-semibold tracking-[0.08em] text-white/45 uppercase">
              People.
              <br />
              Performance.
              <br />
              Technology.
            </p>
          </div>

          <div>
            <p className="mb-7 text-xs tracking-[0.17em] text-white/45 uppercase">Solutions</p>
            <nav aria-label="Footer solutions navigation" className="grid items-start gap-3">
              {solutionLinks.map((solution) => (
                <Link
                  key={solution.href}
                  href={solution.href}
                  className={`${footerNavLinkClassName} max-w-md`}
                >
                  {solution.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-7 text-xs tracking-[0.17em] text-white/45 uppercase">Company</p>
            <nav aria-label="Footer company navigation" className="grid items-start gap-3">
              <Link href="/about" className={footerNavLinkClassName}>
                About
              </Link>
              <Link href="/news-insights" className={footerNavLinkClassName}>
                News
              </Link>
              <Link href="/contracts" className={footerNavLinkClassName}>
                Contracts
              </Link>
              <Link href="/contact" className={footerNavLinkClassName}>
                Contact
              </Link>
              <Link href="/careers" className={footerNavLinkClassName}>
                Careers
              </Link>
            </nav>
          </div>

          <div>
            <p className="mb-7 text-xs tracking-[0.17em] text-white/45 uppercase">Connect</p>
            <p className="text-lg leading-snug text-white/85">
              Have a complex mission?
              <br />
              Let&apos;s solve it together.
            </p>
            <Link
              href="/contact"
              className="animated-underline mt-8 flex w-fit items-center gap-4 pb-2 text-sm transition-colors hover:text-white/55"
            >
              Start a conversation <Arrow />
            </Link>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.youtube.com/@harkconinc"
                target="_blank"
                rel="noreferrer"
                className={socialLinkClassName}
                aria-label="Visit Harkcon on YouTube"
              >
                <YoutubeLogo aria-hidden="true" weight="fill" className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/harkcon"
                target="_blank"
                rel="noreferrer"
                className={socialLinkClassName}
                aria-label="Visit Harkcon on X"
              >
                <XLogo aria-hidden="true" weight="fill" className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/harkcon-inc./"
                target="_blank"
                rel="noreferrer"
                className={socialLinkClassName}
                aria-label="Visit Harkcon on LinkedIn"
              >
                <LinkedinLogo aria-hidden="true" weight="fill" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col gap-5 py-8 text-xs tracking-[0.04em] text-white/55 uppercase sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 md:py-10"
          data-reveal-line
        >
          {/* oxlint-disable-next-line react/purity -- The copyright year intentionally follows the current date. */}
          <span>© {new Date().getFullYear()} Harkcon, Inc.</span>
          <Link href="/privacy-terms" className={footerBottomLinkClassName}>
            Privacy & terms
          </Link>
          <a
            href="https://socialsatisfaction.agency/"
            target="_blank"
            rel="noreferrer"
            className={footerBottomLinkClassName}
          >
            Made by SocialSatisfaction
          </a>
          <a
            href="#top"
            className={`${footerBottomLinkClassName} flex items-center gap-3 sm:ml-auto`}
          >
            Back to top
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-sm"
            >
              <ArrowUp />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header />

      <div className="relative">
        <Hero />

        <ClientMarquee />

        <ScrollStatement />

        <section
          id="solutions"
          className="bg-white py-20 md:py-24 lg:py-28"
          aria-labelledby="solutions-title"
        >
          <div className="site-gutter">
            <div className="grid gap-16 lg:grid-cols-[minmax(230px,0.7fr)_minmax(0,2.3fr)] lg:gap-12 xl:gap-20">
              <div className="self-start lg:sticky lg:top-32">
                <h2
                  id="solutions-title"
                  className="max-w-sm font-header text-section-title font-medium"
                >
                  Our Solutions
                </h2>
                <p className="mt-7 max-w-sm text-base leading-relaxed text-[#5f626b]">
                  Integrated expertise that strengthens workforces, modernizes operations, and turns
                  complex challenges into lasting performance.
                </p>
              </div>

              <div className="grid gap-x-7 gap-y-0 md:grid-cols-2 xl:grid-cols-3">
                {solutions.map((solution) => (
                  <Link
                    href={solution.href}
                    key={solution.title}
                    className="group relative min-h-[310px] overflow-hidden px-5 py-7 text-[#0d132d] transition-colors duration-500 hover:text-white focus-visible:text-white focus-visible:outline-none md:min-h-[340px] md:px-6 md:py-8"
                    aria-label={`Learn about ${solution.title}`}
                    data-reveal-line
                  >
                    <span className="absolute inset-0 origin-left scale-x-0 bg-[#0d132d] transition-transform duration-900 ease-[cubic-bezier(0.45,0,0.2,1)] will-change-transform group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                    <div className="relative z-10 flex h-full flex-col transition-transform duration-700 group-hover:translate-x-2.5 group-focus-visible:translate-x-2.5">
                      <span className="mb-12 flex items-center gap-2.5 text-xs tracking-[0.16em] text-[#5f626b] transition-colors duration-700 group-hover:text-white/55">
                        <span
                          className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: solution.color }}
                        />
                        {solution.number}
                      </span>
                      <h3 className="max-w-sm font-header text-card-title font-medium">
                        {solution.title}
                      </h3>
                      <div className="mt-auto flex items-end gap-5 pt-10">
                        <p className="max-w-[15rem] text-sm leading-relaxed text-[#5f626b] transition-colors duration-700 group-hover:text-white/70">
                          {solution.detail}
                        </p>
                        <span className="ml-auto flex h-14 w-14 shrink-0 items-center justify-center bg-[#f4f3f0] transition-colors duration-500 group-hover:bg-white group-hover:text-[#0d132d]">
                          <Arrow
                            diagonal
                            className="transition-transform duration-600 ease-smooth group-hover:rotate-45 group-focus-visible:rotate-45"
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-y border-[#0d132d]/15 bg-white py-16 md:py-20"
          aria-labelledby="home-contracts-title"
        >
          <div className="site-gutter grid gap-12 md:grid-cols-2 md:gap-0">
            <div className="flex flex-col items-start md:pr-12 lg:pr-20">
              <p className="eyebrow mb-5 text-[#5f626b]">Contract access</p>
              <h2 id="home-contracts-title" className="font-header text-section-title font-medium">
                Contract vehicles
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#5f626b]">
                Flexible federal acquisition paths to Harkcon&apos;s people, performance, and
                technology expertise.
              </p>
              <Link href="/contracts" className="text-link mt-8" data-reveal-line>
                Explore contract vehicles <Arrow />
              </Link>
            </div>
            <div className="flex flex-col items-start border-t border-[#0d132d]/15 pt-12 md:border-t-0 md:border-l md:pt-0 md:pl-12 lg:pl-20">
              <p className="eyebrow mb-5 text-[#5f626b]">Best-in-Class access</p>
              <h3 className="font-header text-section-title font-medium">OASIS+</h3>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#5f626b]">
                Integrated professional services through Harkcon&apos;s Small Business and SDVOSB
                vehicles.
              </p>
              <Link href="/contracts?view=oasis-plus" className="text-link mt-8" data-reveal-line>
                Explore OASIS+ <Arrow />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="mx-auto grid min-h-[90svh] w-full max-w-[1600px] lg:grid-cols-2"
          aria-labelledby="about-title"
        >
          <div className="flex flex-col items-start justify-center px-5 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-16">
            <p className="eyebrow mb-7">About us</p>
            <h2 id="about-title" className="max-w-xl font-header text-section-title font-medium">
              A culture of mastery and action.
            </h2>
            <p className="mt-8 max-w-xl text-body-copy text-[#5f626b]">
              Since 2005, Harkcon has brought together authorities from government and industry to
              deliver consulting that is a cut above the rest. Our growth is built on capable
              people, trusted relationships, and work that earns repeat confidence.
            </p>
            <p className="mt-5 max-w-xl text-body-copy text-[#5f626b]">
              We take pride and ownership in every challenge, bringing service to life for every
              client and every mission.
            </p>
            <Link href="/about" className="pill-button mt-10">
              Discover Harkcon <Arrow />
            </Link>
          </div>
          <div className="relative min-h-[70svh] overflow-hidden lg:min-h-[90svh]">
            <Image
              src="/images/about-team.png"
              alt="Harkcon consultants collaborating around a table"
              fill
              loading="eager"
              unoptimized
              sizes="(min-width: 900px) 50vw, 100vw"
              className="z-[1] object-cover"
            />
          </div>
        </section>

        <section className="bg-[#f4f3f0] py-20 md:py-24 lg:py-28" aria-labelledby="news-title">
          <div className="site-gutter">
            <div className="mb-12 flex items-end justify-between gap-8 md:mb-16">
              <div>
                <p className="eyebrow mb-4">Latest updates</p>
                <h2 id="news-title" className="font-header text-section-title font-medium">
                  News
                </h2>
              </div>
              <Link href="/news-insights" className="text-link" data-reveal-line>
                Visit the news page <Arrow />
              </Link>
            </div>

            <FeaturedNews />
          </div>
        </section>

        <section className="bg-white">
          <div className="site-gutter flex flex-col items-start justify-between gap-10 py-20 md:flex-row md:items-end md:py-24">
            <div>
              <p className="eyebrow mb-5 text-[#5f626b]">Start a conversation</p>
              <h2 className="max-w-3xl font-header text-section-title font-medium text-[#0d132d]">
                Let&apos;s make your next mission stronger.
              </h2>
            </div>
            <Link href="/contact" className="pill-button shrink-0">
              Talk with our team <Arrow />
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}
