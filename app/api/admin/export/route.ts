import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/utils/supabase"

type Row = Record<string, unknown>

function toCSV(rows: Row[]): string {
  if (rows.length === 0) return ""
  const headers = Object.keys(rows[0])
  const escape = (val: unknown) => {
    const s = val === null || val === undefined ? "" : String(val)
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"`
      : s
  }
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ]
  return lines.join("\n")
}

const TYPE_MAP: Record<string, string> = {
  subscribers: "subscribers",
  applications: "applications",
  firms: "firm_registrations",
  "city-alerts": "city_alerts",
  "podcast-guests": "guest_applications",
}

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") ?? ""
  const table = TYPE_MAP[type]

  if (!table) {
    return NextResponse.json({ error: "Unknown export type." }, { status: 400 })
  }

  const { data, error } = await supabase.from(table).select("*").order("id", { ascending: true })

  if (error) {
    console.error("[export] Supabase error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }

  const csv = toCSV((data as Row[]) ?? [])

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${type}-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
