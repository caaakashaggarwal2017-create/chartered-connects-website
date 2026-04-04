import type { Metadata } from "next"
import Link from "next/link"
import { Linkedin, Users, BookOpen, Calendar, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About — Chartered Connects",
  description: "India's professional community for Chartered Accountants and CA aspirants. Built by CAs, for CAs.",
}

const LINKEDIN_URL = "https://www.linkedin.com/company/42837933"

const stats = [
  { value: "1,03,000+", label: "LinkedIn Followers" },
  { value: "500+", label: "Free CA Resources" },
  { value: "15+", label: "Cities Covered" },
  { value: "5,000+", label: "Newsletter Subscribers" },
]

const offerings = [
  { icon: BookOpen, title: "Free Resource Library", desc: "500+ CA resources — study planners, guides, templates, checklists. No paywalls.", href: "/resources" },
  { icon: Briefcase, title: "CA Jobs Board", desc: "Curated openings from Big 4 to boutique firms across India.", href: "/jobs" },
  { icon: Calendar, title: "Compliance Calendar", desc: "Every GST, TDS, Income Tax and ROC deadline for FY 2025-26.", href: "/calendar" },
  { icon: Users, title: "CA Directory", desc: "Find verified CAs by city and specialisation.", href: "/directory" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#0A1628] py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#F5A623] font-semibold text-sm uppercase tracking-widest mb-4">About Us</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Built for India's CA Community
          </h1>
          <p className="text-gray-300 text-xl leading-relaxed max-w-2xl mx-auto">
            Chartered Connects is India's professional community platform for Chartered Accountants and CA aspirants —
            seamless connection for a prosperous financial future.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-[#F5A623] mb-1">{s.value}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24 bg-[#F8F9FA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A1628] mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-5">
            India has over 3.5 lakh practicing Chartered Accountants and hundreds of thousands more pursuing the qualification. Yet the community has historically been scattered — resources fragmented, opportunities hard to find, and meaningful connections difficult to make.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-5">
            Chartered Connects was built to change that. We started with a LinkedIn community that grew to over 1 lakh followers — CAs, students, and finance professionals from Delhi to Kochi, from Big 4 to boutique practices.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our tagline — <strong className="text-[#0A1628]">Inspire. Learn. Lead.</strong> — captures what we believe every CA should have access to: inspiring stories from those ahead on the journey, tools to keep learning, and a platform to step into leadership.
          </p>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0A1628] text-center mb-10">What we offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {offerings.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group bg-[#F8F9FA] rounded-xl border border-gray-200 p-6 flex items-start gap-4 hover:border-[#F5A623] hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F5A623] transition-colors">
                    <Icon className="h-5 w-5 text-[#F5A623] group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A1628] mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* LinkedIn CTA */}
      <section className="bg-[#0A1628] py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-xl bg-[#0077B5] flex items-center justify-center mx-auto mb-5">
            <Linkedin className="h-7 w-7 text-white" aria-hidden="true" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Join 1,03,000+ on LinkedIn
          </h2>
          <p className="text-gray-400 mb-7">
            Daily CA insights, exam updates, job alerts and community posts. The most active CA community in India.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-[#0077B5] hover:bg-[#006399] text-white px-8">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4 mr-2" aria-hidden="true" />
                Follow on LinkedIn
              </a>
            </Button>
            <Button variant="white-outline" size="lg" asChild>
              <Link href="/newsletter">Subscribe to Newsletter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
