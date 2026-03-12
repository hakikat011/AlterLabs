'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: string
  pulseOffset: number
  pulseSpeed: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | undefined>(undefined)
  const timeRef = useRef(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Enhanced color palette with gradients
  const colors = [
    'rgba(0, 212, 255, 0.2)',   // Bright cyan
    'rgba(139, 92, 246, 0.18)', // Purple
    'rgba(168, 85, 247, 0.18)', // Violet
    'rgba(0, 212, 255, 0.15)',  // Lighter cyan
    'rgba(124, 58, 237, 0.15)', // Deep purple
  ]

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const initParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.floor((width * height) / 12000) // Slightly more particles
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 1,
      })
    }

    particlesRef.current = particles
  }, [])

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)
    
    timeRef.current += 0.016 // Approximate 60fps

    const particles = particlesRef.current
    const mouse = mouseRef.current

    particles.forEach((particle, i) => {
      if (!prefersReducedMotion) {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction - enhanced attraction with larger radius
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200
          particle.vx += (dx / dist) * force * 0.015
          particle.vy += (dy / dist) * force * 0.015
        }

        // Damping
        particle.vx *= 0.985
        particle.vy *= 0.985

        // Bounce off edges with smooth transition
        if (particle.x < 0) {
          particle.x = 0
          particle.vx *= -0.8
        } else if (particle.x > width) {
          particle.x = width
          particle.vx *= -0.8
        }
        if (particle.y < 0) {
          particle.y = 0
          particle.vy *= -0.8
        } else if (particle.y > height) {
          particle.y = height
          particle.vy *= -0.8
        }
      }

      // Calculate pulsing opacity
      const pulsingOpacity = particle.opacity + Math.sin(timeRef.current * particle.pulseSpeed + particle.pulseOffset) * 0.1

      // Draw particle with glow effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.radius * 3
      )
      gradient.addColorStop(0, particle.color.replace(/[\d.]+\)$/, `${pulsingOpacity})`))
      gradient.addColorStop(0.5, particle.color.replace(/[\d.]+\)$/, `${pulsingOpacity * 0.5})`))
      gradient.addColorStop(1, 'transparent')
      
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Core particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${pulsingOpacity * 1.5})`)
      ctx.fill()

      // Draw connections to nearby particles with gradient lines
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j]
        const distX = particle.x - other.x
        const distY = particle.y - other.y
        const distance = Math.sqrt(distX * distX + distY * distY)

        if (distance < 120) {
          const lineGradient = ctx.createLinearGradient(
            particle.x, particle.y, other.x, other.y
          )
          const opacity = (1 - distance / 120) * 0.08
          lineGradient.addColorStop(0, `rgba(0, 212, 255, ${opacity})`)
          lineGradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity * 0.8})`)
          lineGradient.addColorStop(1, `rgba(168, 85, 247, ${opacity})`)
          
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(other.x, other.y)
          ctx.strokeStyle = lineGradient
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }
    })
  }, [prefersReducedMotion])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas.width, canvas.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      drawParticles(ctx, canvas.width, canvas.height)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initParticles, drawParticles])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
      aria-hidden="true"
    />
  )
}
