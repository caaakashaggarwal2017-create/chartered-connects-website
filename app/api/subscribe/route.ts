import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/utils/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, firstName } = body

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    // Upsert — silently ignore duplicates (unique constraint on email)
    const { error } = await supabase
      .from("subscribers")
      .upsert(
        { email: email.toLowerCase().trim(), first_name: firstName || "", subscribed_at: new Date().toISOString() },
        { onConflict: "email", ignoreDuplicates: true }
      )

    if (error) {
      console.error("[subscribe] Supabase error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

    console.log(`[subscribe] New subscriber: ${email}`)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[subscribe] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
