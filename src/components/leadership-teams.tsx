import { LinkedinLogo } from "@phosphor-icons/react/ssr"
import Image from "next/image"
import BiographyDisclosure from "~/components/biography-disclosure"

type Person = {
  name: string
  role: string
  portrait: string
  biography?: string
  linkedin?: string
}

const executives: Person[] = [
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

const programManagers: Person[] = [
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

function TeamSection({
  id,
  title,
  number,
  people,
}: {
  id: string
  title: string
  number: string
  people: Person[]
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-t border-[#0d132d]/15 py-20 md:py-28"
    >
      <div className="site-gutter">
        <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5 text-[#737682]">{number} / Our people</p>
            <h2
              id={`${id}-title`}
              className="font-header text-section-title font-medium text-balance"
            >
              {title}
            </h2>
          </div>
          <span className="text-sm text-[#5f626b]">Expertise. Perspective. Commitment.</span>
        </div>
        <div className="grid items-start gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-8">
          {people.map((person) => (
            <article
              key={person.portrait}
              className="relative min-w-0 pt-8 before:absolute before:inset-x-[7.5%] before:top-0 before:border-t before:border-[#0d132d]/20"
            >
              <div className="relative mx-auto mb-7 aspect-square w-44 overflow-hidden rounded-full bg-[#e9e8e4] md:w-52">
                <Image
                  src={`/images/leadership-${person.portrait}.jpg`}
                  alt={person.name}
                  fill
                  sizes="(min-width: 768px) 208px, 176px"
                  className="object-cover grayscale"
                />
              </div>
              <h3 className="text-center font-header text-xl font-medium tracking-[-0.02em]">
                {person.name}
              </h3>
              <p className="mt-2 min-h-12 text-center text-sm leading-6 text-[#5f626b]">
                {person.role}
              </p>
              {
                <div className="mt-2 flex justify-center">
                  <a
                    href={person.linkedin ?? "https://www.linkedin.com/company/harkcon-inc."}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      person.linkedin
                        ? `View ${person.name} on LinkedIn (opens in a new tab)`
                        : "View Harkcon on LinkedIn (opens in a new tab)"
                    }
                    className="inline-flex min-h-11 items-center gap-2 px-3 text-sm text-[#5f626b] underline-offset-4 transition-colors hover:text-[#0d132d] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d132d]"
                  >
                    <LinkedinLogo aria-hidden="true" weight="fill" className="size-5" /> LinkedIn
                  </a>
                </div>
              }
              {person.biography && (
                <BiographyDisclosure name={person.name}>
                  <p className="pb-6 text-sm leading-7 text-[#454955]">{person.biography}</p>
                </BiographyDisclosure>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function LeadershipTeams() {
  return (
    <>
      <TeamSection
        id="executive-leadership"
        title="Executive leadership"
        number="01"
        people={executives}
      />
      <div className="bg-[#f4f3f0]">
        <TeamSection
          id="program-management"
          title="Program management"
          number="02"
          people={programManagers}
        />
      </div>
    </>
  )
}
