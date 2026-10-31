import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireAdmin } from "./admin"
import { solutionContent } from "./solutionFields"

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

export const listPublic = query({
  args: {},
  handler: async (ctx) =>
    (await ctx.db.query("solutionPages").collect()).toSorted((a, b) => a.order - b.order),
})
export const save = mutation({
  args: {
    id: v.optional(v.id("solutionPages")),
    title: v.string(),
    slug: v.string(),
    content: solutionContent,
  },
  handler: async (ctx, { id, title, slug, content }) => {
    await requireAdmin(ctx)
    const cleanSlug = slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    if (!title.trim() || !cleanSlug) throw new Error("Add a title and URL slug")
    const duplicate = await ctx.db
      .query("solutionPages")
      .withIndex("by_slug", (q) => q.eq("slug", cleanSlug))
      .unique()
    if (duplicate && duplicate._id !== id) throw new Error("That solution URL already exists")
    if (!content.ctaHref.startsWith("/") && !/^https?:\/\//.test(content.ctaHref))
      throw new Error("Use a relative path or an http(s) URL for the call to action")
    const fields = { title: title.trim(), slug: cleanSlug, content }
    if (id) {
      await ctx.db.patch(id, fields)
      return id
    }
    const pages = await ctx.db.query("solutionPages").collect()
    return await ctx.db.insert("solutionPages", { ...fields, order: pages.length })
  },
})
