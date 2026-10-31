"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const sessionKey = "harkcon-home-entry-seen"
const quote = "Credit goes to the man in the arena"
// Begin the curtain lift after a quarter of the original hold following the last letter.
const textFinishedAt = (quote.replaceAll(" ", "").length - 1) * 28 + 420
const revealAt = textFinishedAt + (2825 - textFinishedAt) / 4
const finishAt = revealAt + 675

// Runs before the homepage markup is painted, so returning visits skip the curtain.
const bootstrap = `(() => { try { if (!sessionStorage.getItem("${sessionKey}")) document.documentElement.dataset.homeEntry = "playing"; } catch { document.documentElement.dataset.homeEntry = "playing"; } })()`

export default function HomeEntry() {
  const [mounted, setMounted] = useState(true)
  const play = useRef<boolean | null>(null)
  useEffect(() => {
    const root = document.documentElement
    if (play.current === null) play.current = root.dataset.homeEntry === "playing"
    if (!play.current) {
      setMounted(false)
      return
    }
    root.dataset.homeEntry = "playing"
    try {
      sessionStorage.setItem(sessionKey, "true")
    } catch {
      /* The intro also works when storage is unavailable. */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const reveal = window.setTimeout(
      () => {
        root.dataset.homeEntry = "revealing"
      },
      reduced ? 650 : revealAt,
    )
    const finish = window.setTimeout(
      () => {
        delete root.dataset.homeEntry
        setMounted(false)
      },
      reduced ? 800 : finishAt,
    )
    return () => {
      window.clearTimeout(reveal)
      window.clearTimeout(finish)
      delete root.dataset.homeEntry
    }
  }, [])

  let letter = 0
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      {mounted && (
        <div
          className="home-entry fixed inset-0 z-[120] grid place-items-center bg-white px-6 text-[#0d132d]"
          data-reveal-skip
          aria-label="Welcome to Harkcon"
          data-lenis-prevent
        >
          <div className="relative flex w-full max-w-3xl flex-col items-center text-center">
            <div className="home-entry-mark grid h-[8.4rem] w-[8.4rem] place-items-center overflow-hidden bg-[#0d132d] sm:h-[9.6rem] sm:w-[9.6rem]">
              <Image
                src="/images/transition-logo-white.svg"
                alt="Harkcon"
                width={116}
                height={116}
                priority
                className="h-24 w-24 object-contain sm:h-[7.2rem] sm:w-[7.2rem]"
              />
            </div>
            <blockquote className="absolute top-full mt-9 w-full sm:mt-11">
              <p
                aria-label={quote}
                className="font-header text-[clamp(0.81rem,2.28vw,1.35rem)] leading-snug font-medium italic"
              >
                <span aria-hidden="true">
                  {quote.split(" ").map((word, index) => (
                    <span key={`${index}-${word}`} className="inline-block whitespace-nowrap">
                      {Array.from(word).map((character, i) => {
                        const delay = letter++ * 28
                        return (
                          <span
                            key={i}
                            className="home-entry-letter inline-block"
                            style={{ animationDelay: `${delay}ms` }}
                          >
                            {character}
                          </span>
                        )
                      })}
                      {index < quote.split(" ").length - 1 && (
                        <span className="inline-block w-[0.28em]" />
                      )}
                    </span>
                  ))}
                </span>
              </p>
              <footer className="home-entry-credit mt-5 font-eyebrow text-sm tracking-[0.08em] sm:text-base">
                <span aria-label="— Theodore Roosevelt">
                  <span aria-hidden="true">
                    {Array.from("— Theodore Roosevelt").map((character, index) => (
                      <span
                        key={index}
                        className="home-entry-letter inline-block whitespace-pre"
                        style={{ animationDelay: `${index * 22}ms` }}
                      >
                        {character}
                      </span>
                    ))}
                  </span>
                </span>
              </footer>
            </blockquote>
          </div>
        </div>
      )}
    </>
  )
}
