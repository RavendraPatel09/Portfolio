import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Terminal, Code2, Database, Cpu } from 'lucide-react'
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
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 })

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
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className="relative mx-auto aspect-[4/5] w-full max-w-sm cursor-default rounded-3xl p-[1px]"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--neon)]/40 via-[var(--electric)]/25 to-transparent opacity-75 blur-sm transition-opacity duration-300 hover:opacity-100" />
      <div className="glass relative flex h-full flex-col items-center justify-between rounded-3xl border border-[var(--glass-border)] bg-[var(--bg)]/70 p-8 shadow-[0_0_60px_rgba(0,255,157,0.08)] backdrop-blur-xl">
        <div className="flex w-full items-center justify-between border-b border-[var(--glass-border)] pb-4 text-xs font-mono text-[var(--text-muted)]">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--neon)] animate-pulse" />
            <span>DEV_PROFILE</span>
          </span>
          <span className="text-[var(--electric)]">v2028.grad</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--neon)]/20 to-[var(--electric)]/15 text-3xl font-bold font-display text-[var(--neon)] shadow-inner ring-1 ring-[var(--neon)]/30">
            RP
          </div>
          <h3 className="font-display text-2xl font-bold text-[var(--text)]">Ravendra Patel</h3>
          <p className="mt-1 font-mono text-xs font-semibold text-[var(--electric)]">Software Developer</p>
          <p className="mt-2 text-xs text-[var(--text-muted)]">Bhopal, MP, India</p>
        </div>

        <div className="w-full rounded-2xl border border-[var(--glass-border)] bg-black/20 p-3.5 text-center">
          <p className="text-[11px] font-mono text-[var(--neon)]">Oriental Institute of Science & Tech</p>
          <p className="mt-1 text-[11px] text-[var(--text-muted)]">Computer Science Engineering (2024–2028)</p>
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
        className="relative scroll-mt-24 px-6 py-24 sm:px-8"
        style={{ transform: 'translateY(var(--ay, 0px))' }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <ProfileCard3D />

            <div>
              <div className="inline-block rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--neon)]">
                About Me
              </div>

              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                Engineering Curiosity &amp; <span className="text-[var(--neon)]">Continuous Building</span>
              </h2>

              <p className="mt-4 text-base font-medium text-[var(--electric)] sm:text-lg">
                Computer Science Undergraduate @ Oriental Institute of Science and Technology, Bhopal (Graduation 2028)
              </p>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--text-muted)]">
                <p>
                  I am a passionate software developer fascinated by how things work under the hood. For me, software engineering is not merely about writing syntax—it&apos;s about understanding how data moves through networks, how frontend experiences interface with backend APIs, and how databases maintain consistency.
                </p>
                <p>
                  I learn most effectively by creating practical projects from scratch, experimenting with new stacks, and systematically debugging issues. Whether writing high-performance algorithms in C++, structuring Python backend services, or implementing interactive React interfaces, I approach engineering with curiosity, patience, and high attention to detail.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {PILLARS.map((p) => {
                  const Icon = p.icon
                  return (
                    <div
                      key={p.title}
                      className="glass flex items-start gap-3 rounded-2xl border border-[var(--glass-border)] p-3.5 transition-all duration-200 hover:border-[var(--neon)]/30"
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

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="glass rounded-2xl border border-[var(--glass-border)] p-4 text-center transition-all duration-200 hover:border-[var(--electric)]/30"
                  >
                    <Counter value={s.value} suffix={s.suffix} />
                    <p className="mt-2 text-xs font-medium text-[var(--text-muted)]">{s.label}</p>
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
