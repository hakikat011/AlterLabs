'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

export default function MathematicalLogo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<SVGSVGElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!logoRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const timeline = anime.timeline({
      easing: 'easeOutExpo',
    })

    // Animate the main circle
    timeline.add({
      targets: '.math-circle',
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0, 1],
      duration: 1500,
      easing: 'easeInOutQuart',
    })

    // Animate mathematical symbols
    timeline.add({
      targets: '.math-symbol',
      scale: [0, 1],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(100),
      easing: 'easeOutElastic(1, .5)',
    }, '-=1000')

    // Animate geometric shapes
    timeline.add({
      targets: '.math-shape',
      scale: [0, 1],
      opacity: [0, 1],
      rotate: [180, 0],
      duration: 1000,
      delay: anime.stagger(150),
      easing: 'easeOutBack',
    }, '-=600')

    // Animate equation elements
    timeline.add({
      targets: '.math-equation',
      translateX: [-50, 0],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(100),
      easing: 'easeOutQuart',
    }, '-=500')

    // Animate orbital rings
    timeline.add({
      targets: '.math-orbit',
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0, 0.6],
      duration: 1200,
      delay: anime.stagger(200),
      easing: 'easeInOutQuart',
    }, '-=600')

    // Continuous rotation for orbital rings
    anime({
      targets: '.math-orbit-outer',
      rotate: 360,
      duration: 40000,
      loop: true,
      easing: 'linear',
    })

    anime({
      targets: '.math-orbit-inner',
      rotate: -360,
      duration: 30000,
      loop: true,
      easing: 'linear',
    })

    // Pulse effect for central core
    anime({
      targets: '.math-core',
      scale: [1, 1.05, 1],
      opacity: [0.4, 0.7, 0.4],
      duration: 3000,
      loop: true,
      easing: 'easeInOutSine',
    })

    // Float animation for symbols
    anime({
      targets: '.math-float',
      translateY: [-3, 3],
      duration: 2500,
      direction: 'alternate',
      loop: true,
      delay: anime.stagger(300),
      easing: 'easeInOutSine',
    })

  }, [])

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
      {/* Ambient glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="math-core w-3/4 h-3/4 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 blur-[80px]" />
      </div>

      <svg
        ref={logoRef}
        viewBox="0 0 400 400"
        className="w-full h-full relative z-10"
        style={{ maxWidth: '400px', maxHeight: '400px' }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="mathPrimaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(190, 100%, 50%)" />
            <stop offset="50%" stopColor="hsl(260, 50%, 55%)" />
            <stop offset="100%" stopColor="hsl(270, 40%, 50%)" />
          </linearGradient>
          
          <linearGradient id="mathAccentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(190, 100%, 50%)" />
            <stop offset="100%" stopColor="hsl(190, 100%, 60%)" />
          </linearGradient>

          <filter id="mathGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="mathStrongGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer orbital ring */}
        <g className="math-orbit-outer" style={{ transformOrigin: '200px 200px' }}>
          <circle
            className="math-orbit"
            cx="200"
            cy="200"
            r="170"
            fill="none"
            stroke="url(#mathPrimaryGradient)"
            strokeWidth="0.5"
            opacity="0"
            strokeDasharray="5 10"
          />
        </g>

        {/* Inner orbital ring */}
        <g className="math-orbit-inner" style={{ transformOrigin: '200px 200px' }}>
          <circle
            className="math-orbit"
            cx="200"
            cy="200"
            r="145"
            fill="none"
            stroke="url(#mathAccentGradient)"
            strokeWidth="0.5"
            opacity="0"
            strokeDasharray="8 8"
          />
        </g>

        {/* Main circle container */}
        <circle
          className="math-circle"
          cx="200"
          cy="200"
          r="120"
          fill="none"
          stroke="url(#mathPrimaryGradient)"
          strokeWidth="2"
          filter="url(#mathGlow)"
          opacity="0"
        />

        {/* Inner background circle */}
        <circle
          className="math-shape"
          cx="200"
          cy="200"
          r="100"
          fill="hsl(220, 15%, 6%)"
          stroke="url(#mathPrimaryGradient)"
          strokeWidth="1"
          opacity="0"
          style={{ transformOrigin: '200px 200px' }}
        />

        {/* Mathematical Symbols Group */}
        <g filter="url(#mathStrongGlow)">
          {/* Pi Symbol */}
          <text
            className="math-symbol math-float"
            x="200"
            y="160"
            textAnchor="middle"
            fontSize="32"
            fontFamily="serif"
            fill="url(#mathPrimaryGradient)"
            opacity="0"
            style={{ transformOrigin: '200px 160px' }}
          >
            π
          </text>

          {/* Sigma (Summation) Symbol */}
          <text
            className="math-symbol math-float"
            x="150"
            y="200"
            textAnchor="middle"
            fontSize="28"
            fontFamily="serif"
            fill="url(#mathAccentGradient)"
            opacity="0"
            style={{ transformOrigin: '150px 200px' }}
          >
            Σ
          </text>

          {/* Integral Symbol */}
          <text
            className="math-symbol math-float"
            x="250"
            y="200"
            textAnchor="middle"
            fontSize="32"
            fontFamily="serif"
            fill="url(#mathAccentGradient)"
            opacity="0"
            style={{ transformOrigin: '250px 200px' }}
          >
            ∫
          </text>

          {/* Square Root */}
          <text
            className="math-symbol math-float"
            x="200"
            y="240"
            textAnchor="middle"
            fontSize="28"
            fontFamily="serif"
            fill="url(#mathPrimaryGradient)"
            opacity="0"
            style={{ transformOrigin: '200px 240px' }}
          >
            √
          </text>
        </g>

        {/* Geometric Shapes */}
        {/* Triangle */}
        <polygon
          className="math-shape"
          points="200,80 240,120 160,120"
          fill="none"
          stroke="hsl(190, 100%, 50%)"
          strokeWidth="1.5"
          opacity="0"
          style={{ transformOrigin: '200px 100px' }}
        />

        {/* Small decorative circles (nodes) */}
        <circle className="math-symbol" cx="130" cy="130" r="3" fill="hsl(190, 100%, 50%)" filter="url(#mathGlow)" opacity="0" />
        <circle className="math-symbol" cx="270" cy="130" r="3" fill="hsl(260, 50%, 55%)" filter="url(#mathGlow)" opacity="0" />
        <circle className="math-symbol" cx="130" cy="270" r="3" fill="hsl(270, 40%, 50%)" filter="url(#mathGlow)" opacity="0" />
        <circle className="math-symbol" cx="270" cy="270" r="3" fill="hsl(190, 100%, 50%)" filter="url(#mathGlow)" opacity="0" />

        {/* Equation elements - E=mc² representation */}
        <g className="math-equation" opacity="0" style={{ transformOrigin: '200px 300px' }}>
          <text
            x="165"
            y="305"
            textAnchor="middle"
            fontSize="18"
            fontFamily="serif"
            fill="url(#mathPrimaryGradient)"
          >
            E
          </text>
          <text
            x="180"
            y="305"
            textAnchor="middle"
            fontSize="14"
            fontFamily="serif"
            fill="hsl(210, 20%, 70%)"
          >
            =
          </text>
          <text
            x="195"
            y="305"
            textAnchor="middle"
            fontSize="18"
            fontFamily="serif"
            fill="url(#mathAccentGradient)"
          >
            mc
          </text>
          <text
            x="217"
            y="298"
            textAnchor="middle"
            fontSize="12"
            fontFamily="serif"
            fill="url(#mathAccentGradient)"
          >
            2
          </text>
        </g>

        {/* Connection lines forming a knowledge graph */}
        <g className="math-shape" opacity="0" style={{ transformOrigin: '200px 200px' }}>
          <line x1="200" y1="80" x2="130" y2="130" stroke="hsl(190, 100%, 50%)" strokeWidth="0.5" opacity="0.3" />
          <line x1="200" y1="80" x2="270" y2="130" stroke="hsl(190, 100%, 50%)" strokeWidth="0.5" opacity="0.3" />
          <line x1="130" y1="130" x2="130" y2="270" stroke="hsl(260, 50%, 55%)" strokeWidth="0.5" opacity="0.3" />
          <line x1="270" y1="130" x2="270" y2="270" stroke="hsl(260, 50%, 55%)" strokeWidth="0.5" opacity="0.3" />
          <line x1="130" y1="270" x2="270" y2="270" stroke="hsl(270, 40%, 50%)" strokeWidth="0.5" opacity="0.3" />
        </g>

        {/* Additional mathematical notations */}
        <g className="math-symbol" opacity="0">
          <text
            x="90"
            y="200"
            textAnchor="middle"
            fontSize="16"
            fontFamily="serif"
            fill="hsl(190, 100%, 50%)"
            opacity="0.4"
          >
            ∞
          </text>
          <text
            x="310"
            y="200"
            textAnchor="middle"
            fontSize="16"
            fontFamily="serif"
            fill="hsl(260, 50%, 55%)"
            opacity="0.4"
          >
            ∆
          </text>
        </g>
      </svg>

      {/* Floating particle effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40 animate-float"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
