import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/utils/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firmName, contactPerson, email, city, phone } = body

    if (!email || !firmName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { error } = await supabase.from("firm_registrations").insert({
      firm_name: firmName,
      contact_person: contactPerson,
      email,
      city,
      phone,
      registered_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[firm-register] Supabase error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

    console.log(`[firm-register] New firm registration: ${firmName} (${email})`)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[firm-register] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
