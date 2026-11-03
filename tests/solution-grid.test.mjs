import assert from "node:assert/strict"
import { test } from "node:test"
import { featuredSolutions, solutionGridPosition } from "../src/lib/solution-grid.ts"

for (const [total, rows] of [
  [7, [".XXX", "XXXX"]],
  [8, ["XXXX", "XXXX"]],
  [9, ["...X", "XXXX", "XXXX"]],
  [10, ["..XX", "XXXX", "XXXX"]],
]) {
  test(`${total} solutions have full bottom rows and a right-aligned top row`, () => {
    const grid = Array.from({ length: rows.length }, () => Array(4).fill("."))
    for (let index = 0; index < total; index++) {
      const { row, column } = solutionGridPosition(index, total)
      assert.equal(grid[row - 1][column - 1], ".", "cards must not overlap")
      grid[row - 1][column - 1] = "X"
    }
    assert.deepEqual(
      grid.map((row) => row.join("")),
      rows,
    )
  })
}

test("adding and deleting solutions recomputes placement from the current count", () => {
  assert.deepEqual(solutionGridPosition(0, 7), { row: 1, column: 2 })
  assert.deepEqual(solutionGridPosition(0, 8), { row: 1, column: 1 })
  assert.deepEqual(solutionGridPosition(0, 7), { row: 1, column: 2 })
  for (let total = 1; total <= 25; total++) {
    const cells = Array.from({ length: total }, (_, index) => {
      const { row, column } = solutionGridPosition(index, total)
      return (row - 1) * 4 + column
    })
    assert.equal(new Set(cells).size, total)
    assert.equal(cells.at(-1), Math.ceil(total / 4) * 4)
    assert.deepEqual(
      cells,
      [...cells].sort((a, b) => a - b),
      "preserves reading order",
    )
  }
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
