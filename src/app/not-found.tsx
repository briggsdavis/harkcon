import Link from "next/link"
import { Arrow, Header, SiteFooter } from "~/components/home-page"

export default function NotFound() {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header initialSurface="light" />
      <div className="page-content">
        <section className="not-found-page" aria-labelledby="not-found-title">
          <div className="site-gutter not-found-inner">
            <p className="not-found-code" aria-hidden="true">
              404
            </p>
            <div>
              <p className="eyebrow mb-5 text-[#5f626b]">Page not found</p>
              <h1 id="not-found-title">This page is off mission.</h1>
              <p>The page you are looking for may have moved or no longer exists.</p>
              <Link href="/" className="pill-button mt-9">
                Back to home <Arrow />
              </Link>
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    </div>
  )
}
