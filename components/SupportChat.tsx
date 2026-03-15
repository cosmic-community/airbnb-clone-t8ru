'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/support-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })

      if (!res.ok) {
        throw new Error('Failed to get response')
      }

      const data = await res.json() as { message?: string }
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.message || 'Sorry, I could not process that request.',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button - Changed: explicit inline backgroundColor #FF385C to guarantee visibility */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 left-5 w-14 h-14 rounded-full text-white shadow-lg transition-all duration-200 flex items-center justify-center"
        style={{
          zIndex: 9999,
          backgroundColor: '#FF385C',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d70466' }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FF385C' }}
        aria-label={isOpen ? 'Close support chat' : 'Open support chat'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Panel - Changed: explicit inline styles for bg-white and full layout */}
      {isOpen && (
        <div
          className="fixed bottom-24 left-5 w-[360px] max-w-[calc(100vw-40px)] rounded-2xl shadow-2xl border border-gray-200"
          style={{
            zIndex: 9999,
            height: '500px',
            maxHeight: 'calc(100vh - 120px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
          }}
        >
          {/* Header - Changed: explicit inline backgroundColor #FF385C and rounded top corners */}
          <div
            className="px-5 py-4 flex items-center gap-3"
            style={{
              flexShrink: 0,
              minHeight: '60px',
              backgroundColor: '#FF385C',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h3 style={{ color: '#ffffff', fontWeight: 600, fontSize: '14px', margin: 0 }}>StayBnB Support</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', margin: 0 }}>We typically reply instantly</p>
            </div>
          </div>

          {/* Messages area - Changed: explicit inline backgroundColor for message area */}
          <div
            className="overflow-y-auto px-4 py-4 space-y-3"
            style={{
              flex: '1 1 0%',
              minHeight: 0,
              backgroundColor: '#f9fafb',
            }}
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: 'rgba(255, 56, 92, 0.1)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF385C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <p style={{ color: '#222222', fontWeight: 500, fontSize: '14px' }}>How can we help?</p>
                <p style={{ color: '#717171', fontSize: '12px', marginTop: '4px' }}>
                  Ask about listings, bookings, hosting, or anything else.
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Changed: explicit inline backgroundColor on chat bubbles */}
                <div
                  className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                  style={
                    msg.role === 'user'
                      ? {
                          backgroundColor: '#FF385C',
                          color: '#ffffff',
                          borderBottomRightRadius: '6px',
                        }
                      : {
                          backgroundColor: '#ffffff',
                          color: '#222222',
                          border: '1px solid #e5e7eb',
                          borderBottomLeftRadius: '6px',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                        }
                  }
                >
                  {msg.role === 'assistant' ? (
                    <div className="chat-markdown">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl px-4 py-3"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#717171',
                    border: '1px solid #e5e7eb',
                    borderBottomLeftRadius: '6px',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area - Changed: explicit inline backgroundColor white and border */}
          <div
            className="px-4 py-3"
            style={{
              flexShrink: 0,
              minHeight: '60px',
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e5e7eb',
            }}
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 max-h-24"
                style={{
                  color: '#222222',
                  borderColor: '#d1d5db',
                }}
              />
              {/* Changed: explicit inline backgroundColor #FF385C on send button */}
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                style={{ backgroundColor: '#FF385C' }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#d70466'
                }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FF385C' }}
                aria-label="Send message"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}