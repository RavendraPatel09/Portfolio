import { useMemo, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github, ExternalLink, Code2 } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { projects, projectFilters } from '../data/projects'

function ProjectCard({ p }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 220, damping: 24 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 220, damping: 24 })

  const glow = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, rgba(0,255,157,0.15), transparent 60%)`

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
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 950 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative h-full min-h-[240px] rounded-3xl p-[1px] transition-all duration-300 ${span}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div className="glass relative flex h-full flex-col justify-between rounded-3xl border border-[var(--glass-border)] bg-[var(--bg)]/70 p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:border-[var(--neon)]/35 group-hover:shadow-[0_0_36px_rgba(0,255,157,0.12)]">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-bold tracking-tight text-[var(--text)] sm:text-2xl flex items-center gap-2">
              <span className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110">{p.emoji}</span>
              <span>{p.name}</span>
            </h3>
            <span className="shrink-0 rounded-full border border-[var(--glass-border)] bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--electric)]">
              {p.category}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
            {p.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--glass-border)] flex flex-col gap-4">
          <div className="flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-[var(--glass-border)] bg-white/5 px-2.5 py-1 text-[11px] font-medium text-[var(--text)] transition-colors group-hover:border-[var(--neon)]/25"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--neon)]/35 bg-[var(--neon)]/10 px-4 py-2 text-xs font-bold text-[var(--neon)] transition-all duration-200 hover:bg-[var(--neon)]/20 hover:shadow-[0_0_20px_rgba(0,255,157,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)]"
            >
              <Github size={15} />
              <span>View Repository</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>

            <span className="text-[11px] font-mono text-[var(--text-muted)] opacity-60">
              Open Source
            </span>
          </div>
        </div>
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
          <div className="text-center">
            <span className="inline-block rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--neon)]">
              Featured Work
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Practical Projects &amp; <span className="text-[var(--neon)]">Engineering Practice</span> 🚀
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-muted)] sm:text-lg">
              Applications, systems, and deep algorithmic repositories built to learn, test, and solve real problems.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {projectFilters.map((f) => {
              const active = filter === f
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`relative rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)] ${
                    active
                      ? 'text-[var(--neon)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="projectFilterActive"
                      className="absolute inset-0 rounded-full border border-[var(--neon)]/40 bg-[var(--neon)]/15 shadow-[0_0_20px_rgba(0,255,157,0.15)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{f}</span>
                </button>
              )
            })}
          </div>

          <motion.div layout className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-4">
            {list.map((p) => (
              <ProjectCard key={p.id} p={p} />
            ))}
          </motion.div>
        </div>
      </section>
    </SectionReveal>
  )
}
