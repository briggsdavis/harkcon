import { Metadata } from "next"
import ContractsPage from "~/components/contracts-page"

export const metadata: Metadata = {
  title: "Contract Vehicles",
  description:
    "Explore Harkcon's federal contract vehicles, GSA schedules, OASIS+ contracts, and NAICS capabilities.",
}

export default function Contracts() {
  return <ContractsPage />
}
