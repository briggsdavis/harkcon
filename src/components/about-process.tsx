"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { keepClosingWords } from "~/lib/typography"
import { useEditingMode } from "./editing-mode"
import { PageText, PageImage } from "./page-editing"

const steps = [
  {
    title: "Understand the workforce.",
    description: "Assess roles, staffing, and organizational requirements with evidence.",
    image: "/images/editorial/about-wild-coast.jpg",
    alt: "Rough ocean waves breaking along a rocky shoreline",
    tasks: [
      [
        "Analyze",
        "Model workforce requirements and assess staffing needs against operational demands.",
      ],
      ["Align", "Develop competencies and align roles with the work people need to perform."],
    ],
  },
  {
    title: "Develop practical training.",
    description: "Design training and Human Systems Integration support around the work.",
    image: "/images/editorial/contracts-uscg-itass.jpg",
    alt: "A rescue crew underway in an orange lifeboat",
    tasks: [
      ["Design", "Develop training strategies, curricula, and instructional systems."],
      [
        "Support",
        "Provide Human Systems Integration support through major acquisition lifecycles.",
      ],
    ],
  },
  {
    title: "Improve how work gets done.",
    description: "Connect process analysis, policy, and program support to organizational needs.",
    image: "/images/editorial/about-rough-coast.jpg",
    alt: "Waves breaking against the rocky coast of Western Australia",
    tasks: [
      ["Review", "Analyze business processes and identify opportunities to improve performance."],
      [
        "Refine",
        "Reengineer workflows and modernize policies to support operational requirements.",
      ],
    ],
  },
  {
    title: "Strengthen mission readiness.",
    description: "Help agencies prepare for disruptions and maintain continuity programs.",
    image: "/images/editorial/process-lasting-impact.jpg",
    alt: "Portland Head Light on the coast of Maine",
    tasks: [
      [
        "Prepare",
        "Develop and maintain continuity, devolution, and emergency preparedness programs.",
      ],
      ["Exercise", "Support tabletop, functional, and full-scale exercises under HSEEP guidance."],
    ],
  },
]

export default function AboutProcess() {
  const editing = useEditingMode()
  const [active, setActive] = useState(0)
  const timeline = useRef<HTMLOListElement>(null)

  useEffect(() => {
    if (editing) return
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
  }, [editing])

  return (
    <section className="bg-[#f4f3f0] py-24 md:py-32" aria-labelledby="process-title">
      <div className="site-gutter">
        <PageText field="about-process.our-capabilities">
          <p className="eyebrow mb-8">Our&nbsp;capabilities</p>
        </PageText>
        <PageText field="about-process.process-title">
          <h2
            id="process-title"
            className="max-w-3xl font-header text-section-title font-medium text-balance"
          >
            Performance in&nbsp;practice.
          </h2>
        </PageText>
        <div className="relative mt-16 grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <ol ref={timeline} className="ml-3 border-l border-[#0d132d]/20">
            {steps.map((step, index) => (
              <li
                key={step.title}
                aria-current={active === index ? "step" : undefined}
                className="relative pb-16 pl-8 last:pb-0 lg:flex lg:min-h-[75svh] lg:flex-col lg:justify-center lg:pb-20 lg:pl-12"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-1 -left-[7px] grid h-[13px] w-[13px] place-items-center rounded-full border border-[#0d132d] bg-[#f4f3f0] lg:top-[calc(50%-150px)]"
                >
                  <span
                    className={`h-1 w-1 rounded-full bg-brand-gold transition-opacity duration-200 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}
                  />
                </span>
                <p className="mb-5 font-eyebrow text-xs tracking-[0.15em] text-[#5f626b]">
                  STEP 0{index + 1}
                </p>
                <PageText field={`process-step-${index}-title`}>
                  <h3 className="font-header text-card-title font-medium">
                    {keepClosingWords(step.title)}
                  </h3>
                </PageText>
                <PageText field={`process-step-${index}-description`}>
                  <p className="mt-5 max-w-md text-body-copy text-[#454955]">
                    {keepClosingWords(step.description)}
                  </p>
                </PageText>
                <ul className="mt-8 space-y-6">
                  {step.tasks.map(([title, description]) => (
                    <li key={title}>
                      <PageText field={`process-step-${index}-task-${title}-title`}>
                        <h4 className="text-sm font-semibold">{keepClosingWords(title)}</h4>
                      </PageText>
                      <PageText field={`process-step-${index}-task-${title}-description`}>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-[#5f626b]">
                          {keepClosingWords(description)}
                        </p>
                      </PageText>
                    </li>
                  ))}
                </ul>
                <div
                  className={`relative mt-8 aspect-[4/3] overflow-hidden ${editing ? "" : "lg:hidden"}`}
                >
                  <PageImage field={`process-step-${index}-image`}>
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="90vw"
                      className="object-cover"
                    />
                  </PageImage>
                </div>
              </li>
            ))}
          </ol>
          <div
            className={`${editing ? "!hidden" : ""} sticky top-28 hidden h-[calc(100svh-9rem)] max-h-[850px] overflow-hidden bg-[#dedfe2] lg:block`}
          >
            {steps.map((step, index) => (
              <PageImage key={step.image} field={`process-step-${index}-image`}>
                <Image
                  key={step.image}
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="50vw"
                  aria-hidden={active !== index}
                  className={`object-cover transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}
                />
              </PageImage>
            ))}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-8 pt-24 pb-8 text-white">
              <p className="text-xs tracking-[0.15em]">0{active + 1} /&nbsp;04</p>
              <PageText field={`process-step-${active}-title`}>
                <p className="mt-3 font-header text-2xl">{keepClosingWords(steps[active].title)}</p>
              </PageText>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
