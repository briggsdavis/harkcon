"use client"
import { useMutation, useQuery } from "convex/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { getSolution, solutions, type Solution } from "~/lib/solutions"
import { api } from "../../../convex/_generated/api"
import type { Doc } from "../../../convex/_generated/dataModel"

const control =
  "w-full rounded-lg border border-slate-200 bg-transparent p-2 focus:border-blue-500 focus:outline-none"
const button = "rounded-lg border border-slate-200 px-4 py-2 text-sm disabled:opacity-50"
function defaults(page?: Doc<"solutionPages">): Solution {
  return {
    ...(getSolution(page?.slug || "") || solutions[0]),
    proofHeading: "Experience measured in outcomes.",
    capabilitiesHeading: "Solutions built around the mission.",
    ctaTitle: "Have a complex mission?",
    ctaLabel: "Start a conversation",
    ctaHref: "/contact",
    ...page?.content,
    title: page?.title || "New solution",
    slug: page?.slug || "new-solution",
  }
}
export default function SolutionEditor() {
  const pages = useQuery(api.solutions.list)
  const [editing, setEditing] = useState<Doc<"solutionPages"> | "new" | null>(null)
  const [deleting, setDeleting] = useState<Doc<"solutionPages"> | null>(null)
  const [error, setError] = useState("")
  const remove = useMutation(api.solutions.remove)
  return (
    <section className="p-6 md:p-10">
      <div className="mb-8 flex justify-between gap-4">
        <div>
          <h1 className="font-header text-3xl">Solution pages</h1>
          <p className="mt-2 text-slate-500">Click a page to edit its content in a preview.</p>
        </div>
        <button className={button} onClick={() => setEditing("new")}>
          Add solution
        </button>
      </div>
      <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {pages?.map((page) => (
          <div key={page._id} className="flex items-center justify-between p-5">
            <button className="text-left" onClick={() => setEditing(page)}>
              <strong>{page.title}</strong>
              <span className="block text-sm text-slate-500">/solutions/{page.slug}</span>
            </button>
            <div className="flex gap-3">
              <button className={button} onClick={() => setEditing(page)}>
                Edit
              </button>
              <button
                className={button}
                onClick={() => {
                  setError("")
                  setDeleting(page)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {editing && (
        <Editor page={editing === "new" ? undefined : editing} close={() => setEditing(null)} />
      )}
      {deleting && (
        <div className="fixed inset-0 z-[150] grid place-items-center bg-slate-950/50 p-5">
          <dialog
            open
            aria-label="Delete solution"
            className="relative m-auto rounded-2xl bg-white p-8"
          >
            <h2 className="text-xl font-bold">Delete {deleting.title}?</h2>
            <p className="my-4">This removes the solution page from the site.</p>
            {error && <p role="alert">{error}</p>}
            <div className="flex gap-4">
              <button className={button} onClick={() => setDeleting(null)}>
                Cancel
              </button>
              <button
                className={button}
                onClick={async () => {
                  try {
                    await remove({ id: deleting._id })
                    setDeleting(null)
                  } catch (e) {
                    setError(e instanceof Error ? e.message : "Unable to delete")
                  }
                }}
              >
                Delete page
              </button>
            </div>
          </dialog>
        </div>
      )}
    </section>
  )
}
function Editor({ page, close }: { page?: Doc<"solutionPages">; close: () => void }) {
  const [draft, setDraft] = useState(() => defaults(page))
  const [busy, setBusy] = useState(false),
    [uploading, setUploading] = useState(false),
    [error, setError] = useState("")
  const dialog = useRef<HTMLDialogElement>(null)
  const save = useMutation(api.solutions.save),
    uploadUrl = useMutation(api.content.generateImageUploadUrl),
    resolve = useMutation(api.content.resolveImageUpload)
  useEffect(() => {
    const el = dialog.current
    el?.showModal()
    return () => el?.close()
  }, [])
  function field(key: keyof Solution, label: string, large = false) {
    return (
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-slate-500">{label}</span>
        {large ? (
          <textarea
            aria-label={label}
            className={`${control} min-h-28 text-lg`}
            value={String(draft[key] || "")}
            onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
          />
        ) : (
          <input
            aria-label={label}
            className={control}
            value={String(draft[key] || "")}
            onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
          />
        )}
      </label>
    )
  }
  function photo(
    key: "heroImage" | "wideImage" | "detailImage",
    alt: "heroAlt" | "wideAlt" | "detailAlt",
    label: string,
  ) {
    return (
      <div className="space-y-3">
        <label className="relative block cursor-pointer overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={draft[key]}
            alt={draft[alt]}
            width={960}
            height={208}
            unoptimized
            className="h-52 w-full object-cover"
          />
          <span className="absolute right-3 bottom-3 rounded-lg bg-white px-3 py-2 text-sm">
            {uploading ? "Uploading…" : "Click to replace image"}
          </span>
          <input
            aria-label={label}
            className="sr-only"
            type="file"
            accept="image/*"
            disabled={uploading || busy}
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
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
                const { storageId } = await response.json()
                const image = await resolve({ storageId })
                setDraft((d) => ({ ...d, [key]: image }))
              } catch (e) {
                setError(e instanceof Error ? e.message : "Image upload failed")
              } finally {
                setUploading(false)
              }
            }}
          />
        </label>
        {field(alt, "Image description")}
      </div>
    )
  }
  return (
    <dialog
      ref={dialog}
      onCancel={(e) => {
        e.preventDefault()
        if (!busy && !uploading) close()
      }}
      aria-label="Edit solution page"
      data-reveal-skip
      className="fixed inset-0 m-auto max-h-[90dvh] w-[min(960px,94vw)] overflow-auto rounded-2xl border-0 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60"
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setBusy(true)
          setError("")
          try {
            const { title, slug, ...content } = draft
            await save({
              ...(page ? { id: page._id } : {}),
              title,
              slug,
              content: {
                ...content,
                proofHeading: content.proofHeading || "",
                capabilitiesHeading: content.capabilitiesHeading || "",
                ctaTitle: content.ctaTitle || "",
                ctaLabel: content.ctaLabel || "",
                ctaHref: content.ctaHref || "/contact",
              },
            })
            close()
          } catch (e) {
            setError(e instanceof Error ? e.message : "Unable to save")
          } finally {
            setBusy(false)
          }
        }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-white p-5">
          <h2 className="font-bold">{page ? "Edit solution" : "Create solution"}</h2>
          <div className="flex gap-3">
            <button type="button" disabled={busy || uploading} className={button} onClick={close}>
              Cancel
            </button>
            <button disabled={busy || uploading} className={`${button} bg-slate-900 text-white`}>
              {busy ? "Saving…" : "Save page"}
            </button>
          </div>
        </div>
        {error && (
          <p role="alert" className="p-5 text-red-700">
            {error}
          </p>
        )}
        <div className="space-y-8 p-6 md:p-10">
          <p className="text-sm text-slate-500">
            Click text to edit it or an image to replace it. The page layout stays fixed.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {field("title", "Page title")}
            {field("slug", "URL slug")}
            {field("number", "Page number")}
            {field("color", "Accent color")}
          </div>
          {photo("heroImage", "heroAlt", "Replace hero image")}
          <section className="space-y-5 py-5">
            {field("shortTitle", "Main heading")}
            {field("description", "Introduction", true)}
          </section>
          {photo("wideImage", "wideAlt", "Replace wide image")}
          <section className="space-y-5 rounded-xl bg-[#f4f3f0] p-6">
            {field("proofHeading", "Experience heading")}
            {field("proofPoint", "Experience text", true)}
          </section>
          <section className="grid gap-6 md:grid-cols-2">
            {photo("detailImage", "detailAlt", "Replace section image")}
            <div className="space-y-4">
              {field("capabilitiesHeading", "Capabilities heading")}
              {draft.solutions.map((text, i) => (
                <label key={i} className="block">
                  <span className="text-xs text-slate-500">Capability {i + 1}</span>
                  <textarea
                    aria-label={`Capability ${i + 1}`}
                    className={control}
                    value={text}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        solutions: draft.solutions.map((s, n) => (n === i ? e.target.value : s)),
                      })
                    }
                  />
                </label>
              ))}
            </div>
          </section>
          <section className="space-y-4 rounded-xl bg-[#f4f3f0] p-6">
            {field("ctaTitle", "Call to action heading")}
            {field("ctaLabel", "Call to action text")}
            {field("ctaHref", "Call to action destination")}
          </section>
        </div>
      </form>
    </dialog>
  )
}
