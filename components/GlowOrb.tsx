'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface GlowingOrbProps {
  color?: string
  secondaryColor?: string
  size?: number
  distort?: number
  speed?: number
  floatSpeed?: number
  opacity?: number
}

// Inner orb with distortion effect
function InnerOrb({ 
  color = '#00d4ff', 
  size = 1, 
  distort = 0.3, 
  speed = 2,
  opacity = 0.6 
}: GlowingOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        transparent
        opacity={opacity}
        distort={distort}
        speed={speed}
        roughness={0}
      />
    </mesh>
  )
}

// Outer glow layers
function GlowLayers({ color = '#00d4ff', secondaryColor = '#8b5cf6', size = 1 }: GlowingOrbProps) {
  const glow1Ref = useRef<THREE.Mesh>(null)
  const glow2Ref = useRef<THREE.Mesh>(null)
  const glow3Ref = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (glow1Ref.current) {
      const scale = 1.3 + Math.sin(time * 1.5) * 0.05
      glow1Ref.current.scale.setScalar(scale)
      const material = glow1Ref.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.2 + Math.sin(time * 2) * 0.05
    }
    
    if (glow2Ref.current) {
      const scale = 1.6 + Math.sin(time * 1.2 + 1) * 0.08
      glow2Ref.current.scale.setScalar(scale)
      const material = glow2Ref.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.1 + Math.sin(time * 1.8 + 1) * 0.03
    }
    
    if (glow3Ref.current) {
      const scale = 2 + Math.sin(time * 0.8 + 2) * 0.1
      glow3Ref.current.scale.setScalar(scale)
      const material = glow3Ref.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.05 + Math.sin(time * 1.5 + 2) * 0.02
    }
  })

  return (
    <>
      {/* First glow layer */}
      <mesh ref={glow1Ref}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      
      {/* Second glow layer */}
      <mesh ref={glow2Ref}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color={secondaryColor} transparent opacity={0.1} />
      </mesh>
      
      {/* Third (outermost) glow layer */}
      <mesh ref={glow3Ref}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} />
      </mesh>
    </>
  )
}

// Orbiting particles around the orb
function OrbitingParticles({ radius = 1.5, count = 8, color = '#00d4ff' }: { radius?: number; count?: number; color?: string }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      temp.push({
        angle,
        size: 0.02 + Math.random() * 0.03,
        orbitSpeed: 0.3 + Math.random() * 0.4,
        yOffset: (Math.random() - 0.5) * 0.5
      })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos(p.angle) * radius,
            p.yOffset,
            Math.sin(p.angle) * radius
          ]}
        >
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

// Complete orb scene
function OrbScene({ 
  color = '#00d4ff', 
  secondaryColor = '#8b5cf6',
  size = 1,
  distort = 0.3,
  speed = 2,
  floatSpeed = 1.5
}: GlowingOrbProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color={color} />
      
      <Float speed={floatSpeed} rotationIntensity={0.2} floatIntensity={0.3}>
        <group>
          {/* Core orb */}
          <InnerOrb color={color} size={size} distort={distort} speed={speed} />
          
          {/* Glow layers */}
          <GlowLayers color={color} secondaryColor={secondaryColor} size={size} />
          
          {/* Orbiting particles */}
          <OrbitingParticles radius={size * 2} count={6} color={color} />
        </group>
      </Float>
    </>
  )
}

// Main export component
interface GlowOrbComponentProps extends GlowingOrbProps {
  className?: string
}

export default function GlowOrb({ 
  color = '#00d4ff',
  secondaryColor = '#8b5cf6',
  size = 1,
  distort = 0.3,
  speed = 2,
  floatSpeed = 1.5,
  className = ''
}: GlowOrbComponentProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <OrbScene 
          color={color}
          secondaryColor={secondaryColor}
          size={size}
          distort={distort}
          speed={speed}
          floatSpeed={floatSpeed}
        />
      </Canvas>
    </div>
  )
}

// Static decorative orb (CSS-only for performance in non-critical areas)
export function StaticGlowOrb({ 
  color = 'primary',
  size = 'md',
  className = ''
}: { 
  color?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-64 h-64',
    xl: 'w-96 h-96'
  }

  const colorClasses = {
    primary: 'from-primary/30 via-primary/10 to-transparent',
    secondary: 'from-secondary/30 via-secondary/10 to-transparent',
    accent: 'from-accent/30 via-accent/10 to-transparent'
  }

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        bg-gradient-radial 
        ${colorClasses[color]}
        animate-breathe
        blur-xl
        ${className}
      `}
    />
  )
}
