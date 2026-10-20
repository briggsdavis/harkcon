"use client"

import { useEffect, useRef, useState } from "react"

const processSteps = [
  {
    title: "Define the challenge.",
    outcome: "A shared definition of success.",
    detail: "Build a clear picture of your mission before deciding what needs to change.",
    tasks: [
      [
        "01 / Listen",
        "Meet leaders, practitioners, and end users. Capture operational priorities and the constraints your team works within.",
      ],
      [
        "02 / Examine",
        "Review workforce data, existing processes, and performance measures. Identify where evidence is missing.",
      ],
      [
        "03 / Align",
        "Agree on the problem, scope, and outcomes. Establish a baseline against which progress can be measured.",
      ],
    ],
  },
  {
    title: "Shape the solution.",
    outcome: "An actionable plan, built together.",
    detail: "Translate findings into a practical approach that fits the people doing the work.",
    tasks: [
      [
        "01 / Map",
        "Connect performance gaps to their causes across roles, processes, training, and supporting systems.",
      ],
      [
        "02 / Prioritize",
        "Compare options by impact, feasibility, and mission risk. Focus effort where it can make the greatest difference.",
      ],
      [
        "03 / Plan",
        "Define workstreams, responsibilities, milestones, and measures. Validate the approach with the people who will use it.",
      ],
    ],
  },
  {
    title: "Build capability.",
    outcome: "A solution ready for everyday use.",
    detail: "Work alongside your team to test the approach and put improvement into practice.",
    tasks: [
      [
        "01 / Develop",
        "Create the tools, workflows, guidance, or learning resources needed to support the agreed approach.",
      ],
      [
        "02 / Pilot",
        "Test with representative users and realistic tasks. Gather feedback and refine before a broader rollout.",
      ],
      [
        "03 / Implement",
        "Introduce changes in manageable stages. Support managers and practitioners as new ways of working take hold.",
      ],
    ],
  },
  {
    title: "Make progress last.",
    outcome: "Evidence of progress. A path forward.",
    detail: "Measure what changed, transfer knowledge, and keep strengthening performance.",
    tasks: [
      [
        "01 / Evaluate",
        "Compare results with the baseline. Review both measurable outcomes and the experience of the people doing the work.",
      ],
      [
        "02 / Transfer",
        "Hand over resources, document decisions, and build internal ownership so the organization can sustain the work.",
      ],
      [
        "03 / Refine",
        "Use lessons learned to adjust the approach. Identify the next improvement and agree on a practical path forward.",
      ],
    ],
  },
]

const steps = processSteps.map((step) => ({
  title: step.title,
  detail: step.detail,
  outcome: step.outcome,
  tasks: [
    [
      `01 / ${step.tasks[0][0].split(" / ")[1]} & ${step.tasks[1][0].split(" / ")[1].toLowerCase()}`,
      `${step.tasks[0][1]} ${step.tasks[1][1]}`,
    ],
    step.tasks[2],
  ],
}))

const milestones = steps.flatMap((step, stepIndex) => [
  {
    title: step.title,
    description: step.detail,
    label: `STEP 0${stepIndex + 1}`,
    stepIndex,
    checkpoint: true,
  },
  ...step.tasks.map(([title, description]) => ({
    title: title.split(" / ")[1],
    description,
    label: step.title,
    stepIndex,
    checkpoint: false,
  })),
])

const segmentStyles = milestones.map((_, index) => ({
  transform: `scaleX(clamp(0, calc(var(--timeline-progress, 0) - ${index}), 1))`,
}))

export default function SolutionsProcess() {
  const section = useRef<HTMLElement>(null)
  const rail = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const desktop = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    )
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!section.current || !rail.current || !desktop.matches) return
        const bounds = section.current.getBoundingClientRect()
        const progress = Math.max(
          0,
          Math.min(1, -bounds.top / (bounds.height - window.innerHeight)),
        )
        const distance = (milestones.length - 1) * 176
        rail.current.style.transform = `translate3d(${-progress * distance}px,0,0)`
        rail.current.style.setProperty(
          "--timeline-progress",
          String(progress * (milestones.length - 1)),
        )
        setActive(Math.round(progress * (milestones.length - 1)))
      })
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    desktop.addEventListener("change", update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      desktop.removeEventListener("change", update)
    }
  }, [])
  return (
    <section
      ref={section}
      data-reveal-skip
      className="relative bg-[#f7f6f3] lg:motion-safe:h-[420svh]"
      aria-labelledby="solutions-process-title"
    >
      <div className="hidden overflow-hidden lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:flex lg:motion-safe:h-svh lg:motion-safe:min-h-[600px] lg:motion-safe:flex-col">
        <div className="site-gutter flex items-center justify-between pt-32">
          <h2 id="solutions-process-title" className="eyebrow">
            Our process
          </h2>
          <p className="font-eyebrow text-xs tracking-widest text-[#6b6e78]">
            0{milestones[active].stepIndex + 1} / 04
          </p>
        </div>
        <div className="relative mx-auto flex w-full max-w-4xl flex-1 items-center justify-center overflow-hidden px-12 text-center">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.title}
              aria-hidden={active !== index}
              className={`absolute inset-x-0 px-12 transition-transform duration-[1100ms] ease-[cubic-bezier(0.45,0,0.2,1)] ${active === index ? "translate-x-0" : index < active ? "-translate-x-full" : "translate-x-full"}`}
            >
              <p className="mb-7 font-eyebrow text-xs tracking-[0.18em] text-[#777b85] uppercase">
                {milestone.label}
              </p>
              <h3 className="font-header text-section-title font-medium text-balance">
                {milestone.title}
              </h3>
              <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-pretty text-[#5f626b]">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
        <div className="relative mb-16 h-28 shrink-0">
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-5 left-1/2 w-px bg-[#0d132d]/10"
          />
          <ol ref={rail} className="absolute top-8 left-1/2 flex will-change-transform">
            {milestones.map((milestone, index) => (
              <li
                key={milestone.title}
                aria-current={active === index ? "step" : undefined}
                className={`relative w-[176px] shrink-0 ${index < milestones.length - 1 ? "border-t border-[#0d132d]/20" : ""}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-[-1px] left-0 h-px w-full origin-left bg-[#0d132d] ${index === milestones.length - 1 ? "hidden" : ""}`}
                  style={segmentStyles[index]}
                />
                <span
                  aria-hidden="true"
                  className={`absolute top-0 left-0 isolate -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-[#0d132d]/35 bg-white before:absolute before:inset-0 before:origin-left before:bg-[#0d132d] before:transition-transform before:duration-700 before:ease-out ${milestone.checkpoint ? "h-5 w-5" : "h-1.5 w-1.5 rounded-full"} ${index <= active ? "before:scale-x-100" : "before:scale-x-0"} ${index === active && milestone.checkpoint ? "ring-8 ring-[#0d132d]/[0.06]" : ""}`}
                />
                <p
                  className={`mt-7 -translate-x-1/2 px-2 text-center font-eyebrow text-[10px] tracking-wider transition-colors duration-500 ${active === index ? "text-[#0d132d]" : "text-[#8b8e96]"}`}
                >
                  {milestone.checkpoint
                    ? `0${milestone.stepIndex + 1} / ${milestone.title}`
                    : milestone.title}
                </p>
              </li>
            ))}
          </ol>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f7f6f3] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f7f6f3] to-transparent"
          />
        </div>
        <p className="pb-8 text-center font-eyebrow text-[10px] tracking-[0.18em] text-[#8b8e96] uppercase">
          Scroll to follow the process
        </p>
      </div>
      <div className="site-gutter py-24 lg:motion-safe:hidden">
        <p className="eyebrow mb-10">Our process</p>
        <h2 className="mb-14 font-header text-section-title font-medium">
          From insight to lasting impact.
        </h2>
        <ol className="ml-2 border-l border-[#0d132d]/20">
          {steps.map((step, index) => (
            <li key={step.title} className="relative pb-16 pl-8 last:pb-0">
              <span aria-hidden="true" className="absolute top-1 -left-2 h-4 w-4 bg-[#0d132d]" />
              <p className="eyebrow mb-5 text-[#777b85]">Step 0{index + 1}</p>
              <h3 className="font-header text-card-title font-medium">{step.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#5f626b]">{step.detail}</p>
              <ol className="mt-8 space-y-8">
                {step.tasks.map(([title, detail]) => (
                  <li key={title} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute top-2 -left-[35px] h-1.5 w-1.5 rounded-full bg-[#8b8e96]"
                    />
                    <h4 className="text-sm font-semibold">{title.split(" / ")[1]}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#5f626b]">{detail}</p>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
