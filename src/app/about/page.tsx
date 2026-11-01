import type { Metadata } from "next"
import View from "~/components/about-page"
import { PublicPageContent } from "~/components/page-editing"
export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Harkcon, our people, history, mission, guiding principles, culture, and commitment to our communities.",
}
export default function Page() {
  return (
    <PublicPageContent page="about">
      <View />
    </PublicPageContent>
  )
}
