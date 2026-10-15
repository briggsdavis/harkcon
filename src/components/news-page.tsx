"use client"

import { useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import PublicationMeta, { categoryColor } from "~/components/publication-meta"
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
      <div className="relative">
        <section className="pt-[clamp(13rem,20vw,19rem)] pb-28" aria-labelledby="news-index-title">
          <div className="site-gutter">
            <h1 id="news-index-title" className="font-header text-display font-medium">
              News &amp; Insights
            </h1>

            <div
              className="mt-10 flex flex-col justify-between gap-6 py-7 md:flex-row md:items-center"
              data-reveal-line
            >
              <p className="font-eyebrow text-eyebrow-label font-semibold tracking-[0.12em] uppercase">
                Filter
              </p>
              <div
                className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end"
                aria-label="Filter news by category"
              >
                {newsFilters.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`relative flex items-center gap-2 py-2 font-eyebrow text-eyebrow-label font-semibold tracking-[0.08em] uppercase transition-colors duration-300 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:bg-[#0d132d] after:transition-transform after:duration-500 hover:text-[#0d132d] ${filter === item.value ? "text-[#0d132d] after:scale-x-100" : "text-[#5f626b] after:scale-x-0"}`}
                    aria-pressed={filter === item.value}
                    onClick={
                      // oxlint-disable-next-line react-perf/jsx-no-new-function-as-prop -- Native button; no memoized child receives this callback.
                      () => setFilter(item.value)
                    }
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: categoryColor(item.colorName) }}
                      aria-hidden="true"
                    />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {filter !== "coverage" ? (
              <div>
                {filteredArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/news-insights/${article.slug}`}
                    className="group grid items-center gap-7 py-8 md:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.5fr)_72px] lg:gap-10 lg:py-10"
                    data-reveal-line
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        fill
                        unoptimized
                        sizes="(min-width: 900px) 32vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="transition-transform duration-500 group-hover:translate-x-2 group-focus-visible:translate-x-2">
                      <PublicationMeta
                        date={article.date}
                        displayDate={article.displayDate}
                        category={article.category}
                      />
                      <h2 className="mt-5 max-w-4xl font-header text-card-title font-medium">
                        {article.title}
                      </h2>
                      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f626b]">
                        {article.excerpt}
                      </p>
                    </div>
                    <span
                      className="hidden h-[72px] w-[72px] items-center justify-center justify-self-end bg-[#f4f3f0] transition-colors duration-500 group-hover:bg-[#0d132d] group-hover:text-white md:flex"
                      aria-hidden="true"
                    >
                      <Arrow
                        diagonal
                        className="transition-transform duration-500 ease-smooth group-hover:rotate-45 group-focus-visible:rotate-45"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="pt-5">
                {mentions.map((headline, index) => (
                  <button
                    type="button"
                    className="group grid w-full grid-cols-[48px_1fr_24px] items-center gap-5 py-7 text-left font-header text-card-title transition-colors duration-500 hover:text-[#5f626b] md:grid-cols-[72px_1fr_28px] md:py-9"
                    key={headline}
                    data-reveal-line
                  >
                    <span className="font-eyebrow text-eyebrow-label tracking-[0.14em] text-[#5f626b]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{headline}</span>
                    <Arrow
                      diagonal
                      className="transition-transform duration-500 group-hover:rotate-45"
                    />
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
