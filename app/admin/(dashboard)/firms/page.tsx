import { supabase } from "@/lib/utils/supabase"
import { Building2, Download } from "lucide-react"
import Link from "next/link"

type Firm = Record<string, unknown>

async function getFirms(): Promise<Firm[]> {
  const { data, error } = await supabase
    .from("firm_registrations")
    .select("*")
    .order("registered_at", { ascending: false })
  if (error) {
    console.error("[admin/firms]", error)
    return []
  }
  return (data ?? []) as Firm[]
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  })
}

export default async function FirmsPage() {
  const firms = await getFirms()

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 size={20} className="text-violet-500" />
            <h1 className="text-2xl font-bold text-[#0A1628]">Firm Registrations</h1>
          </div>
          <p className="text-gray-500 text-sm">{firms.length} registered firms</p>
        </div>
        <Link
          href="/api/admin/export?type=firms"
          className="flex items-center gap-2 px-4 py-2 bg-[#0A1628] text-white rounded-lg text-sm font-medium hover:bg-[#0d1f38] transition"
        >
          <Download size={15} />
          Export CSV
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {firms.length === 0 ? (
          <div className="px-6 py-20 text-center text-gray-400">
            <Building2 size={36} className="mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-500">No firm registrations yet</p>
            <p className="text-sm mt-1">Firms will appear here once they register on the platform.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["#", "Firm Name", "Contact Person", "Email", "City", "Phone", "Registered"].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {firms.map((firm, i) => (
                  <tr key={String(firm.id ?? i)} className="hover:bg-gray-50/50 transition">
                    <td className="px-5 py-4 text-gray-400">{i + 1}</td>
                    <td className="px-5 py-4 font-medium text-[#0A1628]">{String(firm.firm_name ?? "—")}</td>
                    <td className="px-5 py-4 text-gray-600">{String(firm.contact_person ?? "—")}</td>
                    <td className="px-5 py-4 text-gray-600">{String(firm.email ?? "—")}</td>
                    <td className="px-5 py-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-50 text-violet-700">
                        {String(firm.city ?? "—")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500">{String(firm.phone ?? "—")}</td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {firm.registered_at ? fmt(String(firm.registered_at)) : "—"}
                    </td>
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
