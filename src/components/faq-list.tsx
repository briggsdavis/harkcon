"use client"

import { Plus } from "@phosphor-icons/react"
import { useCallback, useState } from "react"
import type { MouseEvent } from "react"
import { keepClosingWords } from "~/lib/typography"
import { PageText, usePageDraft } from "./page-editing"

type Faq = {
  question: string
  answer: string
}

export default function FaqList({ faqs, dark = false }: { faqs: Faq[]; dark?: boolean }) {
  const content = usePageDraft()
  const entries =
    content.draft.faqs ?? faqs.map((faq, index) => ({ ...faq, id: `default-${index}` }))
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.value)
    setOpenIndex((current) => (current === index ? null : index))
  }, [])

  return (
    <div>
      {content.editing && (
        <button
          type="button"
          className="mb-5 rounded-lg bg-white px-4 py-2 font-body text-sm text-slate-800"
          onClick={() =>
            content.editFaqs?.(
              entries.map((faq) => ({
                ...faq,
                question: content.draft.fields[`faq-${faq.id}-question`]?.text ?? faq.question,
                answer: content.draft.fields[`faq-${faq.id}-answer`]?.text ?? faq.answer,
              })),
            )
          }
        >
          Manage FAQs · Add / remove
        </button>
      )}
      {entries.map((faq, index) => {
        const open = content.editing || openIndex === index
        const answerId = `faq-answer-${dark ? "dark" : "light"}-${index}`

        return (
          <div
            className={`border-t last:border-b ${dark ? "border-white/18" : "border-[#0d132d]/20"}`}
            key={faq.id}
          >
            {content.editing ? (
              <div className="flex w-full items-center gap-8 py-7 text-left font-header text-card-title md:py-9">
                <PageText field={`faq-${faq.id}-question`}>
                  <span>{keepClosingWords(faq.question)}</span>
                </PageText>
              </div>
            ) : (
              <button
                type="button"
                value={index}
                className="group flex w-full items-center gap-8 py-7 text-left font-header text-card-title md:py-9"
                aria-expanded={open}
                aria-controls={answerId}
                onClick={toggle}
              >
                <span className="text-balance transition-transform delay-0 duration-500 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none">
                  {keepClosingWords(faq.question)}
                </span>
                <span
                  data-active={open}
                  className={`control-fill ${dark ? "control-fill--light" : ""} ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-none border font-body ${dark ? "border-white/25" : "border-[#0d132d]/25"} text-2xl`}
                  aria-hidden="true"
                >
                  <Plus
                    className={`transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-45" : ""}`}
                  />
                </span>
              </button>
            )}
            <div
              id={answerId}
              className={`faq-answer grid ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              aria-hidden={!open}
            >
              <div className="overflow-hidden">
                <PageText field={`faq-${faq.id}-answer`}>
                  <p
                    className={`max-w-3xl pr-12 text-body-copy text-pretty md:pr-20 ${dark ? "text-white/68" : "text-[#5f626b]"} ${open ? "translate-y-0 pb-8 md:pb-10" : "-translate-y-2.5 pb-0"}`}
                  >
                    {keepClosingWords(faq.answer)}
                  </p>
                </PageText>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
