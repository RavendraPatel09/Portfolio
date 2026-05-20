import { useEffect, useRef } from 'react'

const TRAIL = 12

export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const trailEls = useRef([])
  const points = useRef([])
  const raf = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    document.body.classList.add('has-custom-cursor')

    const move = (e) => {
      const d = dot.current
      const r = ring.current
      if (d) {
        d.style.left = `${e.clientX}px`
        d.style.top = `${e.clientY}px`
      }
      if (r) {
        r.style.left = `${e.clientX}px`
        r.style.top = `${e.clientY}px`
      }
      points.current.push({ x: e.clientX, y: e.clientY, t: performance.now() })
      if (points.current.length > TRAIL + 4) points.current.shift()
    }

    const loop = () => {
      const now = performance.now()
      points.current = points.current.filter((p) => now - p.t < 400)
      const pts = points.current
      trailEls.current.forEach((el, i) => {
        if (!el) return
        const idx = Math.max(0, pts.length - 1 - i * 2)
        const p = pts[idx]
        if (!p) {
          el.style.opacity = '0'
          return
        }
        el.style.left = `${p.x}px`
        el.style.top = `${p.y}px`
        el.style.opacity = String(0.12 + (i / TRAIL) * 0.5)
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

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null
  }

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed z-[10001] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--neon)]/40 mix-blend-difference transition-transform duration-150 ease-out will-change-transform"
        style={{ left: 0, top: 0 }}
        aria-hidden
      />
      <div
        ref={dot}
        className="pointer-events-none fixed z-[10002] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--neon)] shadow-[0_0_12px_var(--neon)] will-change-transform"
        style={{ left: 0, top: 0 }}
        aria-hidden
      />
      {Array.from({ length: TRAIL }).map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            trailEls.current[i] = el
          }}
          className="pointer-events-none fixed z-[10000] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--electric)]/70 opacity-0"
          aria-hidden
        />
      ))}
    </>
  )
}
