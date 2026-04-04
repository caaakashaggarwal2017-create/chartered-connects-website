"use client"

import { useState } from "react"
import { Search, CheckCircle, Mail } from "lucide-react"
import { caProfiles, directorySpecialisations, directoryCities } from "@/lib/data/directory"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { getInitials, getInitialsColor } from "@/lib/utils/articleship"

export default function DirectoryPage() {
  const [search, setSearch] = useState("")
  const [city, setCity] = useState("All")
  const [spec, setSpec] = useState("All")
  const [listOpen, setListOpen] = useState(false)
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const filtered = caProfiles.filter((ca) => {
    const matchCity = city === "All" || ca.city === city
    const matchSpec = spec === "All" || ca.specialisations.includes(spec)
    const matchSearch =
      !search ||
      ca.name.toLowerCase().includes(search.toLowerCase()) ||
      ca.city.toLowerCase().includes(search.toLowerCase()) ||
      ca.specialisations.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    return matchCity && matchSpec && matchSearch
  })

  const handleList = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName: "CA Listing" }),
      })
      toast({ title: "Request received!", description: "We'll review and get back within 24 hours.", variant: "success" })
      setListOpen(false)
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
            Verified Professionals
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Find a CA
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Browse verified Chartered Accountants by city and specialisation — GST advisory, startup audits, NRI taxation and more.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
            <Input
              placeholder="Search by name, city, or specialisation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11"
              aria-label="Search CAs"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">City</label>
              <div className="flex flex-wrap gap-2">
                {directoryCities.map((c) => (
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
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Specialisation</label>
              <div className="flex flex-wrap gap-2">
                {directorySpecialisations.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpec(s)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors min-h-[36px] ${
                      spec === s ? "bg-[#F5A623] text-[#0A1628]" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    aria-pressed={spec === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">{filtered.length} CAs found</p>
          <Button variant="gold" size="sm" onClick={() => setListOpen(true)}>
            List Your Practice Free
          </Button>
        </div>

        {/* CA cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((ca) => (
            <div
              key={ca.id}
              className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 ${getInitialsColor(ca.name)}`}
                  aria-hidden="true"
                >
                  {getInitials(ca.name)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h2 className="font-bold text-[#0A1628] text-base">{ca.name}</h2>
                    {ca.isVerified && (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" aria-label="Verified" />
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{ca.city}, {ca.state}</p>
                  <p className="text-gray-400 text-xs">{ca.yearsExperience} years experience</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {ca.specialisations.slice(0, 3).map((s) => (
                  <span key={s} className="text-xs bg-[#F8F9FA] border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                    {s}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4 line-clamp-2">{ca.about}</p>

              <Button
                size="sm"
                className="w-full bg-[#0A1628] hover:bg-[#0d1e35] text-white gap-1.5"
                asChild
              >
                <a href={`mailto:${ca.email}`}>
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  Contact
                </a>
              </Button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No CAs match your search. Try different filters.</p>
          </div>
        )}
      </div>

      {/* List your practice modal */}
      <Dialog open={listOpen} onOpenChange={setListOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>List Your Practice — Free</DialogTitle>
            <DialogDescription>
              Get discovered by clients looking for a CA in your city. Listing is always free.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleList} className="space-y-4 mt-2">
            <Input
              type="email"
              placeholder="Your professional email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
              aria-label="Professional email"
            />
            <Button type="submit" variant="gold" className="w-full">
              Request Free Listing →
            </Button>
            <p className="text-xs text-gray-400 text-center">We review within 24 hours.</p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
