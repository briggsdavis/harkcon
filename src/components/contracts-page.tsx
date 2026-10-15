"use client"

import Link from "next/link"
import { MouseEvent, ReactNode, useCallback, useEffect, useState } from "react"
import DocumentDownload from "~/components/document-download"
import HeroParallaxImage from "~/components/hero-parallax-image"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import SubtleParallaxPhoto from "~/components/subtle-parallax-photo"
import { HARKCON_CAPABILITY_STATEMENT_URL, OASIS_SOLICITATION_URL } from "~/lib/documents"

type ContractView = "contracts" | "oasis"

const image = (id: string, premium = false) =>
  `https://${premium ? "plus." : "images."}unsplash.com/${premium ? "premium_photo-" : "photo-"}${id}?auto=format&fit=crop&w=2400&q=88`

const viewContent = {
  contracts: {
    label: "Contract vehicles",
    title: "Expert services. Streamlined access.",
    summary: "Flexible paths to Harkcon’s people, performance, and technology expertise.",
    heroImage: image("1694475191764-09f8c42f7a58", true),
    heroAlt: "The United States Capitol illuminated at night",
    sections: [
      ["contracts-overview", "Overview"],
      ["contracts-gsa", "GSA MAS"],
      ["contracts-teps", "TEPS III"],
      ["contracts-uscg", "USCG Workforce"],
      ["contracts-uscg-itass", "USCG ITASS"],
      ["contracts-idiq", "Legacy OASIS"],
      ["contracts-documents", "Documents"],
      ["contracts-naics", "NAICS codes"],
      ["contracts-cta", "Get started"],
    ],
  },
  oasis: {
    label: "OASIS+",
    title: "One vehicle. Expansive capability.",
    summary: "Best-in-Class access to complex, integrated professional services.",
    heroImage: "/images/about-collaboration.jpg",
    heroAlt: "A consulting team collaborating around a conference table",
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

const gsaServices = [
  {
    code: "541611",
    title: "Administrative management & consulting",
    detail: "A wide range of management and integrated consulting services for federal agencies.",
  },
  {
    code: "611430",
    title: "Professional & management development training",
    detail:
      "Instructor-led and web-based training, course development, test administration, learning management, education courses, and internships.",
  },
]

const tepsAreas = [
  "Program Management Support",
  "Nuclear Engineering Subject Matter Expertise & Analytical Support",
  "Training Support",
  "Security Management Support",
  "Emergency Operations — Domestic & International",
  "Nuclear Nonproliferation Support",
  "Environmental Management & Sustainability",
  "Research & Development",
]

const internationalServices = [
  "Program and project management",
  "International human capital analysis and workforce development",
  "Training performance analysis and instructional systems design",
  "Technical and operational training, including law enforcement, search and rescue, and maritime engineering",
  "In-country maintenance and material condition assessments",
  "Curriculum development, pilot testing, and instructional delivery",
]

const uscgWorkforceServices = [
  "Workforce requirements research and data collection",
  "Analytical modeling and defensible requirements development",
  "Meeting facilitation and stakeholder coordination",
  "Technical writing, documentation, and report development",
]

const legacyOasisServices = [
  "Program management",
  "Management consulting",
  "Logistics",
  "Engineering",
  "Scientific services",
  "Financial services",
]

const naicsCodes = [
  ["323120", "Support Activities for Printing"],
  ["541330", "Engineering Services"],
  ["541511", "Custom Computer Programming Services"],
  ["541519", "Other Computer Related Services"],
  ["541611", "Administrative Management and General Management Consulting Services"],
  ["541612", "Human Resources and Executive Search Consulting Services"],
  ["541613", "Marketing Consulting Services"],
  ["541618", "Other Management Consulting Services"],
  ["541690", "Other Scientific or Technical Consulting Services"],
  ["541990", "All Other Professional, Scientific, and Technical Services"],
  ["561499", "All Other Business Support Services"],
  ["561410", "Document Preparation Services"],
  ["561110", "Office Administrative Services"],
  ["561611", "Investigative & Personal Background Check Services"],
  ["561990", "All Other Support Services"],
  ["611420", "Computer Training"],
  ["611430", "Professional and Management Development Training"],
  ["611512", "Flight Training"],
  ["611519", "Other Technical and Trade Schools"],
  ["611699", "All Other Miscellaneous Schools and Instruction"],
  ["611710", "Educational Support Services"],
]

const oasisSdvosbCapabilities = [
  "Program and project management support",
  "Strategic planning and execution",
  "Workforce development and training",
  "Leadership development and executive coaching",
  "Process improvement and reengineering",
  "Instructional design and curriculum development",
]

const oasisSmallBusinessCapabilities = [
  "Program and project management",
  "Workforce performance and development",
  "Organizational effectiveness",
  "Operational and process improvement",
  "Integrated professional services",
]

const oasisSupportTypes = [
  "Scope fit discussions",
  "Acquisition planning support",
  "Market research conversations",
  "Small business participation planning",
  "Teaming discussions",
  "Responses to Requests for Information, Sources Sought notices, and task order opportunities",
]

type SectionTone = "white" | "soft" | "navy"

const contractSectionClassName = (tone: SectionTone = "white") =>
  `scroll-mt-28 py-24 md:py-32 lg:py-40 ${tone === "soft" ? "bg-[#f4f3f0]" : ""} ${tone === "navy" ? "bg-[#0d132d] text-white" : ""}`

const contractHeadingClassName = "max-w-4xl font-header text-section-title font-medium"
const contractTwoColumnClassName = "grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 xl:gap-24"
const contractInlineLinkClassName =
  "border-b border-[#0d132d]/35 text-[#0d132d] transition-opacity hover:opacity-55"

const gsaCapabilities = gsaServices.map((service) => ({
  label: service.code,
  title: service.title,
  detail: service.detail,
}))
const tepsCapabilities = tepsAreas.map((title) => ({ title }))
const uscgWorkforceCapabilities = uscgWorkforceServices.map((title) => ({
  title,
}))
const internationalCapabilities = internationalServices.map((title) => ({
  title,
}))
const legacyOasisCapabilities = legacyOasisServices.map((title) => ({ title }))
const oasisSmallBusinessItems = oasisSmallBusinessCapabilities.map((title) => ({
  title,
}))
const oasisSdvosbItems = oasisSdvosbCapabilities.map((title) => ({ title }))

function VehicleMeta({
  prime,
  contract,
  period,
  uei,
  family,
  familyLabel = "Contract family",
  navy = false,
}: VehicleMetaProps & { navy?: boolean }) {
  const items = [
    ["Prime contractor", prime],
    ["Contract number", contract],
    ...(family ? [[familyLabel, family]] : []),
    ["Period of performance", period],
    ...(uei ? [["UEI", uei]] : []),
  ]

  return (
    <dl
      className={`mt-16 grid border-t sm:grid-cols-2 md:mt-20 lg:grid-cols-4 ${navy ? "border-white/20" : "border-[#0d132d]/20"}`}
      data-reveal-sequence
    >
      {items.map(([term, detail]) => (
        <div
          key={term}
          className={`border-b py-6 sm:px-5 sm:odd:pl-0 ${navy ? "border-white/20" : "border-[#0d132d]/20"}`}
          data-reveal-item
        >
          <dt
            className={`font-eyebrow text-eyebrow-label font-semibold tracking-[0.12em] uppercase ${navy ? "text-white/38" : "text-[#8b8e96]"}`}
          >
            {term}
          </dt>
          <dd
            className={`mt-3 text-sm leading-relaxed md:text-base ${navy ? "text-white/78" : "text-[#333744]"}`}
          >
            {detail}
          </dd>
        </div>
      ))}
    </dl>
  )
}

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
          <p className="font-header text-card-title transition-transform duration-500 group-hover:translate-x-[9px]">
            {item}
          </p>
        </li>
      ))}
    </ol>
  )
}

type CapabilityItem = {
  label?: string
  title: string
  detail?: string
}

type VehicleMetaProps = {
  prime: string
  contract: string
  period: string
  uei?: string
  family?: string
  familyLabel?: string
}

function VehicleCapabilityList({
  items,
  navy = false,
}: {
  items: readonly CapabilityItem[]
  navy?: boolean
}) {
  return (
    <ol
      className={`border-t ${navy ? "border-white/20" : "border-[#0d132d]/20"}`}
      data-reveal-sequence
    >
      {items.map((item, index) => (
        <li
          key={`${item.label ?? index}-${item.title}`}
          className={`grid grid-cols-[50px_1fr] gap-4 border-b py-7 md:grid-cols-[74px_1fr] md:gap-6 md:py-8 ${navy ? "border-white/20" : "border-[#0d132d]/20"}`}
          data-reveal-item
        >
          <span
            className={`pt-1 font-eyebrow text-eyebrow-label tracking-[0.12em] ${navy ? "text-white/38" : "text-[#8b8e96]"}`}
          >
            {item.label ?? String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-header text-card-title font-medium">{item.title}</h3>
            {item.detail ? (
              <p
                className={`mt-3 max-w-2xl text-sm leading-relaxed md:text-base ${navy ? "text-white/65" : "text-[#5f626b]"}`}
              >
                {item.detail}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

function ContractVehicleSection({
  id,
  eyebrow,
  status,
  title,
  description,
  capabilities,
  prime,
  contract,
  period,
  uei,
  family,
  familyLabel,
  tone = "white",
}: VehicleMetaProps & {
  id: string
  eyebrow: string
  status: "Current vehicle" | "Legacy vehicle"
  title: string
  description: string
  capabilities: readonly CapabilityItem[]
  tone?: SectionTone
}) {
  const navy = tone === "navy"

  return (
    <section id={id} className={contractSectionClassName(tone)}>
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 xl:gap-28">
          <div className="self-start lg:sticky lg:top-36">
            <p className="eyebrow">{status}</p>
            <span
              className={`mt-5 block font-eyebrow text-eyebrow-label font-semibold tracking-[0.12em] uppercase ${navy ? "text-white/38" : "text-[#8b8e96]"}`}
            >
              {eyebrow}
            </span>
            <h2 className="mt-7 max-w-3xl font-header text-section-title font-medium">{title}</h2>
            <p
              className={`mt-8 max-w-xl text-body-copy ${navy ? "text-white/65" : "text-[#454955]"}`}
            >
              {description}
            </p>
          </div>
          <div>
            <p className={`eyebrow mb-6 ${navy ? "text-white/38" : "text-[#8b8e96]"}`}>
              Capabilities &amp; access
            </p>
            <VehicleCapabilityList items={capabilities} navy={navy} />
          </div>
        </div>
        <VehicleMeta
          prime={prime}
          contract={contract}
          period={period}
          uei={uei}
          family={family}
          familyLabel={familyLabel}
          navy={navy}
        />
      </div>
    </section>
  )
}

function ContractImageBreak({ src, label }: { src: string; label: string }) {
  return (
    <section
      className="h-[41svh] min-h-[312px] w-full overflow-hidden md:h-[52svh] md:min-h-[408px]"
      aria-label={label}
    >
      <SubtleParallaxPhoto src={src} label={label} strength={100} />
    </section>
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

function ContractsContent() {
  return (
    <>
      <ContractVehicleSection
        id="contracts-gsa"
        eyebrow="GSA Multiple Award Schedule"
        status="Current vehicle"
        title="Multiple Award Schedule"
        description="General Services Administration access to Harkcon’s management consulting and professional development training expertise."
        capabilities={gsaCapabilities}
        prime="Harkcon, Inc."
        contract="GS-10F-0164V"
        period="May 2024 – May 2029"
        tone="soft"
      />

      <ContractImageBreak
        src={image("1759020622261-a876260db765")}
        label="The National Archives building in Washington, D.C."
      />

      <ContractVehicleSection
        id="contracts-teps"
        eyebrow="DOE / NNSA"
        status="Current vehicle"
        title="Technical, Engineering, and Programmatic Support Services III"
        description="The TEPS III Blanket Purchase Agreement provides integrated support across eight high-consequence technical and operational areas."
        capabilities={tepsCapabilities}
        prime="MELE Associates, Inc.; Harkcon as CTA Lead"
        contract="89233122ANA000014"
        period="November 2022 – October 2027"
      />

      <ContractImageBreak
        src="/images/careers-collaboration.jpg"
        label="A professional team collaborating around a table"
      />

      <ContractVehicleSection
        id="contracts-uscg"
        eyebrow="U.S. Coast Guard · Workforce requirements"
        status="Current vehicle"
        title="Determination analytical &amp; clerical support services"
        description="Harkcon supports the USCG Workforce Requirements Determination Division with the analysis and documentation needed for sound human-capital planning and resource decisions."
        capabilities={uscgWorkforceCapabilities}
        prime="Harkcon, Inc."
        contract="70Z02325ADPR10001"
        period="September 2025 – September 2030"
        tone="navy"
      />

      <ContractImageBreak
        src={image("1685178362030-9b574eb9ae7c")}
        label="A U.S. military vessel underway"
      />

      <ContractVehicleSection
        id="contracts-uscg-itass"
        eyebrow="U.S. Coast Guard · International affairs"
        status="Current vehicle"
        title="International Training &amp; Analysis Support BPA"
        description="The DCO-I ITASS BPA supports international maritime security training, organizational development, foreign military support, and workforce capacity building aligned with U.S. security cooperation priorities."
        capabilities={internationalCapabilities}
        prime="Harkcon, Inc."
        contract="70Z02324ADCOI0001"
        period="November 2023 – November 2028"
        tone="soft"
      />

      <ContractImageBreak
        src="/images/about-collaboration.jpg"
        label="Consultants working together in a conference room"
      />

      <ContractVehicleSection
        id="contracts-idiq"
        eyebrow="IDIQ vehicle"
        status="Legacy vehicle"
        title="Legacy OASIS Small Business Pool 1"
        description="A flexible vehicle for requirements integrating multiple professional-service disciplines. Harkcon continues to perform active task orders awarded under this legacy contract."
        capabilities={legacyOasisCapabilities}
        prime="Harkcon, Inc."
        contract="47QRAD20D1158"
        period="September 2019 – December 2024"
        uei="T3GVAM6E2XD9"
      />

      <section id="contracts-documents" className={contractSectionClassName()}>
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <ContractSectionHeading title="Capabilities at a glance.">
            Download Harkcon’s current capability statement for a concise overview of our services,
            designations, and federal contracting qualifications.
          </ContractSectionHeading>
          <div className="mt-14">
            <DocumentDownload
              href={HARKCON_CAPABILITY_STATEMENT_URL}
              title="Harkcon Capability Statement"
              description="Company capabilities, qualifications, and contracting information."
            />
          </div>
        </div>
      </section>

      <section id="contracts-naics" className={contractSectionClassName("soft")}>
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <ContractSectionHeading title="Ready for the right requirement.">
            Harkcon is a VA-certified Service-Disabled Veteran-Owned Small Business with broad
            professional, technical, administrative, and training classifications.
          </ContractSectionHeading>
          <ul
            className="mt-16 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 xl:gap-4"
            data-reveal-sequence
          >
            {naicsCodes.map(([code, title]) => (
              <li
                key={code}
                className="flex min-h-24 items-center gap-4 rounded-full border border-[#0d132d]/15 bg-white px-6 py-5 md:min-h-28 md:px-7"
                data-reveal-item
              >
                <span className="shrink-0 font-eyebrow text-eyebrow-label tracking-[0.1em] text-[#8b8e96]">
                  {code}
                </span>
                <p className="text-sm leading-snug text-[#333744]">{title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContractCta id="contracts-cta" />
    </>
  )
}

function OasisContent() {
  return (
    <>
      <ContractVehicleSection
        id="oasis-small-business"
        eyebrow="OASIS+"
        status="Current vehicle"
        title="OASIS+ Small Business"
        description="Scalable professional services that support mission execution, workforce performance, organizational effectiveness, and operational improvement."
        capabilities={oasisSmallBusinessItems}
        prime="Harkcon, Inc."
        contract="47QRCA25DSB53"
        family="Small Business"
        period="December 2024 – December 2029"
        tone="soft"
      />

      <ContractImageBreak
        src={image("1573181759662-1c146525b21f")}
        label="A monumental government building beneath a clear blue sky"
      />

      <ContractVehicleSection
        id="oasis-sdvosb"
        eyebrow="OASIS+"
        status="Current vehicle"
        title="OASIS+ Service-Disabled Veteran-Owned Small Business"
        description="An efficient path to qualified small-business support from an experienced SDVOSB prime contractor."
        capabilities={oasisSdvosbItems}
        prime="Harkcon, Inc."
        contract="47QRCA24DV144"
        family="Service-Disabled Veteran-Owned Small Business"
        period="September 2024 – September 2029"
        tone="navy"
      />

      <ContractImageBreak
        src="/images/about-collaboration.jpg"
        label="A consulting team collaborating around a conference table"
      />

      <ContractVehicleSection
        id="oasis-legacy"
        eyebrow="OASIS"
        status="Legacy vehicle"
        title="Legacy OASIS Small Business Pool 1"
        description="Harkcon continues to perform active task orders awarded under this legacy contract. New requirements should use the OASIS+ Small Business or OASIS+ SDVOSB vehicle, as appropriate."
        capabilities={legacyOasisCapabilities}
        prime="Harkcon, Inc."
        contract="47QRAD20D1158"
        family="Legacy OASIS Small Business Pool 1"
        familyLabel="Contract vehicle"
        period="September 2019 – December 2024"
      />

      <section id="oasis-scope" className={contractSectionClassName("navy")}>
        <div className="mx-auto grid w-full max-w-[1600px] gap-16 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-12 xl:gap-24 xl:px-16">
          <div className="self-start lg:sticky lg:top-36">
            <h2 className={contractHeadingClassName}>Aligned to the requirement.</h2>
            <p className="mt-8 max-w-xl text-body-copy text-white/65">
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
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <ContractSectionHeading title="Review the program solicitation.">
            Open the governing solicitation sections for detailed OASIS contract structure,
            requirements, and terms.
          </ContractSectionHeading>
          <div className="mt-14">
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
                  className="group flex items-center justify-between gap-5 border-b border-[#0d132d]/35 py-6 font-header text-card-title text-[#0d132d] transition-opacity hover:text-[#5f626b] hover:opacity-55"
                >
                  {label}
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
        <div className="mx-auto grid w-full max-w-[1600px] gap-16 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-12 xl:gap-24 xl:px-16">
          <div className="self-start lg:sticky lg:top-36">
            <h2 className={contractHeadingClassName}>
              Start with the requirement. Build the right path.
            </h2>
            <p className="mt-8 max-w-xl text-body-copy text-[#454955]">
              Federal customers and teaming partners can use Harkcon’s OASIS+ vehicles for
              professional services requirements aligned with GSA scope and Harkcon’s awarded
              contract domains.
            </p>
            <OasisContactCard className="mt-12" label="Contact for OASIS+ opportunities" />
          </div>
          <NumberedList items={oasisSupportTypes} />
        </div>
      </section>

      <ContractImageBreak
        src="/images/careers-collaboration.jpg"
        label="Two professionals collaborating in a bright office"
      />

      <ContractCta id="oasis-cta" />
    </>
  )
}

const publicLinks = [
  ["https://www.gsaelibrary.gsa.gov/", "GSA eLibrary"],
  ["https://www.usaspending.gov/", "USAspending.gov"],
  ["https://sam.gov/content/contract-data", "SAM.gov Contract Data"],
] as const

const viewTabClassName = (active: boolean) =>
  `relative flex items-center gap-3 pb-1 font-header text-xl transition-all duration-300 before:absolute before:right-0 before:bottom-0 before:left-0 before:h-px before:origin-left before:bg-[#0d132d] before:transition-transform before:duration-300 hover:translate-x-1 hover:text-[#0d132d] hover:before:scale-x-100 focus-visible:translate-x-1 focus-visible:text-[#0d132d] focus-visible:before:scale-x-100 sm:text-2xl ${active ? "text-[#0d132d] before:scale-x-100" : "text-[#8b8e96] before:scale-x-0"}`

const viewTabDotClassName = (active: boolean, color: string) =>
  `h-2.5 w-2.5 rounded-full transition-all duration-300 ${color} ${active ? "scale-110 opacity-100" : "opacity-45"}`

function ContractSectionHeading({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={`${contractTwoColumnClassName} items-end`}>
      <div>
        <h2 className={contractHeadingClassName}>{title}</h2>
      </div>
      <p className="max-w-2xl text-body-copy text-[#454955]">{children}</p>
    </div>
  )
}

function OasisContactCard({ className, label }: { className: string; label: string }) {
  const linkClassName =
    "w-fit border-b border-[#0d132d]/25 text-sm text-[#0d132d] transition-opacity hover:opacity-55"
  return (
    <div className={`grid border-t border-[#0d132d]/20 pt-8 ${className}`} data-reveal-line>
      <p className="eyebrow text-[#5f626b]">{label}</p>
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
        <Link href="/contact" className="pill-button pill-button--light shrink-0">
          Contact our team <Arrow />
        </Link>
      </div>
    </section>
  )
}

export default function ContractsPage() {
  const [view, setView] = useState<ContractView>("contracts")
  const [activeSection, setActiveSection] = useState<string>(viewContent.contracts.sections[0][0])
  const [railVisible, setRailVisible] = useState(false)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("view") === "oasis-plus") {
      // The selected contract view is persisted in the URL for refreshes and shared links.
      // oxlint-disable-next-line react/set-state-in-effect
      setView("oasis")
    }
  }, [])

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

  const selectView = useCallback((nextView: ContractView) => {
    setView(nextView)
    setActiveSection(viewContent[nextView].sections[0][0])
    const url = new URL(window.location.href)
    if (nextView === "oasis") url.searchParams.set("view", "oasis-plus")
    else url.searchParams.delete("view")
    window.history.replaceState({}, "", url)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const selectContracts = useCallback(() => selectView("contracts"), [selectView])
  const selectOasis = useCallback(() => selectView("oasis"), [selectView])

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
            <p className="eyebrow text-white/75">Contract vehicles</p>
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
            <div
              className="flex items-center gap-8 border-b border-[#0d132d]/15 pb-5 md:gap-12"
              role="tablist"
              aria-label="Contract content"
            >
              <button
                type="button"
                role="tab"
                data-contract-view="contracts"
                aria-selected={view === "contracts"}
                className={viewTabClassName(view === "contracts")}
                onClick={selectContracts}
              >
                <span
                  aria-hidden="true"
                  className={viewTabDotClassName(view === "contracts", "bg-[#ff334f]")}
                />
                Contracts
              </button>
              <button
                type="button"
                role="tab"
                data-contract-view="oasis"
                aria-selected={view === "oasis"}
                className={viewTabClassName(view === "oasis")}
                onClick={selectOasis}
              >
                <span
                  aria-hidden="true"
                  className={viewTabDotClassName(view === "oasis", "bg-[#246bff]")}
                />
                OASIS+
              </button>
            </div>
            <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(190px,0.55fr)_minmax(0,1.7fr)] lg:gap-16 xl:gap-28">
              <div className="flex items-start gap-5">
                <span className="font-eyebrow text-eyebrow-label tracking-[0.15em] text-[#8b8e96]">
                  {view === "contracts" ? "01" : "02"}
                </span>
                <p className="eyebrow">{content.label}</p>
              </div>
              <div>
                <h1
                  id="contracts-hero-title"
                  className="max-w-5xl font-header text-display font-medium"
                >
                  {content.title}
                </h1>
                <p className="mt-8 max-w-3xl text-body-copy text-[#5f626b]">{content.summary}</p>
                {view === "contracts" ? (
                  <div className="mt-9 max-w-3xl border-t border-[#0d132d]/15 pt-8">
                    <p className="text-body-copy text-[#454955]">
                      Harkcon provides expert professional business solutions to government and
                      commercial clients. Since 2005, disciplined quality standards, trusted
                      partnerships, and consistent client satisfaction have supported complex
                      public-sector missions.
                    </p>
                    <p className="mt-6 text-body-copy text-[#454955]">
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
                    <Link href="/contact" className="pill-button mt-9">
                      Contact business development <Arrow />
                    </Link>
                  </div>
                ) : (
                  <div className="mt-9 max-w-3xl border-t border-[#0d132d]/15 pt-8">
                    <p className="text-body-copy text-[#454955]">
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
        <div key={view} className="animate-contract-view-enter">
          {view === "contracts" ? <ContractsContent /> : <OasisContent />}
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
