type PageEvent = { path: string; sessionId: string }
type Inquiry = { interests: string[] }

const rank = (counts: Map<string, number>) =>
  [...counts]
    .map(([label, value]) => ({ label, value }))
    .toSorted((a, b) => b.value - a.value || a.label.localeCompare(b.label))

export function summarizeEngagement(events: PageEvent[], contacts: Inquiry[]) {
  const sessions = new Map<string, number>()
  const solutions = new Map<string, number>()
  const interests = new Map<string, number>()
  for (const event of events) {
    sessions.set(event.sessionId, (sessions.get(event.sessionId) ?? 0) + 1)
    if (event.path.startsWith("/solutions/")) {
      solutions.set(event.path, (solutions.get(event.path) ?? 0) + 1)
    }
  }
  for (const contact of contacts) {
    for (const interest of new Set(contact.interests.filter(Boolean))) {
      interests.set(interest, (interests.get(interest) ?? 0) + 1)
    }
  }
  const depths = [0, 0, 0, 0]
  for (const count of sessions.values()) depths[Math.min(count, 4) - 1]++
  const multiPageSessions = [...sessions.values()].filter((count) => count > 1).length
  return {
    sessions: sessions.size,
    pagesPerSession: sessions.size ? events.length / sessions.size : 0,
    multiPageSessions,
    multiPageRate: sessions.size ? (multiPageSessions / sessions.size) * 100 : 0,
    depths: depths.map((value, index) => ({
      label: ["1 page", "2 pages", "3 pages", "4+ pages"][index],
      value,
    })),
    solutions: rank(solutions),
    interests: rank(interests),
  }
}

export type EngagementSummary = ReturnType<typeof summarizeEngagement>
