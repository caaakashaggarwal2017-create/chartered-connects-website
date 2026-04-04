import type { Metadata } from "next"
import { BookOpen, Briefcase, FileText, TrendingUp } from "lucide-react"
import NewsletterForm from "@/components/newsletter-form"

export const metadata: Metadata = {
  title: "CC Weekly Newsletter — Chartered Connects",
  description: "Free weekly newsletter for CAs: career stories, compliance updates, job highlights",
}

const pastEditions = [
  {
    id: 1,
    subject: "The CA who left Big 4 at 27 to build a ₹2Cr practice",
    date: "March 18, 2025",
    preview: "Career story · GST anti-profiteering update · 3 open CA roles in Bengaluru",
  },
  {
    id: 2,
    subject: "GSTR-9 deadline extended — what you need to know",
    date: "March 11, 2025",
    preview: "Compliance deep dive · CA Final Nov results analysis · Free ITR checklist",
  },
  {
    id: 3,
    subject: "Articleship stipends in 2025 — the real numbers",
    date: "March 4, 2025",
    preview: "Stipend survey results · 5 articleship openings · ICAI exam schedule update",
  },
]

const insideItems = [
  {
    icon: TrendingUp,
    label: "1 Career Story",
    desc: "Real CA journeys — from articleship to CFO, from practice to Big 4, from India to abroad.",
    color: "text-[#F5A623] bg-amber-50",
  },
  {
    icon: FileText,
    label: "1 Compliance Update",
    desc: "The most important GST, TDS, or regulatory change that week — plain English, no jargon.",
    color: "text-green-600 bg-green-50",
  },
  {
    icon: Briefcase,
    label: "1 Job Spotlight",
    desc: "One handpicked CA role — with context on why it's worth applying for.",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: BookOpen,
    label: "1 Free Resource",
    desc: "A checklist, template, or guide you can use immediately. No signup required.",
    color: "text-purple-600 bg-purple-50",
  },
]

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero */}
      <section className="bg-[#0A1628] py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F5A623]/20 text-[#F5A623] text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            Free · Every Tuesday
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            The CC Weekly
          </h1>
          <p className="text-gray-300 text-xl mb-8 max-w-xl mx-auto">
            5 minutes every Tuesday. Career story, compliance update, job spotlight, free resource.
          </p>

          {/* Signup form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
            <NewsletterForm />
            <p className="text-gray-500 text-xs mt-4 text-center">
              Join 5,000+ CAs. No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0A1628] text-center mb-10">
            What&apos;s inside every edition
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {insideItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-6 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A1628] mb-1">{item.label}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Past editions */}
      <section className="bg-white py-14 lg:py-20 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-7">Past editions</h2>
          <div className="space-y-4">
            {pastEditions.map((ed) => (
              <div
                key={ed.id}
                className="bg-[#F8F9FA] rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#0A1628] mb-1">{ed.subject}</p>
                    <p className="text-gray-500 text-sm">{ed.preview}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">{ed.date}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-6">
            TODO: Replace with real past edition archive
          </p>
        </div>
      </section>
    </div>
  )
}
