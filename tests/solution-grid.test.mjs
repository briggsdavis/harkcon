import assert from "node:assert/strict"
import { test } from "node:test"
import { featuredSolutions, solutionGridPosition } from "../src/lib/solution-grid.ts"

test("eight solutions occupy two complete rows of four", () => {
  assert.deepEqual(
    Array.from({ length: 8 }, (_, index) => solutionGridPosition(index)),
    [
      { row: 1, column: 1 },
      { row: 1, column: 2 },
      { row: 1, column: 3 },
      { row: 1, column: 4 },
      { row: 2, column: 1 },
      { row: 2, column: 2 },
      { row: 2, column: 3 },
      { row: 2, column: 4 },
    ],
  )
})
test("subsequent rows fill from right to left without moving earlier cards", () => {
  assert.deepEqual(solutionGridPosition(8), { row: 3, column: 4 })
  assert.deepEqual(solutionGridPosition(9), { row: 3, column: 3 })
  assert.deepEqual(solutionGridPosition(10), { row: 3, column: 2 })
  assert.deepEqual(solutionGridPosition(11), { row: 3, column: 1 })
  assert.deepEqual(solutionGridPosition(12), { row: 4, column: 4 })
  const cells = Array.from({ length: 25 }, (_, index) =>
    JSON.stringify(solutionGridPosition(index)),
  )
  assert.equal(new Set(cells).size, cells.length)
})
test("homepage includes featured services only, with a seven-card limit", () => {
  const services = Array.from({ length: 10 }, (_, index) => ({ id: index, featured: index < 7 }))
  assert.deepEqual(
    featuredSolutions(services).map((service) => service.id),
    [0, 1, 2, 3, 4, 5, 6],
  )
  assert.equal(
    featuredSolutions(services.map((service) => ({ ...service, featured: true }))).length,
    7,
  )
  services[3].featured = false
  services[7].featured = true
  assert.deepEqual(
    featuredSolutions(services).map((service) => service.id),
    [0, 1, 2, 4, 5, 6, 7],
  )
})
