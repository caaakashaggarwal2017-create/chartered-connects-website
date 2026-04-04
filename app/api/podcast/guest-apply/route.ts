import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/utils/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { error } = await supabase.from("guest_applications").insert({
      name: body.name,
      email: body.email,
      phone: body.phone,
      designation: body.designation,
      company: body.company,
      linkedin_url: body.linkedinUrl,
      topic_idea: body.topicIdea,
      years_experience: body.yearsExperience,
      availability: body.availability,
      applied_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[podcast-guest] Supabase error:", error)
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
    }

    console.log("[podcast-guest] New guest application from:", body.email)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[PODCAST GUEST APPLY ERROR]", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
