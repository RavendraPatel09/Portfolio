import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Galaxy({ count = 2000 }) {
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
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
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
          <meshStandardMaterial color="#00B4FF" wireframe emissive="#00B4FF" emissiveIntensity={0.35} transparent opacity={0.55} />
        </mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh ref={torus} position={[3.4, -0.4, -1.2]} scale={0.9}>
          <torusGeometry args={[0.75, 0.22, 24, 64]} />
          <meshStandardMaterial color="#00FF9D" metalness={0.4} roughness={0.25} emissive="#00FF9D" emissiveIntensity={0.15} transparent opacity={0.85} />
        </mesh>
      </Float>
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'default' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[8, 6, 6]} intensity={1.1} color="#00FF9D" />
      <pointLight position={[-6, -4, 4]} intensity={0.7} color="#00B4FF" />
      <Galaxy />
      <Shapes />
    </Canvas>
  )
}
