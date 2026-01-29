'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
}

export default function ParallaxSection({ children, speed = 0.5, className = '' }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top + scrollY
      const viewportHeight = window.innerHeight
      
      // Calculate parallax offset when section is in view
      if (scrollY + viewportHeight > sectionTop && scrollY < sectionTop + rect.height) {
        const offset = (scrollY - sectionTop + viewportHeight) * speed * 0.1
        section.style.transform = `translateY(${offset}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={sectionRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}
