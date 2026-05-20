import SectionReveal from './SectionReveal'
import { skillGroups } from '../data/skills'

function SkillFlipCard({ name, icon, percent, label, glow }) {
  const showPct = percent != null

  return (
    <div className={`flip-card group h-40 sm:h-44 ${glow}`}>
      <div className="flip-card-inner relative h-full w-full">
        <div className="flip-face glass absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-[var(--glass-border)] p-4 transition-shadow duration-300 group-hover:shadow-[0_0_32px_rgba(0,255,157,0.18)]">
          {icon ? (
            <span className="text-3xl">{icon}</span>
          ) : (
            <span className="font-mono text-3xl font-bold text-[var(--neon)]">{name}</span>
          )}
          <p className="mt-3 text-center font-display text-lg font-semibold">{name}</p>
        </div>
        <div className="flip-face flip-back glass absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-[var(--neon)]/35 bg-gradient-to-br from-[var(--neon)]/10 to-[var(--electric)]/10 p-4">
          {showPct ? (
            <>
              <p className="font-display text-4xl font-bold text-[var(--neon)]">{percent}%</p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">Proficiency</p>
            </>
          ) : (
            <>
              <p className="text-center font-display text-xl font-bold text-[var(--electric)]">{label}</p>
              <p className="mt-2 text-center text-sm text-[var(--text-muted)]">Leveling up continuously</p>
            </>
          )}
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
          <h2 className="text-center font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Tech Arsenal <span className="text-[var(--neon)]">🛠️</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--text-muted)]">
            Languages, databases, tools, and what I&apos;m pushing into next.
          </p>

          <div className="mt-16 space-y-14">
            {skillGroups.map((g) => (
              <div key={g.title}>
                <h3 className="mb-6 font-display text-sm font-bold uppercase tracking-[0.2em] text-[var(--electric)]">
                  {g.title}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {g.items.map((it) => (
                    <SkillFlipCard key={it.name} {...it} glow={g.glow} />
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
