import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, GitCommit, GitPullRequest } from 'lucide-react'
import SectionReveal from './SectionReveal'

const USER = 'RavendraPatel09'
const base = `https://github-readme-stats.vercel.app`
const streak = `https://github-readme-streak-stats.demolab.com`

const qs =
  'username=' +
  USER +
  '&show_icons=true&hide_border=true&bg_color=0a0a0f&title_color=00FF9D&icon_color=00B4FF&text_color=FFFFFF&border_radius=12'

const statsUrl = `${base}/api?${qs}`
const langsUrl = `${base}/api/top-langs/?username=${USER}&layout=compact&hide_border=true&bg_color=0a0a0f&title_color=00FF9D&text_color=FFFFFF&border_radius=12`
const streakUrl = `${streak}/?user=${USER}&theme=dark&hide_border=true&background=0a0a0f&ring=00FF9D&fire=00B4FF&currStreakLabel=00FF9D&sideLabels=00B4FF&border_radius=12`

function StatImageCard({ src, alt, className = '', containerClassName = '' }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`glass relative overflow-hidden rounded-3xl border border-[var(--glass-border)] p-4 sm:p-5 flex items-center justify-center transition-all duration-300 hover:border-[var(--neon)]/30 ${containerClassName}`}
    >
      {!loaded && !failed && (
        <div className="flex h-48 w-full animate-pulse items-center justify-center rounded-2xl bg-white/5 text-xs text-[var(--text-muted)]">
          Loading metrics…
        </div>
      )}
      {failed ? (
        <div className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white/5 p-4 text-center text-xs text-[var(--text-muted)]">
          <Activity size={20} className="text-[var(--neon)] opacity-60" />
          <span>Live stats available on GitHub profile</span>
          <a
            href={`https://github.com/${USER}`}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--neon)] underline"
          >
            Visit @{USER}
          </a>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-auto w-full transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0 absolute'
          } ${className}`}
        />
      )}
    </div>
  )
}

export default function GitHubStats() {
  return (
    <SectionReveal>
      <section id="github-stats" className="scroll-mt-24 px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[var(--electric)]/30 bg-[var(--electric)]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--electric)]">
              Activity &amp; Metrics
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              GitHub Insights <span className="text-[var(--electric)]">🌌</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-muted)] sm:text-lg">
              Live statistics reflecting continuous coding practice, open-source commits, and technology breakdown.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <StatImageCard
              src={statsUrl}
              alt={`${USER} GitHub stats`}
              className="max-h-64 object-contain"
            />
            <StatImageCard
              src={streakUrl}
              alt={`${USER} GitHub streak`}
              className="max-h-64 object-contain"
            />
            <StatImageCard
              src={langsUrl}
              alt={`${USER} top languages`}
              className="mx-auto max-h-64 max-w-3xl object-contain"
              containerClassName="lg:col-span-2"
            />
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
