"use client"

import { useCallback, useEffect, useState } from "react"
import { Arrow } from "~/components/home-page"
import { careersPortalUrl, talentCommunityUrl, type CareerOpening } from "~/lib/careers"

type Result =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; openings: CareerOpening[] }
export default function CareersOpenings() {
  const [result, setResult] = useState<Result>({ status: "loading" })
  const [attempt, setAttempt] = useState(0)
  const retry = useCallback(() => {
    setResult({ status: "loading" })
    setAttempt((value) => value + 1)
  }, [])
  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        const response = await fetch(`/api/careers/openings?v=2&attempt=${attempt}`, {
          cache: "no-store",
          signal: controller.signal,
        })
        if (!response.ok) throw new Error("Unable to load openings")
        const data = (await response.json()) as { openings: CareerOpening[] }
        if (!Array.isArray(data.openings)) throw new Error("Invalid openings")
        if (!controller.signal.aborted) setResult({ status: "ready", openings: data.openings })
      } catch {
        if (!controller.signal.aborted) setResult({ status: "error" })
      }
    }
    void load()
    return () => controller.abort()
  }, [attempt])

  return (
    <div>
      <div aria-live="polite" aria-busy={result.status === "loading"}>
        {result.status === "loading" && (
          <div className="border-y border-[#0d132d]/20 py-10">
            <p className="text-sm text-[#5f626b]">Loading current openings…</p>
            <div aria-hidden="true" className="mt-7 space-y-6 motion-safe:animate-pulse">
              <div className="h-5 w-2/3 bg-[#f4f3f0]" />
              <div className="h-5 w-1/2 bg-[#f4f3f0]" />
              <div className="h-5 w-3/5 bg-[#f4f3f0]" />
            </div>
          </div>
        )}
        {result.status === "error" && (
          <div className="border-y border-[#0d132d]/20 py-10">
            <p className="text-body-copy">We couldn’t load the current openings.</p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <button type="button" onClick={retry} className="action-button">
                Try again <Arrow />
              </button>
              <a
                href={careersPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="animated-underline text-sm"
              >
                View openings on ADP
              </a>
            </div>
          </div>
        )}
        {result.status === "ready" &&
          (result.openings.length ? (
            <ul className="border-t border-[#0d132d]/20">
              {result.openings.map((opening) => (
                <li key={opening.id} className="border-b border-[#0d132d]/20">
                  <a
                    href={opening.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-6 py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d132d] md:py-9"
                  >
                    <div className="transition-transform duration-500 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none">
                      <h3 className="font-header text-card-title font-medium text-balance">
                        {opening.title}
                      </h3>
                      <p className="mt-3 text-sm text-[#5f626b]">
                        {[opening.location, opening.employmentType].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <span className="control-fill flex h-12 w-12 shrink-0 items-center justify-center border border-[#0d132d]/20 md:h-16 md:w-16">
                      <span className="sr-only">Apply on ADP (opens in a new tab)</span>
                      <Arrow
                        diagonal
                        className="transition-transform duration-500 ease-out group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="border-y border-[#0d132d]/20 py-10 text-body-copy">
              There are no current openings. Join our talent community to stay connected.
            </p>
          ))}
      </div>
      <a
        href={talentCommunityUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="action-button mt-10"
      >
        Join Our Talent Community <Arrow />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  )
}
