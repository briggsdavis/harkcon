import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { test } from "node:test"

const envFile = new URL("../.env.local", import.meta.url)
const env = existsSync(envFile) ? readFileSync(envFile, "utf8") : ""
const local = /^NEXT_PUBLIC_CONVEX_URL=http:\/\/(127\.0\.0\.1|localhost):3210$/m.test(env)
function run(name, args = {}, authenticated = true) {
  const command = ["convex", "run", name, JSON.stringify(args)]
  if (authenticated)
    command.push(
      "--identity",
      JSON.stringify({ subject: "local-page-integration", email: "editor-test@harkcon.local" }),
    )
  const output = execFileSync("npx", command, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim()
  return output ? JSON.parse(output) : null
}
function save(key, draft) {
  const current = run("pages:getAdmin", { key })
  return run("pages:save", {
    key,
    draft,
    ...(current ? { expectedUpdatedAt: current.updatedAt } : {}),
  })
}
const content = {
  number: "01",
  color: "#ff334f",
  shortTitle: "Local shared solution",
  description: "Original shared description.",
  proofPoint: "Experience.",
  heroImage: "/images/editorial/careers-cutter.jpg",
  heroAlt: "Hero",
  wideImage: "/images/editorial/workforce-coast.jpg",
  wideAlt: "Coast",
  detailImage: "/images/editorial/workforce-lighthouse.jpg",
  detailAlt: "Lighthouse",
  proofHeading: "Experience",
  capabilitiesHeading: "Capabilities",
  ctaTitle: "Contact",
  ctaLabel: "Talk to us",
  ctaHref: "/contact",
  solutions: ["One capability"],
}
test(
  "page drafts, people, FAQs, shared solutions, archive status and authorization",
  { skip: !local },
  () => {
    const keys = ["home", "about", "careers", "solutions"]
    const snapshots = Object.fromEntries(keys.map((key) => [key, run("pages:getAdmin", { key })]))
    let solutionId
    try {
      for (const key of keys) {
        const draft = {
          fields: {
            "integration-heading": { text: `Saved ${key} heading` },
            "integration-image": {
              src: "/images/editorial/careers-cutter.jpg",
              alt: "Saved alternative text",
            },
            "integration-button": { text: "Talk with us", href: "/contact?source=test" },
          },
        }
        const updatedAt = save(key, draft)
        assert.deepEqual(run("pages:get", { key }, false).draft, draft)
        assert.throws(
          () => run("pages:save", { key, draft, expectedUpdatedAt: updatedAt - 1 }),
          /another window/,
        )
      }
      const logos = [{ id: "logo-test", src: "/images/FBI.webp", name: "Test organization" }]
      save("home", { fields: {}, logos })
      assert.deepEqual(run("pages:get", { key: "home" }, false).draft.logos, logos)
      save("home", { fields: {}, logos: [] })
      assert.deepEqual(run("pages:get", { key: "home" }, false).draft.logos, [])
      assert.throws(() => save("about", { fields: {}, logos }), /Home page/)
      assert.throws(
        () => run("pages:save", { key: "home", draft: { fields: {} } }, false),
        /Admin access required/,
      )
      assert.throws(
        () => save("home", { fields: { bad: { href: "javascript:alert(1)" } } }),
        /valid destination/,
      )
      const person = {
        id: "local-person",
        name: "Local Person",
        role: "Program Manager",
        photo: "/images/editorial/careers-cutter.jpg",
        alt: "Local photo",
        biography: "Local biography.",
        linkedin: "https://www.linkedin.com/in/local-test/",
        group: "program",
      }
      save("about", { fields: {}, people: [person] })
      assert.equal(
        run("pages:get", { key: "about" }, false).draft.people[0].biography,
        person.biography,
      )
      save("about", { fields: {}, people: [{ ...person, biography: "Edited biography." }] })
      assert.equal(
        run("pages:get", { key: "about" }, false).draft.people[0].biography,
        "Edited biography.",
      )
      save("about", { fields: {}, people: [] })
      assert.deepEqual(run("pages:get", { key: "about" }, false).draft.people, [])
      assert.throws(() => save("home", { fields: {}, people: [person] }), /About page/)
      save("careers", {
        fields: {},
        faqs: [{ id: "local-faq", question: "A question?", answer: "An answer." }],
      })
      assert.equal(run("pages:get", { key: "careers" }, false).draft.faqs.length, 1)
      assert.throws(
        () => save("careers", { fields: {}, faqs: [{ id: "bad", question: "", answer: "" }] }),
        /question and answer/,
      )
      solutionId = run("solutions:add", {
        title: "Local shared fixture",
        slug: `local-shared-${Date.now()}`,
      })
      const record = run("solutions:list").find((page) => page._id === solutionId)
      run("solutions:save", { id: solutionId, title: record.title, slug: record.slug, content })
      save("solutions", {
        fields: {
          [`shared-title:${solutionId}`]: {
            text: "Updated shared title",
            href: `/solutions/${record.slug}`,
          },
          [`shared-description:${solutionId}`]: { text: "Updated shared description." },
        },
      })
      const changed = run("solutions:list").find((page) => page._id === solutionId)
      assert.equal(changed.title, "Updated shared title")
      assert.equal(changed.content.homepageDescription, "Updated shared description.")
      assert.equal(
        changed.content.description,
        content.description,
        "Card summaries do not replace the full page description",
      )
      assert.deepEqual(
        run("pages:get", { key: "solutions" }, false).draft.fields,
        {},
        "Shared edits are stored once on the solution",
      )
      run("pages:setOverviewArchived", { archived: true })
      assert.equal(run("pages:get", { key: "solutions" }, false).archived, true)
      save("solutions", { fields: { archived: { text: "Still archived" } } })
      assert.equal(run("pages:getAdmin", { key: "solutions" }).archived, true)
      assert.deepEqual(run("pages:get", { key: "solutions" }, false).draft.fields, {})
      run("pages:setOverviewArchived", { archived: false })
      assert.equal(
        run("pages:get", { key: "solutions" }, false).draft.fields.archived.text,
        "Still archived",
      )
    } finally {
      for (const key of keys) save(key, snapshots[key]?.draft ?? { fields: {} })
      run("pages:setOverviewArchived", { archived: snapshots.solutions?.archived ?? false })
      if (solutionId) run("solutions:remove", { id: solutionId })
    }
  },
)
