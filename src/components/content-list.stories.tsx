import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { ContentList } from "@/components/content-list";
import { demoContent } from "@/lib/demo-content";

const meta = {
  title: "Editorial/Content list",
  component: ContentList,
  parameters: { layout: "padded" },
  args: {
    items: demoContent.filter((item) => item.kind === "project"),
    basePath: "/projects",
  },
} satisfies Meta<typeof ContentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Moniq")).toBeInTheDocument();
    await expect(canvas.getAllByRole("link")).toHaveLength(2);
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
};

export const Empty: Story = {
  args: { items: [] },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByText("Nothing published here yet."),
    ).toBeInTheDocument();
  },
};
