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
    image: "/images/kevinharkins.jpeg",
    imagePosition: "50% 34%",
    bio: [
      "Dr. Harkins leads Harkcon’s overall direction and success, working with the Board of Directors to establish and oversee the company’s long-range goals, strategies, plans, and policies.",
      "He brings more than 30 years of public- and private-sector leadership experience, with deep expertise in workforce analysis, competency management, strategic planning, organizational assessment, training, performance evaluation, and organizational design.",
    ],
  },
  {
    name: "Brittany Hammond",
    title: "Workforce Analysis & Training Program Manager",
    image: "/images/brittany hammond.jpeg",
    imagePosition: "50% 34%",
    bio: [
      "Brittany manages Harkcon’s U.S. Coast Guard portfolio, overseeing training and workforce analysis contracts supporting domestic and overseas operations. Her background spans instructional design, human performance technology, and program management.",
      "A Coast Guard veteran and former intelligence analyst, she earned a B.S. in Government from the U.S. Coast Guard Academy and an M.S. in Education from Old Dominion University. She also coaches middle school basketball and serves on a preschool board.",
    ],
  },
  {
    name: "Jim Davis",
    title: "Chief Human Capital Officer",
    image: "/images/jimdavis.jpeg",
    imagePosition: "50% 30%",
    bio: [
      "Jim leads Harkcon’s human capital strategy, workforce development, and employee engagement programs, aligning talent priorities with the company’s mission, culture, and long-term growth.",
      "He brings more than 30 years of executive leadership and federal human capital experience across the Departments of Homeland Security and Veterans Affairs. Jim joined Harkcon in 2026 after serving as a Senior Human Capital Consultant at Serco.",
    ],
  },
  {
    name: "Paula Harkins",
    title: "Chief Growth Officer",
    image: "/images/paula harkins.png",
    imagePosition: "50% 34%",
    bio: [
      "Paula leads strategies that expand Harkcon’s federal-sector impact and drive sustainable growth. She works with senior leaders and partners to identify opportunities, strengthen organizational capacity, and deliver solutions that improve workforce performance and mission outcomes.",
      "A Lean Six Sigma Black Belt and member of AERA, SHRM, and ISPI, Paula is also an international speaker on leadership, performance improvement, and organizational transformation.",
    ],
  },
  {
    name: "Mohammad Khan",
    title: "Chief Director of IT",
    image: "/images/Screenshot 2026-09-27 at 13.34.58.png",
    imagePosition: "50% 50%",
    bio: [
      "Mohammad leads Harkcon’s IT security initiatives and cloud solutions, overseeing cloud systems, applications, and data security while keeping the company operational and aligned with industry standards.",
      "He joined Harkcon in 2020 as a Cloud Systems Administrator and holds a bachelor’s degree in Management Information Systems with a focus on the systems development lifecycle.",
    ],
  },
]

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="about-section-label">
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
        <section className="about-hero" aria-labelledby="about-hero-title">
          <HeroParallaxImage
            src={unsplash("1772140994501-a12bbc57a1e5")}
            alt="A U.S. Coast Guard helicopter and crew prepared for an Arctic mission"
            imageClassName="about-hero-image"
          />
          <div className="about-hero-overlay" />
          <div className="site-gutter about-hero-content">
            <div className="max-w-4xl text-white">
              <h1 id="about-hero-title">Built for better performance.</h1>
              <div className="about-hero-footer" data-reveal-line>
                <p>Service. Expertise. A shared commitment to the mission.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-intro-section" aria-labelledby="who-we-are-title">
          <div className="site-gutter">
            <div className="about-editorial-grid">
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

        <section className="our-people-section" aria-labelledby="our-people-title">
          <div className="site-gutter">
            <div className="our-people-heading">
              <SectionLabel number="02">Our people</SectionLabel>
              <div>
                <h2 id="our-people-title">Experience that moves missions forward.</h2>
                <p>
                  Meet the leaders guiding Harkcon’s people, performance, technology, and growth.
                </p>
              </div>
            </div>

            <div className="people-grid">
              {people.map((person) => (
                <article className="person-card" key={person.name}>
                  <div className="person-portrait">
                    <Image
                      src={person.image}
                      alt={`${person.name}, ${person.title}`}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                      style={{ objectPosition: person.imagePosition }}
                      className="object-cover"
                    />
                  </div>
                  <div className="person-card-copy">
                    <h3>{person.name}</h3>
                    <p>{person.title}</p>
                    <details>
                      <summary>
                        <span>Read bio</span>
                        <span aria-hidden="true">+</span>
                      </summary>
                      <div className="person-bio">
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

        <section className="mission-vision-section" aria-labelledby="mission-title">
          <div className="site-gutter">
            <div className="mission-vision-statements">
              <article className="purpose-statement">
                <div className="purpose-statement-label">
                  <span>01</span>
                  <p className="eyebrow text-white/55">Our mission</p>
                </div>
                <h2 id="mission-title">
                  To provide the highest quality, customized, and innovative organizational and
                  workforce performance solutions at the best value, while strictly adhering to our
                  guiding principles.
                </h2>
              </article>
              <article className="purpose-statement">
                <div className="purpose-statement-label">
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

        <section className="principles-section" aria-labelledby="principles-title">
          <div className="site-gutter principles-layout">
            <div className="principles-sticky">
              <SectionLabel number="03">Guiding principles</SectionLabel>
              <div className="principles-intro">
                <h2 id="principles-title">The foundation for how we work.</h2>
                <p>
                  Our guiding principles shape our day-to-day efforts and guide our responsibilities
                  to our clients, our employees, and our communities.
                </p>
              </div>
            </div>
            <ol className="principles-list">
              {guidingPrinciples.map((principle, index) => (
                <li key={principle} data-reveal-line>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{principle}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="culture-section" aria-labelledby="culture-title">
          <div className="culture-split">
            <div className="culture-image">
              <Image
                src={unsplash("1758599543116-4fdb887911a5")}
                alt="Three colleagues walking together outside their workplace"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="culture-copy">
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

        <section className="community-section" aria-labelledby="community-title">
          <div className="site-gutter">
            <div className="community-heading">
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

          <div className="community-wide-image">
            <SubtleParallaxPhoto
              className="parallax-photo--community"
              label="Two volunteers pack food bags at a community distribution event"
              strength={110}
            />
          </div>

          <div className="site-gutter">
            <div className="community-support-copy">
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

            <div className="community-support-dropdowns">
              <details name="community-support" className="community-support-dropdown">
                <summary aria-label="Show organizations receiving financial support">
                  <h3>Financial support</h3>
                  <span aria-hidden="true" />
                </summary>
                <div className="community-support-dropdown-content">
                  <ul className="community-pill-grid" data-reveal-sequence>
                    {supportedOrganizations.map((organization) => (
                      <li key={organization} data-reveal-item>
                        {organization}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
              <details name="community-support" className="community-support-dropdown">
                <summary aria-label="Show organizations supported through volunteer involvement">
                  <h3>Volunteer involvement</h3>
                  <span aria-hidden="true" />
                </summary>
                <div className="community-support-dropdown-content">
                  <ul className="community-pill-grid" data-reveal-sequence>
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

        <section className="about-cta-section">
          <div className="site-gutter about-cta-inner">
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
