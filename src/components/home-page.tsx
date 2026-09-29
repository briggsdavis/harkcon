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

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
  ) : (
    <ArrowRight aria-hidden="true" className="h-5 w-5" />
  )
}

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

  const darkSurface = (atTop && initialSurface === "dark") || solutionsOpen || menuOpen

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-30 ${atTop ? (initialSurface === "dark" ? "site-header--top" : "site-header--light-top") : "site-header--scrolled"} ${headerVisible ? "" : "site-header--hidden"} ${solutionsOpen ? "site-header--expanded" : ""} ${menuOpen ? "site-header--mobile-open" : ""}`}
    >
      <div className="site-gutter flex h-24 items-center justify-between">
        <Link href="/" aria-label="Harkcon home" className="block shrink-0 brand-logo-link">
          <Image
            src={
              darkSurface
                ? "/images/harkcon-logo-white.avif"
                : "/images/harkcon-logo-black.avif"
            }
            alt=""
            width={336}
            height={86}
            className="h-auto w-[155px] sm:w-[180px] brand-logo-image"
            priority
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex xl:gap-8">
          <Link className="relative py-2 text-action opacity-85 transition-opacity hover:opacity-100 nav-link" href="/about">
            About
          </Link>
          <Link className="relative py-2 text-action opacity-85 transition-opacity hover:opacity-100 nav-link" href="/news-insights">
            News
          </Link>
          <Link className="relative py-2 text-action opacity-85 transition-opacity hover:opacity-100 nav-link" href="/contracts">
            Contracts
          </Link>
          <Link className="relative py-2 text-action opacity-85 transition-opacity hover:opacity-100 nav-link" href="/careers">
            Careers
          </Link>
          <div
            className="flex h-24 items-center solutions-nav-item"
            onMouseEnter={openSolutions}
            onMouseLeave={scheduleSolutionsClose}
            onFocus={openSolutions}
            onBlur={handleSolutionsBlur}
          >
            <button
              type="button"
              className="relative py-2 text-action opacity-85 transition-opacity hover:opacity-100 flex items-center gap-2 nav-link solutions-nav-trigger"
              aria-expanded={solutionsOpen}
              aria-controls="solutions-mega-menu"
              onClick={openSolutions}
            >
              Solutions
              <span aria-hidden="true" className="inline-flex transition-transform duration-300 solutions-chevron">
                <Arrow />
              </span>
            </button>

            <div id="solutions-mega-menu" className="pointer-events-none absolute top-24 right-0 left-0 max-h-0 overflow-hidden border-t border-white/15 bg-[#0d132d] opacity-0 mega-menu">
              <div className="grid min-h-[350px] grid-cols-[0.82fr_1.18fr] gap-16 py-10 xl:gap-24 xl:py-11 site-gutter mega-menu-inner">
                <div className="flex flex-col items-start border-r border-white/15 pr-16 mega-menu-intro">
                  <p className="eyebrow text-white/55">Our solutions</p>
                  <p>
                    Customized expertise that strengthens workforces, modernizes operations, and
                    improves mission performance at every level.
                  </p>
                </div>
                <div className="flex flex-col mega-menu-links">
                  <p className="eyebrow text-white/55">Explore</p>
                  <div className="mt-5 grid gap-0 mega-menu-link-list">
                    {solutionLinks.map((solution) => (
                      <Link key={solution.href} href={solution.href} onClick={closeSolutions} className="group">
                        <Plus aria-hidden="true" className="h-4 w-4 text-white/50 transition-transform duration-300 group-hover:rotate-90 group-focus-visible:rotate-90" />
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
          className="flex h-11 w-11 flex-col items-center justify-center gap-2 rounded-full border border-white/40 menu-button lg:hidden"
        >
          <span className={menuOpen ? "translate-y-[5px] rotate-45" : ""} />
          <span className={menuOpen ? "-translate-y-[5px] -rotate-45" : ""} />
        </button>
      </div>

      <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}>
        <Link href="/about" onClick={closeMenu}>
          About <Arrow diagonal />
        </Link>
        <Link href="/news-insights" onClick={closeMenu}>
          News <Arrow diagonal />
        </Link>
        <Link href="/contracts" onClick={closeMenu}>
          Contracts <Arrow diagonal />
        </Link>
        <Link href="/careers" onClick={closeMenu}>
          Careers <Arrow diagonal />
        </Link>
        <button
          type="button"
          className="flex w-full items-center justify-between border-b border-white/15 py-4 text-left text-lg mobile-solutions-trigger"
          aria-expanded={mobileSolutionsOpen}
          aria-controls="mobile-solutions-list"
          onClick={toggleMobileSolutions}
        >
          Solutions {mobileSolutionsOpen ? (
            <Minus aria-hidden="true" />
          ) : (
            <Plus aria-hidden="true" />
          )}
        </button>
        <div
          id="mobile-solutions-list"
          className={`mobile-solutions-list ${mobileSolutionsOpen ? "mobile-solutions-list--open" : ""}`}
        >
          {solutionLinks.map((solution) => (
            <Link key={solution.href} href={solution.href} onClick={closeMenu}>
              {solution.title}
            </Link>
          ))}
        </div>
        <Link href="/contact" onClick={closeMenu} className="mobile-contact-link">
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
    <section className="client-marquee" aria-labelledby="client-marquee-title">
      <div className="mb-7 flex items-center justify-between gap-6 site-gutter client-marquee-heading">
        <p id="client-marquee-title" className="eyebrow">
          Trusted across missions
        </p>
        <p>Organizations we have served</p>
      </div>
      <div className="overflow-hidden marquee-viewport">
        <div ref={trackRef} className="marquee-track">
          {repeatedLogos.map(([copy, logo]) => (
            <div
              className="mr-6 flex h-24 w-44 shrink-0 items-center justify-center px-7 py-5 md:h-28 md:w-52 client-logo"
              key={`${copy}-${logo.src}`}
              aria-hidden={copy === "second"}
            >
              <Image
                src={logo.src}
                alt={copy === "first" ? logo.name : ""}
                width={180}
                height={90}
                className="h-full w-full object-contain client-logo-image"
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
    <section className="hero" aria-labelledby="hero-title">
      <div ref={mediaRef} className="absolute right-0 left-0 hero-media">
        <Image
          src="/images/capitol-hero.png"
          alt="The United States Capitol at sunrise"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 z-[1] hero-overlay" />
      <div className="site-gutter relative z-10 flex h-full items-end pb-12 md:pb-16">
        <div className="max-w-5xl text-white">
          <h1 id="hero-title" className="hero-title">
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
    <section ref={containerRef} className="flex min-h-[100vh] items-center py-[6.16rem] text-center md:py-[7.92rem] statement-section" aria-label="What Harkcon does">
      <div className="site-gutter">
        <p className="eyebrow mb-10">What we do</p>
        <p ref={statementRef} className="statement" aria-label={statement}>
          <span aria-hidden="true">
            {Array.from(statement).map((character, index) => (
              <span
                key={statement.slice(0, index + 1)}
                className={index < visibleCharacters ? "statement-character--active" : ""}
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

export function SiteFooter() {
  return (
    <footer id="site-footer" className="site-footer">
      <div className="site-gutter">
        <div className="grid gap-14 py-20 sm:grid-cols-2 md:py-24 lg:grid-cols-[0.7fr_1.65fr_0.75fr_0.9fr] lg:gap-14 xl:gap-24 xl:py-28 footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="Harkcon home" className="block w-[4.25rem] overflow-hidden footer-logo">
              <Image
                src="/images/harkcon-logo-white.avif"
                alt=""
                width={336}
                height={86}
                className="h-[4.25rem] w-auto max-w-none footer-logo-image"
              />
            </Link>
            <p>
              People.
              <br />
              Performance.
              <br />
              Technology.
            </p>
          </div>

          <div className="footer-column footer-solutions">
            <p className="mb-7 text-xs tracking-[0.17em] text-white/45 uppercase footer-heading">Solutions</p>
            <nav aria-label="Footer solutions navigation">
              {solutionLinks.map((solution) => (
                <Link key={solution.href} href={solution.href}>
                  {solution.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-column">
            <p className="mb-7 text-xs tracking-[0.17em] text-white/45 uppercase footer-heading">Company</p>
            <nav aria-label="Footer company navigation">
              <Link href="/about">About</Link>
              <Link href="/news-insights">News</Link>
              <Link href="/contracts">Contracts</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/careers">Careers</Link>
            </nav>
          </div>

          <div className="footer-column footer-contact">
            <p className="mb-7 text-xs tracking-[0.17em] text-white/45 uppercase footer-heading">Connect</p>
            <p>
              Have a complex mission?
              <br />
              Let&apos;s solve it together.
            </p>
            <Link href="/contact" className="mt-8 flex w-fit items-center gap-4 pb-2 text-sm transition-colors hover:text-white/55 footer-contact-link animated-underline">
              Start a conversation <Arrow />
            </Link>
            <div className="mt-8 flex flex-wrap gap-3 footer-social-links">
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

        <div className="flex flex-col gap-5 py-8 text-xs tracking-[0.04em] text-white/55 uppercase sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 md:py-10 footer-bottom" data-reveal-line>
          {/* oxlint-disable-next-line react/purity -- The copyright year intentionally follows the current date. */}
          <span>© {new Date().getFullYear()} Harkcon, Inc.</span>
          <Link href="/privacy-terms">Privacy & terms</Link>
          <a href="https://socialsatisfaction.agency/" target="_blank" rel="noreferrer">
            Made by SocialSatisfaction
          </a>
          <a href="#top" className="flex items-center gap-3 sm:ml-auto back-to-top">
            Back to top
            <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-sm">
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

      <div className="page-content">
        <Hero />

        <ClientMarquee />

        <ScrollStatement />

        <section id="solutions" className="bg-white py-20 md:py-24 lg:py-28 solutions-section" aria-labelledby="solutions-title">
          <div className="site-gutter">
            <div className="grid gap-16 lg:grid-cols-[minmax(230px,0.7fr)_minmax(0,2.3fr)] lg:gap-12 xl:gap-20 solutions-showcase">
              <div className="self-start lg:sticky lg:top-32 solutions-intro">
                <h2 id="solutions-title" className="section-title max-w-sm">
                  Our Solutions
                </h2>
                <p className="mt-7 max-w-sm text-base leading-relaxed text-[#5f626b]">
                  Integrated expertise that strengthens workforces, modernizes operations, and turns
                  complex challenges into lasting performance.
                </p>
              </div>

              <div className="grid gap-x-7 gap-y-0 md:grid-cols-2 xl:grid-cols-3 solutions-grid">
                {solutions.map((solution) => (
                  <Link
                    href={solution.href}
                    key={solution.title}
                    className="relative min-h-[310px] overflow-hidden px-5 py-7 text-[#0d132d] md:min-h-[340px] md:px-6 md:py-8 solution-card group"
                    aria-label={`Learn about ${solution.title}`}
                    data-reveal-line
                  >
                    <span className="absolute inset-0 origin-left bg-[#0d132d] solution-fill" />
                    <div className="relative z-10 flex h-full flex-col transition-transform duration-700 solution-card-content">
                      <span className="mb-12 flex items-center gap-2.5 text-xs tracking-[0.16em] text-[#5f626b] transition-colors duration-700 group-hover:text-white/55 solution-number">
                        <span
                          className="inline-block h-2.5 w-2.5 shrink-0 rounded-full solution-color-dot"
                          style={{ backgroundColor: solution.color }}
                        />
                        {solution.number}
                      </span>
                      <h3>{solution.title}</h3>
                      <div className="mt-auto flex items-end gap-5 pt-10 solution-card-footer">
                        <p>{solution.detail}</p>
                        <span className="ml-auto flex h-14 w-14 shrink-0 items-center justify-center bg-[#f4f3f0] transition-colors duration-500 group-hover:bg-white group-hover:text-[#0d132d] solution-arrow">
                          <Arrow diagonal />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#0d132d]/15 bg-white py-16 md:py-20 home-contracts-section" aria-labelledby="home-contracts-title">
          <div className="grid gap-12 md:grid-cols-2 md:gap-0 site-gutter home-contracts-grid">
            <div className="md:pr-12 lg:pr-20 home-contracts-intro">
              <p className="eyebrow mb-5 text-[#5f626b]">Contract access</p>
              <h2 id="home-contracts-title" className="section-title">
                Contract vehicles
              </h2>
              <p>
                Flexible federal acquisition paths to Harkcon&apos;s people, performance, and
                technology expertise.
              </p>
              <Link href="/contracts" className="text-link" data-reveal-line>
                Explore contract vehicles <Arrow />
              </Link>
            </div>
            <div className="home-contracts-oasis">
              <p className="eyebrow mb-5 text-[#5f626b]">Best-in-Class access</p>
              <h3>OASIS+</h3>
              <p>
                Integrated professional services through Harkcon&apos;s Small Business and SDVOSB
                vehicles.
              </p>
              <Link href="/contracts?view=oasis-plus" className="text-link" data-reveal-line>
                Explore OASIS+ <Arrow />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid min-h-[90svh] w-full max-w-[1600px] lg:grid-cols-2 about-section" aria-labelledby="about-title">
          <div className="flex flex-col items-start justify-center px-5 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-16 about-copy">
            <p className="eyebrow mb-7">About us</p>
            <h2 id="about-title" className="section-title max-w-xl">
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
          <div className="relative min-h-[70svh] overflow-hidden lg:min-h-[90svh] about-image">
            <Image
              src="/images/about-team.png"
              alt="Harkcon consultants collaborating around a table"
              fill
              loading="eager"
              unoptimized
              sizes="(min-width: 900px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="bg-[#f4f3f0] py-20 md:py-24 lg:py-28 news-section" aria-labelledby="news-title">
          <div className="site-gutter">
            <div className="mb-12 flex items-end justify-between gap-8 md:mb-16 news-heading-row">
              <div>
                <p className="eyebrow mb-4">Latest updates</p>
                <h2 id="news-title" className="section-title">
                  News
                </h2>
              </div>
              <Link href="/news-insights" className="text-link" data-reveal-line>
                Visit the news page <Arrow />
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2 news-grid legacy-featured-news" hidden>
              <Link
                href="/news-insights/coast-guard-preparedness-support-contract"
                className="block pt-5 news-card group"
                data-reveal-line
              >
                <div className="relative aspect-[16/9] overflow-hidden news-image-wrap">
                  <Image
                    src="https://images.unsplash.com/photo-1519922838705-9d6cb8bcfaea?auto=format&fit=crop&w=1600&q=85"
                    alt="The United States Capitol in Washington, D.C."
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="pt-5 news-card-body">
                  <time dateTime="2026-09-11">September 11, 2026</time>
                  <h3>Harkcon awarded U.S. Coast Guard preparedness support contract</h3>
                  <p>
                    Harkcon will continue and expand integrated program management, preparedness,
                    continuity, and analytical support across critical Coast Guard programs...
                  </p>
                </div>
              </Link>

              <Link
                href="/news-insights/elev8-govcon-honoree-2026"
                className="block pt-5 news-card group"
                data-reveal-line
              >
                <div className="relative aspect-[16/9] overflow-hidden news-image-wrap">
                  <Image
                    src="https://images.unsplash.com/photo-1758518730151-cf64fddb4f0a?auto=format&fit=crop&w=1600&q=85"
                    alt="Business professionals collaborating in an office meeting"
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="pt-5 news-card-body">
                  <time dateTime="2025-10-28">October 28, 2025</time>
                  <h3>Harkcon named a 2026 Elev8 GovCon honoree</h3>
                  <p>
                    The recognition marks a second consecutive year celebrating Harkcon&apos;s
                    culture, innovation, and commitment to doing business the right way...
                  </p>
                </div>
              </Link>
            </div>
            <FeaturedNews />
          </div>
        </section>

        <section className="bg-white cta-section">
          <div className="site-gutter flex flex-col items-start justify-between gap-10 py-20 md:flex-row md:items-end md:py-24">
            <div>
              <p className="eyebrow mb-5 text-[#5f626b]">Start a conversation</p>
              <h2 className="section-title max-w-3xl text-[#0d132d]">
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
