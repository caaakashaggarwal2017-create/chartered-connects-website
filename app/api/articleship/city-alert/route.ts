import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/utils/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, city } = body

    if (!email || !city) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { error } = await supabase.from("city_alerts").insert({
      email,
      city,
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[city-alert] Supabase error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

    console.log(`[city-alert] New city alert: ${city} for ${email}`)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[city-alert] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
