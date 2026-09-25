import Image from "next/image"
import Link from "next/link"
import HeroParallaxImage from "~/components/hero-parallax-image"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import SubtleParallaxPhoto from "~/components/subtle-parallax-photo"
import type { Solution } from "~/lib/solutions"

const capabilityCopy = [
  "Our expertise across Harkcon’s corporate capabilities can be applied to workgroups in any industry and at any scale.",
  "We believe strong, dynamic relationships are essential to doing business well, so we invest in long-term partnerships built on trust, clarity, and shared purpose.",
  "We provide complete and dependable support as clients face their most challenging circumstances. We are the trusted partner who will motivate, inspire, and deliver.",
  "Whether we work directly for a client or alongside our highly regarded corporate partners, our focus remains the same: meaningful results, delivered on time and within budget. The solutions we employ and the analyses we conduct can adapt to any industry or organization size.",
]

export default function SolutionDetailPage({ solution }: { solution: Solution }) {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header />
      <div className="page-content">
        <section className="solution-detail-hero" aria-label={`${solution.title} hero image`}>
          <HeroParallaxImage
            src={solution.heroImage}
            alt={solution.heroAlt}
            imageClassName="solution-detail-hero-image"
          />
          <div className="solution-detail-hero-overlay" />
          <div className="site-gutter solution-detail-hero-index">
            <p className="eyebrow text-white/75">Harkcon solutions</p>
            <span>{solution.number}</span>
          </div>
        </section>

        <section className="solution-detail-intro" aria-labelledby="solution-title">
          <div className="site-gutter solution-detail-intro-grid">
            <div className="solution-detail-label">
              <span>{solution.number}</span>
              <p className="eyebrow">Our expertise</p>
            </div>
            <div className="solution-detail-intro-copy">
              <h1 id="solution-title">{solution.title}</h1>
              <p>{solution.description}</p>
            </div>
          </div>
        </section>

        <section className="solution-detail-wide-image" aria-label={solution.wideAlt}>
          <SubtleParallaxPhoto
            src={solution.wideImage}
            className="solution-detail-wide-photo"
            label={solution.wideAlt}
            strength={110}
          />
        </section>

        <section className="solution-proof-section" aria-labelledby="proof-point-title">
          <div className="site-gutter solution-proof-grid">
            <div>
              <p className="eyebrow mb-6 text-[#5f626b]">Proof point</p>
              <h2 id="proof-point-title">Experience measured in outcomes.</h2>
            </div>
            <p>{solution.proofPoint}</p>
          </div>
        </section>

        <section className="solution-capabilities-section" aria-labelledby="capabilities-title">
          <div className="site-gutter solution-capabilities-grid">
            <figure className="solution-capabilities-image">
              <Image
                src={solution.detailImage}
                alt={solution.detailAlt}
                fill
                unoptimized
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </figure>
            <div className="solution-capabilities-copy">
              <p className="eyebrow text-[#5f626b]">What we deliver</p>
              <h2 id="capabilities-title">Solutions built around the mission.</h2>
              <ol className="solution-capabilities-list">
                {solution.solutions.map((item, index) => (
                  <li key={item} data-reveal-line>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="solution-partnership-section" aria-labelledby="partnership-title">
          <div className="site-gutter solution-partnership-grid">
            <div>
              <p className="eyebrow mb-6 text-white/55">Beyond a single engagement</p>
              <h2 id="partnership-title">Expertise that travels with the challenge.</h2>
            </div>
            <div className="solution-partnership-copy">
              {capabilityCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="solution-cta-section" aria-label="Next steps">
          <div className="site-gutter solution-cta-grid">
            <article>
              <p className="eyebrow text-[#5f626b]">Start a conversation</p>
              <h2>Ready to put this expertise to work?</h2>
              <Link href="/contact" className="pill-button">
                Contact us <Arrow />
              </Link>
            </article>
            <article>
              <p className="eyebrow text-[#5f626b]">Build your career</p>
              <h2>Interested in doing work in this field?</h2>
              <Link href="/careers" className="pill-button">
                Join Harkcon <Arrow />
              </Link>
            </article>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}
