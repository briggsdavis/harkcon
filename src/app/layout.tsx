import { fetchQuery } from "convex/nextjs"
import { Metadata } from "next"
import { Cabin, Montserrat, Nunito_Sans } from "next/font/google"
import AnalyticsTracker from "~/components/analytics-tracker"
import ConvexClientProvider from "~/components/convex-client-provider"
import EntranceAnimations from "~/components/entrance-animations"
import RouteTransition from "~/components/route-transition"
import SmoothScroll from "~/components/smooth-scroll"
import { api } from "../../convex/_generated/api"
// oxlint-disable-next-line import/no-unassigned-import
import "~/globals.css"
// oxlint-disable-next-line import/no-unassigned-import

const header = Montserrat({ variable: "--font-header-source", subsets: ["latin"] })
const body = Nunito_Sans({ variable: "--font-body-source", subsets: ["latin"] })
const eyebrow = Cabin({ variable: "--font-eyebrow-source", subsets: ["latin"] })

const baseMetadata: Metadata = {
  title: { default: "Harkcon", template: "%s • Harkcon" },
  icons: {
    icon: [{ url: "/images/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/images/favicon.svg",
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = new URL(process.env.SITE_URL ?? "https://www.harkcon.com")
  let image = "/images/capitol-hero.png"
  try {
    image = await fetchQuery(
      api.content.getHomeShareImage,
      {},
      {
        url: process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://neat-eel-640.convex.cloud",
      },
    )
  } catch (error) {
    console.error("Could not load the homepage sharing image", error)
  }
  const imageUrl = new URL(image, siteUrl).toString()
  return {
    ...baseMetadata,
    metadataBase: siteUrl,
    openGraph: {
      type: "website",
      siteName: "Harkcon",
      images: [{ url: imageUrl, alt: "Harkcon homepage hero" }],
    },
    twitter: { card: "summary_large_image", images: [imageUrl] },
  }
}

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${header.variable} ${body.variable} ${eyebrow.variable}`}
    >
      <body className="flex min-h-dvh flex-col font-body antialiased">
        <ConvexClientProvider>
          <EntranceAnimations />
          <SmoothScroll />
          <AnalyticsTracker />
          <main className="grow">{children}</main>
          <RouteTransition />
        </ConvexClientProvider>
      </body>
    </html>
  )
}
