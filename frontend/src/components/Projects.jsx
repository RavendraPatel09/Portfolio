import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Search, X } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { projects, projectFilters } from '../data/projects'

function CompactProjectCard({ p }) {
  return (
    <article className="glass group relative flex flex-col justify-between rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-4 sm:p-5 shadow-[var(--card-shadow)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--neon)]/35">
      <div className="flex flex-col">
        {/* Top Row: Icon + Title + Category Badge */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl sm:text-2xl shrink-0 select-none leading-none">
              {p.emoji}
            </span>
            <h3
              className="font-display text-base font-bold tracking-tight text-[var(--text)] sm:text-[17px] truncate"
              title={p.name}
            >
              {p.name}
            </h3>
          </div>
          <span className="shrink-0 rounded-full border border-[var(--glass-border)] bg-[var(--chip-bg)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--electric)]">
            {p.category}
          </span>
        </div>

        {/* Project Description */}
        <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-[var(--text-muted)]">
          {p.description}
        </p>

        {/* Key Highlights */}
        {p.highlights && p.highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5 border-t border-[var(--glass-border)]/50 pt-2.5">
            {p.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-[var(--text-muted)]">
                <span className="text-[var(--neon)] mt-0.5 shrink-0 select-none">▹</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Technology Stack Chips */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-[var(--glass-border)] bg-[var(--chip-bg)] px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-[var(--text)] transition-colors duration-150 group-hover:border-[var(--neon)]/30"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Repository Action & Label */}
      <div className="mt-4 pt-3 border-t border-[var(--glass-border)] flex items-center justify-between">
        <a
          href={p.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--neon)] transition-all duration-150 hover:text-[var(--text)] hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--neon)] rounded"
        >
          <Github size={14} className="shrink-0" />
          <span>View Repository</span>
          <ExternalLink size={11} className="opacity-70" />
        </a>

        <span className="text-[10px] font-mono text-[var(--text-muted)] opacity-70 select-none">
          GitHub Project
        </span>
      </div>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchCat = filter === 'All' || p.category === filter
      if (!q) return matchCat

      const matchQuery =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q))

      return matchCat && matchQuery
    })
  }, [filter, query])

  const clearFilters = () => {
    setFilter('All')
    setQuery('')
  }

  return (
    <SectionReveal>
      <section id="projects" className="scroll-mt-24 px-6 py-14 sm:py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center">
            <span className="inline-block rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--neon)]">
              Featured Work
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Featured Projects &amp; <span className="text-[var(--neon)]">Engineering Work</span> 🚀
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--text-muted)] sm:text-lg">
              Applications and backend systems spanning AI-assisted travel planning, automated resume analysis, and municipal infrastructure.
            </p>
          </div>

          {/* Filter & Search Bar Controls */}
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {projectFilters.map((f) => {
                const active = filter === f
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)] ${
                      active
                        ? 'text-[var(--neon)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="projectFilterActive"
                        className="absolute inset-0 rounded-full border border-[var(--neon)]/40 bg-[var(--neon)]/15 shadow-[0_0_16px_rgba(0,255,157,0.15)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{f}</span>
                  </button>
                )
              })}
            </div>

            {/* Compact Search Input */}
            <div className="relative w-full sm:w-64">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects or tech…"
                className="w-full rounded-full border border-[var(--glass-border)] bg-[var(--input-bg)] py-1.5 pl-8 pr-8 text-xs text-[var(--text)] placeholder-[var(--text-muted)] outline-none transition-all duration-150 focus:border-[var(--neon)]/50 focus:ring-1 focus:ring-[var(--neon)]/30 shadow-sm"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Project Cards: Responsive 3-Column Desktop Grid */}
          <div className="mt-6">
            {list.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {list.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="h-full"
                    >
                      <CompactProjectCard p={p} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="glass flex flex-col items-center justify-center rounded-2xl border border-[var(--glass-border)] p-10 text-center">
                <p className="text-sm font-medium text-[var(--text-muted)]">
                  No projects match your current filter or search criteria.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-3 rounded-xl border border-[var(--neon)]/30 bg-[var(--neon)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--neon)] transition-colors hover:bg-[var(--neon)]/20"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
