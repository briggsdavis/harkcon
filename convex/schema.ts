import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  articles: defineTable({
    slug: v.string(),
    title: v.string(),
    date: v.string(),
    displayDate: v.string(),
    category: v.string(),
    image: v.string(),
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
