import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";
import { TooltipProvider } from "../src/components/ui/tooltip";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Design system color theme",
      toolbar: {
        icon: "paintbrush",
        items: ["light", "dark", "oled"],
        dynamicTitle: true,
      },
    },
    density: {
      description: "Interface density",
      toolbar: {
        icon: "component",
        items: ["comfortable", "compact"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
    density: "comfortable",
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? "light";
      const density = context.globals.density ?? "comfortable";
      document.documentElement.dataset.theme = theme;
      document.documentElement.dataset.density = density;

      return (
        <TooltipProvider>
          <div
            data-theme={theme}
            data-density={density}
            className="min-h-screen bg-[var(--surface-default)] p-[var(--space-8)] text-[var(--text-primary)]"
          >
            <Story />
          </div>
        </TooltipProvider>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
    a11y: { test: "error" },
    backgrounds: { disable: true },
  },
};

export default preview;
