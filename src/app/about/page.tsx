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

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-5 self-start lg:sticky lg:top-36 about-section-label">
      <span>{number}</span>
      <p className="eyebrow">{children}</p>
    </div>
  )
}

export default function About() {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header />

      <div className="page-content">
        <section className="relative h-[100svh] min-h-[650px] overflow-hidden about-hero" aria-labelledby="about-hero-title">
          <HeroParallaxImage
            src={unsplash("1772140994501-a12bbc57a1e5")}
            alt="A U.S. Coast Guard helicopter and crew prepared for an Arctic mission"
            imageClassName="about-hero-image"
          />
          <div className="absolute inset-0 z-[1] about-hero-overlay" />
          <div className="relative z-10 flex h-full items-end pb-12 md:pb-16 site-gutter about-hero-content">
            <div className="max-w-4xl text-white">
              <h1 id="about-hero-title">Built for better performance.</h1>
              <div className="mt-8 flex items-center border-t border-white/35 pt-6 md:mt-10 about-hero-footer" data-reveal-line>
                <p>Service. Expertise. A shared commitment to the mission.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-intro-section" aria-labelledby="who-we-are-title">
          <div className="site-gutter">
            <div className="grid gap-12 lg:grid-cols-[minmax(190px,0.55fr)_minmax(0,1.7fr)] lg:gap-16 xl:gap-28 about-editorial-grid">
              <SectionLabel number="01">Who we are</SectionLabel>
              <div className="about-prose about-prose--lead">
                <h2 id="who-we-are-title">
                  Improving people, workplaces, and organizations since 2005.
                </h2>
                <p>
                  Harkcon is an internationally recognized, service-disabled veteran-owned business
                  providing organizational and workforce performance analysis, training,
                  intelligence analysis, and customized performance support to public- and
                  private-sector clients.
                </p>
                <p>
                  Founder and CEO Dr. Kevin Harkins established Harkcon in 2005 after retiring from
                  the U.S. Coast Guard and meeting other experienced military professionals through
                  his work in human performance and competency modeling. The company won its first
                  Coast Guard work in 2006, incorporated in Virginia in 2009, and has grown to more
                  than 100 employees and core contractors.
                </p>
                <p>
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

        <section className="border-t border-[#dedfe2] bg-white our-people-section" aria-labelledby="our-people-title">
          <div className="site-gutter">
            <div className="grid gap-12 lg:grid-cols-[minmax(190px,0.55fr)_minmax(0,1.7fr)] lg:gap-16 xl:gap-28 our-people-heading">
              <SectionLabel number="02">Our people</SectionLabel>
              <div>
                <h2 id="our-people-title">Experience that moves missions forward.</h2>
                <p>
                  Meet the leaders guiding Harkcon’s people, performance, technology, and growth.
                </p>
              </div>
            </div>

            <div className="mt-16 grid gap-x-7 gap-y-16 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-y-20 people-grid">
              {people.map((person) => (
                <article className="min-w-0 person-card" key={person.name}>
                  <div className="relative aspect-square overflow-hidden bg-[#eeefef] person-portrait">
                    <Image
                      src={person.image}
                      alt={`${person.name}, ${person.title}`}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                      style={{ objectPosition: person.imagePosition }}
                      className="object-cover"
                    />
                  </div>
                  <div className="border-t border-[#0d132d] pt-5 person-card-copy">
                    <h3>{person.name}</h3>
                    <p>{person.title}</p>
                    <details className="group">
                      <summary>
                        <span>Read bio</span>
                        <Plus aria-hidden="true" className="h-5 w-5 transition-transform duration-300 group-open:rotate-45" />
                      </summary>
                      <div className="pb-5 text-sm leading-relaxed text-[#555a66] person-bio">
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

        <section className="bg-[#0d132d] py-24 text-white md:py-32 lg:py-40 mission-vision-section" aria-labelledby="mission-title">
          <div className="site-gutter">
            <div className="border-b border-white/20 mission-vision-statements">
              <article className="grid gap-10 border-t border-white/20 py-12 md:grid-cols-[0.52fr_1.48fr] md:gap-16 md:py-16 lg:gap-24 purpose-statement">
                <div className="flex items-start gap-5 purpose-statement-label">
                  <span>01</span>
                  <p className="eyebrow text-white/55">Our mission</p>
                </div>
                <h2 id="mission-title">
                  To provide the highest quality, customized, and innovative organizational and
                  workforce performance solutions at the best value, while strictly adhering to our
                  guiding principles.
                </h2>
              </article>
              <article className="grid gap-10 border-t border-white/20 py-12 md:grid-cols-[0.52fr_1.48fr] md:gap-16 md:py-16 lg:gap-24 purpose-statement">
                <div className="flex items-start gap-5 purpose-statement-label">
                  <span>02</span>
                  <p className="eyebrow text-white/55">Our vision</p>
                </div>
                <h2>
                  Harkcon and its people are regarded as the best and most sought-after human
                  performance experts in the nation.
                </h2>
              </article>
            </div>
          </div>
        </section>

        <section className="pt-12 md:pt-16 lg:pt-20 principles-section" aria-labelledby="principles-title">
          <div className="grid gap-16 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.28fr)] lg:gap-20 xl:gap-28 site-gutter principles-layout">
            <div className="self-start lg:sticky lg:top-32 principles-sticky">
              <SectionLabel number="03">Guiding principles</SectionLabel>
              <div className="principles-intro">
                <h2 id="principles-title">The foundation for how we work.</h2>
                <p>
                  Our guiding principles shape our day-to-day efforts and guide our responsibilities
                  to our clients, our employees, and our communities.
                </p>
              </div>
            </div>
            <ol className="border-t border-[#0d132d]/20 principles-list">
              {guidingPrinciples.map((principle, index) => (
                <li key={principle} data-reveal-line>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{principle}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#f4f3f0] p-0 culture-section" aria-labelledby="culture-title">
          <div className="grid min-h-[92svh] w-full lg:grid-cols-2 culture-split">
            <div className="relative min-h-[60svh] overflow-hidden lg:min-h-[92svh] culture-image">
              <Image
                src={unsplash("1758599543116-4fdb887911a5")}
                alt="Three colleagues walking together outside their workplace"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center px-5 py-24 sm:px-8 md:py-28 lg:px-12 lg:py-32 xl:px-16 culture-copy">
              <SectionLabel number="04">Corporate culture</SectionLabel>
              <div className="about-prose">
                <h2 id="culture-title">Everyone has a voice. Every voice matters.</h2>
                <p>
                  We value different perspectives and build our culture around teamwork, trust, and
                  collaboration. Associates are empowered to identify problems, shape solutions, and
                  make decisions because their individual experience makes our work stronger.
                </p>
                <p>
                  Challenging work, professional growth, flexible scheduling, and accessible
                  leadership create a rewarding environment where people can excel while respecting
                  life beyond the office. At Harkcon, our associates matter.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 lg:py-40 community-section" aria-labelledby="community-title">
          <div className="site-gutter">
            <div className="grid gap-12 lg:grid-cols-[minmax(190px,0.55fr)_minmax(0,1.7fr)] lg:gap-16 xl:gap-28 community-heading">
              <SectionLabel number="05">Community &amp; responsibility</SectionLabel>
              <div className="community-intro">
                <h2 id="community-title">Service extends beyond our work.</h2>
                <p>
                  Built on years of service to our country and to others, Harkcon continues to give
                  its resources, time, and talent. We are proud to stand among the thousands of
                  companies that give back to their communities.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 h-[41svh] min-h-[312px] w-full overflow-hidden md:mt-20 md:h-[52svh] md:min-h-[408px] community-wide-image">
            <SubtleParallaxPhoto
              className="parallax-photo--community"
              label="Two volunteers pack food bags at a community distribution event"
              strength={110}
            />
          </div>

          <div className="site-gutter">
            <div className="grid gap-8 pt-14 md:pt-20 lg:grid-cols-2 lg:gap-16 xl:gap-28 community-support-copy">
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

            <div className="mt-16 border-t border-[#0d132d]/20 md:mt-20 community-support-dropdowns">
              <details name="community-support" className="group border-b border-[#0d132d]/20 community-support-dropdown">
                <summary aria-label="Show organizations receiving financial support">
                  <h3>Financial support</h3>
                  <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#0d132d]/20 transition-all duration-300 group-open:border-[#0d132d] group-open:bg-[#0d132d] group-open:text-white md:h-14 md:w-14">
                    <CaretDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
                  </span>
                </summary>
                <div className="community-support-dropdown-content">
                  <ul className="mt-8 grid gap-2.5 sm:grid-cols-2 community-pill-grid" data-reveal-sequence>
                    {supportedOrganizations.map((organization) => (
                      <li key={organization} data-reveal-item>
                        {organization}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
              <details name="community-support" className="group border-b border-[#0d132d]/20 community-support-dropdown">
                <summary aria-label="Show organizations supported through volunteer involvement">
                  <h3>Volunteer involvement</h3>
                  <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#0d132d]/20 transition-all duration-300 group-open:border-[#0d132d] group-open:bg-[#0d132d] group-open:text-white md:h-14 md:w-14">
                    <CaretDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
                  </span>
                </summary>
                <div className="community-support-dropdown-content">
                  <ul className="mt-8 grid gap-2.5 sm:grid-cols-2 community-pill-grid" data-reveal-sequence>
                    {volunteerOrganizations.map((organization) => (
                      <li key={organization} data-reveal-item>
                        {organization}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </section>

        <section className="bg-[#0d132d] text-white about-cta-section">
          <div className="flex flex-col items-start justify-between gap-10 py-20 md:flex-row md:items-end md:py-24 site-gutter about-cta-inner">
            <div>
              <p className="eyebrow mb-5 text-white/55">Work with Harkcon</p>
              <h2>Bring your next challenge to a team built to solve it.</h2>
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
