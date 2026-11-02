import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { test } from "node:test"
const local = /^NEXT_PUBLIC_CONVEX_URL=http:\/\/(127\.0\.0\.1|localhost):3210$/m.test(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8"),
)
function run(name, args, authenticated = true) {
  const command = ["convex", "run", name, JSON.stringify(args)]
  if (authenticated)
    command.push(
      "--identity",
      JSON.stringify({ subject: "local-contract-editor", email: "editor-test@harkcon.local" }),
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
const project = {
  id: "local-test-project",
  title: "Local contract project",
  description: "Local project description.",
  photo: { src: "/images/editorial/contracts-gsa.jpg", alt: "Columns" },
  details: ["vehicle", "prime", "contract", "period", "uei"].map((key) => ({
    key,
    value: `Test ${key}`,
  })),
  list: { kind: "services", items: ["Service one", "Service two"] },
}
const section = {
  id: "local-test-section",
  title: "Test section",
  eyebrow: "Contract vehicles",
  description: "Local section description.",
  projects: [project],
}
test(
  "contract editors save independent sections, five details and ordered lists; reject invalid drafts",
  { skip: !local },
  () => {
    const snapshots = Object.fromEntries(
      ["contracts", "oasis"].map((key) => [key, run("pages:getAdmin", { key })]),
    )
    try {
      const draft = {
        fields: { "overview-title": { text: "Local introduction" } },
        contractSections: [section],
      }
      const updatedAt = save("contracts", draft)
      assert.deepEqual(run("pages:get", { key: "contracts" }, false).draft, draft)
      assert.deepEqual(run("pages:getAdmin", { key: "oasis" }), snapshots.oasis)
      const naics = {
        ...project,
        list: {
          kind: "naics",
          items: [
            { code: "541611", title: "Management consulting" },
            { code: "611430", title: "Training" },
          ],
        },
      }
      save("oasis", { fields: {}, contractSections: [{ ...section, projects: [naics] }] })
      assert.equal(
        run("pages:get", { key: "contracts" }, false).draft.contractSections[0].projects[0].list
          .kind,
        "services",
      )
      naics.list.items.reverse()
      save("oasis", { fields: {}, contractSections: [{ ...section, projects: [naics] }] })
      assert.equal(
        run("pages:get", { key: "oasis" }, false).draft.contractSections[0].projects[0].list
          .items[0].code,
        "611430",
      )
      assert.throws(
        () => run("pages:save", { key: "contracts", draft, expectedUpdatedAt: updatedAt - 1 }),
        /another window/,
      )
      assert.throws(() => run("pages:save", { key: "contracts", draft }, false), /Admin access/)
      assert.throws(() => save("home", draft), /Contract sections belong/)
      assert.throws(
        () =>
          save("contracts", {
            ...draft,
            contractSections: [
              {
                ...section,
                projects: [{ ...project, details: [...project.details, project.details[0]] }],
              },
            ],
          }),
        /each detail only once/,
      )
      assert.throws(
        () =>
          save("contracts", {
            ...draft,
            contractSections: [
              {
                ...section,
                projects: [
                  {
                    ...project,
                    list: { kind: "naics", items: [{ code: "12", title: "Invalid" }] },
                  },
                ],
              },
            ],
          }),
        /six-digit/,
      )
      save("contracts", { fields: {}, contractSections: [] })
      assert.deepEqual(run("pages:get", { key: "contracts" }, false).draft.contractSections, [])
    } finally {
      for (const key of ["contracts", "oasis"]) save(key, snapshots[key]?.draft ?? { fields: {} })
    }
  },
)
