import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "grid gap-[var(--space-6)] border-b border-[var(--border-default)] pb-[var(--space-8)] sm:grid-cols-[1fr_auto] sm:items-end",
        className,
      )}
    >
      <div className="max-w-[var(--layout-container-narrow)]">
        {eyebrow ? (
          <div className="mb-[var(--space-3)] [font-size:var(--typography-caption-size)] font-medium uppercase tracking-[var(--font-tracking-wide)] text-[var(--text-secondary)]">
            {eyebrow}
          </div>
        ) : null}
        <h1 className="[font-family:var(--typography-heading-family)] [font-size:var(--typography-heading-size)] [line-height:var(--typography-heading-line-height)] [font-weight:var(--typography-heading-weight)] [letter-spacing:var(--typography-heading-letter-spacing)] text-[var(--text-primary)]">
          {title}
        </h1>
        {description ? (
          <div className="mt-[var(--space-3)] max-w-[var(--layout-container-narrow)] [font-size:var(--typography-body-size)] [line-height:var(--typography-body-line-height)] text-[var(--text-secondary)]">
            {description}
          </div>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap gap-[var(--spacing-control-sm)]">
          {actions}
        </div>
      ) : null}
    </header>
  );
}
