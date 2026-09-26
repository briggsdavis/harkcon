import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireAdmin } from "./admin"

export const trackPageView = mutation({
  args: {
    path: v.string(),
    visitorId: v.string(),
    sessionId: v.string(),
    source: v.string(),
    referrer: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.path.startsWith("/admin")) return null
    return await ctx.db.insert("analyticsEvents", {
      path: args.path.slice(0, 240),
      visitorId: args.visitorId.slice(0, 100),
      sessionId: args.sessionId.slice(0, 100),
      source: args.source.slice(0, 120),
      referrer: args.referrer.slice(0, 500),
      createdAt: Date.now(),
    })
  },
})

const dayKey = (timestamp: number) => new Date(timestamp).toISOString().slice(0, 10)

export const dashboard = query({
  args: { days: v.union(v.literal(30), v.literal(90), v.literal(180)) },
  handler: async (ctx, { days }) => {
    await requireAdmin(ctx)
    const now = Date.now()
    const periodMs = days * 86_400_000
    const start = now - periodMs
    const previousStart = start - periodMs
    const events = await ctx.db
      .query("analyticsEvents")
      .withIndex("by_createdAt", (q) => q.gte("createdAt", previousStart))
      .collect()
    const contacts = await ctx.db
      .query("contacts")
      .withIndex("by_submittedAt", (q) => q.gte("submittedAt", previousStart))
      .collect()
    const current = events.filter((event) => event.createdAt >= start)
    const previous = events.filter((event) => event.createdAt < start)
    const currentContacts = contacts.filter((contact) => contact.submittedAt >= start)
    const previousContacts = contacts.filter((contact) => contact.submittedAt < start)
    const unique = (items: typeof events) => new Set(items.map((item) => item.visitorId)).size
    const daily = new Map<string, { views: number; visitors: Set<string> }>()
    for (let offset = days - 1; offset >= 0; offset--) {
      daily.set(dayKey(now - offset * 86_400_000), { views: 0, visitors: new Set() })
    }
    for (const event of current) {
      const bucket = daily.get(dayKey(event.createdAt))
      if (bucket) {
        bucket.views += 1
        bucket.visitors.add(event.visitorId)
      }
    }
    const countBy = (key: "path" | "source") => {
      const counts = new Map<string, number>()
      for (const event of current) counts.set(event[key], (counts.get(event[key]) ?? 0) + 1)
      return [...counts.entries()]
        .map(([label, value]) => ({ label, value }))
        .toSorted((a, b) => b.value - a.value)
        .slice(0, 6)
    }
    return {
      totals: {
        visitors: unique(current),
        previousVisitors: unique(previous),
        views: current.length,
        previousViews: previous.length,
        contacts: currentContacts.length,
        previousContacts: previousContacts.length,
        unread: (await ctx.db.query("contacts").collect()).filter((contact) => !contact.isRead)
          .length,
      },
      daily: [...daily.entries()].map(([date, value]) => ({
        date,
        views: value.views,
        visitors: value.visitors.size,
      })),
      pages: countBy("path"),
      sources: countBy("source"),
    }
  },
})
