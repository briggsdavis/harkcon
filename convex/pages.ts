import { v } from "convex/values"
import { validDestination } from "../src/lib/page-content"
import { getSolution, solutions } from "../src/lib/solutions"
import { query, mutation } from "./_generated/server"
import { requireAdmin } from "./admin"
import { pageKey, pageDraft } from "./pageFields"
export const get = query({
  args: { key: pageKey },
  handler: async (ctx, { key }) => {
    const page = await ctx.db
      .query("editablePages")
      .withIndex("by_key", (q) => q.eq("key", key))
      .unique()
    return page?.archived ? { ...page, draft: { fields: {} } } : page
  },
})
export const getAdmin = query({
  args: { key: pageKey },
  handler: async (ctx, { key }) => {
    await requireAdmin(ctx)
    return await ctx.db
      .query("editablePages")
      .withIndex("by_key", (q) => q.eq("key", key))
      .unique()
  },
})
export const save = mutation({
  args: { key: pageKey, draft: pageDraft, expectedUpdatedAt: v.optional(v.number()) },
  handler: async (ctx, { key, draft, expectedUpdatedAt }) => {
    await requireAdmin(ctx)
    const current = await ctx.db
      .query("editablePages")
      .withIndex("by_key", (q) => q.eq("key", key))
      .unique()
    if ((current?.updatedAt ?? 0) !== (expectedUpdatedAt ?? 0))
      throw new Error("This page changed in another window. Reload before saving.")
    for (const field of Object.values(draft.fields)) {
      if (field.href !== undefined && !validDestination(field.href))
        throw new Error("Use a valid destination link")
      if (field.src !== undefined && !/^(\/(?!\/)|https?:\/\/)/i.test(field.src))
        throw new Error("Use a valid image URL")
    }
    if (draft.people) {
      if (key !== "about") throw new Error("People belong to the About page")
      if (new Set(draft.people.map((p) => p.id)).size !== draft.people.length)
        throw new Error("Each person needs a unique ID")
      for (const person of draft.people) {
        if (!person.name.trim() || !person.role.trim())
          throw new Error("Each person needs a name and role")
        if (!/^(\/(?!\/)|https?:\/\/)/i.test(person.photo))
          throw new Error("Each person needs a photo")
        if (person.linkedin && !/^https:\/\/(www\.)?linkedin\.com\//i.test(person.linkedin))
          throw new Error("Use a LinkedIn profile URL")
      }
    }
    if (
      draft.faqs &&
      (key !== "careers" || draft.faqs.some((faq) => !faq.question.trim() || !faq.answer.trim()))
    )
      throw new Error("Each career FAQ needs a question and answer")
    const fields = { ...draft.fields }
    const sharedIds = new Set(
      Object.keys(fields)
        .filter((key) => key.startsWith("shared-title:") || key.startsWith("shared-description:"))
        .map((key) => key.split(":")[1]),
    )
    for (const value of sharedIds) {
      const id = ctx.db.normalizeId("solutionPages", value)
      const solution = id ? await ctx.db.get(id) : null
      if (!solution || !id)
        throw new Error("A solution on this page no longer exists. Reload before saving.")
      const heading = fields[`shared-title:${value}`],
        description = fields[`shared-description:${value}`]
      const title = heading?.text?.trim() ?? solution.title
      let slug = solution.slug
      if (heading?.href !== undefined) {
        const match = /^\/solutions\/([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(heading.href)
        if (!match)
          throw new Error("A solution card must link to /solutions/ followed by its URL slug")
        slug = match[1]
        const duplicate = await ctx.db
          .query("solutionPages")
          .withIndex("by_slug", (q) => q.eq("slug", slug))
          .unique()
        if (duplicate && duplicate._id !== id) throw new Error("That solution URL already exists")
      }
      if (!title || description?.text === "")
        throw new Error("Add a solution title and description")
      const { title: _title, slug: _slug, ...base } = getSolution(solution.slug) ?? solutions[0]
      const content = {
        ...base,
        proofHeading: "Experience measured in outcomes.",
        capabilitiesHeading: "Solutions built around the mission.",
        ctaTitle: "Have a complex mission?",
        ctaLabel: "Start a conversation",
        ctaHref: "/contact",
        ...solution.content,
        ...(description?.text !== undefined ? { description: description.text } : {}),
      }
      await ctx.db.patch(id, {
        title,
        slug,
        content,
        updatedAt: Math.max(Date.now(), (solution.updatedAt ?? 0) + 1),
      })
      delete fields[`shared-title:${value}`]
      delete fields[`shared-description:${value}`]
    }
    const storedDraft = { ...draft, fields }
    const updatedAt = Math.max(Date.now(), (current?.updatedAt ?? 0) + 1)
    if (current) await ctx.db.patch(current._id, { draft: storedDraft, updatedAt })
    else await ctx.db.insert("editablePages", { key, draft: storedDraft, updatedAt })
    return updatedAt
  },
})
export const setOverviewArchived = mutation({
  args: { archived: v.boolean() },
  handler: async (ctx, { archived }) => {
    await requireAdmin(ctx)
    const current = await ctx.db
      .query("editablePages")
      .withIndex("by_key", (q) => q.eq("key", "solutions"))
      .unique()
    if (current) await ctx.db.patch(current._id, { archived })
    else
      await ctx.db.insert("editablePages", {
        key: "solutions",
        archived,
        draft: { fields: {} },
        updatedAt: Date.now(),
      })
  },
})
