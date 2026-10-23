"use client"

import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react"
import type { ConvexReactClient } from "convex/react"
import type { ReactNode } from "react"
import { authClient } from "~/lib/auth-client"

export default function AdminAuthProvider({
  client,
  children,
}: {
  client: ConvexReactClient
  children: ReactNode
}) {
  return (
    <ConvexBetterAuthProvider client={client} authClient={authClient}>
      {children}
    </ConvexBetterAuthProvider>
  )
}
