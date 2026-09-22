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
            <Link href="/news-insights" className="article-back">
              <span aria-hidden="true">←</span> All news
            </Link>
            <div className="article-hero-image">
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
            <div className="article-header">
              <div className="publication-meta">
                <time dateTime={article.date}>{article.displayDate}</time>
                <span>{article.category}</span>
              </div>
              <h1>{article.title}</h1>
            </div>
            <div className="article-body">
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>

        <section className="related-news" aria-labelledby="related-news-title">
          <div className="site-gutter">
            <div className="related-news-heading" data-reveal-line>
              <div>
                <p className="eyebrow mb-4 text-[#5f626b]">Continue reading</p>
                <h2 id="related-news-title">More from Harkcon</h2>
              </div>
              <Link href="/news-insights" className="text-link" data-reveal-line>
                View all news <Arrow />
              </Link>
            </div>
            <div className="related-news-grid">
              {related.map((item) => (
                <Link
                  href={`/news-insights/${item.slug}`}
                  key={item.slug}
                  className="related-news-card group"
                  data-reveal-line
                >
                  <div className="related-news-image">
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
