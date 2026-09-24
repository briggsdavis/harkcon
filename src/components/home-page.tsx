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

const clientLogos = [
  {
    name: "Bureau of Safety and Environmental Enforcement",
    src: "/images/Bureau of Safety and Environmental Enforcement.jpg",
  },
  { name: "Cellebrite", src: "/images/Cellebrite.webp" },
  { name: "Conservation International", src: "/images/Conservation International.webp" },
  { name: "U.S. Department of Justice", src: "/images/Departement of justice.webp" },
  {
    name: "U.S. Department of Homeland Security",
    src: "/images/Departementofhomelandsecurity.png",
  },
  { name: "Florida State University", src: "/images/Florida stat universty.jpeg" },
  { name: "Liquid Robotics", src: "/images/Liquid robotics a boeing company.png" },
  { name: "USAID", src: "/images/USAID.webp" },
  { name: "Unisys Federal", src: "/images/Unisys Federal.webp" },
  { name: "United States Coast Guard", src: "/images/United States Cost Guard.png" },
  { name: "U.S. Customs and Border Protection", src: "/images/customs and border ptortetcion.png" },
  {
    name: "Defense Threat Reduction Agency",
    src: "/images/defense threat reduction agency logo.png",
  },
  { name: "U.S. Department of Commerce", src: "/images/demartemetn of commerce.webp" },
  { name: "U.S. Department of State", src: "/images/departement of state.webp" },
  {
    name: "U.S. Department of Veterans Affairs",
    src: "/images/departement of veteran affairs logo.webp",
  },
  { name: "Office of Personnel Management", src: "/images/office of personal affiars .png" },
  { name: "Thrive", src: "/images/thrive.jpeg" },
  {
    name: "Transportation Security Administration",
    src: "/images/transportation security administration.jpeg",
  },
  { name: "U.S. Fire Administration", src: "/images/us fire administration logo.webp" },
  { name: "WildAid Marine Program", src: "/images/wild aid marine program.png" },
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

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
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

export function Header({ initialSurface = "dark" }: { initialSurface?: "dark" | "light" }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [headerVisible, setHeaderVisible] = useState(true)
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const openSolutions = useCallback(() => setSolutionsOpen(true), [])
  const closeSolutions = useCallback(() => setSolutionsOpen(false), [])
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

  const darkSurface = (atTop && initialSurface === "dark") || solutionsOpen || menuOpen

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-30 ${atTop ? (initialSurface === "dark" ? "site-header--top" : "site-header--light-top") : "site-header--scrolled"} ${headerVisible ? "" : "site-header--hidden"} ${solutionsOpen ? "site-header--expanded" : ""} ${menuOpen ? "site-header--mobile-open" : ""}`}
    >
      <div className="site-gutter flex h-24 items-center justify-between">
        <Link href="/" aria-label="Harkcon home" className="brand-logo-link">
          <Image
            src={
              darkSurface
                ? "/images/fullharckonlogowhite.avif"
                : "/images/fullharckonlogoblack.avif"
            }
            alt=""
            width={336}
            height={86}
            className="brand-logo-image"
            priority
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex xl:gap-8">
          <Link className="nav-link" href="/about">
            About
          </Link>
          <Link className="nav-link" href="/news-insights">
            News
          </Link>
          <Link className="nav-link" href="/contracts">
            Contracts
          </Link>
          <Link className="nav-link" href="/careers">
            Careers
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
                <Arrow />
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
        <Link href="/contracts" onClick={closeMenu}>
          Contracts <Arrow diagonal />
        </Link>
        <Link href="/careers" onClick={closeMenu}>
          Careers <Arrow diagonal />
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

function ClientMarquee() {
  const [direction, setDirection] = useState<"forward" | "reverse">("forward")

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const currentY = window.scrollY
      if (Math.abs(currentY - lastY) > 3) {
        setDirection(currentY > lastY ? "forward" : "reverse")
        lastY = currentY
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const repeatedLogos = ["first", "second"].flatMap((copy) =>
    clientLogos.map((logo) => [copy, logo] as const),
  )

  return (
    <section className="client-marquee" aria-labelledby="client-marquee-title">
      <div className="site-gutter client-marquee-heading">
        <p id="client-marquee-title" className="eyebrow">
          Trusted across missions
        </p>
        <p>Organizations we have served</p>
      </div>
      <div className="marquee-viewport">
        <div className={`marquee-track marquee-track--${direction}`}>
          {repeatedLogos.map(([copy, logo]) => (
            <div
              className="client-logo"
              key={`${copy}-${logo.src}`}
              aria-hidden={copy === "second"}
            >
              <Image
                src={logo.src}
                alt={copy === "first" ? logo.name : ""}
                width={180}
                height={90}
                className="client-logo-image"
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
      <div ref={mediaRef} className="hero-media">
        <Image
          src="/images/capitol-hero.png"
          alt="The United States Capitol at sunrise"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="hero-overlay" />
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

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = footer.getBoundingClientRect()
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight * 0.65)),
      )
      footer.style.setProperty("--footer-parallax", `${(1 - progress) * 72}px`)
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
    <footer id="site-footer" ref={footerRef} className="site-footer">
      <div className="site-gutter">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="Harkcon home" className="footer-logo">
              <Image
                src="/images/fullharckonlogowhite.avif"
                alt=""
                width={336}
                height={86}
                className="footer-logo-image"
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
              <Link href="/contracts">Contracts</Link>
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
            <div className="footer-social-links">
              <a
                href="https://www.youtube.com/@harkconinc"
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label="Visit Harkcon on YouTube"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
                </svg>
              </a>
              <a
                href="https://x.com/harkcon"
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label="Visit Harkcon on X"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.24 2.25h3.31l-7.23 8.26 8.51 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/harkcon-inc./"
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label="Visit Harkcon on LinkedIn"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 9h3.55v11.45H3.56V9Zm5.79 0h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.67H9.35V9Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom" data-reveal-line>
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

        <section className="solutions-section" aria-labelledby="solutions-title">
          <div className="site-gutter">
            <div className="solutions-showcase">
              <div className="solutions-intro">
                <h2 id="solutions-title" className="section-title max-w-sm">
                  Our Solutions
                </h2>
                <p className="mt-7 max-w-sm text-base leading-relaxed text-[#5f626b]">
                  Integrated expertise that strengthens workforces, modernizes operations, and turns
                  complex challenges into lasting performance.
                </p>
                <Link href="/solutions" className="pill-button mt-10">
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
                    data-reveal-line
                  >
                    <span className="solution-fill" />
                    <div className="solution-card-content">
                      <span className="solution-number">{solution.number}</span>
                      <h3>{solution.title}</h3>
                      <div className="solution-card-footer">
                        <p>{solution.detail}</p>
                        <span className="solution-arrow">
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

        <section className="about-section" aria-labelledby="about-title">
          <div className="about-copy">
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
              We take pride and ownership in every challenge—bringing service to life for every
              client and every mission.
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
              loading="eager"
              unoptimized
              sizes="(min-width: 900px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="news-section" aria-labelledby="news-title">
          <div className="site-gutter">
            <div className="news-heading-row">
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

            <div className="news-grid">
              <Link
                href="/news-insights/coast-guard-preparedness-support-contract"
                className="news-card group"
                data-reveal-line
              >
                <div className="news-image-wrap">
                  <Image
                    src="https://images.unsplash.com/photo-1519922838705-9d6cb8bcfaea?auto=format&fit=crop&w=1600&q=85"
                    alt="The United States Capitol in Washington, D.C."
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="news-card-body">
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
                className="news-card group"
                data-reveal-line
              >
                <div className="news-image-wrap">
                  <Image
                    src="https://images.unsplash.com/photo-1758518730151-cf64fddb4f0a?auto=format&fit=crop&w=1600&q=85"
                    alt="Business professionals collaborating in an office meeting"
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="news-card-body">
                  <time dateTime="2025-10-28">October 28, 2025</time>
                  <h3>Harkcon named a 2026 Elev8 GovCon honoree</h3>
                  <p>
                    The recognition marks a second consecutive year celebrating Harkcon&apos;s
                    culture, innovation, and commitment to doing business the right way...
                  </p>
                </div>
              </Link>
            </div>

            <Link href="/news-insights" className="pill-button mt-10">
              Find more news <Arrow />
            </Link>
          </div>
        </section>

        <section className="cta-section">
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
