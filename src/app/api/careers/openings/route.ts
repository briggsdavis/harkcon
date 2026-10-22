import { fetchQuery } from "convex/nextjs"
import { api } from "../../../../../convex/_generated/api"

export const dynamic = "force-dynamic"
const headers = { "Cache-Control": "no-store, max-age=0" }

export async function GET() {
  try {
    const snapshot = await fetchQuery(
      api.careers.getOpenings,
      {},
      {
        url: process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://neat-eel-640.convex.cloud",
      },
    )
    if (!snapshot) throw new Error("Career openings have not been refreshed yet")
    return Response.json(snapshot, { headers })
  } catch {
    return Response.json(
      {
        error:
          "Current openings could not be loaded. Please try again or visit our careers portal.",
      },
      { status: 502, headers },
    )
  }
}
