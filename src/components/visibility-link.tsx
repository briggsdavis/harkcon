"use client"
import NextLink from "next/link"
import type { ComponentProps } from "react"
import { visibilityPages, visibilityKeyForHref } from "~/lib/page-visibility"
import { usePageVisibility } from "~/lib/use-page-visibility"
export default function VisibilityLink(props: ComponentProps<typeof NextLink>) {
  const settings = usePageVisibility()
  const href = String(props.href)
  const key = visibilityKeyForHref(href)
  const page = visibilityPages.find((item) => item.key === key)
  if (page && !(settings?.[page.key] ?? page.visible))
    return (
      <span aria-disabled="true" className={props.className}>
        {props.children}
      </span>
    )
  return <NextLink {...props} />
}
