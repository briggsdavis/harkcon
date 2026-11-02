"use client"
import Image from "next/image"
import { useState } from "react"
import type { ContentSelection, PersonEntry, FaqEntry } from "~/lib/page-content"
import { validDestination } from "~/lib/page-content"
import EditorDialog, { editorButton, editorInput } from "./editor-dialog"

type Upload = (file: File) => Promise<string | null>
export function ContentDialog({
  initial,
  apply,
  close,
}: {
  initial: ContentSelection
  apply: (value: ContentSelection) => void
  close: () => void
}) {
  const [selection, setSelection] = useState(initial)
  const [error, setError] = useState("")
  return (
    <EditorDialog title="Edit button or link" close={close}>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (!selection.value.text?.trim() || !validDestination(selection.value.href ?? "")) {
            setError("Add text and a valid destination link.")
            return
          }
          apply(selection)
        }}
      >
        <label className="block text-sm">
          Button text
          <input
            required
            className={editorInput}
            value={selection.value.text ?? ""}
            onChange={(event) =>
              setSelection({
                ...selection,
                value: { ...selection.value, text: event.target.value },
              })
            }
          />
        </label>
        <label className="mt-4 block text-sm">
          Destination link
          <input
            required
            className={editorInput}
            value={selection.value.href ?? ""}
            onChange={(event) =>
              setSelection({
                ...selection,
                value: { ...selection.value, href: event.target.value },
              })
            }
          />
        </label>
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" className={editorButton} onClick={close}>
            Cancel
          </button>
          <button className={`${editorButton} !bg-blue-700 !text-white`}>Apply to draft</button>
        </div>
      </form>
    </EditorDialog>
  )
}
export function PersonDialog({
  initial,
  existing,
  apply,
  remove,
  close,
  upload,
}: {
  initial: PersonEntry
  existing: boolean
  apply: (person: PersonEntry) => void
  remove: () => void
  close: () => void
  upload: Upload
}) {
  const [person, setPerson] = useState(initial)
  const [deleting, setDeleting] = useState(false),
    [uploading, setUploading] = useState(false),
    [error, setError] = useState("")
  return (
    <EditorDialog
      title={deleting ? `Remove ${person.name}?` : existing ? `Edit ${initial.name}` : "Add person"}
      close={() => {
        if (!uploading) close()
      }}
    >
      {deleting ? (
        <>
          <p className="text-sm text-slate-600">
            This person will be removed when you save the About page.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button className={editorButton} onClick={() => setDeleting(false)}>
              Cancel
            </button>
            <button className={`${editorButton} !bg-red-700 !text-white`} onClick={remove}>
              Remove person
            </button>
          </div>
        </>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (!person.photo) {
              setError("Upload a photo before adding this person.")
              return
            }
            if (person.linkedin && !/^https:\/\/(www\.)?linkedin\.com\//i.test(person.linkedin)) {
              setError("Use a LinkedIn profile URL.")
              return
            }
            apply({ ...person, alt: person.name })
          }}
        >
          <div className="space-y-4">
            {(
              [
                ["name", "Name"],
                ["role", "Role / title"],
                ["linkedin", "LinkedIn URL"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="block text-sm">
                {label}
                <input
                  required={key === "name" || key === "role"}
                  className={editorInput}
                  value={person[key]}
                  onChange={(event) => setPerson({ ...person, [key]: event.target.value })}
                />
              </label>
            ))}
            <label className="block text-sm">
              Biography
              <textarea
                rows={6}
                className={editorInput}
                value={person.biography}
                onChange={(event) => setPerson({ ...person, biography: event.target.value })}
              />
            </label>
            {person.photo && (
              <Image
                src={person.photo}
                alt={person.alt}
                width={96}
                height={96}
                unoptimized
                className="h-24 w-24 rounded-full object-cover"
              />
            )}
            <label className="block text-sm">
              Photo
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                disabled={uploading}
                className="mt-2 block w-full text-sm file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-700 file:px-4 file:py-3 file:font-semibold file:text-white hover:file:bg-blue-800"
                onChange={async (event) => {
                  const file = event.target.files?.[0]
                  if (!file) return
                  setUploading(true)
                  setError("")
                  try {
                    const photo = await upload(file)
                    if (photo)
                      setPerson((current) => ({
                        ...current,
                        photo,
                        alt: current.alt || current.name,
                      }))
                  } catch (failure) {
                    setError(failure instanceof Error ? failure.message : "Upload failed")
                  } finally {
                    setUploading(false)
                  }
                }}
              />
            </label>
          </div>
          {error && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="mt-6 flex flex-wrap justify-between gap-3">
            {existing && (
              <button
                type="button"
                className={`${editorButton} !text-red-700`}
                disabled={uploading}
                onClick={() => setDeleting(true)}
              >
                Delete person
              </button>
            )}
            <div className="ml-auto flex gap-3">
              <button type="button" className={editorButton} disabled={uploading} onClick={close}>
                Cancel
              </button>
              <button className={`${editorButton} !bg-blue-700 !text-white`} disabled={uploading}>
                {uploading ? "Uploading…" : "Apply to draft"}
              </button>
            </div>
          </div>
        </form>
      )}
    </EditorDialog>
  )
}
export function FaqDialog({
  initial,
  apply,
  close,
}: {
  initial: FaqEntry[]
  apply: (entries: FaqEntry[]) => void
  close: () => void
}) {
  const [entries, setEntries] = useState(initial)
  return (
    <EditorDialog title="Career FAQs" close={close}>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          apply(entries)
        }}
      >
        <div className="space-y-5">
          {entries.map((entry) => (
            <div key={entry.id} className="rounded-lg border border-slate-200 p-3">
              <label className="block text-sm">
                Question
                <input
                  required
                  className={editorInput}
                  value={entry.question}
                  onChange={(event) =>
                    setEntries(
                      entries.map((item) =>
                        item.id === entry.id ? { ...item, question: event.target.value } : item,
                      ),
                    )
                  }
                />
              </label>
              <label className="mt-3 block text-sm">
                Answer
                <textarea
                  required
                  rows={4}
                  className={editorInput}
                  value={entry.answer}
                  onChange={(event) =>
                    setEntries(
                      entries.map((item) =>
                        item.id === entry.id ? { ...item, answer: event.target.value } : item,
                      ),
                    )
                  }
                />
              </label>
              <button
                type="button"
                className="mt-3 text-sm text-red-700"
                onClick={() => setEntries(entries.filter((item) => item.id !== entry.id))}
              >
                Remove FAQ
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className={`${editorButton} mt-4`}
          onClick={() =>
            setEntries([...entries, { id: crypto.randomUUID(), question: "", answer: "" }])
          }
        >
          + Add FAQ
        </button>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" className={editorButton} onClick={close}>
            Cancel
          </button>
          <button className={`${editorButton} !bg-blue-700 !text-white`}>Apply to draft</button>
        </div>
      </form>
    </EditorDialog>
  )
}
