"use client"

import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from "react"
import { EditingMode } from "./editing-mode"
import type { Solution } from "~/lib/solutions"

export type TextField =
  | "shortTitle"
  | "description"
  | "proofPoint"
  | "proofHeading"
  | "capabilitiesHeading"
  | "ctaTitle"
  | "heroLabel"
  | "expertiseLabel"
  | `capability:${number}`
export type ImageField = "heroImage" | "wideImage" | "detailImage"
export type ImageSelection = { kind: "image"; field: ImageField; src: string; alt: string }
export type LinkSelection = { kind: "link"; text: string; href: string }
export type Selection = ImageSelection | LinkSelection
export type SolutionEditing = {
  changeText: (field: TextField, value: string) => void
  markDirty: () => void
  select: (selection: Selection) => void
}
const Context = createContext<SolutionEditing | null>(null)
export const useSolutionEditing = () => useContext(Context) !== null
export function SolutionEditingProvider({
  value,
  children,
}: {
  value: SolutionEditing
  children: ReactNode
}) {
  return <EditingMode><Context.Provider value={value}>{children}</Context.Provider></EditingMode>
}

export function SolutionText({ field, children }: { field: TextField; children: ReactElement }) {
  const editing = useContext(Context)
  const [initial, setInitial] = useState("")
  if (!editing) return children
  return cloneElement(children as ReactElement<Record<string, unknown>>, {
    contentEditable: true,
    suppressContentEditableWarning: true,
    "data-solution-text": field,
    "aria-label": `Edit ${field}`,
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      setInitial(event.currentTarget.innerText)
    },
    onInput: () => editing.markDirty(),
    onBlur: (event: React.FocusEvent<HTMLElement>) => {
      const value = event.currentTarget.innerText
      if (value !== initial) editing.changeText(field, value)
    },
    onPaste: (event: React.ClipboardEvent<HTMLElement>) => {
      event.preventDefault()
      const selection = window.getSelection()
      if (!selection?.rangeCount) return
      const range = selection.getRangeAt(0)
      const text = document.createTextNode(event.clipboardData.getData("text/plain"))
      range.deleteContents()
      range.insertNode(text)
      range.setStartAfter(text)
      range.collapse(true)
      selection.removeAllRanges()
      selection.addRange(range)
      editing.markDirty()
    },
  })
}

export function SolutionImage({
  field,
  src,
  alt,
  children,
}: {
  field: ImageField
  src: string
  alt: string
  children: ReactNode
}) {
  const editing = useContext(Context)
  if (!editing) return children
  // The image control is contained by this image's box; it cannot overlap another section.
  return (
    <div className="absolute inset-0">
      {children}
      <button
        type="button"
        aria-label={`Edit ${field} image`}
        className="absolute inset-0 z-20 cursor-pointer bg-transparent focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-blue-600"
        onClick={() => editing.select({ kind: "image", field, src, alt })}
      >
        <span className="absolute right-3 bottom-3 rounded-lg bg-white px-3 py-2 font-body text-xs font-semibold text-slate-800 shadow">
          Edit image
        </span>
      </button>
    </div>
  )
}
export function SolutionLink({
  solution,
  children,
}: {
  solution: Solution
  children: ReactElement
}) {
  const editing = useContext(Context)
  if (!editing) return children
  return cloneElement(children as ReactElement<Record<string, unknown>>, {
    "data-solution-link": true,
    onClick: (event: React.MouseEvent) => {
      event.preventDefault()
      editing.select({
        kind: "link",
        text: solution.ctaLabel ?? "Start a conversation",
        href: solution.ctaHref ?? "/contact",
      })
    },
  })
}
