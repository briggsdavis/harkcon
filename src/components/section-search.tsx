"use client"
import { ArrowUpRight, MagnifyingGlass, X } from "@phosphor-icons/react"
import { useEffect, useId, useRef, useState, type CSSProperties } from "react"
export type SearchSection = { id: string; title: string }
export default function SectionSearch({
  sections,
  pageTitle,
}: {
  sections: SearchSection[]
  pageTitle: string
}) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const [bounds, setBounds] = useState({ left: 0, right: 0 })
  useEffect(() => {
    const nav = trigger.current?.closest("nav")
    if (!nav) return
    const measure = () => {
      const rect = nav.getBoundingClientRect()
      setBounds({ left: rect.left, right: window.innerWidth - rect.right })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(nav)
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])
  useEffect(() => {
    if (open) input.current?.focus()
  }, [open])
  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("pointerdown", closeOutside)
    return () => document.removeEventListener("pointerdown", closeOutside)
  }, [open])
  const id = useId()
  const matches = sections.filter((section) =>
    section.title.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <div ref={root} className="static shrink-0">
      <button
        ref={trigger}
        type="button"
        aria-label={open ? "Close section search" : `Search ${pageTitle} sections`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => {
          setOpen(!open)
          setQuery("")
        }}
        className="flex size-11 items-center justify-center transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <MagnifyingGlass aria-hidden="true" className="size-5" />
        )}
      </button>
      <div
        id={`${id}-panel`}
        inert={!open}
        aria-hidden={!open}
        style={
          {
            "--search-left": `${bounds.left}px`,
            "--search-right": `${bounds.right}px`,
          } as CSSProperties
        }
        className={`absolute inset-x-0 top-full z-50 mt-0 w-full origin-top bg-white p-5 text-[#0d132d] shadow-[0_12px_40px_rgba(13,19,45,0.16)] transition-[opacity,transform,visibility] duration-300 motion-reduce:transition-none lg:right-(--search-right) lg:left-(--search-left) lg:mt-0 lg:w-auto lg:p-7 ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
      >
        <label
          htmlFor={id}
          className="mb-3 block font-eyebrow text-xs font-semibold tracking-[0.12em] uppercase"
        >
          {pageTitle} sections
        </label>
        <div className="relative">
          <input
            id={id}
            type="search"
            ref={input}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setOpen(false)
                trigger.current?.focus()
              }
            }}
            placeholder={`Search ${pageTitle} sections…`}
            aria-controls={`${id}-results`}
            className="w-full bg-transparent px-3 py-2 text-sm outline-none"
          />
          <span
            aria-hidden="true"
            className={`absolute inset-x-0 bottom-0 h-px origin-left bg-brand-red transition-transform duration-300 motion-reduce:transition-none ${open ? "scale-x-100" : "scale-x-0"}`}
          />
        </div>
        {
          <section
            id={`${id}-results`}
            aria-label="Matching sections"
            className="mt-3 max-h-72 overflow-y-auto border-t border-[#0d132d]/10 bg-white"
          >
            {matches.length ? (
              matches.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(event) => {
                    event.preventDefault()
                    const target = document.getElementById(section.id)
                    if (!target) return
                    setOpen(false)
                    setQuery("")
                    target.scrollIntoView({
                      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                        ? "instant"
                        : "smooth",
                      block: "start",
                    })
                    target.setAttribute("tabindex", "-1")
                    target.focus({ preventScroll: true })
                  }}
                  className="group flex items-center justify-between gap-5 px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
                >
                  <span className="transition-transform duration-500 ease-out group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none">
                    {section.title}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 shrink-0 transition-transform duration-500 ease-out group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none"
                  />
                </a>
              ))
            ) : (
              <p className="px-4 py-3 text-sm text-[#5f626b]">No matching sections.</p>
            )}
          </section>
        }
      </div>
    </div>
  )
}
