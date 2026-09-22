import { Metadata } from "next"
import { Amiri, Cabin, Montserrat } from "next/font/google"
// oxlint-disable-next-line import/no-unassigned-import
import "~/globals.css"

const header = Montserrat({ variable: "--font-header-source", subsets: ["latin"] })
const body = Amiri({ variable: "--font-body-source", subsets: ["latin"], weight: ["400", "700"] })
const eyebrow = Cabin({ variable: "--font-eyebrow-source", subsets: ["latin"] })

export const metadata: Metadata = {
  title: { default: "Harkcon", template: "%s • Harkcon" },
}

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${header.variable} ${body.variable} ${eyebrow.variable}`}>
      <body className="flex min-h-dvh flex-col font-body antialiased">
        <main className="grow">{children}</main>
      </body>
    </html>
  )
}
