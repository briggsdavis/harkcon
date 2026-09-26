import { createClient, type GenericCtx } from "@convex-dev/better-auth"
import { convex, crossDomain } from "@convex-dev/better-auth/plugins"
import { APIError } from "better-auth/api"
import { betterAuth } from "better-auth/minimal"
import { components } from "./_generated/api"
import type { DataModel } from "./_generated/dataModel"
import { query } from "./_generated/server"
import authConfig from "./auth.config"

export function allowedAdminEmails() {
  return new Set(
    (process.env.ADMIN_ALLOWED_EMAILS ?? "")
      .split(/[\n,;]/)
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  )
}

export function trustedAdminOrigins() {
  return [
    process.env.SITE_URL ?? "https://www.harkcon.com",
    "https://*.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
  ]
}

export const authComponent = createClient<DataModel>(components.betterAuth)

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  const siteUrl = process.env.SITE_URL ?? "http://localhost:3000"

  return betterAuth({
    baseURL: process.env.CONVEX_SITE_URL,
    trustedOrigins: trustedAdminOrigins(),
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 10,
    },
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            if (!allowedAdminEmails().has(user.email.trim().toLowerCase())) {
              throw new APIError("FORBIDDEN", {
                message: "This email has not been approved for Harkcon admin access.",
              })
            }
            return { data: user }
          },
        },
      },
    },
    plugins: [crossDomain({ siteUrl }), convex({ authConfig })],
  })
}

export const currentAdmin = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user?.email || !allowedAdminEmails().has(user.email.toLowerCase())) return null
    return { name: user.name, email: user.email }
  },
})
