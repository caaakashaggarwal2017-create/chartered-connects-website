import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address' }, { status: 400 })
    }

    // Upsert into subscribers — on conflict (existing email) do nothing, still succeed
    const { error } = await supabase
      .from('subscribers')
      .upsert(
        { email: email.trim().toLowerCase(), first_name: name.trim() },
        { onConflict: 'email', ignoreDuplicates: true }
      )

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 })
  }
}
