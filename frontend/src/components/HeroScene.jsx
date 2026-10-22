import { useMemo, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Galaxy({ count = 1800 }) {
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

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02
      // Gentle parallax response to mouse cursor
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        state.pointer.y * 0.15,
        0.05
      )
      ref.current.rotation.z = THREE.MathUtils.lerp(
        ref.current.rotation.z,
        state.pointer.x * 0.15,
        0.05
      )
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.042}
        color="#00FF9D"
        transparent
        opacity={0.68}
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

  useFrame((state, delta) => {
    if (ico.current) {
      ico.current.rotation.x += delta * 0.12
      ico.current.rotation.y += delta * 0.18
      ico.current.position.y = 0.6 + Math.sin(state.clock.elapsedTime * 0.8) * 0.15
    }
    if (torus.current) {
      torus.current.rotation.x += delta * 0.1
      torus.current.rotation.z += delta * 0.08
      torus.current.position.y = -0.4 + Math.cos(state.clock.elapsedTime * 0.7) * 0.12
    }
  })

  return (
    <>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.3}>
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
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.35}>
        <mesh ref={torus} position={[3.4, -0.4, -1.2]} scale={0.9}>
          <torusGeometry args={[0.75, 0.22, 24, 64]} />
          <meshStandardMaterial
            color="#00FF9D"
            metalness={0.4}
            roughness={0.25}
            emissive="#00FF9D"
            emissiveIntensity={0.18}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>
    </>
  )
}

function SceneController() {
  useFrame((state) => {
    // Smooth camera parallax following cursor
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.9,
      0.04
    )
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.7,
      0.04
    )
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene() {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Pause rendering when hero is out of screen viewport
      setInView(window.scrollY < window.innerHeight * 1.2)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!inView) {
    return null
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 6, 6]} intensity={1.2} color="#00FF9D" />
      <pointLight position={[-6, -4, 4]} intensity={0.8} color="#00B4FF" />
      <SceneController />
      <Galaxy />
      <Shapes />
    </Canvas>
  )
}
