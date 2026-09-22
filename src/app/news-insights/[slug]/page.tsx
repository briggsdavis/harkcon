import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ArticlePage from "~/components/article-page"
import { newsArticles } from "~/lib/news"

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/news-insights/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const article = newsArticles.find((item) => item.slug === slug)
  if (!article) return {}
  return { title: article.title, description: article.excerpt }
}

export default async function NewsArticle({ params }: PageProps<"/news-insights/[slug]">) {
  const { slug } = await params
  const articleIndex = newsArticles.findIndex((item) => item.slug === slug)
  if (articleIndex === -1) notFound()

  const article = newsArticles[articleIndex]
  const related = Array.from({ length: 3 }, (_, offset) => {
    const index = (articleIndex + offset + 1) % newsArticles.length
    return newsArticles[index]
  })

  return <ArticlePage article={article} related={related} />
}
