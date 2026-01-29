'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

export default function AnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<SVGSVGElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!logoRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const timeline = anime.timeline({
      easing: 'easeOutExpo',
    })

    // Animate the outer hexagon
    timeline.add({
      targets: '.logo-hexagon',
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0, 1],
      duration: 1500,
      easing: 'easeInOutQuart',
    })

    // Animate inner shapes
    timeline.add({
      targets: '.logo-inner-shape',
      scale: [0, 1],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(100),
      easing: 'easeOutElastic(1, .5)',
    }, '-=800')

    // Animate the A letter
    timeline.add({
      targets: '.logo-letter',
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeInOutQuart',
    }, '-=600')

    // Animate orbs
    timeline.add({
      targets: '.logo-orb',
      scale: [0, 1],
      opacity: [0, 0.8],
      duration: 600,
      delay: anime.stagger(150, { from: 'center' }),
      easing: 'easeOutBack',
    }, '-=400')

    // Continuous floating animation for orbs
    anime({
      targets: '.logo-orb',
      translateY: [-5, 5],
      duration: 2000,
      direction: 'alternate',
      loop: true,
      delay: anime.stagger(200),
      easing: 'easeInOutSine',
    })

    // Continuous rotation for decorative rings
    anime({
      targets: '.logo-ring-outer',
      rotate: 360,
      duration: 30000,
      loop: true,
      easing: 'linear',
    })

    anime({
      targets: '.logo-ring-inner',
      rotate: -360,
      duration: 20000,
      loop: true,
      easing: 'linear',
    })

    // Pulse glow effect
    anime({
      targets: '.logo-glow',
      opacity: [0.3, 0.7],
      scale: [0.98, 1.02],
      duration: 2000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
    })

  }, [])

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
      {/* Ambient glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="logo-glow w-3/4 h-3/4 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-[60px]" />
      </div>

      <svg
        ref={logoRef}
        viewBox="0 0 400 400"
        className="w-full h-full relative z-10"
        style={{ maxWidth: '400px', maxHeight: '400px' }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(190, 100%, 50%)" />
            <stop offset="50%" stopColor="hsl(260, 80%, 65%)" />
            <stop offset="100%" stopColor="hsl(270, 70%, 60%)" />
          </linearGradient>
          
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(190, 100%, 50%)" />
            <stop offset="100%" stopColor="hsl(190, 100%, 70%)" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer decorative ring */}
        <g className="logo-ring-outer" style={{ transformOrigin: '200px 200px' }}>
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="url(#primaryGradient)"
            strokeWidth="0.5"
            opacity="0.3"
            strokeDasharray="10 20"
          />
        </g>

        {/* Inner decorative ring */}
        <g className="logo-ring-inner" style={{ transformOrigin: '200px 200px' }}>
          <circle
            cx="200"
            cy="200"
            r="160"
            fill="none"
            stroke="url(#accentGradient)"
            strokeWidth="0.5"
            opacity="0.2"
            strokeDasharray="5 15"
          />
        </g>

        {/* Main Hexagon */}
        <polygon
          className="logo-hexagon"
          points="200,50 330,115 330,245 200,310 70,245 70,115"
          fill="none"
          stroke="url(#primaryGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          opacity="0"
        />

        {/* Inner hexagon */}
        <polygon
          className="logo-inner-shape"
          points="200,80 300,130 300,230 200,280 100,230 100,130"
          fill="hsl(230, 25%, 8%)"
          stroke="url(#primaryGradient)"
          strokeWidth="1"
          opacity="0"
          style={{ transformOrigin: '200px 180px' }}
        />

        {/* Stylized "A" letter */}
        <g className="logo-letter" filter="url(#strongGlow)">
          <path
            d="M200 120 L150 240 M200 120 L250 240 M165 200 L235 200"
            fill="none"
            stroke="url(#primaryGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
        </g>

        {/* Neural network nodes */}
        <circle className="logo-orb" cx="200" cy="100" r="6" fill="hsl(190, 100%, 50%)" filter="url(#glow)" opacity="0" />
        <circle className="logo-orb" cx="140" cy="140" r="4" fill="hsl(260, 80%, 65%)" filter="url(#glow)" opacity="0" />
        <circle className="logo-orb" cx="260" cy="140" r="4" fill="hsl(260, 80%, 65%)" filter="url(#glow)" opacity="0" />
        <circle className="logo-orb" cx="120" cy="200" r="5" fill="hsl(270, 70%, 60%)" filter="url(#glow)" opacity="0" />
        <circle className="logo-orb" cx="280" cy="200" r="5" fill="hsl(270, 70%, 60%)" filter="url(#glow)" opacity="0" />
        <circle className="logo-orb" cx="150" cy="260" r="4" fill="hsl(190, 100%, 50%)" filter="url(#glow)" opacity="0" />
        <circle className="logo-orb" cx="250" cy="260" r="4" fill="hsl(190, 100%, 50%)" filter="url(#glow)" opacity="0" />

        {/* Connection lines */}
        <g className="logo-inner-shape" opacity="0" style={{ transformOrigin: '200px 180px' }}>
          <line x1="200" y1="100" x2="140" y2="140" stroke="hsl(190, 100%, 50%)" strokeWidth="0.5" opacity="0.4" />
          <line x1="200" y1="100" x2="260" y2="140" stroke="hsl(190, 100%, 50%)" strokeWidth="0.5" opacity="0.4" />
          <line x1="140" y1="140" x2="120" y2="200" stroke="hsl(260, 80%, 65%)" strokeWidth="0.5" opacity="0.4" />
          <line x1="260" y1="140" x2="280" y2="200" stroke="hsl(260, 80%, 65%)" strokeWidth="0.5" opacity="0.4" />
          <line x1="120" y1="200" x2="150" y2="260" stroke="hsl(270, 70%, 60%)" strokeWidth="0.5" opacity="0.4" />
          <line x1="280" y1="200" x2="250" y2="260" stroke="hsl(270, 70%, 60%)" strokeWidth="0.5" opacity="0.4" />
          <line x1="150" y1="260" x2="250" y2="260" stroke="hsl(190, 100%, 50%)" strokeWidth="0.5" opacity="0.4" />
        </g>
      </svg>

      {/* Floating particles around logo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/60 animate-float"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
