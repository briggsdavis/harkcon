import assert from "node:assert/strict"
import { test } from "node:test"
import { visibilityKeyForHref, visibilityPages } from "./page-visibility"
import { solutions } from "./solutions"

test("overview and seven solution pages have independent visibility keys", () => {
  assert.equal(visibilityKeyForHref("/solutions"), "solutions")
  assert.equal(visibilityKeyForHref("/solutions?preview=1"), "solutions")
  for (const solution of solutions) {
    const key = visibilityKeyForHref(`/solutions/${solution.slug}#details`)
    assert.equal(key, `solution:${solution.slug}`)
    assert.ok(visibilityPages.some((page) => page.key === key))
    assert.notEqual(key, "solutions")
  }
  assert.equal(new Set(visibilityPages.map((page) => page.key)).size, visibilityPages.length)
})
test("existing special navigation destinations retain their visibility controls", () => {
  assert.equal(visibilityKeyForHref("/contracts?view=oasis-plus"), "oasis")
  assert.equal(visibilityKeyForHref("/news-insights/an-article"), "news")
  assert.equal(visibilityKeyForHref("https://kdharkins.com/"), "kevin")
})
