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
    question: "How soon will I hear from the Harkcon team?",
    answer:
      "We review every inquiry and route it to the right team member. Response times vary by request, but we will follow up as soon as possible.",
  },
  {
    question: "Where is Harkcon headquartered?",
    answer:
      "Our headquarters is located at 104 W Cambridge Street, Suite A, in Fredericksburg, Virginia. Our associates work throughout the country.",
  },
  {
    question: "Can I contact Harkcon about employment opportunities?",
    answer:
      "Yes. For current openings and detailed career information, visit our Careers page. Questions that are not related to a specific opening may also be submitted here.",
  },
  {
    question: "How can I reach Harkcon by phone?",
    answer: "Call our main office at +1 (800) 499-6456. Our fax number is +1 (800) 568-8595.",
  },
]

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
      <div className="page-content">
        <section className="contact-page" aria-labelledby="contact-title">
          <div className="grid gap-20 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.55fr)] lg:gap-16 xl:gap-28 site-gutter contact-layout">
            <div className="self-start lg:sticky lg:top-36 contact-intro">
              <p className="eyebrow mb-7 text-[#5f626b]">Contact Harkcon</p>
              <h1 id="contact-title">Need more information? Let&apos;s talk.</h1>
              <div className="mt-14 pt-8 contact-details" data-reveal-line>
                <p className="eyebrow">Main Office</p>
                <address>
                  <strong>Harkcon, Inc.</strong>
                  <br />
                  104 W Cambridge St, Ste A
                  <br />
                  Fredericksburg, VA 22405-2358
                </address>
                <div className="mt-8 grid gap-2 text-base contact-numbers">
                  <a href="tel:+18004996456">Phone: +1 (800) 499-6456</a>
                  <a href="tel:+18005688595">Fax: +1 (800) 568-8595</a>
                </div>
              </div>
              <div className="mt-10 pt-8 business-development-contact" data-reveal-line>
                <p className="eyebrow text-[#5f626b]">Contracts &amp; OASIS+</p>
                <p>
                  For contract-vehicle selection, OASIS+ scope questions, acquisition planning, or
                  teaming opportunities:
                </p>
                <address>
                  <strong>Paula Harkins</strong>
                  <span>Chief Growth Officer</span>
                  <a href="mailto:pharkins@harkcon.com">pharkins@harkcon.com</a>
                  <a href="tel:+15407838271">540-783-8271</a>
                </address>
              </div>
            </div>

            <form className="grid gap-8 contact-form" onSubmit={handleSubmit}>
              <div className="grid gap-8 sm:grid-cols-2 contact-name-row">
                <label className="grid gap-3 pb-3 contact-field" data-reveal-line>
                  <span>First name *</span>
                  <input name="firstName" required />
                </label>
                <label className="grid gap-3 pb-3 contact-field" data-reveal-line>
                  <span>Last name *</span>
                  <input name="lastName" required />
                </label>
              </div>

              <label className="grid gap-3 pb-3 contact-field" data-reveal-line>
                <span>Organization *</span>
                <input name="organization" autoComplete="organization" required />
              </label>

              <label className="grid gap-3 pb-3 contact-field" data-reveal-line>
                <span>Email address *</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>

              <label className="grid gap-3 pb-3 contact-field" data-reveal-line>
                <span>Phone *</span>
                <input type="tel" name="phone" autoComplete="tel" required />
              </label>

              <label className="grid gap-3 contact-select-field">
                <span>What type of information interests you? *</span>
                <div className="group relative border-b border-[#0d132d]/25 focus-within:border-[#0d132d] contact-select-wrap">
                  <select className="w-full cursor-pointer appearance-none bg-transparent py-3 pr-12 font-body text-lg text-[#0d132d] outline-none" name="interest" defaultValue="" required>
                    <option value="" disabled>
                      Select an area of interest
                    </option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <CaretDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-1 h-5 w-5 -translate-y-1/2 transition-transform duration-300 group-focus-within:rotate-180" />
                </div>
              </label>

              <label className="grid gap-3 pb-3 pt-2 contact-field contact-field--textarea" data-reveal-line>
                <span>Specific questions or areas of interest *</span>
                <textarea name="message" rows={4} required />
              </label>

              <label className="grid gap-3 pb-3 pt-2 contact-field contact-field--textarea" data-reveal-line>
                <span>How did you hear about Harkcon? *</span>
                <textarea name="referral" rows={3} required />
              </label>

              <fieldset className="border-0 py-3 pt-2 contact-options contact-preference">
                <legend>Your preferred means of contact *</legend>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 flex flex-wrap gap-8 contact-option-grid contact-option-grid--inline">
                  <label>
                    <input type="radio" name="preferredContact" value="Email" required />
                    <span>Email</span>
                  </label>
                  <label>
                    <input type="radio" name="preferredContact" value="Phone" required />
                    <span>Phone</span>
                  </label>
                </div>
              </fieldset>

              <div className="flex flex-col items-start justify-between gap-6 pt-4 sm:flex-row sm:items-center contact-submit-row">
                {submitted ? (
                  <output className="max-w-md text-base leading-relaxed text-[#5f626b] contact-success">
                    Thank you. Your inquiry is ready for the Harkcon team.
                  </output>
                ) : null}
                {error ? (
                  <p className="contact-error" role="alert">
                    {error}
                  </p>
                ) : null}
                <button type="submit" className="pill-button" disabled={submitting}>
                  {submitting ? "Sending…" : "Submit"} <Arrow diagonal />
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="bg-[#f4f3f0] py-24 md:py-32 lg:py-36 contact-faq-section" aria-labelledby="contact-faq-title">
          <div className="grid gap-14 lg:grid-cols-[minmax(250px,0.65fr)_minmax(0,1.35fr)] lg:gap-20 xl:gap-28 site-gutter faq-layout">
            <div className="self-start lg:sticky lg:top-36 faq-intro">
              <p className="eyebrow mb-6 text-[#5f626b]">Frequently asked questions</p>
              <h2 id="contact-faq-title">Before you get in touch.</h2>
              <p>
                A few quick answers about contacting Harkcon, our office, and where to direct your
                inquiry.
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
