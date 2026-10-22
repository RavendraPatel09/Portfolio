import { useEffect, useRef, useState, useCallback } from 'react'
import { Cpu, ShieldCheck, Code2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

/**
 * Physically Believable Hanging Personal Developer ID Credential Badge
 * 
 * Key Features:
 * - Anchored suspension with coordinated compound pendulum dynamics:
 *   * Fixed ceiling anchor for woven strap
 *   * Compliant fabric strap response
 *   * Heavy card rotational inertia pivoting directly on the metal clasp hook
 *   * Clasp hook remains physically locked in the card punch slot throughout all motion
 * - Authentic woven herringbone fabric lanyard with sewn center accent thread and edge seams
 * - Brushed steel crimp clamp, chrome swivel ring, and realistic bulldog/lobster clasp
 * - Dynamic 3D perspective tilt, realistic specular sheen, and ambient drop shadow
 * - Full Dark & Light Mode theme adaptation with instantaneous reactivity
 * - Authentic personal developer information (NO fictional passes, access levels, or event names)
 * - Hardware-accelerated RAF transforms, zero React re-renders during motion, 0% CPU at rest
 * - Respects prefers-reduced-motion
 */
export default function HangingIdCard() {
  const strapRef = useRef(null)
  const cardHingeRef = useRef(null)
  const cardRef = useRef(null)
  const shineRef = useRef(null)
  const shadowRef = useRef(null)

  const { isLight: ctxIsLight } = useTheme()

  // Track light mode reactively via both Context & MutationObserver
  const [domIsLight, setDomIsLight] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('light')
    }
    return false
  })

  useEffect(() => {
    const checkTheme = () => {
      setDomIsLight(document.documentElement.classList.contains('light'))
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  const isLight = ctxIsLight ?? domIsLight

  // Physics state stored in ref for 60-120fps direct transform updates without React re-renders
  const sim = useRef({
    thetaCard: 4.5,       // Main card pendulum angle (deg)
    omegaCard: 0.0,       // Card angular velocity (deg/s)
    thetaStrap: 3.5,      // Flexible lanyard angle (deg)
    omegaStrap: 0.0,      // Strap angular velocity (deg/s)
    twist: 0.0,           // 3D Yaw rotation (deg)
    pitch: 0.0,           // 3D Pitch rotation (deg)
    targetTwist: 0.0,
    targetPitch: 0.0,
    cursorX: 0,
    cursorY: 0,
    cursorVx: 0,
    cursorVy: 0,
    isDragging: false,
    lastTime: performance.now(),
    isHovered: false,
    active: true,         // When false, physics loop sleeps
    reducedMotion: false,
  })

  const [interactive, setInteractive] = useState(true)

  // Wake up physics loop if asleep
  const wakeUp = useCallback(() => {
    if (!sim.current.active && !sim.current.reducedMotion) {
      sim.current.active = true
      sim.current.lastTime = performance.now()
      requestAnimationFrame(tick)
    }
  }, [])

  // Physics animation tick
  const tick = useCallback((now) => {
    const s = sim.current
    if (!s.active) return

    // Delta time clamped to protect against tab-switch jumps (max 33ms)
    const dt = Math.min((now - s.lastTime) / 1000, 0.033)
    s.lastTime = now

    if (!s.isDragging) {
      // Physical constants for card pendulum
      const gravityFrequency = 14.5   // Restorative pendulum frequency toward vertical
      const damping = 2.25            // Natural air and pivot friction damping
      const maxAngle = 28.0           // Maximum realistic swing limit

      // Gravitational restoration on the heavier card
      let cardAccel = -gravityFrequency * s.thetaCard - damping * s.omegaCard

      // Ambient cursor disturbance field
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        const cardCenterX = rect.left + rect.width / 2
        const cardCenterY = rect.top + rect.height * 0.55

        const distDx = s.cursorX - cardCenterX
        const distDy = s.cursorY - cardCenterY
        const distance = Math.hypot(distDx, distDy)
        const influenceRadius = 240

        if (distance < influenceRadius && (s.cursorX !== 0 || s.cursorY !== 0)) {
          const proximity = Math.max(0, 1 - distance / influenceRadius)

          // Velocity torque (wind impulse when cursor sweeps past)
          const velocityTorque = s.cursorVx * proximity * 0.032
          cardAccel += velocityTorque

          // Proximity displacement push
          const displacementTorque = (distDx / influenceRadius) * proximity * 18.0
          cardAccel += displacementTorque

          // Dynamic 3D tilt target (yaw and pitch)
          s.targetTwist = Math.max(-12, Math.min(12, (distDx / influenceRadius) * 14))
          s.targetPitch = Math.max(-8, Math.min(8, (-distDy / influenceRadius) * 10))
        } else {
          s.targetTwist = 0
          s.targetPitch = 0
        }
      }

      // Card Euler-Cromer integration
      s.omegaCard += cardAccel * dt
      s.thetaCard += s.omegaCard * dt

      // Card swing tension limit
      if (Math.abs(s.thetaCard) > maxAngle) {
        s.thetaCard = Math.sign(s.thetaCard) * maxAngle
        s.omegaCard = -s.omegaCard * 0.3
      }

      // Strap compliance: the strap is pulled by the card with realistic fabric compliance
      const strapAccel = (s.thetaCard - s.thetaStrap) * 48.0 - 8.5 * s.omegaStrap
      s.omegaStrap += strapAccel * dt
      s.thetaStrap += s.omegaStrap * dt

      // Smooth 3D tilt lerp
      s.twist += (s.targetTwist - s.twist) * 0.12
      s.pitch += (s.targetPitch - s.pitch) * 0.12
    }

    // Relative angle between card and strap at the clasp hook pivot
    const relativeHingeAngle = Math.max(-10, Math.min(10, (s.thetaCard - s.thetaStrap) * 0.72))

    // Apply hardware-accelerated transforms directly to DOM elements
    if (strapRef.current) {
      strapRef.current.style.transform = `rotate(${s.thetaStrap.toFixed(3)}deg)`
    }
    if (cardHingeRef.current) {
      cardHingeRef.current.style.transform = `rotate(${relativeHingeAngle.toFixed(3)}deg)`
    }
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateY(${s.twist.toFixed(2)}deg) rotateX(${s.pitch.toFixed(2)}deg)`
    }
    if (shineRef.current) {
      const glareX = -s.twist * 10
      const glareY = -s.pitch * 10
      shineRef.current.style.transform = `translate3d(${glareX.toFixed(1)}px, ${glareY.toFixed(1)}px, 0)`
      shineRef.current.style.opacity = `${(0.16 + Math.abs(s.twist) * 0.012 + Math.abs(s.pitch) * 0.012).toFixed(2)}`
    }
    if (shadowRef.current) {
      const shadowX = -s.thetaCard * 1.5
      const shadowY = 14 + Math.abs(s.thetaCard) * 0.4
      shadowRef.current.style.transform = `translate3d(${shadowX.toFixed(1)}px, ${shadowY.toFixed(1)}px, 0) scale(${Math.max(0.88, 1 - Math.abs(s.thetaCard) * 0.006).toFixed(3)})`
    }

    // Decay cursor velocity
    s.cursorVx *= 0.72
    s.cursorVy *= 0.72

    // Sleep check: pause RAF loop when completely stationary to save CPU/battery
    const isStationary =
      Math.abs(s.thetaCard) < 0.02 &&
      Math.abs(s.omegaCard) < 0.03 &&
      Math.abs(s.thetaStrap) < 0.02 &&
      Math.abs(s.omegaStrap) < 0.03 &&
      Math.abs(s.twist) < 0.05 &&
      Math.abs(s.pitch) < 0.05 &&
      Math.abs(s.targetTwist) < 0.01 &&
      Math.abs(s.targetPitch) < 0.01

    if (isStationary && !s.isHovered && !s.isDragging) {
      s.thetaCard = 0
      s.omegaCard = 0
      s.thetaStrap = 0
      s.omegaStrap = 0
      s.twist = 0
      s.pitch = 0
      s.active = false
      if (strapRef.current) strapRef.current.style.transform = 'rotate(0deg)'
      if (cardHingeRef.current) cardHingeRef.current.style.transform = 'rotate(0deg)'
      if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
      return
    }

    requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    // Check reduced motion preference
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mqMotion.matches) {
      sim.current.reducedMotion = true
      sim.current.thetaCard = 0
      sim.current.thetaStrap = 0
      sim.current.active = false
      setInteractive(false)
      return
    }

    // Start natural entrance sway
    sim.current.lastTime = performance.now()
    const frameId = requestAnimationFrame(tick)

    const handleMouseMove = (e) => {
      const s = sim.current
      if (s.cursorX !== 0 && s.cursorY !== 0) {
        s.cursorVx = e.clientX - s.cursorX
        s.cursorVy = e.clientY - s.cursorY
      }
      s.cursorX = e.clientX
      s.cursorY = e.clientY

      wakeUp()
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      sim.current.active = false
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [tick, wakeUp])

  // Direct Interactive Pointer Drag handlers
  const handlePointerDown = (e) => {
    if (!interactive) return
    const s = sim.current
    s.isDragging = true
    s.isHovered = true
    e.currentTarget.setPointerCapture(e.pointerId)
    wakeUp()
  }

  const handlePointerMove = (e) => {
    const s = sim.current
    if (!s.isDragging || !strapRef.current) return

    const rect = strapRef.current.getBoundingClientRect()
    const pivotX = rect.left + rect.width / 2
    const pivotY = rect.top

    // Calculate angle from pivot to pointer
    const dx = e.clientX - pivotX
    const dy = Math.max(60, e.clientY - pivotY)
    const angle = (Math.atan2(dx, dy) * 180) / Math.PI

    s.thetaCard = Math.max(-28, Math.min(28, angle))
    s.thetaStrap = s.thetaCard * 0.85
    s.omegaCard = 0
    s.omegaStrap = 0
    s.twist = Math.max(-12, Math.min(12, (dx / 120) * 12))
    s.pitch = Math.max(-8, Math.min(8, (-dy / 250) * 8))
  }

  const handlePointerUp = (e) => {
    const s = sim.current
    if (s.isDragging) {
      s.isDragging = false
      s.isHovered = false
      // Impart release fling velocity
      s.omegaCard = s.cursorVx * 0.65
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
      wakeUp()
    }
  }

  return (
    <div
      className="pointer-events-none select-none relative z-20 flex flex-col items-center"
      style={{ perspective: 1200 }}
      aria-hidden="true"
    >
      {/* 
        === SUSPENSION STRAP ASSEMBLY ===
        Fixed ceiling anchor at (50% 0%). Rotates by strapTheta with fabric compliance.
      */}
      <div
        ref={strapRef}
        className="flex flex-col items-center will-change-transform"
        style={{
          transformOrigin: '50% 0px',
          transform: 'rotate(4.5deg)',
          transition: interactive ? 'none' : 'transform 0.5s ease-out',
        }}
      >
        {/* 1. WOVEN FABRIC LANYARD STRAP */}
        <div className="relative flex flex-col items-center">
          <div
            className={`h-20 w-[22px] relative overflow-hidden rounded-t-sm shadow-sm border-x transition-colors duration-300 ${
              isLight
                ? 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-slate-600/30'
                : 'bg-gradient-to-r from-[#181d29] via-[#1e2536] to-[#181d29] border-white/10'
            }`}
          >
            {/* Woven herringbone fabric texture */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 3px)',
              }}
            />
            {/* Center stitched accent rail */}
            <div
              className={`absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 transition-colors duration-300 ${
                isLight
                  ? 'bg-gradient-to-b from-emerald-500 via-emerald-400 to-sky-500 shadow-[0_0_4px_rgba(16,185,129,0.4)]'
                  : 'bg-gradient-to-b from-[var(--neon)] via-[var(--neon)]/60 to-[var(--electric)] shadow-[0_0_5px_var(--neon)]'
              }`}
            />
            {/* Edge sewn seams */}
            <div className="absolute inset-y-0 left-0 w-[1px] bg-white/20" />
            <div className="absolute inset-y-0 right-0 w-[1px] bg-black/40" />
          </div>

          {/* 2. BRUSHED METAL CRIMP CLAMP */}
          <div
            className={`relative -mt-0.5 h-3.5 w-6 rounded-sm border shadow-md flex items-center justify-center transition-colors duration-300 ${
              isLight
                ? 'bg-gradient-to-r from-slate-300 via-slate-200 to-slate-400 border-slate-400/50'
                : 'bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-800 border-white/20'
            }`}
          >
            <div className="h-[1px] w-4 bg-white/40 shadow-sm" />
          </div>

          {/* 3. CHROME SWIVEL RING & LOBSTER CLASP */}
          <div className="relative -mt-0.5 flex flex-col items-center z-10">
            {/* Swivel Ring */}
            <div
              className={`h-4 w-4 rounded-full border-2 bg-transparent shadow-sm flex items-center justify-center transition-colors duration-300 ${
                isLight ? 'border-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.15)]' : 'border-zinc-300 shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full border ${
                  isLight ? 'border-slate-300 bg-slate-200' : 'border-zinc-400 bg-zinc-700/60'
                }`}
              />
            </div>

            {/* Bulldog / Lobster Clasp Body */}
            <div className="relative -mt-1 h-5 w-3.5 rounded-sm bg-gradient-to-b from-slate-200 via-slate-400 to-slate-500 shadow-md border border-white/60 flex flex-col items-center justify-between py-0.5">
              <div className="h-1 w-2 rounded-full bg-slate-600/50" />
              <div className="h-2 w-1.5 rounded-t-sm bg-gradient-to-b from-slate-400 to-slate-600 border-t border-white/80" />
            </div>

            {/* Curved Hook Beak looping directly through card punch slot */}
            <div className="relative -mt-0.5 h-3.5 w-2 rounded-b-md bg-gradient-to-b from-slate-400 to-slate-200 border-x border-b border-black/30 shadow-inner" />
          </div>
        </div>

        {/* 
          === CARD HINGE ASSEMBLY ===
          Pivots right at the slot punch hole (50% 12px) where the clasp hook penetrates!
          The hook and punch slot remain physically interlocked in 100% synchronization.
        */}
        <div
          ref={cardHingeRef}
          className="relative -mt-1.5 pointer-events-auto will-change-transform"
          style={{
            transformOrigin: '50% 12px',
          }}
        >
          {/* Card Physical Ambient Drop Shadow */}
          <div
            ref={shadowRef}
            className={`absolute inset-0 rounded-2xl blur-xl pointer-events-none transition-all duration-300 will-change-transform ${
              isLight ? 'bg-slate-900/15' : 'bg-black/55'
            }`}
            style={{ transform: 'translate3d(0px, 14px, 0px)' }}
          />

          {/* Main Card Body with Interactive Pointer Grab / Drag */}
          <div
            ref={cardRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`relative w-[230px] h-[332px] rounded-2xl p-[1px] overflow-hidden cursor-grab active:cursor-grabbing transition-colors duration-300 will-change-transform touch-none ${
              isLight
                ? 'shadow-[0_16px_36px_-10px_rgba(15,23,42,0.16),0_1px_3px_rgba(15,23,42,0.06)] bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200'
                : 'shadow-[0_24px_48px_-12px_rgba(0,0,0,0.75)] bg-gradient-to-b from-white/20 via-[var(--neon)]/20 to-[var(--electric)]/20'
            }`}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Card Inner Plastic Casing - Theme Aware Surface */}
            <div
              className={`relative h-full w-full rounded-2xl flex flex-col justify-between p-4 overflow-hidden border transition-colors duration-300 ${
                isLight
                  ? 'bg-gradient-to-b from-white via-slate-50 to-slate-100/90 border-white/80'
                  : 'bg-gradient-to-b from-[#101524] via-[#0c101a] to-[#090d16] border-white/[0.08]'
              }`}
            >
              {/* Dynamic Specular Light Glare (Shifts realistically with card tilt) */}
              <div
                ref={shineRef}
                className="pointer-events-none absolute -inset-20 z-30 transition-transform duration-75 ease-out opacity-20 will-change-transform"
                style={{
                  background: isLight
                    ? 'linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.7) 45%, rgba(2,132,199,0.2) 55%, transparent 75%)'
                    : 'linear-gradient(115deg, transparent 30%, rgba(0,255,157,0.25) 45%, rgba(0,180,255,0.35) 55%, transparent 70%)',
                  mixBlendMode: isLight ? 'overlay' : 'screen',
                }}
              />

              {/* Security Micro-Grid Pattern */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage: isLight
                    ? 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)'
                    : 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* --- CARD TOP: PUNCH SLOT --- */}
              <div className="flex flex-col items-center">
                {/* Real Punch Hole Cutout (Slot for Clasp Hook) */}
                <div
                  className={`relative h-2 w-9 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                    isLight
                      ? 'bg-slate-200 border-slate-300/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)]'
                      : 'bg-[#040507] border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.95)]'
                  }`}
                >
                  <div className={`h-1 w-7 rounded-full ${isLight ? 'bg-slate-400/60' : 'bg-black/80'}`} />
                </div>
              </div>

              {/* --- CARD CENTER: PERSONAL DEVELOPER IDENTITY --- */}
              <div className="my-auto flex flex-col items-center text-center pt-2">
                {/* Center Identity Panel */}
                <div className="relative mb-2.5">
                  {/* Subtle Ambient Backlight */}
                  <div
                    className={`absolute -inset-1.5 rounded-2xl blur-md transition-opacity duration-300 ${
                      isLight
                        ? 'bg-gradient-to-tr from-emerald-500/20 to-sky-500/20 opacity-60'
                        : 'bg-gradient-to-tr from-[var(--neon)]/30 to-[var(--electric)]/25 opacity-80'
                    }`}
                  />

                  {/* Physical Geometric Core Badge */}
                  <div
                    className={`relative h-20 w-20 rounded-2xl border p-1 shadow-inner flex flex-col items-center justify-center transition-colors duration-300 ${
                      isLight
                        ? 'bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 border-emerald-300/80'
                        : 'bg-gradient-to-br from-[#0e241c] via-[#091512] to-[#0a1824] border-[var(--neon)]/50'
                    }`}
                  >
                    <div
                      className={`h-full w-full rounded-xl flex flex-col items-center justify-center border relative overflow-hidden transition-colors duration-300 ${
                        isLight
                          ? 'bg-gradient-to-br from-emerald-100/50 via-transparent to-sky-100/50 border-slate-200/60'
                          : 'bg-gradient-to-br from-[var(--neon)]/20 via-transparent to-[var(--electric)]/20 border-white/10'
                      }`}
                    >
                      {/* Stylized RP Monogram */}
                      <span
                        className={`font-display text-2xl font-black tracking-tight drop-shadow-sm transition-colors duration-300 ${
                          isLight ? 'text-slate-900' : 'text-[var(--text)] drop-shadow-[0_2px_12px_rgba(0,255,157,0.5)]'
                        }`}
                      >
                        RP
                      </span>

                      {/* Micro circuit indicator */}
                      <div className="absolute bottom-1 flex items-center gap-1 opacity-75">
                        <Cpu size={10} className={isLight ? 'text-emerald-700' : 'text-[var(--neon)]'} />
                        <span
                          className={`font-mono text-[7px] font-bold ${
                            isLight ? 'text-emerald-800' : 'text-[var(--neon)]'
                          }`}
                        >
                          SOFTWARE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Developer Name */}
                <h4
                  className={`font-display text-lg font-bold tracking-tight transition-colors duration-300 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Ravendra Patel
                </h4>

                {/* Role Pill */}
                <div
                  className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 transition-colors duration-300 ${
                    isLight
                      ? 'border-sky-300 bg-sky-50 text-sky-800'
                      : 'border-[var(--electric)]/40 bg-[var(--electric)]/15 text-[var(--electric)]'
                  }`}
                >
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em]">
                    Software Developer
                  </span>
                </div>

                {/* Institution & Year */}
                <p
                  className={`mt-2 text-[10px] font-medium transition-colors duration-300 ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  CS Engineering · OIST Bhopal &apos;28
                </p>
              </div>

              {/* --- CARD BOTTOM: HOLOGRAPHIC SECURITY LINE --- */}
              <div
                className={`border-t pt-2.5 transition-colors duration-300 ${
                  isLight ? 'border-slate-200/80' : 'border-white/[0.08]'
                }`}
              >
                {/* Iridescent Security Foil Bar */}
                <div
                  className={`h-1.5 w-full rounded-full shadow-sm mb-2 transition-opacity duration-300 ${
                    isLight
                      ? 'bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 opacity-80'
                      : 'bg-gradient-to-r from-[var(--neon)] via-[var(--electric)] to-violet-400 opacity-70 shadow-[0_0_8px_rgba(0,255,157,0.3)]'
                  }`}
                />

                {/* Clean Developer Identity Status */}
                <div
                  className={`flex items-center justify-between text-[8px] font-mono transition-colors duration-300 ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={11} className={isLight ? 'text-emerald-700' : 'text-[var(--neon)]'} />
                    <span>RP · 2028</span>
                  </div>
                  <span className="tracking-widest opacity-80 select-none">ENGINEER</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
