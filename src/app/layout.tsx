import { Metadata } from "next"
import { Cabin, Montserrat, Nunito_Sans } from "next/font/google"
import EntranceAnimations from "~/components/entrance-animations"
import RouteTransition from "~/components/route-transition"
import SmoothScroll from "~/components/smooth-scroll"
// oxlint-disable-next-line import/no-unassigned-import
import "~/globals.css"

const header = Montserrat({ variable: "--font-header-source", subsets: ["latin"] })
const body = Nunito_Sans({ variable: "--font-body-source", subsets: ["latin"] })
const eyebrow = Cabin({ variable: "--font-eyebrow-source", subsets: ["latin"] })

export const metadata: Metadata = {
  title: { default: "Harkcon", template: "%s • Harkcon" },
  icons: {
    icon: [{ url: "/images/harkcon-favicon.png", type: "image/png" }],
    shortcut: "/images/harkcon-favicon.png",
  },
}

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${header.variable} ${body.variable} ${eyebrow.variable}`}>
      <body className="flex min-h-dvh flex-col font-body antialiased">
        <EntranceAnimations />
        <SmoothScroll />
        <main className="grow">{children}</main>
        <RouteTransition />
      </body>
    </html>
  )
}
