import Link from "next/link"
import { Mail, FileText, Building2, Bell, Mic, ArrowRight, Users, BookOpen, Briefcase, Calendar } from "lucide-react"
import { supabase } from "@/lib/utils/supabase"
import { getAllEpisodes } from "@/lib/utils/podcast"
import { jobs } from "@/lib/data/jobs"
import { resources } from "@/lib/data/resources"
import { getUpcomingDeadlines } from "@/lib/data/deadlines"
import { caProfiles } from "@/lib/data/directory"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  })
}

type ActivityItem = { label: string; detail: string; time: string; raw: number }

export default async function AdminDashboard() {
  const [
    { data: subscribers },
    { data: applications },
    { data: firms },
    { data: cityAlerts },
    { data: podcastGuests },
  ] = await Promise.all([
    supabase.from("subscribers").select("email, subscribed_at").order("subscribed_at", { ascending: false }),
    supabase.from("applications").select("student_name, email, applied_at").order("applied_at", { ascending: false }),
    supabase.from("firm_registrations").select("firm_name, registered_at").order("registered_at", { ascending: false }),
    supabase.from("city_alerts").select("email, city, created_at").order("created_at", { ascending: false }),
    supabase.from("guest_applications").select("name, email, applied_at").order("applied_at", { ascending: false }),
  ])

  const s = subscribers ?? []
  const a = applications ?? []
  const f = firms ?? []
  const c = cityAlerts ?? []
  const g = podcastGuests ?? []

  const allEpisodes = getAllEpisodes()
  const upcoming = getUpcomingDeadlines(5)

  const dynamicStats = [
    {
      label: "Newsletter Subscribers",
      count: s.length,
      icon: Mail,
      color: "bg-blue-500",
      href: "/admin/subscribers",
    },
    {
      label: "Articleship Applications",
      count: a.length,
      icon: FileText,
      color: "bg-emerald-500",
      href: "/admin/applications",
    },
    {
      label: "Firm Registrations",
      count: f.length,
      icon: Building2,
      color: "bg-violet-500",
      href: "/admin/firms",
    },
    {
      label: "City Alert Subscriptions",
      count: c.length,
      icon: Bell,
      color: "bg-orange-500",
      href: "/admin/city-alerts",
    },
    {
      label: "Podcast Guest Applications",
      count: g.length,
      icon: Mic,
      color: "bg-rose-500",
      href: "/admin/podcast-guests",
    },
  ]

  const staticStats = [
    { label: "Job Listings",         count: jobs.length,        icon: Briefcase, color: "text-sky-600" },
    { label: "Resources",            count: resources.length,   icon: BookOpen,  color: "text-teal-600" },
    { label: "Directory Members",    count: caProfiles.length,  icon: Users,     color: "text-indigo-600" },
    { label: "Compliance Deadlines", count: upcoming.length,    icon: Calendar,  color: "text-amber-600" },
    { label: "Podcast Episodes",     count: allEpisodes.length, icon: Mic,       color: "text-pink-600" },
  ]

  const recentActivity: ActivityItem[] = [
    ...s.slice(0, 5).map((row) => ({
      label: "New subscriber",
      detail: row.email,
      time: formatDate(row.subscribed_at),
      raw: new Date(row.subscribed_at).getTime(),
    })),
    ...a.slice(0, 5).map((row) => ({
      label: "Articleship application",
      detail: row.student_name ?? row.email,
      time: formatDate(row.applied_at),
      raw: new Date(row.applied_at).getTime(),
    })),
    ...f.slice(0, 5).map((row) => ({
      label: "Firm registered",
      detail: row.firm_name,
      time: formatDate(row.registered_at),
      raw: new Date(row.registered_at).getTime(),
    })),
    ...c.slice(0, 5).map((row) => ({
      label: "City alert signup",
      detail: `${row.email} — ${row.city}`,
      time: formatDate(row.created_at),
      raw: new Date(row.created_at).getTime(),
    })),
    ...g.slice(0, 5).map((row) => ({
      label: "Podcast guest application",
      detail: row.name ?? row.email,
      time: formatDate(row.applied_at),
      raw: new Date(row.applied_at).getTime(),
    })),
  ]
    .filter((item) => !isNaN(item.raw))
    .sort((a, b) => b.raw - a.raw)
    .slice(0, 10)

  const totalSubmissions = s.length + a.length + f.length + c.length + g.length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A1628]">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Overview of all Chartered Connects activity.
          <span className="ml-2 text-[#0A1628] font-medium">{totalSubmissions} total submissions.</span>
        </p>
      </div>

      {/* Dynamic submission stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {dynamicStats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon size={16} className="text-white" />
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 transition mt-1" />
            </div>
            <p className="text-3xl font-bold text-[#0A1628] mb-1">{stat.count}</p>
            <p className="text-xs text-gray-500 leading-snug">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-[#0A1628]">Recent Activity</h2>
          </div>
          {recentActivity.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-400 text-sm">
              No submissions yet. Activity will appear here once users start submitting forms.
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {recentActivity.map((item, i) => (
                <li key={i} className="px-6 py-3.5 flex items-center gap-4 hover:bg-gray-50/50 transition">
                  <div className="w-2 h-2 rounded-full bg-[#F5A623] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium text-[#0A1628]">{item.label}</span>
                    <span className="mx-2 text-gray-300">·</span>
                    <span className="text-xs text-gray-500 truncate">{item.detail}</span>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Static content summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-[#0A1628]">Site Content</h2>
            <p className="text-xs text-gray-400 mt-0.5">Managed via codebase</p>
          </div>
          <ul className="divide-y divide-gray-50">
            {staticStats.map((s) => (
              <li key={s.label} className="px-6 py-3.5 flex items-center gap-3">
                <s.icon size={15} className={s.color} />
                <span className="flex-1 text-sm text-gray-600">{s.label}</span>
                <span className="text-sm font-semibold text-[#0A1628]">{s.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
