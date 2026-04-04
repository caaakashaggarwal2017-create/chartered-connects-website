"use client"

import { useState } from "react"
import { MapPin, Briefcase, Clock, ExternalLink } from "lucide-react"
import { jobs, jobCities, jobTypes } from "@/lib/data/jobs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

function timeAgo(dateStr: string) {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
  if (days === 0) return "Today"
  if (days === 1) return "Yesterday"
  return `${days} days ago`
}

const typeColors: Record<string, string> = {
  big4: "bg-blue-100 text-blue-800",
  industry: "bg-green-100 text-green-800",
  practice: "bg-amber-100 text-amber-800",
  articleship: "bg-purple-100 text-purple-800",
}

const typeLabels: Record<string, string> = {
  big4: "Big 4",
  industry: "Industry",
  practice: "Practice",
  articleship: "Articleship",
}

export default function JobsPage() {
  const [city, setCity] = useState("All")
  const [type, setType] = useState("all")
  const [postJobOpen, setPostJobOpen] = useState(false)
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const filtered = jobs.filter((j) => {
    const matchCity = city === "All" || j.city === city
    const matchType = type === "all" || j.type === type
    return matchCity && matchType
  })

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName: "Job Poster" }),
      })
      toast({ title: "Got it!", description: "We'll be in touch to list your role.", variant: "success" })
      setPostJobOpen(false)
      setEmail("")
    } catch {
      toast({ title: "Error", description: "Please try again.", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero */}
      <section className="bg-[#0A1628] py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="gold" className="mb-4 text-xs font-bold uppercase tracking-wider px-3 py-1">
            Updated Weekly
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            CA Jobs Board
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Curated CA job openings across Delhi, Bengaluru, Mumbai and beyond. From Big 4 to boutique firms.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">City</label>
              <div className="flex flex-wrap gap-2">
                {jobCities.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCity(c)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors min-h-[36px] ${
                      city === c ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    aria-pressed={city === c}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Type</label>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setType(t.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors min-h-[36px] ${
                    type === t.value ? "bg-[#F5A623] text-[#0A1628]" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  aria-pressed={type === t.value}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">{filtered.length} roles found</p>
          <Button variant="gold" size="sm" onClick={() => setPostJobOpen(true)}>
            Post a Job
          </Button>
        </div>

        {/* Job cards */}
        <div className="space-y-4">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[job.type]}`}>
                      {typeLabels[job.type]}
                    </span>
                    {job.isUrgent && (
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                        URGENT
                      </span>
                    )}
                  </div>

                  <h2 className="font-bold text-[#0A1628] text-lg mb-0.5">{job.role}</h2>
                  <p className="text-gray-700 font-medium mb-3">{job.company}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                      {job.experience}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {timeAgo(job.postedDate)}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-2 sm:min-w-[160px]">
                  {job.salary && (
                    <span className="text-[#F5A623] font-bold text-base">{job.salary}</span>
                  )}
                  <Button
                    size="sm"
                    className="w-full sm:w-auto bg-[#0A1628] hover:bg-[#0d1e35] text-white"
                    asChild
                  >
                    <a href={`mailto:${job.applyEmail}`} className="flex items-center gap-1.5">
                      Apply Now
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No jobs match your filters. Try adjusting them.</p>
          </div>
        )}
      </div>

      {/* Post a Job modal */}
      <Dialog open={postJobOpen} onOpenChange={setPostJobOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Post a Job Opening</DialogTitle>
            <DialogDescription>
              Reach thousands of qualified CAs. We&apos;ll follow up to get your listing live.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePostJob} className="space-y-4 mt-2">
            <Input
              type="email"
              placeholder="Your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
              aria-label="Work email"
            />
            <Button type="submit" variant="gold" className="w-full">
              Submit Job Listing →
            </Button>
            <p className="text-xs text-gray-400 text-center">Free listing. We review within 24 hours.</p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
