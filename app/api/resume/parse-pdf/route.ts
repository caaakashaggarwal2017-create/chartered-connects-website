export const runtime = 'nodejs'

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()

    if (file.name.endsWith('.pdf')) {
      const pdfModule = await import('pdf-parse')
      const pdfParse = (pdfModule as any).default ?? pdfModule
      const data = await pdfParse(Buffer.from(buffer))
      return NextResponse.json({ success: true, text: data.text, pages: data.numpages })
    }

    if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      const mammoth = await import('mammoth')
      const result = await mammoth.extractRawText({ buffer: Buffer.from(buffer) })
      return NextResponse.json({ success: true, text: result.value })
    }

    return NextResponse.json({ success: false, error: 'Unsupported file type. Use PDF or DOCX.' }, { status: 400 })
  } catch (error) {
    console.error('PDF parse error:', error)
    return NextResponse.json({ success: false, error: 'Failed to parse file' }, { status: 500 })
  }
}
