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
    heroImage: unsplash("1531973576160-7125cd663d86"),
    heroAlt: "Three professionals collaborating in a modern open office",
    wideImage: unsplash("1606857521015-7f9fcf423740"),
    wideAlt: "A workforce operating together at computer workstations",
    detailImage: unsplash("1579487785973-74d2ca7abdd5"),
    detailAlt: "An organized office prepared for a high-performing team",
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
    wideImage: unsplash("1663047734922-fb593d415039", true),
    wideAlt: "Professionals participating in an analytical training workshop",
    detailImage: unsplash("1683120730432-b5ea74bd9047", true),
    detailAlt: "A team learning and working together around a table",
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
    heroImage: unsplash("1533749871411-5e21e14bcc7d"),
    heroAlt: "A strategist mapping a process on a whiteboard",
    wideImage: unsplash("1620325867502-221cfb5faa5f"),
    wideAlt: "Detailed notes and diagrams used to shape a stronger process",
    detailImage: unsplash("1517048676732-d65bc937f952"),
    detailAlt: "A team meeting focused on collaborative problem solving",
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
    heroImage: unsplash("1517048676732-d65bc937f952"),
    heroAlt: "Leaders gathered around a table for a strategy session",
    wideImage: unsplash("1573164574572-cb89e39749b4"),
    wideAlt: "A program team working through decisions together",
    detailImage: unsplash("1573167507387-6b4b98cb7c13"),
    detailAlt: "Colleagues listening during a strategic presentation",
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
    wideImage: unsplash("1606185540834-d6e7483ee1a4"),
    wideAlt: "A cargo vessel traveling through open water",
    detailImage: unsplash("1585713181935-d5f622cc2415"),
    detailAlt: "A maritime vessel supporting operations across borders",
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
    heroImage: unsplash("1661313626999-90d230cabf8d", true),
    heroAlt: "Organized records and paperwork on an office desk",
    wideImage: unsplash("1468779036391-52341f60b55d"),
    wideAlt: "A carefully organized stack of office records",
    detailImage: unsplash("1661328068099-9d8be8cd1593", true),
    detailAlt: "An audit checklist used to support compliance work",
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
    heroImage: unsplash("1554734867-bf3c00a49371"),
    heroAlt: "Emergency response vehicles moving through a city at night",
    wideImage: unsplash("1779170009831-617acbef8fb1"),
    wideAlt: "Emergency personnel coordinating beside response vehicles",
    detailImage: unsplash("1768160255185-ca629b93063c"),
    detailAlt: "Emergency response equipment ready for deployment",
  },
]

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug)
}
