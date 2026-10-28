import Link from "next/link"
import { Arrow } from "~/components/home-page"
import SolutionCardWatermark from "~/components/solution-card-watermark"
import ViewportCards from "~/components/viewport-cards"

const capabilities = [
  [
    "Workforce & Organizational Analysis",
    "workforce-organizational-analysis",
    "Staffing analysis and workforce plans grounded in evidence.",
  ],
  [
    "Training & Human Systems Integration",
    "training-human-systems-integration",
    "Training built around the work people need to do.",
  ],
  [
    "Process Improvement & Transformation",
    "process-improvement-transformation",
    "Practical process changes that reduce risk and wasted effort.",
  ],
  [
    "Administrative & Compliance Support",
    "administrative-compliance-support",
    "Organized operations and dependable compliance support.",
  ],
  [
    "Policy, Strategy, & Program Support",
    "policy-strategy-program-support",
    "Clear direction for complex programs and decisions.",
  ],
  [
    "International Advisory & Capacity Building",
    "international-advisory-capacity-building",
    "Stronger partnerships and operational readiness abroad.",
  ],
  [
    "Emergency Management & Contingency Support",
    "emergency-management-continuity-support",
    "Preparedness that protects mission-critical functions.",
  ],
]

export default function SolutionsOverview() {
  return (
    <section
      id="solutions"
      className="bg-white py-20 md:py-24 lg:py-28"
      aria-labelledby="solutions-title"
    >
      <ViewportCards className="site-gutter grid gap-x-7 gap-y-0 md:grid-cols-2 xl:grid-cols-4">
        <div className="pb-12 xl:pb-0">
          <h2
            id="solutions-title"
            className="font-header text-section-title font-medium xl:sticky xl:top-32"
          >
            Our Solutions
          </h2>
        </div>
        {capabilities.map(([title, slug, detail]) => (
          <Link
            data-center-card
            key={slug}
            href={`/solutions/${slug}`}
            className="group relative flex min-h-[310px] flex-col overflow-hidden border-t border-[#0d132d]/20 px-5 py-7 text-[#0d132d] transition-colors duration-500 hover:text-white focus-visible:text-white focus-visible:outline-2 data-[center-active=true]:text-white md:min-h-[340px] md:px-6 md:py-8"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left scale-x-0 bg-[#0d132d] transition-transform duration-700 group-hover:scale-x-100 group-focus-visible:scale-x-100 group-data-[center-active=true]:scale-x-100 motion-reduce:transition-none"
            />
            <SolutionCardWatermark />
            <div className="relative z-10 flex flex-1 flex-col">
              <h3 className="font-header text-card-title font-medium text-balance">{title}</h3>
              <div className="mt-auto flex items-end gap-5 pt-10">
                <p className="text-sm leading-relaxed text-[#5f626b] transition-colors group-hover:text-white/70 group-focus-visible:text-white/70 group-data-[center-active=true]:text-white/70">
                  {detail}
                </p>
                <span className="ml-auto flex size-14 shrink-0 items-center justify-center bg-[#f4f3f0] text-[#0d132d]">
                  <Arrow
                    diagonal
                    className="transition-transform duration-500 group-hover:rotate-45 group-focus-visible:rotate-45 group-data-[center-active=true]:rotate-45"
                  />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </ViewportCards>
    </section>
  )
}
