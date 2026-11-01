"use client"
import { useQueries } from "convex/react"
import { api } from "../../convex/_generated/api"
import { getSolution, solutions, type Solution } from "./solutions"
const queries = { pages: { query: api.solutions.listPublic, args: {} } }
export function useSolutions(): (Solution & { id: string })[] {
  const { pages } = useQueries(queries)
  if (pages === undefined || pages instanceof Error) return []
  return (pages as import("convex/server").FunctionReturnType<typeof api.solutions.listPublic>).map(
    (page) => ({
      ...(getSolution(page.slug) || solutions[0]),
      ...page.content,
      id: page._id,
      title: page.title,
      slug: page.slug,
    }),
  )
}
