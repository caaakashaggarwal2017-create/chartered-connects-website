"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils/cn"

const ARTICLESHIP_URL = "https://chartered-connects.onrender.com/"

const navLinks = [
  { href: "/resources", label: "Resources", external: false },
  { href: "/jobs", label: "Jobs", external: false },
  { href: ARTICLESHIP_URL, label: "Articleship", isNew: true, external: true },
  { href: "/podcast", label: "Podcast", external: false, isPodcast: true },
  { href: "/calendar", label: "Calendar", external: false },
  { href: "/newsletter", label: "Newsletter", external: false },
  { href: "/directory", label: "Find a CA", external: false },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="14" cy="14" r="3" fill="#F5A623"/>
              <circle cx="4" cy="8" r="2" fill="#0A1628"/>
              <circle cx="24" cy="8" r="2" fill="#0A1628"/>
              <circle cx="4" cy="20" r="2" fill="#0A1628"/>
              <circle cx="24" cy="20" r="2" fill="#0A1628"/>
              <line x1="14" y1="14" x2="4" y2="8" stroke="#0A1628" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="14" y1="14" x2="24" y2="8" stroke="#0A1628" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="14" y1="14" x2="4" y2="20" stroke="#0A1628" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="14" y1="14" x2="24" y2="20" stroke="#0A1628" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="4" y1="8" x2="24" y2="8" stroke="#F5A623" strokeWidth="1" strokeOpacity="0.3"/>
              <line x1="4" y1="20" x2="24" y2="20" stroke="#F5A623" strokeWidth="1" strokeOpacity="0.3"/>
            </svg>
            <span className="font-bold text-lg text-[#0A1628]">Chartered Connects</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:text-[#0A1628] hover:bg-gray-50"
                >
                  {link.label}
                  {link.isNew && (
                    <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7C3AED] text-white leading-none">
                      NEW
                    </span>
                  )}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === link.href
                      ? link.isPodcast
                        ? "text-[#E53E3E] bg-red-50"
                        : "text-[#F5A623] bg-amber-50"
                      : link.isPodcast
                      ? "text-[#E53E3E] hover:text-[#c53030] hover:bg-red-50"
                      : "text-gray-600 hover:text-[#0A1628] hover:bg-gray-50"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="gold" size="sm" asChild>
              <Link href="/newsletter">Join Newsletter</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white p-0">
              <div className="flex flex-col h-full">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex items-center gap-2 p-6 border-b">
                  <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="14" cy="14" r="3" fill="#F5A623"/>
                    <circle cx="4" cy="8" r="2" fill="#0A1628"/>
                    <circle cx="24" cy="8" r="2" fill="#0A1628"/>
                    <circle cx="4" cy="20" r="2" fill="#0A1628"/>
                    <circle cx="24" cy="20" r="2" fill="#0A1628"/>
                    <line x1="14" y1="14" x2="4" y2="8" stroke="#0A1628" strokeWidth="1.5" strokeOpacity="0.4"/>
                    <line x1="14" y1="14" x2="24" y2="8" stroke="#0A1628" strokeWidth="1.5" strokeOpacity="0.4"/>
                    <line x1="14" y1="14" x2="4" y2="20" stroke="#0A1628" strokeWidth="1.5" strokeOpacity="0.4"/>
                    <line x1="14" y1="14" x2="24" y2="20" stroke="#0A1628" strokeWidth="1.5" strokeOpacity="0.4"/>
                  </svg>
                  <span className="font-bold text-[#0A1628]">Chartered Connects</span>
                </div>
                <nav className="flex flex-col gap-1 p-4 flex-1" aria-label="Mobile navigation">
                  {navLinks.map((link) =>
                    link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors min-h-[44px] text-gray-700 hover:bg-gray-50"
                      >
                        {link.label}
                        {link.isNew && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7C3AED] text-white leading-none">
                            NEW
                          </span>
                        )}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors min-h-[44px]",
                          pathname === link.href
                            ? link.isPodcast
                              ? "text-[#E53E3E] bg-red-50 font-semibold"
                              : "text-[#F5A623] bg-amber-50 font-semibold"
                            : link.isPodcast
                            ? "text-[#E53E3E] hover:bg-red-50"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {link.isPodcast && (
                          <Youtube className="h-4 w-4 text-[#E53E3E]" aria-hidden="true" />
                        )}
                        {link.label}
                      </Link>
                    )
                  )}
                </nav>
                <div className="p-4 border-t">
                  <Button variant="gold" className="w-full" asChild>
                    <Link href="/newsletter" onClick={() => setOpen(false)}>
                      Join Newsletter — Free
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
