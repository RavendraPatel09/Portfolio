import { useCallback, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import GitHubStats from './components/GitHubStats.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Loader from './components/Loader.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('rp-theme') || 'dark')
  const [loaderDone, setLoaderDone] = useState(false)
  const [progress, setProgress] = useState(0)
  const lenisRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('rp-theme', theme)
  }, [theme])

  useEffect(() => {
    const t = setTimeout(() => setLoaderDone(true), 1650)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const onScroll = ({ progress: p }) => setProgress(typeof p === 'number' ? p : 0)
    lenis.on('scroll', onScroll)

    let raf = 0
    const tick = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    ScrollTrigger.refresh()

    return () => {
      cancelAnimationFrame(raf)
      lenis.off('scroll', onScroll)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const scrollTop = useCallback(() => {
    const l = lenisRef.current
    if (l) l.scrollTo(0, { duration: 1.1 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="grain relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div
        className="pointer-events-none fixed left-0 top-0 z-[10003] h-[3px] w-full origin-left bg-gradient-to-r from-[var(--neon)] to-[var(--electric)]"
        style={{ transform: `scaleX(${progress})` }}
      />

      <Loader done={loaderDone} />
      {loaderDone && <CustomCursor />}

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubStats />
        <Contact />
      </main>

      <Footer onTop={scrollTop} />
    </div>
  )
}
