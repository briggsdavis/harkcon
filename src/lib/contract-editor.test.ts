import assert from "node:assert/strict"
import { test } from "node:test"
import { defaultContractSections, moveItem, validateContractSections } from "./contract-editor"

test("existing Contracts and OASIS+ records form independent valid editable sections", () => {
  const contracts = defaultContractSections("contracts"),
    oasis = defaultContractSections("oasis")
  assert.equal(validateContractSections(contracts), null)
  assert.equal(validateContractSections(oasis), null)
  assert.equal(contracts.length, 3)
  assert.equal(contracts[2].projects[0].list.kind, "naics")
  contracts[1].projects[0].title = "Independent legacy record"
  assert.equal(oasis[1].projects[0].title, "Legacy OASIS Small Business Pool 1")
})
test("section and list reordering preserves contents and supports boundaries", () => {
  const values = ["a", "b", "c"]
  assert.deepEqual(moveItem(values, 0, 1), ["b", "a", "c"])
  assert.deepEqual(moveItem(values, 2, -1), ["a", "c", "b"])
  assert.deepEqual(moveItem(values, 0, -1), values)
  assert.deepEqual(moveItem(values, 2, 1), values)
  assert.deepEqual(values, ["a", "b", "c"])
})
test("all five details are accepted while duplicate details, empty services and invalid NAICS are rejected", () => {
  const sections = defaultContractSections("contracts")
  const project = sections[0].projects[0]
  project.details.push({ key: "uei", value: "T3GVAM6E2XD9" })
  assert.equal(validateContractSections(sections), null)
  project.details.push({ key: "uei", value: "duplicate" })
  assert.match(validateContractSections(sections)!, /each detail only once/)
  project.details.pop()
  project.list = { kind: "services", items: [""] }
  assert.match(validateContractSections(sections)!, /Fill each service/)
  project.list = { kind: "naics", items: [{ code: "123", title: "Invalid" }] }
  assert.match(validateContractSections(sections)!, /six-digit/)
  project.list = { kind: "naics", items: [{ code: "541611", title: "Management consulting" }] }
  assert.equal(validateContractSections(sections), null)
  sections[1].id = sections[0].id
  assert.match(validateContractSections(sections)!, /unique/)
})
