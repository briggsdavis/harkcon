import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Arrow, Header, SiteFooter } from "~/components/home-page"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Harkcon, our people, history, mission, guiding principles, culture, and commitment to our communities.",
}

const missionOutcomes = [
  "Attract, hire, develop, and retain the best employees",
  "Identify, categorize, and prioritize their work",
  "Determine optimal staffing",
  "Develop executive leaders",
  "Discover the causes of ongoing performance issues",
  "Develop interventions that bridge performance gaps",
  "Navigate transitions through change management programs",
  "Create innovative training programs",
  "Reach the next level",
]

const guidingPrinciples = [
  "We believe in our people. They define our company and create our reputation.",
  "We set a good example as individuals and as a corporation, acting honorably, responsibly, and dependably, and holding ourselves accountable for our actions.",
  "We adhere to the highest ethical standards in all business transactions. Honesty, truthfulness, and consistency govern our business dealings.",
  "We listen to and relate to our clients with respect and courtesy, remain flexible, and stay focused on finding timely solutions to their problems.",
  "We treat people fairly, with dignity and respect, and provide conditions of employment that safeguard their rights and welfare.",
  "We enable our people to maximize their potential through professional development, rewards for innovation, career mobility, and recognition of their success.",
  "We focus on teamwork, knowing that diverse talents and perspectives, open communication, unselfish contribution, and active collaboration produce better results for our clients and ourselves.",
  "We recognize and reward performance.",
  "We act responsibly toward the communities around us through civic improvement, charitable work, and community service.",
  "We are committed to having fun while we succeed. A culture in which people truly enjoy their work creates a stronger, more sustainable organization with an unwavering commitment to excellence.",
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
          <Image
            src="/images/about-team.png"
            alt="Harkcon consultants collaborating in a Washington, D.C. office"
            fill
            priority
            sizes="100vw"
            className="about-hero-image"
          />
          <div className="about-hero-overlay" />
          <div className="site-gutter about-hero-content">
            <div className="max-w-4xl text-white">
              <p className="eyebrow mb-5 text-white/70">About Harkcon</p>
              <h1 id="about-hero-title">Built for better performance.</h1>
              <div className="about-hero-footer" data-reveal-line>
                <p>Service. Expertise. A shared commitment to the mission.</p>
                <span aria-hidden="true">↓</span>
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
                  Harkcon, Inc. is a dynamic, internationally recognized, service-disabled
                  veteran-owned business. We provide comprehensive organizational and workforce
                  performance analysis, training development and delivery, intelligence analysis,
                  and performance support through customized, innovative solutions for the public
                  and private sectors. Established as a limited liability company in 2005, Harkcon
                  incorporated in the Commonwealth of Virginia in 2009.
                </p>
                <p>
                  We have built a reputation for consistently delivering high-quality, customized
                  solutions that improve worker, workplace, and organizational performance. Our
                  clients include the U.S. Coast Guard, Department of Energy, Department of Homeland
                  Security, Federal Bureau of Investigation, Department of Defense, and Department
                  of State. We have also partnered with PricewaterhouseCoopers, ABSG, ICF
                  International, Innovative Technology Partnerships, Leidos, and{" "}
                  <Link href="/contracts" className="about-inline-link">
                    more
                  </Link>
                  .
                </p>
                <p>
                  Using proven techniques and tools, including our proprietary Mainstay software, we
                  identify workforce needs and the organizational, leadership, and management
                  interventions required to elevate motivation and performance. Through ADComP™, our
                  Executive Coaching Model, we help corporate executives strengthen their
                  performance in the workplace.
                </p>
                <p>
                  We also bring exceptional worldwide experience in performance-based training
                  development and delivery. Our training, learning, and performance support products
                  meet SCORM and Section 508 requirements and include the development, production,
                  and implementation of organization-conformant e-learning.
                </p>
                <p>
                  Headquartered in Fredericksburg, Virginia, with a corporate presence in
                  Washington, D.C., New England, and the West Coast, and team members in more than
                  15 states, Harkcon is positioned to respond regardless of location, organizational
                  structure, or project size. Each technical expert brings significant practical
                  workplace experience, professional expertise, and a passionate commitment to every
                  project, from a front-end analysis of one position to an assessment of an entire
                  organization.
                </p>
              </div>
            </div>

            <aside className="people-statement" aria-labelledby="people-statement-title">
              <p className="eyebrow text-white/55">Harkcon people statement</p>
              <h2 id="people-statement-title">
                everyone has a voice. every voice matters. all voices are welcome.
              </h2>
              <div className="people-statement-copy">
                <p>At Harkcon, we value and encourage different perspectives.</p>
                <p>
                  We cannot achieve our mission of improving organizational and human performance
                  without them. We strive for a culture based on teamwork, trust, and collaboration.
                  We empower our Associates to tackle problems, identify solutions, and make
                  decisions, and we celebrate their diverse talents, experiences, and backgrounds.
                  Above all, we appreciate the unique contribution each person brings to the team.
                  Together, we make better decisions and create better results for our clients.
                </p>
                <p className="people-statement-close">At Harkcon, our Associates matter.</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="about-history-section" aria-labelledby="history-title">
          <div className="site-gutter about-editorial-grid">
            <SectionLabel number="02">Our history</SectionLabel>
            <div className="about-prose about-prose--history">
              <h2 id="history-title">The right people at the right moment.</h2>
              <p>
                Some moments in life seem to align perfectly, and the formation of Harkcon was one
                of them. After retiring from the U.S. Coast Guard in 2004, founder and CEO Dr. Kevin
                Harkins began a second career as an independent contractor focused on human
                performance technology and competency modeling. Through that work, he met other
                retired military members with shared talents and interests.
              </p>
              <p>
                In the spring of 2005, the group formed Harkcon as a limited liability company. The
                company won its first work in 2006 as a subcontractor on a Coast Guard Human
                Resources contract, beginning a relationship with the Coast Guard that continues
                today.
              </p>
              <p>
                Harkcon has grown steadily since its inception. Today, more than 100 employees and
                core contractors bring their experience and commitment to our team.
              </p>
              <p className="history-stat" aria-label="More than 100 employees and core contractors">
                <strong>100+</strong>
                <span>employees and core contractors</span>
              </p>
            </div>
          </div>
        </section>

        <section className="mission-vision-section" aria-labelledby="mission-title">
          <div className="site-gutter">
            <SectionLabel number="03">Mission &amp; vision</SectionLabel>
            <div className="mission-vision-grid">
              <div className="mission-panel">
                <p className="eyebrow text-white/55">Our mission</p>
                <h2 id="mission-title">
                  To provide the highest quality, customized, and innovative organizational and
                  workforce performance solutions at the best value, while strictly adhering to our
                  guiding principles.
                </h2>
                <div className="mission-outcomes">
                  <p className="eyebrow text-white/55">Our mission at work</p>
                  <p>
                    Through our unique analysis-based management solutions, we help organizations:
                  </p>
                  <ul>
                    {missionOutcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="vision-panel">
                <p className="eyebrow text-[#5f626b]">Our vision</p>
                <p>
                  Harkcon and its people are regarded as the best and most sought-after human
                  performance experts in the nation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="principles-section" aria-labelledby="principles-title">
          <div className="site-gutter">
            <div className="about-editorial-grid">
              <SectionLabel number="04">Guiding principles</SectionLabel>
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
          <div className="site-gutter about-editorial-grid">
            <SectionLabel number="05">Corporate culture</SectionLabel>
            <div className="about-prose">
              <h2 id="culture-title">Challenging work. Remarkable people.</h2>
              <p>
                Working at Harkcon is mentally stimulating, personally fulfilling, fast-paced,
                collegial, and professionally rewarding. Our exceptionally talented people love what
                they do, enjoy the people they work with, and consistently go beyond what is
                expected to meet our clients’ needs.
              </p>
              <p>
                With a core group in the greater Washington, D.C. area, spontaneous lunches and
                after-hours gatherings are common. We believe that the more we enjoy being together
                as a team, the better our work is for our clients.
              </p>
              <p>
                We also respect life outside the office. Telecommuting and flexible scheduling are
                encouraged and practiced by our Board of Directors. Our open-door management style
                and flat structure give team members access to every level of leadership, where
                their input is both encouraged and valued. That balance reflects the flexibility of
                a small business and helps us sustain a healthy, high-performing culture.
              </p>
            </div>
          </div>
        </section>

        <section className="community-section" aria-labelledby="community-title">
          <div className="site-gutter">
            <div className="about-editorial-grid">
              <SectionLabel number="06">Community &amp; responsibility</SectionLabel>
              <div className="community-intro">
                <h2 id="community-title">Service extends beyond our work.</h2>
                <p>
                  Built on years of service to our country and to others, Harkcon continues to give
                  its resources, time, and talent. We are proud to stand among the thousands of
                  companies that give back to their communities.
                </p>
                <p>
                  Harkcon provides ongoing financial, professional, and volunteer support to Hope
                  For The Warriors™, a 501(c)(3) organization dedicated to enhancing the quality of
                  life for U.S. service members and families affected by injuries or death in the
                  line of duty. Its work helps ensure the sacrifices and needs of wounded and fallen
                  warriors and their families are never forgotten.
                </p>
                <p>
                  We also support team members’ community involvement through flexible work
                  schedules and recognition programs, making it easier for our people to contribute
                  directly to the causes that matter to them.
                </p>
              </div>
            </div>

            <div className="community-lists">
              <div>
                <p className="eyebrow">Financial support</p>
                <ul>
                  {supportedOrganizations.map((organization) => (
                    <li key={organization}>{organization}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow">Volunteer involvement</p>
                <ul>
                  {volunteerOrganizations.map((organization) => (
                    <li key={organization}>{organization}</li>
                  ))}
                </ul>
              </div>
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
