"use client"
import { LinkedinLogo } from "@phosphor-icons/react"
import Image from "next/image"
import BiographyDisclosure from "~/components/biography-disclosure"
import type { PersonEntry } from "~/lib/page-content"
import { defaultPeople } from "~/lib/people"
import { usePageDraft } from "./page-editing"
function TeamSection({
  id,
  title,
  number,
  people,
}: {
  id: string
  title: string
  number: string
  people: PersonEntry[]
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-t border-[#0d132d]/15 py-20 md:py-28"
    >
      <div className="site-gutter">
        <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5 text-[#737682]">{number} / Our people</p>
            <h2
              id={`${id}-title`}
              className="font-header text-section-title font-medium text-balance"
            >
              {title}
            </h2>
          </div>
          <span className="text-sm text-[#5f626b]">Expertise. Perspective. Commitment.</span>
        </div>
        <div className="grid items-start gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-8">
          {people.map((person) => (
            <article
              key={person.id}
              className="relative min-w-0 pt-8 before:absolute before:inset-x-[7.5%] before:top-0 before:border-t before:border-[#0d132d]/20"
            >
              <div className="relative mx-auto mb-7 aspect-square w-44 overflow-hidden rounded-full bg-[#e9e8e4] md:w-52">
                <Image
                  src={person.photo}
                  alt={person.alt}
                  unoptimized={person.photo.startsWith("http")}
                  fill
                  sizes="(min-width: 768px) 208px, 176px"
                  className="object-cover grayscale"
                />
              </div>
              <h3 className="text-center font-header text-xl font-medium tracking-[-0.02em]">
                {person.name}
              </h3>
              <p className="mt-2 min-h-12 text-center text-sm leading-6 text-[#5f626b]">
                {person.role}
              </p>
              {
                <div className="mt-2 flex justify-center">
                  <a
                    href={person.linkedin ?? "https://www.linkedin.com/company/harkcon-inc."}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      person.linkedin
                        ? `View ${person.name} on LinkedIn (opens in a new tab)`
                        : "View Harkcon on LinkedIn (opens in a new tab)"
                    }
                    className="inline-flex min-h-11 items-center gap-2 px-3 text-sm text-[#5f626b] underline-offset-4 transition-colors hover:text-[#0d132d] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d132d]"
                  >
                    <LinkedinLogo aria-hidden="true" weight="fill" className="size-5" /> LinkedIn
                  </a>
                </div>
              }
              {person.biography && (
                <BiographyDisclosure name={person.name}>
                  <p className="pb-6 text-sm leading-7 text-[#454955]">{person.biography}</p>
                </BiographyDisclosure>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function LeadershipTeams() {
  const { draft, editing, editPerson } = usePageDraft()
  const people = draft.people ?? defaultPeople()
  if (editing)
    return (
      <div className="site-gutter space-y-10 py-16">
        {(["executive", "program"] as const).map((group) => (
          <section key={group}>
            <h2 className="mb-5 font-header text-2xl">
              {group === "executive" ? "Executive leadership" : "Program management"}
            </h2>
            <div className="divide-y rounded-xl border border-slate-200 bg-white">
              {people
                .filter((person) => person.group === group)
                .map((person) => (
                  <button
                    type="button"
                    key={person.id}
                    className="flex w-full items-center gap-4 p-4 text-left"
                    onClick={() => editPerson?.(person)}
                  >
                    <Image
                      src={person.photo}
                      alt={person.alt}
                      width={48}
                      height={48}
                      unoptimized
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <span>
                      <strong className="block">{person.name}</strong>
                      <span className="text-sm text-slate-500">{person.role}</span>
                    </span>
                    <span className="ml-auto text-sm text-blue-700">Edit</span>
                  </button>
                ))}
            </div>
            <button
              type="button"
              className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm"
              onClick={() =>
                editPerson?.({
                  id: crypto.randomUUID(),
                  name: "",
                  role: "",
                  photo: "",
                  alt: "",
                  linkedin: "",
                  biography: "",
                  group,
                })
              }
            >
              + Add person
            </button>
          </section>
        ))}
      </div>
    )
  return (
    <>
      <TeamSection
        id="executive-leadership"
        title="Executive leadership"
        number="01"
        people={people.filter((person) => person.group === "executive")}
      />
      <div className="bg-[#f4f3f0]">
        <TeamSection
          id="program-management"
          title="Program management"
          number="02"
          people={people.filter((person) => person.group === "program")}
        />
      </div>
    </>
  )
}
