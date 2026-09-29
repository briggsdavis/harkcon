"use client"

import { Plus } from "@phosphor-icons/react"
import { useCallback, useState } from "react"
import type { MouseEvent } from "react"

type Faq = {
  question: string
  answer: string
}

export default function FaqList({ faqs, dark = false }: { faqs: Faq[]; dark?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.value)
    setOpenIndex((current) => (current === index ? null : index))
  }, [])

  return (
    <div className={`faq-list ${dark ? "faq-list--dark" : ""}`}>
      {faqs.map((faq, index) => {
        const open = openIndex === index
        const answerId = `faq-answer-${dark ? "dark" : "light"}-${index}`

        return (
          <div className={`faq-item ${open ? "faq-item--open" : ""}`} key={faq.question}>
            <button
              type="button"
              value={index}
              className="flex w-full items-center gap-8 py-7 text-left font-header text-card-title md:py-9 faq-question"
              aria-expanded={open}
              aria-controls={answerId}
              onClick={toggle}
            >
              <span>{faq.question}</span>
              <span className={`ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#0d132d]/25 font-body text-2xl transition-transform duration-300 faq-marker ${open ? "rotate-45" : ""}`} aria-hidden="true">
                <Plus />
              </span>
            </button>
            <div id={answerId} className="faq-answer" aria-hidden={!open}>
              <div>
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
