"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import DocumentDownload from "~/components/document-download"
import HeroParallaxImage from "~/components/hero-parallax-image"
import SubtleParallaxPhoto from "~/components/subtle-parallax-photo"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import {
  HARKCON_CAPABILITY_STATEMENT_URL,
  OASIS_SOLICITATION_URL,
} from "~/lib/documents"

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
      ["contracts-uscg", "USCG BPAs"],
      ["contracts-idiq", "IDIQ vehicles"],
      ["contracts-documents", "Documents"],
      ["contracts-naics", "NAICS codes"],
      ["contracts-cta", "Get started"],
    ],
  },
  oasis: {
    label: "OASIS+",
    title: "One vehicle. Expansive capability.",
    summary: "Best-in-Class access to complex, integrated professional services.",
    heroImage: image("1557804506-669a67965ba0"),
    heroAlt: "A professional team collaborating during a strategy session",
    sections: [
      ["oasis-overview", "Overview"],
      ["oasis-vehicles", "Vehicles"],
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
    detail:
      "A wide range of management and integrated consulting services for federal agencies.",
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

const oasisSupportTypes = [
  "Scope fit discussions",
  "Acquisition planning support",
  "Market research conversations",
  "Small business participation planning",
  "Teaming discussions",
  "Responses to Requests for Information, Sources Sought notices, and task order opportunities",
]

function VehicleMeta({
  prime,
  contract,
  period,
  uei,
  family,
  familyLabel = "Contract family",
}: {
  prime: string
  contract: string
  period: string
  uei?: string
  family?: string
  familyLabel?: string
}) {
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

function SectionRail({
  view,
  activeSection,
  visible,
}: {
  view: ContractView
  activeSection: string
  visible: boolean
}) {
  return (
    <nav
      className={`contracts-rail ${visible ? "contracts-rail--visible" : ""}`}
      aria-label={`${viewContent[view].label} sections`}
    >
      {viewContent[view].sections.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={activeSection === id ? "is-active" : ""}>
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
      <section id="contracts-overview" className="contract-section contract-overview-section">
        <div className="contracts-content-shell contract-overview-grid">
          <div>
            <p className="eyebrow mb-6 text-[#5f626b]">Expert services &amp; solutions</p>
            <h2>Built to serve complex public-sector missions.</h2>
          </div>
          <div className="contract-body-copy">
            <p>
              Harkcon provides expert, professional business solutions to government and commercial
              clients. Since 2005, disciplined quality standards and client satisfaction have driven
              steady growth, enduring government and industry partnerships, and continued expansion
              of our services.
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
        </div>
      </section>

      <section id="contracts-gsa" className="contract-section contract-section--soft">
        <div className="contracts-content-shell">
          <div className="contract-section-heading">
            <div>
              <p className="eyebrow mb-6 text-[#5f626b]">GSA vehicles</p>
              <h2>Multiple Award Schedule</h2>
            </div>
            <p>
              General Services Administration access to Harkcon’s management consulting and
              professional development training expertise.
            </p>
          </div>
          <div className="contract-service-cards">
            {gsaServices.map((service) => (
              <article key={service.code} data-reveal-line>
                <span>{service.code}</span>
                <h3>{service.title}</h3>
                <p>{service.detail}</p>
              </article>
            ))}
          </div>
          <VehicleMeta
            prime="Harkcon, Inc."
            contract="GS-10F-0164V"
            period="May 2024 – May 2029"
          />
        </div>
      </section>

      <section className="contract-image-break" aria-label="Federal contracting documents">
        <SubtleParallaxPhoto
          src={image("1521791055366-0d553872125f")}
          className="contract-image-break-photo"
          label="Professionals reviewing and signing an agreement"
          strength={100}
        />
      </section>

      <section id="contracts-teps" className="contract-section">
        <div className="contracts-content-shell contract-feature-grid">
          <div className="contract-feature-intro">
            <p className="eyebrow mb-6 text-[#5f626b]">DOE / NNSA</p>
            <h2>Technical, Engineering, and Programmatic Support Services III</h2>
            <p>
              The TEPS III Blanket Purchase Agreement provides integrated support across eight
              high-consequence technical and operational areas.
            </p>
            <VehicleMeta
              prime="MELE Associates, Inc.; Harkcon as CTA Lead"
              contract="89233122ANA000014"
              period="November 2022 – October 2027"
            />
          </div>
          <NumberedList items={tepsAreas} />
        </div>
      </section>

      <section id="contracts-uscg" className="contract-section contract-section--navy">
        <div className="contracts-content-shell">
          <div className="contract-section-heading contract-section-heading--light">
            <div>
              <p className="eyebrow mb-6 text-white/55">U.S. Coast Guard</p>
              <h2>Mission-focused blanket purchase agreements.</h2>
            </div>
            <p>Analytical rigor, workforce readiness, and international capacity building.</p>
          </div>
          <div className="contract-dark-cards">
            <article>
              <p className="eyebrow text-white/45">Workforce requirements</p>
              <h3>Determination analytical &amp; clerical support services</h3>
              <p>
                Harkcon provides analytical, clerical, facilitation, documentation, and technical
                writing support to the USCG Workforce Requirements Determination Division. Work
                includes research, data collection, modeling, report development, meeting
                facilitation, stakeholder coordination, and defensible workforce requirements for
                human capital planning and resource decisions.
              </p>
              <VehicleMeta
                prime="Harkcon, Inc."
                contract="70Z02325ADPR10001"
                period="September 2025 – September 2030"
              />
            </article>
            <article>
              <p className="eyebrow text-white/45">International affairs</p>
              <h3>International Training &amp; Analysis Support BPA</h3>
              <p>
                The DCO-I ITASS BPA supports international maritime security training,
                organizational development, foreign military support, and workforce capacity
                building aligned with U.S. security cooperation priorities.
              </p>
              <NumberedList items={internationalServices} />
              <VehicleMeta
                prime="Harkcon, Inc."
                contract="70Z02324ADCOI0001"
                period="November 2023 – November 2028"
              />
            </article>
          </div>
        </div>
      </section>

      <section className="contract-image-break" aria-label="Maritime operations">
        <SubtleParallaxPhoto
          src={image("1685178362030-9b574eb9ae7c")}
          className="contract-image-break-photo contract-image-break-photo--ship"
          label="A U.S. military vessel underway"
          strength={100}
        />
      </section>

      <section id="contracts-idiq" className="contract-section">
        <div className="contracts-content-shell contract-feature-grid">
          <div className="contract-feature-intro">
            <p className="eyebrow mb-6 text-[#5f626b]">IDIQ vehicles</p>
            <h2>Legacy OASIS Small Business Pool 1</h2>
            <p>
              A flexible vehicle designed for requirements that integrate multiple professional
              service disciplines and ancillary services or products, with contract type and
              pricing flexibility at the task-order level. Harkcon continues to perform active task
              orders under previously awarded work.
            </p>
            <VehicleMeta
              prime="Harkcon, Inc."
              contract="47QRAD20D1158"
              period="September 2019 – December 2024"
              uei="T3GVAM6E2XD9"
            />
          </div>
          <NumberedList items={legacyOasisServices} />
        </div>
      </section>

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
      <section id="oasis-overview" className="contract-section contract-overview-section">
        <div className="contracts-content-shell contract-overview-grid">
          <div>
            <p className="eyebrow mb-6 text-[#5f626b]">OASIS+ overview</p>
            <h2>Governmentwide access to integrated expertise.</h2>
          </div>
          <div className="contract-body-copy">
            <p>
              One Acquisition Solution for Integrated Services Plus, known as OASIS+, is a General
              Services Administration governmentwide, multi-agency, multiple-award Indefinite
              Delivery, Indefinite Quantity contract program for professional services. OASIS+
              provides federal agencies flexible access to complex non-information technology
              services across multiple professional services domains.
            </p>
            <p>
              Through OASIS+, agencies can engage experienced contractors for integrated
              requirements including program management, management consulting, workforce
              development, training, process improvement, and organizational performance support.
            </p>
            <div className="oasis-contact-card" data-reveal-line>
              <p className="eyebrow text-[#5f626b]">OASIS+ point of contact</p>
              <strong>Paula Harkins</strong>
              <span>Chief Growth Officer</span>
              <a href="mailto:pharkins@harkcon.com">pharkins@harkcon.com</a>
              <a href="tel:+15407838271">540-783-8271</a>
            </div>
          </div>
        </div>
      </section>

      <section id="oasis-vehicles" className="contract-section contract-section--soft">
        <div className="contracts-content-shell contract-media-grid">
          <div className="contract-media-image">
            <Image
              src={image("1600880292089-90a7e086ee0c")}
              alt="Team members joining hands in a gesture of unity"
              fill
              unoptimized
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="contract-media-copy">
            <p className="eyebrow mb-6 text-[#5f626b]">Harkcon OASIS+ contract vehicles</p>
            <h2>Three vehicles. Clear paths to performance.</h2>
            <div className="oasis-vehicle-stack">
              <article data-reveal-line>
                <p className="eyebrow text-[#8b8e96]">Current vehicle</p>
                <h3>OASIS+ Small Business</h3>
                <p>
                  Scalable professional services that support mission execution, workforce
                  performance, organizational effectiveness, and operational improvement.
                </p>
                <VehicleMeta
                  prime="Harkcon, Inc."
                  contract="47QRCA25DSB53"
                  family="Small Business"
                  period="December 2024 – December 2029"
                />
              </article>
              <article data-reveal-line>
                <p className="eyebrow text-[#8b8e96]">Current vehicle</p>
                <h3>OASIS+ Service-Disabled Veteran-Owned Small Business</h3>
                <p>
                  An efficient path to qualified small-business support from an experienced SDVOSB
                  prime contractor.
                </p>
                <VehicleMeta
                  prime="Harkcon, Inc."
                  contract="47QRCA24DV144"
                  family="Service-Disabled Veteran-Owned Small Business"
                  period="September 2024 – September 2029"
                />
              </article>
              <article data-reveal-line>
                <p className="eyebrow text-[#8b8e96]">Legacy vehicle</p>
                <h3>Legacy OASIS Small Business Pool 1</h3>
                <p>
                  Harkcon continues to perform active task orders awarded under this legacy
                  contract. New requirements should use the OASIS+ Small Business or OASIS+ SDVOSB
                  vehicle, as appropriate.
                </p>
                <VehicleMeta
                  prime="Harkcon, Inc."
                  contract="47QRAD20D1158"
                  family="Legacy OASIS Small Business Pool 1"
                  familyLabel="Contract vehicle"
                  period="September 2019 – December 2024"
                />
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="oasis-scope" className="contract-section contract-section--navy">
        <div className="contracts-content-shell contract-feature-grid">
          <div className="contract-feature-intro">
            <p className="eyebrow mb-6 text-white/55">Scope &amp; access</p>
            <h2>Aligned to the requirement.</h2>
            <p>
              Harkcon’s vehicles provide access to professional services aligned with the GSA
              OASIS+ program structure. We support requirements consistent with our awarded
              contract domains, scope, and ordering procedures.
            </p>
            <div className="contract-inline-actions">
              <Link href="/solutions" className="text-link text-white" data-reveal-line>
                Explore Harkcon solutions <Arrow />
              </Link>
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
            <p className="eyebrow mb-6 text-[#5f626b]">Verification &amp; public award information</p>
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

      <section className="contract-image-break" aria-label="Collaborative professional services">
        <SubtleParallaxPhoto
          src={image("1454165804606-c3d57bc86b40")}
          className="contract-image-break-photo"
          label="A strategy team reviewing plans at a desk"
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
        <section className="contracts-hero" aria-labelledby="contracts-hero-title">
          <HeroParallaxImage
            key={view}
            src={content.heroImage}
            alt={content.heroAlt}
            imageClassName="contracts-hero-image"
          />
          <div className="contracts-hero-overlay" />
          <div className="site-gutter contracts-hero-content">
            <div>
              <p className="eyebrow text-white/70">{content.label}</p>
              <h1 id="contracts-hero-title">{content.title}</h1>
              <p>{content.summary}</p>
            </div>
          </div>
        </section>

        <div className="contract-view-switcher" role="tablist" aria-label="Contract content">
          <button
            type="button"
            role="tab"
            aria-selected={view === "contracts"}
            className={view === "contracts" ? "is-active" : ""}
            onClick={selectContracts}
          >
            <span>01</span>
            Contracts
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "oasis"}
            className={view === "oasis" ? "is-active" : ""}
            onClick={selectOasis}
          >
            <span>02</span>
            OASIS+
          </button>
        </div>

        <SectionRail view={view} activeSection={activeSection} visible={railVisible} />
        <div key={view} className="contracts-view-content">
          {view === "contracts" ? <ContractsContent /> : <OasisContent />}
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
