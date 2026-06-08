import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-[var(--control-height-md)] w-full min-w-0 rounded-[var(--shape-control)] border border-[var(--border-default)] bg-[var(--surface-default)] px-[var(--spacing-control-md)] [font-size:var(--typography-label-size)] text-[var(--text-primary)] transition-colors [transition-duration:var(--motion-interaction-duration)] outline-none file:inline-flex file:h-[var(--control-height-xs)] file:border-0 file:bg-transparent file:[font-size:var(--typography-label-size)] file:[font-weight:var(--typography-label-weight)] placeholder:text-[var(--text-secondary)] focus-visible:border-[var(--border-focus)] focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--surface-muted)] disabled:opacity-50 aria-invalid:border-[var(--border-danger)] aria-invalid:ring-2 aria-invalid:ring-[var(--border-danger)]/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
