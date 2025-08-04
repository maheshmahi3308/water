import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    variant?: "default" | "water" | "success" | "warning" | "destructive"
  }
>(({ className, value, variant = "default", ...props }, ref) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "water":
        return "bg-primary/20 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-primary-glow"
      case "success":
        return "bg-success/20 [&>div]:bg-success"
      case "warning":
        return "bg-warning/20 [&>div]:bg-warning"
      case "destructive":
        return "bg-destructive/20 [&>div]:bg-destructive"
      default:
        return "bg-secondary [&>div]:bg-primary"
    }
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full",
        getVariantClasses(),
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 transition-all duration-500 ease-in-out"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
