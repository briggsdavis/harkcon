import type { PersonEntry } from "./page-content"
export type Person = {
  name: string
  role: string
  portrait: string
  biography?: string
  linkedin?: string
}

export const executives: Person[] = [
  {
    name: "Kevin Harkins, Ph.D.",
    role: "Chief Executive Officer",
    linkedin: "https://www.linkedin.com/in/kevin-harkins-b922ba5/",
    portrait: "kevin",
    biography:
      "Dr. Kevin Harkins guides Harkcon’s overall direction and works with the Board of Directors to establish the company’s long-term goals, strategies, and policies. He brings more than 30 years of public- and private-sector leadership and management experience, with expertise in strategic planning, competency management, organizational assessment, workforce analysis, recruiting, training, and performance improvement.",
  },
  {
    name: "Brittany Hammond",
    role: "Chief Operating Officer",
    linkedin: "https://www.linkedin.com/in/brittany-hammond-7973a6203/",
    portrait: "brittany",
    biography:
      "Brittany Hammond manages Harkcon’s U.S. Coast Guard portfolio, overseeing training and analysis contracts supporting domestic and overseas operations. A Coast Guard veteran with experience aboard two cutters and as an intelligence analyst, she brings expertise in instructional design, human performance technology, and program management. She holds a bachelor’s degree in Government from the U.S. Coast Guard Academy and a master’s degree in Education from Old Dominion University. Outside work, Brittany enjoys the outdoors with her family and volunteers as a youth basketball coach and preschool Board member.",
  },
  {
    name: "Jim Davis",
    role: "Chief Human Capital Officer",
    linkedin: "https://www.linkedin.com/in/jim-davis-letsgo/",
    portrait: "jim",
    biography:
      "Jim Davis leads Harkcon’s human capital strategy, workforce development, and employee engagement, aligning talent initiatives with the company’s mission, culture, and growth. He brings more than 30 years of executive leadership and federal human capital experience across the Departments of Homeland Security and Veterans Affairs, where he led workforce modernization, organizational transformation, employee relations, and leadership development efforts. Jim joined Harkcon in 2026 after serving as a Senior Human Capital Consultant at Serco.",
  },
  {
    name: "Paula Harkins",
    role: "Chief Growth Officer",
    linkedin: "https://www.linkedin.com/in/dr-paula-harkins-edd-lssbb-113a0463/",
    portrait: "paula",
    biography:
      "Dr. Paula Harkins drives Harkcon’s sustainable growth and expansion across the federal sector, developing strategies that strengthen workforce effectiveness, improve operations, and support mission-critical goals. Her work combines human capital and organizational performance expertise with innovative problem-solving and collaborative partnerships, guided by Harkcon’s values of mastery, integrity, innovation, and putting people first. A Certified Lean Six Sigma Black Belt and international speaker, she is a member of AERA, SHRM, and ISPI.",
  },
  {
    name: "Kyle Moore",
    role: "Executive Vice President",
    portrait: "kyle",
    biography:
      "Kyle Moore oversees Harkcon’s day-to-day operations, coordinating and evaluating company activities while working with the CEO to implement its goals. A 20-year Coast Guard veteran, he brings more than 35 years of human resources, planning, and project management experience serving clients from Fortune 500 companies to local nonprofits. His consulting expertise spans leadership development, competency management, staffing, quality management, and strategic planning.",
  },
  {
    name: "Mohammad Khan",
    role: "Director of Information Technology",
    linkedin: "https://www.linkedin.com/in/mohammad-khan-95042b1b4/",
    portrait: "mohammad",
  },
]

export const programManagers: Person[] = [
  {
    name: "Bradley McNally",
    role: "Project Manager",
    portrait: "bradley",
    linkedin: "https://www.linkedin.com/in/brad-mcnally-007582392/",
    biography:
      "Bradley McNally brings extensive U.S. Coast Guard leadership experience in aviation, engineering, logistics, acquisitions, and program management to Harkcon. His previous assignments include Director of Aviation Acquisitions, enterprise software program management, aviation fleet operations, and federal budget coordination. A licensed Professional Engineer, military pilot, and certified program management professional, he combines technical expertise and collaborative leadership to strengthen capabilities, make effective use of resources, and deliver mission-focused results.",
  },
  { name: "Kersha Poindexter", role: "Compliance & Facility Security Officer", portrait: "kersha" },
  {
    name: "Meredith Phillips",
    role: "Program Manager",
    linkedin: "https://www.linkedin.com/in/meredith-phillips-6932aaa6/",
    portrait: "meredith",
  },
  {
    name: "Morgan Litz",
    role: "Program Manager",
    linkedin: "https://www.linkedin.com/in/morganlitz/",
    portrait: "morgan",
  },
  {
    name: "Marty Jenkins",
    role: "Contract and Program Manager",
    linkedin: "https://www.linkedin.com/in/melissa-jenkins-cfcm-29ab2b56/",
    portrait: "marty",
  },
  {
    name: "Keith Curran",
    role: "International Programs Manager",
    linkedin: "https://www.linkedin.com/in/keith-curran-5103b21/",
    portrait: "keith",
  },
  { name: "Ashley Walker", role: "Program Manager", portrait: "ashley" },
]

export function defaultPeople(): PersonEntry[] {
  return (
    [
      ["executive", executives],
      ["program", programManagers],
    ] as const
  ).flatMap(([group, people]) =>
    people.map((person) => ({
      id: person.portrait,
      name: person.name,
      role: person.role,
      photo: `/images/leadership-${person.portrait}.${person.portrait === "bradley" ? "svg" : "jpg"}`,
      alt: person.name,
      linkedin: person.linkedin ?? "",
      biography: person.biography ?? "",
      group,
    })),
  )
}
