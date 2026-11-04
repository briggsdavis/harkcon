"use client"

import { notFound } from "next/navigation"
import type { ReactNode } from "react"
import { isPageVisible } from "~/lib/page-visibility"
import { usePageVisibility } from "~/lib/use-page-visibility"

export default function PublicVisibilityGuard({
  page,
  children,
}: {
  page: string
  children: ReactNode
}) {
  const settings = usePageVisibility()
  if (settings && !isPageVisible(page, settings)) notFound()
  return children
}
