import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import DocumentDownload from "~/components/document-download"
import HeroParallaxImage from "~/components/hero-parallax-image"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import { HARKCON_CAPABILITY_STATEMENT_URL } from "~/lib/documents"
import { solutions } from "~/lib/solutions"

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore Harkcon's workforce, training, human capital, and organizational performance solutions.",
}

export default function Solutions() {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header />
      <div className="page-content">
        <section className="solution-detail-hero" aria-label="Harkcon solutions in action">
          <HeroParallaxImage
            src="https://images.unsplash.com/photo-1757463861676-bb8e0847eba4?auto=format&fit=crop&w=2400&q=88"
            alt="A bright orange U.S. Coast Guard helicopter in flight"
            imageClassName="solution-detail-hero-image"
          />
          <div className="solution-detail-hero-overlay" />
          <div className="site-gutter solution-detail-hero-index">
            <p className="eyebrow text-white/75">Harkcon solutions</p>
            <span>Overview</span>
          </div>
        </section>

        <section className="solutions-index" aria-labelledby="solutions-index-title">
          <div className="site-gutter">
            <div className="solutions-index-heading">
              <p className="eyebrow text-[#5f626b]">Our solutions</p>
              <h1 id="solutions-index-title">Expertise for missions that cannot stand still.</h1>
              <p>
                Harkcon pairs rigorous analysis with practical implementation to strengthen people,
                processes, and programs across the federal mission landscape.
              </p>
            </div>
            <div className="solutions-index-grid">
              {solutions.map((solution) => (
                <Link
                  key={solution.slug}
                  href={`/solutions/${solution.slug}`}
                  className="solutions-index-card group"
                >
                  <div className="solutions-index-card-image">
                    <Image
                      src={solution.heroImage}
                      alt=""
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="solutions-index-card-copy" data-reveal-line>
                    <span>{solution.number}</span>
                    <h2>{solution.title}</h2>
                    <span className="solutions-index-card-arrow">
                      <Arrow diagonal />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="solutions-document-section" aria-labelledby="solutions-document-title">
          <div className="site-gutter solutions-document-grid">
            <div>
              <p className="eyebrow mb-6 text-[#5f626b]">Company capabilities</p>
              <h2 id="solutions-document-title">The Harkcon overview, ready to share.</h2>
            </div>
            <div>
              <p>
                Download our capability statement for a concise view of Harkcon’s expertise,
                qualifications, and federal contracting information.
              </p>
              <DocumentDownload
                href={HARKCON_CAPABILITY_STATEMENT_URL}
                title="Harkcon Capability Statement"
                description="Services, qualifications, and contracting information."
              />
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="site-gutter flex flex-col items-start justify-between gap-10 py-20 md:flex-row md:items-end md:py-24">
            <div>
              <p className="eyebrow mb-5 text-[#5f626b]">Start a conversation</p>
              <h2 className="section-title max-w-3xl">
                Let&apos;s make your next mission stronger.
              </h2>
            </div>
            <Link href="/contact" className="pill-button shrink-0">
              Talk with our team <Arrow />
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}
