import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { SessionRequest } from '@/lib/types/mentorship'

const FILE_PATH = path.join(process.cwd(), 'data', 'session-requests.json')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { mentorId, mentorName, slotId, slotDetails, studentName, studentEmail, studentPhone, studentLevel, topic, goal, linkedIn } = body

    if (!mentorId || !slotId || !studentName || !studentEmail || !studentLevel || !topic) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const entry: SessionRequest = {
      id: `sr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      mentorId,
      mentorName,
      slotId,
      slotDetails,
      studentName,
      studentEmail,
      studentPhone: studentPhone || undefined,
      studentLevel,
      topic,
      goal: goal || undefined,
      linkedIn: linkedIn || undefined,
      status: 'pending',
      requestedAt: new Date().toISOString(),
    }

    let existing: SessionRequest[] = []
    if (fs.existsSync(FILE_PATH)) {
      existing = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'))
    }
    existing.push(entry)
    fs.writeFileSync(FILE_PATH, JSON.stringify(existing, null, 2))

    return NextResponse.json({ success: true, id: entry.id })
  } catch (err) {
    console.error('[request-session] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
