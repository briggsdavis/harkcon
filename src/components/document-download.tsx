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
      <span className="document-download-type flex h-12 w-12 items-center justify-center border border-[#0d132d]/20 font-eyebrow text-eyebrow-label font-semibold tracking-[0.1em] transition-colors duration-500 md:h-16 md:w-16">
        PDF
      </span>
      <span className="document-download-copy grid min-w-0">
        <span className="eyebrow text-[#8b8e96]">Contract document</span>
        <strong>{title}</strong>
        <span>{description}</span>
      </span>
      <span className="document-download-action flex h-12 w-12 items-center justify-center justify-self-end rounded-full border border-[#0d132d]/20 transition-all duration-500 md:h-16 md:w-16">
        <Arrow diagonal />
      </span>
    </a>
  )
}
