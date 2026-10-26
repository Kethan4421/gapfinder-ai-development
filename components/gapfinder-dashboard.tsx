'use client'

import { useRef, useState } from 'react'
import { AiTutor } from './ai-tutor'
import {
  ArrowUpRight,
  BookOpen,
  Brain,
  Check,
  ChevronDown,
  CircleHelp,
  FileText,
  Flame,
  LayoutDashboard,
  Lightbulb,
  ListChecks,
  Menu,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Target,
  Upload,
  X,
  Zap,
} from 'lucide-react'

type Topic = {
  name: string
  chapter: string
  score: number
  status: 'weak' | 'medium' | 'strong'
  color: string
}

const topics: Topic[] = [
  { name: 'Quadratic equations', chapter: 'Algebra · Ch 2', score: 38, status: 'weak', color: '#e17b58' },
  { name: 'Differentiation rules', chapter: 'Calculus · Ch 5', score: 54, status: 'medium', color: '#d2a54a' },
  { name: 'Trigonometric identities', chapter: 'Trigonometry · Ch 3', score: 61, status: 'medium', color: '#d2a54a' },
  { name: 'Limits & continuity', chapter: 'Calculus · Ch 4', score: 76, status: 'strong', color: '#579581' },
]

const plan = [
  { day: 'Today', date: 'Oct 26', title: 'Quadratic equations', detail: '8 questions · 25 min', tone: 'terracotta', icon: Target },
  { day: 'Tomorrow', date: 'Oct 27', title: 'Differentiation rules', detail: 'Review + 6 questions · 30 min', tone: 'gold', icon: BookOpen },
  { day: 'Wed', date: 'Oct 28', title: 'Mixed checkpoint', detail: '12 questions · 20 min', tone: 'sage', icon: Zap },
]

const learningFeatures = [
  { title: 'Material upload', detail: 'Add your syllabus, notes and past papers.', icon: Upload, tone: 'terracotta' },
  { title: 'Topic map', detail: 'See every chapter and topic in one place.', icon: ListChecks, tone: 'gold' },
  { title: 'Diagnostic quiz', detail: 'Try questions made from your own material.', icon: Brain, tone: 'sage' },
  { title: 'Gap report', detail: 'Know what needs work and why.', icon: Target, tone: 'terracotta' },
  { title: 'Revision plan', detail: 'Get a simple plan for the time you have.', icon: BookOpen, tone: 'gold' },
  { title: 'Explain a topic', detail: 'Ask for help with answers from your notes.', icon: Lightbulb, tone: 'sage' },
  { title: 'Progress dashboard', detail: 'Watch your confidence grow over time.', icon: Sparkles, tone: 'terracotta' },
]

function StatusPill({ status }: { status: Topic['status'] }) {
  const labels = { weak: 'Needs work', medium: 'Building', strong: 'On track' }
  return <span className={`status-pill ${status}`}>{labels[status]}</span>
}

export default function GapFinderDashboard() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [showUpload, setShowUpload] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showAllTopics, setShowAllTopics] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [toast, setToast] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  return (
    <div className="app-shell">
      <aside className={showMobileNav ? 'sidebar mobile-open' : 'sidebar'}>
        <div className="brand-mark"><span className="brand-glyph">g</span><span>gapfinder</span><span className="brand-ai">AI</span><button className="mobile-close" aria-label="Close menu" onClick={() => setShowMobileNav(false)}><X size={17} /></button></div>
        <div className="workspace-switcher"><div className="workspace-avatar">AM</div><div><strong>Maya Sharma</strong><span>Mathematics · Class 7</span></div><ChevronDown size={15} /></div>
        <nav className="primary-nav" aria-label="Main navigation">
          {[{ label: 'Overview', icon: LayoutDashboard }, { label: 'My topics', icon: ListChecks }, { label: 'Revision plan', icon: Target }, { label: 'Materials', icon: FileText }].map(({ label, icon: Icon }) => (
            <button key={label} className={activeNav === label ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveNav(label); notify(`${label} view selected`) }}><Icon size={18} /><span>{label}</span>{label === 'My topics' && <span className="nav-count">12</span>}</button>
          ))}
        </nav>
        <div className="sidebar-bottom"><button className="nav-item" onClick={() => notify('Settings are ready for your next update')}><Settings2 size={18} /><span>Settings</span></button><div className="help-card"><CircleHelp size={17} /><div><strong>Need a hand?</strong><span>See how GapFinder works</span></div><ArrowUpRight size={15} /></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" aria-label="Open menu" aria-expanded={showMobileNav} onClick={() => setShowMobileNav((value) => !value)}><Menu size={21} /></button><div className="breadcrumb"><span>Workspace</span><span>/</span><strong>{activeNav}</strong></div><div className="topbar-actions"><button className="icon-button" aria-label="Search" onClick={() => notify('Search is ready for your topics and materials')}><Search size={18} /></button><button className="profile-button" onClick={() => notify('Maya Sharma · Class 7')}><span className="profile-avatar">AM</span><ChevronDown size={14} /></button></div></header>

        <div className="content-wrap">
          <section className="welcome-row"><div><p className="eyebrow">Monday, October 26, 2026</p><h1>Good morning, Maya.</h1><p className="intro">Let&apos;s see what you know and what to practise next.</p></div><button className="upload-button" onClick={() => setShowUpload(true)}><Plus size={17} /> Add material</button></section>

          <section className="diagnosis-banner"><div className="banner-icon"><Brain size={25} /></div><div className="banner-copy"><div className="banner-kicker"><span className="live-dot" /> Diagnosis updated 2 hours ago</div><h2>Your next best move is clear.</h2><p>You already know some of this chapter. Spend a little more time on <strong>Quadratic equations</strong> — this is the topic that can grow fastest.</p></div><button className="banner-action" onClick={() => notify('Starting your focused practice')}>Start focused practice <ArrowUpRight size={16} /></button></section>

          <div className="stat-grid"><div className="stat-card"><div className="stat-top"><span>Overall mastery</span><Sparkles size={17} /></div><strong className="stat-value">64<span>%</span></strong><div className="progress-track"><div className="progress-fill sage-fill" style={{ width: '64%' }} /></div><p><span className="positive">+8%</span> since your last check-in</p></div><div className="stat-card"><div className="stat-top"><span>Topics mapped</span><BookOpen size={17} /></div><strong className="stat-value">12</strong><p>Across 4 syllabus chapters</p><button className="text-link" onClick={() => setActiveNav('My topics')}>View topic map <ArrowUpRight size={14} /></button></div><div className="stat-card"><div className="stat-top"><span>Study streak</span><Flame size={17} /></div><strong className="stat-value">6 <span className="stat-unit">days</span></strong><p>Best streak: 12 days</p><button className="text-link" onClick={() => notify('Keep your streak going tomorrow')}>Keep it going <ArrowUpRight size={14} /></button></div></div>

          <div className="section-grid"><section className="panel topics-panel"><div className="panel-heading"><div><p className="eyebrow">Your diagnosis</p><h2>Topic mastery</h2></div><button className="ghost-button" onClick={() => setShowAllTopics(!showAllTopics)}>{showAllTopics ? 'Show less' : 'See all topics'} <ArrowUpRight size={14} /></button></div><div className="legend"><span><i className="legend-dot weak-dot" /> Needs work</span><span><i className="legend-dot medium-dot" /> Building</span><span><i className="legend-dot strong-dot" /> On track</span></div><div className="topic-list">{(showAllTopics ? [...topics, { name: 'Sequences & series', chapter: 'Algebra · Ch 6', score: 69, status: 'medium' as const, color: '#d2a54a' }, { name: 'Probability basics', chapter: 'Statistics · Ch 7', score: 82, status: 'strong' as const, color: '#579581' }] : topics).map((topic) => <div className="topic-row" key={topic.name}><div className="topic-name"><span className="topic-status" style={{ background: topic.color }} /><div><strong>{topic.name}</strong><span>{topic.chapter}</span></div></div><div className="topic-score"><div className="mini-track"><div style={{ width: `${topic.score}%`, background: topic.color }} /></div><strong>{topic.score}%</strong><StatusPill status={topic.status} /></div></div>)}</div></section><section className="panel plan-panel"><div className="panel-heading"><div><p className="eyebrow">Adaptive schedule</p><h2>Revision plan</h2></div><button className="more-button" aria-label="More options" onClick={() => notify('Revision plan options opened')}>•••</button></div><div className="plan-date"><span>This week</span><span className="date-range">Oct 26 — Nov 1</span></div><div className="plan-list">{plan.map(({ day, date, title, detail, tone, icon: Icon }) => <button className="plan-item" key={title} onClick={() => notify(`Opening ${title}`)}><div className={`plan-icon ${tone}`}><Icon size={17} /></div><div className="plan-copy"><span className="plan-day">{day} <em>{date}</em></span><strong>{title}</strong><span>{detail}</span></div><ArrowUpRight className="plan-arrow" size={15} /></button>)}</div><button className="full-plan-button" onClick={() => setActiveNav('Revision plan')}>Open full plan <ArrowUpRight size={15} /></button></section></div>

          <section className="feature-hub"><div className="panel-heading"><div><p className="eyebrow">Everything you need to improve</p><h2>Your learning toolkit</h2></div><span className="feature-note">Made for Classes 1–10</span></div><div className="feature-grid">{learningFeatures.map(({ title, detail, icon: Icon, tone }) => <button className="feature-card" key={title} onClick={() => title === 'Diagnostic quiz' ? setShowQuiz(true) : notify(`${title} opened`)}><span className={`feature-icon ${tone}`}><Icon size={18} /></span><span className="feature-card-copy"><strong>{title}</strong><span>{detail}</span></span><ArrowUpRight size={15} className="feature-arrow" /></button>)}</div></section>

          <section className="bottom-grid"><div className="insight-card"><div className="insight-icon"><Lightbulb size={19} /></div><div><p className="eyebrow">A useful pattern</p><h3>You know the rule — applying it is the gap.</h3><p>Your last 8 answers show strong recall of formulas, but errors happen when choosing which one to use. Your next practice set will focus on that decision.</p><button className="text-link" onClick={() => notify('Opening answer patterns')}>See answer patterns <ArrowUpRight size={14} /></button></div></div><div className="checkin-card"><div className="checkin-header"><div className="checkin-icon"><Check size={18} /></div><div><p className="eyebrow">Quick check-in</p><h3>How are you feeling about math today?</h3></div></div><div className="feeling-options"><button onClick={() => notify('Check-in saved: confident')}>Confident</button><button onClick={() => notify('Check-in saved: okay')}>Okay</button><button onClick={() => notify('Check-in saved: unsure')}>Unsure</button></div></div></section>
        </div>
      </main>

      {showUpload && <div className="modal-backdrop" onClick={() => setShowUpload(false)}><div className="upload-modal" role="dialog" aria-modal="true" aria-labelledby="upload-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowUpload(false)} aria-label="Close"><X size={18} /></button><div className="modal-symbol"><Upload size={22} /></div><p className="eyebrow">Grow your diagnosis</p><h2 id="upload-title">Add study material</h2><p>Upload a syllabus, chapter notes, or past paper. GapFinder will map it into topics for your next assessment.</p><input ref={fileInputRef} className="sr-only" type="file" accept=".pdf,.docx,.txt" onChange={(event) => { const file = event.target.files?.[0]; if (file) notify(`${file.name} selected`) }} /><button className="dropzone" onClick={() => fileInputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); const file = event.dataTransfer.files[0]; if (file) notify(`${file.name} selected`) }}><Upload size={20} /><strong>Drop files here or browse</strong><span>PDF, DOCX, TXT up to 20MB</span></button><button className="modal-secondary" onClick={() => setShowUpload(false)}>Maybe later</button></div></div>}
      {showQuiz && <div className="modal-backdrop" onClick={() => setShowQuiz(false)}><div className="upload-modal quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowQuiz(false)} aria-label="Close quiz"><X size={18} /></button><div className="modal-symbol sage"><Brain size={22} /></div><p className="eyebrow">Find your gaps</p><h2 id="quiz-title">Diagnostic quiz</h2><p>Answer a few questions from your study material to see what to practise next.</p><div className="quiz-question"><span>Question 1 of 5</span><strong>Which topic would you like to check first?</strong><button onClick={() => { setShowQuiz(false); notify('Quiz started for Quadratic equations') }}>Quadratic equations</button><button onClick={() => { setShowQuiz(false); notify('Quiz started for Differentiation rules') }}>Differentiation rules</button></div><button className="modal-secondary" onClick={() => setShowQuiz(false)}>Maybe later</button></div></div>}
      {toast && <div className="toast" role="status"><Check size={16} />{toast}</div>}
      <AiTutor />
    </div>
  )
}
