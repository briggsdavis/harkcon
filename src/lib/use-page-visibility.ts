"use client"

import { useQueries } from "convex/react"
import { api } from "../../convex/_generated/api"

// Public pages can render their defaults while a backend update is being rolled out.
const queries = { visibility: { query: api.content.getPageVisibility, args: {} } }
export function usePageVisibility(): Record<string, boolean> | undefined {
  const { visibility } = useQueries(queries)
  return visibility instanceof Error ? undefined : visibility
}
