import { lazy, Suspense, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, FileText } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'

const HeroScene = lazy(() => import('./HeroScene.jsx'))

const ROLES = [
  'Software Developer 💻',
  'Full-Stack & Systems Builder ⚙️',
  'Problem Solver & DSA Enthusiast ⚡',
  'Curious Learner & Builder 🚀',
]

function HeroBgFallback() {
  return (
    <div
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_20%,rgba(0,255,157,0.12),transparent_50%),radial-gradient(ellipse_at_75%_70%,rgba(0,180,255,0.1),transparent_45%)]"
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
        id = setTimeout(() => setText(full.slice(0, text.length + 1)), 70)
      } else {
        id = setTimeout(() => setPhase('deleting'), 1500)
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        id = setTimeout(() => setText(full.slice(0, text.length - 1)), 38)
      } else {
        setLine((l) => l + 1)
        setPhase('typing')
      }
    }

    return () => clearTimeout(id)
  }, [text, phase, line])

  return <span className="type-caret text-[var(--electric)]">{text}</span>
}

function MagneticPrimaryCTA({ children, onClick }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.25)
  return (
    <span ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="inline-block">
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[var(--neon)]/50 bg-[var(--neon)]/15 px-7 py-3.5 text-sm font-bold text-[var(--neon)] shadow-[0_0_28px_rgba(0,255,157,0.18)] transition-all duration-300 hover:bg-[var(--neon)]/25 hover:shadow-[0_0_40px_rgba(0,255,157,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)]"
      >
        <span>{children}</span>
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      </motion.button>
    </span>
  )
}

function MagneticSecondaryCTA({ children, href, download }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.25)
  return (
    <span ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="inline-block">
      <motion.a
        href={href}
        download={download}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="glass group inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--bg)]/40 px-7 py-3.5 text-sm font-semibold text-[var(--text)] transition-all duration-300 hover:border-[var(--electric)]/40 hover:text-[var(--electric)] hover:shadow-[0_0_24px_rgba(0,180,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--electric)]"
      >
        <FileText size={16} className="text-[var(--text-muted)] transition-colors group-hover:text-[var(--electric)]" />
        <span>{children}</span>
      </motion.a>
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
      el.style.setProperty('--py2', `${y * 0.05}px`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setShow3d(true), 80)
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
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[var(--bg)]/20 via-transparent to-[var(--bg)]"
        style={{ transform: 'translateY(var(--py, 0px))' }}
      />

      <div
        className="relative z-10 mx-auto flex max-w-6xl flex-col px-6 pb-28 pt-8 sm:px-8"
        style={{ transform: 'translateY(var(--py2, 0px))' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 flex flex-wrap items-center gap-3"
        >
          <span className="font-mono text-sm font-semibold text-[var(--electric)]">@RavendraPatel09</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 px-3 py-1 text-xs font-semibold text-[var(--neon)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--neon)]" />
            CS Undergrad · OIST Bhopal &apos;28
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="glitch font-display text-4xl font-bold leading-tight tracking-tight text-[var(--text)] sm:text-5xl md:text-6xl lg:text-7xl"
          data-text={"Hi, I'm Ravendra Patel 👋"}
        >
          Hi, I&apos;m Ravendra Patel 👋
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 min-h-[2.75rem] font-display text-xl font-medium text-[var(--text-muted)] sm:text-2xl md:text-3xl"
        >
          <Typewriter />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg md:text-xl"
        >
          Building scalable applications, understanding system internals, and solving algorithmic problems. Passionate about engineering systems that connect intuitive frontends to robust backends.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticPrimaryCTA onClick={goProjects}>View My Work</MagneticPrimaryCTA>
          <MagneticSecondaryCTA href="./resume.pdf" download>
            Download Resume
          </MagneticSecondaryCTA>
        </motion.div>
      </div>

      <button
        type="button"
        className="group absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[var(--text-muted)] transition-colors hover:text-[var(--neon)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)] rounded-lg p-2"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to about"
      >
        <span className="text-[11px] font-semibold tracking-widest uppercase">SCROLL</span>
        <ChevronDown className="h-5 w-5 animate-bounce text-[var(--neon)] transition-transform group-hover:translate-y-0.5" />
      </button>
    </section>
  )
}
