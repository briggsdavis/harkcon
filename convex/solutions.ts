import { ConvexError, v } from "convex/values"
import { getSolution } from "../src/lib/solutions"
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
  args: { title: v.string(), slug: v.optional(v.string()) },
  handler: async (ctx, { title, slug }) => {
    await requireAdmin(ctx)
    let cleanSlug = (slug ?? title)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    if (!title.trim() || !cleanSlug) throw new ConvexError("Add a title and URL slug")
    const existing = await ctx.db
      .query("solutionPages")
      .withIndex("by_slug", (q) => q.eq("slug", cleanSlug))
      .unique()
    if (existing && slug !== undefined) throw new ConvexError("That solution URL already exists")
    if (existing) {
      const base = cleanSlug
      let suffix = 2
      while (
        await ctx.db
          .query("solutionPages")
          .withIndex("by_slug", (q) => q.eq("slug", cleanSlug))
          .unique()
      ) {
        cleanSlug = `${base}-${suffix++}`
      }
    }
    const pages = await ctx.db.query("solutionPages").collect()
    return await ctx.db.insert("solutionPages", {
      title: title.trim(),
      slug: cleanSlug,
      order: pages.reduce((maximum, page) => Math.max(maximum, page.order), -1) + 1,
      archived: true,
      featured: false,
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
    (await ctx.db.query("solutionPages").collect())
      .filter((page) => !page.archived)
      .toSorted((a, b) => a.order - b.order),
})
export const save = mutation({
  args: {
    id: v.optional(v.id("solutionPages")),
    title: v.string(),
    slug: v.string(),
    content: solutionContent,
    expectedUpdatedAt: v.optional(v.number()),
  },
  handler: async (ctx, { id, title, slug, content, expectedUpdatedAt }) => {
    await requireAdmin(ctx)
    const cleanSlug = slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    if (!title.trim() || !cleanSlug) throw new ConvexError("Add a title and URL slug")
    const duplicate = await ctx.db
      .query("solutionPages")
      .withIndex("by_slug", (q) => q.eq("slug", cleanSlug))
      .unique()
    if (duplicate && duplicate._id !== id) throw new ConvexError("That solution URL already exists")
    if (content.homepageDescription !== undefined && !content.homepageDescription.trim())
      throw new ConvexError("Add a homepage description")
    if (!content.shortTitle.trim() || !content.description.trim())
      throw new ConvexError("Add a heading and description")
    if (!/^(\/(?!\/)|https?:\/\/|mailto:|tel:|#)/i.test(content.ctaHref))
      throw new ConvexError("Use a relative path, web, email, or telephone link")
    for (const src of [content.heroImage, content.wideImage, content.detailImage]) {
      if (!/^(\/(?!\/)|https?:\/\/)/i.test(src))
        throw new ConvexError("Choose valid images before saving")
    }
    const current = id ? await ctx.db.get(id) : null
    if (id && !current) throw new ConvexError("This page no longer exists")
    if (current && (current.updatedAt ?? 0) !== (expectedUpdatedAt ?? 0))
      throw new ConvexError("This page changed in another window. Reload before saving.")
    const updatedAt = Math.max(Date.now(), (current?.updatedAt ?? 0) + 1)
    const fields = { title: title.trim(), slug: cleanSlug, content, updatedAt }
    if (id) {
      await ctx.db.patch(id, fields)
      return { id, updatedAt }
    }
    const pages = await ctx.db.query("solutionPages").collect()
    const newId = await ctx.db.insert("solutionPages", {
      ...fields,
      order: pages.reduce((maximum, page) => Math.max(maximum, page.order), -1) + 1,
      archived: true,
      featured: false,
    })
    return { id: newId, updatedAt }
  },
})

export const setArchived = mutation({
  args: { id: v.id("solutionPages"), archived: v.boolean() },
  handler: async (ctx, { id, archived }) => {
    await requireAdmin(ctx)
    const page = await ctx.db.get(id)
    if (!page) throw new ConvexError("Page no longer exists")
    if (!archived && !page.content && !getSolution(page.slug))
      throw new ConvexError("Save the page content before publishing")
    await ctx.db.patch(id, { archived })
  },
})

export const setFeatured = mutation({
  args: { id: v.id("solutionPages"), featured: v.boolean() },
  handler: async (ctx, { id, featured }) => {
    await requireAdmin(ctx)
    const page = await ctx.db.get(id)
    if (!page) throw new ConvexError("This solution no longer exists")
    if (featured && page.featured === false) {
      const pages = await ctx.db.query("solutionPages").collect()
      if (pages.filter((item) => item.featured !== false).length >= 7)
        throw new ConvexError(
          "You can feature up to seven solutions. Unfeature another solution first.",
        )
    }
    await ctx.db.patch(id, { featured })
  },
})
