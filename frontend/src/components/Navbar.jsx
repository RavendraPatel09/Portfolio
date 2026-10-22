import { useState, useEffect } from 'react'
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
    <span
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-block transition-transform duration-200 ease-out will-change-transform"
    >
      {children}
    </span>
  )
}

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-[9000] px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 sm:px-6 transition-all duration-300 ${
          scrolled
            ? 'glass border-[var(--glass-border)] bg-[var(--card-bg)]/90 shadow-[var(--card-shadow)] backdrop-blur-xl'
            : 'glass border-[var(--glass-border)] bg-[var(--card-bg)]/70 backdrop-blur-md'
        }`}
      >
        <button
          type="button"
          onClick={() => scrollTo('home')}
          className="group relative flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)] rounded-xl"
          aria-label="Ravendra Patel - Home"
        >
          <span className="font-display relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--neon)]/20 via-[var(--neon)]/10 to-[var(--electric)]/15 text-base font-bold text-[var(--neon)] shadow-[0_0_20px_rgba(0,255,157,0.2)] ring-1 ring-[var(--neon)]/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(0,255,157,0.4)]">
            RP
          </span>
          <div className="hidden flex-col items-start text-left sm:flex">
            <span className="font-display text-sm font-bold tracking-tight text-[var(--text)]">
              Ravendra Patel
            </span>
            <span className="font-mono text-[10px] text-[var(--electric)]">
              Software Developer
            </span>
          </div>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = active === l.id
            return (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(l.id)}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)] rounded-lg ${
                    isActive ? 'text-[var(--text)] font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="navline"
                      className="absolute bottom-0 left-2.5 right-2.5 h-[2px] rounded-full bg-gradient-to-r from-[var(--neon)] to-[var(--electric)] shadow-[0_0_12px_rgba(0,255,157,0.6)]"
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
              className="glass flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--text)] transition-all duration-200 hover:border-[var(--neon)]/40 hover:text-[var(--neon)] hover:shadow-[0_0_20px_rgba(0,255,157,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)]"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </MagneticWrap>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] md:hidden text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)]"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="glass mt-3 flex flex-col gap-1 rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-3 shadow-[var(--card-shadow)] backdrop-blur-2xl md:hidden"
          >
            {links.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => scrollTo(l.id)}
                className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors duration-150 ${
                  active === l.id
                    ? 'bg-[var(--neon)]/15 text-[var(--neon)] border border-[var(--neon)]/30'
                    : 'text-[var(--text-muted)] hover:bg-[var(--chip-bg)] hover:text-[var(--text)]'
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
