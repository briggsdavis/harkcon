"use client"

import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Article,
  CaretRight,
  Circle,
  Envelope,
  FileText,
  MagnifyingGlass,
  Plus,
  SignOut,
  SquaresFour,
  X,
} from "@phosphor-icons/react"
import { Authenticated, AuthLoading, Unauthenticated, useMutation, useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useCallback, useMemo, useState, type ReactNode } from "react"
import { authClient } from "~/lib/auth-client"
import { api } from "../../../convex/_generated/api"
import type { Doc, Id } from "../../../convex/_generated/dataModel"

type View =
  | "dashboard"
  | "news"
  | "contacts"
  | "home"
  | "about"
  | "careers"
  | "contracts"
  | "solutions"
  | "global"
type ArticleDraft = Pick<
  Doc<"articles">,
  | "slug"
  | "title"
  | "date"
  | "displayDate"
  | "category"
  | "image"
  | "imageStorageId"
  | "imageAlt"
  | "excerpt"
  | "body"
> & { id?: Id<"articles"> }

const emptyArticle: ArticleDraft = {
  slug: "",
  title: "",
  date: new Date().toISOString().slice(0, 10),
  displayDate: "",
  category: "News",
  image: "",
  imageAlt: "",
  excerpt: "",
  body: [""],
}

const pageLabels: Record<View, string> = {
  dashboard: "Dashboard",
  news: "News editor",
  contacts: "Contacts",
  home: "Home page",
  about: "About page",
  careers: "Careers page",
  contracts: "Contracts page",
  solutions: "Solution pages",
  global: "Global details & contact",
}

const icons = {
  grid: SquaresFour,
  news: Article,
  mail: Envelope,
  page: FileText,
  chevron: CaretRight,
  plus: Plus,
  search: MagnifyingGlass,
  close: X,
  logout: SignOut,
}

const buttonBase =
  "inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-2 rounded-[9px] px-[17px] text-sm font-bold transition-[translate,box-shadow,background-color] duration-180"
const primaryButton = `${buttonBase} bg-[#2346b8] text-white shadow-[0_5px_18px_#2346b826] hover:-translate-y-px hover:shadow-[0_8px_24px_#2346b838] disabled:cursor-wait disabled:opacity-55`
const secondaryButton = `${buttonBase} border border-[#dfe2e8] bg-white text-[#4e566b]`
const dangerButton = `${buttonBase} bg-[#b72c3a] text-white`
const quietButton = `${buttonBase} border border-[#e1e4e9] bg-white text-[#35405c]`
const dangerLink = "cursor-pointer py-2 text-[13px] text-[#b02d3a]"
const rowButton =
  "cursor-pointer rounded-[7px] border border-[#e3e5e9] bg-white px-2 py-1.5 text-xs"
const kicker = "mb-2 font-eyebrow text-[11px] font-bold tracking-[0.16em] text-[#7b8291] uppercase"
const pageTitle =
  "font-header text-[clamp(30px,4vw,46px)] font-medium tracking-[-0.045em] text-[#17203b]"
const card = "rounded-[15px] border border-[#e6e8ec] bg-white shadow-[0_1px_2px_#17203b08]"
const cardTitle = "font-header text-[19px] font-semibold tracking-[-0.02em]"
const cardSubtitle = "mt-[5px] text-[13px] text-[#808696]"
const selectControl =
  "min-w-[150px] rounded-[10px] border border-[#dfe2e8] bg-white py-[11px] pr-9 pl-[13px] text-[#394057]"
const formClassName = "flex flex-col gap-4"
const formGrid = "grid grid-cols-2 gap-[15px] max-[760px]:grid-cols-1"
const fieldName = "text-xs font-bold text-[#4f586d]"
const fieldControl =
  "w-full rounded-[9px] border border-[#dfe2e8] bg-white px-3 py-[11px] text-sm text-[#293149] outline-0 transition-[border-color,box-shadow] duration-180 focus:border-[#6882d5] focus:shadow-[0_0_0_3px_#4169e112]"
const textareaControl = `${fieldControl} resize-y leading-normal`
const fieldHint = "min-h-[13px] text-[11px] text-[#9298a5]"
const span2 = "col-span-2 max-[760px]:col-auto"
const modalActions = "mt-[22px] flex items-center justify-end gap-[9px]"
const contentHeading = "mt-[5px] mb-[3px] text-[15px] font-bold text-[#28314a]"
const listRow = "border-b border-[#eceef1] last:border-b-0"

function Field({
  label,
  hint,
  className = "",
  children,
}: {
  label: string
  hint?: string
  className?: string
  children: ReactNode
}) {
  return (
    <label className={`flex flex-col gap-[7px] ${className}`}>
      <span className={fieldName}>{label}</span>
      {children}
      {hint === undefined ? null : <small className={fieldHint}>{hint}</small>}
    </label>
  )
}

function ViewHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-[30px] max-[760px]:flex-col max-[760px]:items-start">
      <div>
        <p className={kicker}>{eyebrow}</p>
        <h1 className={pageTitle}>{title}</h1>
        <p className="mt-2 text-[15px] text-[#6f7688]">{description}</p>
      </div>
      {children}
    </div>
  )
}

const viewClassName =
  "m-auto w-[min(1280px,100%)] animate-admin-fade px-[clamp(28px,4vw,64px)] pt-[54px] pb-20 max-[760px]:px-[18px] max-[760px]:pt-8 max-[760px]:pb-[60px]"

function LoginAside() {
  return (
    <aside className="flex flex-col justify-end bg-linear-[145deg,#10172c,#1d2b58_60%,#3150ad] p-[8vw] font-header text-[clamp(38px,5vw,76px)] leading-[1.03] tracking-[-0.055em] text-white max-[1000px]:hidden">
      <span className="animate-admin-enter-slow">People.</span>
      <span className="animate-admin-enter-slow [animation-delay:80ms]">Performance.</span>
      <span className="animate-admin-enter-slow [animation-delay:160ms]">Technology.</span>
    </aside>
  )
}

const loginClassName =
  "admin-login grid min-h-dvh grid-cols-[minmax(420px,45%)_1fr] bg-[#f8f8f6] text-[#17203b] max-[1000px]:grid-cols-1"
const loginCardClassName =
  "flex w-[min(490px,100%)] flex-col justify-center bg-white px-[clamp(35px,6vw,82px)] py-[50px] max-[1000px]:m-auto max-[1000px]:w-[min(560px,100%)] max-[760px]:px-6 max-[760px]:py-9"
const loginLogoClassName = "mb-[70px] h-auto w-[170px] max-[760px]:mb-[50px]"
const loginBodyClassName = "mt-3 mb-[25px] text-sm leading-[1.6] text-[#737b8b]"

function Icon({
  name,
  className = "h-5 w-5 flex-none",
}: {
  name: keyof typeof icons
  className?: string
}) {
  const IconComponent = icons[name]
  return <IconComponent className={className} aria-hidden="true" />
}

const segmentClassName = (active: boolean) =>
  `cursor-pointer rounded-[7px] p-[9px] text-[13px] ${active ? "bg-white text-[#26314b] shadow-[0_1px_5px_#17203b17]" : "text-[#707789]"}`

const navButton = (active: boolean, extra = "px-3 py-[11px] text-sm") =>
  `flex w-full cursor-pointer items-center gap-3 rounded-[9px] text-left transition-[background-color,color,translate] duration-200 ${extra} ${active ? "bg-[#263458] text-white" : "text-[#aeb7ce] hover:bg-[#1a2440] hover:text-white"}`
const childButton = (active: boolean, extra = "") =>
  navButton(active, `px-2.5 py-2 text-[13px] ${extra}`)
const chevron = (open: boolean) =>
  `ml-auto h-5 w-[15px] flex-none transition-transform duration-200 ${open ? "rotate-90" : ""}`

function Login() {
  const [mode, setMode] = useState<"signin" | "create">("signin")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const submit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      const email = String(data.get("email") ?? "")
        .trim()
        .toLowerCase()
      const password = String(data.get("password") ?? "")
      const name = String(data.get("name") ?? "Harkcon admin")
      setBusy(true)
      setError("")
      try {
        const request =
          mode === "signin"
            ? authClient.signIn.email({ email, password })
            : authClient.signUp.email({ email, password, name })
        const result = await Promise.race([
          request,
          new Promise<never>((_, reject) =>
            window.setTimeout(() => reject(new Error("timeout")), 12_000),
          ),
        ])
        if (result.error) setError(result.error.message ?? "We couldn’t complete that request.")
      } catch {
        setError("We couldn’t reach the secure login service. Please try again in a moment.")
      } finally {
        setBusy(false)
      }
    },
    [mode],
  )

  return (
    <main className={loginClassName}>
      <section className={loginCardClassName}>
        <Image
          src="/images/harkcon-logo-black.avif"
          alt="Harkcon"
          width={210}
          height={54}
          priority
          className={loginLogoClassName}
        />
        <div>
          <p className={kicker}>Content workspace</p>
          <h1 className={`mt-1 ${pageTitle}`}>
            {mode === "signin" ? "Welcome back." : "Create your password."}
          </h1>
          <p className={loginBodyClassName}>
            {mode === "signin"
              ? "Sign in to manage the website, news, and incoming contacts."
              : "Access is limited to email addresses approved by Harkcon."}
          </p>
        </div>
        <div
          className="mb-[22px] grid grid-cols-2 rounded-[10px] bg-[#f0f1f3] p-1"
          role="tablist"
          aria-label="Choose login mode"
        >
          <button
            className={segmentClassName(mode === "signin")}
            onClick={() => setMode("signin")}
            type="button"
          >
            Sign in
          </button>
          <button
            className={segmentClassName(mode === "create")}
            onClick={() => setMode("create")}
            type="button"
          >
            Create password
          </button>
        </div>
        <form onSubmit={submit} className={formClassName}>
          {mode === "create" ? (
            <Field label="Your name">
              <input name="name" autoComplete="name" required className={fieldControl} />
            </Field>
          ) : null}
          <Field label="Email address">
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className={fieldControl}
            />
          </Field>
          <Field label="Password" hint={mode === "create" ? "Use at least 10 characters." : ""}>
            <input
              name="password"
              type="password"
              minLength={10}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
              className={fieldControl}
            />
          </Field>
          {error ? <AdminError>{error}</AdminError> : null}
          <button className={`${primaryButton} w-full`} disabled={busy}>
            {busy ? "One moment…" : mode === "signin" ? "Sign in" : "Create access"}
          </button>
        </form>
        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-1.5 text-[13px] text-[#747c8c] no-underline"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" /> Back to harkcon.com
        </Link>
      </section>
      <LoginAside />
    </main>
  )
}

function AdminError({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg bg-[#fff0f1] px-3 py-2.5 text-[13px] text-[#982c38]" role="alert">
      {children}
    </p>
  )
}

function Sidebar({ view, onSelect }: { view: View; onSelect: (view: View) => void }) {
  const [pagesOpen, setPagesOpen] = useState(
    view !== "dashboard" && view !== "news" && view !== "contacts",
  )
  const [solutionsOpen, setSolutionsOpen] = useState(view === "solutions")
  const item = (target: View, icon: "grid" | "news" | "mail" | "page") => (
    <button className={navButton(view === target)} onClick={() => onSelect(target)}>
      <Icon name={icon} />
      <span>{pageLabels[target]}</span>
    </button>
  )
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-[#10172c] px-[18px] pt-7 pb-5 text-[#d9deed] max-[760px]:hidden">
      <div className="flex items-center justify-between px-2.5 pb-8">
        <Image
          src="/images/harkcon-logo-white.avif"
          alt="Harkcon"
          width={160}
          height={41}
          className="h-auto w-[132px]"
        />
        <span className="rounded-full border border-[#35405e] px-2 py-1 text-[10px] tracking-[0.08em] text-[#9da7c1] uppercase">
          Admin
        </span>
      </div>
      <nav aria-label="Admin navigation" className="flex flex-1 flex-col gap-1">
        {item("dashboard", "grid")}
        {item("news", "news")}
        {item("contacts", "mail")}
        <button className={navButton(false)} onClick={() => setPagesOpen((open) => !open)}>
          <Icon name="page" />
          <span>Page editor</span>
          <Icon name="chevron" className={chevron(pagesOpen)} />
        </button>
        {pagesOpen ? (
          <div className="mb-[7px] ml-[31px] flex animate-admin-enter flex-col gap-0.5 border-l border-[#303a58] pl-2.5">
            {(["home", "about", "careers", "contracts"] as View[]).map((target) => (
              <button
                key={target}
                className={childButton(view === target)}
                onClick={() => onSelect(target)}
              >
                {pageLabels[target].replace(" page", "")}
              </button>
            ))}
            <button
              className={childButton(false, "mt-0.5")}
              onClick={() => setSolutionsOpen((open) => !open)}
            >
              Solutions <Icon name="chevron" className={chevron(solutionsOpen)} />
            </button>
            {solutionsOpen ? (
              <button
                className={
                  view === "solutions"
                    ? childButton(true, "pl-6")
                    : "flex w-full cursor-pointer items-center gap-3 rounded-[9px] py-2 pr-2.5 pl-6 text-left text-[13px] text-[#8f9ab5] transition-[background-color,color,translate] duration-200 hover:bg-[#1a2440] hover:text-white"
                }
                onClick={() => onSelect("solutions")}
              >
                Manage solution pages
              </button>
            ) : null}
            <button className={childButton(view === "global")} onClick={() => onSelect("global")}>
              Global details / contact
            </button>
          </div>
        ) : null}
      </nav>
      <button
        className="mt-5 flex w-full cursor-pointer items-center gap-3 border-t border-[#28324d] px-3 pt-[18px] pb-[11px] text-left text-sm text-[#aeb7ce] transition-colors duration-200 hover:bg-[#1a2440] hover:text-white"
        onClick={() => void authClient.signOut()}
      >
        <Icon name="logout" /> Sign out
      </button>
    </aside>
  )
}

function changePercent(current: number, previous: number) {
  if (previous === 0) return current === 0 ? "No change" : "New this period"
  const value = Math.round(((current - previous) / previous) * 100)
  return `${value >= 0 ? "+" : ""}${value}% vs prior period`
}

function LineChart({ data }: { data: { date: string; views: number; visitors: number }[] }) {
  const width = 820,
    height = 240,
    padding = 18
  const max = Math.max(1, ...data.map((item) => item.views))
  const points = data
    .map(
      (item, index) =>
        `${padding + (index / Math.max(1, data.length - 1)) * (width - padding * 2)},${height - padding - (item.views / max) * (height - padding * 2)}`,
    )
    .join(" ")
  const area = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`
  return (
    <div className="mt-[22px]">
      <svg
        className="block h-[240px] w-full overflow-visible border-b border-[#edf0f3] bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_59px,#f0f2f5_60px)] max-[760px]:h-[180px]"
        viewBox={`0 0 ${width} ${height}`}
        aria-label="Page views over time"
        preserveAspectRatio="none"
      >
        <title>Page views over time</title>
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4169e1" stopOpacity=".22" />
            <stop offset="1" stopColor="#4169e1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#chartFill)" />
        <polyline
          points={points}
          fill="none"
          stroke="#4169e1"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="flex justify-between pt-[9px] text-[11px] text-[#9298a6]">
        <span>{data[0]?.date}</span>
        <span>{data.at(-1)?.date}</span>
      </div>
    </div>
  )
}

function Dashboard() {
  const [days, setDays] = useState<30 | 90 | 180>(30)
  const stats = useQuery(api.analytics.dashboard, { days })
  return (
    <section className={viewClassName}>
      <ViewHeading
        eyebrow="Overview"
        title="Good to see you."
        description="Here’s how the website is performing."
      >
        <select
          className={selectControl}
          value={days}
          onChange={(e) => setDays(Number(e.target.value) as 30 | 90 | 180)}
          aria-label="Analytics date range"
        >
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 3 months</option>
          <option value={180}>Last 6 months</option>
        </select>
      </ViewHeading>
      {!stats ? (
        <LoadingCards />
      ) : (
        <>
          <div className="mb-[18px] grid grid-cols-4 gap-[15px] max-[1000px]:grid-cols-2 max-[760px]:grid-cols-1">
            <Stat
              label="Visitors"
              value={stats.totals.visitors}
              note={changePercent(stats.totals.visitors, stats.totals.previousVisitors)}
            />
            <Stat
              label="Page views"
              value={stats.totals.views}
              note={changePercent(stats.totals.views, stats.totals.previousViews)}
            />
            <Stat
              label="New contacts"
              value={stats.totals.contacts}
              note={changePercent(stats.totals.contacts, stats.totals.previousContacts)}
            />
            <Stat label="Unread messages" value={stats.totals.unread} note="Waiting for review" />
          </div>
          <div className={`${card} px-[26px] pt-[25px] pb-[18px]`}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className={cardTitle}>Traffic</h2>
                <p className={cardSubtitle}>Page views across the selected period.</p>
              </div>
              <span className="flex items-center gap-[7px] text-xs text-[#707789]">
                <i className="h-2 w-2 rounded-full bg-[#4169e1]" /> Views
              </span>
            </div>
            <LineChart data={stats.daily} />
          </div>
          <div className="mt-[18px] grid grid-cols-2 gap-[18px] max-[760px]:grid-cols-1">
            <Ranked title="Top pages" subtitle="Where people spend their time" data={stats.pages} />
            <Ranked
              title="Traffic sources"
              subtitle="How visitors found Harkcon"
              data={stats.sources}
            />
          </div>
        </>
      )}
    </section>
  )
}

function Stat({ label, value, note }: { label: string; value: number; note: string }) {
  return (
    <div className={`${card} min-h-[142px] p-[22px]`}>
      <span className="text-[13px] text-[#747b8b]">{label}</span>
      <strong className="mt-[13px] mb-[9px] block font-header text-[34px] font-medium tracking-[-0.04em]">
        {value.toLocaleString()}
      </strong>
      <small className="text-xs text-[#8990a0]">{note}</small>
    </div>
  )
}
function LoadingCards() {
  return (
    <div className="mb-[18px] grid grid-cols-4 gap-[15px] max-[1000px]:grid-cols-2 max-[760px]:grid-cols-1">
      {[1, 2, 3, 4].map((item) => (
        <div
          className={`${card} min-h-[142px] animate-shimmer bg-linear-to-r from-white via-[#f3f4f6] to-white bg-size-[200%_100%] p-[22px]`}
          key={item}
        />
      ))}
    </div>
  )
}
function Ranked({
  title,
  subtitle,
  data,
}: {
  title: string
  subtitle: string
  data: { label: string; value: number }[]
}) {
  const max = Math.max(1, ...data.map((item) => item.value))
  return (
    <div className={`${card} p-[25px]`}>
      <h2 className={cardTitle}>{title}</h2>
      <p className={cardSubtitle}>{subtitle}</p>
      {data.length ? (
        <div className="mt-[22px]">
          {data.map((item) => (
            <div
              className="relative mb-[18px] grid grid-cols-[1fr_auto] gap-2.5 pb-[9px] text-[13px] text-[#4f566a]"
              key={item.label}
            >
              <span>{item.label}</span>
              <b className="text-[#252e49]">{item.value}</b>
              <i
                className="absolute bottom-0 left-0 h-[3px] max-w-full rounded-[3px] bg-[#5877d4]"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          ))}
        </div>
      ) : (
        <Empty text="No data yet. Activity will appear here as people visit the site." />
      )}
    </div>
  )
}

function Modal({
  title,
  subtitle,
  children,
  onClose,
  wide = false,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  onClose: () => void
  wide?: boolean
}) {
  return (
    <div
      className="fixed inset-0 z-100 grid animate-fade-in place-items-center overflow-auto bg-[#10172cb8] p-7 backdrop-blur-[7px]"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <dialog
        open
        className={`static inset-auto m-0 max-h-[calc(100dvh-56px)] animate-modal-in overflow-auto rounded-[17px] border-0 bg-white p-[30px] text-inherit shadow-[0_30px_90px_#080d1f59] max-[760px]:p-6 ${wide ? "w-[min(840px,100%)]" : "w-[min(520px,100%)]"}`}
        aria-label={title}
      >
        <button
          className="absolute top-[17px] right-[17px] grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-[#f1f2f4] text-[#747b8b]"
          onClick={onClose}
          aria-label="Close"
        >
          <Icon name="close" />
        </button>
        <div className="mb-6 pr-10">
          <h2 className="font-header text-[25px] font-semibold tracking-[-0.035em] text-[#202942]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-[7px] text-sm leading-normal text-[#777f90]">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </dialog>
    </div>
  )
}

const tabClassName = (active: boolean) =>
  `cursor-pointer rounded-[9px] border px-[13px] py-[9px] ${active ? "border-[#263d86] bg-[#263d86] text-white" : "border-[#e1e4e9] bg-white text-[#747b8b]"}`
const rowActionClassName = `${rowButton} text-[#5c6478] disabled:cursor-default disabled:opacity-30`

function NewsEditor() {
  const content = useQuery(api.content.listAdminContent)
  const saveArticle = useMutation(api.content.saveArticle),
    removeArticle = useMutation(api.content.removeArticle),
    reorder = useMutation(api.content.reorderArticle),
    setFeatured = useMutation(api.content.setFeatured)
  const saveMention = useMutation(api.content.saveMention),
    removeMention = useMutation(api.content.removeMention),
    addTopic = useMutation(api.content.addTopic)
  const generateImageUploadUrl = useMutation(api.content.generateImageUploadUrl),
    resolveImageUpload = useMutation(api.content.resolveImageUpload)
  const [tab, setTab] = useState<"articles" | "mentions">("articles")
  const [draft, setDraft] = useState<ArticleDraft | null>(null)
  const [mention, setMention] = useState<{ id?: Id<"pressMentions">; headline: string } | null>(
    null,
  )
  const [confirm, setConfirm] = useState<{
    kind: "article" | "mention"
    id: Id<"articles"> | Id<"pressMentions">
    label: string
  } | null>(null)
  const [topicOpen, setTopicOpen] = useState(false),
    [error, setError] = useState(""),
    [uploadingImage, setUploadingImage] = useState(false)
  const uploadImage = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file such as JPG, PNG, WebP, or AVIF.")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Choose an image smaller than 10 MB.")
      return
    }
    setError("")
    setUploadingImage(true)
    try {
      const uploadUrl = await generateImageUploadUrl()
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })
      if (!response.ok) throw new Error("Upload failed")
      const { storageId } = (await response.json()) as { storageId: Id<"_storage"> }
      const image = await resolveImageUpload({ storageId })
      setDraft((current) => (current ? { ...current, image, imageStorageId: storageId } : current))
    } catch {
      setError("We couldn’t upload that image. Please try again.")
    } finally {
      setUploadingImage(false)
    }
  }
  const submitArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!draft) return
    setError("")
    if (!draft.image) {
      setError("Add an image before saving the article.")
      return
    }
    try {
      const displayDate = new Date(`${draft.date}T12:00:00`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      await saveArticle({ ...draft, displayDate, body: draft.body.filter((p) => p.trim()) })
      setDraft(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn’t save the article")
    }
  }
  const doDelete = async () => {
    if (!confirm) return
    if (confirm.kind === "article") await removeArticle({ id: confirm.id as Id<"articles"> })
    else await removeMention({ id: confirm.id as Id<"pressMentions"> })
    setConfirm(null)
  }
  return (
    <section className={viewClassName}>
      <ViewHeading
        eyebrow="Publishing"
        title="News editor"
        description="Create and organize updates without the clutter."
      >
        <button
          className={primaryButton}
          onClick={() =>
            tab === "articles"
              ? setDraft({ ...emptyArticle, body: [""] })
              : setMention({ headline: "" })
          }
        >
          <Icon name="plus" /> Add {tab === "articles" ? "article" : "mention"}
        </button>
      </ViewHeading>
      <div className="mb-4 flex gap-1.5">
        <button className={tabClassName(tab === "articles")} onClick={() => setTab("articles")}>
          Articles <span className="ml-1.5 opacity-70">{content?.articles.length ?? 0}</span>
        </button>
        <button className={tabClassName(tab === "mentions")} onClick={() => setTab("mentions")}>
          Harkcon in the News{" "}
          <span className="ml-1.5 opacity-70">{content?.mentions.length ?? 0}</span>
        </button>
      </div>
      {tab === "articles" ? (
        <div className={`${card} overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-[#eceef1] px-[18px] py-[14px]">
            <p className="text-[13px] text-[#7a8190]">
              Feature up to two articles on the home page.
            </p>
            <button className={quietButton} onClick={() => setTopicOpen(true)}>
              <Icon name="plus" /> New topic
            </button>
          </div>
          {content?.articles.length ? (
            content.articles.map((article, index) => (
              <article
                className={`grid grid-cols-[92px_minmax(0,1fr)_auto] items-center gap-[18px] px-[18px] py-[17px] max-[1000px]:grid-cols-[74px_1fr] max-[760px]:grid-cols-1 ${listRow}`}
                key={article._id}
              >
                <div className="relative h-[68px] w-[92px] overflow-hidden rounded-lg bg-[#edf0f3] max-[1000px]:w-[74px] max-[760px]:h-40 max-[760px]:w-full">
                  {article.image ? (
                    <Image src={article.image} alt="" fill unoptimized className="object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] tracking-[0.06em] text-[#7b8291] uppercase">
                    {article.category} · {article.displayDate}
                  </span>
                  <h3 className={contentHeading}>{article.title}</h3>
                </div>
                <div className="flex flex-col items-end gap-3 max-[1000px]:col-[2] max-[1000px]:items-start max-[760px]:col-auto">
                  <label className="flex cursor-pointer items-center gap-[7px] text-xs text-[#5e6679]">
                    <input
                      className="accent-[#3458c8]"
                      type="checkbox"
                      checked={article.featured}
                      onChange={async (e) => {
                        try {
                          await setFeatured({ id: article._id, featured: e.target.checked })
                        } catch (err) {
                          setError(err instanceof Error ? err.message : "Only two may be featured")
                        }
                      }}
                    />
                    <span>Featured</span>
                  </label>
                  <div className="flex gap-[5px]">
                    <button
                      className={rowActionClassName}
                      disabled={index === 0}
                      onClick={() => void reorder({ id: article._id, direction: "up" })}
                      aria-label="Move article up"
                    >
                      <ArrowUp aria-hidden="true" />
                    </button>
                    <button
                      className={rowActionClassName}
                      disabled={index === content.articles.length - 1}
                      onClick={() => void reorder({ id: article._id, direction: "down" })}
                      aria-label="Move article down"
                    >
                      <ArrowDown aria-hidden="true" />
                    </button>
                    <button
                      className={rowActionClassName}
                      onClick={() =>
                        setDraft({
                          id: article._id,
                          slug: article.slug,
                          title: article.title,
                          date: article.date,
                          displayDate: article.displayDate,
                          category: article.category,
                          image: article.image,
                          imageStorageId: article.imageStorageId,
                          imageAlt: article.imageAlt,
                          excerpt: article.excerpt,
                          body: article.body,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className={`${rowButton} text-[#b02d3a]`}
                      onClick={() =>
                        setConfirm({ kind: "article", id: article._id, label: article.title })
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <Empty text="No articles yet. Add the first one when you’re ready." />
          )}
        </div>
      ) : (
        <div className={`${card} overflow-hidden`}>
          {content?.mentions.length ? (
            content.mentions.map((item, index) => (
              <article
                className={`grid grid-cols-[42px_1fr_auto] items-center gap-3.5 px-5 py-[19px] ${listRow}`}
                key={item._id}
              >
                <span className="text-xs text-[#9aa0ac]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className={contentHeading}>{item.headline}</h3>
                <div className="flex gap-[5px]">
                  <button
                    className={`${rowButton} text-[#5c6478]`}
                    onClick={() => setMention({ id: item._id, headline: item.headline })}
                  >
                    Edit
                  </button>
                  <button
                    className={`${rowButton} text-[#b02d3a]`}
                    onClick={() =>
                      setConfirm({ kind: "mention", id: item._id, label: item.headline })
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          ) : (
            <Empty text="No press mentions yet." />
          )}
        </div>
      )}
      {error ? (
        <div
          className="fixed right-7 bottom-7 z-120 flex max-w-[420px] items-center gap-[18px] rounded-[10px] bg-[#a92e3b] px-[15px] py-[13px] text-[13px] text-white shadow-[0_12px_35px_#3410183d]"
          role="alert"
        >
          {error}
          <button className="ml-auto cursor-pointer" onClick={() => setError("")}>
            <Icon name="close" />
          </button>
        </div>
      ) : null}
      {draft ? (
        <Modal
          wide
          title={draft.id ? "Edit article" : "Create an article"}
          subtitle="Keep it clear and concise. You can come back and refine it anytime."
          onClose={() => setDraft(null)}
        >
          <form className={formClassName} onSubmit={submitArticle}>
            <div className={formGrid}>
              <Field label="Headline" className={span2}>
                <input
                  className={fieldControl}
                  value={draft.title}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      title: e.target.value,
                      slug: draft.id
                        ? draft.slug
                        : e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/(^-|-$)/g, ""),
                    })
                  }
                  required
                />
              </Field>
              <Field label="Topic">
                <select
                  className={fieldControl}
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                >
                  {content?.topics.map((topic) => (
                    <option key={topic._id}>{topic.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Publication date">
                <input
                  className={fieldControl}
                  type="date"
                  value={draft.date}
                  onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                  required
                />
              </Field>
              <Field label="URL slug" hint="Shown after /news-insights/" className={span2}>
                <input
                  className={fieldControl}
                  value={draft.slug}
                  onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                  required
                />
              </Field>
              <Field label="Short summary" className={span2}>
                <textarea
                  className={textareaControl}
                  rows={3}
                  value={draft.excerpt}
                  onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
                  required
                />
              </Field>
              <div className={`flex flex-col gap-2.5 ${span2}`}>
                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className={fieldName}>Article image</span>
                    <small className={fieldHint}>
                      Displayed at roughly 16:9. The full article uses a slightly wider crop.
                    </small>
                  </div>
                  <label className="inline-flex flex-none cursor-pointer rounded-[9px] border border-[#d9dde5] bg-white px-3 py-[9px] text-xs font-bold text-[#35405a] transition-[border-color,background-color] duration-180 hover:border-[#aab4c7] hover:bg-[#f8f9fb]">
                    <input
                      className="sr-only"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) void uploadImage(file)
                      }}
                      disabled={uploadingImage}
                    />
                    {uploadingImage ? "Uploading…" : draft.image ? "Replace image" : "Choose image"}
                  </label>
                </div>
                <div
                  className={`relative grid aspect-video w-[min(100%,520px)] place-items-center overflow-hidden rounded-xl border border-[#cfd4de] bg-[#f5f6f8] text-xs text-[#8b92a0] ${draft.image ? "border-solid" : "border-dashed"}`}
                >
                  {draft.image ? (
                    <Image
                      src={draft.image}
                      alt="Article image preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <span className="p-6 text-center">Your image preview will appear here</span>
                  )}
                  <strong className="absolute right-2.5 bottom-2.5 z-1 rounded-full bg-[#17213dcc] px-[7px] py-1 text-[10px] tracking-[0.06em] text-white">
                    16:9
                  </strong>
                </div>
              </div>
              <Field
                label="Image description"
                hint="Describe the image for visitors using a screen reader."
                className={span2}
              >
                <input
                  className={fieldControl}
                  value={draft.imageAlt}
                  onChange={(e) => setDraft({ ...draft, imageAlt: e.target.value })}
                  required
                />
              </Field>
              <Field
                label="Article body"
                hint="Leave a blank line between paragraphs."
                className={span2}
              >
                <textarea
                  className={textareaControl}
                  rows={10}
                  value={draft.body.join("\n\n")}
                  onChange={(e) => setDraft({ ...draft, body: e.target.value.split(/\n\s*\n/) })}
                  required
                />
              </Field>
            </div>
            <div className={modalActions}>
              <button type="button" className={secondaryButton} onClick={() => setDraft(null)}>
                Cancel
              </button>
              <button className={primaryButton} disabled={uploadingImage}>
                {uploadingImage ? "Uploading image…" : "Save article"}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
      {mention ? (
        <Modal
          title={mention.id ? "Edit mention" : "Add a press mention"}
          subtitle="Add the headline exactly as you want it to appear."
          onClose={() => setMention(null)}
        >
          <form
            className={formClassName}
            onSubmit={async (e) => {
              e.preventDefault()
              await saveMention(mention)
              setMention(null)
            }}
          >
            <Field label="Headline">
              <textarea
                className={textareaControl}
                rows={4}
                value={mention.headline}
                onChange={(e) => setMention({ ...mention, headline: e.target.value })}
                required
              />
            </Field>
            <div className={modalActions}>
              <button type="button" className={secondaryButton} onClick={() => setMention(null)}>
                Cancel
              </button>
              <button className={primaryButton}>Save mention</button>
            </div>
          </form>
        </Modal>
      ) : null}
      {topicOpen ? (
        <Modal
          title="Add a news topic"
          subtitle="It will appear as a filter and an option when editing articles."
          onClose={() => setTopicOpen(false)}
        >
          <form
            className={formClassName}
            onSubmit={async (e) => {
              e.preventDefault()
              const data = new FormData(e.currentTarget)
              await addTopic({ name: String(data.get("name")) })
              setTopicOpen(false)
            }}
          >
            <Field label="Topic name">
              <input name="name" required className={fieldControl} />
            </Field>
            <div className={modalActions}>
              <button type="button" className={secondaryButton} onClick={() => setTopicOpen(false)}>
                Cancel
              </button>
              <button className={primaryButton}>Add topic</button>
            </div>
          </form>
        </Modal>
      ) : null}
      {confirm ? (
        <Modal
          title="Delete this item?"
          subtitle={`“${confirm.label}” will be removed permanently.`}
          onClose={() => setConfirm(null)}
        >
          <div className={modalActions}>
            <button className={secondaryButton} onClick={() => setConfirm(null)}>
              Keep it
            </button>
            <button className={dangerButton} onClick={() => void doDelete()}>
              Delete permanently
            </button>
          </div>
        </Modal>
      ) : null}
    </section>
  )
}

function Contacts() {
  const contacts = useQuery(api.contacts.list),
    setRead = useMutation(api.contacts.setRead),
    remove = useMutation(api.contacts.remove)
  const [search, setSearch] = useState(""),
    [field, setField] = useState("all"),
    [topic, setTopic] = useState("all"),
    [date, setDate] = useState("all")
  const [open, setOpen] = useState<Doc<"contacts"> | null>(null),
    [confirm, setConfirm] = useState<Doc<"contacts"> | null>(null)
  const topics = useMemo(
    () => [...new Set((contacts ?? []).flatMap((contact) => contact.interests))].toSorted(),
    [contacts],
  )
  const [filterNow] = useState(() => Date.now())
  const filtered = useMemo(
    () =>
      (contacts ?? []).filter((contact) => {
        const q = search.toLowerCase()
        const haystack =
          field === "name"
            ? `${contact.firstName} ${contact.lastName}`
            : field === "email"
              ? contact.email
              : field === "organization"
                ? contact.organization
                : `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.organization} ${contact.message}`
        const dateOk =
          date === "all" || contact.submittedAt >= filterNow - Number(date) * 86_400_000
        return (
          haystack.toLowerCase().includes(q) &&
          (topic === "all" || contact.interests.includes(topic)) &&
          dateOk
        )
      }),
    [contacts, search, field, topic, date, filterNow],
  )
  const openContact = async (contact: Doc<"contacts">) => {
    setOpen(contact.isRead ? contact : { ...contact, isRead: true })
    if (!contact.isRead) await setRead({ id: contact._id, isRead: true })
  }
  return (
    <section className={viewClassName}>
      <ViewHeading
        eyebrow="Inbox"
        title="Contacts"
        description="Find, review, and organize website inquiries."
      />
      <div className="mb-4 flex gap-2.5 max-[760px]:flex-wrap">
        <div className="flex flex-1 items-center gap-2.5 rounded-[10px] border border-[#dfe2e8] bg-white pl-[13px] max-[760px]:basis-full">
          <Icon name="search" />
          <input
            className="min-w-20 flex-1 py-[11px] outline-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages…"
          />
          <select
            className="self-stretch border-l border-[#e5e7eb] bg-white pr-7 pl-[11px] text-[#697083]"
            value={field}
            onChange={(e) => setField(e.target.value)}
          >
            <option value="all">Everything</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="organization">Organization</option>
          </select>
        </div>
        <select className={selectControl} value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="all">All topics</option>
          {topics.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select className={selectControl} value={date} onChange={(e) => setDate(e.target.value)}>
          <option value="all">Any date</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 3 months</option>
        </select>
      </div>
      <div className={`${card} overflow-hidden`}>
        {filtered.length ? (
          filtered.map((contact) => (
            <button
              className="grid w-full cursor-pointer grid-cols-[8px_minmax(170px,0.7fr)_minmax(220px,1.4fr)_auto] items-center gap-[15px] border-b border-[#eceef1] bg-white px-5 py-[17px] text-left transition-colors duration-180 hover:bg-[#fafbfc] max-[760px]:grid-cols-[8px_1fr_auto]"
              key={contact._id}
              onClick={() => void openContact(contact)}
            >
              <i
                className={`h-[7px] w-[7px] rounded-full ${contact.isRead ? "" : "bg-[#4169e1]"}`}
              />
              <div className="min-w-0">
                <strong
                  className={`block text-sm text-[#2e374f] ${contact.isRead ? "" : "font-extrabold"}`}
                >
                  {contact.firstName} {contact.lastName}
                </strong>
                <span className="mt-[3px] block truncate text-[11px] text-[#868c99]">
                  {contact.email} · {contact.organization}
                </span>
              </div>
              <p className="truncate text-[13px] text-[#747b8a] max-[760px]:hidden">
                {contact.message}
              </p>
              <time className="text-[11px] text-[#9298a5]">
                {new Date(contact.submittedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </button>
          ))
        ) : (
          <Empty text="No messages match those filters." />
        )}
      </div>
      {open ? (
        <Modal
          wide
          title={`${open.firstName} ${open.lastName}`}
          subtitle={`Submitted ${new Date(open.submittedAt).toLocaleString()}`}
          onClose={() => setOpen(null)}
        >
          <div>
            <div className="grid grid-cols-2 gap-[18px] rounded-[11px] bg-[#f6f7f9] p-5 max-[760px]:grid-cols-1">
              <Detail label="Email" value={open.email} />
              <Detail label="Phone" value={open.phone} />
              <Detail label="Organization" value={open.organization} />
              <Detail label="Preferred contact" value={open.preferredContact} />
              <Detail label="Topics" value={open.interests.join(", ")} />
              <Detail label="How they found Harkcon" value={open.referral} />
            </div>
            <div className="mt-[21px]">
              <span className={detailLabel}>Message</span>
              <p className="mt-2 text-[15px] leading-[1.7] whitespace-pre-wrap text-[#3f485f]">
                {open.message}
              </p>
            </div>
          </div>
          <div
            className={`${modalActions} justify-between max-[760px]:flex-col max-[760px]:items-stretch`}
          >
            <button
              className={dangerLink}
              onClick={() => {
                setConfirm(open)
                setOpen(null)
              }}
            >
              Delete message
            </button>
            <div className="flex gap-[9px] max-[760px]:flex-wrap">
              <button
                className={secondaryButton}
                onClick={() => {
                  const isRead = !open.isRead
                  setOpen({ ...open, isRead })
                  void setRead({ id: open._id, isRead })
                }}
              >
                {open.isRead ? "Mark unread" : "Mark read"}
              </button>
              <a className={primaryButton} href={`mailto:${open.email}`}>
                Reply by email
              </a>
            </div>
          </div>
        </Modal>
      ) : null}
      {confirm ? (
        <Modal
          title="Delete this message?"
          subtitle="This can’t be undone."
          onClose={() => setConfirm(null)}
        >
          <div className={modalActions}>
            <button className={secondaryButton} onClick={() => setConfirm(null)}>
              Cancel
            </button>
            <button
              className={dangerButton}
              onClick={async () => {
                await remove({ id: confirm._id })
                setConfirm(null)
              }}
            >
              Delete message
            </button>
          </div>
        </Modal>
      ) : null}
    </section>
  )
}
const detailLabel = "text-[10px] font-extrabold tracking-[0.09em] text-[#858c9b] uppercase"

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className={detailLabel}>{label}</span>
      <p className="mt-[5px] text-sm text-[#343d55]">{value}</p>
    </div>
  )
}
function Empty({ text }: { text: string }) {
  return (
    <div className="flex min-h-[190px] flex-col items-center justify-center gap-[9px] p-[30px] text-center text-[#8b92a0]">
      <Circle aria-hidden="true" className="h-[34px] w-[34px]" />
      <p className="max-w-[330px] text-[13px] leading-normal">{text}</p>
    </div>
  )
}

function PagePlaceholder({ view }: { view: View }) {
  const pages = useQuery(api.solutions.list),
    add = useMutation(api.solutions.add),
    remove = useMutation(api.solutions.remove)
  const [adding, setAdding] = useState(false),
    [confirm, setConfirm] = useState<Doc<"solutionPages"> | null>(null)
  if (view !== "solutions")
    return (
      <section className={viewClassName}>
        <ViewHeading
          eyebrow="Page editor"
          title={pageLabels[view]}
          description="This page is ready for the future visual editor."
        />
        <div
          className={`${card} flex min-h-[360px] flex-col items-center justify-center p-10 text-center`}
        >
          <span className="rounded-full bg-[#eef2ff] px-2.5 py-1.5 text-[11px] font-extrabold text-[#526bbb] uppercase">
            Editor placeholder
          </span>
          <h2 className="mt-[18px] mb-2 font-header text-[25px] font-semibold tracking-[-0.02em]">
            Nothing to manage here yet.
          </h2>
          <p className="max-w-[480px] leading-[1.6] text-[#7b8291]">
            The page is linked in the admin navigation, but its editor has intentionally not been
            built.
          </p>
        </div>
      </section>
    )
  return (
    <section className={viewClassName}>
      <ViewHeading
        eyebrow="Page editor"
        title="Solution pages"
        description="Add or remove solution pages. Their full editors will come later."
      >
        <button className={primaryButton} onClick={() => setAdding(true)}>
          <Icon name="plus" /> Add solution
        </button>
      </ViewHeading>
      <div className={`${card} overflow-hidden`}>
        {pages?.map((page) => (
          <div
            key={page._id}
            className="flex items-center justify-between gap-5 border-b border-[#eceef1] px-[21px] py-[19px]"
          >
            <div>
              <strong className="block text-sm text-[#303950]">{page.title}</strong>
              <span className="mt-1 block text-xs text-[#9298a5]">/solutions/{page.slug}</span>
            </div>
            <button className={dangerLink} onClick={() => setConfirm(page)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      {adding ? (
        <Modal
          title="Add a solution page"
          subtitle="Create its name and URL now. Content editing will be added later."
          onClose={() => setAdding(false)}
        >
          <form
            className={formClassName}
            onSubmit={async (e) => {
              e.preventDefault()
              const data = new FormData(e.currentTarget)
              await add({ title: String(data.get("title")), slug: String(data.get("slug")) })
              setAdding(false)
            }}
          >
            <Field label="Page name">
              <input name="title" required className={fieldControl} />
            </Field>
            <Field label="URL slug">
              <input name="slug" placeholder="example-solution" required className={fieldControl} />
            </Field>
            <div className={modalActions}>
              <button type="button" className={secondaryButton} onClick={() => setAdding(false)}>
                Cancel
              </button>
              <button className={primaryButton}>Add page</button>
            </div>
          </form>
        </Modal>
      ) : null}
      {confirm ? (
        <Modal
          title="Delete this solution page?"
          subtitle={`${confirm.title} will be removed from the admin list.`}
          onClose={() => setConfirm(null)}
        >
          <div className={modalActions}>
            <button className={secondaryButton} onClick={() => setConfirm(null)}>
              Keep it
            </button>
            <button
              className={dangerButton}
              onClick={async () => {
                await remove({ id: confirm._id })
                setConfirm(null)
              }}
            >
              Delete page
            </button>
          </div>
        </Modal>
      ) : null}
    </section>
  )
}

function Workspace() {
  const params = useSearchParams(),
    router = useRouter()
  const raw = params.get("view") as View | null
  const view: View = raw && raw in pageLabels ? raw : "dashboard"
  const select = (next: View) =>
    router.push(next === "dashboard" ? "/admin" : `/admin?view=${next}`)
  return (
    <div className="admin-root min-h-dvh bg-[#f5f6f8] font-body text-[#17203b]">
      <Sidebar view={view} onSelect={select} />
      <main className="ml-64 min-h-dvh max-[760px]:ml-0">
        <header className="hidden items-center justify-between border-b border-[#e5e7eb] bg-white px-[18px] py-3.5 max-[760px]:sticky max-[760px]:top-0 max-[760px]:z-25 max-[760px]:flex">
          <Image src="/images/harkcon-logo-black.avif" alt="Harkcon" width={126} height={33} />
          <select
            className="max-w-[190px] rounded-lg border border-[#dfe2e8] p-2"
            value={view}
            onChange={(e) => select(e.target.value as View)}
          >
            {Object.entries(pageLabels).map(([key, label]) => (
              <option value={key} key={key}>
                {label}
              </option>
            ))}
          </select>
        </header>
        {view === "dashboard" ? (
          <Dashboard />
        ) : view === "news" ? (
          <NewsEditor />
        ) : view === "contacts" ? (
          <Contacts />
        ) : (
          <PagePlaceholder view={view} />
        )}
      </main>
    </div>
  )
}

export function AdminBoot() {
  return (
    <div className="grid min-h-dvh place-items-center bg-[#f5f6f8] text-sm text-[#737b8b]">
      Opening your workspace…
    </div>
  )
}

function WorkspaceGate() {
  const admin = useQuery(api.auth.currentAdmin)
  if (admin === undefined) return <AdminBoot />
  if (admin === null) {
    return (
      <main className={loginClassName}>
        <section className={loginCardClassName}>
          <Image
            src="/images/harkcon-logo-black.avif"
            alt="Harkcon"
            width={210}
            height={54}
            className={loginLogoClassName}
          />
          <div>
            <p className={kicker}>Access unavailable</p>
            <h1 className={`mt-1 ${pageTitle}`}>This account isn’t approved.</h1>
            <p className={loginBodyClassName}>
              Ask a Convex administrator to add this email to the admin allowlist.
            </p>
          </div>
          <button className={primaryButton} onClick={() => void authClient.signOut()}>
            Return to sign in
          </button>
        </section>
        <LoginAside />
      </main>
    )
  }
  return <Workspace />
}

export default function AdminApp() {
  return (
    <>
      <AuthLoading>
        <AdminBoot />
      </AuthLoading>
      <Unauthenticated>
        <Login />
      </Unauthenticated>
      <Authenticated>
        <WorkspaceGate />
      </Authenticated>
    </>
  )
}
