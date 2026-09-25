import type { Metadata } from "next"
import { notFound } from "next/navigation"
import SolutionDetailPage from "~/components/solution-detail-page"
import { getSolution, solutions } from "~/lib/solutions"

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const solution = getSolution(slug)
  if (!solution) return {}

  return {
    title: solution.title,
    description: solution.description,
  }
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params
  const solution = getSolution(slug)
  if (!solution) notFound()

  return <SolutionDetailPage solution={solution} />
}
