import { supabase } from "@/lib/utils/supabase"
import { Mic, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

type GuestApplication = Record<string, unknown>

async function getGuestApplications(): Promise<GuestApplication[]> {
  const { data, error } = await supabase
    .from("guest_applications")
    .select("*")
    .order("applied_at", { ascending: false })
  if (error) {
    console.error("[admin/podcast-guests]", error)
    return []
  }
  return (data ?? []) as GuestApplication[]
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  })
}

export default async function PodcastGuestsPage() {
  const guests = await getGuestApplications()

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Mic size={20} className="text-rose-500" />
            <h1 className="text-2xl font-bold text-[#0A1628]">Podcast Guest Applications</h1>
          </div>
          <p className="text-gray-500 text-sm">{guests.length} applications received</p>
        </div>
        <Link
          href="/api/admin/export?type=podcast-guests"
          className="flex items-center gap-2 px-4 py-2 bg-[#0A1628] text-white rounded-lg text-sm font-medium hover:bg-[#0d1f38] transition"
        >
          <Download size={15} />
          Export CSV
        </Link>
      </div>

      {guests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-20 text-center text-gray-400">
          <Mic size={36} className="mx-auto mb-3 text-gray-300" />
          <p className="font-medium text-gray-500">No guest applications yet</p>
          <p className="text-sm mt-1">Applications from the podcast page will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {guests.map((guest, i) => (
            <div
              key={String(guest.id ?? i)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: avatar + name */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0A1628] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#F5A623] font-bold text-sm">
                      {String(guest.name ?? guest.email ?? "?")
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1628]">{String(guest.name ?? "—")}</p>
                    <p className="text-sm text-gray-500">
                      {[guest.designation, guest.company].filter(Boolean).map(String).join(" · ")}
                    </p>
                    <p className="text-sm text-gray-400 mt-0.5">{String(guest.email ?? "—")}</p>
                  </div>
                </div>

                {/* Right: date + LinkedIn */}
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">
                    {guest.applied_at ? fmt(String(guest.applied_at)) : "—"}
                  </p>
                  {typeof guest.linkedin_url === "string" && guest.linkedin_url && (
                    <Link
                      href={guest.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
                    >
                      LinkedIn <ExternalLink size={11} />
                    </Link>
                  )}
                </div>
              </div>

              {/* Topic idea */}
              {typeof guest.topic_idea === "string" && guest.topic_idea && (
                <div className="mt-4 bg-gray-50 rounded-lg p-3.5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Topic Idea
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{guest.topic_idea}</p>
                </div>
              )}

              {/* Other fields */}
              <div className="mt-3 flex flex-wrap gap-2">
                {typeof guest.years_experience === "string" && guest.years_experience && (
                  <span className="px-2.5 py-1 bg-rose-50 text-rose-700 text-xs rounded-full font-medium">
                    {guest.years_experience} yrs experience
                  </span>
                )}
                {typeof guest.availability === "string" && guest.availability && (
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {guest.availability}
                  </span>
                )}
                {typeof guest.phone === "string" && guest.phone && (
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    📞 {guest.phone}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
