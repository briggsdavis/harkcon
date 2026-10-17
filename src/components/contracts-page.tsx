"use client"

import Image from "next/image"
import Link from "next/link"
import { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react"
import DocumentDownload from "~/components/document-download"
import HeroParallaxImage from "~/components/hero-parallax-image"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import {
  contractGroups,
  contractImages,
  contractRecords,
  naicsCodes,
  oasisSdvosbCapabilities,
  oasisSupportTypes,
  type ContractRecord,
} from "~/lib/contract-content"
import { HARKCON_CAPABILITY_STATEMENT_URL, OASIS_SOLICITATION_URL } from "~/lib/documents"

type ContractView = "contracts" | "oasis"

const viewContent = {
  contracts: {
    label: "Contract vehicles",
    title: "Experienced support. Clear access.",
    summary: "Flexible paths to Harkcon’s people, performance, and technology expertise.",
    heroImage: "/images/editorial/contracts-hero.jpg",
    heroAlt: "The United States Capitol beneath a clear blue sky",
    sections: [
      ["contracts-overview", "Overview"],
      ["contracts-gsa-group", "GSA"],
      ["contracts-idiq-group", "IDIQ"],
      ["contracts-naics", "Designation & NAICS Codes"],
      ["contracts-cta", "Get started"],
    ],
  },
  oasis: {
    label: "OASIS+",
    title: "Professional services. Defined scope.",
    summary: "Best-in-Class access to complex, integrated professional services.",
    heroImage: "/images/editorial/oasis-hero.jpg",
    heroAlt: "An aerial view of connected road infrastructure and surrounding trees",
    sections: [
      ["oasis-overview", "Overview"],
      ["oasis-small-business", "Small Business"],
      ["oasis-sdvosb", "SDVOSB"],
      ["oasis-legacy", "Legacy OASIS"],
      ["oasis-scope", "Scope & access"],
      ["oasis-documents", "Documents"],
      ["oasis-verification", "Verification"],
      ["oasis-work", "Work with us"],
      ["oasis-cta", "Get started"],
    ],
  },
} as const

type SectionTone = "white" | "soft" | "navy"

const contractSectionClassName = (tone: SectionTone = "white") =>
  `scroll-mt-28 py-21 md:py-30 ${tone === "soft" ? "bg-[#f4f3f0]" : ""} ${tone === "navy" ? "bg-[#0d132d] text-white" : ""}`

const contractHeadingClassName = "text-balance max-w-4xl font-header text-section-title font-medium"
const contractColumnsClassName = "grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16"
const contractTwoColumnClassName = contractColumnsClassName
const contractInlineLinkClassName =
  "border-b border-[#0d132d]/35 text-[#0d132d] transition-opacity hover:opacity-55"

function NumberedList({ items, navy = false }: { items: readonly string[]; navy?: boolean }) {
  return (
    <ol className={`border-b ${navy ? "border-white/20" : "border-[#0d132d]/20"}`}>
      {items.map((item, index) => (
        <li
          key={item}
          className="group grid grid-cols-[42px_1fr] gap-4 py-7 md:grid-cols-[56px_1fr] md:gap-6 md:py-8"
          data-reveal-line
        >
          <span
            className={`pt-1 font-eyebrow text-eyebrow-label tracking-[0.12em] ${navy ? "text-white/38" : "text-[#8b8e96]"}`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="font-header text-card-title text-pretty transition-transform duration-500 group-hover:translate-x-[9px]">
            {item}
          </p>
        </li>
      ))}
    </ol>
  )
}

function SectionRail({
  view,
  activeSection,
  visible,
}: {
  view: ContractView
  activeSection: string
  visible: boolean
}) {
  const handleSectionClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const id = event.currentTarget.hash.slice(1)
    const section = document.getElementById(id)
    if (!section) return

    window.history.replaceState({}, "", `#${id}`)
    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY - 24,
      behavior: "smooth",
    })
  }, [])

  return (
    <nav
      className={`fixed top-1/2 left-3 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 transition-opacity duration-300 lg:flex xl:left-5 ${visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      aria-label={`${viewContent[view].label} sections`}
    >
      {viewContent[view].sections.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          className="group relative flex h-3 w-3 items-center justify-center rounded-full outline-none"
          aria-label={`Go to ${label}`}
          onClick={handleSectionClick}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full transition-all duration-200 group-hover:scale-[1.75] group-hover:bg-[#0d132d] group-focus-visible:scale-[1.75] group-focus-visible:bg-[#0d132d] ${activeSection === id ? "scale-[1.75] bg-[#0d132d]" : "bg-[#0d132d]/25"}`}
          />
          <strong className="pointer-events-none absolute left-5 -translate-x-1 rounded-sm bg-[#0d132d] px-2.5 py-1.5 font-eyebrow text-[0.6rem] font-semibold tracking-[0.1em] whitespace-nowrap text-white uppercase opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
            {label}
          </strong>
        </a>
      ))}
    </nav>
  )
}

function ContractPair({
  children,
  photo,
  introduction,
}: {
  children: ReactNode
  photo: { src: string; alt: string }
  introduction?: ReactNode
}) {
  const pairRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const pair = pairRef.current
    const heading = pair?.querySelector("h3")
    if (!pair || !heading) return
    const description = pair.querySelector<HTMLParagraphElement>(".contract-description")
    const details = pair.querySelector<HTMLDListElement>("dl")
    const align = () => {
      pair.style.setProperty(
        "--contract-details-offset",
        `${heading.getBoundingClientRect().height + 20}px`,
      )
      if (!description || !details) return
      // Measure both blocks at their natural height before sharing the taller one.
      description.style.minHeight = "3lh"
      details.style.minHeight = "0px"
      const height = Math.max(
        description.getBoundingClientRect().height,
        details.getBoundingClientRect().height,
      )
      pair.style.setProperty("--contract-description-height", `${height}px`)
      description.style.minHeight = ""
      details.style.minHeight = ""
    }
    align()
    const observer = new ResizeObserver(align)
    observer.observe(heading)
    if (description) observer.observe(description)
    if (details) observer.observe(details)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={pairRef}
      className={`site-gutter items-start border-b border-[#0d132d]/15 py-21 md:py-30 ${contractColumnsClassName}`}
    >
      <div className="min-w-0 self-start lg:sticky lg:top-28">
        {introduction}
        <div
          className={`group relative aspect-[3/2] overflow-hidden bg-[#f4f3f0] ${introduction ? "mt-9" : ""}`}
          data-reveal-skip
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="object-cover grayscale-50"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-[clip-path] duration-900 ease-[cubic-bezier(0.77,0,0.18,1)] [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0)] motion-reduce:transition-none"
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="min-w-0 lg:pt-[var(--contract-details-offset,4rem)]">{children}</div>
    </div>
  )
}

function ContractDescription({ text }: { text: string }) {
  const words = text.trim().split(/\s+/)
  return (
    <p className="contract-description mt-5 min-h-[3lh] text-justify text-base leading-relaxed text-pretty text-[#454955] lg:min-h-[var(--contract-description-height,3lh)]">
      {words.slice(0, -2).join(" ")}{" "}
      <span className="whitespace-nowrap">{words.slice(-2).join(" ")}</span>
    </p>
  )
}

function ContractListing({
  id,
  title,
  description,
  eyebrow,
  prime,
  contract,
  period,
  capabilities,
  photo,
}: ContractRecord) {
  return (
    <section id={id} className="scroll-mt-28" aria-labelledby={`${id}-title`}>
      <ContractPair
        photo={photo}
        introduction={
          <>
            <h3
              id={`${id}-title`}
              className="font-header text-section-title font-medium text-balance"
            >
              {title}
            </h3>
            <ContractDescription text={description} />
          </>
        }
      >
        <div>
          <dl className="grid gap-x-6 gap-y-6 border-b border-[#0d132d]/15 pb-6 sm:grid-cols-2 lg:min-h-[var(--contract-description-height)]">
            {[
              ["Vehicle", eyebrow],
              ["Prime contractor", prime],
              ["Contract number", contract],
              ["Period of performance", period],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0">
                <dt className="font-eyebrow text-xs font-semibold tracking-[0.08em] text-[#5f626b] uppercase">
                  {label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-pretty [overflow-wrap:anywhere]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <h4 className="mt-9 font-eyebrow text-xs font-semibold tracking-[0.12em] uppercase">
            Services provided
          </h4>
          <ul className="mt-4 divide-y divide-[#0d132d]/10">
            {capabilities.map((item) => (
              <li key={item.title} className="py-4">
                <p className="text-sm leading-relaxed text-pretty">
                  {item.label ? <span className="mr-2 font-semibold">{item.label}</span> : null}
                  {item.title}
                </p>
                {item.detail ? (
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-[#5f626b]">
                    {item.detail}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </ContractPair>
    </section>
  )
}

const contractGroupLinks: Record<string, readonly (readonly [string, string])[]> = {
  ...Object.fromEntries(
    Object.values(contractGroups).map((group) => [
      group.title,
      group.recordIds.map(
        (id) => [id, contractRecords[id].navLabel ?? contractRecords[id].title] as const,
      ),
    ]),
  ),
  "Designation & NAICS Codes": [
    ["contracts-designation", "SDVOSB designation"],
    ["contracts-naics-list", "NAICS codes"],
  ],
}

const emptySectionLinks: readonly (readonly [string, string])[] = []
const overviewLinks: Record<ContractView, readonly (readonly [string, string])[]> = {
  contracts: [
    ["contracts-gsa-group", "GSA"],
    ["contracts-idiq-group", "IDIQ"],
    ["contracts-naics", "Designation & NAICS Codes"],
  ],
  oasis: [
    ["oasis-vehicles", "OASIS+ vehicles"],
    ["oasis-legacy-group", "Legacy OASIS"],
    ["oasis-scope", "Scope & access"],
    ["oasis-documents", "Documents"],
    ["oasis-verification", "Verification"],
    ["oasis-work", "Work with us"],
  ],
}

function SectionLinks({
  label,
  links,
  dark = false,
}: {
  label: string
  links: readonly (readonly [string, string])[]
  dark?: boolean
}) {
  const scrollToProject = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(event.currentTarget.hash.slice(1))
    if (!target) return
    event.preventDefault()
    window.history.replaceState({}, "", event.currentTarget.hash)
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 112,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    })
  }, [])
  return (
    <nav aria-label={label} className="mt-7 grid gap-x-6 sm:grid-cols-2">
      {links.map(([id, text], index) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={scrollToProject}
          className={`group flex min-h-14 items-center gap-3 border-t py-4 text-sm leading-snug focus-visible:outline-2 focus-visible:outline-offset-4 ${dark ? "border-white/25 focus-visible:outline-white" : "border-[#0d132d]/20 focus-visible:outline-[#0d132d]"}`}
        >
          <span className={`font-eyebrow text-[10px] ${dark ? "text-white/40" : "text-[#8b8e96]"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-pretty transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5">
            {text}
          </span>
          <Arrow
            diagonal
            className="ml-auto shrink-0 transition-transform duration-500 ease-out group-hover:rotate-45 group-focus-visible:rotate-45"
          />
        </a>
      ))}
    </nav>
  )
}

function ContractGroupHeading({ title, description }: { title: string; description: string }) {
  const links = contractGroupLinks[title] ?? emptySectionLinks
  return (
    <header className="bg-[#0d132d] text-white">
      <div className={`site-gutter py-18 md:py-21 ${contractColumnsClassName}`}>
        <div>
          <p className="font-eyebrow text-xs font-semibold tracking-[0.16em] text-[#ffb612] uppercase">
            {title === "GSA"
              ? "01 / Contract vehicles"
              : title === "IDIQ"
                ? "02 / Contract vehicles"
                : title === "Designation & NAICS Codes"
                  ? "03 / Company credentials"
                  : "Contract vehicles"}
          </p>
          <h2 className="mt-4 max-w-xl font-header text-[clamp(2.25rem,3.2vw,3.25rem)] leading-tight font-medium text-balance">
            {title}
          </h2>
        </div>
        <div>
          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-white/75">
            {description}
          </p>
          <SectionLinks label={`${title} quick links`} links={links} dark />
        </div>
      </div>
    </header>
  )
}

function ContractGroup({ groupKey }: { groupKey: keyof typeof contractGroups }) {
  const group = contractGroups[groupKey]
  return (
    <section id={group.id} className="scroll-mt-28" aria-label={group.title}>
      <ContractGroupHeading title={group.title} description={group.description} />
      {group.recordIds.map((id) => (
        <ContractListing key={id} {...contractRecords[id]} />
      ))}
    </section>
  )
}

function ContractsContent() {
  return (
    <>
      <ContractGroup groupKey="gsa" />
      <ContractGroup groupKey="idiq" />
      <section
        id="contracts-naics"
        className="scroll-mt-28"
        aria-label="Designation and NAICS codes"
      >
        <ContractGroupHeading
          title="Designation & NAICS Codes"
          description="North American Industry Classification System (NAICS)"
        />
        <section
          id="contracts-designation"
          className="scroll-mt-28"
          aria-labelledby="contracts-designation-title"
        >
          <ContractPair
            photo={contractImages["contracts-naics"]}
            introduction={
              <>
                <h3
                  id="contracts-designation-title"
                  className="font-header text-section-title font-medium text-balance"
                >
                  Service-Disabled Veteran-Owned Small Business
                </h3>
                <ContractDescription text="Harkcon is a VA-certified Service-Disabled Veteran-Owned Small Business. Our professional, technical, administrative, and training classifications help federal customers identify the services that fit their acquisition requirements." />
              </>
            }
          >
            <div>
              <dl className="border-b border-[#0d132d]/15 pb-5 lg:min-h-[var(--contract-description-height)]">
                <dt className="font-eyebrow text-xs font-semibold tracking-[0.08em] uppercase">
                  UEI
                </dt>
                <dd className="mt-2 text-sm">T3GVAM6E2XD9</dd>
              </dl>
              <h4 className="mt-9 font-eyebrow text-xs font-semibold tracking-[0.12em] uppercase">
                NAICS codes
              </h4>
              <ul
                id="contracts-naics-list"
                aria-label="NAICS codes"
                className="mt-4 scroll-mt-28 divide-y divide-[#0d132d]/15"
              >
                {naicsCodes.map(([code, title]) => (
                  <li key={code} className="grid grid-cols-[4rem_1fr] gap-4 py-5">
                    <span className="font-eyebrow text-xs font-semibold tracking-[0.05em]">
                      {code}
                    </span>
                    <p className="text-sm leading-relaxed text-pretty text-[#454955]">{title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </ContractPair>
        </section>
      </section>
      <ContractCta id="contracts-cta" />
    </>
  )
}

function OasisContent() {
  return (
    <>
      <ContractGroup groupKey="oasis" />
      <ContractGroup groupKey="legacy" />
      <section id="oasis-scope" className={contractSectionClassName("navy")}>
        <div className={`site-gutter ${contractColumnsClassName}`}>
          <div className="self-start lg:sticky lg:top-36">
            <h2 className={contractHeadingClassName}>Aligned to the requirement.</h2>
            <p className="mt-8 max-w-xl text-body-copy text-pretty text-white/65">
              Harkcon’s vehicles provide access to professional services aligned with the GSA OASIS+
              program structure. We support requirements consistent with our awarded contract
              domains, scope, and ordering procedures.
            </p>
            <div className="mt-12 grid items-start gap-5">
              <Link href="/contact" className="text-link w-fit text-white" data-reveal-line>
                Discuss scope fit <Arrow />
              </Link>
            </div>
          </div>
          <NumberedList items={oasisSdvosbCapabilities} navy />
        </div>
      </section>

      <section id="oasis-documents" className={contractSectionClassName()}>
        <div className={`site-gutter ${contractColumnsClassName}`}>
          <h2 className={contractHeadingClassName}>Review the program solicitation.</h2>
          <div>
            <p className="text-body-copy text-pretty text-[#454955]">
              Open the governing solicitation sections for detailed OASIS contract structure,
              requirements, and terms.
            </p>
            <DocumentDownload
              href={OASIS_SOLICITATION_URL}
              title="OASIS Solicitation — Sections B through J"
              description="Official contract solicitation sections and requirements."
            />
          </div>
        </div>
      </section>

      <section id="oasis-verification" className={contractSectionClassName("soft")}>
        <div
          className={`mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 ${contractTwoColumnClassName}`}
        >
          <div>
            <h2 className={contractHeadingClassName}>Official sources. Current information.</h2>
          </div>
          <div className="text-body-copy text-[#454955]">
            <p>
              Federal customers and teaming partners can verify Harkcon’s GSA contract information
              through official government sources. For current task-order availability, scope fit,
              teaming discussions, or customer-specific questions, contact Harkcon directly.
            </p>
            <div className="mt-10 grid border-b border-[#0d132d]/20">
              {publicLinks.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-5 border-b border-[#0d132d]/35 py-6 font-header text-card-title text-[#0d132d]"
                >
                  <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                    {label}
                  </span>
                  <Arrow
                    diagonal
                    className="shrink-0 transition-transform duration-500 group-hover:rotate-45 group-focus-visible:rotate-45"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="oasis-work" className={contractSectionClassName()}>
        <div className={`site-gutter ${contractColumnsClassName}`}>
          <div className="self-start lg:sticky lg:top-36">
            <h2 className={contractHeadingClassName}>
              Start with the requirement. Build the right path.
            </h2>
            <p className="mt-8 max-w-xl text-body-copy text-pretty text-[#454955]">
              Federal customers and teaming partners can use Harkcon’s OASIS+ vehicles for
              professional services requirements aligned with GSA scope and Harkcon’s awarded
              contract domains.
            </p>
            <OasisContactCard className="mt-12" label="Contact for OASIS+ opportunities" />
          </div>
          <NumberedList items={oasisSupportTypes} />
        </div>
      </section>

      <ContractCta id="oasis-cta" />
    </>
  )
}

const publicLinks = [
  ["https://www.gsaelibrary.gsa.gov/", "GSA eLibrary"],
  ["https://www.usaspending.gov/", "USAspending.gov"],
  ["https://sam.gov/content/contract-data", "SAM.gov Contract Data"],
] as const

function OasisContactCard({ className, label }: { className: string; label: string }) {
  const linkClassName =
    "w-fit border-b border-[#0d132d]/25 text-sm text-[#0d132d] transition-opacity hover:opacity-55"
  return (
    <div className={`grid border-t border-[#0d132d]/20 pt-8 ${className}`} data-reveal-line>
      <p className="eyebrow text-pretty text-[#5f626b]">{label}</p>
      <strong className="mt-5 font-header text-xl font-medium text-[#0d132d]">Paula Harkins</strong>
      <span className="mb-3 text-sm text-[#5f626b]">Chief Growth Officer</span>
      <a href="mailto:pharkins@harkcon.com" className={linkClassName}>
        pharkins@harkcon.com
      </a>
      <a href="tel:+15407838271" className={linkClassName}>
        540-783-8271
      </a>
    </div>
  )
}

function ContractCta({ id }: { id: string }) {
  return (
    <section id={id} className="scroll-mt-28 bg-[#0d132d] text-white">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start justify-between gap-10 px-5 py-20 sm:px-8 md:flex-row md:items-end md:py-24 lg:px-12 xl:px-16">
        <div>
          <h2 className={contractHeadingClassName}>
            Let’s find the clearest path to your next mission outcome.
          </h2>
        </div>
        <Link href="/contact" className="action-button action-button--light shrink-0">
          Contact our team <Arrow />
        </Link>
      </div>
    </section>
  )
}

export default function ContractsPage({ view = "contracts" }: { view?: ContractView }) {
  const [activeSection, setActiveSection] = useState<string>(viewContent[view].sections[0][0])
  const [railVisible, setRailVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .toSorted((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visibleEntries[0]) setActiveSection(visibleEntries[0].target.id)
      },
      { rootMargin: "-18% 0px -66%", threshold: [0, 0.1] },
    )

    viewContent[view].sections.forEach(([id]) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [view])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setRailVisible(window.scrollY > Math.max(360, window.innerHeight * 0.58))
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

  const content = viewContent[view]

  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header />
      <div className="relative">
        <section
          className="relative h-[52svh] min-h-[360px] overflow-hidden md:min-h-[400px]"
          aria-label={`${content.label} hero image`}
        >
          <HeroParallaxImage
            key={view}
            src={content.heroImage}
            alt={content.heroAlt}
            imageClassName="object-cover scale-[1.02]"
          />
          <div className="page-hero-overlay absolute inset-0 z-[1]" />
          <div className="site-gutter relative z-10 flex h-full items-end justify-between pb-8 text-white md:pb-10">
            <p className="eyebrow text-pretty text-white/75">{content.label}</p>
            <span className="font-eyebrow text-sm tracking-[0.15em] text-white/70">
              {view === "contracts" ? "01" : "02"}
            </span>
          </div>
        </section>

        <section
          id={view === "contracts" ? "contracts-overview" : "oasis-overview"}
          className="py-16 md:py-20 lg:py-24"
          aria-labelledby="contracts-hero-title"
        >
          <div className="site-gutter">
            <div className={contractColumnsClassName}>
              <div>
                <div className="flex items-start gap-5">
                  <span className="font-eyebrow text-eyebrow-label tracking-[0.15em] text-[#8b8e96]">
                    {view === "contracts" ? "01" : "02"}
                  </span>
                  <p className="eyebrow text-pretty">{content.label}</p>
                </div>
                <SectionLinks
                  label={`${content.label} overview links`}
                  links={overviewLinks[view]}
                />
                <div
                  id={view === "contracts" ? "contracts-documents" : undefined}
                  className="mt-8 scroll-mt-28"
                >
                  <DocumentDownload
                    href={HARKCON_CAPABILITY_STATEMENT_URL}
                    title="Harkcon Capability Statement"
                    description="Company capabilities, qualifications, and contracting information."
                  />
                </div>
                <Link href="/contact" className="action-button mt-6">
                  Contact business development <Arrow />
                </Link>
              </div>
              <div>
                <h1
                  id="contracts-hero-title"
                  className="max-w-5xl font-header text-display font-medium text-balance"
                >
                  {content.title}
                </h1>
                <p className="mt-8 max-w-3xl text-body-copy text-pretty text-[#5f626b]">
                  {content.summary}
                </p>
                {view === "contracts" ? (
                  <div className="mt-9 max-w-3xl border-t border-[#0d132d]/15 pt-8">
                    <p className="text-body-copy text-pretty text-[#454955]">
                      Harkcon provides workforce analysis, training, and program support to
                      government and commercial clients. Since 2005, our teams have helped agencies
                      assess requirements, develop their people, and manage complex programs through
                      established contract vehicles.
                    </p>
                    <p className="mt-6 text-body-copy text-pretty text-[#454955]">
                      Need help choosing a vehicle? Contact Paula Harkins at{" "}
                      <a href="mailto:pharkins@harkcon.com" className={contractInlineLinkClassName}>
                        pharkins@harkcon.com
                      </a>{" "}
                      or{" "}
                      <a href="tel:+15407838271" className={contractInlineLinkClassName}>
                        540-783-8271
                      </a>
                      .
                    </p>
                  </div>
                ) : (
                  <div className="mt-9 max-w-3xl border-t border-[#0d132d]/15 pt-8">
                    <p className="text-body-copy text-pretty text-[#454955]">
                      One Acquisition Solution for Integrated Services Plus is GSA&apos;s
                      governmentwide, multi-agency contract program for complex professional
                      services. It gives federal agencies flexible access to Harkcon&apos;s program
                      management, workforce development, training, process improvement, and
                      organizational performance support.
                    </p>
                    <OasisContactCard className="mt-10" label="OASIS+ point of contact" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <SectionRail view={view} activeSection={activeSection} visible={railVisible} />
        <div key={view} className="relative">
          {view === "contracts" ? <ContractsContent /> : <OasisContent />}
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
