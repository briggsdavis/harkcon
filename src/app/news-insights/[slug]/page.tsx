import type { Metadata } from "next"
import ArticleLoader from "~/components/article-loader"
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
  return <ArticleLoader slug={slug} />
}
