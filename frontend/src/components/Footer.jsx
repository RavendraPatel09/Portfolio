import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

function MagneticIcon({ href, label, children }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.35
    const y = (e.clientY - r.top - r.height / 2) * 0.35
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
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] text-[var(--text-muted)] transition hover:border-[var(--neon)]/40 hover:text-[var(--neon)]"
    >
      <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-flex transition-transform duration-200">
        {children}
      </span>
    </a>
  )
}

export default function Footer({ onTop }) {
  return (
    <footer className="relative z-[2] border-t border-[var(--glass-border)] px-6 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-lg font-semibold text-[var(--text)]">Built with ❤️ by Ravendra Patel</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">© 2025 Ravendra Patel. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-3">
          <MagneticIcon href="https://github.com/RavendraPatel09" label="GitHub">
            <Github size={20} />
          </MagneticIcon>
          <MagneticIcon href="https://www.linkedin.com/in/ravendra-patel-3bb375338/" label="LinkedIn">
            <Linkedin size={20} />
          </MagneticIcon>
          <MagneticIcon href="mailto:patelsamerth9@gmail.com" label="Email">
            <Mail size={20} />
          </MagneticIcon>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onTop}
            className="ml-2 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--neon)]/35 bg-[var(--neon)]/10 text-[var(--neon)]"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
