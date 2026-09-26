"use client"

import { useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"
import { newsArticles } from "~/lib/news"
import { api } from "../../convex/_generated/api"

export default function FeaturedNews() {
  const stored = useQuery(api.content.listPublicArticles)
  const selected = stored?.filter((article) => article.featured).slice(0, 2)
  const articles = selected?.length ? selected : newsArticles.slice(0, 2)

  return (
    <div className="news-grid">
      {articles.map((article) => (
        <Link
          href={`/news-insights/${article.slug}`}
          className="news-card group"
          data-reveal-line
          key={article.slug}
        >
          <div className="news-image-wrap">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              unoptimized
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="news-card-body">
            <time dateTime={article.date}>{article.displayDate}</time>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
