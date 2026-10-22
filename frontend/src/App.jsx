import { useCallback, useEffect, useRef, useState } from 'react'

import { ThemeProvider, useTheme } from './context/ThemeContext.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import GitHubStats from './components/GitHubStats.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'

function MainLayout() {
  const { theme, toggleTheme } = useTheme()
  const [loaderDone, setLoaderDone] = useState(false)
  const [progress, setProgress] = useState(0)
  const lenisRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoaderDone(true), 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    let lenis = null
    let raf = 0
    let handleScroll = null
    let alive = true

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const updateNative = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }

    if (prefersReducedMotion) {
      window.addEventListener('scroll', updateNative, { passive: true })
      return () => window.removeEventListener('scroll', updateNative)
    }

    ;(async () => {
      try {
        const { default: Lenis } = await import('lenis')
        if (!alive) return

        lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 1 })
        lenisRef.current = lenis
        handleScroll = (l) => setProgress(typeof l.progress === 'number' ? l.progress : 0)
        lenis.on('scroll', handleScroll)

        const tick = (time) => {
          lenis.raf(time)
          raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      } catch {
        if (!alive) return
        updateNative()
        window.addEventListener('scroll', updateNative, { passive: true })
      }
    })()

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', updateNative)
      if (lenis && handleScroll) lenis.off('scroll', handleScroll)
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTop = useCallback(() => {
    const l = lenisRef.current
    if (l) l.scrollTo(0, { duration: 1.1 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="grain relative min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      {/* Top scroll progress indicator with ambient glow */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[10003] h-[2.5px] w-full origin-left bg-gradient-to-r from-[var(--neon)] to-[var(--electric)] shadow-[0_0_12px_rgba(0,255,157,0.8)]"
        style={{ transform: `scaleX(${progress})` }}
      />

      <Loader done={loaderDone} />

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="relative z-[2]">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubStats theme={theme} />
        <Contact />
      </main>

      <Footer onTop={scrollTop} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  )
}
