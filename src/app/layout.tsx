import { Metadata } from "next"
import { Cabin, Gelasio } from "next/font/google"
// oxlint-disable-next-line import/no-unassigned-import
import "./globals.css"

const header = Gelasio({ variable: "--font-header-source" })
const body = Cabin({ variable: "--font-body-source" })

export const metadata: Metadata = {
  title: { default: "Harkcon", template: "%s • Harkcon" },
}

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={header.variable + " " + body.variable}>
      <body className="flex min-h-dvh flex-col font-body antialiased">
        <main className="grow">{children}</main>
      </body>
    </html>
  )
}
