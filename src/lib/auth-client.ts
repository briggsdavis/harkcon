import { convexClient, crossDomainClient } from "@convex-dev/better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_CONVEX_SITE_URL ?? "https://neat-eel-640.convex.site",
  plugins: [convexClient(), crossDomainClient()],
})
