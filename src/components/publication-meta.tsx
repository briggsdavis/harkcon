const categoryColors: Record<string, string> = {
  All: "#a23cff",
  News: "#ff334f",
  Awards: "#246bff",
  Insights: "#ffc400",
  Coverage: "#16c172",
}

export const categoryColor = (category: string) => categoryColors[category] ?? "#0d132d"

export default function PublicationMeta({
  date,
  displayDate,
  category,
}: {
  date: string
  displayDate: string
  category: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 font-eyebrow text-eyebrow-label font-semibold tracking-[0.1em] text-[#5f626b] uppercase">
      <time dateTime={date}>{displayDate}</time>
      <span className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: categoryColor(category) }}
        />
        {category}
      </span>
    </div>
  )
}
