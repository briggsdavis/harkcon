"use client"

import Image from "next/image"
import { useState } from "react"

const panels = [
  {
    image: "/workforce-planning-team.jpg",
    alt: "Team reviewing plans together around a table",
    title: "Know the workforce",
    description: "Make staffing decisions from what the mission actually requires.",
  },
  {
    image: "/training-session.jpg",
    alt: "Instructor speaking with students in a classroom",
    title: "Build capability",
    description: "Give people the training and tools to meet changing mission needs.",
  },
  {
    image: "/maritime-operations-bridge.jpg",
    alt: "Navigation consoles on the bridge of a ship at sea",
    title: "Sustain the mission",
    description: "Keep essential operations ready through change and disruption.",
  },
] as const

const columns = [
  "lg:grid-cols-[1.35fr_1fr_1fr]",
  "lg:grid-cols-[1fr_1.35fr_1fr]",
  "lg:grid-cols-[1fr_1fr_1.35fr]",
] as const

export default function ServiceGrid() {
  const [activePanel, setActivePanel] = useState(0)

  return (
    <section aria-label="What Harkcon does" className="bg-brand-navy text-brand-white">
      <div
        className={`grid motion-reduce:transition-none lg:transition-[grid-template-columns] lg:duration-400 lg:ease-in-out ${columns[activePanel]}`}
      >
        {panels.map((panel, index) => (
          // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- Hover only changes the visual layout; the article is not a control.
          <article
            key={panel.title}
            onMouseEnter={() => setActivePanel(index)}
            className="relative isolate min-h-105 min-w-0 overflow-hidden sm:min-h-130"
          >
            <Image
              src={panel.image}
              alt={panel.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-brand-navy/65 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <h2 className="font-header text-xl leading-tight font-semibold whitespace-nowrap sm:text-2xl">
                {panel.title}
              </h2>
              <p className="mt-3 max-w-sm text-base leading-7 text-brand-white/90">
                {panel.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
