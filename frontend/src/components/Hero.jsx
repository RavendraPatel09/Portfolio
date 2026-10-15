import { lazy, Suspense, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'

const HeroScene = lazy(() => import('./HeroScene.jsx'))

const ROLES = [
  'Passionate Developer 💻',
  'Problem Solver 🧠',
  'Future Tech Innovator 🚀',
  'Gen AI Enthusiast 🤖',
]

function HeroBgFallback() {
  return (
    <div
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_20%,rgba(0,255,157,0.14),transparent_45%),radial-gradient(ellipse_at_75%_70%,rgba(0,180,255,0.12),transparent_40%)]"
      aria-hidden
    />
  )
}

function Typewriter() {
  const [line, setLine] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const full = ROLES[line % ROLES.length]
    let id

    if (phase === 'typing') {
      if (text.length < full.length) {
        id = setTimeout(() => setText(full.slice(0, text.length + 1)), 78)
      } else {
        id = setTimeout(() => setPhase('deleting'), 1400)
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        id = setTimeout(() => setText(full.slice(0, text.length - 1)), 42)
      } else {
        setLine((l) => l + 1)
        setPhase('typing')
      }
    }

    return () => clearTimeout(id)
  }, [text, phase, line])

  return <span className="type-caret text-[var(--electric)]">{text}</span>
}

function MagneticCTA({ children, onClick, href, download }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.28)
  const common =
    'neon-glow-hover inline-flex cursor-pointer items-center justify-center rounded-xl border border-[var(--neon)]/35 bg-[var(--neon)]/10 px-7 py-3.5 text-sm font-semibold text-[var(--neon)] shadow-[0_0_24px_rgba(0,255,157,0.12)] transition hover:bg-[var(--neon)]/15'

  return (
    <span ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="inline-block">
      {href ? (
        <motion.a href={href} download={download} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className={common}>
          {children}
        </motion.a>
      ) : (
        <motion.button type="button" onClick={onClick} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className={common}>
          {children}
        </motion.button>
      )}
    </span>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const [show3d, setShow3d] = useState(false)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onScroll = () => {
      const y = window.scrollY
      el.style.setProperty('--py', `${y * 0.12}px`)
      el.style.setProperty('--py2', `${y * 0.06}px`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setShow3d(true), 100)
    return () => clearTimeout(t)
  }, [])

  const goProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[var(--bg)] pt-28"
    >
      <div className="pointer-events-none absolute inset-0 z-0 min-h-full">
        <HeroBgFallback />
        {show3d && (
          <Suspense fallback={null}>
            <div className="absolute inset-0 opacity-90">
              <HeroScene />
            </div>
          </Suspense>
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[var(--bg)]/30 via-transparent to-[var(--bg)]"
        style={{ transform: 'translateY(var(--py, 0px))' }}
      />

      <div
        className="relative z-10 mx-auto flex max-w-6xl flex-col px-6 pb-28 pt-8 sm:px-8"
        style={{ transform: 'translateY(var(--py2, 0px))' }}
      >
        <p className="mb-4 font-mono text-sm text-[var(--electric)]">@RavendraPatel09</p>

        <h1
          className="glitch font-display text-4xl font-bold leading-tight text-[var(--text)] sm:text-5xl md:text-6xl lg:text-7xl"
          data-text={"Hi, I'm Ravendra Patel 👋"}
        >
          Hi, I&apos;m Ravendra Patel 👋
        </h1>

        <div className="mt-6 min-h-[2.75rem] font-display text-xl text-[var(--text-muted)] sm:text-2xl">
          <Typewriter />
        </div>

        <p className="mt-4 max-w-2xl text-lg text-[var(--text-muted)] sm:text-xl">
          Engineering the Future | Scalable Solutions &amp; Generative AI
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticCTA onClick={goProjects}>View My Work</MagneticCTA>
          <MagneticCTA href="./resume.pdf" download>
            Download Resume
          </MagneticCTA>
        </div>
      </div>

      <button
        type="button"
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[var(--text-muted)]"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to about"
      >
        <span className="text-xs font-medium tracking-widest">SCROLL</span>
        <ChevronDown className="h-6 w-6 animate-bounce text-[var(--neon)]" />
      </button>
    </section>
  )
}
