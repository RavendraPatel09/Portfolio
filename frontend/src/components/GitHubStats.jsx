import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, GitCommit, Star, ExternalLink, Code2, Flame } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useTheme } from '../context/ThemeContext'

const USER = 'RavendraPatel09'
const base = 'https://github-readme-stats.vercel.app'
const streak = 'https://github-readme-streak-stats.demolab.com'

function getStatsUrl(isLight) {
  const bg = isLight ? 'ffffff' : '0a0a0f'
  const title = isLight ? '059669' : '00FF9D'
  const icon = isLight ? '0284c7' : '00B4FF'
  const text = isLight ? '0f172a' : 'FFFFFF'

  return `${base}/api?username=${USER}&show_icons=true&hide_border=true&bg_color=${bg}&title_color=${title}&icon_color=${icon}&text_color=${text}&border_radius=16&cache_seconds=1800`
}

function getLangsUrl(isLight) {
  const bg = isLight ? 'ffffff' : '0a0a0f'
  const title = isLight ? '059669' : '00FF9D'
  const text = isLight ? '0f172a' : 'FFFFFF'

  return `${base}/api/top-langs/?username=${USER}&layout=compact&hide_border=true&bg_color=${bg}&title_color=${title}&text_color=${text}&border_radius=16&cache_seconds=1800`
}

function getStreakUrl(isLight) {
  if (isLight) {
    return `${streak}/?user=${USER}&theme=light&hide_border=true&background=ffffff&border=ffffff&ring=059669&fire=0284c7&currStreakLabel=059669&sideLabels=0284c7&currStreakNum=0f172a&sideNums=0f172a&dates=64748b&border_radius=16`
  }
  return `${streak}/?user=${USER}&theme=dark&hide_border=true&background=0a0a0f&ring=00FF9D&fire=00B4FF&currStreakLabel=00FF9D&sideLabels=00B4FF&border_radius=16`
}

function StatImageCard({ src, alt, className = '', containerClassName = '', fallbackType = 'stats' }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  // Reset loading & failure state immediately whenever src (theme) changes
  useEffect(() => {
    setLoaded(false)
    setFailed(false)
  }, [src])

  return (
    <div
      className={`glass relative overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-4 sm:p-5 flex items-center justify-center transition-all duration-300 shadow-[var(--card-shadow)] hover:border-[var(--neon)]/30 ${containerClassName}`}
    >
      {/* Loading Skeleton */}
      {!loaded && !failed && (
        <div className="flex h-52 w-full animate-pulse flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--chip-bg)] p-6 text-xs text-[var(--text-muted)]">
          <div className="h-6 w-36 rounded-lg bg-[var(--text-muted)]/15" />
          <div className="h-24 w-full max-w-sm rounded-xl bg-[var(--text-muted)]/10" />
          <span className="font-mono text-[11px] text-[var(--text-muted)]">Loading GitHub data…</span>
        </div>
      )}

      {/* Fallback View if External SVG Service is Down / Blocked */}
      {failed ? (
        <div className="flex min-h-[13rem] w-full flex-col justify-between rounded-2xl border border-[var(--glass-border)] bg-[var(--chip-bg)] p-5 text-center">
          <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--neon)]/10 text-[var(--neon)]">
                {fallbackType === 'streak' ? <Flame size={15} /> : fallbackType === 'langs' ? <Code2 size={15} /> : <Activity size={15} />}
              </span>
              <span className="text-xs font-bold text-[var(--text)]">
                {fallbackType === 'streak' ? 'Contribution Streak' : fallbackType === 'langs' ? 'Top Languages' : 'GitHub Overview'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[var(--electric)]">@{USER}</span>
          </div>

          <div className="py-4">
            {fallbackType === 'langs' ? (
              <div className="space-y-3 text-left">
                <p className="text-xs text-[var(--text-muted)]">
                  Primary programming languages utilized across project repositories:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg border border-[var(--glass-border)] bg-[var(--card-bg)] px-3 py-1 text-xs font-semibold text-[var(--neon)]">
                    Python
                  </span>
                  <span className="rounded-lg border border-[var(--glass-border)] bg-[var(--card-bg)] px-3 py-1 text-xs font-semibold text-[var(--electric)]">
                    C++
                  </span>
                  <span className="rounded-lg border border-[var(--glass-border)] bg-[var(--card-bg)] px-3 py-1 text-xs font-semibold text-amber-400">
                    JavaScript
                  </span>
                </div>
              </div>
            ) : fallbackType === 'streak' ? (
              <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-4 text-center">
                <p className="font-display text-base font-bold text-[var(--electric)]">
                  Continuous Coding Practice
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  View full commit history and streak metrics on GitHub.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-4 text-center">
                <p className="font-display text-base font-bold text-[var(--neon)]">
                  Public Repositories &amp; Code
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Explore full project repositories and code activity on GitHub.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-[var(--text-muted)]">Metrics available directly on profile</span>
            <a
              href={`https://github.com/${USER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--neon)] transition-colors hover:text-[var(--text)]"
            >
              <span>View GitHub</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      ) : (
        <img
          key={src}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-auto w-full transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'
          } ${className}`}
        />
      )}
    </div>
  )
}

export default function GitHubStats({ theme: propTheme }) {
  const { theme: ctxTheme, isLight: ctxIsLight } = useTheme()
  const activeTheme = propTheme || ctxTheme
  const isLight = activeTheme === 'light' || ctxIsLight

  const statsUrl = getStatsUrl(isLight)
  const streakUrl = getStreakUrl(isLight)
  const langsUrl = getLangsUrl(isLight)

  return (
    <SectionReveal>
      <section id="github-stats" className="scroll-mt-24 px-6 py-14 sm:py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[var(--electric)]/30 bg-[var(--electric)]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--electric)]">
              Activity &amp; Metrics
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              GitHub Insights <span className="text-[var(--electric)]">🌌</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--text-muted)] sm:text-lg">
              Explore code repositories, commits, and activity directly on GitHub.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:gap-5 lg:grid-cols-2">
            <StatImageCard
              src={statsUrl}
              alt={`${USER} GitHub stats`}
              fallbackType="stats"
              className="max-h-64 object-contain"
            />
            <StatImageCard
              src={streakUrl}
              alt={`${USER} GitHub streak`}
              fallbackType="streak"
              className="max-h-64 object-contain"
            />
            <StatImageCard
              src={langsUrl}
              alt={`${USER} top languages`}
              fallbackType="langs"
              className="mx-auto max-h-64 max-w-3xl object-contain"
              containerClassName="lg:col-span-2"
            />
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
