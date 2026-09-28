import { Metadata } from "next"
import Image from "next/image"
import { TransitionLink as Link } from "~/components/page-transition"

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore Harkcon's workforce analysis, training, process improvement, program support, international advisory, compliance, and emergency management solutions.",
}

const solutions = [
  { id: "workforce", title: "Workforce & Organizational Analysis" },
  { id: "training", title: "Training & Human Systems Integration" },
  { id: "process", title: "Process Improvement & Transformation" },
  { id: "policy", title: "Policy, Strategy & Program Support" },
  { id: "international", title: "International Advisory & Capacity Building" },
  { id: "administrative", title: "Administrative & Compliance Support" },
  { id: "emergency", title: "Emergency Management & Continuity Support" },
] as const

const supportingSolutions = [
  {
    id: "training",
    title: "Training & Human Systems Integration",
    description:
      "We connect training, tools, and human needs to the way a mission is actually carried out.",
    services: [
      "Human systems integration across major acquisitions",
      "Training strategies and curriculum design",
      "Instructional systems design and evaluation",
      "Foreign partner training programs",
    ],
    proof:
      "Since 2017, Harkcon has supported human performance and training for the Coast Guard's Offshore Patrol Cutter program.",
  },
  {
    id: "process",
    title: "Process Improvement & Transformation",
    description:
      "We examine how work moves through an organization and make complex operations clearer and more effective.",
    services: [
      "Business process analysis and reengineering",
      "Credentialing and operational process improvement",
      "Performance improvement planning",
      "Organizational transformation",
    ],
    proof:
      "For the Coast Guard's National Maritime Center, Harkcon improved merchant mariner credentialing workflows and supporting policy.",
  },
  {
    id: "policy",
    title: "Policy, Strategy & Program Support",
    description:
      "We turn mission requirements into practical plans and provide the support to carry them through.",
    services: [
      "Mission requirements and gap analysis",
      "Policy research and strategic planning",
      "Program management and acquisition support",
      "Financial modeling and expense allocation",
    ],
    proof:
      "Harkcon's manpower analyses across Coast Guard Atlantic and Pacific Area missions have informed resourcing decisions.",
  },
  {
    id: "international",
    title: "International Advisory & Capacity Building",
    description:
      "We help international partners build the knowledge and operational capacity to meet shared maritime challenges.",
    services: [
      "International maritime governance training",
      "Foreign partner capacity development",
      "Curriculum for overseas audiences",
      "Technical advisory and facilitation",
    ],
    proof:
      "With the Coast Guard and U.S. Embassy Hanoi, Harkcon delivered shipboard emergency response training to Vietnam's customs anti-smuggling branch.",
  },
  {
    id: "administrative",
    title: "Administrative & Compliance Support",
    description:
      "We provide the operational and compliance support agencies need to keep essential work moving.",
    services: [
      "Records management and FOIA support",
      "Privacy and regulatory compliance",
      "Administrative and operational support",
      "Project-based and specialized staffing",
    ],
    proof:
      "For the Department of Homeland Security, Harkcon developed privacy impact assessments and records retention schedules.",
  },
  {
    id: "emergency",
    title: "Emergency Management & Continuity Support",
    description:
      "We help agencies prepare for disruption, respond with confidence, and sustain critical functions.",
    services: [
      "Continuity and devolution planning",
      "All-hazards preparedness and incident support",
      "Exercises, evaluation, and after-action reporting",
      "Operations center staffing and surge coordination",
      "Secure facility and communications testing",
    ],
    proof:
      "Harkcon developed and maintained the Coast Guard Headquarters continuity, devolution, and multiyear strategy plans.",
  },
] as const

export default function Solutions() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-navy text-brand-white">
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2">
          <Image
            src="/maritime-operations-bridge.jpg"
            alt="Navigation and operations consoles on the bridge of a ship"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover opacity-40 lg:opacity-100"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-brand-navy to-transparent"
          />
        </div>
        <div className="relative z-10 mx-auto flex max-w-360 items-center px-6 py-20 sm:px-10 lg:min-h-150 lg:py-28">
          <div className="lg:w-[55%] lg:pr-12">
            <h1 className="max-w-3xl font-header text-5xl leading-[1.04] font-semibold tracking-tight sm:text-6xl xl:text-7xl">
              Solutions for the people behind the mission.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-brand-white/85 sm:text-xl sm:leading-9">
              Harkcon helps agencies understand their workforce, build capability, improve
              operations, and stay ready for what comes next.
            </p>
            <a
              href="#solutions-index"
              className="mt-10 inline-block border-b-2 border-brand-gold pb-1 font-semibold transition-colors hover:border-brand-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-white motion-reduce:transition-none"
            >
              Explore our capabilities
            </a>
          </div>
        </div>
      </section>

      <nav
        id="solutions-index"
        aria-label="Solutions on this page"
        className="scroll-mt-20 bg-brand-surface text-brand-ink"
      >
        <div className="mx-auto max-w-360 px-6 py-14 sm:px-10 lg:py-18">
          <p className="font-header text-2xl font-semibold sm:text-3xl">Explore our work</p>
          <ul className="mt-8 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <li
                key={solution.id}
                className="flex items-start gap-3 border-t border-brand-ink/20 py-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-gold"
                />
                <a
                  href={`#${solution.id}`}
                  className="relative inline-block leading-snug font-medium after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brand-ink after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy focus-visible:after:scale-x-100 motion-reduce:after:transition-none"
                >
                  {solution.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <section
        id="workforce"
        aria-labelledby="workforce-title"
        className="scroll-mt-20 bg-brand-white text-brand-ink"
      >
        <div className="mx-auto grid max-w-360 gap-14 px-6 py-24 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-32">
          <div>
            <h2
              id="workforce-title"
              className="max-w-2xl font-header text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl xl:text-6xl"
            >
              Understand the work. Plan for the people.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8">
              We help agencies translate operational demands into defensible staffing and workforce
              decisions. The result is a clearer view of the roles, skills, and capacity each
              mission requires.
            </p>
            <h3 className="mt-10 font-semibold text-brand-navy">
              Workforce & Organizational Analysis
            </h3>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {[
                "Workforce requirements and forecasting",
                "Staffing and capability assessments",
                "Competency development and role alignment",
                "Credentialing process evaluation",
                "Job task analysis",
              ].map((service) => (
                <li key={service} className="border-t border-brand-ink/20 pt-3 text-sm leading-6">
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/workforce-planning-team.jpg"
                alt="Team reviewing workforce plans together around a table"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
              <p className="font-header text-6xl leading-none tracking-tight text-brand-navy sm:text-7xl">
                $5.3M
              </p>
              <p className="max-w-sm text-sm leading-6">
                value of the five-year Coast Guard workforce requirements BPA awarded to Harkcon in
                2025
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        aria-label="Additional solutions"
        className="scroll-mt-20 bg-brand-surface text-brand-ink"
      >
        <div className="mx-auto max-w-360 px-6 py-24 sm:px-10 lg:py-32">
          <div className="grid gap-x-14 gap-y-16 lg:grid-cols-2 lg:gap-y-20">
            {supportingSolutions.map((solution, index) => (
              <article
                key={solution.id}
                id={solution.id}
                aria-labelledby={`${solution.id}-title`}
                className={`scroll-mt-28 ${index < 2 ? "" : "border-t border-brand-ink/25 pt-7"}`}
              >
                <h2
                  id={`${solution.id}-title`}
                  className="max-w-lg font-header text-3xl leading-tight font-semibold tracking-tight sm:text-4xl"
                >
                  {solution.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
                  {solution.description}
                </p>
                <ul className="mt-7 space-y-2 text-sm leading-6">
                  {solution.services.map((service) => (
                    <li key={service} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-gold"
                      />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-9 border-l-2 border-brand-gold pl-5">
                  <p className="max-w-xl text-sm leading-6">{solution.proof}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="solutions-contact"
        className="border-t border-brand-ink/10 bg-brand-white text-brand-ink"
      >
        <div className="mx-auto grid max-w-360 gap-10 px-6 py-24 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20 lg:py-32">
          <div>
            <h2
              id="solutions-contact"
              className="max-w-2xl font-header text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl xl:text-6xl"
            >
              Let&apos;s talk about your mission.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8">
              Tell us what your agency needs. We can help identify the right expertise and a path
              forward.
            </p>
          </div>
          <div className="flex flex-col items-start gap-6 lg:items-end">
            <Link
              href="/contracts"
              className="border-b-2 border-brand-gold pb-1 font-semibold text-brand-navy transition-colors hover:border-brand-navy focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy motion-reduce:transition-none"
            >
              View contract vehicles
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
