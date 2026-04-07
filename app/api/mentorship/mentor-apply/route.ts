import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { MentorApplication } from '@/lib/types/mentorship'

const FILE_PATH = path.join(process.cwd(), 'data', 'mentor-applications.json')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, linkedIn, city, designation, organisation, organisationType, yearsExperience, membershipNumber, specialisations, careerHighlights, mentoringAreas, weeklySlots, sessionFormat, maxSessionsPerWeek, languages } = body

    if (!name || !email || !linkedIn || !city || !designation || !organisation || !membershipNumber) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const entry: MentorApplication = {
      id: `ma_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name,
      email,
      phone: body.phone || undefined,
      linkedIn,
      city,
      photoUrl: body.photoUrl || undefined,
      designation,
      organisation,
      organisationType,
      yearsExperience,
      membershipNumber,
      specialisations: specialisations || [],
      careerHighlights,
      mentoringAreas: mentoringAreas || [],
      weeklySlots: weeklySlots || [],
      sessionFormat,
      maxSessionsPerWeek,
      languages: languages || [],
      noteToStudents: body.noteToStudents || undefined,
      status: 'pending_review',
      appliedAt: new Date().toISOString(),
    }

    let existing: MentorApplication[] = []
    if (fs.existsSync(FILE_PATH)) {
      existing = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'))
    }
    existing.push(entry)
    fs.writeFileSync(FILE_PATH, JSON.stringify(existing, null, 2))

    return NextResponse.json({ success: true, id: entry.id })
  } catch (err) {
    console.error('[mentor-apply] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
