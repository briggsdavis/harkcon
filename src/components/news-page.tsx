"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useState } from "react"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import { harkconInTheNews, newsArticles } from "~/lib/news"

export default function NewsPage() {
  const [view, setView] = useState<"news" | "coverage">("news")
  const showNews = useCallback(() => setView("news"), [])
  const showCoverage = useCallback(() => setView("coverage"), [])

  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header initialSurface="light" />
      <div className="page-content">
        <section className="news-index" aria-labelledby="news-index-title">
          <div className="site-gutter">
            <p className="eyebrow mb-6 text-[#5f626b]">Harkcon updates</p>
            <h1 id="news-index-title">News &amp; Insights</h1>

            <div className="news-index-controls" data-reveal-line>
              <div className="news-view-label">
                <span aria-hidden="true">☷</span>
                <p>Explore</p>
              </div>
              <div className="news-view-toggle" aria-label="Choose news view">
                <button
                  type="button"
                  className={view === "news" ? "is-active" : ""}
                  aria-pressed={view === "news"}
                  onClick={showNews}
                >
                  News
                </button>
                <button
                  type="button"
                  className={view === "coverage" ? "is-active" : ""}
                  aria-pressed={view === "coverage"}
                  onClick={showCoverage}
                >
                  Harkcon in the News
                </button>
              </div>
            </div>

            {view === "news" ? (
              <div className="publication-list">
                {newsArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/news-insights/${article.slug}`}
                    className="publication-row group"
                    data-reveal-line
                  >
                    <div className="publication-image">
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        fill
                        unoptimized
                        sizes="(min-width: 900px) 32vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="publication-copy">
                      <div className="publication-meta">
                        <time dateTime={article.date}>{article.displayDate}</time>
                        <span>{article.category}</span>
                      </div>
                      <h2>{article.title}</h2>
                      <p>{article.excerpt}</p>
                    </div>
                    <span className="publication-arrow" aria-hidden="true">
                      <Arrow diagonal />
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="coverage-list">
                {harkconInTheNews.map((headline, index) => (
                  <button type="button" className="coverage-row" key={headline} data-reveal-line>
                    <span className="coverage-number">{String(index + 1).padStart(2, "0")}</span>
                    <span>{headline}</span>
                    <Arrow diagonal />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
        <SiteFooter />
      </div>
    </div>
  )
}
