import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'glass' | 'glass-glow' | 'elevated' | 'gradient-border'
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantClasses = {
    default: "bg-card border-border",
    glass: "bg-card/50 backdrop-blur-xl border-border/40 shadow-[0_8px_32px_hsl(var(--background)/0.5)]",
    "glass-glow": `
      bg-card/50 backdrop-blur-xl border-primary/20 
      shadow-[0_0_30px_hsl(var(--primary)/0.1),0_8px_32px_hsl(var(--background)/0.5)]
      hover:border-primary/40
      hover:shadow-[0_0_40px_hsl(var(--primary)/0.15),0_12px_40px_hsl(var(--background)/0.6)]
    `,
    elevated: `
      bg-surface-2 border-border/50 
      shadow-[0_4px_16px_hsl(var(--background)/0.4),0_8px_32px_hsl(var(--background)/0.3)]
      hover:shadow-[0_8px_24px_hsl(var(--background)/0.5),0_16px_48px_hsl(var(--background)/0.4)]
    `,
    "gradient-border": `
      bg-card border-0 relative
      before:absolute before:inset-0 before:rounded-xl before:p-[1px]
      before:bg-gradient-to-br before:from-primary/50 before:via-accent/30 before:to-secondary/50
      before:-z-10 before:content-['']
    `,
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border text-card-foreground transition-all duration-300 transform-gpu",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 relative", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0 relative", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0 relative", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Interactive 3D card wrapper
const Card3D = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    intensity?: number
  }
>(({ className, intensity = 10, children, ...props }, ref) => {
  const cardRef = React.useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -intensity
    const rotateY = ((x - centerX) / centerX) * intensity
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  }
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-xl border bg-card/50 backdrop-blur-xl text-card-foreground",
        "border-border/40 shadow-[0_8px_32px_hsl(var(--background)/0.5)]",
        "transition-transform duration-200 ease-out transform-gpu",
        "hover:shadow-[0_0_40px_hsl(var(--primary)/0.15),0_16px_48px_hsl(var(--background)/0.6)]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  )
})
Card3D.displayName = "Card3D"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, Card3D }
