import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import SectionReveal from './SectionReveal'

const STATS = [
  { label: 'Projects Completed', value: 6, suffix: '+' },
  { label: 'GitHub Repositories', value: 9, suffix: '' },
  { label: 'Languages Mastered', value: 3, suffix: '' },
  { label: 'Lines of Code', value: '∞', suffix: '' },
]

const TAGS = ['DSA', 'Gen AI', 'Databases']

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
        const dur = 1400
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
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--neon)]/50 via-[var(--electric)]/30 to-transparent opacity-80 blur-sm" />
      <div className="glass relative flex h-full flex-col items-center justify-center rounded-3xl border border-[var(--glass-border)] bg-[var(--bg)]/60 p-10 shadow-[0_0_60px_rgba(0,255,157,0.08)] backdrop-blur-xl">
        <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--neon)]/25 to-[var(--electric)]/20 text-4xl font-bold text-[var(--neon)] shadow-inner ring-1 ring-[var(--neon)]/30">
          RP
        </div>
        <p className="text-center font-display text-xl font-semibold">Ravendra Patel</p>
        <p className="mt-2 text-center text-sm text-[var(--text-muted)]">MP, India</p>
      </div>
    </motion.div>
  )
}

function TypedLine({ text }) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 22)
    return () => clearInterval(id)
  }, [text])

  return <span>{shown}</span>
}

export default function About() {
  const wrap = useRef(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const onScroll = () => {
      el.style.setProperty('--ay', `${window.scrollY * 0.04}px`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const bioExact = 'Love to learn new technologies and work with them.'

  return (
    <SectionReveal>
      <section
        id="about"
        ref={wrap}
        className="relative scroll-mt-24 px-6 py-24 sm:px-8"
        style={{ transform: 'translateY(var(--ay, 0px))' }}
      >
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
          <ProfileCard3D />

          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              About <span className="text-[var(--neon)]">Me</span>
            </h2>
            <p className="mt-3 font-medium text-[var(--electric)]">
              Engineering the Future | Scalable Solutions &amp; Generative AI
            </p>

            <div className="mt-8 space-y-6 text-lg leading-relaxed text-[var(--text-muted)]">
              <p>
                <TypedLine text={bioExact} />
              </p>
              <p>
                <span className="font-semibold text-[var(--text)]">Current focus:</span>{' '}
                <span className="font-semibold text-[var(--neon)]">
                  Advanced Data Structures, Databases &amp; Generative AI
                </span>
              </p>
              <p>
                <span className="font-semibold text-[var(--text)]">Mission:</span>{' '}
                <span className="font-semibold text-[var(--electric)]">
                  Architecting scalable, high-impact software systems
                </span>
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {TAGS.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--neon)]/25 bg-[var(--neon)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--neon)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="glass rounded-2xl border border-[var(--glass-border)] p-4 text-center">
                  <Counter value={s.value} suffix={s.suffix} />
                  <p className="mt-2 text-xs text-[var(--text-muted)]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
