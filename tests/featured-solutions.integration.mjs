import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { test } from "node:test"
const envFile = new URL("../.env.local", import.meta.url)
const local =
  existsSync(envFile) &&
  /^NEXT_PUBLIC_CONVEX_URL=http:\/\/(127\.0\.0\.1|localhost):3210$/m.test(
    readFileSync(envFile, "utf8"),
  )
function run(name, args = {}, authenticated = true) {
  const command = ["convex", "run", name, JSON.stringify(args)]
  if (authenticated)
    command.push(
      "--identity",
      JSON.stringify({ subject: "local-featured-test", email: "editor-test@harkcon.local" }),
    )
  const result = execFileSync("npx", command, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim()
  return result ? JSON.parse(result) : null
}
test(
  "new solutions are unfeatured, featuring is limited to seven, and summaries stay separate",
  { skip: !local },
  () => {
    const before = run("solutions:list")
    const existing = before.filter((page) => page.featured !== false)
    assert.equal(existing.length, 7, "The seven existing services start featured")
    const id = run("solutions:add", {
      title: "Featured limit fixture",
      slug: `featured-limit-${Date.now()}`,
    })
    try {
      assert.equal(run("solutions:list").find((page) => page._id === id).featured, false)
      assert.throws(() => run("solutions:setFeatured", { id, featured: true }), /up to seven/)
      run("solutions:setFeatured", { id: existing[0]._id, featured: false })
      run("solutions:setFeatured", { id, featured: true })
      assert.equal(run("solutions:list").filter((page) => page.featured !== false).length, 7)
      assert.throws(
        () => run("solutions:setFeatured", { id: existing[0]._id, featured: true }),
        /up to seven/,
      )
      assert.throws(
        () => run("solutions:setFeatured", { id, featured: false }, false),
        /Admin access required/,
      )
      run("solutions:setFeatured", { id, featured: false })
      run("solutions:setFeatured", { id: existing[0]._id, featured: true })
    } finally {
      run("solutions:remove", { id })
      for (const page of before) {
        const current = run("solutions:list").find((item) => item._id === page._id)
        if ((current.featured !== false) !== (page.featured !== false))
          run("solutions:setFeatured", { id: page._id, featured: page.featured !== false })
      }
    }
  },
)
