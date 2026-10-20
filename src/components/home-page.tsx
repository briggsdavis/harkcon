"use client"

import {
  ArrowRight,
  ArrowUpRight,
  CaretDown,
  DownloadSimple,
  LinkedinLogo,
  Minus,
  Plus,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react"
import Image from "next/image"
import { FocusEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import FeaturedNews from "~/components/featured-news"
import Link from "~/components/visibility-link"
import { HARKCON_CAPABILITY_STATEMENT_URL } from "~/lib/documents"
import { usePageVisibility } from "~/lib/use-page-visibility"

const statement =
  "Since 2005, Harkcon, a service-disabled veteran-owned small business, has helped government agencies solve complex workforce, organizational, and mission challenges."

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

type DropdownLink = {
  title: string
  detail: string
  href?: string
  external?: boolean
}

const contractLinks: DropdownLink[] = [
  {
    title: "Contract Vehicles",
    // href: "/contracts",
    detail: "GSA MAS, TEPS III, USCG Workforce, USCG ITASS, and legacy OASIS access.",
  },
  {
    title: "OASIS+",
    // href: "/oasis-plus",
    detail:
      "Best-in-Class access to integrated professional services through our Small Business and SDVOSB awards.",
  },
]

const newsLinks: DropdownLink[] = [
  {
    title: "News",
    href: "/news-insights",
    detail: "Company announcements, contract awards, and insights from the Harkcon team.",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/company/harkcon-inc./",
    external: true,
    detail: "Follow Harkcon for the latest updates, openings, and conversations.",
  },
]

type DropdownName = "news" | "contracts" | "solutions"

const dropdownItemTitleClassName =
  "flex items-center gap-4 border-b border-white/15 pb-2 font-header text-base leading-tight tracking-[-0.015em] text-white transition-colors group-hover:text-white/55 group-focus-visible:text-white/55 xl:text-[1.05rem]"

function NavDropdownTrigger({
  label,
  open,
  onOpen,
  onScheduleClose,
}: {
  label: string
  open: boolean
  onOpen: () => void
  onScheduleClose: () => void
}) {
  return (
    <div
      className="flex h-24 items-center pb-px"
      onMouseEnter={onOpen}
      onMouseLeave={onScheduleClose}
    >
      <button
        type="button"
        className={`${navLinkClassName} flex items-center gap-2`}
        aria-expanded={open}
        aria-controls="nav-dropdown-panel"
        onClick={onOpen}
        onFocus={onOpen}
      >
        {label}
        <span
          aria-hidden="true"
          className={`inline-flex transition-transform duration-300 ${open ? "-rotate-180" : ""}`}
        >
          <CaretDown
            className="h-4 w-4"
            stroke="currentColor"
            strokeWidth={8}
            strokeLinejoin="round"
          />
        </span>
      </button>
    </div>
  )
}

function CompactDropdownContent({
  label,
  blurb,
  items,
  onClose,
}: {
  label: string
  blurb: string
  items: DropdownLink[]
  onClose: () => void
}) {
  return (
    <div className="site-gutter grid grid-cols-[0.82fr_1.18fr] gap-16 py-10 xl:gap-24 xl:py-11">
      <div className="flex flex-col items-start border-r border-white/15 pr-16">
        <p className="eyebrow text-pretty text-white/55 normal-case">{label}</p>
        <p className="mt-7 max-w-md font-header text-xl leading-[1.25] tracking-[-0.02em] text-pretty text-white">
          {blurb}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-10">
        {items.map((item) => {
          const content = (
            <>
              <span className={dropdownItemTitleClassName}>
                <Plus
                  aria-hidden="true"
                  className="h-4 w-4 text-white/50 transition-transform duration-300 group-hover:rotate-90 group-focus-visible:rotate-90"
                />
                {item.title}
              </span>
              <span className="mt-4 max-w-xs text-sm leading-relaxed text-pretty text-white/60">
                {item.detail}
              </span>
            </>
          )
          const className = "group flex flex-col items-start focus-visible:outline-none"

          if (!item.href) {
            return (
              <span key={item.title} className={className}>
                {content}
              </span>
            )
          }

          return item.external ? (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className={className}
            >
              {content}
            </a>
          ) : (
            <Link key={item.title} href={item.href} onClick={onClose} className={className}>
              {content}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function SolutionsDropdownContent() {
  return (
    <div className="site-gutter grid min-h-[350px] grid-cols-[0.82fr_1.18fr] gap-16 py-10 xl:gap-24 xl:py-11">
      <div className="flex flex-col items-start border-r border-white/15 pr-16">
        <Link
          href="/solutions"
          className="eyebrow animated-underline text-pretty text-white/75 normal-case"
        >
          Explore our solutions <Arrow diagonal />
        </Link>
        <p className="mt-7 max-w-md font-header text-xl leading-[1.25] tracking-[-0.02em] text-pretty text-white">
          Customized expertise that strengthens workforces, modernizes operations, and improves
          mission performance at every level.
        </p>
      </div>
      <div className="flex flex-col">
        <p className="eyebrow text-pretty text-white/55 normal-case">Explore</p>
        <div className="mt-5 grid gap-0">
          {solutionLinks.map((solution) => (
            <Link
              href={solution.href}
              key={solution.href}
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
  )
}

const dropdownNames: DropdownName[] = ["news", "contracts", "solutions"]

const socialLinkClassName =
  "flex h-11 w-11 items-center justify-center rounded-none border border-white/30 text-white/80 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0d132d] focus-visible:border-white focus-visible:bg-white focus-visible:text-[#0d132d] focus-visible:outline-none"

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
    title: "Workforce & Organizational Analysis",
    href: solutionLinks[0].href,
    detail: "Staffing analysis and workforce plans grounded in evidence.",
  },
  {
    title: "Training & Human Systems Integration",
    href: solutionLinks[1].href,
    detail: "Training built around the work people need to do.",
  },
  {
    title: "Process Improvement & Transformation",
    href: solutionLinks[2].href,
    detail: "Practical process changes that reduce risk and wasted effort.",
  },
  {
    title: "Policy, Strategy & Program Support",
    href: solutionLinks[3].href,
    detail: "Clear direction for complex programs and decisions.",
  },
  {
    title: "International Advisory & Capacity Building",
    href: solutionLinks[4].href,
    detail: "Stronger partnerships and operational readiness abroad.",
  },
  {
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

const wipeButtonClassName = "action-button"
const wipeButtonDarkClassName = ""
const wipeButtonLightClassName = "action-button--light"

const navLinkClassName =
  "relative py-2 text-action opacity-85 transition-opacity after:absolute after:right-0 after:bottom-1 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:opacity-100 hover:after:scale-x-100 focus-visible:after:scale-x-100"

const mobileNavLinkClassName =
  "flex items-center justify-between border-b border-white/15 py-4 text-lg"

export function Header({ initialSurface = "dark" }: { initialSurface?: "dark" | "light" }) {
  const visibility = usePageVisibility()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<DropdownName | null>(null)
  const [shownDropdown, setShownDropdown] = useState<DropdownName>("solutions")
  const [panelHeight, setPanelHeight] = useState(0)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileNewsOpen, setMobileNewsOpen] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [headerVisible, setHeaderVisible] = useState(true)
  const dropdownCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dropdownContentRefs = useRef<Partial<Record<DropdownName, HTMLDivElement | null>>>({})
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const clearDropdownTimer = useCallback(() => {
    if (dropdownCloseTimer.current) clearTimeout(dropdownCloseTimer.current)
  }, [])
  const showDropdown = useCallback(
    (name: DropdownName) => {
      clearDropdownTimer()
      setOpenDropdown(name)
      setShownDropdown(name)
    },
    [clearDropdownTimer],
  )
  const openNews = useCallback(() => showDropdown("news"), [showDropdown])
  const openSolutions = useCallback(() => showDropdown("solutions"), [showDropdown])
  const closeDropdown = useCallback(() => {
    clearDropdownTimer()
    setOpenDropdown(null)
  }, [clearDropdownTimer])
  const scheduleDropdownClose = useCallback(() => {
    clearDropdownTimer()
    dropdownCloseTimer.current = setTimeout(() => setOpenDropdown(null), 280)
  }, [clearDropdownTimer])
  const toggleMobileSolutions = useCallback(() => setMobileSolutionsOpen((open) => !open), [])
  const toggleMobileNews = useCallback(() => setMobileNewsOpen((open) => !open), [])
  const handleNavBlur = useCallback((event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpenDropdown(null)
  }, [])

  useLayoutEffect(() => {
    const content = dropdownContentRefs.current[shownDropdown]
    if (!content) return
    const measure = () => setPanelHeight(content.offsetHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(content)
    return () => observer.disconnect()
  }, [shownDropdown])

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
        if (menuOpen || openDropdown) {
          setHeaderVisible(true)
        } else if (delta > 5 && currentY > 120) {
          setHeaderVisible(false)
          setOpenDropdown(null)
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
  }, [menuOpen, openDropdown])

  useEffect(
    () => () => {
      if (dropdownCloseTimer.current) clearTimeout(dropdownCloseTimer.current)
    },
    [],
  )

  const expanded = openDropdown !== null || menuOpen
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

        {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- delegated focusout */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 lg:flex xl:gap-8"
          onBlur={handleNavBlur}
        >
          <Link href="/about" className={navLinkClassName}>
            About
          </Link>
          <Link href="/careers" className={navLinkClassName}>
            Careers
          </Link>
          <Link href="/contracts" className={navLinkClassName}>
            Contracts
          </Link>
          <Link href="/oasis-plus" className={navLinkClassName}>
            OASIS+
          </Link>
          <Link
            href="https://www.kdharkins.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClassName}
          >
            Kevin Harkins
          </Link>
          {visibility?.news === false ? (
            <span className={navLinkClassName}>News</span>
          ) : (
            <NavDropdownTrigger
              label="News"
              open={openDropdown === "news"}
              onOpen={openNews}
              onScheduleClose={scheduleDropdownClose}
            />
          )}
          <NavDropdownTrigger
            label="Solutions"
            open={openDropdown === "solutions"}
            onOpen={openSolutions}
            onScheduleClose={scheduleDropdownClose}
          />
          <Link
            href="/contact"
            className={`${wipeButtonClassName} ml-2 ${darkSurface ? wipeButtonLightClassName : wipeButtonDarkClassName}`}
          >
            Contact <Arrow />
          </Link>

          <div
            id="nav-dropdown-panel"
            className={`absolute top-24 right-0 left-0 overflow-hidden border-t border-white/15 bg-[#0d132d] transition-[height,opacity] duration-[650ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${openDropdown ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
            style={{ height: openDropdown ? panelHeight : 0 }}
            onMouseEnter={clearDropdownTimer}
            onMouseLeave={scheduleDropdownClose}
          >
            {dropdownNames.map((name) => (
              <div
                key={name}
                ref={(element) => {
                  dropdownContentRefs.current[name] = element
                }}
                inert={name !== shownDropdown || !openDropdown}
                className={`absolute inset-x-0 top-0 transition-opacity duration-300 ${name === shownDropdown ? "opacity-100 delay-150" : "opacity-0"}`}
              >
                {name === "news" ? (
                  <CompactDropdownContent
                    label="News"
                    blurb="Contract awards, company updates, and insights from the people doing the work."
                    items={newsLinks}
                    onClose={closeDropdown}
                  />
                ) : name === "contracts" ? (
                  <CompactDropdownContent
                    label="Contracts"
                    blurb="Flexible federal acquisition paths to Harkcon's people, performance, and technology expertise."
                    items={contractLinks}
                    onClose={closeDropdown}
                  />
                ) : (
                  <SolutionsDropdownContent />
                )}
              </div>
            ))}
          </div>
        </nav>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
          className={`flex h-11 w-11 flex-col items-center justify-center gap-2 rounded-none border lg:hidden ${menuButtonLight ? "border-[#0d132d]/35" : "border-white/40"}`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`h-6 w-6 ${menuButtonLight ? "text-[#0d132d]" : "text-white"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              d="M4 12h16"
              className={`origin-center transition-transform duration-300 ${menuOpen ? "rotate-45" : "-translate-y-1"}`}
            />
            <path
              d="M4 12h16"
              className={`origin-center transition-transform duration-300 ${menuOpen ? "-rotate-45" : "translate-y-1"}`}
            />
          </svg>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-nav absolute top-24 right-0 left-0 flex max-h-[calc(100svh-6rem)] flex-col overflow-y-auto bg-[#0d132d] px-5 py-5 transition-all duration-300 sm:px-8 ${menuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`}
      >
        <Link href="/about" className={mobileNavLinkClassName}>
          About
        </Link>
        <Link href="/careers" className={mobileNavLinkClassName}>
          Careers
        </Link>
        <Link href="/contracts" onClick={closeMenu} className={mobileNavLinkClassName}>
          Contracts
        </Link>
        <Link href="/oasis-plus" onClick={closeMenu} className={mobileNavLinkClassName}>
          OASIS+
        </Link>
        <Link
          href="https://www.kdharkins.com/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          className={mobileNavLinkClassName}
        >
          Kevin Harkins
        </Link>
        <button
          type="button"
          className="flex w-full items-center justify-between border-b border-white/15 py-4 text-left text-lg"
          disabled={visibility?.news === false}
          aria-expanded={mobileNewsOpen}
          aria-controls="mobile-news-list"
          onClick={toggleMobileNews}
        >
          News {mobileNewsOpen ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}
        </button>
        <div
          id="mobile-news-list"
          className={`grid overflow-hidden pl-4 transition-all duration-500 ${mobileNewsOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <Link
            href="/news-insights"
            onClick={closeMenu}
            className="flex items-center justify-between border-b border-white/15 py-3 text-sm leading-snug text-white/70"
          >
            News
          </Link>
          <a
            href="https://www.linkedin.com/company/harkcon-inc./"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            className="flex items-center justify-between border-b border-white/15 py-3 text-sm leading-snug text-white/70"
          >
            LinkedIn
          </a>
        </div>
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
          <Link
            href="/solutions"
            onClick={closeMenu}
            className="border-b border-white/15 py-3 text-sm text-white"
          >
            All solutions <Arrow diagonal />
          </Link>
          {solutionLinks.map((solution) => (
            <Link
              href={solution.href}
              onClick={closeMenu}
              key={solution.href}
              className="flex items-center justify-between border-b border-white/15 py-3 text-sm leading-snug text-white/70"
            >
              {solution.title}
            </Link>
          ))}
        </div>
        <Link
          href="/contact"
          onClick={closeMenu}
          className="action-button action-button--light mt-5"
        >
          Contact
        </Link>
      </div>
    </header>
  )
}

function ClientMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let animationFrame = 0
    let lastTime = performance.now()
    let position = 0

    const animate = (time: number) => {
      const delta = Math.min(time - lastTime, 48)
      lastTime = time
      const halfWidth = track.scrollWidth / 2
      if (halfWidth > 0) {
        position = (position + (halfWidth / 48_000) * delta) % halfWidth
        track.style.transform = `translate3d(${-position}px, 0, 0)`
      }
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  const repeatedLogos = ["first", "second"].flatMap((copy) =>
    clientLogos.map((logo) => [copy, logo] as const),
  )

  return (
    <section
      className="client-marquee bg-white py-10 md:py-12"
      aria-label="Organizations we have served"
    >
      <div className="site-gutter mb-10 flex items-center justify-center gap-6 md:mb-12">
        <span aria-hidden="true" className="h-0.5 w-12 bg-[#0d132d]/25 md:w-20" />
        <h2 className="text-center font-header text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight font-medium tracking-[-0.02em] text-balance text-[#0d132d]">
          Organizations we have served
        </h2>
        <span aria-hidden="true" className="h-0.5 w-12 bg-[#0d132d]/25 md:w-20" />
      </div>
      <div className="marquee-viewport overflow-hidden">
        <div ref={trackRef} className="flex w-max items-center will-change-transform">
          {repeatedLogos.map(([copy, logo]) => (
            <div
              className="mr-3 flex h-36 w-60 shrink-0 items-center justify-center px-7 py-7 md:h-42 md:w-72"
              key={`${copy}-${logo.src}`}
              aria-hidden={copy === "second"}
            >
              <Image
                src={logo.src}
                alt={copy === "first" ? logo.name : ""}
                width={270}
                height={135}
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
          <p className="mb-5 font-eyebrow text-xs font-semibold tracking-[0.18em] text-pretty text-white/90 uppercase md:text-sm">
            Master Performance
          </p>
          <h1
            id="hero-title"
            className="max-w-3xl font-header text-display font-medium text-balance"
          >
            Better people.
            <br />
            Stronger missions.
          </h1>
          <div className="mt-7 flex items-center gap-4 pt-5 md:mt-9 md:pt-6" data-reveal-line>
            <p className="max-w-xl text-sm leading-relaxed text-pretty text-white/80 md:text-base">
              Practical expertise for the organizations that serve us all.
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
      className="flex min-h-[70vh] items-center py-[3.017rem] text-center md:py-[3.878rem]"
      aria-label="What Harkcon does"
    >
      <div className="site-gutter">
        <p
          ref={statementRef}
          className="mx-auto max-w-[1050px] font-header text-[clamp(1.65rem,2.55vw,2.75rem)] leading-[1.15] tracking-[-0.025em] text-pretty text-[#c6c8cc]"
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

const footerBadges = [
  {
    name: "Service-Disabled Veteran-Owned Small Business, CVE verified",
    src: "/images/sdvosb-badge.jpg",
  },
  {
    name: "Virginia Values Veterans official V3 certified company",
    src: "/images/virginia-values-veterans-badge.png",
  },
  { name: "CMMC Level 2 self-assessed", src: "/images/cmmc-level-2-badge.png" },
]

const footerNavLinkClassName =
  "w-fit text-sm leading-snug text-white/85 transition-colors hover:text-white/45 focus-visible:text-white/45 focus-visible:outline-none"
const footerBottomLinkClassName =
  "transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"

export function SiteFooter() {
  return (
    <footer id="site-footer" className="relative z-10 bg-[#0d132d] text-white">
      <div className="site-gutter">
        <div className="grid gap-14 py-20 sm:grid-cols-2 md:py-24 lg:grid-cols-[auto_1.65fr_0.75fr_0.9fr] lg:gap-14 xl:gap-24 xl:py-28">
          <div>
            <Link
              href="/"
              aria-label="Harkcon home"
              className="block w-[4.25rem] overflow-hidden [--image-wipe-color:#0d132d]"
            >
              <Image
                src="/images/logo-white.svg"
                alt=""
                width={40}
                height={40}
                className="h-[4.25rem] w-[4.25rem]"
              />
            </Link>
            <ul aria-label="Certifications" className="mt-10 flex flex-nowrap gap-3">
              {footerBadges.map((badge) => (
                <li
                  key={badge.src}
                  className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white p-1.5"
                >
                  <Image
                    src={badge.src}
                    alt={badge.name}
                    width={176}
                    height={172}
                    className="h-full w-full object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-7 text-xs tracking-[0.17em] text-pretty text-white/45">Solutions</p>
            <nav aria-label="Footer solutions navigation" className="grid items-start gap-3">
              {solutionLinks.map((solution) => (
                <Link
                  href={solution.href}
                  key={solution.href}
                  className={`${footerNavLinkClassName} max-w-md`}
                >
                  {solution.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-7 text-xs tracking-[0.17em] text-pretty text-white/45">Company</p>
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
            <p className="mb-7 text-xs tracking-[0.17em] text-pretty text-white/45">Connect</p>
            <p className="text-lg leading-snug text-pretty text-white/85">
              Have a complex mission?
              <br />
              Let&apos;s solve it together.
            </p>
            <Link
              href="/contact"
              className="animated-underline mt-8 flex w-fit items-center gap-4 pb-2 text-sm transition-colors hover:text-white/55"
            >
              Start a conversation
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
          className="flex flex-col gap-5 py-8 text-xs tracking-[0.04em] text-white/55 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 md:py-10"
          data-reveal-line
        >
          {/* oxlint-disable-next-line react/purity -- The copyright year intentionally follows the current date. */}
          <span>© {new Date().getFullYear()} Harkcon</span>
          {/* <Link href="/privacy-terms" className={footerBottomLinkClassName}> */}
          <span className={footerBottomLinkClassName}>Privacy & terms</span>
          {/* </Link> */}
          <a
            href="https://socialsatisfaction.agency/"
            target="_blank"
            rel="noreferrer"
            className={footerBottomLinkClassName}
          >
            Made by Social Satisfaction
          </a>
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault()
              if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                window.scrollTo(0, 0)
              }
            }}
            className={`${footerBottomLinkClassName} flex items-center gap-3 sm:ml-auto`}
          >
            Back to top
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
                  className="max-w-sm font-header text-section-title font-medium text-balance"
                >
                  Our Solutions
                </h2>
                <p className="mt-7 max-w-sm text-base leading-relaxed text-pretty text-[#5f626b]">
                  Workforce analysis, training, and program support that help agencies make sound
                  decisions and improve performance.
                </p>
              </div>

              <div className="grid gap-x-7 gap-y-0 md:grid-cols-2 xl:grid-cols-3">
                {solutions.map((solution) => (
                  <Link
                    href={solution.href}
                    key={solution.title}
                    className="group relative min-h-[310px] overflow-hidden px-5 py-7 text-[#0d132d] transition-colors duration-500 hover:text-white focus-visible:text-white focus-visible:outline-none md:min-h-[340px] md:px-6 md:py-8"
                    data-reveal-line
                  >
                    <span className="absolute inset-0 origin-left scale-x-0 bg-[#0d132d] transition-transform duration-900 ease-[cubic-bezier(0.45,0,0.2,1)] will-change-transform group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                    <div className="relative z-10 flex h-full flex-col">
                      <h3 className="max-w-sm font-header text-card-title font-medium text-balance">
                        {solution.title}
                      </h3>
                      <div className="mt-auto flex items-end gap-5 pt-10">
                        <p className="max-w-[15rem] text-sm leading-relaxed text-pretty text-[#5f626b] transition-colors duration-700 group-hover:text-white/70">
                          {solution.detail}
                        </p>
                        <span className="ml-auto flex h-14 w-14 shrink-0 items-center justify-center bg-[#f4f3f0] text-[#0d132d]">
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
          className="bg-[#0d132d] py-32 text-white md:py-40"
          aria-labelledby="home-contracts-title"
        >
          <div className="site-gutter grid gap-12 md:grid-cols-2 md:gap-0">
            <div className="flex flex-col items-start md:pr-12 lg:pr-20">
              <h2
                id="home-contracts-title"
                className="font-header text-section-title font-medium text-balance"
              >
                Contract vehicles
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-pretty text-white/70">
                Flexible federal acquisition paths to Harkcon&apos;s people, performance, and
                technology expertise.
              </p>
              {/* <Link href="/contracts"> */}
              <span className="text-link mt-8 text-white after:opacity-60" data-reveal-line>
                Explore contract vehicles
              </span>
              {/* </Link> */}
            </div>
            <div className="flex flex-col items-start border-t border-white/15 pt-12 md:border-t-0 md:border-l md:pt-0 md:pl-12 lg:pl-20">
              <h3 className="font-header text-section-title font-medium text-balance">OASIS+</h3>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-pretty text-white/70">
                Integrated professional services through Harkcon&apos;s Small Business and SDVOSB
                vehicles.
              </p>
              {/* <Link href="/oasis-plus"> */}
              <span className="text-link mt-8 text-white after:opacity-60" data-reveal-line>
                Explore OASIS+
              </span>
              {/* </Link> */}
            </div>
          </div>
          <div className="site-gutter">
            <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-white/15 pt-12 md:mt-20 md:flex-row md:items-center md:pt-14">
              <div>
                <h3 className="font-header text-card-title font-medium text-balance">
                  Capability statement
                </h3>
                <p className="mt-3 max-w-lg text-base leading-relaxed text-pretty text-white/70">
                  Company capabilities, qualifications, and contracting information.
                </p>
              </div>
              <a
                href={HARKCON_CAPABILITY_STATEMENT_URL}
                target="_blank"
                rel="noreferrer"
                className={`${wipeButtonClassName} shrink-0 ${wipeButtonLightClassName}`}
              >
                Download PDF <DownloadSimple aria-hidden="true" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        <section
          className="mx-auto grid min-h-[90svh] w-full max-w-[1600px] lg:grid-cols-2"
          aria-labelledby="about-title"
        >
          <div className="flex flex-col items-start justify-center px-5 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-16">
            <h2
              id="about-title"
              className="max-w-xl font-header text-section-title font-medium text-balance"
            >
              A culture of mastery and action.
            </h2>
            <p className="mt-8 max-w-xl text-body-copy text-pretty text-[#5f626b]">
              Harkcon is a service-disabled veteran-owned small business that helps government
              organizations solve complex workforce, organizational, operational, and mission
              challenges. Since 2005, we have supported agencies including the U.S. Coast Guard,
              Department of Homeland Security, Department of Energy, Federal Bureau of
              Investigation, and Department of War with expertise in human capital, workforce and
              organizational analysis, training and performance improvement, emergency management,
              program and project management, and data-driven decision support.
            </p>
            <p className="mt-5 max-w-xl text-body-copy text-pretty text-[#5f626b]">
              Headquartered in Fredericksburg, Virginia, Harkcon brings together experienced
              professionals who understand both the mission and the people responsible for
              delivering it. Our approach is practical, responsive, and grounded in a simple
              objective: understand the problem, build the right solution, and help our clients
              perform better.
            </p>
            {/* <Link href="/about"> */}
            <span className={`${wipeButtonClassName} mt-10 ${wipeButtonDarkClassName}`}>
              Discover Harkcon
            </span>
            {/* </Link> */}
          </div>
          <div className="py-20 md:py-24 lg:py-28">
            <div className="relative h-full min-h-[70svh] overflow-hidden lg:min-h-[90svh]">
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
          </div>
        </section>

        <section className="bg-[#f4f3f0] py-20 md:py-24 lg:py-28" aria-labelledby="news-title">
          <div className="site-gutter">
            <div className="mb-12 flex items-end justify-between gap-8 md:mb-16">
              <div>
                <h2
                  id="news-title"
                  className="font-header text-section-title font-medium text-balance"
                >
                  News
                </h2>
              </div>
              <Link href="/news-insights" className="text-link" data-reveal-line>
                Visit the news page
              </Link>
            </div>

            <FeaturedNews />
          </div>
        </section>

        <section className="bg-white">
          <div className="site-gutter flex flex-col items-start justify-between gap-10 py-20 md:flex-row md:items-end md:py-24">
            <div>
              <h2 className="max-w-3xl font-header text-section-title font-medium text-balance text-[#0d132d]">
                Put our experience to work for your mission.
              </h2>
            </div>
            <Link
              href="/contact"
              className={`${wipeButtonClassName} shrink-0 ${wipeButtonDarkClassName}`}
            >
              Talk with our team
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}
