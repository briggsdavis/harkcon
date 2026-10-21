import assert from "node:assert/strict"
import { test } from "node:test"
import { newsArticles, publicArticles } from "./news"

test("legacy seeded filler stays out of public news while editorial articles remain", () => {
  const verified = newsArticles[0]
  const editorial = { ...verified, slug: "new-editorial-announcement", _id: "editorial-id" }
  const legacy = [
    "building-workforce-readiness",
    "modern-training-systems",
    "continuity-planning-with-purpose",
    "from-policy-to-practice",
  ].map((slug) => ({ ...verified, slug }))
  const result = publicArticles([verified, ...legacy, editorial])
  assert.deepEqual(result, [verified, editorial])
  assert.equal(result[1], editorial)
})
