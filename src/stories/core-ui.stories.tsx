import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InfoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const meta = {
  title: "Design System/Core UI",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div className="flex max-w-3xl flex-col gap-[var(--space-6)]">{children}</div>
);

export const Default: Story = {
  render: () => (
    <Stack>
      <div className="flex flex-wrap gap-[var(--spacing-control-sm)]">
        <Button>Primary action</Button>
        <Badge>Published</Badge>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="More information">
              <InfoIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Additional context</TooltipContent>
        </Tooltip>
      </div>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Design system foundation</CardTitle>
          <CardDescription>
            Semantic tokens keep themes and components aligned.
          </CardDescription>
        </CardHeader>
        <CardContent>Core content belongs in composed card regions.</CardContent>
        <CardFooter>
          <Button size="sm">Review</Button>
        </CardFooter>
      </Card>
    </Stack>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack>
      <div className="flex flex-wrap gap-[var(--spacing-control-sm)]">
        {(["default", "secondary", "outline", "ghost", "destructive", "link"] as const).map(
          (variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ),
        )}
      </div>
      <div className="flex flex-wrap gap-[var(--spacing-control-sm)]">
        {(["default", "secondary", "outline", "ghost", "destructive"] as const).map(
          (variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ),
        )}
      </div>
      <Tabs defaultValue="overview" className="max-w-xl">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="activity">Activity content</TabsContent>
      </Tabs>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack>
      <Input placeholder="Default input" aria-label="Default input" />
      <Input placeholder="Invalid input" aria-label="Invalid input" aria-invalid />
      <Input placeholder="Disabled input" aria-label="Disabled input" disabled />
      <Textarea placeholder="Write a short note" aria-label="Note" />
      <Textarea placeholder="Invalid note" aria-label="Invalid note" aria-invalid />
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish article?</DialogTitle>
            <DialogDescription>
              The article will become visible to all visitors.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>
            <Button>Publish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Stack>
  ),
};

export const ThemeShowcase: Story = {
  globals: { theme: "light" },
  render: () => (
    <div className="grid gap-[var(--space-4)] lg:grid-cols-3">
      {(["light", "dark", "oled"] as const).map((theme) => (
        <div
          key={theme}
          data-theme={theme}
          className="rounded-[var(--shape-elevated)] border border-[var(--border-default)] bg-[var(--surface-default)] p-[var(--space-6)] text-[var(--text-primary)]"
        >
          <p className="mb-[var(--space-4)] capitalize">{theme}</p>
          <Button>Action</Button>
        </div>
      ))}
    </div>
  ),
};

export const DensityShowcase: Story = {
  render: () => (
    <div className="grid gap-[var(--space-4)] sm:grid-cols-2">
      {(["comfortable", "compact"] as const).map((density) => (
        <div
          key={density}
          data-density={density}
          className="flex flex-col gap-[var(--spacing-control-sm)] rounded-[var(--shape-elevated)] border border-[var(--border-default)] p-[var(--space-6)]"
        >
          <p className="capitalize">{density}</p>
          <Input aria-label={`${density} input`} placeholder="Email address" />
          <Button>{density} action</Button>
        </div>
      ))}
    </div>
  ),
};
