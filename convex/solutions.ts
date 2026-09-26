import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireAdmin } from "./admin"

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    return (await ctx.db.query("solutionPages").collect()).toSorted((a, b) => a.order - b.order)
  },
})

export const add = mutation({
  args: { title: v.string(), slug: v.string() },
  handler: async (ctx, { title, slug }) => {
    await requireAdmin(ctx)
    const cleanSlug = slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    if (!title.trim() || !cleanSlug) throw new Error("Add a title and URL slug")
    const existing = await ctx.db
      .query("solutionPages")
      .withIndex("by_slug", (q) => q.eq("slug", cleanSlug))
      .unique()
    if (existing) throw new Error("That solution URL already exists")
    const pages = await ctx.db.query("solutionPages").collect()
    return await ctx.db.insert("solutionPages", {
      title: title.trim(),
      slug: cleanSlug,
      order: pages.length,
    })
  },
})

export const remove = mutation({
  args: { id: v.id("solutionPages") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx)
    await ctx.db.delete(id)
    return null
  },
})
