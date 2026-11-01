"use client"

import { useMutation, useQuery } from "convex/react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { getSolution, solutions, type Solution } from "~/lib/solutions"
import { api } from "../../../convex/_generated/api"
import type { Doc, Id } from "../../../convex/_generated/dataModel"
import SolutionDetailPage from "../solution-detail-page"
import { SolutionEditingProvider, type Selection, type TextField } from "../solution-editing"
import EditorDialog, { editorButton, editorInput } from "./editor-dialog"
import PageEditor from "./page-editor"

function initialDraft(page: Doc<"solutionPages">): Solution {
  return {
    ...(getSolution(page.slug) ?? {
      ...solutions[0],
      shortTitle: page.title,
      description: "Describe this solution.",
      proofPoint: "Describe your experience and results.",
      solutions: ["Add a capability"],
    }),
    proofHeading: "Experience measured in outcomes.",
    capabilitiesHeading: "Solutions built around the mission.",
    ctaTitle: "Have a complex mission?",
    ctaLabel: "Start a conversation",
    ctaHref: "/contact",
    ...page.content,
    title: page.title,
    slug: page.slug,
  }
}
function contentOf(draft: Solution) {
  const { title: _title, slug: _slug, ...content } = draft
  return {
    ...content,
    proofHeading: draft.proofHeading ?? "",
    capabilitiesHeading: draft.capabilitiesHeading ?? "",
    ctaTitle: draft.ctaTitle ?? "",
    ctaLabel: draft.ctaLabel ?? "",
    ctaHref: draft.ctaHref ?? "/contact",
  }
}
export default function SolutionEditor() {
  const params = useSearchParams()
  const pages = useQuery(api.solutions.list)
  const id = params.get("solution")
  if (!id) return <PageEditor page="solutions" />
  if (!pages) return <p className="p-8 text-sm text-slate-500">Loading solution…</p>
  const page = pages.find((item) => item._id === id)
  return page ? (
    <Editor key={page._id} page={page} />
  ) : (
    <p role="alert" className="p-8">
      This solution no longer exists.
    </p>
  )
}

function Editor({ page }: { page: Doc<"solutionPages"> }) {
  const router = useRouter()
  const savePage = useMutation(api.solutions.save)
  const setArchived = useMutation(api.solutions.setArchived)
  const uploadUrl = useMutation(api.content.generateImageUploadUrl)
  const resolveImage = useMutation(api.content.resolveImageUpload)
  const [draft, setDraft] = useState(() => initialDraft(page))
  const [baseline, setBaseline] = useState(page.updatedAt)
  const [dirty, setDirty] = useState(!page.content)
  const [busy, setBusy] = useState(false),
    [uploading, setUploading] = useState(false)
  const [selection, setSelection] = useState<Selection | null>(null)
  const [archiveConfirm, setArchiveConfirm] = useState(false)
  const [leave, setLeave] = useState<string | null>(null)
  const [error, setError] = useState(""),
    [message, setMessage] = useState("")
  const archived = !!page.archived
  const changeText = useCallback((field: TextField, value: string) => {
    setDraft((current) =>
      field.startsWith("capability:")
        ? {
            ...current,
            solutions: current.solutions.map((item, index) =>
              index === Number(field.slice(11)) ? value : item,
            ),
          }
        : { ...current, [field]: value },
    )
    setDirty(true)
    setMessage("")
  }, [])
  const editing = useMemo(
    () => ({
      changeText,
      markDirty: () => {
        setDirty(true)
        setMessage("")
      },
      select: (value: Selection) => {
        setError("")
        setSelection(value)
      },
    }),
    [changeText],
  )
  useEffect(() => {
    const navigate = (event: Event) => {
      if (dirty || busy || uploading) {
        event.preventDefault()
        setLeave((event as CustomEvent<{ url: string }>).detail.url)
      }
    }
    const requireClean = (event: Event) => {
      if (dirty || busy || uploading) {
        event.preventDefault()
        setError("Save or discard changes before archiving or deleting a page.")
      }
    }
    const unload = (event: BeforeUnloadEvent) => {
      if (dirty || uploading) event.preventDefault()
    }
    window.addEventListener("harkcon:navigate", navigate)
    window.addEventListener("harkcon:require-clean", requireClean)
    window.addEventListener("beforeunload", unload)
    return () => {
      window.removeEventListener("harkcon:navigate", navigate)
      window.removeEventListener("harkcon:require-clean", requireClean)
      window.removeEventListener("beforeunload", unload)
    }
  }, [dirty, busy, uploading])
  async function save() {
    setBusy(true)
    setError("")
    setMessage("")
    try {
      const result = await savePage({
        id: page._id,
        title: draft.title,
        slug: draft.slug,
        content: contentOf(draft),
        ...(baseline !== undefined ? { expectedUpdatedAt: baseline } : {}),
      })
      setBaseline(result.updatedAt)
      setDirty(false)
      setMessage(
        archived ? "Changes saved. This page is still archived." : "Changes saved and published.",
      )
      return true
    } catch (failure) {
      setError(
        failure instanceof Error ? failure.message : "Could not save. Your changes are still here.",
      )
      return false
    } finally {
      setBusy(false)
    }
  }
  async function upload(file: File) {
    if (
      !["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type) ||
      file.size > 10 * 1024 * 1024
    ) {
      setError("Choose a JPG, PNG, WebP or AVIF image smaller than 10 MB.")
      return
    }
    setUploading(true)
    setError("")
    try {
      const url = await uploadUrl()
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })
      if (!response.ok) throw new Error("Image upload failed")
      const body: { storageId: Id<"_storage"> } = await response.json()
      const src = await resolveImage({ storageId: body.storageId })
      setSelection((current) => (current?.kind === "image" ? { ...current, src } : current))
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Could not upload image")
    } finally {
      setUploading(false)
    }
  }
  function applySelection() {
    if (!selection) return
    if (selection.kind === "link") {
      if (
        !selection.text.trim() ||
        !/^(\/(?!\/)|https?:\/\/|mailto:|tel:|#)/i.test(selection.href)
      ) {
        setError("Add button text and a valid destination link.")
        return
      }
      setDraft((current) => ({ ...current, ctaLabel: selection.text, ctaHref: selection.href }))
    } else {
      if (!/^(\/(?!\/)|https?:\/\/)/i.test(selection.src)) {
        setError("Choose an image or enter an image URL.")
        return
      }
      const altField = { heroImage: "heroAlt", wideImage: "wideAlt", detailImage: "detailAlt" }[
        selection.field
      ]
      setDraft((current) => ({
        ...current,
        [selection.field]: selection.src,
        [altField]: selection.alt,
      }))
    }
    setDirty(true)
    setMessage("")
    setError("")
    setSelection(null)
  }
  function discard() {
    setDraft(initialDraft(page))
    setBaseline(page.updatedAt)
    setDirty(false)
    setError("")
    setMessage("")
    setLeave(null)
  }
  return (
    <section className="flex h-dvh min-w-0 flex-col bg-slate-100">
      <header className="z-40 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Solution editor
          </p>
          <h1 className="mt-1 font-header text-lg font-semibold">{draft.title}</h1>
          <output className="mt-1 block text-xs text-slate-500">
            {busy ? "Saving…" : dirty ? "Unsaved changes" : "All changes saved"}
          </output>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className={`${editorButton} ${archived ? "!border-amber-200 !bg-amber-50 !text-amber-800" : "!border-green-200 !bg-green-50 !text-green-800"}`}
            disabled={busy || uploading}
            onClick={() => {
              if (dirty) {
                setError("Save or discard changes before changing publication status.")
                return
              }
              setError("")
              setArchiveConfirm(true)
            }}
          >
            {archived ? "Archived · Unarchive" : "Published · Archive"}
          </button>
          {dirty && (
            <button
              className={editorButton}
              disabled={busy || uploading}
              onClick={() => setLeave("discard")}
            >
              Discard
            </button>
          )}
          <button
            className={`${editorButton} !border-blue-700 !bg-blue-700 !text-white`}
            disabled={!dirty || busy || uploading}
            onClick={() => void save()}
          >
            {busy ? "Saving…" : "Save changes"}
          </button>
        </div>
      </header>
      <p className="border-b border-slate-200 bg-white px-5 py-2 text-xs text-slate-500">
        Click text to edit. Click an image or the page’s call-to-action button to change it. Save
        changes to publish.
      </p>
      {(error || message) && (
        <p
          role={error ? "alert" : "status"}
          className={`px-5 py-3 text-sm ${error ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}
        >
          {error || message}
        </p>
      )}
      <div className="min-h-0 flex-1 overflow-auto p-4">
        <div
          data-solution-editor
          className="relative isolate overflow-hidden border border-slate-200 bg-white shadow-sm"
          onClickCapture={(event) => {
            const target = event.target as HTMLElement
            if (target.closest("a") && !target.closest("[data-solution-link]")) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
        >
          <SolutionEditingProvider value={editing}>
            <SolutionDetailPage solution={draft} />
          </SolutionEditingProvider>
        </div>
      </div>
      {selection && (
        <EditorDialog
          title={selection.kind === "image" ? "Edit image" : "Edit button"}
          close={() => {
            if (!uploading) {
              setSelection(null)
              setError("")
            }
          }}
        >
          <form
            onSubmit={(event) => {
              event.preventDefault()
              applySelection()
            }}
          >
            {selection.kind === "link" ? (
              <>
                <label className="block text-sm">
                  Button text
                  <input
                    required
                    className={editorInput}
                    value={selection.text}
                    onChange={(event) => setSelection({ ...selection, text: event.target.value })}
                  />
                </label>
                <label className="mt-4 block text-sm">
                  Destination link
                  <input
                    required
                    className={editorInput}
                    value={selection.href}
                    onChange={(event) => setSelection({ ...selection, href: event.target.value })}
                  />
                </label>
              </>
            ) : (
              <>
                <Image
                  src={selection.src}
                  alt={selection.alt}
                  width={800}
                  height={400}
                  unoptimized
                  className="mb-4 max-h-56 w-full rounded-lg bg-slate-100 object-contain"
                />
                <label className="block text-sm">
                  Replace image
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    disabled={uploading}
                    className="mt-2 block w-full text-sm"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      if (file) void upload(file)
                    }}
                  />
                </label>
                <label className="mt-4 block text-sm">
                  Image URL
                  <input
                    required
                    className={editorInput}
                    value={selection.src}
                    onChange={(event) => setSelection({ ...selection, src: event.target.value })}
                  />
                </label>
                <label className="mt-4 block text-sm">
                  Alternative text
                  <input
                    className={editorInput}
                    value={selection.alt}
                    onChange={(event) => setSelection({ ...selection, alt: event.target.value })}
                  />
                </label>
              </>
            )}
            {error && (
              <p role="alert" className="mt-4 text-sm text-red-700">
                {error}
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className={editorButton}
                disabled={uploading}
                onClick={() => {
                  setSelection(null)
                  setError("")
                }}
              >
                Cancel
              </button>
              <button className={`${editorButton} !bg-blue-700 !text-white`} disabled={uploading}>
                {uploading ? "Uploading…" : "Apply to draft"}
              </button>
            </div>
          </form>
        </EditorDialog>
      )}
      {archiveConfirm && (
        <EditorDialog
          title={archived ? `Publish ${draft.title}?` : `Archive ${draft.title}?`}
          close={() => {
            if (!busy) setArchiveConfirm(false)
          }}
        >
          <p className="text-sm leading-relaxed text-slate-600">
            {archived
              ? "The saved version will become publicly accessible and return to the website’s solution lists."
              : "This removes the page from public navigation and blocks its URL. You can keep editing it here."}
          </p>
          {error && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button
              className={editorButton}
              disabled={busy}
              onClick={() => setArchiveConfirm(false)}
            >
              Cancel
            </button>
            <button
              className={`${editorButton} !bg-blue-700 !text-white`}
              disabled={busy}
              onClick={async () => {
                setBusy(true)
                setError("")
                try {
                  await setArchived({ id: page._id, archived: !archived })
                  setArchiveConfirm(false)
                  setMessage(archived ? "Page unarchived and published." : "Page archived.")
                } catch (failure) {
                  setError(failure instanceof Error ? failure.message : "Could not change status")
                } finally {
                  setBusy(false)
                }
              }}
            >
              {busy ? "Updating…" : archived ? "Unarchive and publish" : "Archive page"}
            </button>
          </div>
        </EditorDialog>
      )}
      {leave && (
        <EditorDialog title="Unsaved changes" close={() => setLeave(null)}>
          <p className="text-sm text-slate-600">
            Save your changes or discard them before{" "}
            {leave === "discard" ? "resetting this draft" : "leaving this page"}.
          </p>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button className={editorButton} disabled={busy} onClick={() => setLeave(null)}>
              Keep editing
            </button>
            <button
              className={`${editorButton} !text-red-700`}
              disabled={busy || uploading}
              onClick={() => {
                if (leave === "discard") discard()
                else router.push(leave)
              }}
            >
              Discard changes
            </button>
            <button
              className={`${editorButton} !bg-blue-700 !text-white`}
              disabled={busy || uploading}
              onClick={async () => {
                if (await save()) {
                  if (leave !== "discard") router.push(leave)
                  setLeave(null)
                }
              }}
            >
              {busy ? "Saving…" : "Save changes"}
            </button>
          </div>
        </EditorDialog>
      )}
    </section>
  )
}
