import { categoryColor } from "~/lib/news-topics"

export default function PublicationMeta({
  date,
  displayDate,
  category,
  categoryColor: dotColor,
}: {
  date: string
  displayDate: string
  categoryColor?: string
  category: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 font-eyebrow text-eyebrow-label font-semibold tracking-[0.1em] text-[#5f626b] uppercase">
      <time dateTime={date}>{displayDate}</time>
      {category.trim() && (
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: categoryColor(category, dotColor) }}
          />
          {category}
        </span>
      )}
    </div>
  )
}
