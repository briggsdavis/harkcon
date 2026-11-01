import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { readFileSync, existsSync } from "node:fs"
import { test } from "node:test"

// This test deliberately refuses to mutate cloud deployments.
const envFile = new URL("../.env.local", import.meta.url)
const env = existsSync(envFile) ? readFileSync(envFile, "utf8") : ""
const local = /^NEXT_PUBLIC_CONVEX_URL=http:\/\/(127\.0\.0\.1|localhost):3210$/m.test(env)
function run(name, args = {}, authenticated = true) {
  const command = ["convex", "run", name, JSON.stringify(args)]
  if (authenticated)
    command.push(
      "--identity",
      JSON.stringify({ subject: "local-editor-integration", email: "editor-test@harkcon.local" }),
    )
  const output = execFileSync("npx", command, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim()
  return output ? JSON.parse(output) : null
}
const content = {
  number: "01",
  color: "#ff334f",
  shortTitle: "Integration solution",
  description: "A saved solution description.",
  proofPoint: "Verified experience.",
  heroImage: "/images/editorial/careers-cutter.jpg",
  heroAlt: "Hero test",
  wideImage: "/images/editorial/workforce-coast.jpg",
  wideAlt: "Wide test",
  detailImage: "/images/editorial/workforce-lighthouse.jpg",
  detailAlt: "Detail test",
  proofHeading: "Experience",
  capabilitiesHeading: "Capabilities",
  ctaTitle: "Get in touch",
  ctaLabel: "Discuss your workforce",
  ctaHref: "/contact?topic=workforce",
  solutions: ["First capability"],
}
test("solution saving, validation, archive lifecycle and authorization", { skip: !local }, () => {
  const slug = `editor-integration-${Date.now()}`
  const id = run("solutions:add", { title: "Local integration fixture", slug })
  try {
    assert.equal(run("solutions:list").find((p) => p._id === id).archived, true)
    assert.ok(!run("solutions:listPublic", {}, false).some((p) => p._id === id))
    assert.throws(
      () => run("solutions:setArchived", { id, archived: false }),
      /Save the page content/,
    )
    const first = run("solutions:save", { id, title: "Local integration fixture", slug, content })
    assert.equal(
      run("solutions:list").find((p) => p._id === id).archived,
      true,
      "Saving does not publish an archived page",
    )
    assert.throws(
      () => run("solutions:save", { id, title: "Local integration fixture", slug, content }),
      /another window/,
    )
    assert.throws(
      () =>
        run("solutions:save", {
          id,
          title: "Local integration fixture",
          slug,
          content: { ...content, ctaHref: "javascript:alert(1)" },
          expectedUpdatedAt: first.updatedAt,
        }),
      /relative path/,
    )
    assert.throws(
      () =>
        run(
          "solutions:save",
          {
            id,
            title: "Local integration fixture",
            slug,
            content,
            expectedUpdatedAt: first.updatedAt,
          },
          false,
        ),
      /Admin access required/,
    )
    run("solutions:setArchived", { id, archived: false })
    let page = run("solutions:listPublic", {}, false).find((p) => p._id === id)
    assert.equal(page.content.ctaLabel, content.ctaLabel)
    assert.equal(page.content.ctaHref, content.ctaHref)
    assert.equal(page.content.heroImage, content.heroImage)
    const second = run("solutions:save", {
      id,
      title: "Local integration fixture",
      slug,
      content: { ...content, shortTitle: "Updated heading", heroAlt: "Updated alternative text" },
      expectedUpdatedAt: first.updatedAt,
    })
    assert.ok(second.updatedAt > first.updatedAt)
    page = run("solutions:listPublic", {}, false).find((p) => p._id === id)
    assert.equal(page.content.shortTitle, "Updated heading")
    assert.equal(page.content.heroAlt, "Updated alternative text")
    run("solutions:setArchived", { id, archived: true })
    assert.ok(!run("solutions:listPublic", {}, false).some((p) => p._id === id))
    assert.equal(
      run("solutions:list").find((p) => p._id === id).content.shortTitle,
      "Updated heading",
    )
    run("solutions:setArchived", { id, archived: false })
    assert.ok(run("solutions:listPublic", {}, false).some((p) => p._id === id))
  } finally {
    run("solutions:remove", { id })
  }
})
