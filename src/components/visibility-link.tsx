"use client"
import { useQueries } from "convex/react"
import NextLink from "next/link"
import type { ComponentProps } from "react"
import { visibilityPages, visibilityKeyForHref } from "~/lib/page-visibility"
import { usePageVisibility } from "~/lib/use-page-visibility"
import { api } from "../../convex/_generated/api"
import type { Doc } from "../../convex/_generated/dataModel"
import { useEditingMode } from "./editing-mode"
const overviewQuery = { overview: { query: api.pages.get, args: { key: "solutions" } } }
const noQueries = {}
export default function VisibilityLink(props: ComponentProps<typeof NextLink>) {
  const editing = useEditingMode()
  const settings = usePageVisibility()
  const href = String(props.href)
  const key = visibilityKeyForHref(href)
  const { overview: result } = useQueries(key === "solutions" ? overviewQuery : noQueries)
  const overview =
    result instanceof Error ? null : (result as Doc<"editablePages"> | null | undefined)
  const page = visibilityPages.find((item) => item.key === key)
  if (editing) return <NextLink {...props} />
  if (key === "solutions" && overview?.archived) return null
  if (key === "solutions" || key.startsWith("solution:")) return <NextLink {...props} />
  if (page && (settings === undefined || !(settings[page.key] ?? page.visible))) return null
  return <NextLink {...props} />
}
