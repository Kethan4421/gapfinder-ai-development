'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, BookOpen, Loader2, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setIsLoading(true)
    const result = await authClient.signUp.email({ name, email, password })
    if (result.error) { setError('We could not create that account. Check your details and try again.'); setIsLoading(false); return }
    router.push('/'); router.refresh()
  }

  return <main className="auth-page"><section className="auth-visual"><Link href="/" className="brand-lockup"><span className="brand-mark"><BookOpen aria-hidden="true" /></span><span>GapFinder <em>AI</em></span></Link><div className="auth-visual-copy"><p className="eyebrow">A smarter study habit</p><h1>Small steps.<br />Big confidence.</h1><p>Make every revision session count with a plan built around you.</p></div><div className="auth-orbit" aria-hidden="true"><span>Learn</span><span>Revise</span><span>Shine</span></div></section><section className="auth-panel"><div className="auth-form-wrap"><p className="eyebrow">Start learning smarter</p><h2>Create your account</h2><p className="auth-subtitle">Your personalized learning space is one step away.</p><form onSubmit={handleSubmit} className="auth-form"><label htmlFor="name"><span><UserRound aria-hidden="true" /> Your name</span><input id="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Maya Patel" /></label><label htmlFor="email"><span><Mail aria-hidden="true" /> Email address</span><input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label><label htmlFor="password"><span><LockKeyhole aria-hidden="true" /> Password</span><input id="password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" /></label>{error && <p className="auth-error" role="alert">{error}</p>}<button type="submit" className="auth-submit" disabled={isLoading}>{isLoading ? <Loader2 className="spin" aria-hidden="true" /> : <ArrowRight aria-hidden="true" />} {isLoading ? 'Creating account…' : 'Create account'}</button></form><p className="auth-switch">Already have an account? <Link href="/login">Log in</Link></p></div></section></main>
}
