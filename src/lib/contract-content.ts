export type CapabilityItem = { label?: string; title: string; detail?: string }
export type ContractRecord = {
  id: string
  navLabel?: string
  eyebrow: string
  title: string
  description: string
  prime: string
  contract: string
  period: string
  uei?: string
  capabilities: readonly CapabilityItem[]
  photo: { src: string; alt: string }
}

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

export const naicsCodes = [
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

export const oasisSdvosbCapabilities = [
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

export const oasisSupportTypes = [
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

export const contractImages: Record<string, { src: string; alt: string }> = {
  "contracts-gsa": {
    src: "/images/editorial/contracts-gsa.jpg",
    alt: "Classical civic architecture with stone columns",
  },
  "contracts-teps": {
    src: "/images/editorial/contracts-teps.jpg",
    alt: "Electricity transmission towers across the landscape at sunset",
  },
  "contracts-uscg": {
    src: "/images/editorial/contracts-uscg.jpg",
    alt: "A U.S. Coast Guard cutter viewed from the water",
  },
  "contracts-uscg-itass": {
    src: "/images/editorial/contracts-uscg-itass.jpg",
    alt: "A rescue crew underway in an orange lifeboat",
  },
  "contracts-idiq": {
    src: "/images/editorial/contracts-idiq.jpg",
    alt: "An aerial view of road bridges crossing water",
  },
  "oasis-small-business": {
    src: "/images/editorial/oasis-small-business.jpg",
    alt: "A cargo vessel maneuvering through a working container port",
  },
  "oasis-sdvosb": {
    src: "/images/editorial/oasis-sdvosb.jpg",
    alt: "An American flag flying against a softly lit evening sky",
  },
  "oasis-legacy": {
    src: "/images/editorial/oasis-legacy.jpg",
    alt: "Container cranes and shipping lanes illuminated at night",
  },
  "contracts-naics": {
    src: "/images/editorial/contracts-naics.jpg",
    alt: "An American flag suspended inside a large industrial hall",
  },
}

export const contractRecords: Record<string, ContractRecord> = {
  "contracts-gsa": {
    id: "contracts-gsa",
    navLabel: "Multiple Award Schedule",
    eyebrow: "GSA Multiple Award Schedule",
    title: "Multiple Award Schedule",
    description:
      "The GSA Multiple Award Schedule gives federal agencies access to Harkcon’s management consulting and professional development training services. We support organizational assessments, course development, and training delivery through this vehicle.",
    capabilities: gsaCapabilities,
    prime: "Harkcon, Inc.",
    contract: "GS-10F-0164V",
    period: "May 2024 – May 2029",
    photo: contractImages["contracts-gsa"],
  },
  "contracts-teps": {
    id: "contracts-teps",
    navLabel: "TEPS III",
    eyebrow: "TEPS III Blanket Purchase Agreement",
    title: "Technical, Engineering, and Programmatic Support Services III",
    description:
      "The TEPS III Blanket Purchase Agreement supports DOE and NNSA across eight technical and operational areas. Harkcon works with MELE Associates to provide program management, training, analytical support, and emergency operations expertise.",
    capabilities: tepsCapabilities,
    prime: "MELE Associates, Inc.; Harkcon as CTA Lead",
    contract: "89233122ANA000014",
    period: "November 2022 – October 2027",
    photo: contractImages["contracts-teps"],
  },
  "contracts-uscg": {
    id: "contracts-uscg",
    navLabel: "USCG Workforce",
    eyebrow: "U.S. Coast Guard · Workforce requirements",
    title: "Determination analytical & clerical support services",
    description:
      "Harkcon supports the USCG Workforce Requirements Determination Division with the analysis and documentation needed for sound human-capital planning and resource decisions.",
    capabilities: uscgWorkforceCapabilities,
    prime: "Harkcon, Inc.",
    contract: "70Z02325ADPR10001",
    period: "September 2025 – September 2030",
    photo: contractImages["contracts-uscg"],
  },
  "contracts-uscg-itass": {
    id: "contracts-uscg-itass",
    navLabel: "International Training & Analysis",
    eyebrow: "International Training & Analysis Support BPA",
    title: "International Training & Analysis Support BPA",
    description:
      "The DCO-I ITASS BPA supports international maritime security training, organizational development, foreign military support, and workforce capacity building aligned with U.S. security cooperation priorities.",
    capabilities: internationalCapabilities,
    prime: "Harkcon, Inc.",
    contract: "70Z02324ADCOI0001",
    period: "November 2023 – November 2028",
    photo: contractImages["contracts-uscg-itass"],
  },
  "contracts-idiq": {
    id: "contracts-idiq",
    navLabel: "Legacy OASIS Small Business Pool 1",
    eyebrow: "Legacy OASIS Small Business Pool 1 IDIQ",
    title: "Legacy OASIS Small Business Pool 1",
    description:
      "A flexible vehicle for requirements integrating multiple professional-service disciplines. Harkcon continues to perform active task orders awarded under this legacy contract.",
    capabilities: legacyOasisCapabilities,
    prime: "Harkcon, Inc.",
    contract: "47QRAD20D1158",
    period: "September 2019 – December 2024",
    uei: "T3GVAM6E2XD9",
    photo: contractImages["contracts-idiq"],
  },
  "oasis-small-business": {
    id: "oasis-small-business",
    navLabel: "Small Business",
    eyebrow: "OASIS+ Small Business",
    title: "OASIS+ Small Business",
    description:
      "The OASIS+ Small Business vehicle gives federal agencies access to Harkcon’s program management, workforce development, and organizational performance services. We help customers assess requirements and identify support within the awarded scope.",
    capabilities: oasisSmallBusinessItems,
    prime: "Harkcon, Inc.",
    contract: "47QRCA25DSB53",
    period: "December 2024 – December 2029",
    photo: contractImages["oasis-small-business"],
  },
  "oasis-sdvosb": {
    id: "oasis-sdvosb",
    navLabel: "SDVOSB",
    eyebrow: "OASIS+ SDVOSB",
    title: "OASIS+ Service-Disabled Veteran-Owned Small Business",
    description:
      "The OASIS+ SDVOSB vehicle provides access to Harkcon’s program support, training, process improvement, and workforce development services. Federal customers can work with an experienced service-disabled veteran-owned small business within the awarded scope.",
    capabilities: oasisSdvosbItems,
    prime: "Harkcon, Inc.",
    contract: "47QRCA24DV144",
    period: "September 2024 – September 2029",
    photo: contractImages["oasis-sdvosb"],
  },
  "oasis-legacy": {
    id: "oasis-legacy",
    navLabel: "Legacy Small Business Pool 1",
    eyebrow: "Legacy OASIS Small Business Pool 1",
    title: "Legacy OASIS Small Business Pool 1",
    description:
      "Harkcon continues to perform active task orders awarded under this legacy contract. New requirements should use the OASIS+ Small Business or OASIS+ SDVOSB vehicle, as appropriate.",
    capabilities: legacyOasisCapabilities,
    prime: "Harkcon, Inc.",
    contract: "47QRAD20D1158",
    period: "September 2019 – December 2024",
    photo: contractImages["oasis-legacy"],
  },
}

// Add a record above, then list its ID in the appropriate group to render it and its navigation link.
export const contractGroups = {
  gsa: {
    id: "contracts-gsa-group",
    title: "GSA",
    description: "Government Services Administration (GSA) Vehicles",
    recordIds: ["contracts-gsa", "contracts-teps", "contracts-uscg", "contracts-uscg-itass"],
  },
  idiq: {
    id: "contracts-idiq-group",
    title: "IDIQ",
    description: "Indefinite Delivery, Indefinite Quantity (IDIQ)",
    recordIds: ["contracts-idiq"],
  },
  oasis: {
    id: "oasis-vehicles",
    title: "OASIS+ vehicles",
    description: "Small Business and Service-Disabled Veteran-Owned Small Business access.",
    recordIds: ["oasis-small-business", "oasis-sdvosb"],
  },
  legacy: {
    id: "oasis-legacy-group",
    title: "Legacy OASIS",
    description: "Existing task-order support under the legacy Small Business Pool 1 vehicle.",
    recordIds: ["oasis-legacy"],
  },
} as const
