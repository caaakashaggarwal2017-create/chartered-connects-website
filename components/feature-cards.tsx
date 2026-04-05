import Link from "next/link"
import { BookOpen, Briefcase, Calendar, Mail, Users, GraduationCap, Youtube, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const ARTICLESHIP_URL = "https://ca-articleship-connect.netlify.app/"

const cards = [
  {
    icon: BookOpen,
    title: "Free CA Resource Library",
    description: "Articleship checklists, CA Final study planners, GST return guides, client engagement letter templates — all free. New resources added every week.",
    cta: "Browse Resources →",
    href: "/resources",
    badge: "FREE DOWNLOAD",
    badgeVariant: "gold" as const,
    accent: "gold",
  },
  {
    icon: Briefcase,
    title: "CA Jobs Board",
    description: "Curated CA job openings across Delhi, Bengaluru, Mumbai and beyond. From Big 4 to boutique firms — updated every week.",
    cta: "View Open Roles →",
    href: "/jobs",
    badge: "UPDATED WEEKLY",
    badgeVariant: "gold" as const,
    accent: "gold",
  },
  {
    icon: Calendar,
    title: "Compliance Deadline Calendar",
    description: "Never miss a GST, TDS, ROC or Income Tax deadline. Full FY 2025-26 calendar with filters — shareable with your clients.",
    cta: "Open Calendar →",
    href: "/calendar",
    badge: "FY 2025-26",
    badgeVariant: "gold" as const,
    accent: "gold",
  },
  {
    icon: Mail,
    title: "CC Weekly Newsletter",
    description: "Every Tuesday: 1 career story, 1 compliance update, 1 job spotlight, 1 free resource. Join 5,000+ CAs already subscribed.",
    cta: "Subscribe Free →",
    href: "/newsletter",
    badge: "FREE",
    badgeVariant: "gold" as const,
    accent: "gold",
  },
  {
    icon: Users,
    title: "Find a CA Directory",
    description: "Looking for a CA? Browse verified CAs by city and specialisation — GST advisory, startup audits, NRI taxation and more.",
    cta: "Find a CA →",
    href: "/directory",
    badge: "VERIFIED",
    badgeVariant: "gold" as const,
    accent: "gold",
  },
]

const podcastCard = {
  title: "CC Podcast — Conversations with CA Professionals",
  description:
    "Real conversations with practicing CAs, Big 4 partners, CA rankers and finance leaders. New episodes every week on YouTube.",
  cta: "Watch Latest Episode →",
  href: "/podcast",
  badge: "NEW EPISODE",
  stats: ["20+ Episodes", "CAs & Students", "Finance Leaders"],
}

const articleshipCard = {
  icon: GraduationCap,
  title: "CA Articleship Connect",
  description: "Find top CA firms offering articleship across India. Apply directly, track your application, and get mentored by CAs who've been through it.",
  cta: "Find Articleship →",
  href: ARTICLESHIP_URL,
  external: true,
  badge: "FOR STUDENTS",
  badgeVariant: "purple" as const,
  accent: "purple",
  stats: ["200+ Firms", "15 Cities", "Apply in 2 minutes"],
}

export default function FeatureCards() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-4">
            Everything a CA needs, in one place
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Built for practicing CAs, articleship students, and CA aspirants across India
          </p>
        </div>

        {/* 2-column grid for 5 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#F5A623] transition-all duration-200 flex flex-col"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant={card.badgeVariant} className="text-[10px] font-bold tracking-wide">
                    {card.badge}
                  </Badge>
                </div>

                {/* Icon */}
                <div className="mb-4 w-11 h-11 rounded-lg bg-amber-50 flex items-center justify-center group-hover:bg-[#F5A623] transition-colors duration-200">
                  <Icon className="h-5 w-5 text-[#F5A623] group-hover:text-white transition-colors duration-200" aria-hidden="true" />
                </div>

                <h3 className="font-bold text-[#0A1628] text-lg mb-2 pr-20">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{card.description}</p>

                <span className="text-sm font-semibold text-[#F5A623] group-hover:underline">
                  {card.cta}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Articleship card — full width, purple accent */}
        <div className="relative">
          {/* Most Popular ribbon */}
          <div className="absolute -top-3 left-6 z-10">
            <span className="bg-[#7C3AED] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              ★ Most Popular
            </span>
          </div>

          <a
            href={articleshipCard.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white border-2 border-[#7C3AED]/30 rounded-xl p-6 hover:shadow-lg hover:border-[#7C3AED] transition-all duration-200 flex flex-col md:flex-row gap-6 overflow-hidden block"
          >
            {/* Purple left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#7C3AED] rounded-l-xl" aria-hidden="true"></div>

            {/* Badge */}
            <div className="absolute top-4 right-4">
              <Badge variant="purple" className="text-[10px] font-bold tracking-wide">
                {articleshipCard.badge}
              </Badge>
            </div>

            <div className="pl-4 flex-1">
              {/* Icon */}
              <div className="mb-4 w-11 h-11 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-[#7C3AED] transition-colors duration-200">
                <GraduationCap className="h-5 w-5 text-[#7C3AED] group-hover:text-white transition-colors duration-200" aria-hidden="true" />
              </div>

              <h3 className="font-bold text-[#0A1628] text-xl mb-2 pr-24">{articleshipCard.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-2xl">{articleshipCard.description}</p>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-3 mb-4">
                {articleshipCard.stats.map((stat) => (
                  <span key={stat} className="inline-flex items-center gap-1.5 text-xs text-[#7C3AED] font-medium bg-purple-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full" aria-hidden="true"></span>
                    {stat}
                  </span>
                ))}
              </div>

              <span className="text-sm font-semibold text-[#7C3AED] group-hover:underline">
                {articleshipCard.cta}
              </span>
            </div>
          </a>
        </div>

        {/* Resume Builder card — full width, green accent */}
        <div className="relative mt-5">
          <Link
            href="/resume-builder"
            className="group relative bg-white border-2 border-[#059669]/30 rounded-xl p-6 hover:shadow-lg hover:border-[#059669] transition-all duration-200 flex flex-col md:flex-row gap-6 overflow-hidden block"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#059669] rounded-l-xl" aria-hidden="true" />
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="inline-flex items-center bg-[#059669] text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">AI-Powered</span>
              <span className="inline-flex items-center bg-green-50 text-green-700 text-[10px] font-medium px-2.5 py-1 rounded-full border border-green-200">Free</span>
            </div>
            <div className="pl-4 flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 bg-[#059669] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <FileText className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-[#0A1628] text-xl">CA Resume Builder</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-xl">
                Build a professional CA resume from scratch or upload your existing resume for AI-powered improvements. CA-specific templates for articleship, practice, and industry roles.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                {["Build from scratch", "Upload & improve with AI", "CA-specific templates", "Download as PDF"].map((s) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" aria-hidden="true" />{s}
                  </span>
                ))}
              </div>
              <span className="text-sm font-semibold text-[#059669] group-hover:underline">Build My Resume →</span>
            </div>
            <div className="md:w-56 flex-shrink-0 hidden md:flex">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 w-full flex flex-col justify-between min-h-[120px]">
                <div className="space-y-2">
                  <div className="h-3 bg-[#059669]/40 rounded w-3/4" />
                  <div className="h-2 bg-gray-300 rounded w-1/2" />
                  <div className="border-t border-green-200 pt-2 mt-2 space-y-1.5">
                    <div className="h-2 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-200 rounded w-5/6" />
                    <div className="h-2 bg-gray-200 rounded w-4/6" />
                  </div>
                  <div className="border-t border-green-200 pt-2 space-y-1.5">
                    <div className="h-2 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
                <p className="text-green-700 text-xs font-medium mt-3 text-center">CA-optimised template</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Podcast card — full width, dark navy with red accent */}
        <div className="relative mt-5">
          <Link
            href={podcastCard.href}
            className="group relative bg-[#0A1628] border-2 border-[#E53E3E]/30 rounded-xl p-6 hover:shadow-xl hover:border-[#E53E3E] transition-all duration-200 flex flex-col md:flex-row gap-6 overflow-hidden block"
          >
            {/* Red left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E53E3E] rounded-l-xl" aria-hidden="true"></div>

            {/* Subtle red glow */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-32 h-32 bg-[#E53E3E]/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

            {/* Badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-[#E53E3E] text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                {podcastCard.badge}
              </span>
            </div>

            <div className="pl-4 flex-1">
              {/* Icon */}
              <div className="mb-4 w-11 h-11 rounded-lg bg-[#E53E3E]/10 flex items-center justify-center group-hover:bg-[#E53E3E] transition-colors duration-200">
                <Youtube className="h-5 w-5 text-[#E53E3E] group-hover:text-white transition-colors duration-200" aria-hidden="true" />
              </div>

              <h3 className="font-bold text-white text-xl mb-2 pr-24">{podcastCard.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-2xl">{podcastCard.description}</p>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-3 mb-4">
                {podcastCard.stats.map((stat) => (
                  <span key={stat} className="inline-flex items-center gap-1.5 text-xs text-[#E53E3E] font-medium bg-[#E53E3E]/10 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-[#E53E3E] rounded-full" aria-hidden="true"></span>
                    {stat}
                  </span>
                ))}
              </div>

              <span className="text-sm font-semibold text-[#E53E3E] group-hover:underline">
                {podcastCard.cta}
              </span>
            </div>

            {/* Right: thumbnail placeholder */}
            <div className="flex-shrink-0 hidden md:flex items-center">
              <div className="w-36 h-24 rounded-lg bg-gradient-to-br from-[#1A0000] to-[#0A1628] border border-white/10 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#E53E3E] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-5 h-5 ml-0.5"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
