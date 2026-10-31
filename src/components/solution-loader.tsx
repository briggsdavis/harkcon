"use client"
import { useQuery } from "convex/react"
import { notFound } from "next/navigation"
import { getSolution, solutions, type Solution } from "~/lib/solutions"
import { api } from "../../convex/_generated/api"
import SolutionDetailPage from "./solution-detail-page"
export default function SolutionLoader({ slug }: { slug: string }) {
  const pages = useQuery(api.solutions.listPublic)
  if (pages === undefined)
    return <output className="grid min-h-screen place-items-center">Loading solution…</output>
  const page = pages.find((p) => p.slug === slug)
  if (!page) notFound()
  const base = getSolution(slug) || solutions[0]
  const solution: Solution = { ...base, ...page.content, title: page.title, slug: page.slug }
  return <SolutionDetailPage solution={solution} />
}
