import type { Metadata } from "next"
import View from "~/components/careers-page"
import { PublicPageContent } from "~/components/page-editing"
export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore careers at Harkcon, available positions, FAQs, and equal employment opportunities.",
}
export default function Page() {
  return (
    <PublicPageContent page="careers">
      <View />
    </PublicPageContent>
  )
}
