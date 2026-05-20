import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'
import { useActiveSection } from '../hooks/useActiveSection'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function MagneticWrap({ children, strength = 0.22 }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(strength)
  return (
    <span ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="inline-block transition-transform duration-200 ease-out will-change-transform">
      {children}
    </span>
  )
}

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const active = useActiveSection()

  const scrollTo = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-[9000] px-4 pt-4 sm:px-6">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-[var(--glass-border)] px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => scrollTo('home')}
          className="group relative flex items-center gap-2"
          aria-label="Home"
        >
          <span className="font-display relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--neon)]/20 to-[var(--electric)]/10 text-lg font-bold text-[var(--neon)] shadow-[0_0_24px_rgba(0,255,157,0.25)] ring-1 ring-[var(--neon)]/30 transition group-hover:shadow-[0_0_36px_rgba(0,255,157,0.45)]">
            RP
            <span className="pointer-events-none absolute inset-0 rounded-xl bg-[var(--neon)]/10 opacity-0 blur-md transition group-hover:opacity-100" />
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-wide text-[var(--text-muted)] sm:block">
            RavendraPatel09
          </span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = active === l.id
            return (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(l.id)}
                  className="relative px-3 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text)]"
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="navline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-[var(--neon)] to-[var(--electric)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <MagneticWrap>
            <button
              type="button"
              onClick={toggleTheme}
              className="glass flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--text)] transition hover:border-[var(--neon)]/40 hover:shadow-[0_0_20px_rgba(0,255,157,0.12)]"
              aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </MagneticWrap>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mt-3 flex flex-col gap-1 rounded-2xl border border-[var(--glass-border)] p-3 md:hidden"
          >
            {links.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => scrollTo(l.id)}
                className={`rounded-xl px-4 py-3 text-left text-sm font-medium ${
                  active === l.id ? 'bg-[var(--neon)]/10 text-[var(--neon)]' : 'text-[var(--text-muted)]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
