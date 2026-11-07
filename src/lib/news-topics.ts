const topicColors: Record<string, string> = {
  All: "#a23cff",
  News: "#ff334f",
  Awards: "#246bff",
  Insights: "#ffc400",
  Coverage: "#16c172",
}

export const isTopicColor = (color: string) => /^#[0-9a-f]{6}$/i.test(color)

export function categoryColor(category: string, color?: string) {
  return color && isTopicColor(color) ? color : (topicColors[category.trim()] ?? "#0d132d")
}
