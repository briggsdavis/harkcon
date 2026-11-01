import { v } from "convex/values"
export const pageKey = v.union(
  v.literal("home"),
  v.literal("about"),
  v.literal("careers"),
  v.literal("solutions"),
)
export const contentField = v.object({
  text: v.optional(v.string()),
  src: v.optional(v.string()),
  alt: v.optional(v.string()),
  href: v.optional(v.string()),
})
export const personEntry = v.object({
  id: v.string(),
  name: v.string(),
  role: v.string(),
  photo: v.string(),
  alt: v.string(),
  linkedin: v.string(),
  biography: v.string(),
  group: v.union(v.literal("executive"), v.literal("program")),
})
export const faqEntry = v.object({ id: v.string(), question: v.string(), answer: v.string() })
export const pageDraft = v.object({
  fields: v.record(v.string(), contentField),
  people: v.optional(v.array(personEntry)),
  faqs: v.optional(v.array(faqEntry)),
})
