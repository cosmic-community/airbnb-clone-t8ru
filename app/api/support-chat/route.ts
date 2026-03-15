import { NextRequest, NextResponse } from 'next/server'

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
    const agentEndpoint = process.env.COSMIC_AGENT_ENDPOINT

    if (!token || !agentEndpoint) {
      console.error('Support chat misconfigured:', {
        hasToken: !!token,
        hasEndpoint: !!agentEndpoint,
      })
      return NextResponse.json(
        { message: 'Support chat is not configured. Please set COSMIC_AGENT_TOKEN and COSMIC_AGENT_ENDPOINT environment variables.' },
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

    const agentRes = await fetch(agentEndpoint, {
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

      // Provide a more specific message for auth errors
      if (agentRes.status === 401 || agentRes.status === 403) {
        return NextResponse.json(
          { message: 'Support agent authentication failed. Please verify your COSMIC_AGENT_TOKEN is correct and the COSMIC_AGENT_ENDPOINT is up to date.' },
          { status: 502 }
        )
      }

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