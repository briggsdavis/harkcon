import Image from "next/image"
import HeroParallaxImage from "~/components/hero-parallax-image"
import { Header, SiteFooter } from "~/components/home-page"
import SubtleParallaxPhoto from "~/components/subtle-parallax-photo"
import type { Solution } from "~/lib/solutions"
import { keepClosingWords } from "~/lib/typography"

const headingClassName = "text-balance max-w-4xl font-header text-section-title font-medium"

export default function SolutionDetailPage({ solution }: { solution: Solution }) {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header />
      <div className="relative">
        <section
          className="relative h-[52svh] min-h-[360px] overflow-hidden md:min-h-[400px]"
          aria-label={`${solution.title} hero image`}
        >
          <HeroParallaxImage
            src={solution.heroImage}
            alt={solution.heroAlt}
            imageClassName="scale-[1.02] object-cover"
          />
          <div className="page-hero-overlay absolute inset-0 z-[1]" />
          <div className="site-gutter relative z-10 flex h-full items-end justify-between pb-8 text-white md:pb-10">
            <p className="eyebrow text-pretty text-white/75">Harkcon&nbsp;solutions</p>
            <span className="font-eyebrow text-sm tracking-[0.15em] text-white/70">
              {solution.number}
            </span>
          </div>
        </section>

        <section className="py-20 md:py-24 lg:py-28" aria-labelledby="solution-title">
          <div className="site-gutter grid gap-12 lg:grid-cols-[minmax(190px,0.55fr)_minmax(0,1.7fr)] lg:gap-16 xl:gap-28">
            <div className="flex items-start gap-5 self-start lg:sticky lg:top-36">
              <span
                className="mt-0.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: solution.color }}
                aria-hidden="true"
              />
              <span className="font-eyebrow text-eyebrow-label tracking-[0.15em] text-[#8b8e96]">
                {solution.number}
              </span>
              <p className="eyebrow text-pretty">Our&nbsp;expertise</p>
            </div>
            <div>
              <h1
                id="solution-title"
                className="max-w-5xl font-header text-display font-medium text-balance"
              >
                {keepClosingWords(solution.shortTitle)}
              </h1>
              <p className="mt-10 max-w-[900px] text-body-copy text-pretty text-[#454955]">
                {keepClosingWords(solution.description)}
              </p>
            </div>
          </div>
        </section>

        <section
          className="h-[41svh] min-h-[312px] w-full overflow-hidden md:h-[52svh] md:min-h-[408px]"
          aria-label={solution.wideAlt}
        >
          <SubtleParallaxPhoto src={solution.wideImage} label={solution.wideAlt} strength={110} />
        </section>

        <section
          className="bg-[#f4f3f0] py-24 md:py-32 lg:py-40"
          aria-labelledby="proof-point-title"
        >
          <div className="site-gutter grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 xl:gap-28">
            <div>
              <h2 id="proof-point-title" className={headingClassName}>
                Experience measured in&nbsp;outcomes.
              </h2>
            </div>
            <p className="max-w-[850px] text-body-copy text-pretty text-[#454955] lg:pt-12">
              {keepClosingWords(solution.proofPoint)}
            </p>
          </div>
        </section>

        <section className="py-24 md:py-32 lg:py-40" aria-labelledby="capabilities-title">
          <div className="site-gutter grid items-start gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20 xl:gap-28">
            <figure className="group relative min-h-[58svh] overflow-hidden bg-[#f4f3f0] lg:sticky lg:top-32 lg:min-h-[68svh]">
              <Image
                src={solution.detailImage}
                alt={solution.detailAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-900 ease-smooth group-hover:scale-[1.035]"
              />
            </figure>
            <div>
              <h2 id="capabilities-title" className={headingClassName}>
                Solutions built around the&nbsp;mission.
              </h2>
              <ol className="mt-12 border-b border-[#0d132d]/20">
                {solution.solutions.map((item, index) => (
                  <li
                    key={keepClosingWords(item)}
                    className="group grid grid-cols-[42px_1fr] gap-4 py-7 md:grid-cols-[56px_1fr] md:gap-6 md:py-8"
                    data-reveal-line
                  >
                    <span className="pt-1 font-eyebrow text-eyebrow-label tracking-[0.12em] text-[#8b8e96]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="font-header text-card-title text-pretty transition-transform delay-0 duration-500 ease-out group-hover:translate-x-2.5">
                      {keepClosingWords(item)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}
