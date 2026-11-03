"use client"
import Link from "next/link"
import { useState, type CSSProperties } from "react"
import { Arrow } from "~/components/home-page"
import SolutionCardWatermark from "~/components/solution-card-watermark"
import ViewportCards from "~/components/viewport-cards"
import { featuredSolutions, solutionGridPosition } from "~/lib/solution-grid"
import { useSolutions } from "~/lib/use-solutions"
import { PageText, usePageDraft } from "./page-editing"

export default function SolutionsOverview({
  variant = "standard",
}: {
  variant?: "standard" | "home" | "overview"
}) {
  const { editing } = usePageDraft()
  const [notice, setNotice] = useState("")
  const allSolutions = useSolutions()
  const capabilities = variant === "home" ? featuredSolutions(allSolutions) : allSolutions
  const overview = variant === "overview"
  return (
    <section
      id="solutions"
      className="bg-white py-20 md:py-24 lg:py-28"
      aria-labelledby="solutions-list-title"
    >
      {editing && notice && (
        <output className="sticky top-4 z-30 mx-5 mb-6 flex items-center justify-between gap-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          {notice}
          <button type="button" onClick={() => setNotice("")} className="font-semibold">
            Dismiss
          </button>
        </output>
      )}
      <div className={overview ? "site-gutter" : undefined}>
        {overview && (
          <PageText field="solutions-list-heading">
            <h2
              id="solutions-list-title"
              className="mb-12 font-header text-section-title font-medium"
            >
              Our Solutions
            </h2>
          </PageText>
        )}
        <ViewportCards
          className={`${overview ? "" : "site-gutter"} grid gap-x-7 gap-y-0 md:grid-cols-2 xl:grid-cols-4`}
        >
          {!overview && (
            <div className="pb-12 xl:pb-0">
              <PageText field="solutions-list-heading">
                <h2
                  id="solutions-list-title"
                  className="font-header text-section-title font-medium xl:sticky xl:top-32 xl:pb-12"
                >
                  Our Solutions
                </h2>
              </PageText>
            </div>
          )}
          {capabilities.map(({ title, slug, homepageDescription: detail }, index) => {
            const position = solutionGridPosition(index, capabilities.length)
            const Card = editing ? "article" : Link
            return (
              <Card
                tabIndex={editing ? 0 : undefined}
                onClick={
                  editing ? () => setNotice(`Edit this on the ${title} Solutions page.`) : undefined
                }
                onKeyDown={
                  editing
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault()
                          setNotice(`Edit this on the ${title} Solutions page.`)
                        }
                      }
                    : undefined
                }
                data-center-card
                data-solution-card={slug}
                style={
                  overview
                    ? ({
                        "--solution-row": position.row,
                        "--solution-column": position.column,
                      } as CSSProperties)
                    : undefined
                }
                key={slug}
                href={`/solutions/${slug}`}
                className={`${overview ? "xl:[grid-column-start:var(--solution-column)] xl:[grid-row-start:var(--solution-row)]" : ""} group relative flex min-h-[310px] flex-col overflow-hidden border-t border-[#0d132d]/20 px-5 py-7 text-[#0d132d] transition-colors duration-500 hover:text-white focus-visible:text-white focus-visible:outline-2 data-[center-active=true]:text-white md:min-h-[340px] md:px-6 md:py-8`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left scale-x-0 bg-[#0d132d] transition-transform duration-700 group-hover:scale-x-100 group-focus-visible:scale-x-100 group-data-[center-active=true]:scale-x-100 motion-reduce:transition-none"
                />
                <SolutionCardWatermark />
                <div className="relative z-10 flex flex-1 flex-col">
                  <h3 className="font-header text-card-title font-medium text-balance">{title}</h3>
                  <div className="mt-auto flex items-end gap-5 pt-10">
                    <p className="text-sm leading-relaxed text-[#5f626b] transition-colors group-hover:text-white/70 group-focus-visible:text-white/70 group-data-[center-active=true]:text-white/70">
                      {detail}
                    </p>
                    <span className="ml-auto flex size-14 shrink-0 items-center justify-center bg-[#f4f3f0] text-[#0d132d]">
                      <Arrow
                        diagonal
                        className="transition-transform duration-500 group-hover:rotate-45"
                      />
                    </span>
                  </div>
                </div>
              </Card>
            )
          })}
        </ViewportCards>
      </div>
    </section>
  )
}
