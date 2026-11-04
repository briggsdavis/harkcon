"use client"

import { Plus, Play } from "@phosphor-icons/react"
import { useState } from "react"

const faqs = [
  [
    "How do I edit a page?",
    "Open Page editor in the navigation and choose a page. Click the text you want to edit directly in the preview. Click an image or button to open its editing controls. When you’re finished, click Save changes.",
  ],
  [
    "Do my changes save automatically?",
    "Page and solution edits need to be saved with Save changes. Check the status at the top of the editor for unsaved changes or confirmation that everything is saved. Page visibility switches save immediately.",
  ],
  [
    "When will visitors see my changes?",
    "Saved changes to a published page become available on the public site without a separate website deployment. Review your work before saving, then open the public page to check the result.",
  ],
  [
    "How do I replace an image?",
    "Click the image in the page editor and use the image controls to choose or upload its replacement. Add descriptive alternative text where available, then save the page. Check how the image crops on the public page, especially on mobile.",
  ],
  [
    "How do I change a button or link?",
    "Click the button or link in the page editor to change its label and destination. Use a site path such as /contact for an internal page, or a complete https:// address for an external website. Save your changes and check the link on the public site.",
  ],
  [
    "What should I do if I want to undo my edits?",
    "Before saving, use Discard to return to the last saved version. Leaving an editor with unsaved changes prompts you to save or discard them. Discard does not undo changes that have already been saved.",
  ],
  [
    "Why does the editor say the page changed in another window?",
    "Someone else, or another browser window, saved a newer version while you were editing. Keep a separate copy of any text you need, reload the editor to load the latest version, and apply your edits again.",
  ],
  [
    "How do I manage solution pages?",
    "Expand Solutions under Page editor and select a solution to edit its content. Use the solution navigation controls to add or manage pages. Save edits before changing publication status, archiving, or deleting a solution.",
  ],
  [
    "What is the difference between featured and archived solutions?",
    "Featured controls whether a solution is highlighted on the homepage. Archiving removes a solution from the public solution list and makes its detail page unavailable. Unarchive a solution when it is ready to be published again.",
  ],
  [
    "Does turning off page visibility unpublish a page?",
    "No. Page visibility controls whether the site’s navigation links are clickable; disabled links appear as plain text. It is not a privacy control. Use the archive controls where available to remove published content.",
  ],
  [
    "How do I update News & Insights?",
    "Open News editor to manage articles, their images, dates, categories, and content. Use its featured and ordering controls to choose which stories are highlighted and how they are arranged. Review the public news page after saving.",
  ],
  [
    "How do I update Contracts or OASIS+?",
    "Choose Contracts or OASIS+ under Page editor. Edit text in the preview and use the contract section controls for structured project and contract information. Save changes on each page separately.",
  ],
  [
    "How do I update people and FAQs?",
    "On the About page, use the people editing controls to update leadership details and photos. On Careers, use Manage FAQs to add or remove questions and edit their answers. Save the page when finished. This admin help page is fixed reference content.",
  ],
  [
    "Can I edit the job openings in Careers?",
    "Job openings are synced from ADP daily rather than edited here. Update job listings in ADP. You can still edit the surrounding Careers page content and FAQs in the page editor.",
  ],
  [
    "Where do contact form messages go?",
    "Open Contacts to review website submissions and mark them read or unread. Email notifications are also sent when configured, but the admin inbox remains the place to check submissions. Deleting a submission removes it from that inbox.",
  ],
  [
    "What does the dashboard show?",
    "The dashboard summarizes the site’s recorded page views and visitor activity. Use it to see which pages draw interest and where traffic comes from. Its figures reflect the tracking collected by this site.",
  ],
  [
    "Who can access the admin panel?",
    "Admin access is restricted to approved email addresses. If a colleague needs access or cannot sign in, contact the person responsible for managing the website’s admin accounts. An existing admin cannot approve a new address through the page editor.",
  ],
  [
    "What should I check before finishing?",
    "Confirm your changes are saved, then check the affected public page on desktop and mobile. Review spelling, image crops, button destinations, and any related navigation. Use Sign out when you’re finished on a shared computer.",
  ],
]

export default function AdminFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <section className="mx-auto max-w-4xl p-6 md:p-10">
      <p className="mb-2 text-xs font-bold tracking-widest text-slate-500 uppercase">Admin help</p>
      <h1 className="font-header text-[clamp(30px,4vw,46px)] font-medium tracking-tight">FAQ</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        A quick guide to keeping the Harkcon website up to date.
      </p>
      <div className="mt-8 flex aspect-video flex-col items-center justify-center rounded-2xl border border-slate-200 bg-[#10172c] px-6 text-center text-white">
        <span
          className="mb-5 grid size-16 place-items-center rounded-full border border-white/20 bg-white/5"
          aria-hidden="true"
        >
          <Play className="size-6" />
        </span>
        <h2 className="font-header text-xl font-semibold">Admin video tutorial</h2>
        <p className="mt-3 rounded-full border border-white/20 px-4 py-1 text-sm text-slate-300">
          Coming soon
        </p>
      </div>
      <h2 className="mt-10 mb-5 font-header text-xl font-semibold">Using the admin panel</h2>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {faqs.map(([question, answer], index) => {
          const open = openIndex === index
          return (
            <div key={question} className="border-b border-slate-200 last:border-b-0">
              <h3>
                <button
                  type="button"
                  id={`admin-faq-question-${index}`}
                  aria-expanded={open}
                  aria-controls={`admin-faq-answer-${index}`}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left text-sm font-bold transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600 md:px-6"
                >
                  {question}
                  <Plus
                    aria-hidden="true"
                    className={`size-5 shrink-0 text-slate-500 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-45" : ""}`}
                  />
                </button>
              </h3>
              <section
                id={`admin-faq-answer-${index}`}
                aria-labelledby={`admin-faq-question-${index}`}
                aria-hidden={!open}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-6 text-sm leading-7 text-slate-600 md:px-6">{answer}</p>
                </div>
              </section>
            </div>
          )
        })}
      </div>
    </section>
  )
}
