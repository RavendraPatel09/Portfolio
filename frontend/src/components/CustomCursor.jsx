import { useEffect, useRef, useState } from 'react'

const TRAIL = 8

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const dot = useRef(null)
  const ring = useRef(null)
  const trailEls = useRef([])
  const points = useRef([])
  const raf = useRef(0)
  const mouse = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Only enable if pointer is fine and user has not requested reduced motion
    const mqPointer = window.matchMedia('(pointer: fine)')
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!mqPointer.matches || mqMotion.matches) return
    setEnabled(true)

    document.body.classList.add('has-custom-cursor')

    const move = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      const d = dot.current
      if (d) {
        d.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }

      points.current.push({ x: e.clientX, y: e.clientY, t: performance.now() })
      if (points.current.length > TRAIL + 4) points.current.shift()
    }

    const loop = () => {
      const now = performance.now()
      // Smooth lerp for outer ring
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.18
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.18

      const r = ring.current
      if (r) {
        r.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }

      // Filter expired points
      points.current = points.current.filter((p) => now - p.t < 280)
      const pts = points.current

      trailEls.current.forEach((el, i) => {
        if (!el) return
        const idx = Math.max(0, pts.length - 1 - i * 2)
        const p = pts[idx]
        if (!p) {
          el.style.opacity = '0'
          return
        }
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
        el.style.opacity = String(Math.max(0, 0.4 - (i / TRAIL) * 0.35))
      })

      raf.current = requestAnimationFrame(loop)
    }

    raf.current = requestAnimationFrame(loop)
    window.addEventListener('mousemove', move, { passive: true })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden>
      {/* Outer subtle ring with smooth lerp lag */}
      <div
        ref={ring}
        className="fixed left-0 top-0 h-8 w-8 -ml-4 -mt-4 rounded-full border border-[var(--neon)]/40 transition-opacity duration-150 will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
      {/* Core pinpoint dot */}
      <div
        ref={dot}
        className="fixed left-0 top-0 h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)] will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
      {/* Particle trail */}
      {Array.from({ length: TRAIL }).map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            trailEls.current[i] = el
          }}
          className="fixed left-0 top-0 h-1 w-1 -ml-0.5 -mt-0.5 rounded-full bg-[var(--electric)] opacity-0 will-change-transform"
          style={{ transform: 'translate3d(-100px, -100px, 0)' }}
        />
      ))}
    </div>
  )
}
