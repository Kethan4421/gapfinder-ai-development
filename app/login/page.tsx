'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, BookOpen, Loader2, LockKeyhole, Mail } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsLoading(true)
    const result = await authClient.signIn.email({ email, password })
    if (result.error) {
      setError('That email or password does not match. Try again.')
      setIsLoading(false)
      return
    }
    router.push('/')
    router.refresh()
  }

  return (
    <main className="auth-page">
      <section className="auth-visual" aria-label="GapFinder introduction">
        <Link href="/" className="brand-lockup">
          <span className="brand-mark"><BookOpen aria-hidden="true" /></span>
          <span>GapFinder <em>AI</em></span>
        </Link>
        <div className="auth-visual-copy">
          <p className="eyebrow">Your learning compass</p>
          <h1>Know what to learn next.</h1>
          <p>Turn schoolwork into a clear, friendly plan that grows with you.</p>
        </div>
        <div className="auth-orbit" aria-hidden="true"><span>Focus</span><span>Practice</span><span>Grow</span></div>
      </section>
      <section className="auth-panel">
        <div className="auth-form-wrap">
          <p className="eyebrow">Welcome back</p>
          <h2>Log in to GapFinder</h2>
          <p className="auth-subtitle">Pick up your learning journey right where you left off.</p>
          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="email"><span><Mail aria-hidden="true" /> Email address</span><input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
            <label htmlFor="password"><span><LockKeyhole aria-hidden="true" /> Password</span><input id="password" type="password" autoComplete="current-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" /></label>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button type="submit" className="auth-submit" disabled={isLoading}>{isLoading ? <Loader2 className="spin" aria-hidden="true" /> : <ArrowRight aria-hidden="true" />} {isLoading ? 'Logging in…' : 'Log in'}</button>
          </form>
          <p className="auth-switch">New to GapFinder? <Link href="/signup">Create an account</Link></p>
        </div>
      </section>
    </main>
  )
}
