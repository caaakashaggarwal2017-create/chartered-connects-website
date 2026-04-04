import { supabase } from "@/lib/utils/supabase"
import { FileText, Download } from "lucide-react"
import Link from "next/link"

type Application = Record<string, unknown>

async function getApplications(): Promise<Application[]> {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("applied_at", { ascending: false })
  if (error) {
    console.error("[admin/applications]", error)
    return []
  }
  return (data ?? []) as Application[]
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  })
}

function badge(val: string, color: string) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {val}
    </span>
  )
}

export default async function ApplicationsPage() {
  const applications = await getApplications()

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText size={20} className="text-emerald-500" />
            <h1 className="text-2xl font-bold text-[#0A1628]">Articleship Applications</h1>
          </div>
          <p className="text-gray-500 text-sm">{applications.length} total applications</p>
        </div>
        <Link
          href="/api/admin/export?type=applications"
          className="flex items-center gap-2 px-4 py-2 bg-[#0A1628] text-white rounded-lg text-sm font-medium hover:bg-[#0d1f38] transition"
        >
          <Download size={15} />
          Export CSV
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {applications.length === 0 ? (
          <div className="px-6 py-20 text-center text-gray-400">
            <FileText size={36} className="mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-500">No applications yet</p>
            <p className="text-sm mt-1">Applications will appear here once students apply.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["#", "Student", "Email", "Phone", "CA Level", "Status", "Firm", "Applied"].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {applications.map((app, i) => (
                  <tr key={String(app.application_id ?? app.id ?? i)} className="hover:bg-gray-50/50 transition">
                    <td className="px-5 py-4 text-gray-400">{i + 1}</td>
                    <td className="px-5 py-4 font-medium text-[#0A1628] whitespace-nowrap">
                      {String(app.student_name ?? "—")}
                    </td>
                    <td className="px-5 py-4 text-gray-600">{String(app.email ?? "—")}</td>
                    <td className="px-5 py-4 text-gray-600">{String(app.phone ?? "—")}</td>
                    <td className="px-5 py-4">
                      {app.ca_level
                        ? badge(String(app.ca_level), "bg-emerald-50 text-emerald-700")
                        : "—"}
                    </td>
                    <td className="px-5 py-4">
                      {app.current_status
                        ? badge(String(app.current_status), "bg-blue-50 text-blue-700")
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {String(app.firm_name ?? "—")}
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {app.applied_at ? fmt(String(app.applied_at)) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {applications.length > 0 && (
        <p className="mt-4 text-xs text-gray-400 text-center">
          Showing {applications.length} applications · Export CSV for full details including cover letter, CV notes, and specialisation interest.
        </p>
      )}
    </div>
  )
}
