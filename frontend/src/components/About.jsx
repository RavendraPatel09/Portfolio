import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Terminal, Code2, Database, Cpu, GraduationCap, Sparkles } from 'lucide-react'
import SectionReveal from './SectionReveal'

const STATS = [
  { label: 'Hackathons & Events', value: 25, suffix: '+' },
  { label: 'Hackathon Finalist', value: 4, suffix: 'x' },
  { label: 'Core Languages', value: 3, suffix: '' },
  { label: 'Featured Projects', value: 3, suffix: '' },
]

const PILLARS = [
  {
    icon: Terminal,
    title: 'Engineering Mindset',
    desc: 'Understanding how systems work under the hood, from API protocols to memory management.',
  },
  {
    icon: Code2,
    title: 'Builder Mindset',
    desc: 'Learning by creating real applications, testing hypotheses, and debugging complex challenges.',
  },
  {
    icon: Database,
    title: 'Data & Systems',
    desc: 'Structuring clean relational databases and writing efficient, modular backend architectures.',
  },
  {
    icon: Cpu,
    title: 'Algorithmic Problem Solving',
    desc: 'Practicing Data Structures & Algorithms in C++ and Python to write optimized, scalable code.',
  },
]

function Counter({ value, suffix }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (value === '∞') return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        const end = value
        const dur = 1300
        const t0 = performance.now()
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / dur)
          const eased = 1 - (1 - p) ** 3
          setN(Math.round(end * eased))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  if (value === '∞') {
    return (
      <span ref={ref} className="font-display text-4xl font-bold text-[var(--neon)] sm:text-5xl">
        ∞
      </span>
    )
  }

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-[var(--neon)] sm:text-5xl">
      {n}
      {suffix}
    </span>
  )
}

function ProfileCard3D() {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const technicalFocus = [
    'Full-Stack Development',
    'Backend Engineering',
    'AI & Generative AI',
    'Data Science',
  ]

  const currentlyExploring = [
    'Machine Learning',
    'Agentic AI',
    'System Design',
  ]

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="relative mx-auto w-full max-w-sm cursor-default rounded-3xl p-[1px] transition-shadow duration-300"
    >
      {/* Ambient gradient aura */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--neon)]/30 via-[var(--electric)]/20 to-transparent opacity-60 blur-md transition-opacity duration-300 hover:opacity-90" />

      {/* Main card body with natural, content-driven height */}
      <div className="glass relative flex flex-col rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-5 sm:p-6 shadow-[var(--card-shadow)] backdrop-blur-xl transition-colors duration-300">
        {/* A. COMPACT HEADER */}
        <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--neon)]" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text)]">
              Engineering Profile
            </span>
          </div>

          <span className="inline-flex items-center rounded-full border border-[var(--electric)]/30 bg-[var(--electric)]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-[var(--electric)]">
            CSE · 2028
          </span>
        </div>

        {/* B. MAIN IDENTITY AREA */}
        <div className="py-3.5">
          <div className="flex items-center gap-3.5">
            {/* Refined RP Monogram Emblem */}
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[var(--neon)]/30 bg-gradient-to-br from-[var(--neon)]/15 via-[var(--neon)]/5 to-[var(--electric)]/15 shadow-inner ring-1 ring-[var(--neon)]/20">
              <span className="font-display text-xl font-bold tracking-tight text-[var(--neon)]">
                RP
              </span>
              <div className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--card-bg)] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--electric)]" />
              </div>
            </div>

            {/* Name & Professional Identity */}
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg font-bold tracking-tight text-[var(--text)] sm:text-xl truncate">
                Ravendra Patel
              </h3>
              <p className="mt-0.5 text-xs font-semibold text-[var(--electric)]">
                Aspiring Full Stack Developer
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-[var(--neon)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] animate-pulse" />
                <span className="truncate text-[10.5px] font-medium text-[var(--text-muted)]">AI &amp; Data Enthusiast</span>
              </div>
            </div>
          </div>
        </div>

        {/* C. REFINED EDUCATION AREA */}
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--chip-bg)] p-3.5 transition-colors duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--glass-border)]/60">
            <div className="flex items-center gap-1.5">
              <GraduationCap size={13} className="text-[var(--electric)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Education
              </span>
            </div>
            <span className="font-mono text-[10px] font-semibold text-[var(--neon)]">
              Expected 2028
            </span>
          </div>

          <div className="pt-2">
            <h4 className="font-display text-xs font-semibold text-[var(--text)] leading-snug">
              Bachelor of Technology (B.Tech)
            </h4>
            <p className="mt-0.5 text-[11px] font-medium text-[var(--electric)]">
              Computer Science &amp; Engineering (Data Science)
            </p>
            <p className="mt-1 text-[10px] text-[var(--text-muted)]">
              Oriental Institute of Science and Technology
            </p>
          </div>
        </div>

        {/* D. TECHNICAL FOCUS */}
        <div className="mt-3.5">
          <div className="flex items-center gap-1.5 pb-2">
            <Code2 size={12} className="text-[var(--neon)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Technical Focus
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {technicalFocus.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-lg border border-[var(--glass-border)] bg-[var(--chip-bg)] px-2.5 py-1 text-[10.5px] font-medium text-[var(--text)] transition-colors duration-200 hover:border-[var(--neon)]/40 hover:text-[var(--neon)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* E. CURRENTLY EXPLORING */}
        <div className="mt-3">
          <div className="flex items-center gap-1.5 pb-2">
            <Sparkles size={12} className="text-[var(--electric)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Currently Exploring
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentlyExploring.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-lg border border-[var(--electric)]/25 bg-[var(--electric)]/5 px-2.5 py-1 text-[10.5px] font-medium text-[var(--electric)] transition-colors duration-200 hover:border-[var(--electric)]/45"
              >
                <span className="mr-1.5 h-1 w-1 rounded-full bg-[var(--electric)]" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* F. CARD FOOTER */}
        <div className="mt-4 border-t border-[var(--glass-border)]/70 pt-3 text-center">
          <p className="font-mono text-[9px] font-semibold tracking-[0.24em] text-[var(--text-muted)] uppercase select-none">
            BUILD <span className="text-[var(--neon)]">•</span> EXPLORE <span className="text-[var(--electric)]">•</span> ENGINEER
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function About() {
  const wrap = useRef(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const onScroll = () => {
      el.style.setProperty('--ay', `${window.scrollY * 0.03}px`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <SectionReveal>
      <section
        id="about"
        ref={wrap}
        className="relative scroll-mt-24 px-6 py-14 sm:py-16 sm:px-8"
        style={{ transform: 'translateY(var(--ay, 0px))' }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:gap-10 lg:grid-cols-2 lg:items-center">
            <ProfileCard3D />

            <div>
              <div className="inline-block rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--neon)]">
                About Me
              </div>

              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                Engineering Curiosity &amp; <span className="text-[var(--neon)]">Continuous Building</span>
              </h2>

              <p className="mt-3 text-base font-medium text-[var(--electric)] sm:text-lg">
                B.Tech in Computer Science &amp; Engineering (Data Science) · Oriental Institute of Science and Technology (Expected 2028)
              </p>

              <div className="mt-5 space-y-3.5 text-base leading-relaxed text-[var(--text-muted)]">
                <p>
                  I am a Computer Science and Engineering undergraduate specializing in Data Science at the Oriental Institute of Science and Technology. I enjoy building practical applications, exploring backend systems, and understanding how software and data work together to solve real-world problems.
                </p>
                <p>
                  My projects span AI-assisted travel planning, resume analysis, and smart-city backend development. Through these projects, I have explored application development, API integration, modular backend architecture, and the practical use of AI tools.
                </p>
                <p>
                  I am continuing to strengthen my foundations in data structures and algorithms, databases, machine learning, and full-stack development. I value hands-on learning, experimentation, and writing software that is understandable, maintainable, and useful.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {PILLARS.map((p) => {
                  const Icon = p.icon
                  return (
                    <div
                      key={p.title}
                      className="glass flex items-start gap-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-3.5 shadow-[var(--card-shadow)] transition-all duration-200 hover:border-[var(--neon)]/30"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--neon)]/10 text-[var(--neon)]">
                        <Icon size={16} />
                      </span>
                      <div>
                        <h4 className="font-display text-xs font-bold text-[var(--text)]">{p.title}</h4>
                        <p className="mt-1 text-[11px] leading-relaxed text-[var(--text-muted)]">{p.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="glass rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-3.5 text-center shadow-[var(--card-shadow)] transition-all duration-200 hover:border-[var(--electric)]/30"
                  >
                    <Counter value={s.value} suffix={s.suffix} />
                    <p className="mt-1.5 text-xs font-medium text-[var(--text-muted)]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
