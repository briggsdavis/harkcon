"use client"

import { useEffect, useRef, useState } from "react"
import { keepClosingWords } from "~/lib/typography"

const processSteps = [
  {
    title: "Understand the workforce.",
    outcome: "Workforce plans grounded in mission needs.",
    detail: "Assess roles, staffing, and organizational requirements with evidence.",
    tasks: [
      [
        "01 / Analyze",
        "Model workforce requirements and assess staffing needs against operational demands.",
      ],
      ["02 / Align", "Develop competencies and align roles with the work people need to perform."],
      [
        "03 / Evaluate",
        "Use job task analysis and credentialing reviews to identify performance needs.",
      ],
    ],
  },
  {
    title: "Develop practical training.",
    outcome: "Skills aligned with operational tasks.",
    detail: "Design training and Human Systems Integration support around the work.",
    tasks: [
      ["01 / Design", "Develop training strategies, curricula, and instructional systems."],
      [
        "02 / Support",
        "Provide Human Systems Integration support through major acquisition lifecycles.",
      ],
      ["03 / Deliver", "Develop and deliver training for domestic and international audiences."],
    ],
  },
  {
    title: "Improve how work gets done.",
    outcome: "Processes that support the mission.",
    detail: "Connect process analysis, policy, and program support to organizational needs.",
    tasks: [
      [
        "01 / Review",
        "Analyze business processes and identify opportunities to improve performance.",
      ],
      [
        "02 / Refine",
        "Reengineer workflows and modernize policies to support operational requirements.",
      ],
      [
        "03 / Coordinate",
        "Provide strategic planning, acquisition support, and program management.",
      ],
    ],
  },
  {
    title: "Strengthen mission readiness.",
    outcome: "Support for essential operations.",
    detail: "Help agencies prepare for disruptions and maintain continuity programs.",
    tasks: [
      [
        "01 / Prepare",
        "Develop and maintain continuity, devolution, and emergency preparedness programs.",
      ],
      [
        "02 / Exercise",
        "Support tabletop, functional, and full-scale exercises under HSEEP guidance.",
      ],
      [
        "03 / Improve",
        "Develop after-action reports, corrective action programs, and lessons learned analysis.",
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
    label: `AREA 0${stepIndex + 1}`,
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
    const motionEnabled = window.matchMedia("(prefers-reduced-motion: no-preference)")
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!section.current || !rail.current || !motionEnabled.matches) return
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
    motionEnabled.addEventListener("change", update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      motionEnabled.removeEventListener("change", update)
    }
  }, [])
  return (
    <section
      ref={section}
      data-reveal-skip
      className="relative bg-[#f7f6f3] motion-safe:h-[420svh]"
      aria-labelledby="solutions-process-title"
    >
      <div className="hidden overflow-hidden motion-safe:sticky motion-safe:top-0 motion-safe:flex motion-safe:h-svh motion-safe:min-h-[480px] motion-safe:flex-col lg:motion-safe:min-h-[600px]">
        <div className="site-gutter flex items-center justify-between pt-24 lg:pt-32">
          <h2 id="solutions-process-title" className="eyebrow">
            Our&nbsp;capabilities
          </h2>
          <p className="font-eyebrow text-xs tracking-widest text-[#6b6e78]">
            0{milestones[active].stepIndex + 1} /&nbsp;04
          </p>
        </div>
        <div className="relative mx-auto flex w-full max-w-4xl flex-1 items-center justify-center overflow-hidden px-12 text-center">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.title}
              aria-hidden={active !== index}
              className={`absolute inset-x-0 px-5 transition-transform duration-[1100ms] ease-[cubic-bezier(0.45,0,0.2,1)] lg:px-12 ${active === index ? "translate-x-0" : index < active ? "-translate-x-full" : "translate-x-full"}`}
            >
              <p className="mb-7 font-eyebrow text-xs tracking-[0.18em] text-[#777b85] uppercase">
                {keepClosingWords(milestone.label)}
              </p>
              <h3 className="font-header text-section-title font-medium text-balance">
                {keepClosingWords(milestone.title)}
              </h3>
              <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-pretty text-[#5f626b]">
                {keepClosingWords(milestone.description)}
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
          Scroll to follow the&nbsp;process
        </p>
      </div>
      <div className="site-gutter py-24 motion-safe:hidden">
        <p className="eyebrow mb-10">Our&nbsp;capabilities</p>
        <h2 className="mb-14 font-header text-section-title font-medium">
          From insight to lasting&nbsp;impact.
        </h2>
        <ol className="ml-2 border-l border-[#0d132d]/20">
          {steps.map((step, index) => (
            <li key={step.title} className="relative pb-16 pl-8 last:pb-0">
              <span aria-hidden="true" className="absolute top-1 -left-2 h-4 w-4 bg-[#0d132d]" />
              <p className="eyebrow mb-5 text-[#777b85]">Step 0{index + 1}</p>
              <h3 className="font-header text-card-title font-medium">
                {keepClosingWords(step.title)}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#5f626b]">
                {keepClosingWords(step.detail)}
              </p>
              <ol className="mt-8 space-y-8">
                {step.tasks.map(([title, detail]) => (
                  <li key={title} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute top-2 -left-[35px] h-1.5 w-1.5 rounded-full bg-[#8b8e96]"
                    />
                    <h4 className="text-sm font-semibold">{title.split(" / ")[1]}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#5f626b]">
                      {keepClosingWords(detail)}
                    </p>
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
