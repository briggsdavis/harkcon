"use client"

import { useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import PublicationMeta from "~/components/publication-meta"
import { publicArticles } from "~/lib/news"
import { keepClosingWords } from "~/lib/typography"
import { api } from "../../convex/_generated/api"

export default function NewsPage() {
  const storedArticles = useQuery(api.content.listPublicArticles)
  const articles = publicArticles(storedArticles ?? [])

  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header initialSurface="light" />
      <div className="relative">
        <section className="pt-[clamp(13rem,20vw,19rem)] pb-28" aria-labelledby="news-index-title">
          <div className="site-gutter">
            <div className="mb-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <h1
                id="news-index-title"
                className="m-0 min-w-0 font-header text-display font-medium text-balance"
              >
                News &amp;&nbsp;Insights
              </h1>

              <a
                href="https://www.linkedin.com/company/harkcon-inc./"
                target="_blank"
                rel="noopener noreferrer"
                className="action-button shrink-0 self-end lg:mb-2"
              >
                Visit our latest on LinkedIn <Arrow diagonal />
              </a>
            </div>
            {storedArticles === undefined && (
              <p aria-live="polite" className="py-8 text-[#5f626b]">
                Loading news…
              </p>
            )}
            {storedArticles !== undefined && articles.length === 0 && (
              <p className="py-8 text-[#5f626b]">Visit us on LinkedIn for our latest updates.</p>
            )}
            <div>
              {articles.map((article) => (
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
                      sizes="(min-width: 900px) 32vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                  </div>
                  <div className="transition-transform delay-0 duration-500 ease-out group-hover:translate-x-2 group-focus-visible:translate-x-2">
                    <PublicationMeta
                      date={article.date}
                      displayDate={article.displayDate}
                      category={article.category}
                    />
                    <h2 className="relative mt-5 max-w-4xl font-header text-card-title font-medium text-balance">
                      {keepClosingWords(article.title)}
                    </h2>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-pretty text-[#5f626b]">
                      {keepClosingWords(article.excerpt)}
                    </p>
                  </div>
                  <span
                    className="control-fill hidden h-[72px] w-[72px] items-center justify-center justify-self-end bg-[#f4f3f0] transition-colors duration-500 md:flex"
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
          </div>
        </section>
        <SiteFooter />
      </div>
    </div>
  )
}
