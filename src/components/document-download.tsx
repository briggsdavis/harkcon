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
      <span className="document-download-type">PDF</span>
      <span className="document-download-copy">
        <span className="eyebrow text-[#8b8e96]">Contract document</span>
        <strong>{title}</strong>
        <span>{description}</span>
      </span>
      <span className="document-download-action">
        <Arrow diagonal />
      </span>
    </a>
  )
}
