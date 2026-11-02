import { Metadata } from "next"
import { redirect } from "next/navigation"
import ContractsPage from "~/components/contracts-page"
import { PublicPageContent } from "~/components/page-editing"

export const metadata: Metadata = {
  title: "Contract Vehicles",
  description:
    "Explore Harkcon's federal contract vehicles, GSA schedules, OASIS+ contracts, and NAICS capabilities.",
}

export default async function Contracts({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>
}) {
  if ((await searchParams).view === "oasis-plus") redirect("/oasis-plus")
  return (
    <PublicPageContent page="contracts">
      <ContractsPage />
    </PublicPageContent>
  )
}
