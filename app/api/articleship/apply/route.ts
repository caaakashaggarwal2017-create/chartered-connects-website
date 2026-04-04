import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { supabase } from "@/lib/utils/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      firmId, firmName, studentName, email, phone, caLevel,
      currentStatus, startPreference, previousArticleship,
      previousFirm, transferReason, whyThisFirm,
      specialisationInterest, cvFileName,
    } = body

    if (!email || !studentName || !firmId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const applicationId = uuidv4()

    const { error } = await supabase.from("applications").insert({
      application_id: applicationId,
      firm_id: firmId,
      firm_name: firmName,
      student_name: studentName,
      email,
      phone,
      ca_level: caLevel,
      current_status: currentStatus,
      start_preference: startPreference,
      previous_articleship: previousArticleship,
      previous_firm: previousFirm,
      transfer_reason: transferReason,
      why_this_firm: whyThisFirm,
      specialisation_interest: specialisationInterest,
      cv_file_name: cvFileName,
      applied_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[apply] Supabase error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

    console.log(`[apply] New application ${applicationId} for ${firmName} from ${email}`)
    return NextResponse.json({ success: true, applicationId })
  } catch (error) {
    console.error("[apply] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
