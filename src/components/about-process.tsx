"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    title: "Understand the mission.",
    description:
      "Start with the people, priorities, and real-world conditions behind the challenge.",
    image: "/images/careers-interview.jpg",
    alt: "Colleagues discussing priorities in an interview",
    tasks: [
      ["Listen first", "Meet stakeholders and define what success needs to look like."],
      [
        "Establish a baseline",
        "Review workflows, workforce data, and current performance to identify the gaps.",
      ],
    ],
  },
  {
    title: "Design the right approach.",
    description: "Turn evidence into a focused plan built around your organization.",
    image: "/images/about-collaboration.jpg",
    alt: "Team members collaborating on an approach",
    tasks: [
      [
        "Shape the solution",
        "Connect findings to practical changes in people, processes, and training.",
      ],
      ["Align the team", "Agree on priorities, responsibilities, and measures of progress."],
    ],
  },
  {
    title: "Put the plan to work.",
    description: "Work alongside your team to translate recommendations into everyday capability.",
    image: "/images/careers-collaboration.jpg",
    alt: "Colleagues working together to deliver a project",
    tasks: [
      ["Build and test", "Pilot tools and training, gather feedback, and adjust before expanding."],
      [
        "Support adoption",
        "Equip your people with the guidance and resources to sustain new ways of working.",
      ],
    ],
  },
  {
    title: "Measure. Learn. Refine.",
    description: "Keep improvement moving long after the first milestone.",
    image: "/images/about-team.png",
    alt: "Harkcon team bringing experience together",
    tasks: [
      ["Track the results", "Compare outcomes with the baseline and the goals we set together."],
      [
        "Make progress last",
        "Share lessons, transfer knowledge, and identify the next opportunity to improve.",
      ],
    ],
  },
]

export default function AboutProcess() {
  const [active, setActive] = useState(0)
  const timeline = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const items = Array.from(timeline.current?.children ?? [])
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.48
        let current = 0
        items.forEach((item, index) => {
          if (item.getBoundingClientRect().top <= line) current = index
        })
        setActive(current)
      })
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <section className="bg-[#f4f3f0] py-24 md:py-32" aria-labelledby="process-title">
      <div className="site-gutter">
        <p className="eyebrow mb-8">Our process</p>
        <h2
          id="process-title"
          className="max-w-3xl font-header text-section-title font-medium text-balance"
        >
          A clear path to better performance.
        </h2>
        <div className="relative mt-16 grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <ol ref={timeline} className="ml-3 border-l border-[#0d132d]/20">
            {steps.map((step, index) => (
              <li
                key={step.title}
                aria-current={active === index ? "step" : undefined}
                className="relative pb-16 pl-8 last:pb-0 lg:flex lg:min-h-[75svh] lg:flex-col lg:justify-center lg:pb-20 lg:pl-12"
              >
                <span
                  className={`absolute top-1 -left-[7px] h-[13px] w-[13px] rounded-full border border-[#0d132d] transition-colors duration-500 lg:top-[calc(50%-150px)] ${active === index ? "bg-[#0d132d]" : "bg-[#f4f3f0]"}`}
                />
                <p className="mb-5 font-eyebrow text-xs tracking-[0.15em] text-[#5f626b]">
                  STEP 0{index + 1}
                </p>
                <h3 className="font-header text-card-title font-medium">{step.title}</h3>
                <p className="mt-5 max-w-md text-body-copy text-[#454955]">{step.description}</p>
                <ul className="mt-8 space-y-6">
                  {step.tasks.map(([title, description]) => (
                    <li key={title}>
                      <h4 className="text-sm font-semibold">{title}</h4>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#5f626b]">
                        {description}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="relative mt-8 aspect-[4/3] overflow-hidden lg:hidden">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="90vw"
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ol>
          <div className="sticky top-28 hidden h-[calc(100svh-9rem)] max-h-[850px] overflow-hidden bg-[#dedfe2] lg:block">
            {steps.map((step, index) => (
              <Image
                key={step.image}
                src={step.image}
                alt={step.alt}
                fill
                sizes="50vw"
                aria-hidden={active !== index}
                className={`object-cover transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d132d]/80 to-transparent px-8 pt-24 pb-8 text-white">
              <p className="text-xs tracking-[0.15em]">0{active + 1} / 04</p>
              <p className="mt-3 font-header text-2xl">{steps[active].title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
