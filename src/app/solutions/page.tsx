import type { Metadata } from "next"
import HeroParallaxImage from "~/components/hero-parallax-image"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import SolutionsOverview from "~/components/solutions-overview"
import SolutionsProcess from "~/components/solutions-process"
import Link from "~/components/visibility-link"

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore Harkcon’s workforce, training, strategy, and operational support solutions and our approach to lasting mission performance.",
}

export default function Solutions() {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header />
      <div className="relative">
        <section className="relative h-[55svh] overflow-hidden" aria-labelledby="solutions-title">
          <HeroParallaxImage
            src="/images/editorial/solutions-hoover-dam.jpg"
            alt="The bridge and canyon at Hoover Dam, United States"
            imageClassName="object-cover"
          />
          <div className="page-hero-overlay absolute inset-0 z-[1]" />
          <div className="site-gutter relative z-10 flex h-full items-end pb-12 text-white md:pb-16">
            <div>
              <p className="eyebrow mb-5">Our&nbsp;solutions</p>
              <h1
                id="solutions-title"
                className="max-w-4xl font-header text-display font-medium text-balance"
              >
                Expertise built around your&nbsp;mission.
              </h1>
            </div>
          </div>
        </section>
        <section className="site-gutter py-24 md:py-32" aria-labelledby="solutions-intro">
          <h2 id="solutions-intro" className="eyebrow mb-8">
            The right people. A practical&nbsp;approach.
          </h2>
          <p className="max-w-5xl text-body-copy text-pretty">
            Harkcon helps organizations understand their workforce, strengthen capabilities, and
            improve how work gets done. We bring together experience in analysis, training,
            strategy, and operational support to address each client’s requirements. From defining
            the challenge to measuring results, we work alongside your team to turn evidence into
            practical solutions that support the&nbsp;mission.
          </p>
        </section>
        <SolutionsProcess />
        <SolutionsOverview />
        <section className="bg-[#0d132d] text-white">
          <div className="site-gutter flex flex-col items-start justify-between gap-10 py-20 md:flex-row md:items-end">
            <h2 className="max-w-3xl font-header text-section-title text-balance">
              Let’s put the right expertise to&nbsp;work.
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
