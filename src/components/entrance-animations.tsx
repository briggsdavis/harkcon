"use client"

import { useEffect } from "react"

const revealSelectors = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  ".pill-button",
  "button",
  "img",
  "[data-reveal-line]",
  "[data-reveal-item]",
].join(",")

export default function EntranceAnimations() {
  useEffect(() => {
    const observed = new WeakSet<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("reveal-visible")
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -7%" },
    )

    const prepare = (root: ParentNode) => {
      root.querySelectorAll(revealSelectors).forEach((element, index) => {
        if (observed.has(element)) return
        if (element.closest(".site-header, .client-marquee, [data-reveal-skip]")) return
        if (element.closest("[data-reveal-sequence]") && !element.matches("[data-reveal-item]")) {
          return
        }

        let revealTarget = element

        if (element.matches("[data-reveal-item]")) {
          element.classList.add("reveal-pill")
          const sequence = element.closest("[data-reveal-sequence]")
          const sequenceIndex = sequence
            ? Array.from(sequence.querySelectorAll("[data-reveal-item]")).indexOf(element)
            : 0
          ;(element as HTMLElement).style.setProperty("--reveal-delay", `${sequenceIndex * 85}ms`)
        } else if (element.matches("[data-reveal-line]")) {
          element.classList.add("reveal-line")
        } else if (element.matches(".pill-button, button")) {
          element.classList.add("reveal-button")
        } else if (element.matches("img")) {
          if (element.closest(".hero")) return
          revealTarget = element.parentElement ?? element
          revealTarget.classList.add("reveal-image")
        } else if (!element.closest(".pill-button, button")) {
          element.classList.add("reveal-text")
        } else {
          return
        }

        if (!element.matches("[data-reveal-item]")) {
          ;(revealTarget as HTMLElement).style.setProperty(
            "--reveal-delay",
            `${(index % 4) * 70}ms`,
          )
        }
        observed.add(element)
        observer.observe(revealTarget)
      })
    }

    prepare(document)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) =>
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) prepare(node.parentNode ?? document)
        }),
      )
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}
