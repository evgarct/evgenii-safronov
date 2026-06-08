import { ArrowDown, ArrowRight, CircleDot, FileImage } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type {
  CaseStudyEvidence,
  CaseStudyMetric,
  CaseStudyStatus,
  CaseStudyStep,
  CaseStudyTool,
} from "@/lib/case-study";

const statusLabels: Record<CaseStudyStatus, string> = {
  shipped: "Shipped",
  experiment: "Experiment",
  next: "Next",
};

export function StatusBadge({ status }: { status: CaseStudyStatus }) {
  const variant =
    status === "shipped"
      ? "default"
      : status === "experiment"
        ? "secondary"
        : "outline";

  return <Badge variant={variant}>{statusLabels[status]}</Badge>;
}

export function CaseSection({
  number,
  eyebrow,
  title,
  intro,
  children,
  tone = "light",
}: {
  number: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <section
      className={cn(
        "case-section border-t py-20 sm:py-28",
        tone === "dark" && "bg-foreground text-background",
      )}
    >
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p
              className={cn(
                "font-mono text-xs uppercase tracking-[0.2em]",
                tone === "dark"
                  ? "text-background/55"
                  : "text-muted-foreground",
              )}
            >
              {number} / {eyebrow}
            </p>
          </div>
          <div>
            <h2 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
              {title}
            </h2>
            {intro ? (
              <p
                className={cn(
                  "mt-7 max-w-3xl text-pretty text-lg leading-8 sm:text-xl",
                  tone === "dark"
                    ? "text-background/70"
                    : "text-muted-foreground",
                )}
              >
                {intro}
              </p>
            ) : null}
            <div className="mt-12">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FlowDiagram({
  steps,
  direction = "horizontal",
  caption,
  inverse = false,
}: {
  steps: CaseStudyStep[];
  direction?: "horizontal" | "vertical";
  caption: string;
  inverse?: boolean;
}) {
  return (
    <figure>
      <div
        className={cn(
          "grid overflow-hidden rounded-2xl",
          inverse ? "bg-background/7" : "bg-muted/75",
          direction === "horizontal"
            ? "md:grid-flow-col md:auto-cols-fr"
            : "grid-cols-1",
        )}
      >
        {steps.map((step, index) => (
          <div
            key={step.label}
            className={cn(
              "group relative min-w-0 p-6 sm:p-7",
              index > 0 &&
                (direction === "horizontal"
                  ? "border-t md:border-t-0 md:border-l"
                  : "border-t"),
              inverse ? "border-background/15" : "border-border",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <span
                className={cn(
                  "font-mono text-xs tabular-nums",
                  inverse ? "text-background/45" : "text-muted-foreground",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {step.status ? <StatusBadge status={step.status} /> : null}
            </div>
            <p className="mt-8 text-lg font-semibold tracking-tight">
              {step.label}
            </p>
            <p
              className={cn(
                "mt-2 text-sm leading-6",
                inverse ? "text-background/60" : "text-muted-foreground",
              )}
            >
              {step.description}
            </p>
            {index < steps.length - 1 ? (
              direction === "horizontal" ? (
                <ArrowRight
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1/2 -right-3 hidden size-6 -translate-y-1/2 rounded-full p-1 md:block",
                    inverse
                      ? "bg-background text-foreground"
                      : "bg-foreground text-background",
                  )}
                />
              ) : (
                <ArrowDown
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-3 left-7 size-6 rounded-full p-1",
                    inverse
                      ? "bg-background text-foreground"
                      : "bg-foreground text-background",
                  )}
                />
              )
            ) : null}
          </div>
        ))}
      </div>
      <figcaption
        className={cn(
          "mt-4 text-sm leading-6",
          inverse ? "text-background/55" : "text-muted-foreground",
        )}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

export function ComparisonPanel({
  left,
  right,
  caption,
}: {
  left: { label: string; title: string; items: string[] };
  right: { label: string; title: string; items: string[] };
  caption: string;
}) {
  return (
    <figure>
      <div className="grid overflow-hidden rounded-2xl bg-muted/75 md:grid-cols-2">
        {[left, right].map((side, index) => (
          <div
            key={side.label}
            className={cn("p-7 sm:p-9", index === 1 && "border-t md:border-t-0 md:border-l")}
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {side.label}
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">
              {side.title}
            </h3>
            <ul className="mt-7 flex flex-col gap-3">
              {side.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6">
                  <CircleDot
                    aria-hidden="true"
                    className="mt-1.5 size-3.5 shrink-0 text-primary"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-sm leading-6 text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

export function ToolComparison({ tools }: { tools: CaseStudyTool[] }) {
  return (
    <div className="border-y">
      {tools.map((tool, index) => (
        <div
          key={tool.name}
          className="grid gap-5 py-7 sm:grid-cols-[0.9fr_1.3fr_0.5fr_1fr] sm:items-start"
        >
          <div>
            <span className="font-mono text-xs text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 font-mono text-sm font-semibold text-primary">
              {tool.name}
            </p>
          </div>
          <p className="text-sm leading-6">{tool.purpose}</p>
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
              Context cost
            </p>
            <p className="mt-2 text-sm font-medium">{tool.contextCost}</p>
          </div>
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
              Use when
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {tool.useWhen}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Transcript({
  title,
  entries,
}: {
  title: string;
  entries: { speaker: string; text: string; meta?: string }[];
}) {
  return (
    <figure className="overflow-hidden rounded-2xl bg-[var(--surface-inverse)] text-[var(--text-inverse)] shadow-sm">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-6 py-4">
        <p className="font-mono text-xs uppercase tracking-[0.18em] opacity-65">
          {title}
        </p>
        <div aria-hidden="true" className="flex gap-1.5">
          <span className="size-2 rounded-full bg-current opacity-15" />
          <span className="size-2 rounded-full bg-current opacity-15" />
          <span className="size-2 rounded-full bg-primary" />
        </div>
      </div>
      <div className="divide-y divide-[var(--border-subtle)]">
        {entries.map((entry, index) => (
          <div
            key={`${entry.speaker}-${index}`}
            className="grid gap-3 px-6 py-5 sm:grid-cols-[7rem_1fr_auto]"
          >
            <p className="font-mono text-xs opacity-65">{entry.speaker}</p>
            <p className="text-sm leading-6 opacity-85">{entry.text}</p>
            {entry.meta ? (
              <p className="font-mono text-xs tabular-nums opacity-65">
                {entry.meta}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </figure>
  );
}

export function MetricGrid({ metrics }: { metrics: CaseStudyMetric[] }) {
  return (
    <div className="grid border-y sm:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className={cn(
            "py-7 sm:p-7",
            index > 0 && "border-t sm:border-t-0",
            index % 2 === 1 && "sm:border-l",
            index >= 2 && "sm:border-t",
            index % 3 !== 0 && "xl:border-l",
            index >= 3 && "xl:border-t",
          )}
        >
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
            {metric.label}
          </p>
          <p className="mt-5 text-2xl font-semibold tracking-tight tabular-nums">
            {metric.value}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {metric.note}
          </p>
        </div>
      ))}
    </div>
  );
}

export function EvidencePlaceholder({
  evidence,
}: {
  evidence: CaseStudyEvidence;
}) {
  return (
    <figure className="rounded-2xl border border-dashed bg-background/60 p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted">
          <FileImage aria-hidden="true" className="size-5 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold">{evidence.title}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {evidence.message}
          </p>
        </div>
      </div>
      <Separator className="my-6" />
      <dl className="grid gap-5 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
            Required source
          </dt>
          <dd className="mt-2 leading-6">{evidence.source}</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
            Anonymization
          </dt>
          <dd className="mt-2 leading-6">{evidence.anonymization}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
            Recommended format
          </dt>
          <dd className="mt-2 leading-6">{evidence.format}</dd>
        </div>
      </dl>
    </figure>
  );
}
