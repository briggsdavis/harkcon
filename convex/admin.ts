import type { QueryCtx, MutationCtx } from "./_generated/server"
import { allowedAdminEmails } from "./auth"

export async function requireAdmin(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity()
  const email = identity?.email?.trim().toLowerCase()
  if (!email || !allowedAdminEmails().has(email)) throw new Error("Admin access required")
  return identity
}
