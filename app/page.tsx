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
const MathematicalLogo = dynamic(() => import('@/components/MathematicalLogo'), { ssr: false })
const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false })
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), { ssr: false })
const ThreeHeroScene = dynamic(() => import('@/components/ThreeHeroScene'), { ssr: false })

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
      {/* Three.js 3D Background */}
      <ThreeBackground />
      
      {/* Fallback Particle Background for lower-end devices */}
      <div className="hidden">
        <ParticleBackground />
      </div>
      
      {/* 3D Grid Background */}
      <div className="fixed inset-0 grid-3d pointer-events-none z-0" />
      
      {/* Enhanced mesh gradient overlay */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none z-0 opacity-60" />
      
      {/* Ambient glow spots */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[200px] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-premium">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/30 glow-primary">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </div>
              <span className="text-xl md:text-2xl font-bold gradient-text tracking-tight text-glow">AlterLabs</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              <button onClick={() => scrollToSection('features')} className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-medium hover:text-glow">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-medium hover:text-glow">How it Works</button>
              <button onClick={() => scrollToSection('students')} className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-medium hover:text-glow">For Students</button>
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
                <button onClick={() => scrollToSection('features')} className="text-muted-foreground hover:text-primary transition-all text-left py-3 text-base hover:text-glow">Features</button>
                <button onClick={() => scrollToSection('how-it-works')} className="text-muted-foreground hover:text-primary transition-all text-left py-3 text-base hover:text-glow">How it Works</button>
                <button onClick={() => scrollToSection('students')} className="text-muted-foreground hover:text-primary transition-all text-left py-3 text-base hover:text-glow">For Students</button>
                <Button variant="glow-pulse" size="lg" className="w-full mt-4">Get Early Access</Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        {/* Three.js Hero Scene */}
        <div className="absolute inset-0 z-0">
          <ThreeHeroScene />
        </div>
        
        {/* Animated background elements with parallax - Enhanced */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute top-1/4 left-1/6 w-72 md:w-[600px] h-72 md:h-[600px] bg-primary/8 rounded-full blur-[180px] animate-breathe" />
          <div className="absolute bottom-1/4 right-1/6 w-72 md:w-[600px] h-72 md:h-[600px] bg-accent/8 rounded-full blur-[180px] animate-breathe" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-[800px] h-96 md:h-[800px] bg-secondary/5 rounded-full blur-[200px] animate-pulse-glow" />
        </div>

        {/* Minimal grid overlay */}
        <div className="absolute inset-0 geometric-pattern opacity-40" style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left content */}
            <div 
              className="space-y-10 text-center lg:text-left"
              style={{ transform: `translateY(${scrollY * -0.1}px)` }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium text-sm border border-primary/30 shadow-lg shadow-primary/10">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-foreground/90 font-medium">AI-Powered Learning • CBSE, ICSE, JEE, NEET Ready</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Master Your Syllabus with{' '}
                <span className="gradient-text text-glow-intense block mt-3">Adaptive AI Tutoring</span>{' '}
                <span className="text-foreground/90">Tailored for Indian Students</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                AlterLabs delivers <span className="text-foreground/95 font-semibold">personalized learning paths</span> powered by advanced AI algorithms. 
                Track your strengths across {' '}<span className="text-foreground/95">50+ skill dimensions</span>, access {' '}<span className="text-foreground/95">indexed knowledge graphs</span> connecting {' '}
                <span className="text-foreground/95">10,000+ concepts</span>, and receive real-time feedback that adapts to your unique learning pace—all aligned with your board curriculum and competitive exam goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button variant="glow-pulse" size="xl" className="group shadow-xl shadow-primary/30">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Button>
                <Button variant="glass-glow" size="xl" className="group">
                  <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  See How It Works
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-8 pt-8 justify-center lg:justify-start">
                {[
                  "Multi-Board Support: CBSE, ICSE, State",
                  "JEE & NEET Preparation Modules", 
                  "Real-Time AI Performance Analytics"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 group">
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground/75 font-medium group-hover:text-foreground/90 transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right content - Mathematical Logo */}
            <div 
              className="relative order-first lg:order-last"
              style={{ transform: `translateY(${scrollY * -0.05}px)` }}
            >
              <MathematicalLogo />
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
      <section id="features" className="py-28 md:py-40 relative">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${(scrollY - 800) * 0.1}px)` }}
        >
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[180px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[180px]" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-5 block text-glow">Features</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-7 tracking-tight">
              Powered by <span className="gradient-text text-glow">Advanced AI</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Our intelligent platform understands how you learn, what drives you, 
              and creates a personalized experience that evolves with your journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
            {[
              {
                icon: Brain,
                title: "Personalized AI Learning",
                description: "Advanced AI that adapts to your unique learning style, pace, and interests—creating a truly individualized educational journey."
              },
              {
                icon: Target,
                title: "Smart Performance Tracker",
                description: "Go beyond standard metrics. Track growth across multiple dimensions including conceptual understanding, problem-solving speed, and critical thinking."
              },
              {
                icon: Sparkles,
                title: "Passion-Driven Learning",
                description: "Learn through topics you love. Our AI connects curriculum to your interests, making education engaging and meaningful."
              },
              {
                icon: TrendingUp,
                title: "Advanced Analytics",
                description: "Deep insights into your learning patterns, strengths, and areas for growth with predictive performance modeling."
              },
              {
                icon: BookOpen,
                title: "Indexed Knowledge System",
                description: "Intelligent content organization that maps relationships between concepts, enabling efficient learning and quick recall."
              },
              {
                icon: Zap,
                title: "Real-Time Adaptation",
                description: "Dynamic difficulty adjustment and instant feedback that keeps you in the optimal learning zone at all times."
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                variant="glass-glow"
                className="group bg-card/40 hover:border-primary/50 transition-all duration-500 card-hover-lift"
              >
                <CardContent className="p-8 md:p-9">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-7 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300 glow-primary">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground/95 group-hover:text-glow transition-all">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-28 md:py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-1/20 via-transparent to-surface-1/20" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
            <span className="text-accent text-sm font-semibold uppercase tracking-widest mb-5 block">Process</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-7 tracking-tight">
              How <span className="gradient-text text-glow">AlterLabs</span> Works
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Start your personalized learning journey in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-20 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Discover Your Profile",
                description: "Complete an AI-powered assessment that identifies your learning style, interests, strengths, and passions to create your unique learner profile."
              },
              {
                step: "02",
                title: "Get Personalized Insights",
                description: "Access your custom dashboard with advanced analytics, performance tracking beyond standard metrics, and an indexed knowledge map."
              },
              {
                step: "03",
                title: "Learn & Excel",
                description: "Follow your AI-curated learning path that adapts in real-time, connecting to your interests while ensuring mastery of core concepts."
              }
            ].map((item, index) => (
              <div key={index} className="relative group text-center md:text-left">
                <div className="text-7xl md:text-8xl font-black gradient-text opacity-25 group-hover:opacity-50 transition-opacity duration-500 mb-5 text-glow">
                  {item.step}
                </div>
                <div className="relative -mt-12 md:-mt-14">
                  <h3 className="text-2xl font-semibold mb-5 text-foreground/95 group-hover:text-glow transition-all">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                {index < 2 && (
                  <ChevronRight className="hidden md:block absolute top-10 -right-10 w-12 h-12 text-primary/40 group-hover:text-primary/60 transition-colors" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section id="students" className="py-28 md:py-40 relative overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${(scrollY - 2400) * 0.1}px)` }}
        >
          <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[220px]" />
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[180px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            {/* Visual element */}
            <div className="relative order-last lg:order-first">
              <div className="relative w-full max-w-md mx-auto aspect-square">
                {/* Decorative rings with glow */}
                <div className="absolute inset-0 rounded-full border border-primary/15 animate-spin-slow glow-primary" style={{ animationDuration: '30s' }} />
                <div className="absolute inset-8 rounded-full border border-accent/15 animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
                <div className="absolute inset-16 rounded-full border border-secondary/15 animate-spin-slow" style={{ animationDuration: '25s' }} />
                
                {/* Central glowing orb */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-56 h-56 md:w-72 md:h-72 rounded-full gradient-primary opacity-25 blur-3xl animate-breathe" />
                  <div className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full glass-premium flex items-center justify-center shadow-xl shadow-primary/20">
                    <GraduationCap className="w-18 h-18 md:w-22 md:h-22 text-primary" />
                  </div>
                </div>
                
                {/* Floating stats with enhanced styling */}
                <div className="absolute top-10 right-0 glass-premium rounded-xl px-5 py-4 animate-float shadow-lg shadow-primary/10" style={{ animationDelay: '0s' }}>
                  <div className="text-2xl font-bold gradient-text text-glow">15K+</div>
                  <div className="text-xs text-muted-foreground">Active Learners</div>
                </div>
                <div className="absolute bottom-20 left-0 glass-premium rounded-xl px-5 py-4 animate-float shadow-lg shadow-accent/10" style={{ animationDelay: '1s' }}>
                  <div className="text-2xl font-bold gradient-text text-glow">92%</div>
                  <div className="text-xs text-muted-foreground">Avg. Score Boost</div>
                </div>
                <div className="absolute bottom-0 right-10 glass-premium rounded-xl px-5 py-4 animate-float shadow-lg shadow-secondary/10" style={{ animationDelay: '2s' }}>
                  <div className="text-2xl font-bold gradient-text text-glow">50K+</div>
                  <div className="text-xs text-muted-foreground">Practice Qs</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-9 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium text-sm border border-accent/25 shadow-lg shadow-accent/10">
                <GraduationCap className="w-4 h-4 text-accent" />
                <span className="text-foreground/90 font-medium">Trusted by 15,000+ Indian Students</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Built for <span className="gradient-text text-glow">Excellence</span>{' '}
                in Indian Education
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                From <span className="text-foreground/95 font-semibold">Class 6 through Class 12</span> across CBSE, ICSE, and major state boards, 
                to comprehensive <span className="text-foreground/95 font-semibold">JEE Main, JEE Advanced, and NEET</span> preparation—AlterLabs provides 
                curriculum-aligned AI tutoring with <span className="text-foreground/95">real-time doubt resolution</span> and predictive exam analytics.
              </p>

              <div className="space-y-6">
                {[
                  "50,000+ practice questions across Mathematics, Physics, Chemistry, Biology",
                  "Multi-dimensional tracking: Speed, Accuracy, Conceptual Depth, Application Ability",
                  "Interactive knowledge graphs connecting 10,000+ NCERT and competitive exam concepts",
                  "Personalized weak-area reinforcement with adaptive difficulty progression"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 justify-center lg:justify-start group">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">
                      <CheckCircle2 className="w-4.5 h-4.5 text-primary-foreground" />
                    </div>
                    <span className="text-foreground/90 text-lg group-hover:text-foreground transition-colors">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button variant="glow-pulse" size="xl" className="group shadow-xl shadow-primary/30">
                  Explore Learning Paths
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 md:py-40 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] h-[800px] md:h-[1200px] bg-primary/3 rounded-full blur-[250px]" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="glass-premium rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/10">
              {/* Decorative elements with glow */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/15 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-7 tracking-tight">
                  Accelerate Your Academic{' '}
                  <span className="gradient-text text-glow-intense">Success Journey</span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                  Join <span className="text-foreground/95 font-semibold">15,000+ students</span> already using AlterLabs to excel in their studies. 
                  Get access to AI-powered tutoring, <span className="text-foreground/95">personalized study plans</span>, and 
                  comprehensive performance analytics designed specifically for Indian curricula and competitive exams.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <Button variant="glow-pulse" size="xl" className="group shadow-xl shadow-primary/30">
                    Start 14-Day Free Trial
                    <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </Button>
                  <Button variant="neon" size="xl">
                    Schedule Demo
                  </Button>
                </div>

                <p className="mt-10 text-sm text-muted-foreground">
                  No credit card required • Cancel anytime • Full access to all features during trial
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 md:py-24 border-t border-border/50 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-surface-1/30 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-14">
            <div className="space-y-6 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25 glow-primary">
                  <Brain className="w-5.5 h-5.5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold gradient-text text-glow">AlterLabs</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Transforming education through AI-powered personalized learning 
                experiences for students across India.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-foreground/95">Product</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><button className="hover:text-primary hover:text-glow transition-all duration-300">Features</button></li>
                <li><button className="hover:text-primary hover:text-glow transition-all duration-300">Pricing</button></li>
                <li><button className="hover:text-primary hover:text-glow transition-all duration-300">For Schools</button></li>
                <li><button className="hover:text-primary hover:text-glow transition-all duration-300">For Teachers</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-foreground/95">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><button className="hover:text-primary hover:text-glow transition-all duration-300">About Us</button></li>
                <li><button className="hover:text-primary hover:text-glow transition-all duration-300">Blog</button></li>
                <li><button className="hover:text-primary hover:text-glow transition-all duration-300">Careers</button></li>
                <li><button className="hover:text-primary hover:text-glow transition-all duration-300">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-foreground/95">Legal</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><button className="hover:text-primary hover:text-glow transition-all duration-300">Privacy Policy</button></li>
                <li><button className="hover:text-primary hover:text-glow transition-all duration-300">Terms of Service</button></li>
                <li><button className="hover:text-primary hover:text-glow transition-all duration-300">Cookie Policy</button></li>
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-5">
            <p className="text-sm text-muted-foreground">
              © 2025 AlterLabs. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <span className="text-primary text-lg animate-pulse">♥</span>
              <span>in India</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
