export type PageKey = "home" | "about" | "careers" | "solutions"
export type ContentField = { text?: string; src?: string; alt?: string; href?: string }
export type PersonEntry = {
  id: string
  name: string
  role: string
  photo: string
  alt: string
  linkedin: string
  biography: string
  group: "executive" | "program"
}
export type FaqEntry = { id: string; question: string; answer: string }
export type PageDraft = {
  fields: Record<string, ContentField>
  people?: PersonEntry[]
  faqs?: FaqEntry[]
}
export type ContentSelection = { kind: "image" | "link"; field: string; value: ContentField }
export const validDestination = (value: string) =>
  /^(\/(?!\/)|https?:\/\/|mailto:|tel:|#)/i.test(value)
