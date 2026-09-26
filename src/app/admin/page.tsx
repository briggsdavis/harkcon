import type { Metadata } from "next"
import { Suspense } from "react"
import AdminApp from "~/components/admin/admin-app"

export const metadata: Metadata = { title: "Admin" }

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="admin-boot">Opening your workspace…</div>}>
      <AdminApp />
    </Suspense>
  )
}
