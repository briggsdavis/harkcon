"use client"
import { useEffect, useRef, type ReactNode } from "react"
export const editorButton =
  "rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-wait disabled:opacity-50"
export const editorInput =
  "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
export default function EditorDialog({
  title,
  children,
  close,
}: {
  title: string
  children: ReactNode
  close: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])
  return (
    <dialog
      ref={ref}
      onCancel={(event) => {
        event.preventDefault()
        close()
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[90vw] max-w-xl overflow-auto rounded-2xl border-0 bg-white p-6 text-slate-900 shadow-2xl backdrop:bg-slate-950/50"
      aria-labelledby="editor-dialog-title"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id="editor-dialog-title" className="font-header text-xl font-semibold">
          {title}
        </h2>
        <button
          type="button"
          aria-label="Close dialog"
          className="rounded-lg px-3 py-2 text-slate-500"
          onClick={close}
        >
          ✕
        </button>
      </div>
      {children}
    </dialog>
  )
}
export function requestEditorNavigation(url: string) {
  return window.dispatchEvent(
    new CustomEvent("harkcon:navigate", { cancelable: true, detail: { url } }),
  )
}
