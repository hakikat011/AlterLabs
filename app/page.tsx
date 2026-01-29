'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Brain, 
  Sparkles, 
  Target, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Zap, 
  GraduationCap,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  Play
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamic imports for client-side only components
const AnimatedLogo = dynamic(() => import('@/components/AnimatedLogo'), { ssr: false })
const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false })

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden relative">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Global mesh gradient overlay */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none z-0" />
      
      {/* Geometric pattern overlay */}
      <div className="fixed inset-0 geometric-pattern pointer-events-none z-0 opacity-50" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </div>
              <span className="text-xl md:text-2xl font-bold gradient-text tracking-tight">AlterLabs</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              <button onClick={() => scrollToSection('features')} className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium">How it Works</button>
              <button onClick={() => scrollToSection('students')} className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium">For Students</button>
              <Button variant="glow" size="sm">Get Early Access</Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-border/50 animate-fade-in">
              <div className="flex flex-col gap-4">
                <button onClick={() => scrollToSection('features')} className="text-muted-foreground hover:text-primary transition-colors text-left py-3 text-base">Features</button>
                <button onClick={() => scrollToSection('how-it-works')} className="text-muted-foreground hover:text-primary transition-colors text-left py-3 text-base">How it Works</button>
                <button onClick={() => scrollToSection('students')} className="text-muted-foreground hover:text-primary transition-colors text-left py-3 text-base">For Students</button>
                <Button variant="glow" size="lg" className="w-full mt-4">Get Early Access</Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated background elements with parallax */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute top-1/4 left-1/6 w-72 md:w-[500px] h-72 md:h-[500px] bg-primary/15 rounded-full blur-[150px] animate-breathe" />
          <div className="absolute bottom-1/4 right-1/6 w-72 md:w-[500px] h-72 md:h-[500px] bg-accent/15 rounded-full blur-[150px] animate-breathe" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-[700px] h-96 md:h-[700px] bg-secondary/10 rounded-full blur-[180px] animate-pulse-glow" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div 
              className="space-y-8 text-center lg:text-left"
              style={{ transform: `translateY(${scrollY * -0.1}px)` }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-foreground/80 font-medium">Launching Soon for Indian Students</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Learn Smarter with{' '}
                <span className="gradient-text text-glow block mt-2">AI-Powered</span>{' '}
                <span className="text-foreground/90">Education</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience personalized learning that adapts to your unique style. 
                AlterLabs uses cutting-edge AI to create customized study paths 
                that help you achieve your academic goals faster.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Button variant="glow" size="xl" className="group shadow-lg shadow-primary/25">
                  Join the Waitlist
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Button>
                <Button variant="glass" size="xl" className="group">
                  <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-8 pt-6 justify-center lg:justify-start">
                {[
                  "Free to Start",
                  "CBSE & State Boards", 
                  "Competitive Exams"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground/70 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right content - Animated Logo */}
            <div 
              className="relative order-first lg:order-last"
              style={{ transform: `translateY(${scrollY * -0.05}px)` }}
            >
              <AnimatedLogo />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-36 relative">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${(scrollY - 800) * 0.1}px)` }}
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">Features</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              Powered by <span className="gradient-text">Advanced AI</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Our intelligent platform understands how you learn and creates 
              a personalized experience that evolves with you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Brain,
                title: "Adaptive Learning",
                description: "AI that understands your learning patterns and adjusts content difficulty in real-time."
              },
              {
                icon: Target,
                title: "Personalized Paths",
                description: "Custom study plans based on your goals, whether it's board exams or competitive tests."
              },
              {
                icon: Zap,
                title: "Instant Feedback",
                description: "Get immediate explanations and alternative approaches when you're stuck."
              },
              {
                icon: TrendingUp,
                title: "Progress Analytics",
                description: "Track your improvement with detailed insights and performance predictions."
              },
              {
                icon: BookOpen,
                title: "Rich Content Library",
                description: "Access thousands of questions, video lessons, and practice materials."
              },
              {
                icon: Users,
                title: "Collaborative Learning",
                description: "Connect with peers, participate in study groups, and learn together."
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="group glass hover:border-primary/40 bg-card/30 transition-all duration-500 card-hover-lift"
              >
                <CardContent className="p-7 md:p-8">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground/95">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 md:py-36 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-elevated/30 via-transparent to-surface-elevated/30" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="text-accent text-sm font-semibold uppercase tracking-widest mb-4 block">Process</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              How <span className="gradient-text">AlterLabs</span> Works
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Start your personalized learning journey in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Take Assessment",
                description: "Complete a quick diagnostic test so our AI understands your current level and learning style."
              },
              {
                step: "02",
                title: "Get Your Plan",
                description: "Receive a customized study plan tailored to your goals, timeline, and preferences."
              },
              {
                step: "03",
                title: "Learn & Grow",
                description: "Study with adaptive content that gets smarter as you progress, ensuring optimal results."
              }
            ].map((item, index) => (
              <div key={index} className="relative group text-center md:text-left">
                <div className="text-7xl md:text-8xl font-black gradient-text opacity-20 group-hover:opacity-40 transition-opacity duration-300 mb-4">
                  {item.step}
                </div>
                <div className="relative -mt-10 md:-mt-12">
                  <h3 className="text-2xl font-semibold mb-4 text-foreground/95">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                {index < 2 && (
                  <ChevronRight className="hidden md:block absolute top-8 -right-8 w-10 h-10 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section id="students" className="py-24 md:py-36 relative overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${(scrollY - 2400) * 0.1}px)` }}
        >
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Visual element */}
            <div className="relative order-last lg:order-first">
              <div className="relative w-full max-w-md mx-auto aspect-square">
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-full border border-primary/10 animate-spin-slow" style={{ animationDuration: '30s' }} />
                <div className="absolute inset-8 rounded-full border border-accent/10 animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
                <div className="absolute inset-16 rounded-full border border-secondary/10 animate-spin-slow" style={{ animationDuration: '25s' }} />
                
                {/* Central glowing orb */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full gradient-primary opacity-20 blur-3xl animate-breathe" />
                  <div className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full glass flex items-center justify-center">
                    <GraduationCap className="w-16 h-16 md:w-20 md:h-20 text-primary" />
                  </div>
                </div>
                
                {/* Floating stats */}
                <div className="absolute top-10 right-0 glass rounded-xl px-4 py-3 animate-float" style={{ animationDelay: '0s' }}>
                  <div className="text-2xl font-bold gradient-text">10L+</div>
                  <div className="text-xs text-muted-foreground">Students</div>
                </div>
                <div className="absolute bottom-20 left-0 glass rounded-xl px-4 py-3 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="text-2xl font-bold gradient-text">98%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
                <div className="absolute bottom-0 right-10 glass rounded-xl px-4 py-3 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="text-2xl font-bold gradient-text">50K+</div>
                  <div className="text-xs text-muted-foreground">Questions</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm border border-accent/20">
                <GraduationCap className="w-4 h-4 text-accent" />
                <span className="text-foreground/80 font-medium">Built for Indian Students</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Your Success is Our{' '}
                <span className="gradient-text">Mission</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you&apos;re preparing for CBSE, ICSE, state boards, JEE, NEET, 
                or other competitive exams, AlterLabs is designed to help you excel.
              </p>

              <div className="space-y-5">
                {[
                  "Curriculum aligned with Indian education boards",
                  "Expert-curated content for competitive exams",
                  "Available in English and regional languages",
                  "Affordable pricing for every student"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 justify-center lg:justify-start group">
                    <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-foreground/90 text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button variant="glow" size="xl" className="group shadow-lg shadow-primary/25">
                  Start Learning Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-36 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[700px] md:h-[1000px] bg-primary/5 rounded-full blur-[200px]" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
                  Ready to Transform Your{' '}
                  <span className="gradient-text text-glow">Learning?</span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of students who are already experiencing the future 
                  of education. Get early access and be part of the revolution.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="glow" size="xl" className="group shadow-lg shadow-primary/25">
                    Get Early Access
                    <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </Button>
                  <Button variant="outline" size="xl" className="border-border/50 hover:border-primary/50">
                    Contact Us
                  </Button>
                </div>

                <p className="mt-8 text-sm text-muted-foreground">
                  No credit card required. Free trial for the first 1000 students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 md:py-20 border-t border-border/50 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            <div className="space-y-5 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold gradient-text">AlterLabs</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Transforming education through AI-powered personalized learning 
                experiences for students across India.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-5 text-foreground/90">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><button className="hover:text-primary transition-colors duration-300">Features</button></li>
                <li><button className="hover:text-primary transition-colors duration-300">Pricing</button></li>
                <li><button className="hover:text-primary transition-colors duration-300">For Schools</button></li>
                <li><button className="hover:text-primary transition-colors duration-300">For Teachers</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-5 text-foreground/90">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><button className="hover:text-primary transition-colors duration-300">About Us</button></li>
                <li><button className="hover:text-primary transition-colors duration-300">Blog</button></li>
                <li><button className="hover:text-primary transition-colors duration-300">Careers</button></li>
                <li><button className="hover:text-primary transition-colors duration-300">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-5 text-foreground/90">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><button className="hover:text-primary transition-colors duration-300">Privacy Policy</button></li>
                <li><button className="hover:text-primary transition-colors duration-300">Terms of Service</button></li>
                <li><button className="hover:text-primary transition-colors duration-300">Cookie Policy</button></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 AlterLabs. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <span className="text-primary text-lg">♥</span>
              <span>in India</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
