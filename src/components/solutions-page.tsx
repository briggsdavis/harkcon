"use client"
import HeroParallaxImage from "~/components/hero-parallax-image"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import SolutionsOverview from "~/components/solutions-overview"
import Link from "~/components/visibility-link"
import { useEditingMode } from "./editing-mode"
import { PageText, PageImage, PageLink } from "./page-editing"

export default function Solutions() {
  const editing = useEditingMode()
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <div inert={editing}>
        <Header />
      </div>
      <div className="relative">
        <section className="relative h-[55svh] overflow-hidden" aria-labelledby="solutions-title">
          <PageImage field="solutions.image">
            <HeroParallaxImage
              src="/images/editorial/solutions-hoover-dam.jpg"
              alt="The bridge and canyon at Hoover Dam, United States"
              imageClassName="object-cover"
            />
          </PageImage>
          <div className="page-hero-overlay absolute inset-0 z-[1]" />
          <div
            data-page-hero-copy
            className="site-gutter relative z-10 flex h-full items-end pb-12 text-white md:pb-16"
          >
            <div>
              <PageText field="solutions.our-solutions">
                <p className="eyebrow mb-5">Our&nbsp;solutions</p>
              </PageText>
              <PageText field="solutions.solutions-title">
                <h1
                  id="solutions-title"
                  className="max-w-4xl font-header text-display font-medium text-balance"
                >
                  Expertise built around your&nbsp;mission.
                </h1>
              </PageText>
            </div>
          </div>
        </section>
        <section className="site-gutter py-24 md:py-32" aria-labelledby="solutions-intro">
          <PageText field="solutions.solutions-intro">
            <h2 id="solutions-intro" className="eyebrow mb-8">
              The right people. A practical&nbsp;approach.
            </h2>
          </PageText>
          <PageText field="solutions.harkcon-helps-organizations-understand-their">
            <p className="max-w-5xl text-body-copy text-pretty">
              Harkcon helps organizations understand their workforce, strengthen capabilities, and
              improve how work gets done. We bring together experience in analysis, training,
              strategy, and operational support to address each client’s requirements. From defining
              the challenge to measuring results, we work alongside your team to turn evidence into
              practical solutions that support the&nbsp;mission.
            </p>
          </PageText>
        </section>

        <SolutionsOverview variant="overview" />
        <section className="bg-[#0d132d] text-white">
          <div className="site-gutter flex flex-col items-start justify-between gap-10 py-20 md:flex-row md:items-end">
            <PageText field="solutions.let-s-put-the-right">
              <h2 className="max-w-3xl font-header text-section-title text-balance">
                Let’s put the right expertise to&nbsp;work.
              </h2>
            </PageText>
            <PageLink field="solutions.start-a-conversation">
              <Link href="/contact" className="action-button action-button--light shrink-0">
                Start a conversation <Arrow />
              </Link>
            </PageLink>
          </div>
        </section>
        <SiteFooter />
      </div>
    </div>
  )
}
