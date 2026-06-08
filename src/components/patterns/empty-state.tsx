import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        "grid min-h-56 place-items-center border-y border-[var(--border-default)] px-[var(--space-4)] py-[var(--space-12)] text-center",
        className,
      )}
    >
      <div className="flex max-w-[var(--layout-container-narrow)] flex-col items-center gap-[var(--space-3)]">
        {icon ? (
          <div
            aria-hidden="true"
            className="grid size-[var(--control-height-lg)] place-items-center rounded-[var(--shape-pill)] bg-[var(--surface-muted)] text-[var(--text-secondary)]"
          >
            {icon}
          </div>
        ) : null}
        <h2 className="[font-size:var(--typography-title-size)] [font-weight:var(--typography-title-weight)] text-[var(--text-primary)]">
          {title}
        </h2>
        {description ? (
          <p className="max-w-md [font-size:var(--typography-label-size)] [line-height:var(--typography-body-line-height)] text-[var(--text-secondary)]">
            {description}
          </p>
        ) : null}
        {action ? <div className="mt-[var(--space-2)]">{action}</div> : null}
      </div>
    </section>
  );
}
