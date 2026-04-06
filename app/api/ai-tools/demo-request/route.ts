import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const entry = {
      tool_id: body.toolId,
      tool_name: body.toolName,
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      designation: body.designation,
      organisation: body.organisation ?? null,
      goal: body.goal ?? null,
      team_size: body.teamSize ?? null,
    }

    // Try to save to Supabase demo_requests table; fall back gracefully
    try {
      const { error } = await supabase.from('demo_requests').insert(entry)
      if (error) {
        // Table may not exist yet — log and continue
        console.warn('[DEMO REQUEST] Supabase insert warning:', error.message)
      }
    } catch (dbErr) {
      console.warn('[DEMO REQUEST] DB error (non-fatal):', dbErr)
    }

    // Always log for visibility
    console.log('[NEW DEMO REQUEST]', JSON.stringify(entry))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Demo request error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
