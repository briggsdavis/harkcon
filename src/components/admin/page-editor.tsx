"use client"
import { useMutation, useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { defaultContractSections, validateContractSections } from "~/lib/contract-editor"
import { editorError } from "~/lib/editor-error"
import type {
  PageKey,
  PageDraft,
  ContentField,
  ContentSelection,
  PersonEntry,
  FaqEntry,
} from "~/lib/page-content"
import { defaultPeople } from "~/lib/people"
import { api } from "../../../convex/_generated/api"
import type { Doc, Id } from "../../../convex/_generated/dataModel"
import AboutPage from "../about-page"
import CareersPage from "../careers-page"
import ContractsPage from "../contracts-page"
import HomePage from "../home-page"
import { PageEditingProvider } from "../page-editing"
import SolutionsPage from "../solutions-page"
import ContractSectionsEditor from "./contract-sections-editor"
import EditorDialog, { editorButton } from "./editor-dialog"
import { ContentDialog, PersonDialog, FaqDialog } from "./page-editor-dialogs"
import { useImagePicker } from "./use-image-picker"

const titles = {
  home: "Home page",
  about: "About page",
  careers: "Careers page",
  solutions: "Solutions overview",
  contracts: "Contracts page",
  oasis: "OASIS+ page",
}
function initialDraft(page: PageKey, saved: Doc<"editablePages"> | null): PageDraft {
  return {
    ...(saved?.draft ?? { fields: {} }),
    ...(page === "contracts" || page === "oasis"
      ? { contractSections: saved?.draft.contractSections ?? defaultContractSections(page) }
      : {}),
    ...(page === "about" ? { people: saved?.draft.people ?? defaultPeople() } : {}),
  }
}
export default function PageEditor({ page }: { page: PageKey }) {
  const saved = useQuery(api.pages.getAdmin, { key: page })
  return saved === undefined ? (
    <p className="p-8 text-sm text-slate-500">Loading editor…</p>
  ) : (
    <Editor key={page} page={page} saved={saved} />
  )
}
function Editor({ page, saved }: { page: PageKey; saved: Doc<"editablePages"> | null }) {
  const router = useRouter(),
    savePage = useMutation(api.pages.save),
    setArchived = useMutation(api.pages.setOverviewArchived)
  const uploadUrl = useMutation(api.content.generateImageUploadUrl),
    resolveImage = useMutation(api.content.resolveImageUpload)
  const [draft, setDraft] = useState(() => initialDraft(page, saved)),
    [baseline, setBaseline] = useState(saved?.updatedAt)
  const [dirty, setDirty] = useState(false),
    [busy, setBusy] = useState(false)
  const [error, setError] = useState(""),
    [message, setMessage] = useState("")
  const [selection, setSelection] = useState<ContentSelection | null>(null),
    [person, setPerson] = useState<PersonEntry | null>(null),
    [faqs, setFaqs] = useState<FaqEntry[] | null>(null)
  const [leave, setLeave] = useState<string | null>(null),
    [archiveConfirm, setArchiveConfirm] = useState(false)
  const archived = !!saved?.archived
  const markDirty = useCallback(() => {
    setDirty(true)
    setMessage("")
  }, [])
  const change = useCallback((field: string, value: ContentField) => {
    setDraft((current) => ({
      ...current,
      fields: { ...current.fields, [field]: { ...current.fields[field], ...value } },
    }))
    setDirty(true)
    setMessage("")
  }, [])
  const { choose, picker, uploading } = useImagePicker(upload, setError)
  const context = {
    draft,
    editing: true,
    change,
    markDirty,
    select: (value: ContentSelection) => {
      if (value.kind === "image") choose((src) => change(value.field, { ...value.value, src }))
      else setSelection(value)
    },
    changeSupportPills: (supportPills: NonNullable<PageDraft["supportPills"]>) => {
      setDraft((current) => ({ ...current, supportPills }))
      markDirty()
    },
    imageUploading: uploading,
    changeLogos: (logos: NonNullable<PageDraft["logos"]>) => {
      setDraft((current) => ({ ...current, logos }))
      markDirty()
    },
    uploadLogo: (apply: (src: string) => void) => choose(apply),
    editPerson: setPerson,
    editFaqs: setFaqs,
  }
  useEffect(() => {
    const navigate = (event: Event) => {
      if (dirty || busy || uploading) {
        event.preventDefault()
        setLeave((event as CustomEvent<{ url: string }>).detail.url)
      }
    }
    const clean = (event: Event) => {
      const deleting = (event as CustomEvent<{ action?: string }>).detail?.action === "delete"
      if ((!deleting && dirty) || busy || uploading) {
        event.preventDefault()
        setError("Save or discard changes before changing publication status.")
      }
    }
    const unload = (event: BeforeUnloadEvent) => {
      if (dirty || busy || uploading) event.preventDefault()
    }
    window.addEventListener("harkcon:navigate", navigate)
    window.addEventListener("harkcon:require-clean", clean)
    window.addEventListener("beforeunload", unload)
    return () => {
      window.removeEventListener("harkcon:navigate", navigate)
      window.removeEventListener("harkcon:require-clean", clean)
      window.removeEventListener("beforeunload", unload)
    }
  }, [dirty, busy, uploading])
  async function save() {
    if (draft.contractSections) {
      const failure = validateContractSections(draft.contractSections)
      if (failure) {
        setError(failure)
        return false
      }
    }
    setBusy(true)
    setError("")
    setMessage("")
    try {
      const updatedAt = await savePage({
        key: page,
        draft,
        ...(baseline !== undefined ? { expectedUpdatedAt: baseline } : {}),
      })
      setBaseline(updatedAt)
      setDraft((current) => ({
        ...current,
        fields: Object.fromEntries(
          Object.entries(current.fields).filter(
            ([key]) => !key.startsWith("shared-title:") && !key.startsWith("shared-description:"),
          ),
        ),
      }))
      setDirty(false)
      setMessage(
        archived ? "Changes saved. This page remains archived." : "Changes saved and published.",
      )
      return true
    } catch (failure) {
      setError(editorError(failure, "Could not save. Your draft is still here."))
      return false
    } finally {
      setBusy(false)
    }
  }
  async function upload(file: File) {
    if (
      !["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type) ||
      file.size > 10 * 1024 * 1024
    )
      throw new Error("Choose a JPG, PNG, WebP or AVIF image smaller than 10 MB.")
    const url = await uploadUrl(),
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })
    if (!response.ok) throw new Error("Image upload failed")
    const body: { storageId: Id<"_storage"> } = await response.json()
    return await resolveImage({ storageId: body.storageId })
  }
  const view =
    page === "home" ? (
      <HomePage />
    ) : page === "about" ? (
      <AboutPage />
    ) : page === "careers" ? (
      <CareersPage />
    ) : page === "contracts" || page === "oasis" ? (
      <ContractsPage view={page} />
    ) : (
      <SolutionsPage />
    )
  return (
    <section className="flex h-dvh min-w-0 flex-col bg-slate-100">
      <header className="z-40 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Page editor
          </p>
          <h1 className="mt-1 font-header text-lg font-semibold">{titles[page]}</h1>
          <output className="mt-1 block text-xs text-slate-500">
            {uploading
              ? "Uploading…"
              : busy
                ? "Saving…"
                : dirty
                  ? "Unsaved changes"
                  : "All changes saved"}
          </output>
        </div>
        <div className="flex flex-wrap gap-2">
          {page === "solutions" && (
            <button
              className={`${editorButton} ${archived ? "!border-amber-200 !bg-amber-50 !text-amber-800" : "!border-green-200 !bg-green-50 !text-green-800"}`}
              disabled={busy || uploading}
              onClick={() => {
                if (dirty) {
                  setError("Save or discard changes before archiving or publishing.")
                  return
                }
                setArchiveConfirm(true)
              }}
            >
              {archived ? "Archived · Unarchive" : "Published · Archive"}
            </button>
          )}
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
        Click text to edit. Click images and buttons to change them.{" "}
        {page === "careers" && "Job listings stay synced; application buttons remain active."}
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
          data-page-editor
          inert={busy}
          className="relative isolate overflow-hidden border border-slate-200 bg-white shadow-sm"
          onClickCapture={(event) => {
            const target = event.target as HTMLElement
            if (target.closest("[data-synced-jobs], [data-page-text], [data-page-link]")) return
            if (target.closest("a")) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
        >
          <PageEditingProvider value={context}>{view}</PageEditingProvider>
        </div>
        {(page === "contracts" || page === "oasis") && (
          <div inert={busy}>
            <ContractSectionsEditor
              sections={draft.contractSections ?? []}
              uploading={uploading}
              uploadError={error}
              chooseImage={choose}
              change={(sections) => {
                setDraft((current) => ({ ...current, contractSections: sections }))
                markDirty()
              }}
            />
          </div>
        )}
      </div>
      {picker}
      {selection && (
        <ContentDialog
          key={selection.field}
          initial={selection}
          close={() => setSelection(null)}
          apply={(value) => {
            change(value.field, value.value)
            setSelection(null)
          }}
        />
      )}
      {person && (
        <PersonDialog
          key={person.id}
          initial={person}
          existing={!!draft.people?.some((item) => item.id === person.id)}
          upload={upload}
          close={() => setPerson(null)}
          apply={(value) => {
            setDraft((current) => ({
              ...current,
              people: current.people?.some((item) => item.id === value.id)
                ? current.people.map((item) => (item.id === value.id ? value : item))
                : [...(current.people ?? []), value],
            }))
            markDirty()
            setPerson(null)
          }}
          remove={() => {
            setDraft((current) => ({
              ...current,
              people: current.people?.filter((item) => item.id !== person.id),
            }))
            markDirty()
            setPerson(null)
          }}
        />
      )}
      {faqs && (
        <FaqDialog
          initial={faqs}
          close={() => setFaqs(null)}
          apply={(entries) => {
            setDraft((current) => ({
              ...current,
              fields: Object.fromEntries(
                Object.entries(current.fields).filter(([key]) => !key.startsWith("faq-")),
              ),
              faqs: entries,
            }))
            markDirty()
            setFaqs(null)
          }}
        />
      )}
      {archiveConfirm && (
        <EditorDialog
          title={archived ? "Publish Solutions overview?" : "Archive Solutions overview?"}
          close={() => {
            if (!busy) setArchiveConfirm(false)
          }}
        >
          <p className="text-sm text-slate-600">
            {archived
              ? "The saved overview will become publicly accessible."
              : "The overview will be removed from navigation and its URL will be blocked. Individual solutions keep their own publication status."}
          </p>
          {error && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button
              className={editorButton}
              disabled={busy || uploading}
              onClick={() => setArchiveConfirm(false)}
            >
              Cancel
            </button>
            <button
              className={`${editorButton} !bg-blue-700 !text-white`}
              disabled={busy || uploading}
              onClick={async () => {
                setBusy(true)
                try {
                  await setArchived({ archived: !archived })
                  setArchiveConfirm(false)
                  setMessage(archived ? "Overview published." : "Overview archived.")
                } catch (failure) {
                  setError(editorError(failure, "Could not change status"))
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
          {error && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              className={editorButton}
              disabled={busy || uploading}
              onClick={() => setLeave(null)}
            >
              Keep editing
            </button>
            <button
              className={`${editorButton} !text-red-700`}
              disabled={busy || uploading}
              onClick={() => {
                if (leave === "discard") {
                  setDraft(initialDraft(page, saved))
                  setBaseline(saved?.updatedAt)
                  setDirty(false)
                  setError("")
                  setLeave(null)
                } else router.push(leave)
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
