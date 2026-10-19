import { fetchCareerOpenings } from "~/lib/careers-source"

export const dynamic = "force-dynamic"
const headers = { "Cache-Control": "no-store, max-age=0" }

export async function GET() {
  try {
    return Response.json({ openings: await fetchCareerOpenings() }, { headers })
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
