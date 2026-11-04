import { fetchQuery } from "convex/nextjs"
import { notFound } from "next/navigation"
import { connection } from "next/server"
import type { ReactNode } from "react"
import { isPageVisible } from "~/lib/page-visibility"
import { api } from "../../convex/_generated/api"
import PublicVisibilityGuard from "./public-visibility-guard"

export default async function VisiblePublicPage({
  page,
  children,
}: {
  page: string
  children: ReactNode
}) {
  await connection()
  const settings = await fetchQuery(
    api.content.getPageVisibility,
    {},
    {
      url: process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://neat-eel-640.convex.cloud",
    },
  )
  if (!isPageVisible(page, settings)) notFound()
  return <PublicVisibilityGuard page={page}>{children}</PublicVisibilityGuard>
}
