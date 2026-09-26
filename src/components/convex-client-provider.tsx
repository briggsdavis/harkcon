"use client"

import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react"
import { ConvexReactClient } from "convex/react"
import { useState, type ReactNode } from "react"
import { authClient } from "~/lib/auth-client"

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new ConvexReactClient(
        process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://neat-eel-640.convex.cloud",
      ),
  )

  return (
    <ConvexBetterAuthProvider client={client} authClient={authClient}>
      {children}
    </ConvexBetterAuthProvider>
  )
}
