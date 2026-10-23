import { v } from "convex/values"
import { summarizeEngagement } from "../src/lib/analytics-summary"
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
  args: { days: v.union(v.literal(30), v.literal(90), v.literal(180)), asOf: v.number() },
  handler: async (ctx, { days, asOf }) => {
    await requireAdmin(ctx)
    const now = asOf
    const periodMs = days * 86_400_000
    const start =
      Date.UTC(
        new Date(now).getUTCFullYear(),
        new Date(now).getUTCMonth(),
        new Date(now).getUTCDate(),
      ) -
      (days - 1) * 86_400_000
    const previousStart = start - periodMs
    const events = await ctx.db
      .query("analyticsEvents")
      .withIndex("by_createdAt", (q) => q.gte("createdAt", previousStart).lt("createdAt", now))
      .take(20001)
    const contacts = await ctx.db
      .query("contacts")
      .withIndex("by_submittedAt", (q) =>
        q.gte("submittedAt", previousStart).lt("submittedAt", now),
      )
      .take(20001)
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
    const unread = await ctx.db
      .query("contacts")
      .withIndex("by_isRead_and_submittedAt", (q) => q.eq("isRead", false))
      .take(20001)
    return {
      limited: events.length > 20000 || contacts.length > 20000 || unread.length > 20000,
      engagement: summarizeEngagement(current, currentContacts),
      totals: {
        visitors: unique(current),
        previousVisitors: unique(previous),
        views: current.length,
        previousViews: previous.length,
        contacts: currentContacts.length,
        previousContacts: previousContacts.length,
        unread: unread.length,
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
