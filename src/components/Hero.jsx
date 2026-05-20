import { useMemo, useRef, useState, useEffect, Component, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'

const ROLES = [
  'Passionate Developer 💻',
  'Problem Solver 🧠',
  'Future Tech Innovator 🚀',
  'Gen AI Enthusiast 🤖',
]

function Galaxy({ count = 2800 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 14
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.018
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#00FF9D"
        transparent
        opacity={0.72}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

function Shapes() {
  const ico = useRef()
  const torus = useRef()

  useFrame((_, delta) => {
    if (ico.current) {
      ico.current.rotation.x += delta * 0.12
      ico.current.rotation.y += delta * 0.18
    }
    if (torus.current) {
      torus.current.rotation.x += delta * 0.1
      torus.current.rotation.z += delta * 0.08
    }
  })

  return (
    <>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.35}>
        <mesh ref={ico} position={[-3.2, 0.6, -2]} scale={0.85}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#00B4FF"
            wireframe
            emissive="#00B4FF"
            emissiveIntensity={0.35}
            transparent
            opacity={0.55}
          />
        </mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh ref={torus} position={[3.4, -0.4, -1.2]} scale={0.9}>
          <torusGeometry args={[0.75, 0.22, 24, 64]} />
          <meshStandardMaterial
            color="#00FF9D"
            metalness={0.4}
            roughness={0.25}
            emissive="#00FF9D"
            emissiveIntensity={0.15}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>
    </>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[8, 6, 6]} intensity={1.1} color="#00FF9D" />
      <pointLight position={[-6, -4, 4]} intensity={0.7} color="#00B4FF" />
      <Galaxy />
      <Shapes />
    </>
  )
}

function HeroCanvasFallback() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_25%_20%,rgba(0,255,157,0.14),transparent_45%),radial-gradient(ellipse_at_75%_70%,rgba(0,180,255,0.12),transparent_40%),var(--bg)]"
      aria-hidden
    />
  )
}

class R3FErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: false }
  }

  static getDerivedStateFromError() {
    return { error: true }
  }

  render() {
    if (this.state.error) return <HeroCanvasFallback />
    return this.props.children
  }
}

function Typewriter() {
  const [line, setLine] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const full = ROLES[line % ROLES.length]
    let id

    if (phase === 'typing') {
      if (text.length < full.length) {
        id = setTimeout(() => setText(full.slice(0, text.length + 1)), 78)
      } else {
        id = setTimeout(() => setPhase('deleting'), 1400)
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        id = setTimeout(() => setText(full.slice(0, text.length - 1)), 42)
      } else {
        setLine((l) => l + 1)
        setPhase('typing')
      }
    }

    return () => clearTimeout(id)
  }, [text, phase, line])

  return <span className="type-caret text-[var(--electric)]">{text}</span>
}

function MagneticCTA({ children, onClick, href, download }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.28)
  const common =
    'neon-glow-hover inline-flex cursor-pointer items-center justify-center rounded-xl border border-[var(--neon)]/35 bg-[var(--neon)]/10 px-7 py-3.5 text-sm font-semibold text-[var(--neon)] shadow-[0_0_24px_rgba(0,255,157,0.12)] transition hover:bg-[var(--neon)]/15'

  return (
    <span ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="inline-block">
      {href ? (
        <motion.a
          href={href}
          download={download}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={common}
        >
          {children}
        </motion.a>
      ) : (
        <motion.button
          type="button"
          onClick={onClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={common}
        >
          {children}
        </motion.button>
      )}
    </span>
  )
}

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onScroll = () => {
      const y = window.scrollY
      el.style.setProperty('--py', `${y * 0.12}px`)
      el.style.setProperty('--py2', `${y * 0.06}px`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[var(--bg)] pt-28"
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-90">
        <R3FErrorBoundary>
          <Suspense fallback={<HeroCanvasFallback />}>
            <Canvas
              camera={{ position: [0, 0, 10], fov: 55 }}
              dpr={[1, 1.75]}
              gl={{ alpha: true, antialias: true, powerPreference: 'default' }}
              className="h-full w-full"
            >
              <Scene />
            </Canvas>
          </Suspense>
        </R3FErrorBoundary>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[var(--bg)]/20 via-transparent to-[var(--bg)]"
        style={{ transform: 'translateY(var(--py, 0px))' }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(0,255,157,0.07),transparent_55%)]"
        style={{ transform: 'translateY(var(--py, 0px))' }}
      />

      <div
        className="relative z-10 mx-auto flex max-w-6xl flex-col px-6 pb-28 pt-8 sm:px-8"
        style={{ transform: 'translateY(var(--py2, 0px))' }}
      >
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 font-mono text-sm text-[var(--electric)]"
        >
          @RavendraPatel09
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="glitch font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
          data-text={"Hi, I'm Ravendra Patel 👋"}
        >
          Hi, I&apos;m Ravendra Patel 👋
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 min-h-[2.75rem] font-display text-xl text-[var(--text-muted)] sm:text-2xl"
        >
          <Typewriter />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.65 }}
          className="mt-4 max-w-2xl text-lg text-[var(--text-muted)] sm:text-xl"
        >
          Engineering the Future | Scalable Solutions &amp; Generative AI
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticCTA onClick={goProjects}>View My Work</MagneticCTA>
          <MagneticCTA href="./resume.pdf" download>
            Download Resume
          </MagneticCTA>
        </motion.div>
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.1, duration: 0.5 },
          y: { delay: 1.3, duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[var(--text-muted)]"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to about"
      >
        <span className="text-xs font-medium tracking-widest">SCROLL</span>
        <ChevronDown className="h-6 w-6 animate-bounce text-[var(--neon)]" />
      </motion.button>
    </section>
  )
}
