import { Metadata } from "next"
import NewsPage from "~/components/news-page"

export const metadata: Metadata = {
  title: "News & Insights",
  description: "Read Harkcon news, insights, press releases, and media coverage.",
}

export default function NewsInsights() {
  return <NewsPage />
}
