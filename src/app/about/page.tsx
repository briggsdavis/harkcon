import { CaretDown, Plus } from "@phosphor-icons/react/ssr"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import HeroParallaxImage from "~/components/hero-parallax-image"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import SubtleParallaxPhoto from "~/components/subtle-parallax-photo"

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

const people = [
  {
    name: "Kevin Harkins, Ph.D.",
    title: "Chief Executive Officer",
    image: "/images/kevin-harkins.jpeg",
    imagePosition: "50% 34%",
    bio: [
      "Dr. Harkins leads Harkcon’s overall direction and success, working with the Board of Directors to establish and oversee the company’s long-range goals, strategies, plans, and policies.",
      "He brings more than 30 years of public- and private-sector leadership experience, with deep expertise in workforce analysis, competency management, strategic planning, organizational assessment, training, performance evaluation, and organizational design.",
    ],
  },
  {
    name: "Brittany Hammond",
    title: "Workforce Analysis & Training Program Manager",
    image: "/images/brittany-hammond.jpeg",
    imagePosition: "50% 34%",
    bio: [
      "Brittany manages Harkcon’s U.S. Coast Guard portfolio, overseeing training and workforce analysis contracts supporting domestic and overseas operations. Her background spans instructional design, human performance technology, and program management.",
      "A Coast Guard veteran and former intelligence analyst, she earned a B.S. in Government from the U.S. Coast Guard Academy and an M.S. in Education from Old Dominion University. She also coaches middle school basketball and serves on a preschool board.",
    ],
  },
  {
    name: "Jim Davis",
    title: "Chief Human Capital Officer",
    image: "/images/jim-davis.jpeg",
    imagePosition: "50% 30%",
    bio: [
      "Jim leads Harkcon’s human capital strategy, workforce development, and employee engagement programs, aligning talent priorities with the company’s mission, culture, and long-term growth.",
      "He brings more than 30 years of executive leadership and federal human capital experience across the Departments of Homeland Security and Veterans Affairs. Jim joined Harkcon in 2026 after serving as a Senior Human Capital Consultant at Serco.",
    ],
  },
  {
    name: "Paula Harkins",
    title: "Chief Growth Officer",
    image: "/images/paula-harkins.png",
    imagePosition: "50% 34%",
    bio: [
      "Paula leads strategies that expand Harkcon’s federal-sector impact and drive sustainable growth. She works with senior leaders and partners to identify opportunities, strengthen organizational capacity, and deliver solutions that improve workforce performance and mission outcomes.",
      "A Lean Six Sigma Black Belt and member of AERA, SHRM, and ISPI, Paula is also an international speaker on leadership, performance improvement, and organizational transformation.",
    ],
  },
  {
    name: "Mohammad Khan",
    title: "Chief Director of IT",
    image: "/images/mohammad-khan.png",
    imagePosition: "50% 50%",
    bio: [
      "Mohammad leads Harkcon’s IT security initiatives and cloud solutions, overseeing cloud systems, applications, and data security while keeping the company operational and aligned with industry standards.",
      "He joined Harkcon in 2020 as a Cloud Systems Administrator and holds a bachelor’s degree in Management Information Systems with a focus on the systems development lifecycle.",
    ],
  },
]

const headingClassName = "max-w-4xl font-header text-section-title font-medium"
const proseClassName = "mt-7 max-w-[850px] text-body-copy text-[#454955]"

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
    <div className={`flex items-start gap-5 self-start lg:sticky lg:top-36 ${className}`}>
      <span className="font-eyebrow text-eyebrow-label tracking-[0.15em] text-[#8b8e96]">
        {number}
      </span>
      <p className="eyebrow leading-tight">{children}</p>
    </div>
  )
}

export default function About() {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header />

      <div className="relative">
        <section
          className="relative h-[100svh] min-h-[650px] overflow-hidden"
          aria-labelledby="about-hero-title"
        >
          <HeroParallaxImage
            src={unsplash("1772140994501-a12bbc57a1e5")}
            alt="A U.S. Coast Guard helicopter and crew prepared for an Arctic mission"
            imageClassName="scale-[1.015] object-cover object-[50%_42%]"
          />
          <div className="about-hero-overlay absolute inset-0 z-[1]" />
          <div className="site-gutter relative z-10 flex h-full items-end pb-12 md:pb-16">
            <div className="max-w-4xl text-white">
              <h1 id="about-hero-title" className="max-w-3xl font-header text-display font-medium">
                Built for better performance.
              </h1>
              <div
                className="mt-8 flex items-center border-t border-white/35 pt-6 md:mt-10"
                data-reveal-line
              >
                <p className="max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                  Service. Expertise. A shared commitment to the mission.
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
                  Improving people, workplaces, and organizations since 2005.
                </h2>
                <p className="mt-10 max-w-[850px] text-body-copy text-[#0d132d]">
                  Harkcon is an internationally recognized, service-disabled veteran-owned business
                  providing organizational and workforce performance analysis, training,
                  intelligence analysis, and customized performance support to public- and
                  private-sector clients.
                </p>
                <p className={proseClassName}>
                  Founder and CEO Dr. Kevin Harkins established Harkcon in 2005 after retiring from
                  the U.S. Coast Guard and meeting other experienced military professionals through
                  his work in human performance and competency modeling. The company won its first
                  Coast Guard work in 2006, incorporated in Virginia in 2009, and has grown to more
                  than 100 employees and core contractors.
                </p>
                <p className={proseClassName}>
                  Today, our team supports organizations including the U.S. Coast Guard, Department
                  of Energy, Department of Homeland Security, Department of Defense, and Department
                  of State. Headquartered in Fredericksburg, Virginia, with associates in more than
                  15 states, we combine practical experience, disciplined analysis, and innovative
                  tools to improve people, workplaces, and organizations of every size.
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
            <div className="grid gap-12 lg:grid-cols-[minmax(190px,0.55fr)_minmax(0,1.7fr)] lg:gap-16 xl:gap-28">
              <SectionLabel number="02">Our people</SectionLabel>
              <div>
                <h2 id="our-people-title" className={headingClassName}>
                  Experience that moves missions forward.
                </h2>
                <p className="mt-6 max-w-2xl text-body-copy text-[#5f626b]">
                  Meet the leaders guiding Harkcon’s people, performance, technology, and growth.
                </p>
              </div>
            </div>

            <div className="mt-16 grid gap-x-7 gap-y-16 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-y-20">
              {people.map((person) => (
                <article className="min-w-0" key={person.name}>
                  <div className="relative aspect-square overflow-hidden bg-[#eeefef]">
                    <Image
                      src={person.image}
                      alt={`${person.name}, ${person.title}`}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                      style={{ objectPosition: person.imagePosition }}
                      className="object-cover"
                    />
                  </div>
                  <div className="border-t border-[#0d132d] pt-5">
                    <h3 className="font-header text-card-title font-medium">{person.name}</h3>
                    <p className="mt-2 min-h-10 text-sm leading-relaxed text-[#5f626b]">
                      {person.title}
                    </p>
                    <details className="disclosure group mt-5 border-t border-[#dedfe2]">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xs font-semibold tracking-[0.08em] uppercase">
                        <span>Read bio</span>
                        <Plus
                          aria-hidden="true"
                          className="h-5 w-5 transition-transform duration-300 group-open:rotate-45"
                        />
                      </summary>
                      <div className="space-y-4 pb-5 text-sm leading-relaxed text-[#555a66]">
                        {person.bio.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </details>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="bg-[#0d132d] py-24 text-white md:py-32 lg:py-40"
          aria-labelledby="mission-title"
        >
          <div className="site-gutter">
            <div className="border-b border-white/20">
              <article className="group grid gap-10 border-t border-white/20 py-12 md:grid-cols-[0.52fr_1.48fr] md:gap-16 md:py-16 lg:gap-24">
                <div className="flex items-start gap-5">
                  <span className="font-eyebrow text-eyebrow-label tracking-[0.15em] text-white/35">
                    01
                  </span>
                  <p className="eyebrow text-white/55">Our mission</p>
                </div>
                <h2
                  id="mission-title"
                  className="max-w-5xl font-header text-section-title transition-transform duration-500 ease-out group-hover:translate-x-3"
                >
                  To provide the highest quality, customized, and innovative organizational and
                  workforce performance solutions at the best value, while strictly adhering to our
                  guiding principles.
                </h2>
              </article>
              <article className="group grid gap-10 border-t border-white/20 py-12 md:grid-cols-[0.52fr_1.48fr] md:gap-16 md:py-16 lg:gap-24">
                <div className="flex items-start gap-5">
                  <span className="font-eyebrow text-eyebrow-label tracking-[0.15em] text-white/35">
                    02
                  </span>
                  <p className="eyebrow text-white/55">Our vision</p>
                </div>
                <h2 className="max-w-5xl font-header text-section-title transition-transform duration-500 ease-out group-hover:translate-x-3">
                  Harkcon and its people are regarded as the best and most sought-after human
                  performance experts in the nation.
                </h2>
              </article>
            </div>
          </div>
        </section>

        <section
          className="pt-12 pb-24 md:pt-16 md:pb-32 lg:pt-20 lg:pb-40"
          aria-labelledby="principles-title"
        >
          <div className="site-gutter grid gap-16 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.28fr)] lg:gap-20 xl:gap-28">
            <div className="self-start lg:sticky lg:top-32">
              <SectionLabel number="03" className="mb-10">
                Guiding principles
              </SectionLabel>
              <div>
                <h2 id="principles-title" className={headingClassName}>
                  The foundation for how we work.
                </h2>
                <p className="mt-7 max-w-2xl text-body-copy text-[#5f626b]">
                  Our guiding principles shape our day-to-day efforts and guide our responsibilities
                  to our clients, our employees, and our communities.
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
                  <p className="max-w-4xl font-header text-card-title">{principle}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

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
                  Everyone has a voice. Every voice matters.
                </h2>
                <p className={proseClassName}>
                  We value different perspectives and build our culture around teamwork, trust, and
                  collaboration. Associates are empowered to identify problems, shape solutions, and
                  make decisions because their individual experience makes our work stronger.
                </p>
                <p className={proseClassName}>
                  Challenging work, professional growth, flexible scheduling, and accessible
                  leadership create a rewarding environment where people can excel while respecting
                  life beyond the office. At Harkcon, our associates matter.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 lg:py-40" aria-labelledby="community-title">
          <div className="site-gutter">
            <div className="grid gap-12 lg:grid-cols-[minmax(190px,0.55fr)_minmax(0,1.7fr)] lg:gap-16 xl:gap-28">
              <SectionLabel number="05">Community &amp; responsibility</SectionLabel>
              <div>
                <h2 id="community-title" className={headingClassName}>
                  Service extends beyond our work.
                </h2>
                <p className="mt-9 max-w-[850px] text-body-copy text-[#0d132d]">
                  Built on years of service to our country and to others, Harkcon continues to give
                  its resources, time, and talent. We are proud to stand among the thousands of
                  companies that give back to their communities.
                </p>
              </div>
            </div>
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
                and their families are never forgotten.
              </p>
              <p>
                We also support team members’ community involvement through flexible work schedules
                and recognition programs, making it easier for our people to contribute directly to
                the causes that matter to them.
              </p>
            </div>

            <div className="mt-16 border-t border-[#0d132d]/20 md:mt-20">
              <details
                name="community-support"
                className="disclosure group border-b border-[#0d132d]/20"
              >
                <summary
                  aria-label="Show organizations receiving financial support"
                  className="flex cursor-pointer list-none items-center justify-between gap-8 py-8 md:py-10"
                >
                  <h3 className="font-header text-card-title font-medium">Financial support</h3>
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#0d132d]/20 transition-all duration-300 group-open:border-[#0d132d] group-open:bg-[#0d132d] group-open:text-white md:h-14 md:w-14"
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
                  className="flex cursor-pointer list-none items-center justify-between gap-8 py-8 md:py-10"
                >
                  <h3 className="font-header text-card-title font-medium">Volunteer involvement</h3>
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#0d132d]/20 transition-all duration-300 group-open:border-[#0d132d] group-open:bg-[#0d132d] group-open:text-white md:h-14 md:w-14"
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
              <p className="eyebrow mb-5 text-white/55">Work with Harkcon</p>
              <h2 className="max-w-4xl font-header text-section-title">
                Bring your next challenge to a team built to solve it.
              </h2>
            </div>
            <Link href="/contact" className="pill-button pill-button--light shrink-0">
              Start a conversation <Arrow />
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}
