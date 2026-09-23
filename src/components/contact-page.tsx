"use client"

import { FormEvent, useCallback, useState } from "react"
import { Arrow, Header, SiteFooter } from "~/components/home-page"

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
  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }, [])

  return (
    <div id="top" className="overflow-clip bg-white text-[#0d132d]">
      <Header initialSurface="light" />
      <div className="page-content">
        <section className="contact-page" aria-labelledby="contact-title">
          <div className="site-gutter contact-layout">
            <div className="contact-intro">
              <p className="eyebrow mb-7 text-[#5f626b]">Contact Harkcon</p>
              <h1 id="contact-title">Need more information? Let&apos;s talk.</h1>
              <div className="contact-details" data-reveal-line>
                <p className="eyebrow">Main Office</p>
                <address>
                  <strong>Harkcon, Inc.</strong>
                  <br />
                  104 W Cambridge St, Ste A
                  <br />
                  Fredericksburg, VA 22405-2358
                </address>
                <div className="contact-numbers">
                  <a href="tel:+18004996456">Phone: +1 (800) 499-6456</a>
                  <a href="tel:+18005688595">Fax: +1 (800) 568-8595</a>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-name-row">
                <label className="contact-field" data-reveal-line>
                  <span>First name *</span>
                  <input name="firstName" required />
                </label>
                <label className="contact-field" data-reveal-line>
                  <span>Last name *</span>
                  <input name="lastName" required />
                </label>
              </div>

              <label className="contact-field" data-reveal-line>
                <span>Organization *</span>
                <input name="organization" autoComplete="organization" required />
              </label>

              <label className="contact-field" data-reveal-line>
                <span>Email address *</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>

              <label className="contact-field" data-reveal-line>
                <span>Phone *</span>
                <input type="tel" name="phone" autoComplete="tel" required />
              </label>

              <fieldset className="contact-options">
                <legend>What type of information interests you? *</legend>
                <div className="contact-option-grid">
                  {inquiryTypes.map((type) => (
                    <label key={type}>
                      <input type="checkbox" name="interest" value={type} />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="contact-field contact-field--textarea" data-reveal-line>
                <span>Specific questions or areas of interest *</span>
                <textarea name="message" rows={4} required />
              </label>

              <label className="contact-field contact-field--textarea" data-reveal-line>
                <span>How did you hear about Harkcon? *</span>
                <textarea name="referral" rows={3} required />
              </label>

              <fieldset className="contact-options contact-preference">
                <legend>Your preferred means of contact *</legend>
                <div className="contact-option-grid contact-option-grid--inline">
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

              <div className="contact-submit-row">
                {submitted ? (
                  <output className="contact-success">
                    Thank you. Your inquiry is ready for the Harkcon team.
                  </output>
                ) : null}
                <button type="submit" className="pill-button">
                  Submit <Arrow diagonal />
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="contact-faq-section" aria-labelledby="contact-faq-title">
          <div className="site-gutter faq-layout">
            <div className="faq-intro">
              <p className="eyebrow mb-6 text-[#5f626b]">Frequently asked questions</p>
              <h2 id="contact-faq-title">Before you get in touch.</h2>
              <p>
                A few quick answers about contacting Harkcon, our office, and where to direct your
                inquiry.
              </p>
            </div>
            <div className="faq-list">
              {contactFaqs.map((faq) => (
                <details key={faq.question} data-reveal-line>
                  <summary>
                    <span>{faq.question}</span>
                    <span className="faq-marker" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    </div>
  )
}
