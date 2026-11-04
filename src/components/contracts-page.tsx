"use client"

import Image from "next/image"
import Link from "~/components/visibility-link"
import { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react"
import DocumentDownload from "~/components/document-download"
import HeroParallaxImage from "~/components/hero-parallax-image"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import SectionWatermark from "~/components/section-watermark"
import { oasisSdvosbCapabilities } from "~/lib/contract-content"
import {
  defaultContractSections,
  detailLabels,
  type ContractProject,
  type ContractSection,
} from "~/lib/contract-editor"
import { HARKCON_CAPABILITY_STATEMENT_URL, OASIS_SOLICITATION_URL } from "~/lib/documents"
import { keepClosingWords } from "~/lib/typography"
import { useEditingMode } from "./editing-mode"
import { PageText, PageImage, PageLink, usePageDraft } from "./page-editing"

type ContractView = "contracts" | "oasis"

const viewContent = {
  contracts: {
    label: "Contract vehicles",
    title: "Experienced support. Clear access.",
    summary: "Flexible paths to Harkcon’s people, performance, and technology expertise.",
    heroImage: "/images/editorial/contracts-hero.jpg",
    heroAlt: "The United States Capitol beneath a clear blue sky",
    sections: [
      ["contracts-gsa-group", "GSA"],
      ["contracts-idiq-group", "IDIQ"],
      ["contracts-naics", "Designation & NAICS Codes"],
    ],
  },
  oasis: {
    label: "OASIS+",
    title: "Professional services. Defined scope.",
    summary: "Best-in-Class access to complex, integrated professional services.",
    heroImage: "/images/editorial/oasis-hero.jpg",
    heroAlt: "An aerial view of connected road infrastructure and surrounding trees",
    sections: [
      ["oasis-small-business", "Small Business"],
      ["oasis-sdvosb", "SDVOSB"],
      ["oasis-legacy", "Legacy OASIS"],
      ["oasis-documents", "Documents"],
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
          key={keepClosingWords(item)}
          className="group grid grid-cols-[42px_1fr] gap-4 py-7 md:grid-cols-[56px_1fr] md:gap-6 md:py-8"
          data-reveal-line
        >
          <span
            className={`pt-1 font-eyebrow text-eyebrow-label tracking-[0.12em] ${navy ? "text-white/38" : "text-[#8b8e96]"}`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <PageText field={`scope-service-${index}`}>
            <p className="font-header text-card-title text-pretty transition-transform delay-0 duration-500 ease-out group-hover:translate-x-[9px]">
              {keepClosingWords(item)}
            </p>
          </PageText>
        </li>
      ))}
    </ol>
  )
}

function SectionRail({
  view,
  sections,
  activeSection,
  visible,
  dark,
}: {
  view: ContractView
  sections: readonly (readonly [string, string])[]
  activeSection: string
  visible: boolean
  dark: boolean
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
      {sections.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          className="group relative flex h-3 w-3 items-center justify-center rounded-full outline-none"
          aria-label={`Go to ${label}`}
          onClick={handleSectionClick}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full transition-all duration-200 group-hover:scale-[1.75] group-focus-visible:scale-[1.75] ${activeSection === id ? "scale-[1.75]" : ""} ${dark ? `group-hover:bg-white group-focus-visible:bg-white ${activeSection === id ? "bg-white" : "bg-white/40"}` : `group-hover:bg-[#0d132d] group-focus-visible:bg-[#0d132d] ${activeSection === id ? "bg-[#0d132d]" : "bg-[#0d132d]/25"}`}`}
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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!pair) return
    let frame = 0
    const update = () => {
      frame = 0
      if (reduced.matches) {
        pair.style.setProperty("--contract-photo-y", "0px")
        return
      }
      const rect = pair.getBoundingClientRect()
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
      )
      pair.style.setProperty("--contract-photo-y", `${(progress - 0.5) * 70}px`)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    reduced.addEventListener("change", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      reduced.removeEventListener("change", onScroll)
    }
  }, [])
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
            unoptimized={photo.src.startsWith("http")}
            className="translate-y-(--contract-photo-y) scale-[1.18] object-cover will-change-transform motion-reduce:transform-none"
          />
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

function ContractListing({ id, title, description, photo, details, list }: ContractProject) {
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
              {keepClosingWords(title)}
            </h3>
            <ContractDescription text={description} />
          </>
        }
      >
        <div>
          {details.length > 0 && (
            <dl className="grid gap-x-6 gap-y-6 border-b border-[#0d132d]/15 pb-6 sm:grid-cols-2 lg:min-h-[var(--contract-description-height)]">
              {details.map(({ key, value }) => (
                <div key={key} className="min-w-0">
                  <dt className="font-eyebrow text-xs font-semibold tracking-[0.08em] text-[#5f626b] uppercase">
                    {detailLabels[key]}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-pretty [overflow-wrap:anywhere]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          {list.items.length > 0 && (
            <>
              <h4 className="mt-9 font-eyebrow text-xs font-semibold tracking-[0.12em] uppercase">
                {list.kind === "services" ? "Services provided" : "NAICS codes"}
              </h4>
              <ul
                aria-label={list.kind === "services" ? "Services provided" : "NAICS codes"}
                className="mt-4 divide-y divide-[#0d132d]/10"
                id={
                  list.kind === "naics"
                    ? id === "contracts-designation"
                      ? "contracts-naics-list"
                      : `${id}-naics-list`
                    : undefined
                }
              >
                {list.kind === "services"
                  ? list.items.map((item, index) => (
                      <li key={index} className="py-4">
                        <p className="text-sm leading-relaxed text-pretty">{item}</p>
                      </li>
                    ))
                  : list.items.map((item, index) => (
                      <li key={index} className="grid grid-cols-[4rem_1fr] gap-4 py-5">
                        <span className="font-eyebrow text-xs font-semibold tracking-[0.05em]">
                          {item.code}
                        </span>
                        <p className="text-sm leading-relaxed text-pretty text-[#454955]">
                          {keepClosingWords(item.title)}
                        </p>
                      </li>
                    ))}
              </ul>
            </>
          )}
        </div>
      </ContractPair>
    </section>
  )
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
  const editing = useEditingMode()
  return (
    <nav inert={editing} aria-label={label} className="mt-7 grid gap-x-6 sm:grid-cols-2">
      {links.map(([id, text], index) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={scrollToProject}
          className={`group flex min-h-14 items-center gap-3 border-t py-4 text-sm leading-snug focus-visible:outline-2 focus-visible:outline-offset-4 ${dark ? "border-white/25 focus-visible:outline-white" : "border-[#0d132d]/20 focus-visible:outline-[#0d132d]"}`}
        >
          <span
            className={`font-eyebrow text-[10px] transition-colors duration-200 ${dark ? "text-white/40 group-hover:text-brand-gold group-focus-visible:text-brand-gold" : "text-[#8b8e96] group-hover:text-brand-red group-focus-visible:text-brand-red"}`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-pretty transition-transform delay-0 duration-500 ease-out group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5">
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

function ContractGroupHeading({ section }: { section: ContractSection }) {
  return (
    <header className="bg-[#0d132d] text-white">
      <div className={`site-gutter py-18 md:py-21 ${contractColumnsClassName}`}>
        <div>
          <p className="font-eyebrow text-xs font-semibold tracking-[0.16em] text-[#ffb612] uppercase">
            {section.eyebrow}
          </p>
          <h2 className="mt-4 max-w-xl font-header text-[clamp(2.25rem,3.2vw,3.25rem)] leading-tight font-medium text-balance">
            {keepClosingWords(section.title)}
          </h2>
        </div>
        <div>
          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-white/75">
            {section.description}
          </p>
          <SectionLinks
            label={`${section.title} quick links`}
            links={section.projects.map((project) => [project.id, project.title] as const)}
            dark
          />
        </div>
      </div>
    </header>
  )
}
function ContractGroups({ sections }: { sections: ContractSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-28"
          aria-label={section.title}
        >
          <ContractGroupHeading section={section} />
          {section.projects.map((project) => (
            <ContractListing key={project.id} {...project} />
          ))}
        </section>
      ))}
    </>
  )
}

function OasisScope() {
  return (
    <>
      <div className="relative isolate bg-[#0d132d] text-white">
        <SectionWatermark />
        <section id="oasis-scope" className={contractSectionClassName()}>
          <div className={`site-gutter relative ${contractColumnsClassName}`}>
            <div className="self-start lg:sticky lg:top-36">
              <PageText field="scope-eyebrow">
                <p className="eyebrow mb-5 text-brand-gold">Scope &amp; access</p>
              </PageText>
              <PageText field="scope-title">
                <h2 className={contractHeadingClassName}>Aligned to the&nbsp;requirement.</h2>
              </PageText>
              <PageText field="scope-description">
                <p className="mt-8 max-w-xl text-body-copy text-pretty text-white/65">
                  Harkcon’s vehicles provide access to professional services aligned with the GSA
                  OASIS+ program structure. We support requirements consistent with our awarded
                  contract domains, scope, and ordering&nbsp;procedures.
                </p>
              </PageText>
              <div className="mt-12 grid items-start gap-5">
                <PageLink field="scope-link">
                  <Link href="/contact" className="text-link w-fit text-white" data-reveal-line>
                    Discuss scope fit <Arrow />
                  </Link>
                </PageLink>
              </div>
            </div>
            <NumberedList items={oasisSdvosbCapabilities} navy />
          </div>
        </section>
      </div>
    </>
  )
}
function OasisVerification() {
  return (
    <>
      <section id="oasis-verification" className={contractSectionClassName("soft")}>
        <div
          className={`mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 ${contractTwoColumnClassName}`}
        >
          <div>
            <PageText field="verify-title">
              <h2 className={contractHeadingClassName}>Verify our&nbsp;contracts.</h2>
            </PageText>
          </div>
          <div className="text-body-copy text-[#454955]">
            <PageText field="verify-description">
              <p>
                Federal customers and teaming partners can verify Harkcon’s GSA contract information
                through official government sources. For current task-order availability, scope fit,
                teaming discussions, or customer-specific questions, contact Harkcon&nbsp;directly.
              </p>
            </PageText>
            <div className="mt-10 grid border-b border-[#0d132d]/20">
              {publicLinks.map(([href, label]) => (
                <PageLink key={href} field={`verify-link-${href}`}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-5 border-b border-[#0d132d]/35 py-6 font-header text-card-title text-[#0d132d]"
                  >
                    <span className="relative transition-transform delay-0 duration-500 ease-out group-hover:translate-x-1.5 after:pointer-events-none after:absolute after:-bottom-2 after:left-0 after:h-px after:w-8 after:origin-left after:scale-x-0 after:bg-brand-red after:transition-transform after:duration-200 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none">
                      {label}
                    </span>
                    <Arrow
                      diagonal
                      className="shrink-0 transition-transform duration-500 group-hover:rotate-45 group-focus-visible:rotate-45"
                    />
                  </a>
                </PageLink>
              ))}
            </div>
          </div>
        </div>
      </section>
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
      <PageText field="contact-eyebrow">
        <p className="eyebrow text-pretty text-[#5f626b]">{label}</p>
      </PageText>
      <PageText field="contact-name">
        <strong className="mt-5 font-header text-xl font-medium text-[#0d132d]">
          Paula Harkins
        </strong>
      </PageText>
      <PageText field="contact-role">
        <span className="mb-3 text-sm text-[#5f626b]">Chief Growth Officer</span>
      </PageText>
      <PageLink field="contact-email">
        <a href="mailto:pharkins@harkcon.com" className={linkClassName}>
          pharkins@harkcon.com
        </a>
      </PageLink>
      <PageLink field="contact-phone">
        <a href="tel:+15407838271" className={linkClassName}>
          540-783-8271
        </a>
      </PageLink>
    </div>
  )
}

function ContractCta({ id }: { id: string }) {
  return (
    <section id={id} className="scroll-mt-28 bg-[#0d132d] text-white">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start justify-between gap-10 px-5 py-20 sm:px-8 md:flex-row md:items-end md:py-24 lg:px-12 xl:px-16">
        <div>
          <PageText field="cta-title">
            <h2 className={contractHeadingClassName}>
              Let’s find the clearest path to your next mission&nbsp;outcome.
            </h2>
          </PageText>
        </div>
        <PageLink field="cta-link">
          <Link href="/contact" className="action-button action-button--light shrink-0">
            Contact our team <Arrow />
          </Link>
        </PageLink>
      </div>
    </section>
  )
}

export default function ContractsPage({ view = "contracts" }: { view?: ContractView }) {
  const { draft, editing } = usePageDraft()
  const sections = draft.contractSections ?? defaultContractSections(view)
  const railSections = sections.map((section) => [section.id, section.title] as const)
  const sectionIds = railSections.map(([id]) => id).join(",")
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? "")
  const [railVisible, setRailVisible] = useState(false)
  const [railDark, setRailDark] = useState(false)

  useEffect(() => {
    if (editing) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .toSorted((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visibleEntries[0]) setActiveSection(visibleEntries[0].target.id)
      },
      { rootMargin: "-18% 0px -66%", threshold: [0, 0.1] },
    )

    sectionIds.split(",").forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [editing, sectionIds])

  useEffect(() => {
    if (editing) return
    let frame = 0
    const update = () => {
      frame = 0
      setRailVisible(window.scrollY > Math.max(360, window.innerHeight * 0.58))
      const background = document
        .elementsFromPoint(1, window.innerHeight / 2)
        .map((element) => getComputedStyle(element).backgroundColor)
        .find((color) => color !== "rgba(0, 0, 0, 0)" && color !== "transparent")
      setRailDark(background === "rgb(13, 19, 45)")
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
  }, [editing])

  const content = viewContent[view]

  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <div inert={editing}>
        <Header
          searchPageTitle={view === "contracts" ? "Contracts" : "OASIS+"}
          searchSections={[
            ...sections.map((section) => ({ id: section.id, title: section.title })),
            ...sections.flatMap((section) =>
              section.projects.map((project) => ({ id: project.id, title: project.title })),
            ),
            ...(view === "oasis"
              ? [
                  { id: "oasis-scope", title: "Scope & access" },
                  { id: "oasis-verification", title: "Verify our contracts" },
                ]
              : []),
          ]}
        />
      </div>
      <div className="relative">
        <section
          className="relative h-[52svh] min-h-[360px] overflow-hidden md:min-h-[400px]"
          aria-label={`${content.label} hero image`}
        >
          <PageImage field="hero-image">
            <HeroParallaxImage
              key={view}
              src={content.heroImage}
              alt={content.heroAlt}
              imageClassName="object-cover scale-[1.02]"
            />
          </PageImage>
          <div className="page-hero-overlay absolute inset-0 z-[1]" />
          <div
            className={`site-gutter relative z-30 flex h-full items-end justify-between pb-8 text-white md:pb-10 ${editing ? "pointer-events-none [&_[data-page-text]]:pointer-events-auto" : ""}`}
          >
            <PageText field="hero-eyebrow">
              <p className="eyebrow text-pretty text-white/75">{content.label}</p>
            </PageText>
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
                  {view !== "contracts" && (
                    <span className="font-eyebrow text-eyebrow-label tracking-[0.15em] text-[#8b8e96]">
                      02
                    </span>
                  )}
                  <PageText field="overview-eyebrow">
                    <p className="eyebrow text-pretty">{content.label}</p>
                  </PageText>
                </div>
                <SectionLinks
                  label={`${content.label} overview links`}
                  links={[
                    ...railSections,
                    ...(view === "oasis"
                      ? ([
                          ["oasis-scope", "Scope & access"],
                          ["oasis-documents", "Documents"],
                          ["oasis-verification", "Verification"],
                        ] as const)
                      : []),
                  ]}
                />
                <div
                  id={view === "contracts" ? "contracts-documents" : undefined}
                  className="mt-8 scroll-mt-28"
                >
                  <DocumentDownload
                    field="capability-document"
                    href={HARKCON_CAPABILITY_STATEMENT_URL}
                    title="Harkcon Capability Statement"
                    description="Company capabilities, qualifications, and contracting information."
                  />
                  {view === "oasis" && (
                    <div id="oasis-documents" className="scroll-mt-28">
                      <DocumentDownload
                        field="solicitation-document"
                        href={OASIS_SOLICITATION_URL}
                        title="OASIS Solicitation — Sections B through J"
                        description="Official contract solicitation sections and requirements."
                      />
                    </div>
                  )}
                </div>
                <PageLink field="overview-link">
                  <Link href="/contact" className="action-button mt-6">
                    Contact business development <Arrow />
                  </Link>
                </PageLink>
              </div>
              <div>
                <PageText field="overview-title">
                  <h1
                    id="contracts-hero-title"
                    className="max-w-5xl font-header text-display font-medium text-balance"
                  >
                    {keepClosingWords(content.title)}
                  </h1>
                </PageText>
                <PageText field="overview-summary">
                  <p className="mt-8 max-w-3xl text-body-copy text-pretty text-[#5f626b]">
                    {keepClosingWords(content.summary)}
                  </p>
                </PageText>
                {view === "contracts" ? (
                  <div className="mt-9 max-w-3xl border-t border-[#0d132d]/15 pt-8">
                    <PageText field="overview-description">
                      <p className="text-body-copy text-pretty text-[#454955]">
                        Harkcon provides workforce analysis, training, and program support to
                        government and commercial clients. Since 2005, our teams have helped
                        agencies assess requirements, develop their people, and manage complex
                        programs through established contract&nbsp;vehicles.
                      </p>
                    </PageText>
                    <p className="mt-6 text-body-copy text-pretty text-[#454955]">
                      <PageText field="contact-introduction">
                        <span>Need help choosing a vehicle? Contact Paula Harkins at</span>
                      </PageText>{" "}
                      <PageLink field="contact-email">
                        <a
                          href="mailto:pharkins@harkcon.com"
                          className={contractInlineLinkClassName}
                        >
                          pharkins@harkcon.com
                        </a>
                      </PageLink>{" "}
                      or{"\u00a0"}
                      <PageLink field="contact-phone">
                        <a href="tel:+15407838271" className={contractInlineLinkClassName}>
                          540-783-8271
                        </a>
                      </PageLink>
                      .
                    </p>
                  </div>
                ) : (
                  <div className="mt-9 max-w-3xl border-t border-[#0d132d]/15 pt-8">
                    <PageText field="overview-description">
                      <p className="text-body-copy text-pretty text-[#454955]">
                        One Acquisition Solution for Integrated Services Plus is GSA&apos;s
                        governmentwide, multi-agency contract program for complex professional
                        services. It gives federal agencies flexible access to Harkcon&apos;s
                        program management, workforce development, training, process improvement,
                        and organizational performance&nbsp;support.
                      </p>
                    </PageText>
                    <OasisContactCard className="mt-10" label="OASIS+ point of contact" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {!editing && (
          <SectionRail
            view={view}
            sections={railSections}
            activeSection={activeSection}
            visible={railVisible}
            dark={railDark}
          />
        )}
        <div key={view} className="relative">
          {view === "oasis" && <OasisScope />}
          {editing ? (
            <>
              {view === "oasis" && <OasisVerification />}
              <ContractCta id={`${view}-cta`} />
            </>
          ) : (
            <>
              <ContractGroups sections={sections} />
              {view === "oasis" && <OasisVerification />}
              <ContractCta id={`${view}-cta`} />
            </>
          )}
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
