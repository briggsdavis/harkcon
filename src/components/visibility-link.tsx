"use client"
import NextLink from "next/link"
import type { ComponentProps } from "react"
import { visibilityPages } from "~/lib/page-visibility"
import { usePageVisibility } from "~/lib/use-page-visibility"
export default function VisibilityLink(props: ComponentProps<typeof NextLink>) {
  const settings = usePageVisibility()
  const href = String(props.href)
  const key = href.includes("kdharkins.com")
    ? "kevin"
    : href.startsWith("/oasis-plus") || href.includes("view=oasis-plus")
      ? "oasis"
      : href.startsWith("/news-insights")
        ? "news"
        : href.startsWith("/solutions")
          ? "solutions"
          : href.split(/[/?#]/)[1]
  const page = visibilityPages.find((item) => item.key === key)
  if (page && !(settings?.[page.key] ?? page.visible))
    return <span className={props.className}>{props.children}</span>
  return <NextLink {...props} />
}
