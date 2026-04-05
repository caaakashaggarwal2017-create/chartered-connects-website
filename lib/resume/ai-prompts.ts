export function summaryPrompt(content: string, context: Record<string, unknown>): string {
  return `You are a professional CA resume writer specialising in Indian Chartered Accountant resumes.
Improve this professional summary for a CA:

Current summary: "${content}"
Context: ${JSON.stringify(context)}

Write an improved 2-3 sentence professional summary that:
- Starts with "CA qualified" or their CA designation
- Mentions years of experience and key specialisations
- Includes a quantifiable achievement if possible
- Is appropriate for Indian CA job applications
- Is 50-120 words

Return ONLY the improved summary text, nothing else.`
}

export function experienceBulletsPrompt(content: string, context: Record<string, unknown>): string {
  return `You are a professional CA resume writer.
Improve these job responsibility bullet points for an Indian CA resume:

Current bullets: "${content}"
Role: ${(context as any).role} at ${(context as any).company}
Target role: ${(context as any).targetRole}

Rewrite as 3-5 strong bullet points that:
- Start with strong action verbs (Led, Managed, Delivered, Executed, Streamlined)
- Include quantifiable metrics where possible (number of clients, turnover amounts, compliance rates)
- Are specific to CA work (audits, returns, filings, assessments)
- Use Indian financial context (₹ for amounts, ICAI standards, relevant Indian regulations)

Return ONLY the bullet points, one per line starting with •, nothing else.`
}

export function fullAnalysisPrompt(content: string): string {
  return `You are an expert CA resume reviewer for Indian Chartered Accountant positions.
Analyse this resume text and provide structured feedback:

Resume text: "${content}"

Provide a JSON response with this exact structure:
{
  "score": <number 0-100>,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": [
    {
      "section": "section name",
      "issue": "what's wrong",
      "suggestion": "specific improvement",
      "priority": "high|medium|low"
    }
  ],
  "missingElements": ["missing element 1", "missing element 2"],
  "summary": "2-sentence overall assessment"
}

Focus on: professional summary quality, experience descriptions, CA-specific achievements, skills completeness, formatting and structure.
Return ONLY valid JSON, no other text.`
}
