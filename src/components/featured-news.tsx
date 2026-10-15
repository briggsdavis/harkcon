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
    <div className="grid gap-8 md:grid-cols-2">
      {articles.map((article) => (
        <Link
          href={`/news-insights/${article.slug}`}
          className="group block pt-5"
          data-reveal-line
          key={article.slug}
        >
          <div className="relative aspect-[16/9] overflow-hidden [--image-wipe-color:#f4f3f0]">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              unoptimized
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="pt-5">
            <time
              dateTime={article.date}
              className="font-eyebrow text-eyebrow-label tracking-[0.14em] text-[#5f626b]"
            >
              {article.displayDate}
            </time>
            <h3 className="mt-3 max-w-xl font-header text-card-title">{article.title}</h3>
            <p className="mt-3 line-clamp-2 max-w-2xl text-base leading-relaxed text-[#5f626b]">
              {article.excerpt}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
