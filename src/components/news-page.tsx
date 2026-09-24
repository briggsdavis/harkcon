"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import { harkconInTheNews, newsArticles, type NewsCategory } from "~/lib/news"

type NewsFilter = "all" | NewsCategory | "coverage"

const newsFilters: { label: string; value: NewsFilter; colorName: string }[] = [
  { label: "All", value: "all", colorName: "All" },
  { label: "News", value: "News", colorName: "News" },
  { label: "Awards", value: "Awards", colorName: "Awards" },
  { label: "Insights", value: "Insights", colorName: "Insights" },
  { label: "Harkcon in the News", value: "coverage", colorName: "Coverage" },
]

export default function NewsPage() {
  const [filter, setFilter] = useState<NewsFilter>("all")
  const filteredArticles =
    filter === "all" || filter === "coverage"
      ? newsArticles
      : newsArticles.filter((article) => article.category === filter)

  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header initialSurface="light" />
      <div className="page-content">
        <section className="news-index" aria-labelledby="news-index-title">
          <div className="site-gutter">
            <p className="eyebrow mb-6 text-[#5f626b]">Harkcon updates</p>
            <h1 id="news-index-title">News &amp; Insights</h1>

            <div className="news-index-controls" data-reveal-line>
              <p className="news-filter-label">Filter</p>
              <div className="news-view-toggle" aria-label="Filter news by category">
                {newsFilters.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={filter === item.value ? "is-active" : ""}
                    aria-pressed={filter === item.value}
                    onClick={() => setFilter(item.value)}
                  >
                    <span
                      className="news-filter-dot"
                      data-category={item.colorName}
                      aria-hidden="true"
                    />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {filter !== "coverage" ? (
              <div className="publication-list">
                {filteredArticles.map((article) => (
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
                        <span data-category={article.category}>{article.category}</span>
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
