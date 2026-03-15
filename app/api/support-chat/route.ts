import { NextRequest, NextResponse } from 'next/server'

const AGENT_ENDPOINT =
  'https://9e42-2601-644-8403-4910-392a-9efc-1678-cf8c.ngrok-free.app/v3/ai/agents/69b6eb1fd724d895912ac0d8/messages?slug=airbnb-clone-production-34aa8320-2092-11f1-8afd-056869ae5cc3'

interface AgentResponse {
  message?: string
  content?: string
  response?: string
  data?: {
    message?: string
    content?: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = process.env.COSMIC_AGENT_TOKEN

    if (!token) {
      return NextResponse.json(
        { message: 'Support chat is not configured.' },
        { status: 503 }
      )
    }

    const body = (await request.json()) as { message?: string }
    const userMessage = body.message

    if (!userMessage || typeof userMessage !== 'string' || !userMessage.trim()) {
      return NextResponse.json(
        { message: 'Message is required.' },
        { status: 400 }
      )
    }

    const agentRes = await fetch(AGENT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: userMessage.trim() }),
    })

    if (!agentRes.ok) {
      const errorText = await agentRes.text()
      console.error('Agent API error:', agentRes.status, errorText)
      return NextResponse.json(
        { message: 'Sorry, the support agent is unavailable right now. Please try again later.' },
        { status: 502 }
      )
    }

    const data = (await agentRes.json()) as AgentResponse

    // Extract the message from various possible response formats
    const reply =
      data.message ||
      data.content ||
      data.response ||
      data.data?.message ||
      data.data?.content ||
      'Sorry, I could not process that request.'

    return NextResponse.json({ message: reply })
  } catch (error) {
    console.error('Support chat error:', error)
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}