import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[var(--shape-control)] border border-transparent bg-clip-padding [font-size:var(--typography-label-size)] [font-weight:var(--typography-label-weight)] whitespace-nowrap transition-colors [transition-duration:var(--motion-interaction-duration)] [transition-timing-function:var(--motion-interaction-easing)] outline-none select-none focus-visible:border-[var(--border-focus)] focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[var(--border-danger)] aria-invalid:ring-2 aria-invalid:ring-[var(--border-danger)]/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[var(--spacing-control-lg)]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--action-primary)] text-[var(--action-primary-foreground)] hover:bg-[var(--action-primary-hover)]",
        outline:
          "border-[var(--border-default)] bg-[var(--surface-default)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)] aria-expanded:bg-[var(--surface-muted)]",
        secondary:
          "bg-[var(--action-secondary)] text-[var(--action-secondary-foreground)] hover:bg-[var(--action-secondary-hover)] aria-expanded:bg-[var(--action-secondary)]",
        ghost:
          "text-[var(--text-primary)] hover:bg-[var(--surface-muted)] aria-expanded:bg-[var(--surface-muted)]",
        destructive:
          "bg-[var(--action-danger)] text-[var(--action-danger-foreground)] hover:bg-[var(--action-danger-hover)] hover:text-[var(--text-inverse)] focus-visible:border-[var(--border-danger)]",
        link: "text-[var(--text-brand)] underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-[var(--control-height-md)] gap-[var(--spacing-control-sm)] px-[var(--spacing-control-md)]",
        xs: "h-[var(--control-height-xs)] gap-[var(--spacing-control-xs)] px-[var(--spacing-control-sm)] [font-size:var(--typography-caption-size)]",
        sm: "h-[var(--control-height-sm)] gap-[var(--spacing-control-xs)] px-[var(--spacing-control-md)] [font-size:var(--typography-caption-size)]",
        lg: "h-[var(--control-height-lg)] gap-[var(--spacing-control-sm)] px-[var(--spacing-control-lg)]",
        icon: "size-[var(--control-height-md)]",
        "icon-xs":
          "size-[var(--control-height-xs)] [&_svg:not([class*='size-'])]:size-[var(--spacing-control-lg)]",
        "icon-sm":
          "size-[var(--control-height-sm)]",
        "icon-lg": "size-[var(--control-height-lg)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
