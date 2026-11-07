import assert from "node:assert/strict"
import { test } from "node:test"
import { categoryColor, isTopicColor } from "./news-topics"

test("legacy topics retain their colors without stored overrides", () => {
  assert.equal(categoryColor("News"), "#ff334f")
  assert.equal(categoryColor("Awards"), "#246bff")
  assert.equal(categoryColor("Insights"), "#ffc400")
})

test("custom colors are validated and invalid overrides safely fall back", () => {
  assert.equal(categoryColor("Custom", "#Aa12F0"), "#Aa12F0")
  assert.equal(categoryColor(" News ", "invalid"), "#ff334f")
  assert.equal(categoryColor("Custom"), "#0d132d")
  assert.equal(isTopicColor("red"), false)
  assert.equal(isTopicColor("#fff"), false)
  assert.equal(isTopicColor("#123456"), true)
})
