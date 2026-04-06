import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const filePath = path.join(process.cwd(), 'data', 'demo-requests.json')

    let existing: object[] = []
    try {
      const raw = await fs.readFile(filePath, 'utf-8')
      existing = JSON.parse(raw)
    } catch {
      existing = []
    }

    const entry = {
      id: uuidv4(),
      toolId: body.toolId,
      toolName: body.toolName,
      name: body.name,
      email: body.email,
      phone: body.phone,
      designation: body.designation,
      organisation: body.organisation,
      goal: body.goal,
      teamSize: body.teamSize,
      requestedAt: new Date().toISOString(),
    }

    existing.push(entry)
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2))
    console.log('[NEW DEMO REQUEST]', entry)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Demo request error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
