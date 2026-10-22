import { v } from "convex/values"
import { fetchCareerOpenings } from "../src/lib/careers-source"
import { internal } from "./_generated/api"
import { internalAction, internalMutation, query } from "./_generated/server"
import { openingValidator } from "./careerValidators"

export const getOpenings = query({
  args: {},
  handler: async (ctx) => {
    const snapshot = await ctx.db.query("careerOpenings").unique()
    return snapshot ? { openings: snapshot.openings, updatedAt: snapshot.updatedAt } : null
  },
})

export const saveOpenings = internalMutation({
  args: { openings: v.array(openingValidator) },
  handler: async (ctx, { openings }) => {
    const snapshot = await ctx.db.query("careerOpenings").unique()
    const value = { openings, updatedAt: Date.now() }
    if (snapshot) await ctx.db.replace("careerOpenings", snapshot._id, value)
    else await ctx.db.insert("careerOpenings", value)
  },
})

export const refresh = internalAction({
  args: {},
  handler: async (ctx) => {
    // Only replace the snapshot after every ADP page has been validated.
    const openings = await fetchCareerOpenings()
    await ctx.runMutation(internal.careers.saveOpenings, { openings })
  },
})
