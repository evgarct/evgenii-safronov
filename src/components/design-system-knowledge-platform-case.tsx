import {
  ArrowDown,
  ArrowRight,
  Braces,
  Component,
  FileText,
  GitBranch,
  MessagesSquare,
  Shapes,
  Sparkles,
} from "lucide-react";
import {
  CaseSection,
  ComparisonPanel,
  EvidencePlaceholder,
  FlowDiagram,
  MetricGrid,
  StatusBadge,
  ToolComparison,
  Transcript,
} from "@/components/case-study-primitives";
import { Separator } from "@/components/ui/separator";
import type {
  CaseStudyMetric,
  CaseStudyStep,
  CaseStudyTool,
} from "@/lib/case-study";

const maturitySteps: CaseStudyStep[] = [
  { label: "Components", description: "Reusable interface building blocks." },
  { label: "Tokens", description: "Shared visual decisions encoded as variables." },
  { label: "Documentation", description: "Guidance that explains APIs and usage." },
  { label: "Patterns", description: "Repeatable solutions to product problems." },
  { label: "Flows", description: "Complete scenarios, states, and recovery paths." },
  {
    label: "Agent-ready knowledge",
    description: "Structured judgment that software can retrieve and apply.",
  },
];

const architectureSteps: CaseStudyStep[] = [
  {
    label: "Knowledge layer",
    description: "Components, patterns, flows, principles, and exceptions.",
    status: "shipped",
  },
  {
    label: "MCP interface",
    description: "Typed access to design-system knowledge for development agents.",
    status: "shipped",
  },
  {
    label: "Point-of-work clients",
    description: "Chat and design-tool prototypes reuse the same source.",
    status: "experiment",
  },
  {
    label: "CLI and wider distribution",
    description: "Cheaper retrieval and more specialized workflows.",
    status: "next",
  },
];

const iconTools: CaseStudyTool[] = [
  {
    name: "recommend_icon",
    purpose:
      "Turns an intent such as “export data” into a short semantic candidate list.",
    contextCost: "Low",
    useWhen: "The agent needs direction but has little product context.",
  },
  {
    name: "match_icon",
    purpose:
      "Checks whether a candidate already exists and identifies the closest approved asset.",
    contextCost: "Medium",
    useWhen: "A likely symbol is known and duplication must be avoided.",
  },
  {
    name: "select_icon",
    purpose:
      "Makes a final contextual choice and returns rationale, constraints, and usage notes.",
    contextCost: "High",
    useWhen: "Meaning depends on workflow, neighboring actions, or exceptions.",
  },
];

const outcomeMetrics: CaseStudyMetric[] = [
  {
    label: "Decision quality",
    value: "[metric needed]",
    note: "First-pass design-system approval or review correction rate.",
  },
  {
    label: "Self-service speed",
    value: "[metric needed]",
    note: "Median time from a design-system question to a usable answer.",
  },
  {
    label: "Token efficiency",
    value: "[metric needed]",
    note: "Tokens per resolved task, split by tool and confidence level.",
  },
  {
    label: "State coverage",
    value: "[metric needed]",
    note: "Required default, empty, error, success, and recovery states included.",
  },
  {
    label: "Expert interruptions",
    value: "[metric needed]",
    note: "Routine questions resolved without involving a design-system owner.",
  },
  {
    label: "Feedback volume",
    value: "[metric needed]",
    note: "Structured gaps and conflicts captured from agent interactions.",
  },
];

const knowledgeLayers = [
  ["Components", "Button, dialog, navigation, form field", Component],
  ["Patterns", "Search, filtering, confirmation, progressive disclosure", Shapes],
  ["Flows", "Onboarding, creation, deletion, recovery", GitBranch],
  ["States", "Empty, loading, error, success, overflow", Sparkles],
  ["Principles", "Hierarchy, clarity, interruption cost", FileText],
  ["Exceptions", "Approved deviations and the reason they exist", Braces],
] as const;

export function DesignSystemKnowledgePlatformCase() {
  return (
    <article className="overflow-clip">
      <header className="page-shell grid min-h-[calc(100svh-4rem)] content-between gap-14 py-12 sm:py-16">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Flagship case study / 2026</p>
          <StatusBadge status="shipped" />
        </div>

        <div className="grid gap-14 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <h1 className="max-w-6xl text-balance text-[clamp(3.4rem,8.4vw,8.4rem)] font-semibold leading-[0.87] tracking-[-0.075em]">
              Transforming a Design System into a{" "}
              <span className="text-primary">Living Knowledge Platform</span>
            </h1>
            <p className="mt-9 max-w-3xl text-pretty text-xl leading-8 text-foreground/75 sm:text-2xl sm:leading-9">
              Our AI could access the entire codebase, but it still couldn’t
              make design decisions. I built a machine-readable knowledge layer
              that helps agents choose components, patterns, flows, and UX
              decisions across design and development workflows.
            </p>
          </div>

          <dl className="grid grid-cols-2 border-y text-sm lg:grid-cols-1">
            {[
              ["Role", "[Lead Product Designer]"],
              ["Focus", "Design Systems + AI"],
              ["Duration", "[duration needed]"],
              ["Outcome", "Knowledge platform"],
            ].map(([label, value], index) => (
              <div
                key={label}
                className={`py-5 ${index % 2 === 1 ? "border-l pl-5 lg:border-l-0" : "pr-5"} ${index > 0 ? "lg:border-t" : ""}`}
              >
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-2 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <div className="grid items-center gap-3 border-y py-5 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {["Documentation", "Knowledge", "Decisions"].map((label, index) => (
              <div key={label} className="contents">
                <p
                  className={`text-center font-mono text-xs uppercase tracking-[0.18em] ${index === 2 ? "text-primary" : "text-muted-foreground"}`}
                >
                  {label}
                </p>
                {index < 2 ? (
                  <>
                    <ArrowRight
                      aria-hidden="true"
                      className="hidden size-4 text-muted-foreground sm:block"
                    />
                    <ArrowDown
                      aria-hidden="true"
                      className="mx-auto size-4 text-muted-foreground sm:hidden"
                    />
                  </>
                ) : null}
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            The project was not a chatbot or a single MCP server. It was a shift
            from publishing information to operationalizing design judgment.
          </p>
        </div>
      </header>

      <CaseSection
        number="01"
        eyebrow="The gap"
        title="AI understood the code. Not the design."
        intro="The company already had an official MCP that could navigate the codebase, find components, and explain their APIs. That solved access to implementation. It did not solve design judgment."
      >
        <div className="flex flex-col gap-10">
          <p className="max-w-3xl text-pretty text-lg leading-8">
            An agent could discover that a dialog component existed, inspect
            its props, and generate valid code. It still could not tell whether
            a dialog was the right interaction, when a destructive action
            needed an extra confirmation step, what should happen after
            failure, or which exception had already been approved. Those
            answers lived across long guides, examples, review conversations,
            and the memories of design-system contributors.
          </p>
          <ComparisonPanel
            left={{
              label: "Code-aware MCP",
              title: "How to implement it",
              items: [
                "Component names and source code",
                "Properties, types, and examples",
                "Existing implementation references",
                "Technical constraints",
              ],
            }}
            right={{
              label: "Design knowledge layer",
              title: "What should be built",
              items: [
                "Patterns and complete flows",
                "Semantic rules and principles",
                "Required states and edge cases",
                "Exceptions and decision rationale",
              ],
            }}
            caption="The two systems were complementary: implementation context made answers executable; design context made them intentional."
          />
          <p className="max-w-3xl text-pretty text-lg leading-8">
            This changed the problem definition. The goal was not to duplicate
            the official MCP or build a better search box. It was to model the
            layer of knowledge that turns available components into coherent
            product decisions.
          </p>
        </div>
      </CaseSection>

      <CaseSection
        number="02"
        eyebrow="Maturity"
        title="Design systems keep evolving."
        intro="The familiar maturity story ends with documentation. In practice, documentation was only another passive layer people could ignore, misread, or never discover."
        tone="dark"
      >
        <div className="flex flex-col gap-10">
          <FlowDiagram
            steps={maturitySteps}
            direction="vertical"
            inverse
            caption="Each stage preserves the previous one, but moves the system closer to reusable judgment rather than reusable pixels."
          />
          <div className="grid gap-8 md:grid-cols-2">
            <p className="text-pretty text-lg leading-8 text-background/75">
              Components made interfaces reusable. Tokens made visual decisions
              reusable. Documentation explained how both worked. Patterns and
              flows then captured larger product decisions: not only which
              control to use, but how an entire scenario should guide a user
              through uncertainty, risk, error, and recovery.
            </p>
            <p className="text-pretty text-lg leading-8 text-background/75">
              The AI layer was the next maturity step. It adapted those assets
              for a new class of consumer: agents that need explicit,
              retrievable, bounded instructions. The design system became
              capable of participating in decisions instead of waiting for a
              person to open a documentation page.
            </p>
          </div>
        </div>
      </CaseSection>

      <CaseSection
        number="03"
        eyebrow="Knowledge model"
        title="Components were only one layer of the system."
        intro="To make design knowledge useful to agents, I separated it by the kind of decision it could support. This prevented every question from loading the entire design system into context."
      >
        <div className="grid border-y md:grid-cols-2">
          {knowledgeLayers.map(([label, example, Icon], index) => (
            <div
              key={label}
              className={`grid grid-cols-[auto_1fr] gap-5 py-7 md:p-7 ${index > 0 ? "border-t md:border-t-0" : ""} ${index % 2 === 1 ? "md:border-l" : ""} ${index >= 2 ? "md:border-t" : ""}`}
            >
              <Icon aria-hidden="true" className="mt-1 size-5 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {example}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-pretty text-lg leading-8">
          This distinction matters because a correct component can still create
          the wrong experience. A deletion journey is not solved by finding
          the destructive button. It includes consequence copy, confirmation,
          permissions, progress, failure, recovery, and the state left behind.
          Similarly, onboarding is not a collection of tooltips; it is a flow
          shaped by progressive disclosure and the user’s current level of
          context.
        </p>
      </CaseSection>

      <CaseSection
        number="04"
        eyebrow="Platform"
        title="MCP was the first interface, not the final product."
        intro="The durable asset was a shared knowledge layer. MCP exposed it to agents, while skills, chat, Figma, Slack, and a future CLI could reuse the same rules without creating new knowledge silos."
      >
        <div className="flex flex-col gap-10">
          <FlowDiagram
            steps={architectureSteps}
            caption="Current status is explicit: the core knowledge and MCP shipped; point-of-work clients were explored; lower-cost distribution remains the next platform step."
          />
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <StatusBadge status="shipped" />
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Structured design-system knowledge, typed MCP tools, and
                task-specific guidance available to development agents.
              </p>
            </div>
            <div>
              <StatusBadge status="experiment" />
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                In-context question answering for designers and team
                communication surfaces, tested as prototypes or partial flows.
              </p>
            </div>
            <div>
              <StatusBadge status="next" />
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Skills, routing instructions, evaluation suites, and a focused
                CLI to reduce repeated context and token consumption.
              </p>
            </div>
          </div>
          <p className="max-w-3xl text-pretty text-lg leading-8">
            This platform framing also reduced bus factor. Routine questions
            could be answered from approved knowledge at the point of work.
            Ambiguous or policy-level decisions could still escalate to a
            design-system owner with the relevant context attached. The system
            scaled access to expertise without pretending that every design
            decision could be automated.
          </p>
        </div>
      </CaseSection>

      <CaseSection
        number="05"
        eyebrow="Tool design"
        title="One goal. Three tools."
        intro="Icon selection exposed an important AI product-design principle: the same user goal can require different levels of certainty, context, and cost."
      >
        <div className="flex flex-col gap-10">
          <ToolComparison tools={iconTools} />
          <p className="max-w-3xl text-pretty text-lg leading-8">
            A single “find an icon” tool looked simpler, but it forced the agent
            to pay for deep context even when a lightweight semantic suggestion
            was enough. Splitting the workflow made the trade-off explicit. The
            agent could stop after a recommendation, verify that an asset
            existed, or spend more context on a final decision only when the
            product situation demanded it.
          </p>
          <Transcript
            title="Reconstructed and anonymized tool trace"
            entries={[
              {
                speaker: "User",
                text: "Choose an icon for exporting a table as CSV.",
              },
              {
                speaker: "recommend_icon",
                text: "Shortlist: Download, FileDown, Export. Exclude Save because the action creates an external file rather than persisting an in-session edit.",
                meta: "[tokens]",
              },
              {
                speaker: "match_icon",
                text: "Download already exists in the approved set. FileDown is not part of the current library.",
                meta: "[latency]",
              },
              {
                speaker: "select_icon",
                text: "Use Download. It matches the established export convention and avoids introducing a second symbol for the same intent.",
                meta: "[cost]",
              },
            ]}
          />
          <EvidencePlaceholder
            evidence={{
              title: "Real icon-tool benchmark",
              source:
                "Anonymized agent traces for comparable recommend, match, and select tasks.",
              anonymization:
                "Remove company names, repository paths, proprietary icon names, and user identifiers.",
              message:
                "Prove that specialized routes changed token use, retries, or first-pass acceptance.",
              format:
                "1600 × 1000 px transcript and a compact table covering tokens, latency, retries, and outcome.",
            }}
          />
        </div>
      </CaseSection>

      <CaseSection
        number="06"
        eyebrow="Prototyping"
        title="The highest leverage appeared before designs existed."
        intro="When an agent was implementing an existing mockup, the design system mostly improved accuracy. When no mockup existed, the knowledge layer helped shape the experience itself."
        tone="dark"
      >
        <div className="flex flex-col gap-10">
          <div className="rounded-2xl bg-background/7 p-7 sm:p-9">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-background/45">
              Starting prompt
            </p>
            <p className="mt-5 max-w-3xl text-2xl font-medium leading-9 tracking-tight">
              “Design a flow for deleting a workspace that contains active
              projects and multiple members.”
            </p>
          </div>
          <ComparisonPanel
            left={{
              label: "Component-level response",
              title: "A dialog and a red button",
              items: [
                "Finds an Alert Dialog component",
                "Adds a destructive primary action",
                "Asks the user to confirm",
                "Stops at the happy path",
              ],
            }}
            right={{
              label: "System-guided response",
              title: "A complete destructive flow",
              items: [
                "Explains impact before confirmation",
                "Checks permissions and blocking conditions",
                "Includes progress, failure, and recovery",
                "Defines the post-deletion empty or redirect state",
              ],
            }}
            caption="The difference was not visual polish. It was scenario coverage and the quality of the product decisions made before implementation."
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-background/45">
              Retrieved decision package
            </p>
            <div className="mt-5 grid border-y border-background/15 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Pattern", "Destructive action with explicit consequences"],
                ["States", "Blocked, confirming, processing, failed, complete"],
                ["Components", "Inline warning, dialog, progress, notification"],
                ["Rules", "Do not rely on color; preserve a safe exit"],
                ["Exception", "Skip re-auth only for low-risk sandbox data"],
                ["Recovery", "Explain retention and restoration policy"],
              ].map(([label, value], index) => (
                <div
                  key={label}
                  className={`py-6 sm:p-6 ${index > 0 ? "border-t border-background/15 sm:border-t-0" : ""} ${index % 2 === 1 ? "sm:border-l sm:border-background/15" : ""} ${index >= 2 ? "sm:border-t sm:border-background/15" : ""} ${index % 3 !== 0 ? "lg:border-l lg:border-background/15" : ""} ${index >= 3 ? "lg:border-t lg:border-background/15" : ""}`}
                >
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-background/45">
                    {label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-background/75">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="max-w-3xl text-pretty text-lg leading-8 text-background/75">
            This moved the design system upstream. Instead of checking
            compliance after a screen had been designed, it could guide early
            exploration: compare several visual approaches, choose an
            interaction model, identify missing states, and explain how the
            product should lead a user through the flow.
          </p>
        </div>
      </CaseSection>

      <CaseSection
        number="07"
        eyebrow="Feedback"
        title="The design system started talking back."
        intro="Traditional documentation broadcasts guidance and waits for people to report problems. Agent interactions can produce structured evidence about where that guidance succeeds, conflicts, or disappears."
      >
        <div className="flex flex-col gap-10">
          <FlowDiagram
            steps={[
              {
                label: "Interaction",
                description: "An agent applies a component, pattern, or flow.",
              },
              {
                label: "Feedback",
                description: "It records uncertainty, conflict, modification, and outcome.",
              },
              {
                label: "Pattern update",
                description: "A maintainer adds a rule, example, or approved exception.",
              },
              {
                label: "Evaluation",
                description: "With-guidance and baseline outputs are compared.",
              },
              {
                label: "Release",
                description: "Human-approved improvements return to the shared layer.",
              },
            ]}
            caption="The loop accelerates maintenance without delegating policy changes to an autonomous system."
          />
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <p className="text-pretty text-lg leading-8">
              Short feedback records could reveal questions that surveys rarely
              captured: which rule was missing, where two sources contradicted
              each other, what an agent changed after a user request, and which
              workaround repeatedly appeared. This made design-system quality
              observable at a scale that depended less on people remembering
              to send feedback.
            </p>
            <div className="border-l-2 border-primary pl-6">
              <p className="font-semibold">Human governance remains explicit.</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                AI can identify clusters, propose guidance, and run
                comparisons. Design-system owners approve changes that alter
                principles, policy, or product behavior.
              </p>
            </div>
          </div>
          <EvidencePlaceholder
            evidence={{
              title: "Feedback taxonomy and evaluation result",
              source:
                "Anonymized interaction logs plus one before-and-after guidance update.",
              anonymization:
                "Aggregate by topic and remove prompts, product names, repository identifiers, and personal data.",
              message:
                "Show one concrete case where recurring agent feedback exposed missing or conflicting design-system guidance.",
              format:
                "Two 1400 × 900 px visuals: a feedback-cluster view and a with-guidance versus baseline evaluation.",
            }}
          />
        </div>
      </CaseSection>

      <CaseSection
        number="08"
        eyebrow="Adoption"
        title="It looked like vibe coding. Then it became a standard."
        intro="The strongest resistance came from engineers who saw AI-generated design-system guidance as less trustworthy than conventional tooling. Adoption changed when the system proved that it constrained agents rather than giving them more freedom to improvise."
      >
        <div className="flex flex-col gap-10">
          <FlowDiagram
            steps={[
              {
                label: "Skepticism",
                description: "AI output was associated with generic UI and fragile code.",
              },
              {
                label: "Focused pilot",
                description: "Narrow tools answered concrete design-system questions.",
              },
              {
                label: "Visible proof",
                description: "Decisions became more consistent and easier to review.",
              },
              {
                label: "Default workflow",
                description: "The approach moved from experiment toward company standard.",
              },
            ]}
            caption="Replace this qualitative timeline with dated internal milestones before publication."
          />
          <p className="max-w-3xl text-pretty text-lg leading-8">
            The project did not remove disagreement. It made disagreement more
            useful. The system could answer established questions immediately,
            expose the source behind an answer, and escalate low-confidence or
            disputed cases. Design-system experts spent less time repeating
            settled guidance and more time deciding the situations the system
            did not yet understand.
          </p>
          <p className="max-w-3xl text-pretty text-lg leading-8">
            For design leadership, this was the larger organizational change.
            Adoption no longer depended only on training sessions, office
            hours, or individual reviewers catching the same mistakes. Approved
            guidance could travel with the work, while unresolved questions
            arrived with enough evidence to improve the system rather than
            disappear inside another one-off conversation.
          </p>
          <EvidencePlaceholder
            evidence={{
              title: "Adoption proof and team quotation",
              source:
                "Dated rollout milestones, usage records, and an approved quote from an engineer or design leader.",
              anonymization:
                "Remove names and product identifiers unless written permission is available.",
              message:
                "Substantiate the shift from resistance to routine use without overstating company-wide adoption.",
              format:
                "1600 × 700 px timeline with one short quotation and a source note.",
            }}
          />
        </div>
      </CaseSection>

      <CaseSection
        number="09"
        eyebrow="Outcomes"
        title="The platform made design-system impact measurable."
        intro="Exact production numbers still need to be cleared for publication. The measurement model is already defined, so the final case can distinguish demonstrated impact from future potential."
      >
        <MetricGrid metrics={outcomeMetrics} />
        <p className="mt-10 max-w-3xl text-pretty text-lg leading-8">
          These measures connect design-system work to decisions rather than
          page views. Documentation traffic says that someone opened a guide.
          First-pass acceptance, state coverage, token cost, escalation rate,
          and recurring conflict topics show whether the system actually
          changed how products were designed and built.
        </p>
      </CaseSection>

      <section className="border-t bg-primary text-primary-foreground">
        <div className="page-shell py-24 sm:py-32">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/65">
            10 / Reflection
          </p>
          <blockquote className="mt-8 max-w-6xl text-balance text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-7xl">
            “The design system stopped being a place people had to visit. It
            became an active participant in how products were designed and
            built.”
          </blockquote>
          <Separator className="my-10 bg-primary-foreground/25" />
          <div className="grid gap-8 md:grid-cols-2">
            <p className="max-w-2xl text-pretty text-lg leading-8 text-primary-foreground/80">
              The project expanded the role of a design-system team beyond
              components and documentation. It required knowledge architecture,
              AI tool design, routing, evaluation, observability, and governance.
              It also created a practical path for carrying the same expertise
              into engineering agents, design tools, chat, and future workflows.
            </p>
            <div className="flex items-start gap-4 md:justify-self-end">
              <MessagesSquare aria-hidden="true" className="mt-1 size-6" />
              <p className="max-w-sm text-pretty text-lg leading-8">
                The next design-system interface is not necessarily a website.
                It is the decision layer available wherever work happens.
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
