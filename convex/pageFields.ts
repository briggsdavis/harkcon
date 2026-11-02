import { v } from "convex/values"
export const pageKey = v.union(
  v.literal("home"),
  v.literal("about"),
  v.literal("careers"),
  v.literal("solutions"),
  v.literal("contracts"),
  v.literal("oasis"),
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
export const contractProject = v.object({
  id: v.string(),
  title: v.string(),
  description: v.string(),
  photo: v.object({ src: v.string(), alt: v.string() }),
  details: v.array(
    v.object({
      key: v.union(
        v.literal("vehicle"),
        v.literal("prime"),
        v.literal("contract"),
        v.literal("period"),
        v.literal("uei"),
      ),
      value: v.string(),
    }),
  ),
  list: v.union(
    v.object({ kind: v.literal("services"), items: v.array(v.string()) }),
    v.object({
      kind: v.literal("naics"),
      items: v.array(v.object({ code: v.string(), title: v.string() })),
    }),
  ),
})
export const contractSection = v.object({
  id: v.string(),
  title: v.string(),
  eyebrow: v.string(),
  description: v.string(),
  projects: v.array(contractProject),
})
export const pageDraft = v.object({
  fields: v.record(v.string(), contentField),
  contractSections: v.optional(v.array(contractSection)),
  logos: v.optional(v.array(v.object({ id: v.string(), src: v.string(), name: v.string() }))),
  people: v.optional(v.array(personEntry)),
  faqs: v.optional(v.array(faqEntry)),
})
