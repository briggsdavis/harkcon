import { Arrow } from "~/components/home-page"

export default function DocumentDownload({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group grid w-full grid-cols-[48px_1fr_48px] items-center gap-5 py-8 text-[#0d132d] transition-colors duration-500 md:grid-cols-[64px_1fr_64px] md:gap-8 md:py-10"
      data-reveal-line
    >
      <span className="flex h-12 w-12 items-center justify-center border border-[#0d132d]/20 font-eyebrow text-eyebrow-label font-semibold tracking-[0.1em] transition-colors duration-500 group-hover:border-[#0d132d] group-hover:bg-[#0d132d] group-hover:text-white group-focus-visible:border-[#0d132d] group-focus-visible:bg-[#0d132d] group-focus-visible:text-white md:h-16 md:w-16">
        PDF
      </span>
      <span className="grid min-w-0">
        <span className="eyebrow text-[#8b8e96]">Contract document</span>
        <strong className="mt-3 font-header text-card-title font-medium">{title}</strong>
        <span className="mt-2 text-sm leading-relaxed text-[#5f626b]">{description}</span>
      </span>
      <span className="flex h-12 w-12 items-center justify-center justify-self-end rounded-full border border-[#0d132d]/20 transition-all duration-500 group-hover:border-[#0d132d] group-hover:bg-[#0d132d] group-hover:text-white group-focus-visible:border-[#0d132d] group-focus-visible:bg-[#0d132d] group-focus-visible:text-white md:h-16 md:w-16">
        <Arrow
          diagonal
          className="transition-transform duration-500 group-hover:rotate-45 group-focus-visible:rotate-45"
        />
      </span>
    </a>
  )
}
