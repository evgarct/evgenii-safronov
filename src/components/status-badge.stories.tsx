import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatusBadge } from "@/components/status-badge";

const meta = {
  title: "Editor/Status badge",
  component: StatusBadge,
  args: { status: "draft" },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Draft: Story = {};
export const Published: Story = { args: { status: "published" } };
export const Archived: Story = { args: { status: "archived" } };
