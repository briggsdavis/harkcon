import { cronJobs } from "convex/server"
import { components, internal } from "./_generated/api"
import { internalMutation } from "./_generated/server"

const crons = cronJobs()
crons.cron("refresh ADP career openings daily", "0 6 * * *", internal.careers.refresh, {})
crons.interval("clean up sent contact emails", { hours: 24 }, internal.crons.cleanupResend, {})

const WEEK_MS = 7 * 24 * 60 * 60 * 1000

export const cleanupResend = internalMutation({
  args: {},
  handler: async (ctx) => {
    await ctx.scheduler.runAfter(0, components.resend.lib.cleanupOldEmails, {
      olderThan: WEEK_MS,
    })
    await ctx.scheduler.runAfter(0, components.resend.lib.cleanupAbandonedEmails, {
      olderThan: 4 * WEEK_MS,
    })
    return null
  },
})

export default crons
