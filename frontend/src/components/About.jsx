import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Terminal, Code2, Database, Cpu, MapPin, GraduationCap } from 'lucide-react'
import SectionReveal from './SectionReveal'

const STATS = [
  { label: 'Projects Built', value: 6, suffix: '+' },
  { label: 'GitHub Repositories', value: 9, suffix: '+' },
  { label: 'Core Languages', value: 3, suffix: '+' },
  { label: 'Lines of Code', value: '∞', suffix: '' },
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
      <div className="glass relative flex flex-col rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-6 sm:p-7 shadow-[var(--card-shadow)] backdrop-blur-xl transition-colors duration-300">
        {/* A. COMPACT HEADER */}
        <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-3.5">
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
        <div className="py-5">
          <div className="flex items-center gap-4">
            {/* Refined RP Monogram Emblem */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[var(--neon)]/30 bg-gradient-to-br from-[var(--neon)]/15 via-[var(--neon)]/5 to-[var(--electric)]/15 shadow-inner ring-1 ring-[var(--neon)]/20">
              <span className="font-display text-2xl font-bold tracking-tight text-[var(--neon)]">
                RP
              </span>
              <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--card-bg)] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--electric)]" />
              </div>
            </div>

            {/* Name, Role & Location */}
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-xl font-bold tracking-tight text-[var(--text)] sm:text-2xl truncate">
                Ravendra Patel
              </h3>
              <p className="mt-0.5 text-xs font-semibold text-[var(--electric)] sm:text-sm">
                Software Developer
              </p>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                <MapPin size={12} className="shrink-0 text-[var(--text-muted)] opacity-80" />
                <span className="truncate">Bhopal, Madhya Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* C. REFINED EDUCATION AREA */}
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--chip-bg)] p-4 transition-colors duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--glass-border)]/60">
            <div className="flex items-center gap-1.5">
              <GraduationCap size={13} className="text-[var(--electric)]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Undergraduate
              </span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-[var(--neon)]">
              2024 – 2028
            </span>
          </div>

          <div className="pt-2.5">
            <h4 className="font-display text-sm font-semibold text-[var(--text)] leading-snug">
              Oriental Institute of Science &amp; Technology
            </h4>
            <p className="mt-1 text-xs font-medium text-[var(--electric)]">
              Computer Science Engineering
            </p>
          </div>
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
                Computer Science Undergraduate @ Oriental Institute of Science and Technology, Bhopal (Graduation 2028)
              </p>

              <div className="mt-5 space-y-3.5 text-base leading-relaxed text-[var(--text-muted)]">
                <p>
                  I am a passionate software developer fascinated by how things work under the hood. For me, software engineering is not merely about writing syntax—it&apos;s about understanding how data moves through networks, how frontend experiences interface with backend APIs, and how databases maintain consistency.
                </p>
                <p>
                  I learn most effectively by creating practical projects from scratch, experimenting with new stacks, and systematically debugging issues. Whether writing high-performance algorithms in C++, structuring Python backend services, or implementing interactive React interfaces, I approach engineering with curiosity, patience, and high attention to detail.
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
