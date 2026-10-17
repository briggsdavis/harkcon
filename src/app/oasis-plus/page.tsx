import type { Metadata } from "next"
import ContractsPage from "~/components/contracts-page"

export const metadata: Metadata = {
  title: "OASIS+",
  description:
    "Explore Harkcon’s OASIS+ Small Business and SDVOSB vehicles, services, and acquisition information.",
}

export default function OasisPlus() {
  return <ContractsPage view="oasis" />
}
