import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { summaryPrompt, experienceBulletsPrompt, fullAnalysisPrompt } from '@/lib/resume/ai-prompts'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: Request) {
  try {
    const { type, content, context } = await request.json()

    if (!content) {
      return NextResponse.json({ success: false, error: 'No content provided' }, { status: 400 })
    }

    const promptMap: Record<string, string> = {
      summary: summaryPrompt(content, context || {}),
      experience_bullets: experienceBulletsPrompt(content, context || {}),
      full_analysis: fullAnalysisPrompt(content),
    }

    const prompt = promptMap[type]
    if (!prompt) {
      return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 })
    }

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const result = message.content[0].type === 'text' ? message.content[0].text : ''

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('Resume enhance error:', error)
    return NextResponse.json({ success: false, error: 'Enhancement failed' }, { status: 500 })
  }
}
