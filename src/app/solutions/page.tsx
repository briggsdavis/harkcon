import type { Metadata } from "next"
import HeroParallaxImage from "~/components/hero-parallax-image"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import SolutionsProcess from "~/components/solutions-process"
import Link from "~/components/visibility-link"
import { solutions } from "~/lib/solutions"

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore Harkcon’s workforce, training, strategy, and operational support solutions and our approach to lasting mission performance.",
}

const summaries: Record<string, string> = {
  "workforce-organizational-analysis": "Align your workforce with mission needs.",
  "training-human-systems-integration": "Build skills for operational performance.",
  "process-improvement-transformation": "Simplify processes and improve performance.",
  "policy-strategy-program-support": "Turn strategy into coordinated action.",
  "international-advisory-capacity-building": "Strengthen partner capabilities worldwide.",
  "administrative-compliance-support": "Keep operations organized and compliant.",
  "emergency-management-continuity-support": "Prepare for disruption and sustain operations.",
}

export default function Solutions() {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header />
      <div className="relative">
        <section className="relative h-[55svh] overflow-hidden" aria-labelledby="solutions-title">
          <HeroParallaxImage
            src="/images/editorial/solutions-harbor.jpg"
            alt="Container terminals and transport links in a working harbor"
            imageClassName="object-cover"
          />
          <div className="page-hero-overlay absolute inset-0 z-[1]" />
          <div className="site-gutter relative z-10 flex h-full items-end pb-12 text-white md:pb-16">
            <div>
              <p className="eyebrow mb-5">Our solutions</p>
              <h1
                id="solutions-title"
                className="max-w-4xl font-header text-display font-medium text-balance"
              >
                Expertise built around your mission.
              </h1>
            </div>
          </div>
        </section>
        <section className="site-gutter py-24 md:py-32" aria-labelledby="solutions-intro">
          <h2 id="solutions-intro" className="eyebrow mb-8">
            The right people. A practical approach.
          </h2>
          <p className="max-w-5xl text-body-copy text-pretty">
            Harkcon helps organizations understand their workforce, strengthen capabilities, and
            improve how work gets done. We bring together experience in analysis, training,
            strategy, and operational support to address each client’s requirements. From defining
            the challenge to measuring results, we work alongside your team to turn evidence into
            practical solutions that support the mission.
          </p>
        </section>
        <SolutionsProcess />
        <section className="site-gutter py-24 md:py-32" aria-labelledby="capabilities-title">
          <p className="eyebrow mb-6">Our expertise</p>
          <h2
            id="capabilities-title"
            className="max-w-4xl font-header text-section-title font-medium text-balance"
          >
            Seven capabilities. One commitment to performance.
          </h2>
          <div className="mt-14 grid gap-x-7 md:grid-cols-2 lg:grid-cols-8">
            {solutions.map((solution, index) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className={`group relative flex min-h-[186px] flex-col overflow-hidden border-t border-[#0d132d]/20 px-5 py-4 text-[#0d132d] transition-colors duration-500 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none md:min-h-[204px] md:px-6 md:py-5 lg:col-span-2 ${index === 0 ? "lg:col-start-3" : index === 1 ? "lg:col-start-5" : index === 2 ? "lg:col-start-7" : "lg:row-start-2"}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left scale-x-0 bg-[#0d132d] transition-transform duration-900 ease-[cubic-bezier(0.45,0,0.2,1)] will-change-transform group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                />
                <span
                  aria-hidden="true"
                  className={`absolute top-5 right-5 z-10 h-2 w-2 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none ${["bg-[#ffb612]", "bg-[#ff334f]", "bg-[#8b8e96]"][index % 3]}`}
                />
                <div className="relative z-10 flex h-full flex-1 flex-col">
                  <h3 className="max-w-sm pr-3 font-header text-card-title font-medium text-balance">
                    {solution.title}
                  </h3>
                  <div className="mt-auto flex items-end gap-4 pt-5">
                    <p className="max-w-[15rem] text-sm leading-relaxed text-pretty text-[#5f626b] transition-colors duration-700 group-hover:text-white/70 group-focus-visible:text-white/70 motion-reduce:transition-none">
                      {summaries[solution.slug]}
                    </p>
                    <span className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center bg-[#f4f3f0] text-[#0d132d]">
                      <Arrow
                        diagonal
                        className="transition-transform duration-600 ease-smooth group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="bg-[#0d132d] text-white">
          <div className="site-gutter flex flex-col items-start justify-between gap-10 py-20 md:flex-row md:items-end">
            <h2 className="max-w-3xl font-header text-section-title text-balance">
              Let’s put the right expertise to work.
            </h2>
            <Link href="/contact" className="action-button action-button--light shrink-0">
              Start a conversation <Arrow />
            </Link>
          </div>
        </section>
        <SiteFooter />
      </div>
    </div>
  )
}
