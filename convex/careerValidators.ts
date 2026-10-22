import { v } from "convex/values"

export const openingValidator = v.object({
  id: v.string(),
  title: v.string(),
  location: v.string(),
  employmentType: v.string(),
  applyUrl: v.string(),
})
