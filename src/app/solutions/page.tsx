import type { Metadata } from "next"
import { PublicPageContent } from "~/components/page-editing"
import View from "~/components/solutions-page"
export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore Harkcon’s workforce, training, strategy, and operational support solutions and our approach to lasting mission performance.",
}
export default function Page() {
  return (
    <PublicPageContent page="solutions">
      <View />
    </PublicPageContent>
  )
}
