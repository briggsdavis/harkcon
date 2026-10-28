import { CaretDown } from "@phosphor-icons/react/ssr"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import AboutProcess from "~/components/about-process"
import HeroParallaxImage from "~/components/hero-parallax-image"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import LeadershipTeams from "~/components/leadership-teams"
import SolutionsOverview from "~/components/solutions-overview"
import SubtleParallaxPhoto from "~/components/subtle-parallax-photo"
import ViewportCards from "~/components/viewport-cards"
import { keepClosingWords } from "~/lib/typography"

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=88`

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Harkcon, our people, history, mission, guiding principles, culture, and commitment to our communities.",
}

const guidingPrinciples = [
  "We put people first, treating everyone fairly while supporting professional growth and recognizing excellent work.",
  "We act with integrity, accountability, honesty, and consistency in every decision and business relationship.",
  "We listen closely to our clients, remain flexible, and stay focused on timely solutions to the problems that matter.",
  "We believe diverse perspectives, open communication, and active collaboration produce better results for our clients and our team.",
  "We serve our communities responsibly and build a workplace where people can enjoy succeeding together.",
]

const supportedOrganizations = [
  "American Cancer Society",
  "American Red Cross, Haitian Relief",
  "Bishop O’Connell High School",
  "Catholic Charities",
  "Coast Guard Foundation",
  "Connecticut Food Bank",
  "Ducks Unlimited",
  "Ferry Farm Baptist Church, Domestic Ministries",
  "Foundation for Coast Guard History",
  "LEAF, Ledyard Education Advancement Foundation",
  "Madonna Place",
  "Maryland Special Olympics",
  "Monterey High School Girls and Boys Soccer Teams",
  "Shark’s Baseball",
  "SmileTrain",
  "Stafford High School Baseball Boosters’ Club",
  "Young Life",
]

const volunteerOrganizations = [
  "AcademyWomen",
  "BEAM, Beaches Emergency Assistance Ministry",
  "Disabled American Veterans",
  "Fairfax Trails and Streams",
  "Fellowship of Christian Athletes",
  "Ferry Farm Baptist Church, Domestic Ministries",
  "Habitat for Humanity",
  "Immanuel Christian School",
  "Miriam’s Kitchen",
  "National Parks",
  "Toys for Tots",
  "United Service Organizations",
  "United Way",
  "Wounded Warrior Program at Walter Reed Army Medical Center",
]

const headingClassName = "text-balance max-w-4xl font-header text-section-title font-medium"
const proseClassName = "text-pretty mt-7 max-w-[850px] text-body-copy text-[#454955]"

function SectionLabel({
  number,
  children,
  className = "",
}: {
  number: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex items-start gap-5 self-start ${className}`}>
      <span className="font-eyebrow text-eyebrow-label tracking-[0.15em] text-[#8b8e96]">
        {number}
      </span>
      <p className="eyebrow leading-tight text-pretty">{children}</p>
    </div>
  )
}

export default function About() {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header />

      <div className="relative">
        <section className="relative h-[55svh] overflow-hidden" aria-labelledby="about-hero-title">
          <HeroParallaxImage
            src={unsplash("1772140994501-a12bbc57a1e5")}
            alt="A U.S. Coast Guard helicopter and crew prepared for an Arctic mission"
            imageClassName="scale-[1.015] object-cover object-[50%_42%]"
          />
          <div className="about-hero-overlay absolute inset-0 z-[1]" />
          <div className="site-gutter relative z-10 flex h-full items-end pb-12 md:pb-16">
            <div className="max-w-4xl text-white">
              <h1
                id="about-hero-title"
                className="max-w-3xl font-header text-display font-medium text-balance"
              >
                Built to&nbsp;perform.
              </h1>
              <div
                className="mt-8 flex items-center border-t border-white/35 pt-6 md:mt-10"
                data-reveal-line
              >
                <p className="max-w-xl text-sm leading-relaxed text-pretty text-white/80 md:text-base">
                  Service. Expertise. A shared commitment to the&nbsp;mission.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 lg:py-40" aria-labelledby="who-we-are-title">
          <div className="site-gutter">
            <div className="grid gap-12 lg:grid-cols-[minmax(190px,0.55fr)_minmax(0,1.7fr)] lg:gap-16 xl:gap-28">
              <SectionLabel number="01">Who we are</SectionLabel>
              <div>
                <h2 id="who-we-are-title" className={headingClassName}>
                  Improving performance since&nbsp;2005.
                </h2>
                <p className="mt-10 max-w-[850px] text-body-copy text-pretty text-[#0d132d]">
                  Harkcon is a service-disabled veteran-owned business providing workforce and
                  organizational analysis, training, intelligence analysis, and performance support.
                  We work with public- and private-sector clients to understand requirements and
                  improve how their organizations&nbsp;perform.
                </p>
                <p className={proseClassName}>
                  Founder and CEO Dr. Kevin Harkins established Harkcon in 2005 after retiring from
                  the U.S. Coast Guard and meeting other experienced military professionals through
                  his work in human performance and competency modeling. The company won its first
                  Coast Guard work in 2006, incorporated in Virginia in 2009, and has grown to more
                  than 100 employees and core&nbsp;contractors.
                </p>
                <p className={proseClassName}>
                  Today, our team supports organizations including the U.S. Coast Guard, Department
                  of Energy, Department of Homeland Security, Department of War, and Department of
                  State. Headquartered in Fredericksburg, Virginia, with associates in more than 15
                  states, we combine practical experience, disciplined analysis, and tools suited to
                  each requirement to improve workforce and organizational&nbsp;performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-t border-[#dedfe2] bg-white py-24 md:py-32 lg:py-40"
          aria-labelledby="our-people-title"
        >
          <div className="site-gutter">
            <p className="eyebrow mb-8">Our&nbsp;people</p>
            <h2 id="our-people-title" className={headingClassName}>
              Experience in&nbsp;action.
            </h2>
            <p className="mt-8 text-body-copy text-pretty text-[#5f626b]">
              Our people bring firsthand mission experience, deep technical expertise, and a shared
              commitment to service. From veterans and workforce analysts to training specialists
              and technology professionals, we work together to understand each client’s challenges
              and turn insight into practical results. We invest in one another’s growth, welcome
              different perspectives, and take pride in helping the organizations we serve perform
              at their&nbsp;best.
            </p>
          </div>
        </section>

        <section
          className="bg-[#0d132d] py-24 text-white md:py-32 lg:py-40"
          aria-labelledby="mission-title"
        >
          <div className="site-gutter">
            <div className="border-b border-white/20">
              <ViewportCards>
                {" "}
                <article
                  data-center-card
                  className="group relative isolate grid gap-10 overflow-hidden border-t border-white/20 py-12 transition-[color,padding] delay-0 duration-700 ease-out before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-700 hover:px-6 hover:text-[#0d132d] hover:before:scale-x-100 data-[center-active=true]:px-6 data-[center-active=true]:text-[#0d132d] data-[center-active=true]:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none md:grid-cols-[0.52fr_1.48fr] md:gap-16 md:py-16 lg:gap-24 lg:hover:px-10"
                >
                  <div className="flex items-start gap-5">
                    <span className="font-eyebrow text-eyebrow-label tracking-[0.15em] text-brand-gold transition-colors duration-700 group-hover:text-[#0d132d]/70 group-data-[center-active=true]:text-[#0d132d]/70">
                      01
                    </span>
                    <p className="eyebrow text-pretty text-brand-gold transition-colors duration-700 group-hover:text-[#0d132d]/70 group-data-[center-active=true]:text-[#0d132d]/70">
                      Our&nbsp;mission
                    </p>
                  </div>
                  <h2
                    id="mission-title"
                    className="max-w-5xl font-header text-section-title text-balance"
                  >
                    To provide the highest quality, customized, and innovative organizational and
                    workforce performance solutions at the best value, while strictly adhering to
                    our guiding&nbsp;principles.
                  </h2>
                </article>
                <article
                  data-center-card
                  className="group relative isolate grid gap-10 overflow-hidden border-t border-white/20 py-12 transition-[color,padding] delay-0 duration-700 ease-out before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-700 hover:px-6 hover:text-[#0d132d] hover:before:scale-x-100 data-[center-active=true]:px-6 data-[center-active=true]:text-[#0d132d] data-[center-active=true]:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none md:grid-cols-[0.52fr_1.48fr] md:gap-16 md:py-16 lg:gap-24 lg:hover:px-10"
                >
                  <div className="flex items-start gap-5">
                    <span className="font-eyebrow text-eyebrow-label tracking-[0.15em] text-brand-gold transition-colors duration-700 group-hover:text-[#0d132d]/70 group-data-[center-active=true]:text-[#0d132d]/70">
                      02
                    </span>
                    <p className="eyebrow text-pretty text-brand-gold transition-colors duration-700 group-hover:text-[#0d132d]/70 group-data-[center-active=true]:text-[#0d132d]/70">
                      Our&nbsp;vision
                    </p>
                  </div>
                  <h2 className="max-w-5xl font-header text-section-title text-balance">
                    Harkcon and its people are regarded as the best and most sought-after human
                    performance experts in the&nbsp;nation.
                  </h2>
                </article>
              </ViewportCards>
            </div>
          </div>
        </section>

        <section
          className="pt-12 pb-24 md:pt-16 md:pb-32 lg:pt-20 lg:pb-40"
          aria-labelledby="principles-title"
        >
          <div className="site-gutter grid gap-12">
            <div className="self-start">
              <SectionLabel number="03" className="mb-10">
                Guiding principles
              </SectionLabel>
              <div>
                <h2 id="principles-title" className={headingClassName}>
                  The foundation for how we&nbsp;work.
                </h2>
                <p className="mt-7 max-w-2xl text-body-copy text-pretty text-[#5f626b]">
                  Our guiding principles shape our day-to-day efforts and guide our responsibilities
                  to our clients, our employees, and our&nbsp;communities.
                </p>
              </div>
            </div>
            <ol className="border-t border-[#0d132d]/20">
              {guidingPrinciples.map((principle, index) => (
                <li
                  key={principle}
                  className="grid grid-cols-[42px_1fr] gap-4 py-7 md:grid-cols-[64px_1fr] md:gap-8 md:py-9"
                  data-reveal-line
                >
                  <span className="pt-1 font-eyebrow text-eyebrow-label tracking-[0.12em] text-[#8b8e96]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-header text-card-title text-pretty">
                    {keepClosingWords(principle)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <LeadershipTeams />
        <SolutionsOverview />
        <AboutProcess />

        <section className="bg-[#f4f3f0]" aria-labelledby="culture-title">
          <div className="grid min-h-[92svh] w-full lg:grid-cols-2">
            <div className="relative min-h-[60svh] overflow-hidden lg:min-h-[92svh]">
              <Image
                src={unsplash("1758599543116-4fdb887911a5")}
                alt="Three colleagues walking together outside their workplace"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center px-5 py-24 sm:px-8 md:py-28 lg:px-12 lg:py-32 xl:px-16">
              <SectionLabel number="04" className="mb-12">
                Corporate culture
              </SectionLabel>
              <div>
                <h2 id="culture-title" className={headingClassName}>
                  Every voice&nbsp;matters.
                </h2>
                <p className={proseClassName}>
                  We value different perspectives and build our culture around teamwork, trust, and
                  collaboration. Associates are empowered to identify problems, shape solutions, and
                  make decisions because their individual experience makes our work&nbsp;stronger.
                </p>
                <p className={proseClassName}>
                  Challenging work, professional growth, flexible scheduling, and accessible
                  leadership create a rewarding environment where people can excel while respecting
                  life beyond the office. At Harkcon, our associates&nbsp;matter.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 lg:py-40" aria-labelledby="community-title">
          <div className="site-gutter">
            <div className="grid gap-12 lg:grid-cols-[minmax(190px,0.55fr)_minmax(0,1.7fr)] lg:gap-16 xl:gap-28">
              <SectionLabel number="05">Community &amp;&nbsp;responsibility</SectionLabel>
              <div>
                <h2 id="community-title" className={headingClassName}>
                  Service extends beyond our&nbsp;work.
                </h2>
              </div>
            </div>
            <p className="mt-9 text-body-copy text-pretty text-[#0d132d]">
              Our commitment to service extends to the communities where we live and work. Harkcon
              contributes funding, professional support, and volunteer time, and supports associates
              who give their skills and time to local&nbsp;organizations.
            </p>
          </div>

          <div className="mt-14 h-[41svh] min-h-[312px] w-full overflow-hidden md:mt-20 md:h-[52svh] md:min-h-[408px]">
            <SubtleParallaxPhoto
              src="/images/about-community.jpg"
              sizeClassName="bg-size-[auto_125%]"
              label="Two volunteers pack food bags at a community distribution event"
              strength={110}
            />
          </div>

          <div className="site-gutter">
            <div className="grid gap-8 pt-14 text-body-copy text-[#454955] md:pt-20 lg:grid-cols-2 lg:gap-16 xl:gap-28">
              <p>
                Harkcon provides ongoing financial, professional, and volunteer support to Hope For
                The Warriors™, a 501(c)(3) organization dedicated to enhancing the quality of life
                for U.S. service members and families affected by injuries or death in the line of
                duty. Its work helps ensure the sacrifices and needs of wounded and fallen warriors
                and their families are never&nbsp;forgotten.
              </p>
              <p>
                We also support team members’ community involvement through flexible work schedules
                and recognition programs, making it easier for our people to contribute directly to
                the causes that matter to&nbsp;them.
              </p>
            </div>

            <div className="mt-16 border-t border-[#0d132d]/20 md:mt-20">
              <details
                name="community-support"
                className="disclosure group border-b border-[#0d132d]/20"
              >
                <summary
                  aria-label="Show organizations receiving financial support"
                  className="group/summary flex cursor-pointer list-none items-center justify-between gap-8 py-8 md:py-10"
                >
                  <h3 className="relative font-header text-card-title font-medium text-balance after:pointer-events-none after:absolute after:-bottom-2 after:left-0 after:h-px after:w-8 after:origin-left after:scale-x-0 after:bg-brand-red after:transition-transform after:duration-200 group-hover/summary:after:scale-x-100 group-focus-visible/summary:after:scale-x-100 motion-reduce:after:transition-none">
                    Financial&nbsp;support
                  </h3>
                  <span
                    aria-hidden="true"
                    className="control-fill flex h-12 w-12 shrink-0 items-center justify-center rounded-none border border-[#0d132d]/20 group-open:border-[#0d132d] md:h-14 md:w-14"
                  >
                    <CaretDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
                  </span>
                </summary>
                <div>
                  <ul className="mt-8 grid gap-2.5 pb-10 sm:grid-cols-2" data-reveal-sequence>
                    {supportedOrganizations.map((organization) => (
                      <li
                        key={organization}
                        className="flex min-h-14 items-center rounded-full border border-[#0d132d]/14 bg-[#f4f3f0] px-5 py-3 text-sm leading-snug text-[#454955]"
                        data-reveal-item
                      >
                        {organization}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
              <details
                name="community-support"
                className="disclosure group border-b border-[#0d132d]/20"
              >
                <summary
                  aria-label="Show organizations supported through volunteer involvement"
                  className="group/summary flex cursor-pointer list-none items-center justify-between gap-8 py-8 md:py-10"
                >
                  <h3 className="relative font-header text-card-title font-medium text-balance after:pointer-events-none after:absolute after:-bottom-2 after:left-0 after:h-px after:w-8 after:origin-left after:scale-x-0 after:bg-brand-red after:transition-transform after:duration-200 group-hover/summary:after:scale-x-100 group-focus-visible/summary:after:scale-x-100 motion-reduce:after:transition-none">
                    Volunteer&nbsp;involvement
                  </h3>
                  <span
                    aria-hidden="true"
                    className="control-fill flex h-12 w-12 shrink-0 items-center justify-center rounded-none border border-[#0d132d]/20 group-open:border-[#0d132d] md:h-14 md:w-14"
                  >
                    <CaretDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
                  </span>
                </summary>
                <div>
                  <ul className="mt-8 grid gap-2.5 pb-10 sm:grid-cols-2" data-reveal-sequence>
                    {volunteerOrganizations.map((organization) => (
                      <li
                        key={organization}
                        className="flex min-h-14 items-center rounded-full border border-[#0d132d]/14 bg-[#f4f3f0] px-5 py-3 text-sm leading-snug text-[#454955]"
                        data-reveal-item
                      >
                        {organization}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </section>

        <section className="bg-[#0d132d] text-white">
          <div className="site-gutter flex flex-col items-start justify-between gap-10 py-20 md:flex-row md:items-end md:py-24">
            <div>
              <h2 className="max-w-4xl font-header text-section-title text-balance">
                Bring your next challenge to a team built to solve&nbsp;it.
              </h2>
            </div>
            <Link href="/contact" className="action-button action-button--light shrink-0">
              Start a conversation <Arrow />
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}
