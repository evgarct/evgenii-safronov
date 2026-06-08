import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-[var(--control-height-xs)] w-fit shrink-0 items-center justify-center gap-[var(--spacing-control-xs)] overflow-hidden rounded-[var(--shape-pill)] border border-transparent px-[var(--spacing-control-sm)] [font-size:var(--typography-caption-size)] [font-weight:var(--typography-label-weight)] whitespace-nowrap transition-colors focus-visible:border-[var(--border-focus)] focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]/30 aria-invalid:border-[var(--border-danger)] [&>svg]:pointer-events-none [&>svg]:size-[var(--spacing-control-lg)]!",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--action-primary)] text-[var(--action-primary-foreground)] [a]:hover:bg-[var(--action-primary-hover)]",
        secondary:
          "bg-[var(--action-secondary)] text-[var(--action-secondary-foreground)] [a]:hover:bg-[var(--action-secondary-hover)]",
        destructive:
          "bg-[var(--action-danger)] text-[var(--action-danger-foreground)] [a]:hover:bg-[var(--action-danger-hover)] [a]:hover:text-[var(--text-inverse)]",
        outline:
          "border-[var(--border-default)] text-[var(--text-primary)] [a]:hover:bg-[var(--surface-muted)]",
        ghost:
          "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]",
        link: "text-[var(--text-brand)] underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
