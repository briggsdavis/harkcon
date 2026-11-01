"use client"
import { useMutation, useQuery } from "convex/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { api } from "../../../convex/_generated/api"
import type { Doc } from "../../../convex/_generated/dataModel"
import EditorDialog, { editorButton, editorInput, requestEditorNavigation } from "./editor-dialog"
export default function SolutionNavigation() {
  const pages = useQuery(api.solutions.list)
  const overview = useQuery(api.pages.getAdmin, { key: "solutions" })
  const archiveOverview = useMutation(api.pages.setOverviewArchived)
  const router = useRouter(),
    params = useSearchParams()
  const [menu, setMenu] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<{
    page?: Doc<"solutionPages">
    action: "archive" | "unarchive" | "delete"
  } | null>(null)
  const [adding, setAdding] = useState(false),
    [title, setTitle] = useState(""),
    [slug, setSlug] = useState("")
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("")
  const add = useMutation(api.solutions.add),
    remove = useMutation(api.solutions.remove),
    archive = useMutation(api.solutions.setArchived)
  const navigate = (url: string) => {
    if (requestEditorNavigation(url)) router.push(url)
  }
  const current = params.get("solution") ?? "overview"
  const row = (page?: Doc<"solutionPages">) => {
    const id = page?._id ?? "overview",
      archived = page ? !!page.archived : !!overview?.archived
    const name = page?.title ?? "Solutions overview"
    return (
      <div key={id} className="relative flex items-center gap-1">
        <button
          className={`min-w-0 flex-1 rounded-lg py-2 pr-1 pl-5 text-left text-xs ${params.get("view") === "solutions" && current === id ? "bg-[#263458] text-white" : "text-[#aeb7ce] hover:bg-[#1a2440]"}`}
          onClick={() => navigate(`/admin?view=solutions${page ? `&solution=${page._id}` : ""}`)}
        >
          <span className="block">{name}</span>
          {archived && <span className="mt-1 block text-[10px] text-amber-300">Archived</span>}
        </button>
        {
          <button
            type="button"
            aria-label={`Actions for ${name}`}
            aria-expanded={menu === id}
            className="rounded px-2 py-2 text-slate-300"
            onClick={() => setMenu(menu === id ? null : id)}
          >
            ⋯
          </button>
        }
        {menu === id && (
          <>
            <button
              className="fixed inset-0 z-40 cursor-default"
              aria-label="Close page actions"
              onClick={() => setMenu(null)}
            />
            <div className="absolute top-full right-0 z-50 min-w-36 rounded-lg border border-slate-200 bg-white p-1 text-xs text-slate-800 shadow-xl">
              {[archived ? "unarchive" : "archive", ...(page ? ["delete"] : [])].map((action) => (
                <button
                  key={action}
                  className="block w-full rounded px-3 py-2 text-left capitalize hover:bg-slate-100"
                  onClick={() => {
                    setMenu(null)
                    setError("")
                    if (
                      !window.dispatchEvent(
                        new CustomEvent("harkcon:require-clean", { cancelable: true }),
                      )
                    )
                      return
                    setConfirm({ page, action: action as "archive" | "unarchive" | "delete" })
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }
  return (
    <div className="space-y-1">
      {row()}
      {pages?.map((page) => row(page))}
      {pages === undefined && <p className="pl-5 text-xs text-slate-400">Loading pages…</p>}
      <button
        className="mt-2 flex w-full items-center gap-2 rounded-lg py-2 pl-5 text-xs text-slate-300 hover:bg-[#1a2440]"
        onClick={() => {
          if (!window.dispatchEvent(new CustomEvent("harkcon:require-clean", { cancelable: true })))
            return
          setTitle("")
          setSlug("")
          setError("")
          setAdding(true)
        }}
      >
        <span className="text-lg">+</span> Add solution
      </button>
      {adding && (
        <EditorDialog
          title="Add solution"
          close={() => {
            if (!busy) setAdding(false)
          }}
        >
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              setBusy(true)
              setError("")
              try {
                const id = await add({ title, slug })
                setAdding(false)
                navigate(`/admin?view=solutions&solution=${id}`)
              } catch (e) {
                setError(e instanceof Error ? e.message : "Could not create page")
              } finally {
                setBusy(false)
              }
            }}
          >
            <p className="mb-5 text-sm text-slate-500">
              New pages start archived. You can edit and save them before publishing.
            </p>
            <label className="block text-sm">
              Page title
              <input
                required
                className={editorInput}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  setSlug(
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, ""),
                  )
                }}
              />
            </label>
            <label className="mt-4 block text-sm">
              URL slug
              <input
                required
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                className={editorInput}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <span className="mt-1 block text-xs text-slate-500">/solutions/{slug}</span>
            </label>
            {error && (
              <p role="alert" className="mt-4 text-sm text-red-700">
                {error}
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className={editorButton}
                disabled={busy}
                onClick={() => setAdding(false)}
              >
                Cancel
              </button>
              <button className={`${editorButton} !bg-blue-700 !text-white`} disabled={busy}>
                {busy ? "Creating…" : "Create archived page"}
              </button>
            </div>
          </form>
        </EditorDialog>
      )}
      {confirm && (
        <EditorDialog
          title={`${confirm.action === "delete" ? "Delete" : confirm.action === "archive" ? "Archive" : "Publish"} ${confirm.page?.title ?? "Solutions overview"}?`}
          close={() => {
            if (!busy) setConfirm(null)
          }}
        >
          <p className="text-sm leading-relaxed text-slate-600">
            {confirm.action === "delete"
              ? "This permanently deletes the page and its saved content. This cannot be undone."
              : confirm.action === "archive"
                ? "This removes the page from public navigation and blocks access to its URL. You can keep editing it and unarchive it later."
                : "The saved version of this page will become publicly accessible."}
          </p>
          {error && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button className={editorButton} disabled={busy} onClick={() => setConfirm(null)}>
              Cancel
            </button>
            <button
              className={`${editorButton} ${confirm.action === "delete" ? "!bg-red-700" : "!bg-blue-700"} !text-white`}
              disabled={busy}
              onClick={async () => {
                setBusy(true)
                setError("")
                try {
                  if (confirm.page) {
                    if (confirm.action === "delete") {
                      await remove({ id: confirm.page._id })
                      if (current === confirm.page._id) navigate("/admin?view=solutions")
                    } else
                      await archive({
                        id: confirm.page._id,
                        archived: confirm.action === "archive",
                      })
                  } else await archiveOverview({ archived: confirm.action === "archive" })
                  setConfirm(null)
                } catch (e) {
                  setError(e instanceof Error ? e.message : "Could not update page")
                } finally {
                  setBusy(false)
                }
              }}
            >
              {busy
                ? "Updating…"
                : confirm.action === "delete"
                  ? "Delete permanently"
                  : confirm.action === "archive"
                    ? "Archive page"
                    : "Unarchive and publish"}
            </button>
          </div>
        </EditorDialog>
      )}
    </div>
  )
}
