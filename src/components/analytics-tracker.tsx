"use client"

import { useMutation } from "convex/react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { api } from "../../convex/_generated/api"

function getStoredId(key: string) {
  const existing = window.localStorage.getItem(key)
  if (existing) return existing
  const value = crypto.randomUUID()
  window.localStorage.setItem(key, value)
  return value
}

function sourceFrom(referrer: string, campaign: string | null) {
  if (campaign) return campaign
  if (!referrer) return "Direct"
  try {
    const host = new URL(referrer).hostname.toLowerCase()
    if (host.includes("google") || host.includes("bing") || host.includes("duckduckgo"))
      return "Search"
    if (
      host.includes("linkedin") ||
      host.includes("facebook") ||
      host.includes("x.com") ||
      host.includes("twitter")
    )
      return "Social"
    if (host === window.location.hostname) return "Internal"
    return host.replace(/^www\./, "")
  } catch {
    return "Referral"
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const track = useMutation(api.analytics.trackPageView)

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return
    const lastView = window.sessionStorage.getItem("harkcon_last_view")
    if (lastView) {
      const [lastPath, lastTime] = lastView.split("|")
      if (lastPath === pathname && Date.now() - Number(lastTime) < 1_500) return
    }
    window.sessionStorage.setItem("harkcon_last_view", `${pathname}|${Date.now()}`)
    const visitorId = getStoredId("harkcon_visitor")
    const sessionKey = "harkcon_session"
    let session = window.sessionStorage.getItem(sessionKey)
    if (!session) {
      session = crypto.randomUUID()
      window.sessionStorage.setItem(sessionKey, session)
    }
    const referrer = document.referrer
    void track({
      path: pathname,
      visitorId,
      sessionId: session,
      source: sourceFrom(referrer, new URLSearchParams(window.location.search).get("utm_source")),
      referrer,
    })
  }, [pathname, track])

  return null
}
