export type Solution = {
  slug: string
  number: string
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
    title: "Workforce & Organizational Analysis",
    shortTitle: "Workforce analysis",
    description:
      "Harkcon delivers tailored workforce and organizational analysis solutions to optimize readiness, improve staffing, and ensure mission success. Our team helps federal agencies assess current capabilities, identify gaps, and develop actionable workforce strategies.",
    proofPoint:
      "Since 2007, Harkcon has completed more than 40 workforce requirements analyses for the U.S. Coast Guard. Our Workforce Calculator Forecasting Tools have been repeatedly praised by USCG stakeholders for precision, transparency, and adaptability, enabling scenario modeling to support real-time resourcing decisions.",
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
    detailImage: unsplash("1618656172765-26774a4a38d2"),
    detailAlt: "The United States Capitol viewed from its eastern steps",
  },
  {
    slug: "training-human-systems-integration",
    number: "02",
    title: "Training & Human Systems Integration",
    shortTitle: "Training & HSI",
    description:
      "Harkcon designs and delivers high-impact training and Human Systems Integration solutions to equip workforces with the skills, processes, and tools needed to excel. From curriculum development to HSI support, we enhance mission effectiveness.",
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
    title: "Process Improvement & Transformation",
    shortTitle: "Process transformation",
    description:
      "Our process improvement and transformation solutions streamline operations, reduce risk, and drive measurable efficiency gains. We help agencies reengineer outdated workflows to meet modern mission demands.",
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
    title: "Policy, Strategy, & Program Support",
    shortTitle: "Policy & strategy",
    description:
      "Harkcon provides strategic advisory and program support to help federal agencies develop policies, align mission objectives, and manage complex programs effectively. Harkcon integrates AI-enabled tools responsibly to accelerate contract execution while ensuring human oversight and policy compliance.",
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
    detailImage: unsplash("1759020622261-a876260db765"),
    detailAlt: "The National Archives building and American flag in Washington, D.C.",
  },
  {
    slug: "international-advisory-capacity-building",
    number: "05",
    title: "International Advisory & Capacity Building",
    shortTitle: "International advisory",
    description:
      "Harkcon helps clients strengthen global partnerships through advisory support, training programs, and capacity-building initiatives that enhance maritime security and operational readiness abroad.",
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
    title: "Administrative & Compliance Support",
    shortTitle: "Compliance support",
    description:
      "Harkcon delivers reliable administrative, compliance, and operational support to ensure agencies meet regulatory obligations while maintaining smooth daily operations.",
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
    title: "Emergency Management & Continuity Support",
    shortTitle: "Emergency management",
    description:
      "Harkcon delivers comprehensive all-hazards emergency management and continuity solutions to help agencies strengthen preparedness, response, and recovery efforts and ensure mission-critical functions remain uninterrupted.",
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
