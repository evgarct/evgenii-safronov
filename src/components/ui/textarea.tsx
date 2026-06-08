import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-[calc(var(--control-height-md)*2)] w-full rounded-[var(--shape-control)] border border-[var(--border-default)] bg-[var(--surface-default)] px-[var(--spacing-control-md)] py-[var(--spacing-control-sm)] [font-size:var(--typography-label-size)] text-[var(--text-primary)] transition-colors [transition-duration:var(--motion-interaction-duration)] outline-none placeholder:text-[var(--text-secondary)] focus-visible:border-[var(--border-focus)] focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]/30 disabled:cursor-not-allowed disabled:bg-[var(--surface-muted)] disabled:opacity-50 aria-invalid:border-[var(--border-danger)] aria-invalid:ring-2 aria-invalid:ring-[var(--border-danger)]/20",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
