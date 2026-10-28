"use client"

import { CaretDown } from "@phosphor-icons/react"
import { useId, useState, type ReactNode } from "react"

export default function BiographyDisclosure({
  name,
  children,
}: {
  name: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <>
      <details className="disclosure group mt-5 hidden lg:block">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d132d] [&::-webkit-details-marker]:hidden">
          <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brand-red after:transition-transform after:duration-300 group-focus-within:after:scale-x-100 group-hover:after:scale-x-100">
            Biography<span className="sr-only"> of {name}</span>
          </span>
          <CaretDown
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
          />
        </summary>
        {children}
      </details>
      <div className="group mt-5 lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d132d]"
        >
          <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brand-red after:transition-transform after:duration-300 group-focus-within:after:scale-x-100 group-hover:after:scale-x-100">
            Biography<span className="sr-only"> of {name}</span>
          </span>
          <CaretDown
            aria-hidden="true"
            className={`size-4 transition-transform duration-500 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          />
        </button>
        <div
          id={id}
          inert={!open}
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">{children}</div>
        </div>
      </div>
    </>
  )
}
