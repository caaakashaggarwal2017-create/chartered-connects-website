"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Mail,
  FileText,
  Building2,
  Bell,
  Mic,
  LogOut,
  ExternalLink,
  ChevronRight,
} from "lucide-react"

const navItems = [
  { href: "/admin",              label: "Dashboard",       icon: LayoutDashboard, exact: true },
  { href: "/admin/subscribers",  label: "Subscribers",     icon: Mail },
  { href: "/admin/applications", label: "Applications",    icon: FileText },
  { href: "/admin/firms",        label: "Firm Registrations", icon: Building2 },
  { href: "/admin/city-alerts",  label: "City Alerts",     icon: Bell },
  { href: "/admin/podcast-guests", label: "Podcast Guests", icon: Mic },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  function isActive(item: typeof navItems[0]) {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0A1628] flex flex-col min-h-screen border-r border-white/5">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <Link href="/" target="_blank" className="flex items-center gap-2.5 group">
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="3" fill="#F5A623" />
            <circle cx="4"  cy="8"  r="2" fill="white" opacity="0.85" />
            <circle cx="24" cy="8"  r="2" fill="white" opacity="0.85" />
            <circle cx="4"  cy="20" r="2" fill="white" opacity="0.85" />
            <circle cx="24" cy="20" r="2" fill="white" opacity="0.85" />
            <line x1="14" y1="14" x2="4"  y2="8"  stroke="white" strokeWidth="1.5" strokeOpacity="0.45" />
            <line x1="14" y1="14" x2="24" y2="8"  stroke="white" strokeWidth="1.5" strokeOpacity="0.45" />
            <line x1="14" y1="14" x2="4"  y2="20" stroke="white" strokeWidth="1.5" strokeOpacity="0.45" />
            <line x1="14" y1="14" x2="24" y2="20" stroke="white" strokeWidth="1.5" strokeOpacity="0.45" />
            <line x1="4"  y1="8"  x2="24" y2="8"  stroke="#F5A623" strokeWidth="1" strokeOpacity="0.35" />
            <line x1="4"  y1="20" x2="24" y2="20" stroke="#F5A623" strokeWidth="1" strokeOpacity="0.35" />
          </svg>
          <div>
            <p className="text-white text-sm font-bold leading-none">Chartered Connects</p>
            <p className="text-[#F5A623] text-[10px] font-semibold tracking-widest uppercase mt-0.5">
              Admin
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="px-3 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
          Overview
        </p>
        {navItems.map((item) => {
          const active = isActive(item)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                active
                  ? "bg-[#F5A623]/15 text-[#F5A623]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon
                size={16}
                className={active ? "text-[#F5A623]" : "text-white/40 group-hover:text-white/70"}
              />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight size={14} className="text-[#F5A623]/60" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer actions */}
      <div className="px-3 py-4 border-t border-white/5 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
        >
          <ExternalLink size={15} />
          Visit Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
