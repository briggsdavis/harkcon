"use client"
import { useRef, useState } from "react"

export function useImagePicker(
  upload: (file: File) => Promise<string>,
  report: (message: string) => void,
) {
  const input = useRef<HTMLInputElement>(null)
  const pending = useRef<((src: string) => void) | null>(null)
  const [uploading, setUploading] = useState(false)
  function choose(apply: (src: string) => void) {
    if (uploading) return
    pending.current = apply
    input.current?.click()
  }
  const picker = (
    <input
      ref={input}
      type="file"
      className="hidden"
      aria-label="Upload image"
      accept="image/jpeg,image/png,image/webp,image/avif"
      onChange={async (event) => {
        const file = event.target.files?.[0]
        const apply = pending.current
        pending.current = null
        event.target.value = ""
        if (!file || !apply) return
        setUploading(true)
        report("")
        try {
          apply(await upload(file))
        } catch (error) {
          report(error instanceof Error ? error.message : "Could not upload image")
        } finally {
          setUploading(false)
        }
      }}
    />
  )
  return { choose, picker, uploading }
}
