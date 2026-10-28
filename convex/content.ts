import { v } from "convex/values"
import { visibilityPages } from "../src/lib/page-visibility"
import { mutation, query } from "./_generated/server"
import { requireAdmin } from "./admin"

const articleFields = {
  slug: v.string(),
  title: v.string(),
  date: v.string(),
  displayDate: v.string(),
  category: v.string(),
  image: v.string(),
  imageStorageId: v.optional(v.id("_storage")),
  imageAlt: v.string(),
  excerpt: v.string(),
  body: v.array(v.string()),
}

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    return await ctx.storage.generateUploadUrl()
  },
})

export const resolveImageUpload = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    await requireAdmin(ctx)
    const url = await ctx.storage.getUrl(storageId)
    if (!url) throw new Error("The image upload could not be opened")
    return url
  },
})

export const listPublicArticles = query({
  args: {},
  handler: async (ctx) =>
    (await ctx.db.query("articles").withIndex("by_order").order("asc").collect()).toSorted(
      (a, b) => a.order - b.order,
    ),
})

export const getPublicArticle = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) =>
    await ctx.db
      .query("articles")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique(),
})

export const listPressMentions = query({
  args: {},
  handler: async (ctx) =>
    await ctx.db.query("pressMentions").withIndex("by_order").order("asc").collect(),
})

export const listTopics = query({
  args: {},
  handler: async (ctx) =>
    (await ctx.db.query("newsTopics").collect()).toSorted((a, b) => a.order - b.order),
})

export const listAdminContent = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    const [articles, mentions, topics] = await Promise.all([
      ctx.db.query("articles").collect(),
      ctx.db.query("pressMentions").collect(),
      ctx.db.query("newsTopics").collect(),
    ])
    return {
      articles: articles.toSorted((a, b) => a.order - b.order),
      mentions: mentions.toSorted((a, b) => a.order - b.order),
      topics: topics.toSorted((a, b) => a.order - b.order),
    }
  },
})

export const saveArticle = mutation({
  args: { id: v.optional(v.id("articles")), ...articleFields },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const duplicate = await ctx.db
      .query("articles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique()
    if (duplicate && duplicate._id !== args.id) throw new Error("That URL slug is already in use")
    const { id, ...fields } = args
    if (id) {
      const existing = await ctx.db.get(id)
      await ctx.db.patch(id, fields)
      if (existing?.imageStorageId && existing.imageStorageId !== fields.imageStorageId) {
        await ctx.storage.delete(existing.imageStorageId)
      }
      return id
    }
    const articles = await ctx.db.query("articles").collect()
    return await ctx.db.insert("articles", {
      ...fields,
      featured: false,
      order: articles.length,
    })
  },
})

export const removeArticle = mutation({
  args: { id: v.id("articles") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx)
    const article = await ctx.db.get(id)
    if (article?.imageStorageId) await ctx.storage.delete(article.imageStorageId)
    await ctx.db.delete(id)
    return null
  },
})

export const reorderArticle = mutation({
  args: { id: v.id("articles"), direction: v.union(v.literal("up"), v.literal("down")) },
  handler: async (ctx, { id, direction }) => {
    await requireAdmin(ctx)
    const articles = (await ctx.db.query("articles").collect()).toSorted(
      (a, b) => a.order - b.order,
    )
    const index = articles.findIndex((article) => article._id === id)
    const swapIndex = direction === "up" ? index - 1 : index + 1
    if (index < 0 || swapIndex < 0 || swapIndex >= articles.length) return null
    await ctx.db.patch(articles[index]._id, { order: articles[swapIndex].order })
    await ctx.db.patch(articles[swapIndex]._id, { order: articles[index].order })
    return null
  },
})

export const setFeatured = mutation({
  args: { id: v.id("articles"), featured: v.boolean() },
  handler: async (ctx, { id, featured }) => {
    await requireAdmin(ctx)
    if (featured) {
      const featuredArticles = (await ctx.db.query("articles").collect()).filter(
        (article) => article.featured && article._id !== id,
      )
      if (featuredArticles.length >= 2) throw new Error("Only two articles can be featured")
    }
    await ctx.db.patch(id, { featured })
    return null
  },
})

export const saveMention = mutation({
  args: { id: v.optional(v.id("pressMentions")), headline: v.string() },
  handler: async (ctx, { id, headline }) => {
    await requireAdmin(ctx)
    if (id) {
      await ctx.db.patch(id, { headline })
      return id
    }
    const mentions = await ctx.db.query("pressMentions").collect()
    return await ctx.db.insert("pressMentions", { headline, order: mentions.length })
  },
})

export const removeMention = mutation({
  args: { id: v.id("pressMentions") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx)
    await ctx.db.delete(id)
    return null
  },
})

export const addTopic = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    await requireAdmin(ctx)
    const slug = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    if (!slug) throw new Error("Enter a topic name")
    const existing = await ctx.db
      .query("newsTopics")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique()
    if (existing) throw new Error("That topic already exists")
    const topics = await ctx.db.query("newsTopics").collect()
    return await ctx.db.insert("newsTopics", { name: name.trim(), slug, order: topics.length })
  },
})

export const getPageVisibility = query({
  args: {},
  handler: async (ctx) =>
    Object.fromEntries(
      (await ctx.db.query("pageVisibility").collect()).map((row) => [row.key, row.visible]),
    ),
})

export const setPageVisibility = mutation({
  args: { key: v.string(), visible: v.boolean() },
  handler: async (ctx, { key, visible }) => {
    await requireAdmin(ctx)
    if (!visibilityPages.some((page) => page.key === key)) throw new Error("Unknown page")
    const existing = await ctx.db
      .query("pageVisibility")
      .withIndex("by_key", (q) => q.eq("key", key))
      .unique()
    if (existing) await ctx.db.patch(existing._id, { visible })
    else await ctx.db.insert("pageVisibility", { key, visible })
  },
})

export const getHomeHero = query({
  args: {},
  handler: async (ctx) => (await ctx.db.query("homeSettings").first())?.hero ?? "capitol",
})

export const setHomeHero = mutation({
  args: { hero: v.string() },
  handler: async (ctx, { hero }) => {
    await requireAdmin(ctx)
    if (hero !== "capitol" && hero !== "social-work") {
      const image = (await ctx.db.query("heroImages").collect()).find((image) => image._id === hero)
      if (!image) throw new Error("Unknown hero image")
    }
    const settings = await ctx.db.query("homeSettings").first()
    if (settings) await ctx.db.patch(settings._id, { hero })
    else await ctx.db.insert("homeSettings", { hero })
  },
})

export const listHeroImages = query({
  args: {},
  handler: async (ctx) => {
    const images = await ctx.db.query("heroImages").collect()
    return await Promise.all(
      images.map(async (image) => ({
        id: image._id,
        name: image.name,
        url: await ctx.storage.getUrl(image.storageId),
      })),
    )
  },
})

export const addHeroImage = mutation({
  args: { storageId: v.id("_storage"), name: v.string() },
  handler: async (ctx, { storageId, name }) => {
    await requireAdmin(ctx)
    const file = await ctx.db.system.get(storageId)
    if (
      !file ||
      !["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.contentType ?? "") ||
      file.size > 10 * 1024 * 1024
    ) {
      throw new Error("Choose a JPG, PNG, WebP, or AVIF image smaller than 10 MB.")
    }
    const existing = (await ctx.db.query("heroImages").collect()).find(
      (image) => image.storageId === storageId,
    )
    if (existing) return existing._id
    return await ctx.db.insert("heroImages", {
      storageId,
      name: name.trim().slice(0, 120) || "Uploaded hero",
    })
  },
})
