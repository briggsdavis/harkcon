import { Metadata } from "next"
import HomePage from "~/components/home-page"

export const metadata: Metadata = {
  title: { absolute: "Harkcon | Human & Organizational Performance" },
  description:
    "Harkcon delivers customized performance management and technology solutions that improve people and organizational performance.",
}

export default function Home() {
  return <HomePage />
}
