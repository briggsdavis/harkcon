"use client"

import { CheckCircle } from "@phosphor-icons/react"
import { useMutation } from "convex/react"
import { ConvexError } from "convex/values"
import { useCallback, useState } from "react"
import type { FormEvent, ReactNode } from "react"
import { Arrow } from "~/components/home-page"
import { solutions } from "~/lib/solutions"
import { api } from "../../convex/_generated/api"

const interestOptions = [
  ...solutions.map((solution) => solution.title),
  "Contract vehicles",
  "Partnerships",
]

const referralOptions = [
  "Search engine",
  "LinkedIn",
  "Colleague or referral",
  "Conference or event",
  "Existing client",
  "Other",
]

const labelClassName =
  "block font-eyebrow text-eyebrow-label font-semibold tracking-[0.15em] text-[#5f626b] uppercase"
const inputClassName =
  "mt-0.5 w-full rounded-none border-0 bg-transparent pt-1 pb-1.5 text-body-copy text-[#0d132d] outline-none placeholder:text-[#8b8e96]/70"

function Field({
  label,
  required = false,
  className = "",
  children,
}: {
  label: string
  required?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <label className={`contact-field block ${className}`} data-reveal-line>
      <span className={labelClassName}>
        {label}
        {required ? <span className="text-brand-red"> *</span> : null}
      </span>
      {children}
    </label>
  )
}

type Status = "idle" | "submitting" | "sent" | "error"

export default function ContactForm() {
  const submit = useMutation(api.contacts.submit)
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.currentTarget
      const data = new FormData(form)
      const text = (name: string) => String(data.get(name) ?? "").trim()

      const [firstName = "", ...lastName] = text("name").split(/\s+/)

      setStatus("submitting")
      try {
        await submit({
          firstName,
          lastName: lastName.join(" "),
          organization: text("organization"),
          email: text("email"),
          phone: "",
          interests: data.getAll("interests").map(String),
          message: text("message"),
          referral: text("referral"),
          preferredContact: "Email",
          website: text("website"),
        })
        form.reset()
        setStatus("sent")
      } catch (caught) {
        setError(
          caught instanceof ConvexError && typeof caught.data === "string"
            ? caught.data
            : "Something went wrong. Please try again or call us directly.",
        )
        setStatus("error")
      }
    },
    [submit],
  )

  const reset = useCallback(() => setStatus("idle"), [])

  if (status === "sent") {
    return (
      <div
        className="flex flex-col items-start border-t border-[#0d132d]/20 pt-10"
        aria-live="polite"
      >
        <CheckCircle aria-hidden="true" weight="light" className="h-12 w-12 text-[#0d132d]" />
        <h2 className="mt-8 font-header text-section-title font-medium">
          Thank you for reaching&nbsp;out.
        </h2>
        <p className="mt-6 max-w-xl text-body-copy text-[#5f626b]">
          Your message has been received. A member of our team will follow up by&nbsp;email.
        </p>
        <button type="button" onClick={reset} className="text-link animated-underline mt-10">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
      <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <Field label="Name" required>
        <input name="name" required autoComplete="name" className={inputClassName} />
      </Field>
      <Field label="Email" required>
        <input name="email" type="email" required autoComplete="email" className={inputClassName} />
      </Field>
      <Field label="Organization">
        <input name="organization" autoComplete="organization" className={inputClassName} />
      </Field>
      <Field label={"How did you hear about\u00a0us?"}>
        <select name="referral" defaultValue="" className={`${inputClassName} cursor-pointer`}>
          <option value="">Select one</option>
          {referralOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className={labelClassName}>What can we help&nbsp;with?</legend>
        <div className="mt-5 grid auto-rows-fr grid-cols-1 gap-px border border-[#0d132d]/20 bg-[#0d132d]/20 sm:grid-cols-3">
          {interestOptions.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center justify-center bg-white px-4 py-3.5 text-center text-sm leading-snug text-[#454955] transition-colors duration-300 select-none hover:bg-[#f4f3f0] has-checked:bg-[#0d132d] has-checked:text-white has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-brand-gold md:px-5 md:py-4"
            >
              <input type="checkbox" name="interests" value={option} className="sr-only" />
              <span className="text-balance">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Message" required className="sm:col-span-2">
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your mission, requirement, or question."
          className={`${inputClassName} resize-none`}
        />
      </Field>

      <div className="flex flex-col items-start gap-6 pt-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "submitting"} className="action-button shrink-0">
          {status === "submitting" ? "Sending" : "Send message"} <Arrow />
        </button>
        <p className="text-sm text-brand-red" aria-live="polite">
          {status === "error" ? error : null}
        </p>
      </div>
    </form>
  )
}
