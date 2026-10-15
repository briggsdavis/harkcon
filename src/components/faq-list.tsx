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
    <div>
      {faqs.map((faq, index) => {
        const open = openIndex === index
        const answerId = `faq-answer-${dark ? "dark" : "light"}-${index}`

        return (
          <div
            className={`border-t last:border-b ${dark ? "border-white/18" : "border-[#0d132d]/20"}`}
            key={faq.question}
          >
            <button
              type="button"
              value={index}
              className="flex w-full items-center gap-8 py-7 text-left font-header text-card-title md:py-9"
              aria-expanded={open}
              aria-controls={answerId}
              onClick={toggle}
            >
              <span>{faq.question}</span>
              <span
                className={`ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-body ${dark ? "border-white/25" : "border-[#0d132d]/25"} text-2xl transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                <Plus />
              </span>
            </button>
            <div
              id={answerId}
              className={`faq-answer grid ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              aria-hidden={!open}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-3xl pr-12 text-body-copy md:pr-20 ${dark ? "text-white/68" : "text-[#5f626b]"} ${open ? "translate-y-0 pb-8 md:pb-10" : "-translate-y-2.5 pb-0"}`}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
