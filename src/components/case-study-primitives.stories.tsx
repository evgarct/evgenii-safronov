import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
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

const meta = {
  title: "Editorial/Case study primitives",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Comparison: Story = {
  render: () => (
    <ComparisonPanel
      left={{
        label: "Without",
        title: "Component lookup",
        items: ["Find a dialog", "Add a destructive button"],
      }}
      right={{
        label: "With knowledge",
        title: "Complete decision",
        items: ["Explain consequences", "Include failure and recovery"],
      }}
      caption="A component answer compared with a system-level answer."
    />
  ),
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByText("Complete decision"),
    ).toBeInTheDocument();
  },
};

export const Flow: Story = {
  render: () => (
    <FlowDiagram
      steps={[
        {
          label: "Knowledge",
          description: "Structured design-system guidance.",
          status: "shipped",
        },
        {
          label: "Clients",
          description: "Point-of-work interfaces.",
          status: "experiment",
        },
        {
          label: "Distribution",
          description: "Cheaper specialized workflows.",
          status: "next",
        },
      ]}
      caption="Status-aware architecture flow."
    />
  ),
};

export const ToolRouting: Story = {
  render: () => (
    <ToolComparison
      tools={[
        {
          name: "recommend_icon",
          purpose: "Returns a semantic shortlist.",
          contextCost: "Low",
          useWhen: "The agent needs quick direction.",
        },
        {
          name: "select_icon",
          purpose: "Makes the final contextual choice.",
          contextCost: "High",
          useWhen: "The workflow contains meaningful ambiguity.",
        },
      ]}
    />
  ),
};

export const ToolTranscript: Story = {
  render: () => (
    <Transcript
      title="Anonymized trace"
      entries={[
        { speaker: "User", text: "Choose an export icon." },
        {
          speaker: "Agent",
          text: "Use Download; Save is reserved for persistence.",
          meta: "[tokens]",
        },
      ]}
    />
  ),
};

export const Metrics: Story = {
  render: () => (
    <MetricGrid
      metrics={[
        {
          label: "Token efficiency",
          value: "[metric needed]",
          note: "Tokens per resolved task.",
        },
        {
          label: "State coverage",
          value: "[metric needed]",
          note: "Required states included.",
        },
        {
          label: "Expert interruptions",
          value: "[metric needed]",
          note: "Routine questions resolved independently.",
        },
      ]}
    />
  ),
};

export const MissingEvidence: Story = {
  render: () => (
    <EvidencePlaceholder
      evidence={{
        title: "Production benchmark",
        source: "Anonymized agent traces.",
        anonymization: "Remove identifiers and proprietary names.",
        message: "Show tokens, latency, retries, and outcome.",
        format: "1600 × 1000 px transcript and comparison table.",
      }}
    />
  ),
};

export const Statuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusBadge status="shipped" />
      <StatusBadge status="experiment" />
      <StatusBadge status="next" />
    </div>
  ),
};

export const Section: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <CaseSection
      number="01"
      eyebrow="Knowledge model"
      title="Components were only one layer."
      intro="A reusable editorial section with a sticky label and clear reading hierarchy."
    >
      <p className="max-w-2xl text-lg leading-8">
        Section content remains flexible while the surrounding hierarchy stays
        consistent.
      </p>
    </CaseSection>
  ),
};

export const Mobile: Story = {
  render: Comparison.render,
  play: Comparison.play,
  globals: { viewport: { value: "mobile1", isRotated: false } },
};

export const ComparisonDark: Story = {
  render: Comparison.render,
  play: Comparison.play,
  globals: { theme: "dark" },
};

export const ComparisonOled: Story = {
  render: Comparison.render,
  play: Comparison.play,
  globals: { theme: "oled" },
};
