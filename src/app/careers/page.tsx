import { Plus } from "@phosphor-icons/react/ssr"
import { Metadata } from "next"
import Link from "next/link"
import CareersPositionsEmbed from "~/components/careers-positions-embed"
import FaqList from "~/components/faq-list"
import HeroParallaxImage from "~/components/hero-parallax-image"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import SubtleParallaxPhoto from "~/components/subtle-parallax-photo"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore careers at Harkcon, available positions, employee benefits, FAQs, and equal employment opportunities.",
}

const disciplines = [
  "Organizational and Workforce Analysis",
  "Competency Modeling and Management",
  "Business Process Reengineering",
  "Training Design and Development",
  "Program and Project Management",
  "Federal Government or Military Experience in Human Resources",
  "Emergency Management Policy",
  "Emergency Management Practitioner",
]

const benefits = [
  "401(k) with Company Match",
  "Disability Insurance, Short- and Long-Term",
  "Employee Assistance Program",
  "Flexible Work Hours",
  "Health Insurance, Medical, Dental, and Vision",
  "Health Savings Account",
  "Legal Resources",
  "Life Insurance, Company and Voluntary",
  "Paid Federal Holidays and Paid Floating Holidays",
  "Paid Sick Days",
  "Paid Vacation",
  "Pet Discount Program",
  "LinkedIn Learning",
  "Social Security Benefits, Workers’ Compensation, and Unemployment Insurance",
]

const careerFaqs = [
  {
    question: "Where is your office located?",
    answer:
      "Our headquarters is located in Fredericksburg, Virginia. We have associates working throughout the country.",
  },
  {
    question: "When was Harkcon established?",
    answer:
      "Harkcon was established in 2005 and received its first government contract work in 2006.",
  },
  {
    question: "What type of business is Harkcon?",
    answer:
      "Harkcon, Inc. is a privately held, service-disabled veteran-owned business that qualifies as a small business for many of the contract vehicles we hold.",
  },
  {
    question: "What is the promotion potential?",
    answer:
      "Harkcon rewards associates’ professional accomplishments through promotions, rewards, and recognition. As a company with definite plans for expansion, we expect many opportunities for advancement. A significant part of our strategy is to promote from within, and we strive to advance team members who demonstrate superior performance, show increased ability, and seek greater responsibility before hiring externally.",
  },
  {
    question: "Is my resume confidential?",
    answer:
      "Yes. Your information is private, is not shared with anyone outside Harkcon, and will be used for employment purposes only.",
  },
  {
    question: "What is the recruiting process?",
    answer:
      "Begin by exploring our website to understand who we are, the work we do, our environment, and our people. When you are ready, review our Available Positions section and submit your resume through the position that best matches your experience.",
  },
  {
    question: "Why would I want to work at Harkcon?",
    answer:
      "If you want the personal satisfaction of professional success, Harkcon is for you. Our standards of excellence are evident in the expertise of our associates, the complexity of the projects for which we compete, and the quality of the work we produce. We help federal agencies improve performance, especially in complex human systems where mission success depends on how people are organized. Our success comes from the exacting work of our team members, and with Harkcon, your career has endless possibilities.",
  },
  {
    question: "Where does Harkcon see itself going?",
    answer:
      "In short, the sky is the limit. We envision a thriving international company of more than 300 associates serving human performance consulting needs at all levels of government and across industries. We will continue to attract the best professionals in the field and be known as the company that produces expert results.",
  },
]

export default function Careers() {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header />
      <div className="page-content">
        <section className="careers-hero" aria-labelledby="careers-title">
          <HeroParallaxImage
            src="/images/careers-hero.jpg"
            alt="Business professionals discussing strategy in a bright modern office"
            imageClassName="careers-hero-image"
          />
          <div className="absolute inset-0 z-[1] careers-hero-overlay" />
          <div className="relative z-10 flex h-full items-end pb-12 md:pb-16 site-gutter careers-hero-content">
            <div className="max-w-4xl text-white">
              <h1 id="careers-title">Do work that matters.</h1>
              <div className="mt-8 flex items-center border-t border-white/35 pt-6 md:mt-10 careers-hero-footer" data-reveal-line>
                <p>Bring your experience, ideas, and ambition to the mission.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="careers-intro-section" aria-labelledby="join-title">
          <div className="site-gutter">
            <div className="grid gap-12 lg:grid-cols-[minmax(190px,0.55fr)_minmax(0,1.7fr)] lg:gap-16 xl:gap-28 careers-editorial-grid">
              <div className="flex items-start gap-5 self-start lg:sticky lg:top-36 careers-section-label">
                <span>01</span>
                <p className="eyebrow">Join our team</p>
              </div>
              <div className="careers-intro-copy">
                <h2 id="join-title">Build your career with people who value people.</h2>
                <p>
                  We are a dynamic and growing company, always looking for talented, experienced,
                  and highly creative professionals across a variety of disciplines. Harkcon is
                  built on a cornerstone belief: when businesses take care of their people, their
                  people take care of the business.
                </p>
              </div>
            </div>

            <div className="mt-24 grid gap-14 border-t border-[#0d132d]/20 pt-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 xl:gap-28 careers-needs">
              <div className="self-start careers-needs-copy">
                <div className="careers-needs-intro">
                  <p className="eyebrow text-[#5f626b]">Who are we looking for?</p>
                  <h2>Experience that moves missions forward.</h2>
                  <p>
                    Our talent needs constantly evolve and expand with current and future projects
                    and contracts. We regularly seek experience and expertise in these areas:
                  </p>
                </div>

                <div className="mt-14 border-t border-[#0d132d]/20 pt-12 contractor-note">
                  <p className="eyebrow text-[#5f626b]">More ways to work with us</p>
                  <h2>Full-time or project-specific.</h2>
                  <p>
                    In addition to our full-time associates, we routinely hire full- and part-time
                    independent contractors for specific projects and contract work. If you enjoy
                    exciting, dynamic work that makes a meaningful impact for clients, we encourage
                    you to explore available positions below, whether as a full-time associate or a
                    contract-specific independent contractor.
                  </p>
                </div>
              </div>
              <ol className="career-disciplines">
                {disciplines.map((discipline, index) => (
                  <li key={discipline} data-reveal-line>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{discipline}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="h-[41svh] min-h-[312px] w-full overflow-hidden md:h-[52svh] md:min-h-[408px] careers-wide-image" aria-label="Life at Harkcon">
          <SubtleParallaxPhoto
            className="parallax-photo--interview"
            label="Three women talking during a professional interview in a bright conference room"
            strength={110}
          />
        </section>

        <section className="bg-[#0d132d] py-24 text-white md:py-32 positions-section" aria-labelledby="positions-title">
          <div className="site-gutter">
            <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end positions-heading">
              <div>
                <p className="eyebrow mb-5 text-white/55">Current opportunities</p>
                <h2 id="positions-title">Available Positions</h2>
              </div>
              <a
                href="https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=15aa7385-7aee-410b-90e3-5972b600f083&ccId=19000101_000001&type=JS&lang=en_US&selectedMenuKey=CurrentOpenings"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 pb-2 text-sm text-white transition-colors hover:text-white/55 positions-external-link animated-underline"
              >
                Open careers portal <Arrow diagonal />
              </a>
            </div>
            <CareersPositionsEmbed />
            <p className="mt-5 text-sm leading-relaxed text-white/60 positions-fallback">
              If the positions portal does not appear,{" "}
              <a
                href="https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=15aa7385-7aee-410b-90e3-5972b600f083&ccId=19000101_000001&type=JS&lang=en_US&selectedMenuKey=CurrentOpenings"
                target="_blank"
                rel="noreferrer"
              >
                view current openings in a new window
              </a>
              .
            </p>
          </div>
        </section>

        <section className="we-are-section" aria-labelledby="we-are-title">
          <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-20 xl:gap-28 site-gutter we-are-grid">
            <div className="we-are-copy">
              <p className="eyebrow mb-6 text-[#5f626b]">Life at Harkcon</p>
              <h2 id="we-are-title">We are Harkcon.</h2>
              <p>
                We are a dynamic and growing company, always looking for talented, experienced, and
                highly creative professionals in many disciplines. Harkcon is built on the belief
                that when businesses take care of their people, their people take care of the
                business.
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden bg-[#0d132d] careers-video">
              {/* oxlint-disable-next-line react/iframe-missing-sandbox -- YouTube needs scripts and its own origin; the iframe is cross-origin. */}
              <iframe
                sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
                src="https://www.youtube.com/embed/OXuAgvjinSs?si=mdVrO1kUsyOpAcMl"
                title="We are Harkcon"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section className="bg-[#f4f3f0] benefits-section" aria-labelledby="benefits-title">
          <div className="site-gutter">
            <div className="grid gap-12 lg:grid-cols-[minmax(190px,0.55fr)_minmax(0,1.7fr)] lg:gap-16 xl:gap-28 careers-editorial-grid benefits-heading">
              <div className="flex items-start gap-5 self-start lg:sticky lg:top-36 careers-section-label">
                <span>02</span>
                <p className="eyebrow">Competitive benefits</p>
              </div>
              <div className="benefits-intro">
                <h2 id="benefits-title">Support for today and tomorrow.</h2>
                <p>
                  Harkcon offers benefit programs that address associates’ immediate needs, such as
                  insurance coverage, and long-term needs, such as retirement savings. Benefits are
                  a significant component of total compensation, may cover associates and selected
                  beneficiaries, and are available based on employment status.
                </p>
              </div>
            </div>
            <details className="group mt-14 border-y border-[#0d132d]/20 md:mt-16 benefits-dropdown">
              <summary aria-label="Show all competitive benefits">
                <div>
                  <p className="eyebrow">Benefits package</p>
                  <h3>View all benefits</h3>
                </div>
                <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#0d132d]/20 transition-all duration-300 group-open:border-[#0d132d] group-open:bg-[#0d132d] group-open:text-white md:h-14 md:w-14">
                  <Plus className="h-5 w-5 transition-transform duration-300 group-open:rotate-45" />
                </span>
              </summary>
              <div className="border-t border-[#0d132d]/20 pb-10 benefits-dropdown-content">
                <ul className="mt-16 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 xl:gap-4 benefits-list" data-reveal-sequence>
                  {benefits.map((benefit) => (
                    <li key={benefit} data-reveal-item>
                      <p>{benefit}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        </section>

        <section className="bg-[#0d132d] py-24 text-white md:py-32 lg:py-40 careers-faq-section" aria-labelledby="careers-faq-title">
          <div className="grid gap-14 lg:grid-cols-[minmax(250px,0.65fr)_minmax(0,1.35fr)] lg:gap-20 xl:gap-28 site-gutter faq-layout">
            <div className="self-start lg:sticky lg:top-36 faq-intro">
              <p className="eyebrow mb-6 text-white/55">Careers FAQ</p>
              <h2 id="careers-faq-title">What to know before you apply.</h2>
              <p>Answers about Harkcon, our growth, and what a career here can offer.</p>
            </div>
            <FaqList faqs={careerFaqs} dark />
          </div>
        </section>

        <section className="py-24 md:py-32 lg:py-40 equal-opportunity-section" aria-labelledby="equal-opportunity-title">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 xl:gap-28 site-gutter equal-opportunity-grid">
            <div>
              <p className="eyebrow mb-6 text-[#5f626b]">Equal employment opportunity</p>
              <h2 id="equal-opportunity-title">Everyone should be treated fairly.</h2>
            </div>
            <div>
              <p>
                Harkcon is committed to the fair treatment of all and is an equal opportunity
                employer. All employment decisions, including recruiting, hiring, training,
                promotion, transfers, benefits, compensation, placement, and termination, are made
                without regard to race, color, religion, sex, sexual orientation, gender identity,
                national origin, age, disability, marital status, veteran status, or any other
                factor protected by federal, state, or local law.
              </p>
              <p>
                Harkcon is committed to complying with the Americans with Disabilities Act.
                Reasonable accommodations, including equal access to communications, are available
                upon request. To request an accommodation, call{" "}
                <a href="tel:+18004996456">+1 (800) 499-6456, extension 105</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#0d132d] text-white careers-cta">
          <div className="flex flex-col items-start justify-between gap-10 py-20 md:flex-row md:items-end md:py-24 site-gutter careers-cta-inner">
            <div>
              <p className="eyebrow mb-5 text-white/55">Your next chapter</p>
              <h2>See where your experience can take you.</h2>
            </div>
            <Link href="#positions-title" className="pill-button pill-button--light shrink-0">
              View positions <Arrow />
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}
