import { Metadata } from "next"
import HomePage from "~/components/home-page"

export const metadata: Metadata = {
  title: { absolute: "Harkcon • Human & Organizational Performance" },
  description:
    "Master Performance. Better people. Stronger missions. Harkcon helps agencies improve workforce readiness, training, and organizational performance.",
}

export default function Home() {
  return <HomePage />
}
