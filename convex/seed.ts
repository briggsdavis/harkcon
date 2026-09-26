import { mutation } from "./_generated/server"

const articles = [
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
  {
    slug: "building-workforce-readiness",
    title: "Building workforce readiness for missions in motion",
    date: "2025-08-14",
    displayDate: "August 14, 2025",
    category: "Awards",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "A team collaborating around a table",
    excerpt:
      "A practical framework for aligning people, roles, and capability with rapidly changing mission requirements.",
    body: [
      "Workforce readiness is more than staffing. It is the deliberate alignment of people, capability, structure, and mission demand.",
      "Organizations build resilience when they can see emerging gaps early, develop talent with purpose, and connect individual performance to operational outcomes. That requires good data, clear roles, and leaders who can translate strategy into everyday decisions.",
      "Harkcon helps clients create practical workforce systems that adapt as the mission changes—without losing clarity, accountability, or momentum.",
    ],
  },
  {
    slug: "modern-training-systems",
    title: "Modern training systems turn knowledge into performance",
    date: "2025-06-03",
    displayDate: "June 3, 2025",
    category: "Insights",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Colleagues participating in a training workshop",
    excerpt:
      "Effective learning ecosystems connect instruction, practice, assessment, and the realities of the work itself.",
    body: [
      "The strongest training programs begin with the work, not the classroom. They define the performance people need to deliver and build learning around real decisions, conditions, and constraints.",
      "A modern learning system combines focused instruction with practice, coaching, measurement, and timely reinforcement. It gives leaders evidence that training is changing performance—not simply documenting participation.",
      "By integrating human systems thinking with instructional expertise, organizations can create learning that lasts and capability that scales.",
    ],
  },
  {
    slug: "continuity-planning-with-purpose",
    title: "Continuity planning with purpose",
    date: "2025-03-19",
    displayDate: "March 19, 2025",
    category: "News",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Digital systems in a modern operations environment",
    excerpt:
      "Prepared organizations make continuity a living operational capability rather than a document on a shelf.",
    body: [
      "Continuity planning is most valuable when it becomes part of how an organization operates. Plans need owners, assumptions need testing, and people need the confidence to act when conditions change.",
      "Exercises expose dependencies that are easy to miss on paper. They also create the shared understanding teams need to make sound decisions under pressure.",
      "Harkcon supports continuity programs that are measurable, usable, and closely connected to the mission functions they protect.",
    ],
  },
  {
    slug: "from-policy-to-practice",
    title: "From policy to practice: making strategy actionable",
    date: "2024-12-05",
    displayDate: "December 5, 2024",
    category: "Insights",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Documents and planning materials on a desk",
    excerpt:
      "Clear policy creates value when teams can translate it into decisions, responsibilities, and measurable action.",
    body: [
      "Policy sets direction, but execution depends on whether people understand what changes in their work. Strong implementation connects intent to roles, processes, decisions, and measures.",
      "That translation is where many initiatives lose momentum. The answer is not more documentation; it is a clearer operating model and a disciplined path from strategy to action.",
      "Harkcon works with leaders and delivery teams to make complex policy understandable, implementable, and durable.",
    ],
  },
]

const mentions = [
  "Harkcon recognized among the region’s most people-centered government contractors",
  "How mission-driven firms are modernizing federal workforce strategy",
  "Harkcon leaders discuss the future of performance-based training",
  "Small business innovation is reshaping continuity and preparedness support",
  "Kevin Harkins on building a culture of expertise, ownership, and service",
  "Harkcon expands advisory capability across complex government missions",
  "Industry leaders share practical approaches to organizational transformation",
  "The teams behind the next generation of federal mission readiness",
]

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
