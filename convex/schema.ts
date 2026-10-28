import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
import { openingValidator } from "./careerValidators"

export default defineSchema({
  homeSettings: defineTable({ hero: v.union(v.literal("capitol"), v.literal("social-work")) }),
  careerOpenings: defineTable({ openings: v.array(openingValidator), updatedAt: v.number() }),
  pageVisibility: defineTable({ key: v.string(), visible: v.boolean() }).index("by_key", ["key"]),
  articles: defineTable({
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
    featured: v.boolean(),
    order: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),
  pressMentions: defineTable({
    headline: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),
  newsTopics: defineTable({
    name: v.string(),
    slug: v.string(),
    order: v.number(),
  }).index("by_slug", ["slug"]),
  contacts: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    organization: v.string(),
    email: v.string(),
    phone: v.string(),
    interests: v.array(v.string()),
    message: v.string(),
    referral: v.string(),
    preferredContact: v.string(),
    isRead: v.boolean(),
    submittedAt: v.number(),
  })
    .index("by_submittedAt", ["submittedAt"])
    .index("by_isRead_and_submittedAt", ["isRead", "submittedAt"]),
  analyticsEvents: defineTable({
    path: v.string(),
    visitorId: v.string(),
    sessionId: v.string(),
    source: v.string(),
    referrer: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
  solutionPages: defineTable({
    title: v.string(),
    slug: v.string(),
    order: v.number(),
  }).index("by_slug", ["slug"]),
})
