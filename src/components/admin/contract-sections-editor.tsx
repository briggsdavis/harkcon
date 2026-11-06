"use client"
import Image from "next/image"
import { useState } from "react"
import {
  detailLabels,
  moveItem,
  validateContractSections,
  type ContractSection,
  type ContractProject,
  type DetailKey,
} from "~/lib/contract-editor"
import EditorDialog, { editorButton, editorInput } from "./editor-dialog"

type Selection =
  | { kind: "section"; section: ContractSection; existing: boolean }
  | { kind: "project"; sectionId: string; project: ContractProject; existing: boolean }
  | { kind: "delete"; sectionId: string; projectId?: string; title: string }
function Order({
  index,
  count,
  label,
  move,
}: {
  index: number
  count: number
  label: string
  move: (direction: -1 | 1) => void
}) {
  return (
    <div className="flex gap-1">
      <button
        type="button"
        className={`${editorButton} !px-2 !py-1`}
        aria-label={`Move ${label} up`}
        disabled={index === 0}
        onClick={() => move(-1)}
      >
        ↑
      </button>
      <button
        type="button"
        className={`${editorButton} !px-2 !py-1`}
        aria-label={`Move ${label} down`}
        disabled={index === count - 1}
        onClick={() => move(1)}
      >
        ↓
      </button>
    </div>
  )
}
export default function ContractSectionsEditor({
  sections,
  change,
  chooseImage,
  uploading,
  uploadError,
}: {
  sections: ContractSection[]
  change: (sections: ContractSection[]) => void
  chooseImage: (apply: (src: string) => void) => void
  uploading: boolean
  uploadError: string
}) {
  const [selection, setSelection] = useState<Selection | null>(null)
  const [moving, setMoving] = useState<{ sectionId: string; projectId: string } | null>(null)
  const [destination, setDestination] = useState("")
  const [error, setError] = useState("")
  const [switchList, setSwitchList] = useState(false)
  const open = (value: Selection) => {
    setError("")
    setSwitchList(false)
    setSelection(value)
  }
  const updateSection = (value: ContractSection) =>
    setSelection({
      kind: "section",
      section: value,
      existing: selection?.kind === "section" && selection.existing,
    })
  function updateProject(value: ContractProject) {
    if (selection?.kind === "project") setSelection({ ...selection, project: value })
  }
  return (
    <section
      aria-label="Contract sections editor"
      className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-5 md:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-header text-xl font-semibold">Sections & projects</h2>
          <p className="mt-1 text-sm text-slate-500">
            Organize sections and projects here. Save changes above to publish.
          </p>
        </div>
        <button
          type="button"
          className={editorButton}
          onClick={() =>
            open({
              kind: "section",
              existing: false,
              section: {
                id: `section-${crypto.randomUUID()}`,
                title: "",
                eyebrow: "",
                description: "",
                projects: [],
              },
            })
          }
        >
          + Add section
        </button>
      </div>
      {sections.length === 0 && (
        <p className="py-5 text-sm text-slate-500">
          No sections yet. Add a section to get started.
        </p>
      )}
      {sections.map((section, index) => (
        <article
          key={section.id}
          className="rounded-lg border border-slate-200"
          aria-label={`${section.title} section`}
        >
          <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-slate-500">{section.eyebrow}</p>
              <h3 className="font-semibold">{section.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{section.description}</p>
            </div>
            <Order
              index={index}
              count={sections.length}
              label={`${section.title} section`}
              move={(direction) => change(moveItem(sections, index, direction))}
            />
            <button
              type="button"
              className={editorButton}
              onClick={() => open({ kind: "section", section, existing: true })}
            >
              Edit section
            </button>
            <button
              type="button"
              className={`${editorButton} !text-red-700`}
              onClick={() => open({ kind: "delete", sectionId: section.id, title: section.title })}
            >
              Delete section
            </button>
          </div>
          <ul className="divide-y divide-slate-100">
            {section.projects.map((project, projectIndex) => (
              <li key={project.id} className="flex flex-wrap items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{project.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {project.details.length} key details · {project.list.items.length}{" "}
                    {project.list.kind === "services" ? "services" : "NAICS codes"}
                  </p>
                </div>
                <Order
                  index={projectIndex}
                  count={section.projects.length}
                  label={project.title}
                  move={(direction) =>
                    change(
                      sections.map((item) =>
                        item.id === section.id
                          ? { ...item, projects: moveItem(item.projects, projectIndex, direction) }
                          : item,
                      ),
                    )
                  }
                />
                <button
                  type="button"
                  className={editorButton}
                  onClick={() =>
                    open({ kind: "project", sectionId: section.id, project, existing: true })
                  }
                >
                  Edit project
                </button>
                <button
                  type="button"
                  className={`${editorButton} !text-red-700`}
                  onClick={() =>
                    open({
                      kind: "delete",
                      sectionId: section.id,
                      projectId: project.id,
                      title: project.title,
                    })
                  }
                >
                  Delete project
                </button>
                <button
                  type="button"
                  className={editorButton}
                  disabled={sections.length < 2}
                  onClick={() => {
                    setMoving({ sectionId: section.id, projectId: project.id })
                    setDestination("")
                  }}
                >
                  Move section
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={`${editorButton} m-4`}
            onClick={() =>
              open({
                kind: "project",
                sectionId: section.id,
                existing: false,
                project: {
                  id: `project-${crypto.randomUUID()}`,
                  title: "",
                  description: "",
                  photo: { src: "", alt: "" },
                  details: [],
                  list: { kind: "services", items: [] },
                },
              })
            }
          >
            + Add project
          </button>
        </article>
      ))}
      {moving && (
        <EditorDialog title="Move project to another section" close={() => setMoving(null)}>
          <label className="block text-sm font-semibold">
            Destination section
            <select
              className={`${editorInput} mt-2`}
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            >
              <option value="">Select a section</option>
              {sections
                .filter((section) => section.id !== moving.sectionId)
                .map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.title}
                  </option>
                ))}
            </select>
          </label>
          <p className="mt-3 text-sm text-slate-500">
            The project will be added to the end of the selected section. Save changes above to
            publish.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" className={editorButton} onClick={() => setMoving(null)}>
              Cancel
            </button>
            <button
              type="button"
              className={editorButton}
              disabled={!destination}
              onClick={() => {
                const project = sections
                  .find((section) => section.id === moving.sectionId)
                  ?.projects.find((project) => project.id === moving.projectId)
                if (
                  !project ||
                  !sections.some((section) => section.id === destination) ||
                  destination === moving.sectionId
                )
                  return
                change(
                  sections.map((section) =>
                    section.id === moving.sectionId
                      ? {
                          ...section,
                          projects: section.projects.filter((item) => item.id !== moving.projectId),
                        }
                      : section.id === destination
                        ? { ...section, projects: [...section.projects, project] }
                        : section,
                  ),
                )
                setMoving(null)
              }}
            >
              Move section
            </button>
          </div>
        </EditorDialog>
      )}
      {selection && (
        <EditorDialog
          title={
            selection.kind === "delete"
              ? `Delete ${selection.title}?`
              : selection.kind === "section"
                ? `${selection.existing ? "Edit" : "Add"} section`
                : `${selection.existing ? "Edit" : "Add"} project`
          }
          close={() => {
            if (!uploading) setSelection(null)
          }}
        >
          {selection.kind === "delete" ? (
            <>
              <p className="text-sm text-slate-600">
                {selection.projectId
                  ? "This project will be removed"
                  : "This section and all its projects will be removed"}{" "}
                when you save changes to the page.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" className={editorButton} onClick={() => setSelection(null)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className={`${editorButton} !bg-red-700 !text-white`}
                  onClick={() => {
                    change(
                      selection.projectId
                        ? sections.map((section) =>
                            section.id === selection.sectionId
                              ? {
                                  ...section,
                                  projects: section.projects.filter(
                                    (project) => project.id !== selection.projectId,
                                  ),
                                }
                              : section,
                          )
                        : sections.filter((section) => section.id !== selection.sectionId),
                    )
                    setSelection(null)
                  }}
                >
                  Remove from draft
                </button>
              </div>
            </>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                let next: ContractSection[]
                if (selection.kind === "section") {
                  next = selection.existing
                    ? sections.map((section) =>
                        section.id === selection.section.id ? selection.section : section,
                      )
                    : [...sections, selection.section]
                } else {
                  const project = {
                    ...selection.project,
                    photo: { ...selection.project.photo, alt: selection.project.title },
                  }
                  next = sections.map((section) => {
                    if (section.id !== selection.sectionId) return section
                    const projects = selection.existing
                      ? section.projects.map((item) => (item.id === project.id ? project : item))
                      : [...section.projects, project]
                    return { ...section, projects }
                  })
                }
                const failure = validateContractSections(next)
                if (failure) {
                  setError(failure)
                  return
                }
                change(next)
                setSelection(null)
              }}
            >
              {selection.kind === "section" ? (
                <div className="space-y-4">
                  <label className="block text-sm">
                    Section title
                    <input
                      required
                      className={editorInput}
                      value={selection.section.title}
                      onChange={(event) =>
                        updateSection({ ...selection.section, title: event.target.value })
                      }
                    />
                  </label>
                  <label className="block text-sm">
                    Eyebrow text
                    <input
                      required
                      className={editorInput}
                      value={selection.section.eyebrow}
                      onChange={(event) =>
                        updateSection({ ...selection.section, eyebrow: event.target.value })
                      }
                    />
                  </label>
                  <label className="block text-sm">
                    One-line description
                    <input
                      required
                      className={editorInput}
                      value={selection.section.description}
                      onChange={(event) =>
                        updateSection({ ...selection.section, description: event.target.value })
                      }
                    />
                  </label>
                </div>
              ) : (
                <div className="space-y-5">
                  <label className="block text-sm">
                    Project title
                    <input
                      required
                      className={editorInput}
                      value={selection.project.title}
                      onChange={(event) =>
                        updateProject({ ...selection.project, title: event.target.value })
                      }
                    />
                  </label>
                  <label className="block text-sm">
                    Description
                    <textarea
                      required
                      rows={4}
                      className={editorInput}
                      value={selection.project.description}
                      onChange={(event) =>
                        updateProject({ ...selection.project, description: event.target.value })
                      }
                    />
                  </label>
                  <div>
                    <p className="mb-2 text-sm">Image</p>
                    {selection.project.photo.src && (
                      <Image
                        src={selection.project.photo.src}
                        alt={selection.project.title}
                        width={400}
                        height={220}
                        unoptimized
                        className="mb-3 max-h-44 w-full rounded-lg object-cover"
                      />
                    )}
                    <button
                      type="button"
                      disabled={uploading}
                      className={`${editorButton} !bg-blue-700 !text-white`}
                      onClick={() =>
                        chooseImage((src) =>
                          setSelection((current) =>
                            current?.kind === "project" &&
                            current.project.id === selection.project.id
                              ? {
                                  ...current,
                                  project: {
                                    ...current.project,
                                    photo: { src, alt: current.project.title },
                                  },
                                }
                              : current,
                          ),
                        )
                      }
                    >
                      {uploading
                        ? "Uploading…"
                        : selection.project.photo.src
                          ? "Replace image"
                          : "Choose an image"}
                    </button>
                  </div>
                  <fieldset className="space-y-3 rounded-lg border border-slate-200 p-4">
                    <legend className="px-1 text-sm font-semibold">Key details</legend>
                    {selection.project.details.map((detail, index) => (
                      <div key={detail.key} className="flex items-end gap-2">
                        <label className="min-w-0 flex-1 text-sm">
                          {detailLabels[detail.key]}
                          <input
                            required
                            className={editorInput}
                            value={detail.value}
                            onChange={(event) =>
                              updateProject({
                                ...selection.project,
                                details: selection.project.details.map((item, position) =>
                                  position === index
                                    ? { ...item, value: event.target.value }
                                    : item,
                                ),
                              })
                            }
                          />
                        </label>
                        <button
                          type="button"
                          className={`${editorButton} !text-red-700`}
                          aria-label={`Remove ${detailLabels[detail.key]}`}
                          onClick={() =>
                            updateProject({
                              ...selection.project,
                              details: selection.project.details.filter(
                                (item) => item.key !== detail.key,
                              ),
                            })
                          }
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {selection.project.details.length < Object.keys(detailLabels).length && (
                      <label className="block text-sm">
                        Add key detail
                        <select
                          className={editorInput}
                          value=""
                          onChange={(event) => {
                            if (event.target.value)
                              updateProject({
                                ...selection.project,
                                details: [
                                  ...selection.project.details,
                                  { key: event.target.value as DetailKey, value: "" },
                                ],
                              })
                          }}
                        >
                          <option value="">Choose a detail…</option>
                          {Object.entries(detailLabels)
                            .filter(
                              ([key]) =>
                                !selection.project.details.some((item) => item.key === key),
                            )
                            .map(([key, label]) => (
                              <option key={key} value={key}>
                                {label}
                              </option>
                            ))}
                        </select>
                      </label>
                    )}
                  </fieldset>
                  <fieldset className="space-y-3 rounded-lg border border-slate-200 p-4">
                    <legend className="px-1 text-sm font-semibold">Project list</legend>
                    <label className="block text-sm">
                      List type
                      <select
                        className={editorInput}
                        value={selection.project.list.kind}
                        onChange={(event) => {
                          const kind = event.target.value as "services" | "naics"
                          if (kind === selection.project.list.kind) return
                          if (selection.project.list.items.length) setSwitchList(true)
                          else
                            updateProject({
                              ...selection.project,
                              list: kind === "services" ? { kind, items: [] } : { kind, items: [] },
                            })
                        }}
                      >
                        <option value="services">Services provided</option>
                        <option value="naics">NAICS codes</option>
                      </select>
                    </label>
                    {switchList && (
                      <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                        <p>
                          Switching list type removes the current list from this project’s draft.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <button
                            type="button"
                            className={editorButton}
                            onClick={() => setSwitchList(false)}
                          >
                            Keep current list
                          </button>
                          <button
                            type="button"
                            className={editorButton}
                            onClick={() => {
                              updateProject({
                                ...selection.project,
                                list:
                                  selection.project.list.kind === "services"
                                    ? { kind: "naics", items: [] }
                                    : { kind: "services", items: [] },
                              })
                              setSwitchList(false)
                            }}
                          >
                            Switch list type
                          </button>
                        </div>
                      </div>
                    )}
                    {selection.project.list.kind === "services"
                      ? selection.project.list.items.map((service, index) => (
                          <div key={index} className="flex flex-wrap items-end gap-2">
                            <label className="min-w-40 flex-1 text-sm">
                              Service {index + 1}
                              <input
                                required
                                className={editorInput}
                                value={service}
                                onChange={(event) => {
                                  const list = selection.project.list
                                  if (list.kind === "services")
                                    updateProject({
                                      ...selection.project,
                                      list: {
                                        kind: "services",
                                        items: list.items.map((item, position) =>
                                          position === index ? event.target.value : item,
                                        ),
                                      },
                                    })
                                }}
                              />
                            </label>
                            <Order
                              label={`service ${index + 1}`}
                              index={index}
                              count={selection.project.list.items.length}
                              move={(direction) => {
                                const list = selection.project.list
                                if (list.kind === "services")
                                  updateProject({
                                    ...selection.project,
                                    list: {
                                      ...list,
                                      items: moveItem(list.items, index, direction),
                                    },
                                  })
                              }}
                            />
                            <button
                              type="button"
                              className={`${editorButton} !text-red-700`}
                              aria-label={`Remove service ${index + 1}`}
                              onClick={() => {
                                const list = selection.project.list
                                if (list.kind === "services")
                                  updateProject({
                                    ...selection.project,
                                    list: {
                                      ...list,
                                      items: list.items.filter((_, position) => position !== index),
                                    },
                                  })
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))
                      : selection.project.list.items.map((code, index) => (
                          <div key={index} className="space-y-2 rounded-lg bg-slate-50 p-3">
                            <div className="flex gap-2">
                              <label className="w-28 shrink-0 text-sm">
                                NAICS code {index + 1}
                                <input
                                  required
                                  pattern="[0-9]{6}"
                                  inputMode="numeric"
                                  className={editorInput}
                                  value={code.code}
                                  onChange={(event) => {
                                    const list = selection.project.list
                                    if (list.kind === "naics")
                                      updateProject({
                                        ...selection.project,
                                        list: {
                                          ...list,
                                          items: list.items.map((item, position) =>
                                            position === index
                                              ? { ...item, code: event.target.value }
                                              : item,
                                          ),
                                        },
                                      })
                                  }}
                                />
                              </label>
                              <label className="min-w-0 flex-1 text-sm">
                                Code title {index + 1}
                                <input
                                  required
                                  className={editorInput}
                                  value={code.title}
                                  onChange={(event) => {
                                    const list = selection.project.list
                                    if (list.kind === "naics")
                                      updateProject({
                                        ...selection.project,
                                        list: {
                                          ...list,
                                          items: list.items.map((item, position) =>
                                            position === index
                                              ? { ...item, title: event.target.value }
                                              : item,
                                          ),
                                        },
                                      })
                                  }}
                                />
                              </label>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Order
                                label={`NAICS code ${index + 1}`}
                                index={index}
                                count={selection.project.list.items.length}
                                move={(direction) => {
                                  const list = selection.project.list
                                  if (list.kind === "naics")
                                    updateProject({
                                      ...selection.project,
                                      list: {
                                        ...list,
                                        items: moveItem(list.items, index, direction),
                                      },
                                    })
                                }}
                              />
                              <button
                                type="button"
                                className={`${editorButton} !text-red-700`}
                                aria-label={`Remove NAICS code ${index + 1}`}
                                onClick={() => {
                                  const list = selection.project.list
                                  if (list.kind === "naics")
                                    updateProject({
                                      ...selection.project,
                                      list: {
                                        ...list,
                                        items: list.items.filter(
                                          (_, position) => position !== index,
                                        ),
                                      },
                                    })
                                }}
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                    <button
                      type="button"
                      className={editorButton}
                      onClick={() => {
                        const list = selection.project.list
                        updateProject({
                          ...selection.project,
                          list:
                            list.kind === "services"
                              ? { kind: "services", items: [...list.items, ""] }
                              : { kind: "naics", items: [...list.items, { code: "", title: "" }] },
                        })
                      }}
                    >
                      + Add {selection.project.list.kind === "services" ? "service" : "NAICS code"}
                    </button>
                  </fieldset>
                </div>
              )}
              {(error || (selection.kind === "project" && uploadError)) && (
                <p role="alert" className="mt-4 text-sm text-red-700">
                  {error || uploadError}
                </p>
              )}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  disabled={uploading}
                  className={editorButton}
                  onClick={() => setSelection(null)}
                >
                  Cancel
                </button>
                <button disabled={uploading} className={`${editorButton} !bg-blue-700 !text-white`}>
                  {uploading ? "Uploading…" : "Apply to draft"}
                </button>
              </div>
            </form>
          )}
        </EditorDialog>
      )}
    </section>
  )
}
