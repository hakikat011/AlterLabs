import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform-gpu",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted hover:border-primary/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        glow: `
          bg-primary text-primary-foreground 
          hover:shadow-[0_0_30px_hsl(var(--primary)/0.5),0_0_60px_hsl(var(--primary)/0.3)] 
          hover:scale-105 
          active:scale-100
          transition-all duration-300
        `,
        "glow-pulse": `
          bg-primary text-primary-foreground 
          shadow-[0_0_20px_hsl(var(--primary)/0.3),0_0_40px_hsl(var(--primary)/0.2)]
          hover:shadow-[0_0_30px_hsl(var(--primary)/0.5),0_0_60px_hsl(var(--primary)/0.3)]
          hover:scale-105
          animate-glow-pulse
        `,
        neon: `
          bg-transparent text-primary border-2 border-primary
          shadow-[0_0_10px_hsl(var(--primary)/0.5),inset_0_0_10px_hsl(var(--primary)/0.1)]
          hover:shadow-[0_0_20px_hsl(var(--primary)/0.7),0_0_40px_hsl(var(--primary)/0.4),inset_0_0_20px_hsl(var(--primary)/0.2)]
          hover:bg-primary/10
          hover:scale-105
          active:scale-100
          transition-all duration-300
        `,
        glass: `
          bg-card/60 backdrop-blur-md border border-border/50 text-foreground 
          hover:bg-card/80 hover:border-primary/30
          hover:shadow-[0_8px_32px_hsl(var(--background)/0.5)]
        `,
        "glass-glow": `
          bg-card/60 backdrop-blur-md border border-primary/20 text-foreground 
          shadow-[0_0_20px_hsl(var(--primary)/0.1)]
          hover:bg-card/80 hover:border-primary/40
          hover:shadow-[0_0_30px_hsl(var(--primary)/0.2),0_8px_32px_hsl(var(--background)/0.5)]
          hover:scale-[1.02]
        `,
        gradient: `
          bg-gradient-to-r from-primary via-accent to-secondary 
          text-primary-foreground
          hover:opacity-90
          hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]
          hover:scale-105
          active:scale-100
          background-size: 200% auto;
          transition: all 0.3s ease;
          hover:background-position: right center;
        `,
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
