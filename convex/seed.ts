import { newsArticles as articles, harkconInTheNews as mentions } from "../src/lib/news"
import { mutation } from "./_generated/server"

const solutionPages = [
  ["Workforce & Organizational Analysis", "workforce-organizational-analysis"],
  ["Training & Human Systems Integration", "training-human-systems-integration"],
  ["Process Improvement & Transformation", "process-improvement-transformation"],
  ["Policy, Strategy, & Program Support", "policy-strategy-program-support"],
  ["International Advisory & Capacity Building", "international-advisory-capacity-building"],
  ["Administrative & Compliance Support", "administrative-compliance-support"],
  ["Emergency Management & Continuity Support", "emergency-management-continuity-support"],
] as const

export const initialContent = mutation({
  args: {},
  handler: async (ctx) => {
    if ((await ctx.db.query("articles").first()) === null) {
      for (const [order, article] of articles.entries()) {
        await ctx.db.insert("articles", { ...article, order, featured: order < 2 })
      }
    }
    if ((await ctx.db.query("pressMentions").first()) === null) {
      for (const [order, headline] of mentions.entries()) {
        await ctx.db.insert("pressMentions", { headline, order })
      }
    }
    if ((await ctx.db.query("newsTopics").first()) === null) {
      for (const [order, name] of ["News", "Awards", "Insights"].entries()) {
        await ctx.db.insert("newsTopics", { name, slug: name.toLowerCase(), order })
      }
    }
    if ((await ctx.db.query("solutionPages").first()) === null) {
      for (const [order, [title, slug]] of solutionPages.entries()) {
        await ctx.db.insert("solutionPages", { title, slug, order })
      }
    }
    return { articles: articles.length, mentions: mentions.length, solutions: solutionPages.length }
  },
})
