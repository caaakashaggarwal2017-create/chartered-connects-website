import { supabase } from "@/lib/utils/supabase"
import { Bell, Download } from "lucide-react"
import Link from "next/link"

type CityAlert = Record<string, unknown>

async function getCityAlerts(): Promise<CityAlert[]> {
  const { data, error } = await supabase
    .from("city_alerts")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) {
    console.error("[admin/city-alerts]", error)
    return []
  }
  return (data ?? []) as CityAlert[]
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  })
}

export default async function CityAlertsPage() {
  const alerts = await getCityAlerts()

  // Count by city
  const cityCounts: Record<string, number> = {}
  for (const a of alerts) {
    const city = String(a.city ?? "Unknown")
    cityCounts[city] = (cityCounts[city] ?? 0) + 1
  }
  const cityRanking = Object.entries(cityCounts).sort((a, b) => b[1] - a[1])

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bell size={20} className="text-orange-500" />
            <h1 className="text-2xl font-bold text-[#0A1628]">City Alert Subscriptions</h1>
          </div>
          <p className="text-gray-500 text-sm">
            {alerts.length} total subscriptions across {Object.keys(cityCounts).length} cities
          </p>
        </div>
        <Link
          href="/api/admin/export?type=city-alerts"
          className="flex items-center gap-2 px-4 py-2 bg-[#0A1628] text-white rounded-lg text-sm font-medium hover:bg-[#0d1f38] transition"
        >
          <Download size={15} />
          Export CSV
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {alerts.length === 0 ? (
            <div className="px-6 py-20 text-center text-gray-400">
              <Bell size={36} className="mx-auto mb-3 text-gray-300" />
              <p className="font-medium text-gray-500">No city alert subscriptions yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["#", "Email", "City", "Signed Up"].map((h) => (
                      <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {alerts.map((alert, i) => (
                    <tr key={String(alert.id ?? i)} className="hover:bg-gray-50/50 transition">
                      <td className="px-5 py-4 text-gray-400">{i + 1}</td>
                      <td className="px-5 py-4 font-medium text-[#0A1628]">{String(alert.email ?? "—")}</td>
                      <td className="px-5 py-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                          {String(alert.city ?? "—")}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-500">
                        {alert.created_at ? fmt(String(alert.created_at)) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* City breakdown */}
        {cityRanking.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-[#0A1628]">By City</h2>
            </div>
            <ul className="divide-y divide-gray-50">
              {cityRanking.map(([city, count]) => (
                <li key={city} className="px-5 py-3 flex items-center justify-between">
                  <span className="text-sm text-gray-700">{city}</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-1.5 rounded-full bg-orange-400"
                      style={{ width: `${Math.max(20, (count / alerts.length) * 80)}px` }}
                    />
                    <span className="text-sm font-semibold text-[#0A1628] w-6 text-right">{count}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
