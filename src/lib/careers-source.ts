import type { CareerOpening } from "./careers"
import { careersPortalUrl } from "./careers"

type RecordValue = Record<string, unknown>
function record(value: unknown): RecordValue {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Invalid ADP data")
  return value as RecordValue
}
function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

export function parseOpeningsPage(payload: unknown): { openings: CareerOpening[]; total: number } {
  const data = record(payload)
  if (!Array.isArray(data.jobRequisitions)) throw new Error("Missing ADP openings")
  const total = record(data.meta).totalNumber
  if (typeof total !== "number" || !Number.isInteger(total) || total < 0)
    throw new Error("Invalid ADP count")
  const openings = data.jobRequisitions.map((value): CareerOpening => {
    const job = record(value)
    const id = text(job.itemID)
    const title = text(job.requisitionTitle)
    const fields = record(job.customFieldGroup).stringFields
    if (!Array.isArray(fields)) throw new Error("Missing ADP job identifiers")
    const external = fields
      .map(record)
      .find((field) => record(field.nameCode).codeValue === "ExternalJobID")
    const externalId = external && text(external.stringValue)
    if (!id || !title || !externalId || !/^\d+$/.test(externalId))
      throw new Error("Invalid ADP opening")
    const location = Array.isArray(job.requisitionLocations)
      ? job.requisitionLocations
          .map((entry) => text(record(record(entry).nameCode).shortName))
          .filter(Boolean)
          .join(" · ")
      : ""
    const employmentType = job.workLevelCode ? text(record(job.workLevelCode).shortName) : ""
    const url = new URL(careersPortalUrl)
    url.searchParams.set("jobId", externalId)
    return { id, title, location, employmentType, applyUrl: url.toString() }
  })
  return { openings, total }
}

export async function fetchCareerOpenings(): Promise<CareerOpening[]> {
  const openings: CareerOpening[] = []
  const ids = new Set<string>()
  const signal = AbortSignal.timeout(15000)
  for (let page = 0; page < 50; page++) {
    const url = new URL(
      "https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions",
    )
    url.search = new URLSearchParams({
      cid: "15aa7385-7aee-410b-90e3-5972b600f083",
      ccId: "19000101_000001",
      lang: "en_US",
      locale: "en_US",
      $top: "20",
      $skip: String(openings.length),
      timeStamp: String(Date.now()),
    }).toString()
    // Pages depend on the preceding response's count and must be fetched sequentially.
    // oxlint-disable-next-line no-await-in-loop
    const response = await fetch(url, {
      cache: "no-store",
      signal,
      headers: { Accept: "application/json" },
    })
    if (!response.ok) throw new Error(`ADP returned ${response.status}`)
    // oxlint-disable-next-line no-await-in-loop
    const result = parseOpeningsPage(await response.json())
    for (const opening of result.openings) {
      if (ids.has(opening.id)) throw new Error("ADP returned overlapping pages")
      ids.add(opening.id)
      openings.push(opening)
    }
    if (openings.length === result.total) return openings
    if (!result.openings.length || openings.length > result.total)
      throw new Error("Incomplete ADP response")
  }
  throw new Error("ADP pagination limit exceeded")
}
