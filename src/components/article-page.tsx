import { ArrowLeft } from "@phosphor-icons/react/ssr"
import Image from "next/image"
import Link from "next/link"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import PublicationMeta from "~/components/publication-meta"
import type { NewsArticle } from "~/lib/news"

export default function ArticlePage({
  article,
  related,
}: {
  article: NewsArticle
  related: NewsArticle[]
}) {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header initialSurface="light" />
      <div className="relative">
        <article className="pt-36 pb-24 md:pt-40 md:pb-32">
          <div className="site-gutter">
            <Link
              href="/news-insights"
              className="mx-auto mb-8 flex w-full max-w-[900px] items-center gap-3 text-sm text-[#5f626b] transition-colors hover:text-[#0d132d]"
            >
              <ArrowLeft aria-hidden="true" /> All news
            </Link>
            <div className="relative mx-auto aspect-[16/9] w-full max-w-[900px] overflow-hidden md:aspect-[16/8]">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                unoptimized
                priority
                sizes="(min-width: 1200px) 1400px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mx-auto max-w-[900px] pt-12 md:pt-16">
              <PublicationMeta
                date={article.date}
                displayDate={article.displayDate}
                category={article.category}
              />
              <h1 className="mt-6 font-header text-display font-medium">{article.title}</h1>
            </div>
            <div className="mx-auto max-w-[900px] pt-10 md:pt-12">
              {article.body.map((paragraph) => (
                <p key={paragraph} className="mb-6 text-body-copy text-[#333744]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        <section className="bg-[#f4f3f0] py-20 md:py-28" aria-labelledby="related-news-title">
          <div className="site-gutter">
            <div
              className="flex flex-col justify-between gap-8 pt-8 md:flex-row md:items-end"
              data-reveal-line
            >
              <div>
                <p className="eyebrow mb-4 text-[#5f626b]">Continue reading</p>
                <h2 id="related-news-title" className="font-header text-section-title">
                  More from Harkcon
                </h2>
              </div>
              <Link href="/news-insights" className="text-link" data-reveal-line>
                View all news <Arrow />
              </Link>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  href={`/news-insights/${item.slug}`}
                  key={item.slug}
                  className="group block pt-5"
                  data-reveal-line
                >
                  <div className="relative aspect-[4/3] overflow-hidden [--image-wipe-color:#f4f3f0]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      unoptimized
                      sizes="(min-width: 900px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                  </div>
                  <time
                    dateTime={item.date}
                    className="mt-5 block font-eyebrow text-eyebrow-label tracking-[0.11em] text-[#5f626b] uppercase"
                  >
                    {item.displayDate}
                  </time>
                  <h3 className="mt-3 font-header text-card-title">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    </div>
  )
}
