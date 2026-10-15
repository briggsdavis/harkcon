import { ArrowLeft } from "@phosphor-icons/react/ssr"
import Image from "next/image"
import Link from "next/link"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import type { NewsArticle } from "~/lib/news"

export default function ArticlePage({
  article,
  related,
}: {
  article: NewsArticle
  related: NewsArticle[]
}) {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header initialSurface="light" />
      <div className="page-content">
        <article className="article-page">
          <div className="site-gutter">
            <Link
              href="/news-insights"
              className="article-back mx-auto mb-8 flex w-full max-w-[900px] items-center gap-3 text-sm text-[#5f626b] transition-colors hover:text-[#0d132d]"
            >
              <ArrowLeft aria-hidden="true" /> All news
            </Link>
            <div className="article-hero-image relative mx-auto aspect-[16/9] w-full max-w-[900px] overflow-hidden md:aspect-[16/8]">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                unoptimized
                priority
                sizes="(min-width: 1200px) 1400px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="article-header mx-auto max-w-[900px] pt-12 md:pt-16">
              <div className="publication-meta flex flex-wrap items-center gap-4 font-eyebrow text-eyebrow-label font-semibold tracking-[0.1em] text-[#5f626b] uppercase">
                <time dateTime={article.date}>{article.displayDate}</time>
                <span data-category={article.category}>{article.category}</span>
              </div>
              <h1>{article.title}</h1>
            </div>
            <div className="article-body mx-auto max-w-[900px] pt-10 md:pt-12">
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>

        <section
          className="related-news bg-[#f4f3f0] py-20 md:py-28"
          aria-labelledby="related-news-title"
        >
          <div className="site-gutter">
            <div
              className="related-news-heading flex flex-col justify-between gap-8 pt-8 md:flex-row md:items-end"
              data-reveal-line
            >
              <div>
                <p className="eyebrow mb-4 text-[#5f626b]">Continue reading</p>
                <h2 id="related-news-title">More from Harkcon</h2>
              </div>
              <Link href="/news-insights" className="text-link" data-reveal-line>
                View all news <Arrow />
              </Link>
            </div>
            <div className="related-news-grid mt-14 grid gap-8 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  href={`/news-insights/${item.slug}`}
                  key={item.slug}
                  className="related-news-card group block pt-5"
                  data-reveal-line
                >
                  <div className="related-news-image relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      unoptimized
                      sizes="(min-width: 900px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                  </div>
                  <time dateTime={item.date}>{item.displayDate}</time>
                  <h3>{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    </div>
  )
}
