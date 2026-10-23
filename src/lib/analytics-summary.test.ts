import assert from "node:assert/strict"
import { test } from "node:test"
import { summarizeEngagement } from "./analytics-summary"

test("empty reporting windows have finite values and no invented activity", () => {
  const summary = summarizeEngagement([], [])
  assert.equal(summary.sessions, 0)
  assert.equal(summary.pagesPerSession, 0)
  assert.equal(summary.multiPageRate, 0)
  assert.deepEqual(summary.solutions, [])
  assert.deepEqual(summary.interests, [])
})

test("session depth includes repeat views and isolates tab sessions", () => {
  const events = [
    { sessionId: "a", path: "/solutions" },
    { sessionId: "a", path: "/solutions/training" },
    { sessionId: "a", path: "/solutions/training" },
    { sessionId: "a", path: "/contact" },
    { sessionId: "a", path: "/" },
    { sessionId: "b", path: "/careers" },
  ]
  const summary = summarizeEngagement(events, [])
  assert.equal(summary.sessions, 2)
  assert.equal(summary.pagesPerSession, 3)
  assert.equal(summary.multiPageSessions, 1)
  assert.equal(summary.multiPageRate, 50)
  assert.deepEqual(
    summary.depths.map((item) => item.value),
    [1, 0, 0, 1],
  )
  assert.deepEqual(summary.solutions, [{ label: "/solutions/training", value: 2 }])
})

test("inquiry topics count each submitted form once per topic", () => {
  const summary = summarizeEngagement(
    [],
    [
      { interests: ["Training", "Training", "Workforce", ""] },
      { interests: ["Training"] },
      { interests: [] },
    ],
  )
  assert.deepEqual(summary.interests, [
    { label: "Training", value: 2 },
    { label: "Workforce", value: 1 },
  ])
})
