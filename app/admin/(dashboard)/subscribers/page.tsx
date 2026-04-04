import { supabase } from "@/lib/utils/supabase"
import { Mail, Download } from "lucide-react"
import Link from "next/link"

interface Subscriber {
  id: number
  email: string
  first_name: string
  subscribed_at: string
}

async function getSubscribers(): Promise<Subscriber[]> {
  const { data, error } = await supabase
    .from("subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false })
  if (error) {
    console.error("[admin/subscribers]", error)
    return []
  }
  return data ?? []
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  })
}

export default async function SubscribersPage() {
  const subscribers = await getSubscribers()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Mail size={20} className="text-blue-500" />
            <h1 className="text-2xl font-bold text-[#0A1628]">Newsletter Subscribers</h1>
          </div>
          <p className="text-gray-500 text-sm">{subscribers.length} total subscribers</p>
        </div>
        <Link
          href="/api/admin/export?type=subscribers"
          className="flex items-center gap-2 px-4 py-2 bg-[#0A1628] text-white rounded-lg text-sm font-medium hover:bg-[#0d1f38] transition"
        >
          <Download size={15} />
          Export CSV
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {subscribers.length === 0 ? (
          <div className="px-6 py-20 text-center text-gray-400">
            <Mail size={36} className="mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-500">No subscribers yet</p>
            <p className="text-sm mt-1">Subscribers will appear here once users sign up.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">#</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">First Name</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Subscribed At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {subscribers.map((sub, i) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-gray-400">{i + 1}</td>
                    <td className="px-6 py-4 font-medium text-[#0A1628]">{sub.email}</td>
                    <td className="px-6 py-4 text-gray-600">{sub.first_name || "—"}</td>
                    <td className="px-6 py-4 text-gray-500">{sub.subscribed_at ? fmt(sub.subscribed_at) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
