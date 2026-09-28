"use client"

import { CaretDown, List, X } from "@phosphor-icons/react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { TransitionLink as Link } from "~/components/page-transition"

const links = [
  { href: "/solutions", label: "Solutions" },
  { href: "/contracts", label: "Contracts" },
  { href: "/careers", label: "Careers" },
  { href: "/news-insights", label: "News & Insights" },
]

const underline =
  "relative inline-block after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brand-white after:transition-transform after:duration-200 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none"

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 48)
    updateScroll()
    window.addEventListener("scroll", updateScroll, { passive: true })
    return () => window.removeEventListener("scroll", updateScroll)
  }, [])

  function closeMenus() {
    setAboutOpen(false)
    setMobileOpen(false)
    setMobileAboutOpen(false)
  }

  const solid = pathname !== "/" || scrolled || aboutOpen || mobileOpen

  return (
    <>
      {/* oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- The header handles menu dismissal; its links and buttons remain the controls. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 text-brand-white transition-colors duration-400 motion-reduce:transition-none ${solid ? "bg-brand-navy" : "bg-transparent"}`}
        onMouseLeave={() => setAboutOpen(false)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setAboutOpen(false)
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") closeMenus()
        }}
      >
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-20 max-w-[90rem] items-center justify-between gap-6 px-6 lg:px-10"
        >
          <Link href="/" aria-label="Harkcon home" onClick={closeMenus}>
            <Image src="/logo-white.svg" alt="Harkcon" width={48} height={48} className="size-12" />
          </Link>

          <div className="hidden items-center gap-7 lg:flex xl:gap-9">
            <div className="flex items-center" onMouseEnter={() => setAboutOpen(true)}>
              <Link
                href="/about"
                aria-current={pathname === "/about" ? "page" : undefined}
                onClick={closeMenus}
                className="py-1 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-white"
              >
                About
              </Link>
              <button
                type="button"
                aria-label="Show About links"
                aria-controls="about-links"
                aria-expanded={aboutOpen}
                onClick={() => setAboutOpen(true)}
                className="ml-0.5 flex h-8 w-5 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-brand-white"
              >
                <span
                  className={`inline-flex transition-transform duration-200 ease-in-out motion-reduce:transition-none ${aboutOpen ? "-rotate-180" : ""}`}
                >
                  <CaretDown size={14} weight="bold" />
                </span>
              </button>
            </div>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                onMouseEnter={() => setAboutOpen(false)}
                onClick={closeMenus}
                className="group py-1 text-sm font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-white"
              >
                <span className={underline}>{label}</span>
              </Link>
            ))}
            <Link
              href="/contact"
              onMouseEnter={() => setAboutOpen(false)}
              onClick={closeMenus}
              className="rounded-full border border-brand-gold bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors duration-200 hover:border-brand-white hover:bg-brand-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-white motion-reduce:transition-none"
            >
              Contact
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-links"
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((open) => !open)
              setAboutOpen(false)
            }}
            className="flex size-11 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-brand-gold lg:hidden"
          >
            {mobileOpen ? <X size={26} /> : <List size={26} />}
          </button>
        </nav>

        <div
          id="about-links"
          aria-hidden={!aboutOpen}
          inert={!aboutOpen}
          className={`hidden overflow-hidden transition-[grid-template-rows] duration-200 motion-reduce:transition-none lg:grid ${aboutOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="mx-auto flex max-w-[90rem] justify-end gap-8 border-t border-brand-white/20 px-10 pt-6 pb-7 text-sm">
              <Link
                href="/about"
                onClick={closeMenus}
                className="group focus-visible:outline-2 focus-visible:outline-brand-white"
              >
                <span className={underline}>About Harkcon</span>
              </Link>
              <Link
                href="/leadership"
                onClick={closeMenus}
                className="group focus-visible:outline-2 focus-visible:outline-brand-white"
              >
                <span className={underline}>Leadership</span>
              </Link>
            </div>
          </div>
        </div>

        <div
          id="mobile-links"
          aria-hidden={!mobileOpen}
          inert={!mobileOpen}
          className={`grid overflow-hidden transition-[grid-template-rows] duration-200 motion-reduce:transition-none lg:hidden ${mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="max-h-[calc(100svh-5rem)] min-h-0 overflow-y-auto">
            <div className="flex flex-col gap-1 border-t border-brand-white/20 px-6 pt-4 pb-6 text-base font-medium">
              <div className="flex items-center">
                <Link href="/about" onClick={closeMenus} className="py-2">
                  About
                </Link>
                <button
                  type="button"
                  aria-label="Show About links"
                  aria-controls="mobile-about-links"
                  aria-expanded={mobileAboutOpen}
                  onClick={() => setMobileAboutOpen((open) => !open)}
                  className="ml-0.5 flex size-10 items-center justify-start pl-1"
                >
                  <span
                    className={`inline-flex transition-transform duration-200 ease-in-out motion-reduce:transition-none ${mobileAboutOpen ? "-rotate-180" : ""}`}
                  >
                    <CaretDown size={18} weight="bold" />
                  </span>
                </button>
              </div>
              <div
                id="mobile-about-links"
                aria-hidden={!mobileAboutOpen}
                inert={!mobileAboutOpen}
                className={`grid overflow-hidden transition-[grid-template-rows] duration-200 motion-reduce:transition-none ${mobileAboutOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="flex min-h-0 flex-col overflow-hidden pl-4 text-sm font-normal">
                  <Link href="/about" onClick={closeMenus} className="py-2">
                    About Harkcon
                  </Link>
                  <Link href="/leadership" onClick={closeMenus} className="py-2">
                    Leadership
                  </Link>
                </div>
              </div>
              {links.map(({ href, label }) => (
                <Link key={href} href={href} onClick={closeMenus} className="py-2">
                  {label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={closeMenus}
                className="mt-3 self-start rounded-full border border-brand-gold bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors duration-200 hover:border-brand-white hover:bg-brand-white motion-reduce:transition-none"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>
      {pathname !== "/" && <div aria-hidden="true" className="h-20 shrink-0" />}
    </>
  )
}
