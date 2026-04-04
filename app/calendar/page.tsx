"use client"

import { useState, useMemo } from "react"
import { deadlines, deadlineCategories } from "@/lib/data/deadlines"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Share2, Printer, AlertTriangle, Calendar } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

function isUpcoming(dateStr: string, days = 7): boolean {
  const d = new Date(dateStr)
  const today = new Date()
  const future = new Date(today)
  future.setDate(today.getDate() + days)
  return d >= today && d <= future
}

function isPast(dateStr: string): boolean {
  return new Date(dateStr) < new Date()
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

const categoryColors: Record<string, string> = {
  gst: "bg-green-100 text-green-800",
  tds: "bg-blue-100 text-blue-800",
  "income-tax": "bg-amber-100 text-amber-800",
  roc: "bg-purple-100 text-purple-800",
  mca: "bg-gray-100 text-gray-800",
}

const categoryLabels: Record<string, string> = {
  gst: "GST",
  tds: "TDS",
  "income-tax": "Income Tax",
  roc: "ROC",
  mca: "MCA",
}

export default function CalendarPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const { toast } = useToast()

  const filtered = useMemo(
    () => deadlines.filter((d) => activeCategory === "all" || d.category === activeCategory),
    [activeCategory]
  )

  const upcomingCount = filtered.filter((d) => isUpcoming(d.date)).length

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({ title: "Link copied!", description: "Share it with your clients.", variant: "success" })
  }

  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero */}
      <section className="bg-[#0A1628] py-14 lg:py-20 no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="gold" className="mb-4 text-xs font-bold uppercase tracking-wider px-3 py-1">
            FY 2025-26
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            CA Compliance Calendar
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Never miss a GST, TDS, ROC or Income Tax deadline. Full FY 2025-26 calendar — shareable with clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
            <Button
              onClick={handleShare}
              variant="gold"
              size="lg"
              className="gap-2"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              Share Calendar
            </Button>
            <Button
              onClick={handlePrint}
              variant="white-outline"
              size="lg"
              className="gap-2"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              Download / Print
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Upcoming alert */}
        {upcomingCount > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 mb-7 no-print">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold text-amber-900 text-sm">
                {upcomingCount} deadline{upcomingCount > 1 ? "s" : ""} in the next 7 days
              </p>
              <p className="text-amber-700 text-xs mt-0.5">Highlighted below in amber.</p>
            </div>
          </div>
        )}

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8 no-print">
          {deadlineCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                activeCategory === cat.value
                  ? "bg-[#0A1628] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
              }`}
              aria-pressed={activeCategory === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-5">{filtered.length} deadlines</p>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0A1628] text-white">
                  <th className="text-left px-5 py-3.5 font-semibold">Date</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Type</th>
                  <th className="text-left px-5 py-3.5 font-semibold hidden sm:table-cell">Form</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Description</th>
                  <th className="text-left px-5 py-3.5 font-semibold hidden lg:table-cell">Penalty if Missed</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((deadline, i) => {
                  const upcoming = isUpcoming(deadline.date)
                  const past = isPast(deadline.date)
                  return (
                    <tr
                      key={deadline.id}
                      className={`border-t border-gray-100 ${
                        upcoming ? "bg-amber-50" : past ? "opacity-50" : i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-5 py-3.5 whitespace-nowrap font-medium text-[#0A1628]">
                        <div className="flex items-center gap-2">
                          {upcoming && (
                            <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" aria-hidden="true" />
                          )}
                          {formatDate(deadline.date)}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[deadline.category]}`}>
                          {categoryLabels[deadline.category]}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 hidden sm:table-cell text-gray-500 font-mono text-xs">
                        {deadline.formNumber || "—"}
                      </td>
                      <td className="px-5 py-3.5 text-gray-700">
                        <div>{deadline.description}</div>
                        {deadline.notes && (
                          <div className="text-xs text-gray-400 mt-0.5">{deadline.notes}</div>
                        )}
                      </td>
                      <td className="px-5 py-3.5 hidden lg:table-cell text-red-600 text-xs">
                        {deadline.penaltyIfMissed || "—"}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Print-only header */}
        <div className="print-only hidden mt-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="h-5 w-5" aria-hidden="true" />
            <strong>Chartered Connects — CA Compliance Calendar FY 2025-26</strong>
          </div>
          <p className="text-sm text-gray-500">charteredconnects.com · linkedin.com/company/42837933</p>
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center no-print">
          Dates are as per current CBIC/MCA notifications. Always verify with official sources before filing.
        </p>
      </div>
    </div>
  )
}
