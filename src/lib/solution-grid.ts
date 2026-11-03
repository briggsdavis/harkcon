/** Keep reading order while placing any incomplete row at the top, aligned right. */
export function solutionGridPosition(
  index: number,
  total: number,
): { row: number; column: number } {
  const offset = (4 - (total % 4)) % 4
  const cell = index + offset
  return { row: Math.floor(cell / 4) + 1, column: (cell % 4) + 1 }
}
export function featuredSolutions<T extends { featured: boolean }>(solutions: T[]): T[] {
  return solutions.filter((solution) => solution.featured).slice(0, 7)
}
