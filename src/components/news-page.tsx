"use client"

import { useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import { harkconInTheNews, newsArticles, type NewsCategory } from "~/lib/news"
import { api } from "../../convex/_generated/api"

type NewsFilter = "all" | NewsCategory | "coverage"

export default function NewsPage() {
  const [filter, setFilter] = useState<NewsFilter>("all")
  const storedArticles = useQuery(api.content.listPublicArticles)
  const storedMentions = useQuery(api.content.listPressMentions)
  const storedTopics = useQuery(api.content.listTopics)
  const articles = storedArticles?.length ? storedArticles : newsArticles
  const mentions = storedMentions?.length
    ? storedMentions.map((item) => item.headline)
    : harkconInTheNews
  const topics = storedTopics?.length
    ? storedTopics.map((topic) => topic.name)
    : ["News", "Awards", "Insights"]
  const newsFilters: { label: string; value: NewsFilter; colorName: string }[] = [
    { label: "All", value: "all", colorName: "All" },
    ...topics.map((topic) => ({ label: topic, value: topic, colorName: topic })),
    { label: "Harkcon in the News", value: "coverage", colorName: "Coverage" },
  ]
  const filteredArticles =
    filter === "all" || filter === "coverage"
      ? articles
      : articles.filter((article) => article.category === filter)

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
                    onClick={
                      // oxlint-disable-next-line react-perf/jsx-no-new-function-as-prop -- Native button; no memoized child receives this callback.
                      () => setFilter(item.value)
                    }
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
                {mentions.map((headline, index) => (
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
