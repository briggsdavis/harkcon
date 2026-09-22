"use client"

import Image from "next/image"
import Link from "next/link"
import { FocusEvent, useCallback, useEffect, useRef, useState } from "react"

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

const solutions = [
  {
    number: "01",
    title: "Workforce & Organizational Analysis",
    href: solutionLinks[0].href,
    detail: "Readiness, staffing, and actionable workforce strategy.",
  },
  {
    number: "02",
    title: "Training & Human Systems Integration",
    href: solutionLinks[1].href,
    detail: "High-impact learning built for mission effectiveness.",
  },
  {
    number: "03",
    title: "Process Improvement & Transformation",
    href: solutionLinks[2].href,
    detail: "Modern operations that reduce risk and create momentum.",
  },
  {
    number: "04",
    title: "Policy, Strategy & Program Support",
    href: solutionLinks[3].href,
    detail: "Clear direction for complex programs and decisions.",
  },
  {
    number: "05",
    title: "International Advisory & Capacity Building",
    href: solutionLinks[4].href,
    detail: "Stronger partnerships and operational readiness abroad.",
  },
  {
    number: "06",
    title: "Emergency Management & Continuity",
    href: solutionLinks[6].href,
    detail: "Preparedness that protects mission-critical functions.",
  },
]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      {diagonal ? <path d="M6 18 18 6M9 6h9v9" /> : <path d="M5 12h14m-5-5 5 5-5 5" />}
    </svg>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const openSolutions = useCallback(() => setSolutionsOpen(true), [])
  const closeSolutions = useCallback(() => setSolutionsOpen(false), [])
  const toggleMobileSolutions = useCallback(() => setMobileSolutionsOpen((open) => !open), [])
  const handleSolutionsBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setSolutionsOpen(false)
  }, [])

  return (
    <header
      className={`site-header absolute inset-x-0 top-0 z-30 text-white ${solutionsOpen ? "site-header--expanded" : ""}`}
    >
      <div className="site-gutter flex h-24 items-center justify-between border-b border-white/25">
        <Link
          href="/"
          aria-label="Harkcon home"
          className="font-header text-2xl font-semibold tracking-[-0.03em]"
        >
          HARKCON<span className="align-top text-[8px]">®</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          <Link className="nav-link" href="/about">
            About
          </Link>
          <Link className="nav-link" href="/news-insights">
            News
          </Link>
          <div
            className="solutions-nav-item"
            onMouseEnter={openSolutions}
            onMouseLeave={closeSolutions}
            onFocus={openSolutions}
            onBlur={handleSolutionsBlur}
          >
            <button
              type="button"
              className="nav-link solutions-nav-trigger"
              aria-expanded={solutionsOpen}
              aria-controls="solutions-mega-menu"
              onClick={openSolutions}
            >
              Solutions
              <span aria-hidden="true" className="solutions-chevron">
                ↓
              </span>
            </button>

            <div id="solutions-mega-menu" className="mega-menu">
              <div className="site-gutter mega-menu-inner">
                <div className="mega-menu-intro">
                  <p className="eyebrow text-white/55">Our solutions</p>
                  <p>
                    Customized expertise that strengthens workforces, modernizes operations, and
                    improves mission performance at every level.
                  </p>
                  <Link href="/solutions" className="mega-menu-overview" onClick={closeSolutions}>
                    View solutions overview <Arrow />
                  </Link>
                </div>
                <div className="mega-menu-links">
                  <p className="eyebrow text-white/55">Explore</p>
                  <div className="mega-menu-link-list">
                    {solutionLinks.map((solution) => (
                      <Link key={solution.href} href={solution.href} onClick={closeSolutions}>
                        <span aria-hidden="true">+</span>
                        {solution.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link className="pill-button pill-button--light ml-2" href="/contact">
            Contact <Arrow />
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
          className="menu-button lg:hidden"
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
        <button
          type="button"
          className="mobile-solutions-trigger"
          aria-expanded={mobileSolutionsOpen}
          aria-controls="mobile-solutions-list"
          onClick={toggleMobileSolutions}
        >
          Solutions <span aria-hidden="true">{mobileSolutionsOpen ? "−" : "+"}</span>
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
    <section ref={containerRef} className="statement-section" aria-label="What Harkcon does">
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

export default function HomePage() {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header />

      <section className="hero" aria-labelledby="hero-title">
        <Image
          src="/images/capitol-hero.png"
          alt="The United States Capitol at sunrise"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-overlay" />
        <div className="site-gutter relative z-10 flex h-full items-end pb-12 md:pb-16">
          <div className="max-w-5xl text-white">
            <p className="eyebrow mb-5 text-white/70">People · Performance · Technology</p>
            <h1 id="hero-title" className="hero-title">
              Better people.
              <br />
              Stronger missions.
            </h1>
            <div className="mt-7 flex items-center gap-4 border-t border-white/30 pt-5 md:mt-9 md:pt-6">
              <p className="max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                Purpose-built solutions for the organizations that serve us all.
              </p>
              <span className="ml-auto hidden h-12 w-12 items-center justify-center rounded-full border border-white/40 md:flex">
                <span className="animate-scroll-mark">↓</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <ScrollStatement />

      <section className="solutions-section" aria-labelledby="solutions-title">
        <div className="site-gutter">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow mb-5">Our solutions</p>
              <h2 id="solutions-title" className="section-title">
                Expertise that moves
                <br className="hidden sm:block" /> missions forward.
              </h2>
            </div>
            <Link href="/solutions" className="pill-button self-end">
              Explore all solutions <Arrow />
            </Link>
          </div>

          <div className="solutions-grid">
            {solutions.map((solution) => (
              <Link
                href={solution.href}
                key={solution.title}
                className="solution-card group"
                aria-label={`Learn about ${solution.title}`}
              >
                <span className="solution-fill" />
                <div className="relative z-10 flex h-full flex-col">
                  <span className="mb-14 text-xs tracking-[0.14em] text-[#5f626b] transition-colors duration-300 group-hover:text-white/60">
                    {solution.number}
                  </span>
                  <h3 className="max-w-sm text-2xl leading-[1.05] font-medium tracking-[-0.035em] md:text-[1.75rem]">
                    {solution.title}
                  </h3>
                  <div className="mt-auto flex items-end gap-6 pt-12">
                    <p className="max-w-[17rem] text-sm leading-relaxed text-[#5f626b] transition-colors duration-300 group-hover:text-white/70">
                      {solution.detail}
                    </p>
                    <span className="solution-arrow ml-auto">
                      <Arrow diagonal />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-title">
        <div className="about-copy">
          <p className="eyebrow mb-7">About us</p>
          <h2 id="about-title" className="section-title max-w-xl">
            A culture of mastery and action.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#5f626b]">
            Since 2005, Harkcon has brought together authorities from government and industry to
            deliver consulting that is a cut above the rest. Our growth is built on capable people,
            trusted relationships, and work that earns repeat confidence.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#5f626b]">
            We take pride and ownership in every challenge—bringing service to life for every client
            and every mission.
          </p>
          <Link href="/about" className="pill-button mt-10">
            Discover Harkcon <Arrow />
          </Link>
        </div>
        <div className="about-image">
          <Image
            src="/images/about-team.png"
            alt="Harkcon consultants collaborating around a table"
            fill
            sizes="(min-width: 900px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="cta-section">
        <div className="site-gutter flex flex-col items-start justify-between gap-10 py-20 md:flex-row md:items-end md:py-24">
          <div>
            <p className="eyebrow mb-5 text-white/55">Start a conversation</p>
            <h2 className="max-w-3xl font-header text-4xl leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              Let&apos;s make your next mission stronger.
            </h2>
          </div>
          <Link href="/contact" className="pill-button pill-button--light shrink-0">
            Talk with our team <Arrow />
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-gutter">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" aria-label="Harkcon home" className="footer-logo">
                HARKCON<span>®</span>
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
              <p className="footer-heading">Solutions</p>
              <nav aria-label="Footer solutions navigation">
                {solutionLinks.map((solution) => (
                  <Link key={solution.href} href={solution.href}>
                    {solution.title}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="footer-column">
              <p className="footer-heading">Company</p>
              <nav aria-label="Footer company navigation">
                <Link href="/about">About</Link>
                <Link href="/news-insights">News</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/careers">Careers</Link>
              </nav>
            </div>

            <div className="footer-column footer-contact">
              <p className="footer-heading">Connect</p>
              <p>
                Have a complex mission?
                <br />
                Let&apos;s solve it together.
              </p>
              <Link href="/contact" className="footer-contact-link">
                Start a conversation <Arrow />
              </Link>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Harkcon, Inc.</span>
            <Link href="/privacy-terms">Privacy & terms</Link>
            <a href="https://socialsatisfaction.agency/" target="_blank" rel="noreferrer">
              Made by SocialSatisfaction
            </a>
            <a href="#top" className="back-to-top">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
