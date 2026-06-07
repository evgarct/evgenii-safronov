import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingState() {
  return (
    <div className="page-shell space-y-6 py-16">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="h-16 w-2/3" />
      <Skeleton className="h-6 w-1/2" />
      <div className="space-y-3 pt-8">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}

const meta = {
  title: "Editorial/Page states",
  component: LoadingState,
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};

export const Error: Story = {
  render: () => (
    <div className="page-shell py-16">
      <Alert variant="destructive">
        <AlertTitle>Content could not be loaded</AlertTitle>
        <AlertDescription>
          Check the Neon connection and try again.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
