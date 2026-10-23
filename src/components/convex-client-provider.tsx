"use client"

import { ConvexProvider, ConvexReactClient } from "convex/react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useState, type ReactNode } from "react"

const AdminAuthProvider = dynamic(() => import("./admin-auth-provider"))

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [client] = useState(
    () =>
      new ConvexReactClient(
        process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://neat-eel-640.convex.cloud",
      ),
  )

  // Only the dashboard uses authenticated queries. Public content stays live
  // without downloading the login client or requesting an admin session.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return <AdminAuthProvider client={client}>{children}</AdminAuthProvider>
  }
  return <ConvexProvider client={client}>{children}</ConvexProvider>
}
