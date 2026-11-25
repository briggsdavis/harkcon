import { MINUTE, RateLimiter } from "@convex-dev/rate-limiter"
import { v } from "convex/values"
import type { CareerOpening } from "../src/lib/careers"
import { fetchCareerOpenings } from "../src/lib/careers-source"
import { components, internal } from "./_generated/api"
import {
  action,
  internalAction,
  internalMutation,
  query,
  type ActionCtx,
} from "./_generated/server"
import { openingValidator } from "./careerValidators"

const rateLimiter = new RateLimiter(components.rateLimiter, {
  manualCareerRefresh: { kind: "token bucket", rate: 1, period: MINUTE },
})

export const getOpenings = query({
  args: {},
  handler: async (ctx) => {
    const snapshot = await ctx.db.query("careerOpenings").unique()
    return snapshot ? { openings: snapshot.openings, updatedAt: snapshot.updatedAt } : null
  },
})

export const saveOpenings = internalMutation({
  args: { openings: v.array(openingValidator), startedAt: v.number() },
  handler: async (ctx, { openings, startedAt }) => {
    const snapshot = await ctx.db.query("careerOpenings").unique()
    // A slow refresh can finish after a newer one has already saved its results.
    if (snapshot && (snapshot.refreshStartedAt ?? snapshot.updatedAt) >= startedAt)
      return snapshot.openings
    const value = { openings, updatedAt: Date.now(), refreshStartedAt: startedAt }
    if (snapshot) await ctx.db.replace("careerOpenings", snapshot._id, value)
    else await ctx.db.insert("careerOpenings", value)
    return openings
  },
})

async function refreshOpenings(ctx: ActionCtx): Promise<CareerOpening[]> {
  const startedAt = Date.now()
  // Only replace the snapshot after every ADP page has been validated.
  const openings = await fetchCareerOpenings()
  return await ctx.runMutation(internal.careers.saveOpenings, { openings, startedAt })
}

export const refresh = internalAction({
  args: {},
  handler: async (ctx) => {
    await refreshOpenings(ctx)
  },
})

export const refreshFromAdp = action({
  args: {},
  returns: v.union(v.array(openingValidator), v.null()),
  handler: async (ctx): Promise<CareerOpening[] | null> => {
    const limit = await rateLimiter.limit(ctx, "manualCareerRefresh")
    if (!limit.ok) return null
    return await refreshOpenings(ctx)
  },
})
