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
    <a href={href} target="_blank" rel="noreferrer" className="document-download" data-reveal-line>
      <span className="flex h-12 w-12 items-center justify-center border border-[#0d132d]/20 font-eyebrow text-eyebrow-label font-semibold tracking-[0.1em] transition-colors duration-500 md:h-16 md:w-16 document-download-type">PDF</span>
      <span className="grid min-w-0 document-download-copy">
        <span className="eyebrow text-[#8b8e96]">Contract document</span>
        <strong>{title}</strong>
        <span>{description}</span>
      </span>
      <span className="flex h-12 w-12 items-center justify-center justify-self-end rounded-full border border-[#0d132d]/20 transition-all duration-500 md:h-16 md:w-16 document-download-action">
        <Arrow diagonal />
      </span>
    </a>
  )
}
