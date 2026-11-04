import type { ReactNode } from "react"
import VisiblePublicPage from "~/components/visible-public-page"

export default function Layout({ children }: { children: ReactNode }) {
  return <VisiblePublicPage page="contracts">{children}</VisiblePublicPage>
}
