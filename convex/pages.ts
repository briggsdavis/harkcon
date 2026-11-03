import { ConvexError, v } from "convex/values"
import { validateContractSections } from "../src/lib/contract-editor"
import { validDestination } from "../src/lib/page-content"
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
      throw new ConvexError("This page changed in another window. Reload before saving.")
    for (const field of Object.values(draft.fields)) {
      if (field.href !== undefined && !validDestination(field.href))
        throw new ConvexError("Use a valid destination link")
      if (field.src !== undefined && !/^(\/(?!\/)|https?:\/\/)/i.test(field.src))
        throw new ConvexError("Use a valid image URL")
    }
    if (draft.contractSections !== undefined) {
      if (key !== "contracts" && key !== "oasis")
        throw new ConvexError("Contract sections belong to Contracts or OASIS+.")
      const error = validateContractSections(draft.contractSections)
      if (error) throw new ConvexError(error)
    }
    if (draft.logos) {
      if (key !== "home") throw new ConvexError("Organization logos belong to the Home page")
      if (
        new Set(draft.logos.map((logo) => logo.id)).size !== draft.logos.length ||
        draft.logos.some((logo) => !/^(\/(?!\/)|https?:\/\/)/i.test(logo.src))
      )
        throw new ConvexError("Use valid organization images with unique IDs")
    }
    if (draft.people) {
      if (key !== "about") throw new ConvexError("People belong to the About page")
      if (new Set(draft.people.map((p) => p.id)).size !== draft.people.length)
        throw new ConvexError("Each person needs a unique ID")
      for (const person of draft.people) {
        if (!person.name.trim() || !person.role.trim())
          throw new ConvexError("Each person needs a name and role")
        if (!/^(\/(?!\/)|https?:\/\/)/i.test(person.photo))
          throw new ConvexError("Each person needs a photo")
        if (person.linkedin && !/^https:\/\/(www\.)?linkedin\.com\//i.test(person.linkedin))
          throw new ConvexError("Use a LinkedIn profile URL")
      }
    }
    if (
      draft.faqs &&
      (key !== "careers" || draft.faqs.some((faq) => !faq.question.trim() || !faq.answer.trim()))
    )
      throw new ConvexError("Each career FAQ needs a question and answer")
    const fields = { ...draft.fields }
    for (const field of Object.keys(fields)) {
      if (field.startsWith("shared-title:") || field.startsWith("shared-description:"))
        delete fields[field]
    }
    if (
      draft.supportPills &&
      (key !== "about" ||
        [...draft.supportPills.financial, ...draft.supportPills.volunteer].some(
          (name) => !name.trim(),
        ))
    )
      throw new ConvexError("Each support pill needs an organization name on the About page")
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
