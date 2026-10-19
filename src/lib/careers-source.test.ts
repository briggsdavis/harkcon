import assert from "node:assert/strict"
import { test } from "node:test"
import { parseOpeningsPage } from "./careers-source"

const job = {
  itemID: "role-1",
  requisitionTitle: "Analyst",
  customFieldGroup: {
    stringFields: [{ nameCode: { codeValue: "ExternalJobID" }, stringValue: "12345" }],
  },
  requisitionLocations: [{ nameCode: { shortName: " Washington, DC " } }],
  workLevelCode: { shortName: "Full Time" },
}

test("opens the role description using the external job ID without forcing sign-in", () => {
  const result = parseOpeningsPage({ jobRequisitions: [job], meta: { totalNumber: 1 } })
  const opening = result.openings[0]
  assert.equal(opening.id, "role-1")
  assert.equal(opening.location, "Washington, DC")
  assert.equal(opening.employmentType, "Full Time")
  const url = new URL(opening.applyUrl)
  assert.equal(url.hostname, "workforcenow.adp.com")
  assert.equal(url.searchParams.get("jobId"), "12345")
  assert.equal(url.searchParams.has("deepLink"), false)
})
test("accepts a confirmed empty list but rejects an incomplete or malformed response", () => {
  assert.deepEqual(parseOpeningsPage({ jobRequisitions: [], meta: { totalNumber: 0 } }), {
    openings: [],
    total: 0,
  })
  assert.throws(() => parseOpeningsPage({}))
  assert.throws(() =>
    parseOpeningsPage({
      jobRequisitions: [{ ...job, customFieldGroup: { stringFields: [] } }],
      meta: { totalNumber: 1 },
    }),
  )
})
test("preserves source order and distinct roles with identical titles", () => {
  const result = parseOpeningsPage({
    jobRequisitions: [job, { ...job, itemID: "role-2" }],
    meta: { totalNumber: 2 },
  })
  assert.deepEqual(
    result.openings.map((opening) => opening.id),
    ["role-1", "role-2"],
  )
})
