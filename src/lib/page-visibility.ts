import { solutions } from "./solutions"

export const visibilityPages = [
  { key: "about", title: "About", visible: false },
  { key: "careers", title: "Careers", visible: false },
  { key: "contracts", title: "Contracts", visible: false },
  { key: "oasis", title: "OASIS+", visible: false },
  { key: "news", title: "News", visible: true },
  { key: "solutions", title: "Solutions", visible: true },
  ...solutions.map((solution) => ({
    key: `solution:${solution.slug}`,
    title: `Solution: ${solution.title}`,
    visible: true,
  })),
  { key: "contact", title: "Contact", visible: true },
  { key: "kevin", title: "Kevin Harkins", visible: true },
] as const

export function visibilityKeyForHref(href: string): string {
  if (href.includes("kdharkins.com")) return "kevin"
  const path = href.split(/[?#]/)[0]
  if (path.startsWith("/oasis-plus") || href.includes("view=oasis-plus")) return "oasis"
  if (path.startsWith("/news-insights")) return "news"
  if (path.startsWith("/solutions/")) return `solution:${path.split("/")[2]}`
  return path.split("/")[1]
}
