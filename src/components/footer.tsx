import Image from "next/image"
import { TransitionLink as Link } from "~/components/page-transition"

const footerLinks = [
  {
    title: "Explore",
    links: [
      { href: "/solutions", label: "Solutions" },
      { href: "/contracts", label: "Contract Vehicles" },
      { href: "/news-insights", label: "News & Insights" },
    ],
  },
  {
    title: "Harkcon",
    links: [
      { href: "/about", label: "About" },
      { href: "/leadership", label: "Leadership" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-brand-white">
      <div className="mx-auto max-w-360 px-6 pt-14 pb-7 sm:px-10 lg:pt-20">
        <div className="grid gap-8 border-b border-brand-white/20 pb-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 lg:pb-16">
          <div>
            <h2 className="max-w-4xl font-header text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Let's move the mission forward.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-brand-white/75">
              Tell us what your team needs. We'll help find a path forward.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center justify-center rounded-full bg-brand-gold px-7 py-3.5 font-semibold text-brand-navy transition-colors hover:bg-brand-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-white motion-reduce:transition-none"
          >
            Start a conversation
          </Link>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-[1fr_auto] sm:gap-20 lg:py-14">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="Harkcon home"
              className="inline-block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-white"
            >
              <Image src="/logo-white.svg" alt="" width={48} height={48} className="size-12" />
            </Link>
            <p className="mt-4 text-base leading-7 text-brand-white/70">
              Helping government agencies understand their workforce, build capability, and meet the
              mission ahead.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-12 sm:gap-x-20">
            {footerLinks.map(({ title, links }) => (
              <div key={title}>
                <h3 className="text-sm font-semibold text-brand-white">{title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-brand-white/70">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="rounded-sm transition-colors hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-white motion-reduce:transition-none"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-brand-white/20 pt-6 text-sm text-brand-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Harkcon. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link
              href="/privacy-terms"
              className="w-fit rounded-sm transition-colors hover:text-brand-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-white motion-reduce:transition-none"
            >
              Privacy Policy & Terms of Use
            </Link>
            <a
              href="https://socialsatisfaction.agency"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit rounded-sm transition-colors hover:text-brand-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-white motion-reduce:transition-none"
            >
              Made by Social Satisfaction
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
