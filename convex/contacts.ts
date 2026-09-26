import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireAdmin } from "./admin"

export const submit = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    organization: v.string(),
    email: v.string(),
    phone: v.string(),
    interests: v.array(v.string()),
    message: v.string(),
    referral: v.string(),
    preferredContact: v.string(),
  },
  handler: async (ctx, args) =>
    await ctx.db.insert("contacts", {
      ...args,
      isRead: false,
      submittedAt: Date.now(),
    }),
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    return await ctx.db.query("contacts").withIndex("by_submittedAt").order("desc").collect()
  },
})

export const setRead = mutation({
  args: { id: v.id("contacts"), isRead: v.boolean() },
  handler: async (ctx, { id, isRead }) => {
    await requireAdmin(ctx)
    await ctx.db.patch(id, { isRead })
    return null
  },
})

export const remove = mutation({
  args: { id: v.id("contacts") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx)
    await ctx.db.delete(id)
    return null
  },
})
