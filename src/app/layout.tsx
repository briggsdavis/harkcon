import { Metadata } from "next"
import { Newsreader, Public_Sans } from "next/font/google"
import Footer from "~/components/footer"
import Navbar from "~/components/navbar"
import { PageTransition } from "~/components/page-transition"
// oxlint-disable-next-line import/no-unassigned-import
import "~/globals.css"

const header = Newsreader({ variable: "--font-header-source" })
const body = Public_Sans({ variable: "--font-body-source" })

export const metadata: Metadata = {
  title: { default: "Harkcon", template: "%s • Harkcon" },
}

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`overscroll-y-none scroll-smooth motion-reduce:scroll-auto ${header.variable} ${body.variable}`}
    >
      <body className="flex min-h-dvh flex-col font-body antialiased">
        <PageTransition>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </PageTransition>
      </body>
    </html>
  )
}
