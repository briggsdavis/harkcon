"use client"

import Link from "next/link"
import { MouseEvent, useCallback, useEffect, useState } from "react"
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
    heroImage: "/images/about-collaboration-unsplash.jpg",
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

const gsaCapabilities = gsaServices.map((service) => ({
  label: service.code,
  title: service.title,
  detail: service.detail,
}))
const tepsCapabilities = tepsAreas.map((title) => ({ title }))
const uscgWorkforceCapabilities = uscgWorkforceServices.map((title) => ({ title }))
const internationalCapabilities = internationalServices.map((title) => ({ title }))
const legacyOasisCapabilities = legacyOasisServices.map((title) => ({ title }))
const oasisSmallBusinessItems = oasisSmallBusinessCapabilities.map((title) => ({ title }))
const oasisSdvosbItems = oasisSdvosbCapabilities.map((title) => ({ title }))

function VehicleMeta({
  prime,
  contract,
  period,
  uei,
  family,
  familyLabel = "Contract family",
}: VehicleMetaProps) {
  return (
    <dl className="contract-meta" data-reveal-sequence>
      <div data-reveal-item>
        <dt>Prime contractor</dt>
        <dd>{prime}</dd>
      </div>
      <div data-reveal-item>
        <dt>Contract number</dt>
        <dd>{contract}</dd>
      </div>
      {family ? (
        <div data-reveal-item>
          <dt>{familyLabel}</dt>
          <dd>{family}</dd>
        </div>
      ) : null}
      <div data-reveal-item>
        <dt>Period of performance</dt>
        <dd>{period}</dd>
      </div>
      {uei ? (
        <div data-reveal-item>
          <dt>UEI</dt>
          <dd>{uei}</dd>
        </div>
      ) : null}
    </dl>
  )
}

function NumberedList({ items }: { items: readonly string[] }) {
  return (
    <ol className="contract-numbered-list">
      {items.map((item, index) => (
        <li key={item} data-reveal-line>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{item}</p>
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

function VehicleCapabilityList({ items }: { items: readonly CapabilityItem[] }) {
  return (
    <ol className="contract-capability-list" data-reveal-sequence>
      {items.map((item, index) => (
        <li key={`${item.label ?? index}-${item.title}`} data-reveal-item>
          <span>{item.label ?? String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>{item.title}</h3>
            {item.detail ? <p>{item.detail}</p> : null}
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
  tone?: "white" | "soft" | "navy"
}) {
  return (
    <section
      id={id}
      className={`contract-section contract-vehicle-section ${tone === "soft" ? "contract-section--soft" : ""} ${tone === "navy" ? "contract-section--navy" : ""}`}
    >
      <div className="contracts-content-shell">
        <div className="contract-vehicle-grid">
          <div className="contract-vehicle-intro">
            <p className="eyebrow">{status}</p>
            <span className="contract-vehicle-category">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="contract-vehicle-capabilities">
            <p className="eyebrow">Capabilities &amp; access</p>
            <VehicleCapabilityList items={capabilities} />
          </div>
        </div>
        <VehicleMeta
          prime={prime}
          contract={contract}
          period={period}
          uei={uei}
          family={family}
          familyLabel={familyLabel}
        />
      </div>
    </section>
  )
}

function ContractImageBreak({
  src,
  label,
  className = "",
}: {
  src: string
  label: string
  className?: string
}) {
  return (
    <section className="contract-image-break" aria-label={label}>
      <SubtleParallaxPhoto
        src={src}
        className={`contract-image-break-photo ${className}`}
        label={label}
        strength={100}
      />
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
      className={`contracts-rail ${visible ? "contracts-rail--visible" : ""}`}
      aria-label={`${viewContent[view].label} sections`}
    >
      {viewContent[view].sections.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          className={activeSection === id ? "is-active" : ""}
          aria-label={`Go to ${label}`}
          onClick={handleSectionClick}
        >
          <span aria-hidden="true" />
          <strong>{label}</strong>
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
        src="/images/careers-collaboration-unsplash.jpg"
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
        className="contract-image-break-photo--ship"
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
        src="/images/about-collaboration-unsplash.jpg"
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

      <section id="contracts-documents" className="contract-section contract-documents-section">
        <div className="contracts-content-shell">
          <div className="contract-section-heading">
            <div>
              <p className="eyebrow mb-6 text-[#5f626b]">Contract documents</p>
              <h2>Capabilities at a glance.</h2>
            </div>
            <p>
              Download Harkcon’s current capability statement for a concise overview of our
              services, designations, and federal contracting qualifications.
            </p>
          </div>
          <div className="contract-document-list">
            <DocumentDownload
              href={HARKCON_CAPABILITY_STATEMENT_URL}
              title="Harkcon Capability Statement"
              description="Company capabilities, qualifications, and contracting information."
            />
          </div>
        </div>
      </section>

      <section id="contracts-naics" className="contract-section contract-section--soft">
        <div className="contracts-content-shell">
          <div className="contract-section-heading">
            <div>
              <p className="eyebrow mb-6 text-[#5f626b]">Designation &amp; NAICS</p>
              <h2>Ready for the right requirement.</h2>
            </div>
            <p>
              Harkcon is a VA-certified Service-Disabled Veteran-Owned Small Business with broad
              professional, technical, administrative, and training classifications.
            </p>
          </div>
          <ul className="naics-grid" data-reveal-sequence>
            {naicsCodes.map(([code, title]) => (
              <li key={code} data-reveal-item>
                <span>{code}</span>
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContractCta id="contracts-cta" eyebrow="Choose the right vehicle" />
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
        src="/images/about-collaboration-unsplash.jpg"
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

      <section id="oasis-scope" className="contract-section contract-section--navy">
        <div className="contracts-content-shell contract-feature-grid">
          <div className="contract-feature-intro">
            <p className="eyebrow mb-6 text-white/55">Scope &amp; access</p>
            <h2>Aligned to the requirement.</h2>
            <p>
              Harkcon’s vehicles provide access to professional services aligned with the GSA OASIS+
              program structure. We support requirements consistent with our awarded contract
              domains, scope, and ordering procedures.
            </p>
            <div className="contract-inline-actions">
              <Link href="/contact" className="text-link text-white" data-reveal-line>
                Discuss scope fit <Arrow />
              </Link>
            </div>
          </div>
          <NumberedList items={oasisSdvosbCapabilities} />
        </div>
      </section>

      <section id="oasis-documents" className="contract-section contract-documents-section">
        <div className="contracts-content-shell">
          <div className="contract-section-heading">
            <div>
              <p className="eyebrow mb-6 text-[#5f626b]">OASIS+ contract documents</p>
              <h2>Review the program solicitation.</h2>
            </div>
            <p>
              Open the governing solicitation sections for detailed OASIS contract structure,
              requirements, and terms.
            </p>
          </div>
          <div className="contract-document-list">
            <DocumentDownload
              href={OASIS_SOLICITATION_URL}
              title="OASIS Solicitation — Sections B through J"
              description="Official contract solicitation sections and requirements."
            />
          </div>
        </div>
      </section>

      <section id="oasis-verification" className="contract-section contract-section--soft">
        <div className="contracts-content-shell contract-overview-grid">
          <div>
            <p className="eyebrow mb-6 text-[#5f626b]">
              Verification &amp; public award information
            </p>
            <h2>Official sources. Current information.</h2>
          </div>
          <div className="contract-body-copy">
            <p>
              Federal customers and teaming partners can verify Harkcon’s GSA contract information
              through official government sources. For current task-order availability, scope fit,
              teaming discussions, or customer-specific questions, contact Harkcon directly.
            </p>
            <div className="contract-public-links">
              <a href="https://www.gsaelibrary.gsa.gov/" target="_blank" rel="noreferrer">
                GSA eLibrary <Arrow diagonal />
              </a>
              <a href="https://www.usaspending.gov/" target="_blank" rel="noreferrer">
                USAspending.gov <Arrow diagonal />
              </a>
              <a href="https://sam.gov/content/contract-data" target="_blank" rel="noreferrer">
                SAM.gov Contract Data <Arrow diagonal />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="oasis-work" className="contract-section">
        <div className="contracts-content-shell contract-feature-grid">
          <div className="contract-feature-intro">
            <p className="eyebrow mb-6 text-[#5f626b]">Work with Harkcon through OASIS+</p>
            <h2>Start with the requirement. Build the right path.</h2>
            <p>
              Federal customers and teaming partners can use Harkcon’s OASIS+ vehicles for
              professional services requirements aligned with GSA scope and Harkcon’s awarded
              contract domains.
            </p>
            <div className="oasis-contact-card oasis-contact-card--compact" data-reveal-line>
              <p className="eyebrow text-[#5f626b]">Contact for OASIS+ opportunities</p>
              <strong>Paula Harkins</strong>
              <span>Chief Growth Officer</span>
              <a href="mailto:pharkins@harkcon.com">pharkins@harkcon.com</a>
              <a href="tel:+15407838271">540-783-8271</a>
            </div>
          </div>
          <NumberedList items={oasisSupportTypes} />
        </div>
      </section>

      <section className="contract-image-break" aria-label="Professional collaboration">
        <SubtleParallaxPhoto
          src="/images/careers-collaboration-unsplash.jpg"
          className="contract-image-break-photo"
          label="Two professionals collaborating in a bright office"
          strength={100}
        />
      </section>

      <ContractCta id="oasis-cta" eyebrow="Put OASIS+ to work" />
    </>
  )
}

function ContractCta({ id, eyebrow }: { id: string; eyebrow: string }) {
  return (
    <section id={id} className="contracts-cta-section">
      <div className="contracts-content-shell contracts-cta-inner">
        <div>
          <p className="eyebrow mb-5 text-white/55">{eyebrow}</p>
          <h2>Let’s find the clearest path to your next mission outcome.</h2>
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
      <div className="page-content">
        <section className="contracts-hero" aria-label={`${content.label} hero image`}>
          <HeroParallaxImage
            key={view}
            src={content.heroImage}
            alt={content.heroAlt}
            imageClassName="contracts-hero-image"
          />
          <div className="contracts-hero-overlay" />
          <div className="site-gutter contracts-hero-index">
            <p className="eyebrow text-white/75">Contract vehicles</p>
            <span>{view === "contracts" ? "01" : "02"}</span>
          </div>
        </section>

        <section
          id={view === "contracts" ? "contracts-overview" : "oasis-overview"}
          className="contracts-intro"
          aria-labelledby="contracts-hero-title"
        >
          <div className="site-gutter">
            <div className="contract-view-switcher" role="tablist" aria-label="Contract content">
              <button
                type="button"
                role="tab"
                data-contract-view="contracts"
                aria-selected={view === "contracts"}
                className={view === "contracts" ? "is-active" : ""}
                onClick={selectContracts}
              >
                <span aria-hidden="true" />
                Contracts
              </button>
              <button
                type="button"
                role="tab"
                data-contract-view="oasis"
                aria-selected={view === "oasis"}
                className={view === "oasis" ? "is-active" : ""}
                onClick={selectOasis}
              >
                <span aria-hidden="true" />
                OASIS+
              </button>
            </div>
            <div className="contracts-intro-grid">
              <div className="contracts-intro-label">
                <span>{view === "contracts" ? "01" : "02"}</span>
                <p className="eyebrow">{content.label}</p>
              </div>
              <div className="contracts-intro-copy">
                <h1 id="contracts-hero-title">{content.title}</h1>
                <p>{content.summary}</p>
                {view === "contracts" ? (
                  <div className="contracts-intro-overview">
                    <p>
                      Harkcon provides expert professional business solutions to government and
                      commercial clients. Since 2005, disciplined quality standards, trusted
                      partnerships, and consistent client satisfaction have supported complex
                      public-sector missions.
                    </p>
                    <p>
                      Need help choosing a vehicle? Contact Paula Harkins at{" "}
                      <a href="mailto:pharkins@harkcon.com">pharkins@harkcon.com</a> or{" "}
                      <a href="tel:+15407838271">540-783-8271</a>.
                    </p>
                    <Link href="/contact" className="pill-button mt-9">
                      Contact business development <Arrow />
                    </Link>
                  </div>
                ) : (
                  <div className="contracts-intro-overview">
                    <p>
                      One Acquisition Solution for Integrated Services Plus is GSA&apos;s
                      governmentwide, multi-agency contract program for complex professional
                      services. It gives federal agencies flexible access to Harkcon&apos;s program
                      management, workforce development, training, process improvement, and
                      organizational performance support.
                    </p>
                    <div className="oasis-contact-card" data-reveal-line>
                      <p className="eyebrow text-[#5f626b]">OASIS+ point of contact</p>
                      <strong>Paula Harkins</strong>
                      <span>Chief Growth Officer</span>
                      <a href="mailto:pharkins@harkcon.com">pharkins@harkcon.com</a>
                      <a href="tel:+15407838271">540-783-8271</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <SectionRail view={view} activeSection={activeSection} visible={railVisible} />
        <div key={view} className="contracts-view-content">
          {view === "contracts" ? <ContractsContent /> : <OasisContent />}
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
