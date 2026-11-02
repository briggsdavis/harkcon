"use client"

import { useQueries } from "convex/react"
import { notFound } from "next/navigation"
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useState,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react"
import type {
  PageKey,
  PageDraft,
  ContentField,
  ContentSelection,
  PersonEntry,
  FaqEntry,
} from "~/lib/page-content"
import { api } from "../../convex/_generated/api"
import type { Doc } from "../../convex/_generated/dataModel"
import { EditingMode } from "./editing-mode"

type PageContext = {
  draft: PageDraft
  editing: boolean
  change: (field: string, value: ContentField) => void
  markDirty: () => void
  select: (selection: ContentSelection) => void
  imageUploading?: boolean
  changeLogos?: (logos: NonNullable<PageDraft["logos"]>) => void
  uploadLogo?: (apply: (src: string) => void) => void
  editPerson?: (person: PersonEntry) => void
  editFaqs?: (faqs: FaqEntry[]) => void
}
const Context = createContext<PageContext>({
  draft: { fields: {} },
  editing: false,
  change: () => {},
  markDirty: () => {},
  select: () => {},
})
export const usePageDraft = () => useContext(Context)
export function PageEditingProvider({
  value,
  children,
}: {
  value: PageContext
  children: ReactNode
}) {
  return (
    <EditingMode>
      <Context.Provider value={value}>{children}</Context.Provider>
    </EditingMode>
  )
}
export function PublicPageContent({ page, children }: { page: PageKey; children: ReactNode }) {
  // Defaults remain available during the frontend/backend rollout.
  const queries = useMemo(() => ({ saved: { query: api.pages.get, args: { key: page } } }), [page])
  const { saved: result } = useQueries(queries)
  const saved = result instanceof Error ? null : (result as Doc<"editablePages"> | null | undefined)
  if (page === "solutions" && saved?.archived) notFound()
  return (
    <Context.Provider
      value={{
        draft: saved?.draft ?? { fields: {} },
        editing: false,
        change: () => {},
        markDirty: () => {},
        select: () => {},
      }}
    >
      {children}
    </Context.Provider>
  )
}

function plainText(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child)
      if (!isValidElement(child)) return ""
      const element = child as ReactElement<{ children?: ReactNode; className?: string }>
      if (element.type === "br") return "\n"
      if (element.props.className?.includes("sr-only")) return ""
      return plainText(element.props.children)
    })
    .join("")
}

export function PageText({ field, children }: { field: string; children: ReactElement }) {
  const content = usePageDraft()
  const [initial, setInitial] = useState("")
  const element = children as ReactElement<Record<string, unknown>>
  const text = content.draft.fields[field]?.text
  return cloneElement(element, {
    ...(content.editing
      ? {
          children: text ?? plainText(element.props.children as ReactNode),
          className: `${element.props.className ?? ""} whitespace-pre-line`,
        }
      : {}),
    ...(text !== undefined
      ? { children: text, className: `${element.props.className ?? ""} whitespace-pre-line` }
      : {}),
    ...(content.editing
      ? {
          contentEditable: true,
          suppressContentEditableWarning: true,
          "data-page-text": field,
          "aria-label": `Edit ${field}`,
          onFocus: (event: React.FocusEvent<HTMLElement>) =>
            setInitial(event.currentTarget.innerText),
          onInput: () => content.markDirty(),
          onBlur: (event: React.FocusEvent<HTMLElement>) => {
            const value = event.currentTarget.innerText
            if (value !== initial) content.change(field, { text: value })
          },
          onClick: (event: React.MouseEvent) => event.stopPropagation(),
          onPaste: (event: React.ClipboardEvent) => {
            event.preventDefault()
            const selection = window.getSelection()
            if (!selection?.rangeCount) return
            const range = selection.getRangeAt(0),
              node = document.createTextNode(event.clipboardData.getData("text/plain"))
            range.deleteContents()
            range.insertNode(node)
            range.setStartAfter(node)
            range.collapse(true)
            selection.removeAllRanges()
            selection.addRange(range)
            content.markDirty()
          },
        }
      : {}),
  })
}
export function PageImage({ field, children }: { field: string; children: ReactElement }) {
  const content = usePageDraft()
  const element = children as ReactElement<Record<string, unknown>>
  const stored = content.draft.fields[field]
  const src = stored?.src ?? String(element.props.src ?? "")
  const alt = stored?.alt ?? String(element.props.alt ?? element.props.label ?? "")
  const image = cloneElement(element, {
    src,
    alt,
    ...(element.props.label !== undefined ? { label: alt } : {}),
    ...(src.startsWith("http") ? { unoptimized: true } : {}),
  })
  if (!content.editing) return image
  const fill =
    element.props.fill ||
    element.props.imageClassName !== undefined ||
    element.props.label !== undefined
  return (
    <div className={fill ? "absolute inset-0" : "relative"}>
      {image}
      <button
        type="button"
        aria-label={`Edit ${field} image`}
        className="absolute inset-0 z-20 cursor-pointer bg-transparent focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-blue-600"
        onClick={() => content.select({ kind: "image", field, value: { src, alt } })}
      >
        <span className="absolute right-3 bottom-3 rounded-lg bg-white px-3 py-2 font-body text-xs font-semibold text-slate-800 shadow">
          Edit image
        </span>
      </button>
    </div>
  )
}
export function PageLink({ field, children }: { field: string; children: ReactElement }) {
  const content = usePageDraft()
  const element = children as ReactElement<Record<string, unknown>>
  const value = content.draft.fields[field]
  const icons = Children.toArray(element.props.children as ReactNode).filter(
    (child) => isValidElement(child) && typeof child.type !== "string",
  )
  return cloneElement(element, {
    ...(value?.href !== undefined ? { href: value.href } : {}),
    ...(value?.text !== undefined
      ? {
          children: (
            <>
              {value.text}
              {icons}
            </>
          ),
        }
      : {}),
    ...(content.editing
      ? {
          "data-page-link": field,
          onClickCapture: (event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault()
            event.stopPropagation()
            content.select({
              kind: "link",
              field,
              value: {
                text: value?.text ?? event.currentTarget.innerText.trim(),
                href: value?.href ?? String(element.props.href ?? ""),
              },
            })
          },
        }
      : {}),
  })
}
