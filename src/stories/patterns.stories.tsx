import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FileQuestionIcon } from "lucide-react";
import { EmptyState, PageHeader } from "@/components/patterns";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Design System/Patterns",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageHeaderDefault: Story = {
  render: () => (
    <PageHeader
      eyebrow="Writing"
      title="Field notes"
      description="Practical notes about product engineering, interfaces, and AI systems."
      actions={<Button>New article</Button>}
    />
  ),
};

export const PageHeaderWithoutActions: Story = {
  render: () => (
    <PageHeader
      title="Projects"
      description="Selected systems and interfaces."
    />
  ),
};

export const EmptyStateDefault: Story = {
  render: () => (
    <EmptyState
      icon={<FileQuestionIcon />}
      title="No drafts yet"
      description="Create a draft when you are ready to start the next article."
      action={<Button>Create draft</Button>}
    />
  ),
};

export const EmptyStateUnavailable: Story = {
  render: () => (
    <EmptyState
      title="Content unavailable"
      description="This section could not be loaded. Try again after the connection is restored."
      action={<Button variant="outline">Try again</Button>}
    />
  ),
};
