import { Metadata } from "next"
import CareersPositionsEmbed from "~/components/careers-positions-embed"
import FaqList from "~/components/faq-list"
import HeroParallaxImage from "~/components/hero-parallax-image"
import { Arrow, Header, SiteFooter } from "~/components/home-page"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore careers at Harkcon, available positions, FAQs, and equal employment opportunities.",
}

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
      "Harkcon rewards associates’ professional accomplishments through promotions, rewards, and recognition. As the company grows, advancement opportunities depend on project needs and individual readiness. A significant part of our strategy is to promote from within, and we strive to advance team members who demonstrate superior performance, show increased ability, and seek greater responsibility before hiring externally.",
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
      "At Harkcon, you can apply your expertise to the workforce and organizational challenges federal agencies face. Our work calls for careful analysis, practical recommendations, and responsibility for the result. You will work with experienced colleagues on projects where staffing, training, and sound decisions matter to the mission. We support professional development, value different perspectives, and give associates access to leadership. If you take pride in rigorous work and want to keep learning, explore the roles that match your experience and interests.",
  },
  {
    question: "Where does Harkcon see itself going?",
    answer:
      "Our goal is to expand our human performance work across government and industry while maintaining the quality clients expect. We plan to grow our team and international work by developing our people, building lasting client relationships, and taking on projects where our experience addresses a clear need.",
  },
]

const headingClassName = "text-balance max-w-4xl font-header text-section-title font-medium"

export default function Careers() {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header />
      <div className="relative">
        <section className="relative h-[55svh] overflow-hidden" aria-labelledby="careers-title">
          <HeroParallaxImage
            src="/images/careers-hero.jpg"
            alt="Business professionals discussing strategy in a bright modern office"
            imageClassName="scale-[1.015] object-cover"
          />
          <div className="careers-hero-overlay absolute inset-0 z-[1]" />
          <div className="site-gutter relative z-10 flex h-full items-end pb-12 md:pb-16">
            <div className="max-w-4xl text-white">
              <h1
                id="careers-title"
                className="max-w-3xl font-header text-display font-medium text-balance"
              >
                Do work that matters.
              </h1>
              <div
                className="mt-8 flex items-center border-t border-white/35 pt-6 md:mt-10"
                data-reveal-line
              >
                <p className="max-w-xl text-sm leading-relaxed text-pretty text-white/80 md:text-base">
                  Bring your experience, ideas, and ambition to the mission.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 lg:py-40" aria-labelledby="join-title">
          <div className="site-gutter">
            <div className="grid gap-12 lg:grid-cols-[minmax(190px,0.55fr)_minmax(0,1.7fr)] lg:gap-16 xl:gap-28">
              <div className="flex items-start gap-5 self-start lg:sticky lg:top-36">
                <span className="font-eyebrow text-eyebrow-label tracking-[0.15em] text-[#8b8e96]">
                  01
                </span>
                <p className="eyebrow text-pretty">Join our team</p>
              </div>
              <div>
                <h2 id="join-title" className={headingClassName}>
                  Build your career with people who value people.
                </h2>
                <p className="mt-8 max-w-[850px] text-body-copy text-pretty text-[#0d132d]">
                  We look for experienced professionals who ask good questions, take responsibility,
                  and care about the quality of their work. Harkcon is built on a straightforward
                  belief: when businesses take care of their people, their people take care of the
                  business.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white pb-24 md:pb-32" aria-labelledby="positions-title">
          <div className="site-gutter">
            <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <div>
                <h2
                  id="positions-title"
                  className="font-header text-section-title font-medium text-balance"
                >
                  Available Positions
                </h2>
              </div>
              <a
                href="https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=15aa7385-7aee-410b-90e3-5972b600f083&ccId=19000101_000001&type=JS&lang=en_US&selectedMenuKey=CurrentOpenings"
                target="_blank"
                rel="noreferrer"
                className="animated-underline flex items-center gap-4 pb-2 text-sm text-[#0d132d] transition-opacity hover:opacity-55"
              >
                Open careers portal <Arrow diagonal />
              </a>
            </div>
            <CareersPositionsEmbed />
            <p className="mt-5 text-sm leading-relaxed text-pretty text-[#5f626b]">
              If the positions portal does not appear,{" "}
              <a
                href="https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=15aa7385-7aee-410b-90e3-5972b600f083&ccId=19000101_000001&type=JS&lang=en_US&selectedMenuKey=CurrentOpenings"
                target="_blank"
                rel="noreferrer"
                className="border-b border-[#0d132d]/35 text-[#0d132d] transition-opacity hover:opacity-55"
              >
                view current openings in a new window
              </a>
              .
            </p>
          </div>
        </section>

        <section className="py-24 md:py-32 lg:py-40" aria-labelledby="equal-opportunity-title">
          <div className="site-gutter grid gap-12 lg:grid-cols-[minmax(190px,0.55fr)_minmax(0,1.7fr)] lg:gap-16 xl:gap-28">
            <div>
              <p className="eyebrow mb-8">Equal employment opportunity</p>
              <h2 id="equal-opportunity-title" className={headingClassName}>
                Everyone should be treated fairly.
              </h2>
            </div>
            <div className="max-w-[850px] space-y-7 text-body-copy text-[#454955]">
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
                <a
                  href="tel:+18004996456"
                  className="border-b border-[#0d132d]/35 text-[#0d132d] transition-opacity hover:opacity-55"
                >
                  +1 (800) 499-6456, extension 105
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section
          className="bg-[#0d132d] py-24 text-white md:py-32 lg:py-40"
          aria-labelledby="careers-faq-title"
        >
          <div className="site-gutter grid gap-14 lg:grid-cols-[minmax(250px,0.65fr)_minmax(0,1.35fr)] lg:gap-20 xl:gap-28">
            <div className="self-start lg:sticky lg:top-36">
              <h2
                id="careers-faq-title"
                className="max-w-xl font-header text-section-title text-balance"
              >
                What to know before you apply.
              </h2>
              <p className="mt-7 max-w-md text-body-copy text-pretty text-white/62">
                Answers about Harkcon, our growth, and what a career here can offer.
              </p>
            </div>
            <FaqList faqs={careerFaqs} dark />
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}
