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
import { useQueries } from "convex/react"
import type { FunctionReturnType } from "convex/server"
import Image from "next/image"
import NextLink from "next/link"
import { FocusEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import CompanyStats from "~/components/company-stats"
import FeaturedNews from "~/components/featured-news"
import SectionSearch, { type SearchSection } from "~/components/section-search"
import SolutionsOverview from "~/components/solutions-overview"
import Link from "~/components/visibility-link"
import { HARKCON_CAPABILITY_STATEMENT_URL } from "~/lib/documents"
import { api } from "../../convex/_generated/api"

const statement =
  "Since 2005, Harkcon has helped government agencies and private-sector companies overcome complex challenges, strengthen organizational performance, and achieve mission-critical outcomes."

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
    title: "Administrative & Compliance Support",
    href: "/solutions/administrative-compliance-support",
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
    title: "Emergency Management & Contingency Support",
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
  href,
  open,
  onOpen,
  onScheduleClose,
}: {
  label: string
  href?: string
  open: boolean
  onOpen: () => void
  onScheduleClose: () => void
}) {
  const content = (
    <>
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
    </>
  )

  return (
    <div
      className="flex h-24 items-center pb-px"
      onMouseEnter={onOpen}
      onMouseLeave={onScheduleClose}
    >
      {href ? (
        <Link
          href={href}
          className={`${navLinkClassName} flex items-center gap-2`}
          aria-expanded={open}
          aria-controls="nav-dropdown-panel"
          onFocus={onOpen}
        >
          {content}
        </Link>
      ) : (
        <button
          type="button"
          className={`${navLinkClassName} flex items-center gap-2`}
          aria-expanded={open}
          aria-controls="nav-dropdown-panel"
          onClick={onOpen}
          onFocus={onOpen}
        >
          {content}
        </button>
      )}
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
                  className="h-4 w-4 text-white/50 transition-transform duration-300 group-hover:rotate-90 group-hover:text-brand-gold group-focus-visible:rotate-90 group-focus-visible:text-brand-gold"
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
          className="eyebrow group inline-flex items-center gap-3 whitespace-nowrap text-white/75 normal-case"
        >
          <span className="relative after:absolute after:right-0 after:-bottom-1 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-brand-gold after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">
            Explore our solutions
          </span>
          <Arrow diagonal className="shrink-0" />
        </Link>
        <p className="mt-7 max-w-md font-header text-xl leading-[1.25] tracking-[-0.02em] text-pretty text-white">
          Customized expertise that strengthens workforces, modernizes operations, and improves
          mission performance at every&nbsp;level.
        </p>
      </div>
      <div className="flex flex-col">
        <p className="eyebrow text-pretty text-brand-gold normal-case">Explore</p>
        <div className="mt-5 grid gap-0">
          {solutionLinks.map((solution) => (
            <Link
              href={solution.href}
              key={solution.href}
              className="group flex items-center gap-4 border-b border-white/15 py-2 font-header text-base leading-tight tracking-[-0.015em] text-white transition-colors hover:text-white/55 focus-visible:text-white/55 focus-visible:outline-none xl:text-[1.05rem]"
            >
              <Plus
                aria-hidden="true"
                className="h-4 w-4 text-white/50 transition-transform duration-300 group-hover:rotate-90 group-hover:text-brand-gold group-focus-visible:rotate-90 group-focus-visible:text-brand-gold"
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
  "flex h-11 w-11 items-center justify-center text-white/80 transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"

const clientLogos = [
  { name: "Federal Bureau of Investigation", src: "/images/FBI.webp" },
  {
    name: "Social Security Administration",
    src: "/images/social-security-administration-logo.svg",
  },
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
  "relative py-2 text-action opacity-85 transition-opacity after:absolute after:right-0 after:bottom-1 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-(--nav-accent) after:transition-transform after:duration-300 hover:opacity-100 hover:after:scale-x-100 focus-visible:after:scale-x-100"

const mobileNavLinkClassName =
  "flex items-center justify-between border-b border-white/15 py-4 text-lg"

export function Header({
  initialSurface = "dark",
  searchSections,
  searchPageTitle = "This page",
}: {
  initialSurface?: "dark" | "light"
  searchPageTitle?: string
  searchSections?: SearchSection[]
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<DropdownName | null>(null)
  const [shownDropdown, setShownDropdown] = useState<DropdownName>("solutions")
  const [panelHeight, setPanelHeight] = useState(0)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
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
      className={`site-header fixed inset-x-0 top-0 z-30 ${darkSurface ? "[--nav-accent:var(--color-brand-gold)]" : "[--nav-accent:var(--color-brand-red)]"} ${surfaceClassName} ${headerVisible || expanded ? "" : "-translate-y-[105%]"}`}
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
            sizes="(min-width: 640px) 180px, 155px"
            preload
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
          <NavDropdownTrigger
            label="News"
            href="/news-insights"
            open={openDropdown === "news"}
            onOpen={openNews}
            onScheduleClose={scheduleDropdownClose}
          />
          <NavDropdownTrigger
            label="Solutions"
            href="/solutions"
            open={openDropdown === "solutions"}
            onOpen={openSolutions}
            onScheduleClose={scheduleDropdownClose}
          />
          {searchSections && (
            <SectionSearch
              key={searchPageTitle}
              sections={searchSections}
              pageTitle={searchPageTitle}
            />
          )}
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

        <div className="flex items-center gap-3 lg:hidden">
          {searchSections && (
            <SectionSearch
              key={searchPageTitle}
              sections={searchSections}
              pageTitle={searchPageTitle}
            />
          )}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
            className={`flex h-11 w-11 flex-col items-center justify-center gap-2 rounded-none lg:hidden`}
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
      </div>

      <div
        id="mobile-navigation"
        inert={!menuOpen}
        className={`mobile-nav absolute top-24 right-0 left-0 flex max-h-[calc(100svh-6rem)] flex-col overflow-y-auto overscroll-contain bg-[#0d132d] px-5 py-5 transition-all duration-300 sm:px-8 [&>*]:shrink-0 ${menuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`}
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
        <NextLink href="/news-insights" onClick={closeMenu} className={mobileNavLinkClassName}>
          News
        </NextLink>
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
          className={`grid overflow-hidden pl-4 transition-all duration-500 ${mobileSolutionsOpen ? "" : "hidden"}`}
        >
          <Link
            href="/solutions"
            onClick={closeMenu}
            className="flex items-center gap-3 border-b border-white/15 py-3 text-sm whitespace-nowrap text-white"
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
          Organizations we have&nbsp;served
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
                sizes="(min-width: 768px) 232px, 184px"
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const heroQuery = {
  hero: { query: api.content.getHomeHero, args: {} },
  images: { query: api.content.listHeroImages, args: {} },
}

function Hero() {
  // Keep the current image available while the backend update is rolled out.
  const { hero, images } = useQueries(heroQuery)
  const heroImage = hero instanceof Error || !hero ? "capitol" : hero
  const uploadedImage =
    images instanceof Error
      ? undefined
      : (images as FunctionReturnType<typeof api.content.listHeroImages> | undefined)?.find(
          (image) => image.id === heroImage,
        )
  return (
    <section
      className="hero relative h-[100svh] max-h-[1050px] min-h-[650px] overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0">
        <Image
          src={
            uploadedImage?.url ??
            (heroImage === "social-work" ? "/images/Social Work.png" : "/images/capitol-hero.png")
          }
          alt={
            uploadedImage
              ? uploadedImage.name
              : heroImage === "social-work"
                ? "Social work and community service"
                : "The United States Capitol at sunrise"
          }
          fill
          preload
          quality={85}
          sizes="(max-width: 1672px) 1672px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="hero-overlay absolute inset-0 z-[1]" />
      <div className="site-gutter relative z-10 flex h-full items-end pb-12 md:pb-16">
        <div className="max-w-5xl text-white">
          <p className="mb-5 font-eyebrow text-[0.9rem] font-semibold tracking-[0.18em] text-pretty text-white/90 uppercase md:text-[1.05rem]">
            Master&nbsp;Performance
          </p>
          <h1
            id="hero-title"
            data-reveal-skip
            className="max-w-3xl animate-[hero-opacity_720ms_ease_210ms_both,hero-move_900ms_cubic-bezier(0.22,1,0.36,1)_210ms_both] font-header text-[clamp(1.75rem,8.82vw,2.15rem)] font-medium text-balance motion-reduce:animate-none sm:text-display"
          >
            Better&nbsp;People.
            <br />
            Better&nbsp;Performance.
            <br />
            Better&nbsp;Outcomes.
          </h1>
          <div className="mt-7 flex items-center gap-4 pt-5 md:mt-9 md:pt-6" data-reveal-line>
            <p className="max-w-xl text-sm leading-relaxed text-pretty text-white/80 md:text-base">
              Practical expertise for the organizations that serve us&nbsp;all.
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
      className="flex items-center pt-[3.017rem] pb-20 text-center md:pt-[3.878rem] md:pb-24 lg:pb-28"
      aria-label="What Harkcon does"
    >
      <div className="site-gutter">
        <p
          ref={statementRef}
          className="mx-auto max-w-[1050px] font-header text-[clamp(1.65rem,2.55vw,2.75rem)] leading-[1.15] tracking-[-0.025em] text-pretty text-[#c6c8cc]"
        >
          <span className="sr-only">{statement}</span>
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
                    sizes="68px"
                    className="h-full w-full object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-7 text-sm tracking-[0.17em] text-pretty text-white/45 uppercase">
              Solutions
            </p>
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
            <p className="mb-7 text-sm tracking-[0.17em] text-pretty text-white/45 uppercase">
              Company
            </p>
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
            <p className="mb-7 text-sm tracking-[0.17em] text-pretty text-white/45 uppercase">
              Connect
            </p>
            <p className="text-lg leading-snug text-pretty text-white/85">
              Have a complex&nbsp;mission?
              <br />
              Let&apos;s solve it&nbsp;together.
            </p>
            <Link
              href="/contact"
              className="animated-underline mt-8 flex w-fit items-center gap-4 pb-2 text-sm transition-colors hover:text-white/55"
            >
              Start a Conversation
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
          <span className={footerBottomLinkClassName}>Privacy & Terms</span>
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
            Back to Top
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

        <CompanyStats />
        <SolutionsOverview />

        <section
          className="bg-[#0d132d] py-[3.2rem] text-white md:py-16"
          aria-labelledby="home-contracts-title"
        >
          <div className="site-gutter grid gap-12 md:grid-cols-2 md:gap-0">
            <div className="flex flex-col items-start md:pr-12 lg:pr-20">
              <p className="eyebrow mb-5 text-brand-gold">Government contracting</p>
              <h2
                id="home-contracts-title"
                className="font-header text-section-title font-medium text-balance"
              >
                Contract&nbsp;vehicles
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-pretty text-white/70">
                Flexible federal acquisition paths to Harkcon&apos;s people, performance, and
                technology&nbsp;expertise.
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
                Integrated professional services through Harkcon&apos;s Small Business and
                SDVOSB&nbsp;vehicles.
              </p>
              {/* <Link href="/oasis-plus"> */}
              <span className="text-link mt-8 text-white after:opacity-60" data-reveal-line>
                Explore OASIS+
              </span>
              {/* </Link> */}
            </div>
          </div>
        </section>

        <section className="bg-white py-12 text-[#0d132d] md:py-14">
          <div className="site-gutter">
            <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <h3 className="relative font-header text-card-title font-medium text-balance">
                  Capability&nbsp;statement
                </h3>
                <p className="mt-3 max-w-lg text-base leading-relaxed text-pretty text-[#5f626b]">
                  Company capabilities, qualifications, and contracting&nbsp;information.
                </p>
              </div>
              <a
                href={HARKCON_CAPABILITY_STATEMENT_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Download Harkcon capability statement PDF (opens in a new tab)"
                className={`${wipeButtonClassName} shrink-0 ${wipeButtonDarkClassName}`}
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
          <div className="flex flex-col items-start justify-center px-5 pt-24 pb-12 sm:px-8 lg:px-12 lg:py-32 xl:px-16">
            <h2
              id="about-title"
              className="max-w-xl font-header text-section-title font-medium text-balance"
            >
              A culture of mastery and&nbsp;action.
            </h2>
            <p className="mt-8 max-w-xl text-body-copy text-pretty text-[#5f626b]">
              Harkcon is a service-disabled veteran-owned small business that helps government
              organizations solve complex workforce, organizational, operational, and mission
              challenges. Since 2005, we have supported agencies including the U.S. Coast Guard,
              Department of Homeland Security, Department of Energy, Federal Bureau of
              Investigation, and Department of War with expertise in human capital, workforce and
              organizational analysis, training and performance improvement, emergency management,
              program and project management, and data-driven decision&nbsp;support.
            </p>
            <p className="mt-5 max-w-xl text-body-copy text-pretty text-[#5f626b]">
              Headquartered in Fredericksburg, Virginia, Harkcon brings together experienced
              professionals who understand both the mission and the people responsible for
              delivering it. Our approach is practical, responsive, and grounded in a simple
              objective: understand the problem, build the right solution, and help our clients
              perform&nbsp;better.
            </p>
            <NextLink
              href="/about"
              className={`${wipeButtonClassName} mt-10 ${wipeButtonDarkClassName}`}
            >
              Discover Harkcon
            </NextLink>
          </div>
          <div className="px-5 pt-10 pb-20 sm:px-8 md:pt-12 md:pb-24 lg:py-28 lg:pr-12 lg:pl-0 xl:pr-16">
            <div className="relative h-full min-h-[70svh] overflow-hidden lg:min-h-[90svh]">
              <Image
                src="/images/about-team.png"
                alt="Harkcon consultants collaborating around a table"
                fill
                quality={85}
                sizes="(max-width: 1536px) 1536px, 100vw"
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
                Put our experience to work for your&nbsp;mission.
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
