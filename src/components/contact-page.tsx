"use client"

import { CaretDown } from "@phosphor-icons/react"
import { useMutation } from "convex/react"
import { FormEvent, useCallback, useState } from "react"
import FaqList from "~/components/faq-list"
import { Arrow, Header, SiteFooter } from "~/components/home-page"
import { api } from "../../convex/_generated/api"

const inquiryTypes = [
  "Business / Partnership Opportunities",
  "Consulting Services",
  "General Inquiry",
  "Training Inquiry",
]

const contactFaqs = [
  {
    question: "What types of inquiries can I submit?",
    answer:
      "We welcome questions about consulting services, training, business and partnership opportunities, and general information about Harkcon.",
  },
  {
    question: "Who can help with a partnership inquiry?",
    answer:
      "Contact Paula Harkins at pharkins@harkcon.com or 540-783-8271 to discuss business development and partnership opportunities.",
  },
  {
    question: "Where is Harkcon headquartered?",
    answer:
      "Our headquarters is located at 104 W Cambridge Street, Suite A, in Fredericksburg, Virginia. Our associates work throughout the country.",
  },
  {
    question: "Can I contact Harkcon about employment opportunities?",
    answer:
      "For current openings, role requirements, and application instructions, visit our Careers page.",
  },
  {
    question: "How can I reach Harkcon by phone?",
    answer: "Call our main office at +1 (800) 499-6456. Our fax number is +1 (800) 568-8595.",
  },
]

const fieldLabelClassName =
  "font-eyebrow text-eyebrow-label font-semibold tracking-[0.12em] text-[#5f626b] uppercase"
const fieldInputClassName =
  "w-full resize-none bg-transparent font-body text-lg text-[#0d132d] outline-none"
const contactLinkClassName =
  "relative w-fit after:pointer-events-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brand-red after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none"
const bdLinkClassName = `${contactLinkClassName} border-b border-[#0d132d]/25 text-[#0d132d]`

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const submitContact = useMutation(api.contacts.submit)
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.currentTarget
      const data = new FormData(form)
      const interests = data.getAll("interest").map(String)
      if (interests.length === 0) {
        setError("Select an area of interest.")
        return
      }
      setSubmitting(true)
      setError("")
      try {
        await submitContact({
          firstName: String(data.get("firstName") ?? ""),
          lastName: String(data.get("lastName") ?? ""),
          organization: String(data.get("organization") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          interests,
          message: String(data.get("message") ?? ""),
          referral: String(data.get("referral") ?? ""),
          preferredContact: String(data.get("preferredContact") ?? ""),
        })
        setSubmitted(true)
        form.reset()
      } catch {
        setError("We couldn’t send your inquiry. Please try again in a moment.")
      } finally {
        setSubmitting(false)
      }
    },
    [submitContact],
  )

  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header initialSurface="light" />
      <div className="relative">
        <section className="pt-40 pb-28 md:pt-52 md:pb-36" aria-labelledby="contact-title">
          <div className="site-gutter grid gap-20 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.55fr)] lg:gap-16 xl:gap-28">
            <div className="self-start lg:sticky lg:top-36">
              <h1
                id="contact-title"
                className="max-w-lg font-header text-display font-medium text-balance"
              >
                Let’s&nbsp;talk.
              </h1>
              <div className="mt-14 pt-8" data-reveal-line>
                <p className="eyebrow text-pretty">Main&nbsp;Office</p>
                <address className="mt-6 text-lg leading-relaxed text-[#333744] not-italic">
                  <strong className="font-normal text-[#0d132d]">Harkcon, Inc.</strong>
                  <br />
                  104 W Cambridge St, Ste A
                  <br />
                  Fredericksburg, VA 22405-2358
                </address>
                <div className="mt-8 grid gap-2 text-base">
                  <a href="tel:+18004996456" className={contactLinkClassName}>
                    Phone: +1 (800) 499-6456
                  </a>
                  <a href="tel:+18005688595" className={contactLinkClassName}>
                    Fax: +1 (800) 568-8595
                  </a>
                </div>
              </div>
              <div className="mt-10 pt-8" data-reveal-line>
                <p className="eyebrow text-pretty text-[#5f626b]">Contracts &amp;&nbsp;OASIS+</p>
                <p className="mt-5 text-sm leading-relaxed text-pretty text-[#5f626b]">
                  For contract-vehicle selection, OASIS+ scope questions, acquisition planning, or
                  teaming&nbsp;opportunities:
                </p>
                <address className="mt-6 grid gap-1 text-sm not-italic">
                  <strong className="font-header text-lg font-medium text-[#0d132d]">
                    Paula Harkins
                  </strong>
                  <span className="mb-2 text-[#5f626b]">Chief Growth Officer</span>
                  <a href="mailto:pharkins@harkcon.com" className={bdLinkClassName}>
                    pharkins@harkcon.com
                  </a>
                  <a href="tel:+15407838271" className={bdLinkClassName}>
                    540-783-8271
                  </a>
                </address>
              </div>
            </div>

            <form className="grid gap-8" onSubmit={handleSubmit}>
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="contact-field grid gap-3 pb-3" data-reveal-line>
                  <span className={fieldLabelClassName}>First name *</span>
                  <input className={fieldInputClassName} name="firstName" required />
                </label>
                <label className="contact-field grid gap-3 pb-3" data-reveal-line>
                  <span className={fieldLabelClassName}>Last name *</span>
                  <input className={fieldInputClassName} name="lastName" required />
                </label>
              </div>

              <label className="contact-field grid gap-3 pb-3" data-reveal-line>
                <span className={fieldLabelClassName}>Organization *</span>
                <input
                  className={fieldInputClassName}
                  name="organization"
                  autoComplete="organization"
                  required
                />
              </label>

              <label className="contact-field grid gap-3 pb-3" data-reveal-line>
                <span className={fieldLabelClassName}>Email address *</span>
                <input
                  className={fieldInputClassName}
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="contact-field grid gap-3 pb-3" data-reveal-line>
                <span className={fieldLabelClassName}>Phone *</span>
                <input
                  className={fieldInputClassName}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  required
                />
              </label>

              <label className="grid gap-3">
                <span className={fieldLabelClassName}>
                  What type of information interests you? *
                </span>
                <div className="group relative border-b border-[#0d132d]/25 focus-within:border-[#0d132d]">
                  <select
                    className="w-full cursor-pointer appearance-none bg-transparent py-3 pr-12 font-body text-lg text-[#0d132d] outline-none"
                    name="interest"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select an area of interest
                    </option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <CaretDown
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-1 h-5 w-5 -translate-y-1/2 transition-transform duration-300 group-focus-within:rotate-180"
                  />
                </div>
              </label>

              <label className="contact-field grid gap-3 pt-2 pb-3" data-reveal-line>
                <span className={fieldLabelClassName}>
                  Specific questions or areas of interest *
                </span>
                <textarea className={fieldInputClassName} name="message" rows={4} required />
              </label>

              <label className="contact-field grid gap-3 pt-2 pb-3" data-reveal-line>
                <span className={fieldLabelClassName}>How did you hear about Harkcon? *</span>
                <textarea className={fieldInputClassName} name="referral" rows={3} required />
              </label>

              <fieldset className="border-0 py-3 pt-2">
                <legend className={fieldLabelClassName}>Your preferred means of contact *</legend>
                <div className="mt-5 flex grid flex-wrap gap-4 gap-8 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center gap-3 text-base text-[#333744]">
                    <input
                      className="h-4 w-4 cursor-pointer accent-[#0d132d]"
                      type="radio"
                      name="preferredContact"
                      value="Email"
                      required
                    />
                    <span>Email</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 text-base text-[#333744]">
                    <input
                      className="h-4 w-4 cursor-pointer accent-[#0d132d]"
                      type="radio"
                      name="preferredContact"
                      value="Phone"
                      required
                    />
                    <span>Phone</span>
                  </label>
                </div>
              </fieldset>

              <div className="flex flex-col items-start justify-between gap-6 pt-4 sm:flex-row sm:items-center">
                {submitted ? (
                  <output className="max-w-md text-base leading-relaxed text-[#5f626b]">
                    Thank you. Your inquiry is ready for the Harkcon team.
                  </output>
                ) : null}
                {error ? (
                  <p className="max-w-[420px] text-[13px] text-pretty text-[#ad2d3c]" role="alert">
                    {error}
                  </p>
                ) : null}
                <button type="submit" className="action-button sm:ml-auto" disabled={submitting}>
                  {submitting ? "Sending…" : "Submit"} <Arrow diagonal />
                </button>
              </div>
            </form>
          </div>
        </section>

        <section
          className="bg-[#f4f3f0] py-24 md:py-32 lg:py-36"
          aria-labelledby="contact-faq-title"
        >
          <div className="site-gutter grid gap-14 lg:grid-cols-[minmax(250px,0.65fr)_minmax(0,1.35fr)] lg:gap-20 xl:gap-28">
            <div className="self-start lg:sticky lg:top-36">
              <h2
                id="contact-faq-title"
                className="max-w-xl font-header text-section-title text-balance"
              >
                Before you get in&nbsp;touch.
              </h2>
              <p className="mt-7 max-w-md text-body-copy text-pretty text-[#5f626b]">
                Find our office details, the right contact for your request, and answers to
                common&nbsp;questions.
              </p>
            </div>
            <FaqList faqs={contactFaqs} />
          </div>
        </section>
        <SiteFooter />
      </div>
    </div>
  )
}
