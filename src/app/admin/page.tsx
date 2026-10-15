import type { Metadata } from "next"
import { Suspense } from "react"
import AdminApp, { AdminBoot } from "~/components/admin/admin-app"

export const metadata: Metadata = { title: "Admin" }

export default function AdminPage() {
  return (
    <Suspense fallback={<AdminBoot />}>
      <AdminApp />
    </Suspense>
  )
}
