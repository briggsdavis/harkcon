"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { keepClosingWords } from "~/lib/typography"
import { useEditingMode } from "./editing-mode"
import { PageText, PageImage } from "./page-editing"

const steps = [
  {
    id: "listen",
    title: "WE LISTEN",
    description:
      "We listen carefully to what our clients need, understand their pain points, and present solutions designed specifically for their needs.",
    image: "/images/editorial/about-wild-coast.jpg",
    alt: "Rough ocean waves breaking along a rocky shoreline",
  },
  {
    id: "align",
    title: "WE ALIGN",
    description:
      "We continually assess project status to best align our solutions with our clients\u2019 needs.",
    image: "/images/editorial/contracts-uscg-itass.jpg",
    alt: "A rescue crew underway in an orange lifeboat",
  },
  {
    id: "provide",
    title: "WE PROVIDE",
    description:
      "We are a people-centric company comprised of personnel who consistently meet and routinely exceed our clients\u2019 requirements.",
    image: "/images/editorial/about-rough-coast.jpg",
    alt: "Waves breaking against the rocky coast of Western Australia",
  },
  {
    id: "execute",
    title: "WE EXECUTE",
    description:
      "We execute all projects in accordance with contract specifications, laws, policies, and regulations, and we go above and beyond to meet client expectations.",
    image: "/images/editorial/process-lasting-impact.jpg",
    alt: "Portland Head Light on the coast of Maine",
  },
  {
    id: "deliver",
    title: "WE DELIVER",
    description:
      "As a performance management and technology company, we deliver solutions using a combination of subject matter experts and technology to achieve high-quality results.",
    image: "/images/editorial/about-process-deliver.jpg",
    alt: "Ocean waves washing over rocks along the coast of Cape Town",
  },
  {
    id: "develop",
    title: "WE DEVELOP",
    description:
      "As thought leaders in Human and Organizational Performance, we continually evaluate and develop our capability, improving processes and sharing valuable research and insights with our partners and clients to master performance in everything we do.",
    image: "/images/editorial/about-process-develop.jpg",
    alt: "Waves crashing against rocks at Bodega Bay",
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
                <PageText field={`process-${step.id}-title`}>
                  <h3 className="font-header text-card-title font-medium">
                    {keepClosingWords(step.title)}
                  </h3>
                </PageText>
                <PageText field={`process-${step.id}-description`}>
                  <p className="mt-5 max-w-md text-body-copy text-[#454955]">
                    {keepClosingWords(step.description)}
                  </p>
                </PageText>
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
              <p className="text-xs tracking-[0.15em]">
                0{active + 1} /&nbsp;0{steps.length}
              </p>
              <PageText field={`process-${steps[active].id}-title`}>
                <p className="mt-3 font-header text-2xl">{keepClosingWords(steps[active].title)}</p>
              </PageText>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
