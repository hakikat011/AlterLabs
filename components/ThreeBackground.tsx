'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Floating particle component
function FloatingParticle({ position, color, size }: { position: [number, number, number]; color: string; size: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialPosition = useRef(position)
  const randomOffset = useRef(Math.random() * Math.PI * 2)
  const randomSpeed = useRef(0.3 + Math.random() * 0.5)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.position.y = initialPosition.current[1] + Math.sin(time * randomSpeed.current + randomOffset.current) * 0.5
      meshRef.current.position.x = initialPosition.current[0] + Math.cos(time * randomSpeed.current * 0.5 + randomOffset.current) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  )
}

// Glowing sphere with custom shader
function GlowingSphere({ position, color, size }: { position: [number, number, number]; color: string; size: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      const time = state.clock.elapsedTime
      const scale = 1 + Math.sin(time * 2) * 0.1
      meshRef.current.scale.setScalar(scale)
      glowRef.current.scale.setScalar(scale * 1.5)
    }
  })

  return (
    <group position={position}>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 1.5, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

// Particle field using instanced mesh for performance
function ParticleField({ count = 100 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15 - 5
        ] as [number, number, number],
        speed: 0.1 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
        scale: 0.02 + Math.random() * 0.04
      })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    
    particles.forEach((particle, i) => {
      dummy.position.set(
        particle.position[0] + Math.sin(time * particle.speed + particle.offset) * 0.5,
        particle.position[1] + Math.cos(time * particle.speed * 0.7 + particle.offset) * 0.3,
        particle.position[2]
      )
      dummy.scale.setScalar(particle.scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
    </instancedMesh>
  )
}

// Connection lines between particles
function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null)
  const pointsRef = useRef<THREE.Vector3[]>([])
  
  useMemo(() => {
    const points = []
    for (let i = 0; i < 30; i++) {
      points.push(new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 3
      ))
    }
    pointsRef.current = points
  }, [])

  useFrame((state) => {
    if (!lineRef.current) return
    
    const time = state.clock.elapsedTime
    const positions = lineRef.current.geometry.attributes.position
    
    if (positions) {
      for (let i = 0; i < pointsRef.current.length; i++) {
        const point = pointsRef.current[i]
        positions.setXYZ(
          i,
          point.x + Math.sin(time * 0.3 + i) * 0.2,
          point.y + Math.cos(time * 0.2 + i) * 0.2,
          point.z
        )
      }
      positions.needsUpdate = true
    }
  })

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices: number[] = []
    
    for (let i = 0; i < 30; i++) {
      const x1 = (Math.random() - 0.5) * 20
      const y1 = (Math.random() - 0.5) * 15
      const z1 = (Math.random() - 0.5) * 10 - 3
      
      const x2 = x1 + (Math.random() - 0.5) * 5
      const y2 = y1 + (Math.random() - 0.5) * 5
      const z2 = z1 + (Math.random() - 0.5) * 2
      
      vertices.push(x1, y1, z1, x2, y2, z2)
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])

  return (
    <lineSegments ref={lineRef} geometry={lineGeometry}>
      <lineBasicMaterial color="#00d4ff" transparent opacity={0.1} />
    </lineSegments>
  )
}

// Mouse-reactive camera controller
function CameraController() {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.02
    camera.position.y += (-mouseRef.current.y * 0.3 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })

  return null
}

// Main scene content
function Scene() {
  const particleColors = ['#00d4ff', '#8b5cf6', '#a855f7']
  
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      
      {/* Stars background */}
      <Stars 
        radius={50} 
        depth={50} 
        count={1000} 
        factor={3} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      {/* Particle field */}
      <ParticleField count={80} />
      
      {/* Connection lines */}
      <ConnectionLines />
      
      {/* Floating glowing spheres */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <GlowingSphere position={[-6, 2, -5]} color="#00d4ff" size={0.15} />
      </Float>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.7}>
        <GlowingSphere position={[5, -1, -4]} color="#8b5cf6" size={0.12} />
      </Float>
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.6}>
        <GlowingSphere position={[3, 3, -6]} color="#a855f7" size={0.1} />
      </Float>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <GlowingSphere position={[-4, -2, -3]} color="#00d4ff" size={0.08} />
      </Float>
      
      {/* Additional floating particles */}
      {particleColors.map((color, i) => (
        <FloatingParticle 
          key={i}
          position={[(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, -5 - Math.random() * 5]}
          color={color}
          size={0.03 + Math.random() * 0.05}
        />
      ))}
      
      {/* Camera controller for mouse interaction */}
      <CameraController />
    </>
  )
}

// Main component with fallback for SSR
export default function ThreeBackground() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
      
      {/* Gradient overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, hsl(185 100% 55% / 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, hsl(260 60% 60% / 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(270 50% 55% / 0.02) 0%, transparent 60%)
          `
        }}
      />
    </div>
  )
}
