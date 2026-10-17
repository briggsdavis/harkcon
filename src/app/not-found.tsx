import Link from "next/link"
import { Arrow, Header, SiteFooter } from "~/components/home-page"

export default function NotFound() {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header initialSurface="light" />
      <div className="relative">
        <section
          className="flex min-h-[82svh] items-center pt-32 pb-20 md:pt-40 md:pb-28"
          aria-labelledby="not-found-title"
        >
          <div className="site-gutter grid items-end gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-16 lg:gap-24">
            <p
              className="font-header text-[clamp(7rem,20vw,18rem)] leading-[0.7] font-medium tracking-[-0.08em] text-pretty text-[#0d132d]/10"
              aria-hidden="true"
            >
              404
            </p>
            <div>
              <h1
                id="not-found-title"
                className="max-w-2xl font-header text-display font-medium text-balance"
              >
                This page is off mission.
              </h1>
              <p className="mt-7 max-w-xl text-body-copy text-pretty text-[#5f626b]">
                The page you are looking for may have moved or no longer exists.
              </p>
              <Link href="/" className="action-button mt-9">
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
