'use client'

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

// Wireframe geometric shape with glow
function GlowingWireframe({ 
  geometry, 
  position, 
  rotation, 
  scale = 1, 
  color = '#00d4ff',
  rotationSpeed = 0.3 
}: { 
  geometry: 'icosahedron' | 'octahedron' | 'torus' | 'dodecahedron'
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  color?: string
  rotationSpeed?: number
}) {
  const meshRef = useRef<THREE.Group>(null)
  const wireframeRef = useRef<THREE.LineSegments>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001 * rotationSpeed
      meshRef.current.rotation.y += 0.002 * rotationSpeed
    }
  })

  const geometryComponent = useMemo(() => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 32]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />
      default:
        return <icosahedronGeometry args={[1, 0]} />
    }
  }, [geometry])

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Solid inner glow */}
      <mesh>
        {geometryComponent}
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>
      
      {/* Wireframe */}
      <lineSegments>
        {React.createElement('edgesGeometry', { 
          args: [
            geometry === 'icosahedron' ? new THREE.IcosahedronGeometry(1, 0) :
            geometry === 'octahedron' ? new THREE.OctahedronGeometry(1, 0) :
            geometry === 'torus' ? new THREE.TorusGeometry(1, 0.4, 16, 32) :
            new THREE.DodecahedronGeometry(1, 0)
          ] 
        })}
        <lineBasicMaterial color={color} transparent opacity={0.8} />
      </lineSegments>
      
      {/* Outer glow sphere */}
      <mesh scale={1.2}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} />
      </mesh>
    </group>
  )
}

// Animated geometric shape using drei
function AnimatedShape({ 
  type, 
  position, 
  color, 
  size = 1,
  speed = 1 
}: { 
  type: 'sphere' | 'torus' | 'icosahedron' | 'octahedron'
  position: [number, number, number]
  color: string
  size?: number
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed
    }
  })

  const renderShape = () => {
    switch (type) {
      case 'sphere':
        return (
          <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
            <MeshDistortMaterial
              color={color}
              transparent
              opacity={0.3}
              distort={0.3}
              speed={2}
              roughness={0}
            />
          </Sphere>
        )
      case 'torus':
        return (
          <Torus ref={meshRef} args={[size, size * 0.4, 16, 32]} position={position}>
            <meshBasicMaterial color={color} transparent opacity={0.4} wireframe />
          </Torus>
        )
      case 'icosahedron':
        return (
          <Icosahedron ref={meshRef} args={[size, 0]} position={position}>
            <meshBasicMaterial color={color} transparent opacity={0.3} wireframe />
          </Icosahedron>
        )
      case 'octahedron':
        return (
          <Octahedron ref={meshRef} args={[size, 0]} position={position}>
            <meshBasicMaterial color={color} transparent opacity={0.4} wireframe />
          </Octahedron>
        )
      default:
        return null
    }
  }

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      {renderShape()}
    </Float>
  )
}

// Orbital ring
function OrbitalRing({ 
  radius, 
  color, 
  rotationSpeed = 1,
  tilt = 0 
}: { 
  radius: number
  color: string
  rotationSpeed?: number
  tilt?: number
}) {
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.05 * rotationSpeed
    }
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, tilt]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

// Central glowing orb
function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (meshRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.05
      meshRef.current.scale.setScalar(scale)
    }
    
    if (glowRef.current) {
      const glowScale = 1.5 + Math.sin(time * 1.5) * 0.1
      glowRef.current.scale.setScalar(glowScale)
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.15 + Math.sin(time * 2) * 0.05
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color="#00d4ff"
          transparent
          opacity={0.6}
          distort={0.2}
          speed={3}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.15} />
      </mesh>
      
      {/* Outer haze */}
      <mesh scale={2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.05} />
      </mesh>
    </group>
  )
}

// Floating particles around the scene
function OrbitingParticles({ count = 20, radius = 3 }: { count?: number; radius?: number }) {
  const particlesRef = useRef<THREE.Group>(null)
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      temp.push({
        x: Math.cos(angle) * radius,
        y: (Math.random() - 0.5) * 2,
        z: Math.sin(angle) * radius,
        size: 0.02 + Math.random() * 0.04,
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
        color: ['#00d4ff', '#8b5cf6', '#a855f7'][Math.floor(Math.random() * 3)]
      })
    }
    return temp
  }, [count, radius])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((p, i) => (
        <Float key={i} speed={p.speed * 2} floatIntensity={0.3}>
          <mesh position={[p.x, p.y, p.z]}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshBasicMaterial color={p.color} transparent opacity={0.7} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Mouse-reactive camera with smooth follow
function HeroCameraController() {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      targetRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    // Smooth interpolation
    mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05
    mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05
    
    camera.position.x = mouseRef.current.x * 0.8
    camera.position.y = -mouseRef.current.y * 0.5
    camera.lookAt(0, 0, 0)
  })

  return null
}

// Main hero scene content
function HeroScene() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#8b5cf6" />
      
      {/* Central orb */}
      <CentralOrb />
      
      {/* Orbital rings */}
      <OrbitalRing radius={2} color="#00d4ff" rotationSpeed={1} tilt={0.3} />
      <OrbitalRing radius={2.5} color="#8b5cf6" rotationSpeed={-0.7} tilt={-0.4} />
      <OrbitalRing radius={3} color="#a855f7" rotationSpeed={0.5} tilt={0.6} />
      
      {/* Animated geometric shapes */}
      <AnimatedShape type="icosahedron" position={[-3, 1.5, -2]} color="#00d4ff" size={0.5} speed={0.8} />
      <AnimatedShape type="octahedron" position={[3, -1, -1]} color="#8b5cf6" size={0.4} speed={1.2} />
      <AnimatedShape type="torus" position={[-2, -2, -3]} color="#a855f7" size={0.3} speed={0.6} />
      <AnimatedShape type="sphere" position={[2.5, 2, -2]} color="#00d4ff" size={0.35} speed={1} />
      
      {/* Orbiting particles */}
      <OrbitingParticles count={24} radius={4} />
      
      {/* Camera controller */}
      <HeroCameraController />
    </>
  )
}

// Main export component
export default function ThreeHeroScene() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <HeroScene />
      </Canvas>
    </div>
  )
}
