"use client"

import { useQuery } from "convex/react"
import Link from "next/link"
import ArticlePage from "~/components/article-page"
import { publicArticles, newsArticles, type NewsArticle } from "~/lib/news"
import { api } from "../../convex/_generated/api"

const loadingClassName =
  "flex min-h-[70dvh] flex-col items-center justify-center gap-[18px] p-10 text-center"

export default function ArticleLoader({ slug }: { slug: string }) {
  const storedArticle = useQuery(api.content.getPublicArticle, { slug })
  const storedArticles = useQuery(api.content.listPublicArticles)
  const fallbackIndex = newsArticles.findIndex((item) => item.slug === slug)
  const fallback = fallbackIndex >= 0 ? newsArticles[fallbackIndex] : null
  const article = ((storedArticle && publicArticles([storedArticle])[0]) ||
    fallback) as NewsArticle | null
  const all = publicArticles(
    storedArticles?.length ? storedArticles : newsArticles,
  ) as NewsArticle[]

  if (storedArticle === undefined && !fallback) {
    return <div className={loadingClassName}>Loading article…</div>
  }
  if (!article) {
    return (
      <div className={loadingClassName}>
        <h1 className="text-[40px] text-balance">Article not&nbsp;found</h1>
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
