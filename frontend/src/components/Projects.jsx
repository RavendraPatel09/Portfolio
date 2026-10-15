import { useMemo, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { projects, projectFilters } from '../data/projects'

function ProjectCard({ p }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 260, damping: 22 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 260, damping: 22 })

  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(0,255,157,0.18), transparent 55%)`

  const onMove = (e) => {
    const b = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - b.left)
    my.set(e.clientY - b.top)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const span =
    p.span === 'lg'
      ? 'md:col-span-2 md:row-span-2'
      : p.span === 'md'
        ? 'md:col-span-2'
        : 'md:col-span-1'

  return (
    <motion.article
      layout
      initial={false}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative h-full min-h-[220px] rounded-3xl p-[1px] ${span}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div className="glass relative flex h-full flex-col rounded-3xl border border-[var(--glass-border)] bg-[var(--bg)]/50 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition duration-300 group-hover:border-[var(--neon)]/35 group-hover:shadow-[0_0_40px_rgba(0,255,157,0.12)]">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-bold sm:text-2xl">
            {p.emoji} {p.name}
          </h3>
          <span className="shrink-0 rounded-full border border-[var(--glass-border)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            {p.category}
          </span>
        </div>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)] sm:text-[15px]">{p.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-[var(--glass-border)] bg-white/5 px-2.5 py-1 text-[11px] font-medium text-[var(--text)]"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={p.github}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl border border-[var(--neon)]/30 bg-[var(--neon)]/10 px-4 py-2 text-sm font-semibold text-[var(--neon)] transition hover:bg-[var(--neon)]/15"
        >
          <Github size={18} />
          GitHub
        </a>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const list = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <SectionReveal>
      <section id="projects" className="scroll-mt-24 px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            What I&apos;ve Built <span className="text-[var(--neon)]">🚀</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--text-muted)]">
            Real repositories — shipped ideas, systems, and deep practice.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {projectFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === f
                    ? 'bg-[var(--neon)]/15 text-[var(--neon)] ring-1 ring-[var(--neon)]/40'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <motion.div layout className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-4">
            {list.map((p) => (
              <ProjectCard key={p.id} p={p} />
            ))}
          </motion.div>
        </div>
      </section>
    </SectionReveal>
  )
}
