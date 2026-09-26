"use client"

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
  "slug" | "title" | "date" | "displayDate" | "category" | "image" | "imageAlt" | "excerpt" | "body"
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

function Icon({
  name,
}: {
  name: "grid" | "news" | "mail" | "page" | "chevron" | "plus" | "search" | "close" | "logout"
}) {
  const paths: Record<typeof name, ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </>
    ),
    news: (
      <>
        <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    page: (
      <>
        <path d="M6 2h9l4 4v16H6z" />
        <path d="M14 2v5h5M9 12h6M9 16h6" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3" />
        <path d="M14 3h6a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-6" />
      </>
    ),
  }
  return (
    <svg
      className="admin-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

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
      const result =
        mode === "signin"
          ? await authClient.signIn.email({ email, password })
          : await authClient.signUp.email({ email, password, name })
      if (result.error) setError(result.error.message ?? "We couldn’t complete that request.")
      setBusy(false)
    },
    [mode],
  )

  return (
    <main className="admin-login">
      <section className="admin-login-card">
        <Image
          src="/images/fullharckonlogoblack.avif"
          alt="Harkcon"
          width={210}
          height={54}
          priority
        />
        <div className="admin-login-copy">
          <p className="admin-kicker">Content workspace</p>
          <h1>{mode === "signin" ? "Welcome back." : "Create your password."}</h1>
          <p>
            {mode === "signin"
              ? "Sign in to manage the website, news, and incoming contacts."
              : "Access is limited to email addresses approved by Harkcon."}
          </p>
        </div>
        <div className="admin-segmented" role="tablist" aria-label="Choose login mode">
          <button
            className={mode === "signin" ? "is-active" : ""}
            onClick={() => setMode("signin")}
            type="button"
          >
            Sign in
          </button>
          <button
            className={mode === "create" ? "is-active" : ""}
            onClick={() => setMode("create")}
            type="button"
          >
            Create password
          </button>
        </div>
        <form onSubmit={submit} className="admin-form">
          {mode === "create" ? (
            <label>
              <span>Your name</span>
              <input name="name" autoComplete="name" required />
            </label>
          ) : null}
          <label>
            <span>Email address</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>Password</span>
            <input
              name="password"
              type="password"
              minLength={10}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
            />
            <small>{mode === "create" ? "Use at least 10 characters." : ""}</small>
          </label>
          {error ? (
            <p className="admin-error" role="alert">
              {error}
            </p>
          ) : null}
          <button className="admin-primary full" disabled={busy}>
            {busy ? "One moment…" : mode === "signin" ? "Sign in" : "Create access"}
          </button>
        </form>
        <Link href="/" className="admin-back-link">
          ← Back to harkcon.com
        </Link>
      </section>
      <aside className="admin-login-aside">
        <span>People.</span>
        <span>Performance.</span>
        <span>Technology.</span>
      </aside>
    </main>
  )
}

function Sidebar({ view, onSelect }: { view: View; onSelect: (view: View) => void }) {
  const [pagesOpen, setPagesOpen] = useState(
    view !== "dashboard" && view !== "news" && view !== "contacts",
  )
  const [solutionsOpen, setSolutionsOpen] = useState(view === "solutions")
  const item = (target: View, icon: "grid" | "news" | "mail" | "page") => (
    <button className={view === target ? "is-active" : ""} onClick={() => onSelect(target)}>
      <Icon name={icon} />
      <span>{pageLabels[target]}</span>
    </button>
  )
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <Image src="/images/fullharckonlogowhite.avif" alt="Harkcon" width={160} height={41} />
        <span>Admin</span>
      </div>
      <nav aria-label="Admin navigation">
        {item("dashboard", "grid")}
        {item("news", "news")}
        {item("contacts", "mail")}
        <button
          className={`admin-nav-parent ${pagesOpen ? "is-open" : ""}`}
          onClick={() => setPagesOpen((open) => !open)}
        >
          <Icon name="page" />
          <span>Page editor</span>
          <Icon name="chevron" />
        </button>
        {pagesOpen ? (
          <div className="admin-nav-children">
            {(["home", "about", "careers", "contracts"] as View[]).map((target) => (
              <button
                key={target}
                className={view === target ? "is-active" : ""}
                onClick={() => onSelect(target)}
              >
                {pageLabels[target].replace(" page", "")}
              </button>
            ))}
            <button
              className={`admin-nav-parent nested ${solutionsOpen ? "is-open" : ""}`}
              onClick={() => setSolutionsOpen((open) => !open)}
            >
              Solutions <Icon name="chevron" />
            </button>
            {solutionsOpen ? (
              <button
                className={view === "solutions" ? "is-active nested-link" : "nested-link"}
                onClick={() => onSelect("solutions")}
              >
                Manage solution pages
              </button>
            ) : null}
            <button
              className={view === "global" ? "is-active" : ""}
              onClick={() => onSelect("global")}
            >
              Global details / contact
            </button>
          </div>
        ) : null}
      </nav>
      <button className="admin-signout" onClick={() => void authClient.signOut()}>
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
    <div className="admin-line-chart">
      <svg
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
      <div className="admin-chart-labels">
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
    <section className="admin-view admin-dashboard">
      <div className="admin-view-heading">
        <div>
          <p className="admin-kicker">Overview</p>
          <h1>Good to see you.</h1>
          <p>Here’s how the website is performing.</p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value) as 30 | 90 | 180)}
          aria-label="Analytics date range"
        >
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 3 months</option>
          <option value={180}>Last 6 months</option>
        </select>
      </div>
      {!stats ? (
        <LoadingCards />
      ) : (
        <>
          <div className="admin-stat-grid">
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
          <div className="admin-card admin-traffic-card">
            <div className="admin-card-heading">
              <div>
                <h2>Traffic</h2>
                <p>Page views across the selected period.</p>
              </div>
              <span className="admin-legend">
                <i /> Views
              </span>
            </div>
            <LineChart data={stats.daily} />
          </div>
          <div className="admin-dashboard-split">
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
    <div className="admin-stat">
      <span>{label}</span>
      <strong>{value.toLocaleString()}</strong>
      <small>{note}</small>
    </div>
  )
}
function LoadingCards() {
  return (
    <div className="admin-stat-grid">
      {[1, 2, 3, 4].map((item) => (
        <div className="admin-stat skeleton" key={item} />
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
    <div className="admin-card admin-ranked">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {data.length ? (
        <div>
          {data.map((item) => (
            <div className="admin-rank" key={item.label}>
              <span>{item.label}</span>
              <b>{item.value}</b>
              <i style={{ width: `${(item.value / max) * 100}%` }} />
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
      className="admin-modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <dialog open className={`admin-modal ${wide ? "wide" : ""}`} aria-label={title}>
        <button className="admin-modal-close" onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>
        <div className="admin-modal-heading">
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {children}
      </dialog>
    </div>
  )
}

function NewsEditor() {
  const content = useQuery(api.content.listAdminContent)
  const saveArticle = useMutation(api.content.saveArticle),
    removeArticle = useMutation(api.content.removeArticle),
    reorder = useMutation(api.content.reorderArticle),
    setFeatured = useMutation(api.content.setFeatured)
  const saveMention = useMutation(api.content.saveMention),
    removeMention = useMutation(api.content.removeMention),
    addTopic = useMutation(api.content.addTopic)
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
    [error, setError] = useState("")
  const submitArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!draft) return
    setError("")
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
    <section className="admin-view">
      <div className="admin-view-heading">
        <div>
          <p className="admin-kicker">Publishing</p>
          <h1>News editor</h1>
          <p>Create and organize updates without the clutter.</p>
        </div>
        <button
          className="admin-primary"
          onClick={() =>
            tab === "articles"
              ? setDraft({ ...emptyArticle, body: [""] })
              : setMention({ headline: "" })
          }
        >
          <Icon name="plus" /> Add {tab === "articles" ? "article" : "mention"}
        </button>
      </div>
      <div className="admin-tabs">
        <button
          className={tab === "articles" ? "is-active" : ""}
          onClick={() => setTab("articles")}
        >
          Articles <span>{content?.articles.length ?? 0}</span>
        </button>
        <button
          className={tab === "mentions" ? "is-active" : ""}
          onClick={() => setTab("mentions")}
        >
          Harkcon in the News <span>{content?.mentions.length ?? 0}</span>
        </button>
      </div>
      {tab === "articles" ? (
        <div className="admin-card admin-list-card">
          <div className="admin-list-toolbar">
            <p>Feature up to two articles on the home page.</p>
            <button className="admin-quiet-button" onClick={() => setTopicOpen(true)}>
              <Icon name="plus" /> New topic
            </button>
          </div>
          {content?.articles.length ? (
            content.articles.map((article, index) => (
              <article className="admin-news-row" key={article._id}>
                <div className="admin-news-thumb">
                  {article.image ? <Image src={article.image} alt="" fill unoptimized /> : null}
                </div>
                <div className="admin-news-copy">
                  <span>
                    {article.category} · {article.displayDate}
                  </span>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                </div>
                <div className="admin-row-actions">
                  <label className="admin-feature">
                    <input
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
                  <div>
                    <button
                      disabled={index === 0}
                      onClick={() => void reorder({ id: article._id, direction: "up" })}
                      aria-label="Move article up"
                    >
                      ↑
                    </button>
                    <button
                      disabled={index === content.articles.length - 1}
                      onClick={() => void reorder({ id: article._id, direction: "down" })}
                      aria-label="Move article down"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() =>
                        setDraft({
                          id: article._id,
                          slug: article.slug,
                          title: article.title,
                          date: article.date,
                          displayDate: article.displayDate,
                          category: article.category,
                          image: article.image,
                          imageAlt: article.imageAlt,
                          excerpt: article.excerpt,
                          body: article.body,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="danger"
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
        <div className="admin-card admin-list-card">
          {content?.mentions.length ? (
            content.mentions.map((item, index) => (
              <article className="admin-mention-row" key={item._id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.headline}</h3>
                <div>
                  <button onClick={() => setMention({ id: item._id, headline: item.headline })}>
                    Edit
                  </button>
                  <button
                    className="danger"
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
        <div className="admin-toast" role="alert">
          {error}
          <button onClick={() => setError("")}>
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
          <form className="admin-form admin-article-form" onSubmit={submitArticle}>
            <div className="admin-form-grid">
              <label className="span-2">
                <span>Headline</span>
                <input
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
              </label>
              <label>
                <span>Topic</span>
                <select
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                >
                  {content?.topics.map((topic) => (
                    <option key={topic._id}>{topic.name}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Publication date</span>
                <input
                  type="date"
                  value={draft.date}
                  onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                  required
                />
              </label>
              <label className="span-2">
                <span>URL slug</span>
                <input
                  value={draft.slug}
                  onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                  required
                />
                <small>Shown after /news-insights/</small>
              </label>
              <label className="span-2">
                <span>Short summary</span>
                <textarea
                  rows={3}
                  value={draft.excerpt}
                  onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
                  required
                />
              </label>
              <label className="span-2">
                <span>Image URL</span>
                <input
                  type="url"
                  value={draft.image}
                  onChange={(e) => setDraft({ ...draft, image: e.target.value })}
                  required
                />
              </label>
              <label className="span-2">
                <span>Image description</span>
                <input
                  value={draft.imageAlt}
                  onChange={(e) => setDraft({ ...draft, imageAlt: e.target.value })}
                  required
                />
                <small>Describe the image for visitors using a screen reader.</small>
              </label>
              <label className="span-2">
                <span>Article body</span>
                <textarea
                  rows={10}
                  value={draft.body.join("\n\n")}
                  onChange={(e) => setDraft({ ...draft, body: e.target.value.split(/\n\s*\n/) })}
                  required
                />
                <small>Leave a blank line between paragraphs.</small>
              </label>
            </div>
            <div className="admin-modal-actions">
              <button type="button" className="admin-secondary" onClick={() => setDraft(null)}>
                Cancel
              </button>
              <button className="admin-primary">Save article</button>
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
            className="admin-form"
            onSubmit={async (e) => {
              e.preventDefault()
              await saveMention(mention)
              setMention(null)
            }}
          >
            <label>
              <span>Headline</span>
              <textarea
                rows={4}
                value={mention.headline}
                onChange={(e) => setMention({ ...mention, headline: e.target.value })}
                required
              />
            </label>
            <div className="admin-modal-actions">
              <button type="button" className="admin-secondary" onClick={() => setMention(null)}>
                Cancel
              </button>
              <button className="admin-primary">Save mention</button>
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
            className="admin-form"
            onSubmit={async (e) => {
              e.preventDefault()
              const data = new FormData(e.currentTarget)
              await addTopic({ name: String(data.get("name")) })
              setTopicOpen(false)
            }}
          >
            <label>
              <span>Topic name</span>
              <input name="name" required />
            </label>
            <div className="admin-modal-actions">
              <button type="button" className="admin-secondary" onClick={() => setTopicOpen(false)}>
                Cancel
              </button>
              <button className="admin-primary">Add topic</button>
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
          <div className="admin-modal-actions">
            <button className="admin-secondary" onClick={() => setConfirm(null)}>
              Keep it
            </button>
            <button className="admin-danger-button" onClick={() => void doDelete()}>
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
    <section className="admin-view">
      <div className="admin-view-heading">
        <div>
          <p className="admin-kicker">Inbox</p>
          <h1>Contacts</h1>
          <p>Find, review, and organize website inquiries.</p>
        </div>
      </div>
      <div className="admin-contact-filters">
        <div className="admin-search">
          <Icon name="search" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages…"
          />
          <select value={field} onChange={(e) => setField(e.target.value)}>
            <option value="all">Everything</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="organization">Organization</option>
          </select>
        </div>
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="all">All topics</option>
          {topics.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select value={date} onChange={(e) => setDate(e.target.value)}>
          <option value="all">Any date</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 3 months</option>
        </select>
      </div>
      <div className="admin-card admin-contact-list">
        {filtered.length ? (
          filtered.map((contact) => (
            <button
              className={`admin-contact-row ${contact.isRead ? "" : "is-unread"}`}
              key={contact._id}
              onClick={() => void openContact(contact)}
            >
              <i />
              <div>
                <strong>
                  {contact.firstName} {contact.lastName}
                </strong>
                <span>
                  {contact.email} · {contact.organization}
                </span>
              </div>
              <p>{contact.message}</p>
              <time>
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
          <div className="admin-contact-detail">
            <div className="admin-detail-grid">
              <Detail label="Email" value={open.email} />
              <Detail label="Phone" value={open.phone} />
              <Detail label="Organization" value={open.organization} />
              <Detail label="Preferred contact" value={open.preferredContact} />
              <Detail label="Topics" value={open.interests.join(", ")} />
              <Detail label="How they found Harkcon" value={open.referral} />
            </div>
            <div className="admin-message">
              <span>Message</span>
              <p>{open.message}</p>
            </div>
          </div>
          <div className="admin-modal-actions split">
            <button
              className="admin-danger-link"
              onClick={() => {
                setConfirm(open)
                setOpen(null)
              }}
            >
              Delete message
            </button>
            <div>
              <button
                className="admin-secondary"
                onClick={() => {
                  const isRead = !open.isRead
                  setOpen({ ...open, isRead })
                  void setRead({ id: open._id, isRead })
                }}
              >
                {open.isRead ? "Mark unread" : "Mark read"}
              </button>
              <a className="admin-primary" href={`mailto:${open.email}`}>
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
          <div className="admin-modal-actions">
            <button className="admin-secondary" onClick={() => setConfirm(null)}>
              Cancel
            </button>
            <button
              className="admin-danger-button"
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
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <p>{value}</p>
    </div>
  )
}
function Empty({ text }: { text: string }) {
  return (
    <div className="admin-empty">
      <span>○</span>
      <p>{text}</p>
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
      <section className="admin-view">
        <div className="admin-view-heading">
          <div>
            <p className="admin-kicker">Page editor</p>
            <h1>{pageLabels[view]}</h1>
            <p>This page is ready for the future visual editor.</p>
          </div>
        </div>
        <div className="admin-card admin-coming-soon">
          <span>Editor placeholder</span>
          <h2>Nothing to manage here yet.</h2>
          <p>
            The page is linked in the admin navigation, but its editor has intentionally not been
            built.
          </p>
        </div>
      </section>
    )
  return (
    <section className="admin-view">
      <div className="admin-view-heading">
        <div>
          <p className="admin-kicker">Page editor</p>
          <h1>Solution pages</h1>
          <p>Add or remove solution pages. Their full editors will come later.</p>
        </div>
        <button className="admin-primary" onClick={() => setAdding(true)}>
          <Icon name="plus" /> Add solution
        </button>
      </div>
      <div className="admin-card admin-solution-list">
        {pages?.map((page) => (
          <div key={page._id}>
            <div>
              <strong>{page.title}</strong>
              <span>/solutions/{page.slug}</span>
            </div>
            <button className="admin-danger-link" onClick={() => setConfirm(page)}>
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
            className="admin-form"
            onSubmit={async (e) => {
              e.preventDefault()
              const data = new FormData(e.currentTarget)
              await add({ title: String(data.get("title")), slug: String(data.get("slug")) })
              setAdding(false)
            }}
          >
            <label>
              <span>Page name</span>
              <input name="title" required />
            </label>
            <label>
              <span>URL slug</span>
              <input name="slug" placeholder="example-solution" required />
            </label>
            <div className="admin-modal-actions">
              <button type="button" className="admin-secondary" onClick={() => setAdding(false)}>
                Cancel
              </button>
              <button className="admin-primary">Add page</button>
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
          <div className="admin-modal-actions">
            <button className="admin-secondary" onClick={() => setConfirm(null)}>
              Keep it
            </button>
            <button
              className="admin-danger-button"
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
    <div className="admin-root">
      <Sidebar view={view} onSelect={select} />
      <main className="admin-main">
        <header className="admin-mobile-header">
          <Image src="/images/fullharckonlogoblack.avif" alt="Harkcon" width={126} height={33} />
          <select value={view} onChange={(e) => select(e.target.value as View)}>
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

function WorkspaceGate() {
  const admin = useQuery(api.auth.currentAdmin)
  if (admin === undefined) return <div className="admin-boot">Opening your workspace…</div>
  if (admin === null) {
    return (
      <main className="admin-login">
        <section className="admin-login-card">
          <Image src="/images/fullharckonlogoblack.avif" alt="Harkcon" width={210} height={54} />
          <div className="admin-login-copy">
            <p className="admin-kicker">Access unavailable</p>
            <h1>This account isn’t approved.</h1>
            <p>Ask a Convex administrator to add this email to the admin allowlist.</p>
          </div>
          <button className="admin-primary" onClick={() => void authClient.signOut()}>
            Return to sign in
          </button>
        </section>
        <aside className="admin-login-aside">
          <span>People.</span>
          <span>Performance.</span>
          <span>Technology.</span>
        </aside>
      </main>
    )
  }
  return <Workspace />
}

export default function AdminApp() {
  return (
    <>
      <AuthLoading>
        <div className="admin-boot">Opening your workspace…</div>
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
