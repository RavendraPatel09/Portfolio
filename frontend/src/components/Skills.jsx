import SectionReveal from './SectionReveal'
import { skillGroups } from '../data/skills'

function SkillCard({ name, icon, tag, description, isLearning }) {
  return (
    <article
      tabIndex={0}
      className={`group relative flex h-full min-h-[220px] w-full flex-col justify-between rounded-2xl border p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)] ${
        isLearning
          ? 'border-amber-500/30 bg-[var(--card-bg)] shadow-[var(--card-shadow)] hover:border-amber-400/50 hover:shadow-[0_0_24px_rgba(251,191,36,0.12)]'
          : 'border-[var(--glass-border)] bg-[var(--card-bg)] shadow-[var(--card-shadow)] hover:border-[var(--neon)]/40 hover:shadow-[0_0_24px_rgba(0,255,157,0.12)]'
      }`}
      aria-label={`${name} skill`}
    >
      {/* 1. Category badge at the top */}
      <div className="flex w-full items-center justify-between gap-2">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
            isLearning
              ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
              : 'border-[var(--glass-border)] bg-[var(--chip-bg)] text-[var(--electric)]'
          }`}
        >
          {tag || (isLearning ? 'Learning' : 'Core')}
        </span>

        {isLearning && (
          <span className="flex items-center gap-1 text-[9px] font-mono text-amber-400/80">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Active
          </span>
        )}
      </div>

      {/* 2. Icon in a consistent visual position (centered) */}
      <div className="my-2.5 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--glass-border)] bg-[var(--chip-bg)] text-2xl transition-transform duration-300 group-hover:scale-110 sm:text-3xl">
          {icon}
        </span>
      </div>

      {/* 3. Skill title with controlled wrapping & 4. Short description below */}
      <div className="flex flex-1 flex-col items-center justify-between text-center">
        <h4 className="font-display text-sm font-bold tracking-tight text-[var(--text)] sm:text-[15px] [overflow-wrap:anywhere] break-words hyphens-auto leading-snug transition-colors duration-200 group-hover:text-[var(--neon)]">
          {name}
        </h4>

        <p className="mt-2 text-[11px] leading-relaxed text-[var(--text-muted)] sm:text-xs [overflow-wrap:anywhere] break-words">
          {description}
        </p>
      </div>
    </article>
  )
}

export default function Skills() {
  return (
    <SectionReveal>
      <section id="skills" className="scroll-mt-24 px-6 py-14 sm:py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--neon)]">
              Technical Stack
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Technical Skills &amp; <span className="text-[var(--neon)]">Tooling</span> 🛠️
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--text-muted)] sm:text-lg">
              Structured technical foundations across programming languages, web engineering, databases, and AI development—distinguishing core proficiencies from active learning.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {skillGroups.map((g) => (
              <div key={g.title}>
                <div className="mb-4 flex items-center gap-3">
                  <h3
                    className={`font-display text-xs font-bold uppercase tracking-[0.2em] ${
                      g.isLearningGroup ? 'text-amber-400' : 'text-[var(--electric)]'
                    }`}
                  >
                    {g.title}
                  </h3>
                  {g.isLearningGroup && (
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-400">
                      In Active Learning
                    </span>
                  )}
                  <div
                    className={`h-[1px] flex-1 bg-gradient-to-r ${
                      g.isLearningGroup
                        ? 'from-amber-400/40 to-transparent'
                        : 'from-[var(--electric)]/30 to-transparent'
                    }`}
                  />
                </div>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-4">
                  {g.items.map((it) => (
                    <SkillCard key={it.name} {...it} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
