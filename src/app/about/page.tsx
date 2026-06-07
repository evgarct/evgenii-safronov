import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "About" };

const principles = [
  ["Make the model visible", "Interfaces should help people understand what the system knows and what it will do next."],
  ["Prefer useful constraints", "A smaller, explicit surface is usually easier to operate, test, and trust."],
  ["Ship the whole state space", "Loading, empty, error, and recovery paths are product work, not cleanup."],
];

export default function AboutPage() {
  return (
    <div className="page-shell py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="eyebrow">About</p>
          <p className="mt-6 max-w-sm text-sm leading-6 text-muted-foreground">
            Evgenii, or Eugene when that is easier. Based in Prague and working
            across product design, frontend systems, backend services, and AI
            tooling.
          </p>
        </div>
        <div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-7xl">
            I build software from the product question down to the operational
            detail.
          </h1>
          <div className="mt-16 grid gap-10 border-t pt-10 sm:grid-cols-2">
            <p className="text-lg leading-8 text-foreground/75">
              My work sits between product thinking and implementation. I enjoy
              unclear problems, systems with real constraints, and interfaces
              where small decisions compound into a better experience.
            </p>
            <p className="text-lg leading-8 text-foreground/75">
              Current interests include agent interfaces, MCP, editorial
              systems, developer tools, and ways to make complex software feel
              calm without making it simplistic.
            </p>
          </div>
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

      <a
        href="mailto:isafronovms@gmail.com"
        className="mt-24 flex items-end justify-between border-y py-10 text-4xl font-semibold tracking-tight transition-colors hover:text-primary sm:text-6xl"
      >
        Start a conversation
        <ArrowUpRight className="size-10 sm:size-14" />
      </a>
    </div>
  );
}
