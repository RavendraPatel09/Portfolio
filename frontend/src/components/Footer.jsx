import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

function MagneticIcon({ href, label, children }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.3
    const y = (e.clientY - r.top - r.height / 2) * 0.3
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0,0)'
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="glass flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--text-muted)] transition-all duration-200 hover:border-[var(--neon)]/40 hover:text-[var(--neon)] hover:shadow-[0_0_20px_rgba(0,255,157,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)]"
    >
      <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-flex transition-transform duration-200">
        {children}
      </span>
    </a>
  )
}

export default function Footer({ onTop }) {
  return (
    <footer className="relative z-[2] border-t border-[var(--glass-border)] bg-[var(--bg)]/40 px-6 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-display text-base font-bold text-[var(--text)]">
            Designed &amp; Engineered by <span className="text-[var(--neon)]">Ravendra Patel</span>
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Built with React, Vite, Tailwind CSS &amp; Three.js · Focused on craftsmanship &amp; performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <MagneticIcon href="https://github.com/RavendraPatel09" label="GitHub Profile">
            <Github size={18} />
          </MagneticIcon>
          <MagneticIcon href="https://www.linkedin.com/in/ravendra-patel-3bb375338/" label="LinkedIn Profile">
            <Linkedin size={18} />
          </MagneticIcon>
          <MagneticIcon href="mailto:patelsamerth9@gmail.com" label="Direct Email">
            <Mail size={18} />
          </MagneticIcon>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onTop}
            className="ml-2 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--neon)]/40 bg-[var(--neon)]/10 text-[var(--neon)] transition-all duration-200 hover:bg-[var(--neon)]/20 hover:shadow-[0_0_24px_rgba(0,255,157,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)]"
            aria-label="Scroll back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
