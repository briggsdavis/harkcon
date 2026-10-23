import { HOUR, MINUTE, RateLimiter } from "@convex-dev/rate-limiter"
import { ConvexError, v } from "convex/values"
import { components } from "./_generated/api"
import { mutation, query } from "./_generated/server"
import { requireAdmin } from "./admin"
import { sendContactNotification } from "./email"

const rateLimiter = new RateLimiter(components.rateLimiter, {
  // Per sender: a few quick follow-ups, then roughly one every 10 minutes.
  contactBySender: { kind: "token bucket", rate: 6, period: HOUR, capacity: 3 },
  // Site-wide ceiling on notification emails so a bot cannot flood the inbox.
  contactNotifications: { kind: "fixed window", rate: 30, period: HOUR },
})

const limitText = (value: string, max: number) => value.trim().slice(0, max)

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
    // Honeypot. Hidden from people, so anything here came from a bot.
    website: v.optional(v.string()),
  },
  handler: async (ctx, { website, ...args }) => {
    if (website) return null

    const email = limitText(args.email, 254).toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ConvexError("Please enter a valid email address.")
    }

    const sender = await rateLimiter.limit(ctx, "contactBySender", { key: email })
    if (!sender.ok) {
      throw new ConvexError(
        `Too many messages. Please try again in ${Math.ceil(sender.retryAfter / MINUTE)} minutes.`,
      )
    }

    const id = await ctx.db.insert("contacts", {
      firstName: limitText(args.firstName, 100),
      lastName: limitText(args.lastName, 100),
      organization: limitText(args.organization, 200),
      email,
      phone: limitText(args.phone, 50),
      interests: args.interests.slice(0, 20).map((interest) => limitText(interest, 100)),
      message: limitText(args.message, 5000),
      referral: limitText(args.referral, 100),
      preferredContact: limitText(args.preferredContact, 20),
      isRead: false,
      submittedAt: Date.now(),
    })

    // Over the site-wide limit, keep the submission in the inbox but skip the email.
    const notify = await rateLimiter.limit(ctx, "contactNotifications")
    const contact = await ctx.db.get(id)
    if (notify.ok && contact) await sendContactNotification(ctx, contact)

    return id
  },
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
