import { Metadata } from "next"
import ContactPage from "~/components/contact-page"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Harkcon for general inquiries, business development, and partnership opportunities.",
}

export default function Contact() {
  return <ContactPage />
}
