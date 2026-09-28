import { Metadata } from "next"
import Image from "next/image"
import HeroImage from "~/components/hero-image"
import { TransitionLink as Link } from "~/components/page-transition"
import ServiceGrid from "~/components/service-grid"

export const metadata: Metadata = {
  title: { absolute: "Harkcon" },
  description:
    "Harkcon improves workforce and organizational performance through expert consulting, technology, and mission-focused solutions.",
}

export default function Home() {
  return (
    <>
      <section className="relative min-h-svh overflow-hidden pt-20">
        <HeroImage />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-360 flex-col justify-end px-6 pb-16 text-brand-white lg:px-10 lg:pb-24">
          <h1 className="max-w-4xl font-header text-5xl leading-tight font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            People make the mission.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
            Harkcon helps government agencies understand their workforce, strengthen its
            capabilities, and make better decisions about the work ahead.
          </p>
          <Link
            href="/solutions"
            className="mt-8 w-fit rounded-full bg-brand-gold px-6 py-3 text-base font-semibold text-brand-navy transition-colors hover:bg-brand-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-white motion-reduce:transition-none"
          >
            Explore Solutions
          </Link>
        </div>
      </section>

      <section aria-labelledby="coast-guard-work" className="bg-brand-surface text-brand-ink">
        <div className="grid lg:min-h-195 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-16 lg:py-28 xl:px-24">
            <h2
              id="coast-guard-work"
              className="max-w-xl font-header text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl xl:text-6xl"
            >
              A clearer picture of the people behind the mission.
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-8">
              Since 2007, Harkcon has helped the U.S. Coast Guard understand the people and skills
              its missions require. Our analyses turn complex operational demands into practical
              workforce decisions.
            </p>
            <div className="mt-12 border-t border-brand-ink/20 pt-8">
              <p className="font-header text-7xl leading-none tracking-tight text-brand-navy sm:text-8xl">
                40+
              </p>
              <p className="mt-3 text-base leading-7">
                workforce requirements analyses
                <br />
                completed for the Coast Guard
              </p>
            </div>
            <Link
              href="/solutions"
              className="mt-12 w-fit border-b-2 border-brand-gold pb-1 text-base font-semibold text-brand-navy transition-colors hover:border-brand-navy focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy motion-reduce:transition-none"
            >
              Explore our solutions
            </Link>
          </div>

          <div className="relative min-h-140 overflow-hidden lg:min-h-full">
            <Image
              src="/coast-guard-patrol-vessel.jpg"
              alt="Close view of a U.S. Coast Guard patrol vessel beneath a blue sky"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[62%_center]"
            />
          </div>
        </div>
      </section>
      <section aria-labelledby="why-harkcon" className="bg-brand-white text-brand-ink">
        <div className="mx-auto grid max-w-360 gap-10 px-6 py-24 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20 lg:py-36">
          <h2
            id="why-harkcon"
            className="max-w-3xl font-header text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl xl:text-6xl"
          >
            Built by people who know the mission.
          </h2>
          <div className="max-w-xl">
            <p className="text-lg leading-8 sm:text-xl sm:leading-9">
              Founded in 2005 by a retired Coast Guard officer and fellow veterans, Harkcon brings
              firsthand government experience to workforce analysis, training, and emergency
              management for federal agencies.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block border-b-2 border-brand-gold pb-1 font-semibold text-brand-navy transition-colors hover:border-brand-navy focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy motion-reduce:transition-none"
            >
              About Harkcon
            </Link>
          </div>
        </div>
      </section>
      <ServiceGrid />
      <section aria-labelledby="work-with-harkcon" className="bg-brand-white text-brand-ink">
        <div className="mx-auto grid max-w-360 gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:py-32">
          <div className="max-w-xl">
            <h2
              id="work-with-harkcon"
              className="font-header text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl xl:text-6xl"
            >
              Work with Harkcon.
            </h2>
            <p className="mt-7 text-lg leading-8 sm:text-xl sm:leading-9">
              Federal agencies can access our services through established contract vehicles. Tell
              us what your mission needs, and we can help identify a path forward.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex rounded-full bg-brand-navy px-6 py-3 text-base font-semibold text-brand-white transition-colors hover:bg-brand-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy motion-reduce:transition-none"
            >
              Discuss a requirement
            </Link>
          </div>

          <div>
            <div className="border-t border-brand-ink/20 py-8">
              <h3 className="font-header text-2xl font-semibold sm:text-3xl">
                GSA Multiple Award Schedule
              </h3>
              <p className="mt-3 max-w-lg text-base leading-7">
                Management consulting and professional development training.
              </p>
            </div>
            <div className="border-t border-brand-ink/20 py-8">
              <h3 className="font-header text-2xl font-semibold sm:text-3xl">OASIS+</h3>
              <p className="mt-3 max-w-lg text-base leading-7">
                Professional services through the Small Business and Service-Disabled Veteran-Owned
                Small Business pools.
              </p>
            </div>
            <Link
              href="/contracts"
              className="mt-3 inline-block border-b-2 border-brand-gold pb-1 font-semibold text-brand-navy transition-colors hover:border-brand-navy focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy motion-reduce:transition-none"
            >
              View contract vehicles
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
