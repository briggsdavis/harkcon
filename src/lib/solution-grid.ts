/** The first eight cards read left to right; later rows fill from the right. */
export function solutionGridPosition(index: number): { row: number; column: number } {
  if (index < 8) return { row: Math.floor(index / 4) + 1, column: (index % 4) + 1 }
  return { row: Math.floor((index - 8) / 4) + 3, column: 4 - ((index - 8) % 4) }
}
export function featuredSolutions<T extends { featured: boolean }>(solutions: T[]): T[] {
  return solutions.filter((solution) => solution.featured).slice(0, 7)
}
