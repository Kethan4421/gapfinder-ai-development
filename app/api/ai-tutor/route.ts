import { gateway, streamText } from 'ai'

export async function POST(request: Request) {
  const body = await request.json()
  const messages = Array.isArray(body.messages) ? body.messages : []

  const result = streamText({
    model: gateway('google/gemini-2.5-flash'),
    system:
      'You are GapFinder AI, a warm and encouraging study coach for students in Classes 1–10. Explain ideas simply, use short steps, ask one helpful follow-up question when useful, and never shame the student. Focus on diagnosis: help identify what they understand and what needs practice. Use the student context when provided, but do not invent syllabus content.',
    messages: messages.slice(-12),
    maxOutputTokens: 500,
  })

  return result.toTextStreamResponse()
}
