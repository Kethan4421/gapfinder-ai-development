'use client'

import { FormEvent, useState } from 'react'
import { Brain, MessageCircle, Send, X } from 'lucide-react'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

export function AiTutor() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi Maya. I can explain a topic, make a quick practice question, or help find a gap in your understanding.' },
  ])

  async function sendMessage(event: FormEvent) {
    event.preventDefault()
    const text = input.trim()
    if (!text || loading) return
    const nextMessages = [...messages, { role: 'user' as const, content: text }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)
    try {
      const response = await fetch('/api/ai-tutor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: nextMessages }) })
      if (!response.ok || !response.body) throw new Error('Tutor unavailable')
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let answer = ''
      setMessages((current) => [...current, { role: 'assistant', content: '' }])
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        answer += decoder.decode(value, { stream: true })
        setMessages((current) => current.map((message, index) => index === current.length - 1 ? { ...message, content: answer } : message))
      }
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: 'I could not connect right now. Try again in a moment.' }])
    } finally {
      setLoading(false)
    }
  }

  return <>
    {open && <section className="ai-tutor-panel" aria-label="GapFinder AI tutor">
      <div className="ai-tutor-header"><div><span className="ai-tutor-icon"><Brain size={17} /></span><div><strong>GapFinder AI</strong><span>Study coach for Classes 1–10</span></div></div><button className="ai-tutor-close" onClick={() => setOpen(false)} aria-label="Close AI tutor"><X size={16} /></button></div>
      <div className="ai-tutor-messages">{messages.map((message, index) => <div className={`ai-tutor-message ${message.role}`} key={`${message.role}-${index}`}>{message.content || (loading ? 'Thinking…' : '')}</div>)}</div>
      <form className="ai-tutor-form" onSubmit={sendMessage}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about a topic..." aria-label="Ask GapFinder AI" disabled={loading} /><button type="submit" aria-label="Send message" disabled={loading || !input.trim()}><Send size={16} /></button></form>
    </section>}
    <button className="ai-tutor-launcher" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close GapFinder AI' : 'Open GapFinder AI'}><MessageCircle size={19} /><span>Ask GapFinder AI</span></button>
  </>
}
