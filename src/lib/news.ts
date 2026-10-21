export type NewsCategory = string

export type NewsArticle = {
  _id?: string
  slug: string
  title: string
  date: string
  displayDate: string
  category: NewsCategory
  image: string
  imageAlt: string
  excerpt: string
  body: string[]
  featured?: boolean
  order?: number
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "coast-guard-preparedness-support-contract",
    title: "Harkcon awarded U.S. Coast Guard preparedness support contract",
    date: "2026-09-11",
    displayDate: "September 11, 2026",
    category: "News",
    image:
      "https://images.unsplash.com/photo-1519922838705-9d6cb8bcfaea?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "The United States Capitol in Washington, D.C.",
    excerpt:
      "Harkcon will continue integrated program management, preparedness, continuity, and analytical support across critical Coast Guard programs.",
    body: [
      "Harkcon has been awarded a recompete contract supporting the U.S. Coast Guard’s all-hazards and all-threats preparedness mission. The work continues a trusted relationship centered on readiness, continuity, and resilient operations.",
      "Our team will provide integrated program management, analytical support, planning, and coordination across complex preparedness initiatives. The effort brings together Harkcon specialists with deep operational experience and a practical understanding of the Coast Guard mission.",
      "The award reflects the confidence our clients place in Harkcon’s people and our ability to turn demanding requirements into clear, sustainable performance.",
    ],
  },
  {
    slug: "elev8-govcon-honoree-2026",
    title: "Harkcon named a 2026 Elev8 GovCon honoree",
    date: "2025-10-28",
    displayDate: "October 28, 2025",
    category: "Awards",
    image:
      "https://images.unsplash.com/photo-1758518730151-cf64fddb4f0a?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Business professionals collaborating in an office meeting",
    excerpt:
      "The recognition celebrates Harkcon’s culture, innovation, and commitment to doing business the right way.",
    body: [
      "Harkcon has been selected as a 2026 Elev8 GovCon honoree, recognizing the company’s continued commitment to a strong employee experience, purposeful growth, and meaningful client outcomes.",
      "This marks a second consecutive year of recognition for the culture our associates create every day. Their expertise, ownership, and service-minded approach remain the foundation of Harkcon’s success.",
      "We are proud of the people behind this honor and grateful to the clients and partners who continue to place their trust in our team.",
    ],
  },
]

// Historical coverage listed on Harkcon's original In the News page.
export const harkconInTheNews = [
  "2018 DHS Small Business Achievement Award",
  "2016 Inc. 5000 recognition — No. 3354",
  "2015 Inc. 5000 recognition — No. 2250",
  "2014 Inc. 5000 recognition — No. 1164",
  "2014 DiversityBusiness Top Veteran Owned Business award",
  "2013 SmartCEO magazine profile",
  "2013 GOVStar Award finalist",
  "2013 ISPI Awards of Excellence for Coast Guard training projects",
]

// Exclude the four invented articles from the original seed, including databases
// seeded before this audit. Newly authored articles remain available to editors.
const unsupportedSlugs = new Set([
  "building-workforce-readiness",
  "modern-training-systems",
  "continuity-planning-with-purpose",
  "from-policy-to-practice",
])

export function publicArticles<T extends NewsArticle>(articles: T[]): T[] {
  return articles.filter((article) => !unsupportedSlugs.has(article.slug))
}
