import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "About" };

const principles = [
  ["Make the model visible", "Interfaces should help people understand what the system knows and what it will do next."],
  ["Prefer useful constraints", "A smaller, explicit surface is usually easier to operate, test, and trust."],
  ["Ship the whole state space", "Loading, empty, error, and recovery paths are product work, not cleanup."],
];

const highlights = [
  [
    "Wrike",
    "Staff Product Designer, Design Systems · 2020–present",
    "Built a token-driven design system spanning two brand-wide redesigns, with documentation clear enough for AI tools to use it directly.",
  ],
  [
    "Wrike",
    "Front-End Developer, Accessible UI · 2014–2020",
    "Led WCAG AA remediation across 90%+ of the product's UI and built a 6-person accessible-UI team.",
  ],
  [
    "10+ years",
    "Design systems + front-end engineering",
    "Moving fluidly between Figma and code — the full history is on the resume page.",
  ],
] as const;

export default function AboutPage() {
  return (
    <div className="page-shell py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="eyebrow">About</p>
          <p className="mt-6 max-w-sm text-sm leading-6 text-muted-foreground">
            Evgenii, or Eugene when that is easier. Based in Prague, working
            on design systems, accessible interfaces, and the tooling that
            lets AI build production UI on solid foundations.
          </p>
        </div>
        <div>
          <h1 className="font-heading max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
            I build the systems that let good design scale — by hand and
            with AI.
          </h1>
          <div className="mt-16 grid gap-10 border-t pt-10 sm:grid-cols-2">
            <p className="text-lg leading-8 text-foreground/75">
              I&apos;m a Staff Product Designer at Wrike, where I own a
              token-driven design system used by 20+ designers and
              developers. My work sits between product thinking and
              implementation: components, patterns, documentation, and the
              accessibility work that makes all of it trustworthy.
            </p>
            <p className="text-lg leading-8 text-foreground/75">
              Lately that means preparing design systems for AI tool
              integration — living documentation, machine-readable tokens,
              and MCP-based workflows that let agents generate interfaces
              that stay on-system instead of drifting from it.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 grid gap-8 border-t pt-10 lg:grid-cols-[0.75fr_1.25fr]">
        <p className="eyebrow">Experience</p>
        <div>
          {highlights.map(([org, role, body], index) => (
            <div key={`${org}-${role}`} className="grid gap-4 border-b py-8 sm:grid-cols-[3rem_1fr_1.3fr]">
              <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              <div>
                <h2 className="text-xl font-medium">{org}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{role}</p>
              </div>
              <p className="leading-7 text-muted-foreground">{body}</p>
            </div>
          ))}
          <Link
            href={siteConfig.resumeHref}
            className="editorial-link mt-8 inline-flex items-center gap-1 text-sm font-medium"
          >
            Full experience &amp; resume <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>

      <div className="mt-24 grid gap-8 border-t pt-10 lg:grid-cols-[0.75fr_1.25fr]">
        <p className="eyebrow">Principles</p>
        <div>
          {principles.map(([title, body], index) => (
            <div key={title} className="grid gap-4 border-b py-8 sm:grid-cols-[3rem_1fr_1.3fr]">
              <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              <h2 className="text-xl font-medium">{title}</h2>
              <p className="leading-7 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 flex flex-col gap-4 border-y py-10 sm:flex-row sm:items-end sm:justify-between">
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-heading group flex items-center gap-3 text-4xl font-medium tracking-tight transition-colors hover:text-primary sm:text-6xl"
        >
          Start a conversation
          <ArrowUpRight className="size-8 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:size-10" />
        </a>
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noreferrer"
          className="editorial-link text-sm font-medium"
        >
          Connect on LinkedIn
        </a>
      </div>
    </div>
  );
}
