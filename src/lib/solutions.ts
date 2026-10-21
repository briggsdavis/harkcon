export type Solution = {
  slug: string
  number: string
  color: string
  title: string
  shortTitle: string
  description: string
  proofPoint: string
  solutions: string[]
  heroImage: string
  heroAlt: string
  wideImage: string
  wideAlt: string
  detailImage: string
  detailAlt: string
}

const unsplash = (id: string, premium = false) =>
  `https://${premium ? "plus." : "images."}unsplash.com/${premium ? "premium_photo-" : "photo-"}${id}?auto=format&fit=crop&w=2400&q=88`

export const solutions: Solution[] = [
  {
    slug: "workforce-organizational-analysis",
    number: "01",
    color: "#ff334f",
    title: "Workforce & Organizational Analysis",
    shortTitle: "Workforce Analysis",
    description:
      "Harkcon analyzes workforce requirements and organizational structure to improve staffing and readiness. We help federal agencies assess capabilities, identify gaps, and build workforce plans grounded in evidence and mission requirements.",
    proofPoint:
      "Since 2007, Harkcon has completed more than 40 workforce requirements analyses for the U.S. Coast Guard. Our Workforce Calculator Forecasting Tools make staffing assumptions visible and let USCG stakeholders compare scenarios, adjust inputs, and assess requirements as operational needs change.",
    solutions: [
      "Workforce requirements analysis and modeling",
      "Workforce assessments and staffing analysis",
      "Competency development and role alignment",
      "Job Task Analysis (JTA)",
      "Credentialing process evaluation and improvement",
    ],
    heroImage: unsplash("1610706226054-b80acac28a67"),
    heroAlt: "A U.S. Coast Guard helicopter operating over open water",
    wideImage: unsplash("1621310547536-9f03189e36f1"),
    wideAlt: "A U.S. Coast Guard patrol boat ready for operations",
    detailImage: "/images/editorial/workforce-detail.jpg",
    detailAlt: "Sunlight and shadows along a colonnaded civic walkway",
  },
  {
    slug: "training-human-systems-integration",
    number: "02",
    color: "#246bff",
    title: "Training & Human Systems Integration",
    shortTitle: "Training & HSI",
    description:
      "Harkcon designs training and Human Systems Integration support around the tasks people need to perform. From curriculum development to acquisition support, we align skills, processes, and tools with operational requirements.",
    proofPoint:
      "Since 2017, Harkcon has provided continuous Human Performance Support and Training technical support for the U.S. Coast Guard Offshore Patrol Cutter program under the direction of the USCG Office of Human Systems Integration.",
    solutions: [
      "HSI lifecycle support for major acquisitions",
      "Training strategy development and curriculum design",
      "Foreign partner training and capacity-building programs",
      "Instructional Systems Design and evaluation",
    ],
    heroImage: unsplash("1661964196939-3ca0a9d43677", true),
    heroAlt: "A maritime vessel underway at dawn",
    wideImage: unsplash("1742405469946-c004ec8a32f0"),
    wideAlt: "Navigation instruments inside a maritime patrol vessel",
    detailImage: unsplash("1641467613990-b74163e280e3"),
    detailAlt: "The operational bridge of a vessel at sea",
  },
  {
    slug: "process-improvement-transformation",
    number: "03",
    color: "#ffc400",
    title: "Process Improvement & Transformation",
    shortTitle: "Process Improvement",
    description:
      "We analyze processes, identify avoidable delays, and help agencies improve how work gets done. Our team redesigns workflows and updates supporting policies to reduce risk and meet operational requirements.",
    proofPoint:
      "Harkcon conducted detailed process reengineering and policy modernization for the U.S. Coast Guard National Maritime Center Merchant Mariner Credentialing program, improving end-to-end credentialing workflows.",
    solutions: [
      "Business process analysis and reengineering",
      "Credentialing and operational process optimization",
      "Performance improvement planning",
      "Organizational transformation initiatives",
    ],
    heroImage: unsplash("1769144256227-5185141c3aca"),
    heroAlt: "An aerial view of a large maritime container terminal",
    wideImage: unsplash("1566576721346-d4a3b4eaeb55"),
    wideAlt: "Port infrastructure moving cargo through a complex operation",
    detailImage: unsplash("1504307651254-35680f356dfd"),
    detailAlt: "Infrastructure professionals coordinating work in the field",
  },
  {
    slug: "policy-strategy-program-support",
    number: "04",
    color: "#16c172",
    title: "Policy, Strategy, & Program Support",
    shortTitle: "Policy & Strategy",
    description:
      "Harkcon helps federal agencies develop policies, set priorities, and manage complex programs. We connect analysis with the decisions program leaders need to make. Where appropriate, we use AI-enabled tools to support contract work, with human oversight and checks for policy compliance.",
    proofPoint:
      "Harkcon has executed complex manpower requirements analyses across U.S. Coast Guard Atlantic Area and Pacific Area operational missions, informing future resourcing decisions.",
    solutions: [
      "Mission requirements determinations and gap analyses",
      "Policy research and strategic planning",
      "Program management and acquisition support",
      "Financial modeling and expense allocation",
    ],
    heroImage: unsplash("1618656172765-26774a4a38d2"),
    heroAlt: "The United States Capitol beneath an expansive sky",
    wideImage: unsplash("1573181759662-1c146525b21f"),
    wideAlt: "Civic architecture representing public-sector programs",
    detailImage: "/images/editorial/policy-detail.jpg",
    detailAlt: "A black-and-white view of a neoclassical building with tall columns",
  },
  {
    slug: "international-advisory-capacity-building",
    number: "05",
    color: "#a23cff",
    title: "International Advisory & Capacity Building",
    shortTitle: "Global Advisory",
    description:
      "Harkcon supports international partners with practical advice, maritime training, and capacity development. We help teams build the skills and working relationships needed for safe, effective operations abroad.",
    proofPoint:
      "Harkcon supported the U.S. Coast Guard Office of International Affairs and U.S. Embassy Hanoi in delivering shipboard emergency response training to Vietnam’s Customs, Anti-Smuggling, & Investigations Branch.",
    solutions: [
      "International maritime governance training",
      "Foreign partner capacity development",
      "Curriculum development for overseas audiences",
      "Technical advisory and facilitation support",
    ],
    heroImage: unsplash("1661879449050-069f67e200bd", true),
    heroAlt: "A container ship moving through an international port",
    wideImage: unsplash("1770215252183-da5f44f2851c"),
    wideAlt:
      "U.S. and allied sailors working together in safety gear during an at-sea training exercise",
    detailImage: unsplash("1714813588813-f10e94c85872"),
    detailAlt: "A water-rescue trainee practicing emergency response skills",
  },
  {
    slug: "administrative-compliance-support",
    number: "06",
    color: "#ff7a1a",
    title: "Administrative & Compliance Support",
    shortTitle: "Compliance Support",
    description:
      "Harkcon helps agencies manage records, address privacy requirements, and meet regulatory obligations. Our administrative and operational support keeps essential daily work on track.",
    proofPoint:
      "Harkcon delivered privacy compliance support to the Department of Homeland Security, including the development of privacy impact assessments and records retention schedules.",
    solutions: [
      "Records management and Freedom of Information Act support",
      "Privacy and regulatory compliance solutions",
      "Administrative and operational support",
    ],
    heroImage: unsplash("1759020622261-a876260db765"),
    heroAlt: "The National Archives building in Washington, D.C.",
    wideImage: unsplash("1521587760476-6c12a4b040da"),
    wideAlt: "A monumental archive interior lined with organized collections",
    detailImage: unsplash("1507842217343-583bb7270b66"),
    detailAlt: "Structured library shelves representing careful records management",
  },
  {
    slug: "emergency-management-continuity-support",
    number: "07",
    color: "#00a8a8",
    title: "Emergency Management & Continuity Support",
    shortTitle: "Emergency Support",
    description:
      "Harkcon helps agencies plan, exercise, and maintain emergency management and continuity programs. We prepare teams to respond to disruptions, recover operations, and protect the essential functions their missions depend on.",
    proofPoint:
      "Harkcon developed and maintained the U.S. Coast Guard Headquarters Continuity of Operations Operational Plan, Devolution Plan, and Multi-Year Strategy for Continuity, directly aligning with Federal Continuity Directives and PPD-40.",
    solutions: [
      "COOP and devolution program development and maintenance",
      "Continuity of Government planning and federal directive compliance",
      "All-hazards emergency preparedness and incident management support",
      "HSEEP-compliant tabletop, functional, and full-scale exercises",
      "After-action reporting, corrective action programs, and lessons learned analysis",
      "Operations center staffing support and surge response coordination",
      "Secure facility and continuity communications testing",
    ],
    heroImage: unsplash("1753955101252-f97a05b21635"),
    heroAlt: "A firefighting helicopter carrying water toward a wildfire",
    wideImage: unsplash("1780608128420-7f92238dc774"),
    wideAlt: "Wildland firefighters managing fire and smoke in a pine forest",
    detailImage: unsplash("1769716790025-126d7f25d4fb"),
    detailAlt: "A search-and-rescue team evacuating a person by helicopter",
  },
]

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug)
}
