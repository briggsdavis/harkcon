import {
  contractGroups,
  contractImages,
  contractRecords,
  naicsCodes,
  type ContractRecord,
} from "./contract-content"

export const detailLabels = {
  vehicle: "Vehicle",
  prime: "Prime contractor",
  contract: "Contract number",
  period: "Period of performance",
  uei: "UEI",
} as const
export type DetailKey = keyof typeof detailLabels
export type ContractProject = {
  id: string
  title: string
  description: string
  photo: { src: string; alt: string }
  details: { key: DetailKey; value: string }[]
  list:
    | { kind: "services"; items: string[] }
    | { kind: "naics"; items: { code: string; title: string }[] }
}
export type ContractSection = {
  id: string
  title: string
  eyebrow: string
  description: string
  projects: ContractProject[]
}
export type ContractPageKey = "contracts" | "oasis"
function project(record: ContractRecord): ContractProject {
  return {
    id: record.id,
    title: record.title,
    description: record.description,
    photo: { ...record.photo },
    details: [
      { key: "vehicle", value: record.eyebrow },
      { key: "prime", value: record.prime },
      { key: "contract", value: record.contract },
      { key: "period", value: record.period },
      ...(record.uei ? [{ key: "uei" as const, value: record.uei }] : []),
    ],
    list: {
      kind: "services",
      items: record.capabilities.map((item) =>
        [item.label, item.title, item.detail].filter(Boolean).join(" — "),
      ),
    },
  }
}
export function defaultContractSections(page: ContractPageKey): ContractSection[] {
  const groups =
    page === "contracts"
      ? [contractGroups.gsa, contractGroups.idiq]
      : [contractGroups.oasis, contractGroups.legacy]
  const sections: ContractSection[] = groups.map((group, index) => ({
    id: group.id,
    title: group.title,
    eyebrow: `${String(index + 1).padStart(2, "0")} / Contract vehicles`,
    description: group.description,
    projects: group.recordIds.map((id) => project(contractRecords[id])),
  }))
  if (page === "contracts")
    sections.push({
      id: "contracts-naics",
      title: "Designation & NAICS Codes",
      eyebrow: "03 / Company credentials",
      description: "North American Industry Classification System (NAICS)",
      projects: [
        {
          id: "contracts-designation",
          title: "Service-Disabled Veteran-Owned Small Business",
          description:
            "Harkcon is a VA-certified Service-Disabled Veteran-Owned Small Business. Our professional, technical, administrative, and training classifications help federal customers identify the services that fit their acquisition requirements.",
          photo: { ...contractImages["contracts-naics"] },
          details: [{ key: "uei", value: "T3GVAM6E2XD9" }],
          list: { kind: "naics", items: naicsCodes.map(([code, title]) => ({ code, title })) },
        },
      ],
    })
  return sections
}
export function moveItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const result = [...items],
    target = index + direction
  if (index < 0 || target < 0 || index >= items.length || target >= items.length) return result
  ;[result[index], result[target]] = [result[target], result[index]]
  return result
}
export function validateContractSections(sections: ContractSection[]): string | null {
  const ids = new Set<string>()
  for (const section of sections) {
    if (!section.title.trim() || !section.eyebrow.trim() || !section.description.trim())
      return "Each section needs a title, eyebrow, and one-line description."
    for (const item of [section, ...section.projects]) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) || ids.has(item.id))
        return "Sections and projects need unique page identifiers."
      ids.add(item.id)
    }
    for (const project of section.projects) {
      if (
        !project.title.trim() ||
        !project.description.trim() ||
        !/^(\/(?!\/)|https?:\/\/)/i.test(project.photo.src)
      )
        return "Each project needs a title, description, and image."
      if (
        project.details.length > 5 ||
        new Set(project.details.map((item) => item.key)).size !== project.details.length ||
        project.details.some((item) => !(item.key in detailLabels) || !item.value.trim())
      )
        return "Fill each selected key detail and use each detail only once."
      if (
        project.list.kind === "services"
          ? project.list.items.some((item) => !item.trim())
          : project.list.items.some((item) => !/^\d{6}$/.test(item.code) || !item.title.trim())
      )
        return "Fill each service, or add a six-digit NAICS code and title."
    }
  }
  return null
}
