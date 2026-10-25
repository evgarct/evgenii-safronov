import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroBackground } from "./hero-background";

const meta = {
  title: "Editorial/Hero background",
  component: HeroBackground,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <section className="relative isolate h-[480px] overflow-hidden">
        <Story />
        <div className="page-shell flex h-full flex-col justify-end pb-12">
          <p className="eyebrow">Staff Product Designer · Design Systems</p>
          <h2 className="font-heading text-6xl font-medium tracking-tight">
            Evgenii Safronov
            <span className="text-primary">.</span>
          </h2>
        </div>
      </section>
    ),
  ],
} satisfies Meta<typeof HeroBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

// Tints from the active theme (toolbar: light, dark, OLED). Without WebGPU or with
// prefers-reduced-motion the canvas stays transparent and only the page background shows.
export const Default: Story = { args: { className: "-z-10" } };
