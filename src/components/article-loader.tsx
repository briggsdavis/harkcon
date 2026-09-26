"use client"

import { useQuery } from "convex/react"
import Link from "next/link"
import ArticlePage from "~/components/article-page"
import { newsArticles, type NewsArticle } from "~/lib/news"
import { api } from "../../convex/_generated/api"

export default function ArticleLoader({ slug }: { slug: string }) {
  const storedArticle = useQuery(api.content.getPublicArticle, { slug })
  const storedArticles = useQuery(api.content.listPublicArticles)
  const fallbackIndex = newsArticles.findIndex((item) => item.slug === slug)
  const fallback = fallbackIndex >= 0 ? newsArticles[fallbackIndex] : null
  const article = (storedArticle ?? fallback) as NewsArticle | null
  const all = (storedArticles?.length ? storedArticles : newsArticles) as NewsArticle[]

  if (storedArticle === undefined && !fallback) {
    return <div className="article-loading">Loading article…</div>
  }
  if (!article) {
    return (
      <div className="article-loading">
        <h1>Article not found</h1>
        <Link href="/news-insights">Return to News &amp; Insights</Link>
      </div>
    )
  }
  const index = all.findIndex((item) => item.slug === article.slug)
  const related = Array.from({ length: Math.min(3, Math.max(0, all.length - 1)) }, (_, offset) => {
    const next = (index + offset + 1) % all.length
    return all[next]
  }).filter((item) => item.slug !== article.slug)

  return <ArticlePage article={article} related={related} />
}
