import { Trophy, Award, Target, Zap } from 'lucide-react'
import SectionReveal from './SectionReveal'

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    title: 'NASA Space Apps Challenge 2025',
    badge: 'Regional Winner & Global Nominee',
    badgeColor: 'border-[var(--neon)]/40 bg-[var(--neon)]/10 text-[var(--neon)]',
    description:
      'Recognized as Regional Winner and honored as a Global Nominee in NASA Space Apps Challenge 2025, tackling complex technical problem statements.',
  },
  {
    icon: Award,
    title: 'National-Level Ideathon',
    badge: 'Runner-Up',
    badgeColor: 'border-amber-400/40 bg-amber-400/10 text-amber-400',
    description:
      'Secured Runner-Up recognition in a competitive national-level ideathon focused on technology innovation and software conceptualization.',
  },
  {
    icon: Target,
    title: 'Software Hackathons',
    badge: '4× Finalist',
    badgeColor: 'border-[var(--electric)]/40 bg-[var(--electric)]/10 text-[var(--electric)]',
    description:
      'Advanced as a 4× Software Hackathon Finalist across national and university-level developer competitions, presenting functional prototypes under tight timeframes.',
  },
  {
    icon: Zap,
    title: 'Hackathons & Tech Events',
    badge: '25+ Events',
    badgeColor: 'border-[var(--neon)]/40 bg-[var(--neon)]/10 text-[var(--neon)]',
    description:
      'Participated in 25+ hackathons and technology events at national and university levels, continuously solving engineering challenges and building alongside developer teams.',
  },
]

export default function Achievements() {
  return (
    <SectionReveal>
      <section id="achievements" className="scroll-mt-24 px-6 py-14 sm:py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--neon)]">
              Honors &amp; Recognition
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Hackathon &amp; <span className="text-[var(--neon)]">Competition Highlights</span> 🏆
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--text-muted)] sm:text-lg">
              Resume-backed achievements earned through competitive hackathons, innovation challenges, and software development events.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ACHIEVEMENTS.map((a) => {
              const Icon = a.icon
              return (
                <div
                  key={a.title}
                  className="glass group relative flex flex-col justify-between rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-5 shadow-[var(--card-shadow)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--neon)]/40"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--chip-bg)] text-[var(--neon)] shadow-sm transition-colors duration-200 group-hover:border-[var(--neon)]/40">
                        <Icon size={20} />
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${a.badgeColor}`}
                      >
                        {a.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-base font-bold text-[var(--text)] sm:text-lg">
                      {a.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)] sm:text-[13px]">
                      {a.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--glass-border)]/60 flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                    <span className="text-[var(--electric)]">Verified Honor</span>
                    <span className="opacity-60">Competitive</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
