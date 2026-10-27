import { LinkedinLogo, XLogo, YoutubeLogo } from "@phosphor-icons/react/ssr"
import { Metadata } from "next"
import Link from "next/link"
import ContactForm from "~/components/contact-form"
import FaqList from "~/components/faq-list"
import { Header, SiteFooter } from "~/components/home-page"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Harkcon about workforce, training, and organizational performance solutions for your mission.",
}

const contactFaqs = [
  {
    question: "What happens after I submit the form?",
    answer:
      "A member of our team reviews every inquiry and follows up using your preferred contact method. Sharing a few details about your requirement helps us connect you with the right people.",
  },
  {
    question: "Who does Harkcon work with?",
    answer:
      "We support public- and private-sector clients, including the U.S. Coast Guard, Department of Energy, Department of Homeland Security, Department of War, and Department of State.",
  },
  {
    question: "Can I ask about a specific contract vehicle?",
    answer:
      "Yes. Select Contract vehicles in the form and include the vehicle or solicitation in your message. You can also review the vehicles we hold on our Contracts page.",
  },
  {
    question: "Is Harkcon a small business?",
    answer:
      "Harkcon, Inc. is a privately held, service-disabled veteran-owned business that qualifies as a small business for many of the contract vehicles we hold.",
  },
  {
    question: "I'm interested in a job. Should I use this form?",
    answer:
      "Please apply through the Available Positions section of our Careers page so your resume reaches our recruiting team. To request an accommodation, call +1 (800) 499-6456, extension 105.",
  },
  {
    question: "Where is Harkcon located?",
    answer:
      "Our headquarters is in Fredericksburg, Virginia, and our associates work in more than 15 states across the country.",
  },
]

const socials = [
  { href: "https://www.linkedin.com/company/harkcon-inc./", label: "LinkedIn", Icon: LinkedinLogo },
  { href: "https://x.com/harkcon", label: "X", Icon: XLogo },
  { href: "https://www.youtube.com/@harkconinc", label: "YouTube", Icon: YoutubeLogo },
]

const detailLabelClassName = "eyebrow text-[#8b8e96]"

export default function Contact() {
  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header initialSurface="light" />
      <div className="relative">
        <section
          className="pt-[clamp(9rem,13vw,12.5rem)] pb-24 md:pb-32 lg:pb-40"
          aria-labelledby="contact-title"
        >
          <div className="site-gutter">
            <h1
              id="contact-title"
              className="max-w-4xl font-header text-display font-medium text-balance"
            >
              Let&apos;s talk about your&nbsp;mission.
            </h1>
            <p className="mt-8 max-w-2xl text-body-copy text-[#5f626b]">
              Tell us what you&apos;re working toward. Our team will review your inquiry and connect
              you with the right&nbsp;people.
            </p>

            <div className="mt-16 grid gap-16 border-t border-[#0d132d]/20 pt-14 md:mt-20 md:pt-20 lg:grid-cols-[minmax(240px,0.55fr)_minmax(0,1.7fr)] lg:gap-16 xl:gap-28">
              <aside className="self-start lg:sticky lg:top-36" aria-label="Contact details">
                <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
                  <div>
                    <dt className={detailLabelClassName}>Call</dt>
                    <dd className="mt-3 font-header text-card-title">+1 (800) 499-6456</dd>
                  </div>
                  <div>
                    <dt className={detailLabelClassName}>Headquarters</dt>
                    <dd className="mt-3 font-header text-card-title">
                      Fredericksburg,&nbsp;Virginia
                    </dd>
                  </div>
                  <div>
                    <dt className={detailLabelClassName}>Careers</dt>
                    <dd>
                      <Link href="/careers" className="text-link animated-underline mt-3 w-fit">
                        View open positions
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt className={detailLabelClassName}>Follow</dt>
                    <dd className="mt-3 flex gap-4">
                      {socials.map(({ href, label, Icon }) => (
                        <a
                          key={href}
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Visit Harkcon on ${label}`}
                          className="flex items-center justify-center transition-opacity hover:opacity-55"
                        >
                          <Icon aria-hidden="true" weight="fill" className="h-5 w-5" />
                        </a>
                      ))}
                    </dd>
                  </div>
                </dl>
              </aside>

              <ContactForm />
            </div>
          </div>
        </section>

        <section
          className="bg-[#0d132d] py-24 text-white md:py-32 lg:py-40"
          aria-labelledby="contact-faq-title"
        >
          <div className="site-gutter relative grid gap-14 lg:grid-cols-[minmax(250px,0.65fr)_minmax(0,1.35fr)] lg:gap-20 xl:gap-28">
            <div className="self-start lg:sticky lg:top-36">
              <h2
                id="contact-faq-title"
                className="max-w-xl font-header text-section-title text-balance"
              >
                Before you reach&nbsp;out.
              </h2>
              <p className="mt-7 max-w-md text-body-copy text-pretty text-white/62">
                Quick answers about working with Harkcon and what to expect after you get
                in&nbsp;touch.
              </p>
            </div>
            <FaqList faqs={contactFaqs} dark />
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}
