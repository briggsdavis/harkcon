import { Metadata } from "next"
import { Header, SiteFooter } from "~/components/home-page"

export const metadata: Metadata = {
  title: "Contract Vehicles",
  description: "Review Harkcon's federal contract vehicles, including OASIS+ and PACTS II.",
}

export default function Contracts() {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header initialSurface="light" />
      <div className="page-content">
        <section className="placeholder-page">
          <div className="site-gutter">
            <p className="eyebrow mb-6 text-[#5f626b]">Harkcon</p>
            <h1>Contracts</h1>
          </div>
        </section>
        <SiteFooter />
      </div>
    </div>
  )
}
