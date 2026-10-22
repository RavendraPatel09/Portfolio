import { useState } from 'react'
import SectionReveal from './SectionReveal'
import { skillGroups } from '../data/skills'

function SkillFlipCard({ name, icon, tag, description }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped((f) => !f)
        }
      }}
      className={`flip-card group relative h-44 sm:h-48 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)] rounded-2xl ${
        flipped ? 'is-flipped' : ''
      }`}
      aria-label={`${name} skill card. Press to view practical experience.`}
    >
      <div
        className={`flip-card-inner relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front Face */}
        <div className="flip-face glass absolute inset-0 flex flex-col items-center justify-between rounded-2xl border border-[var(--glass-border)] bg-[var(--bg)]/70 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:border-[var(--neon)]/40 group-hover:shadow-[0_0_28px_rgba(0,255,157,0.14)]">
          <div className="flex w-full items-center justify-between">
            <span className="inline-block rounded-full border border-[var(--glass-border)] bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--electric)]">
              Core
            </span>
            <span className="text-[10px] text-[var(--text-muted)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Flip ↺
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            {icon ? (
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110 sm:text-4xl">
                {icon}
              </span>
            ) : (
              <span className="font-mono text-2xl font-bold text-[var(--neon)]">{name}</span>
            )}
            <p className="mt-2.5 font-display text-base font-bold text-[var(--text)] sm:text-lg">{name}</p>
          </div>

          <p className="line-clamp-1 w-full text-center text-[11px] font-medium text-[var(--text-muted)]">
            {tag}
          </p>
        </div>

        {/* Back Face */}
        <div className="flip-face flip-back glass absolute inset-0 flex flex-col justify-between rounded-2xl border border-[var(--neon)]/40 bg-gradient-to-br from-[var(--neon)]/10 via-[var(--bg)]/90 to-[var(--electric)]/10 p-5 shadow-[0_0_32px_rgba(0,255,157,0.15)] backdrop-blur-xl [transform:rotateY(180deg)]">
          <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-2">
            <span className="font-display text-sm font-bold text-[var(--neon)]">{name}</span>
            <span className="text-[10px] uppercase tracking-wider text-[var(--electric)]">{tag}</span>
          </div>

          <p className="my-auto text-xs leading-relaxed text-[var(--text)] sm:text-[13px]">
            {description}
          </p>

          <p className="text-right text-[10px] font-medium text-[var(--text-muted)]">
            Click to return
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <SectionReveal>
      <section id="skills" className="scroll-mt-24 px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--neon)]">
              Technical Stack
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Engineering Arsenal <span className="text-[var(--neon)]">🛠️</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-muted)] sm:text-lg">
              Practical languages, frameworks, databases, and architectural concepts I use to engineer reliable systems.
            </p>
          </div>

          <div className="mt-16 space-y-14">
            {skillGroups.map((g) => (
              <div key={g.title}>
                <div className="mb-6 flex items-center gap-3">
                  <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[var(--electric)]">
                    {g.title}
                  </h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--electric)]/30 to-transparent" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {g.items.map((it) => (
                    <SkillFlipCard key={it.name} {...it} />
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
