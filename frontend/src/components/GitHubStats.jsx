import { motion } from 'framer-motion'
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

export default function GitHubStats() {
  return (
    <SectionReveal>
      <section id="github-stats" className="scroll-mt-24 px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            GitHub Analytics <span className="text-[var(--electric)]">🌌</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--text-muted)]">
            Live cards powered by github-readme-stats — tuned to this portfolio&apos;s neon palette.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={false}
              className="glass overflow-hidden rounded-3xl border border-[var(--glass-border)] p-3"
            >
              <img
                src={statsUrl}
                alt={`${USER} GitHub stats`}
                className="h-auto w-full"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={false}
              className="glass overflow-hidden rounded-3xl border border-[var(--glass-border)] p-3"
            >
              <img
                src={streakUrl}
                alt={`${USER} GitHub streak`}
                className="h-auto w-full"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={false}
              className="glass overflow-hidden rounded-3xl border border-[var(--glass-border)] p-3 lg:col-span-2"
            >
              <img
                src={langsUrl}
                alt={`${USER} top languages`}
                className="mx-auto h-auto w-full max-w-3xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
