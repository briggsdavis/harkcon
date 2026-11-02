"use client"
import { FilePdf } from "@phosphor-icons/react/ssr"
import { Arrow } from "~/components/home-page"
import { PageText, usePageDraft } from "./page-editing"

export default function DocumentDownload({
  field,
  href,
  title,
  description,
}: {
  field?: string
  href: string
  title: string
  description: string
}) {
  const content = usePageDraft()
  const saved = field ? content.draft.fields[field] : undefined
  return (
    <a
      href={saved?.href ?? href}
      {...(field && content.editing
        ? {
            "data-page-link": field,
            onClickCapture: (event: React.MouseEvent<HTMLAnchorElement>) => {
              if ((event.target as HTMLElement).closest("[data-page-text]")) return
              event.preventDefault()
              event.stopPropagation()
              content.select({
                kind: "link",
                field,
                value: { text: saved?.text ?? title, href: saved?.href ?? href },
              })
            },
          }
        : {})}
      target="_blank"
      rel="noreferrer"
      className="group grid w-full grid-cols-[48px_1fr_48px] items-center gap-5 py-8 text-[#0d132d] transition-colors duration-500 md:grid-cols-[64px_1fr_64px] md:gap-8 md:py-10"
      data-reveal-line
    >
      <span className="flex h-12 w-12 items-center justify-center text-[#0d132d] md:h-16 md:w-16">
        <FilePdf aria-hidden="true" className="h-9 w-9 md:h-11 md:w-11" weight="light" />
        <span className="sr-only">PDF document</span>
      </span>
      <span className="grid min-w-0">
        <span className="eyebrow text-[#8b8e96]">Contract document</span>
        <strong className="relative mt-3 font-header text-card-title font-medium after:pointer-events-none after:absolute after:-bottom-2 after:left-0 after:h-px after:w-8 after:origin-left after:scale-x-0 after:bg-brand-red after:transition-transform after:duration-200 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none">
          {saved?.text ?? title}
        </strong>
        {field ? (
          <PageText field={`${field}-description`}>
            <span className="mt-2 text-sm leading-relaxed text-[#5f626b]">{description}</span>
          </PageText>
        ) : (
          <span className="mt-2 text-sm leading-relaxed text-[#5f626b]">{description}</span>
        )}
      </span>
      <span className="control-fill flex h-12 w-12 items-center justify-center justify-self-end rounded-none border border-[#0d132d]/20 transition-all duration-500 group-hover:border-[#0d132d] group-hover:text-white group-focus-visible:border-[#0d132d] group-focus-visible:text-white md:h-16 md:w-16">
        <Arrow
          diagonal
          className="transition-transform duration-500 group-hover:rotate-45 group-focus-visible:rotate-45"
        />
      </span>
    </a>
  )
}
