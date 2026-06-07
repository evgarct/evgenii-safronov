import { Badge } from "@/components/ui/badge";
import type { ContentStatus } from "@/lib/content-types";

export function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <Badge
      variant={status === "published" ? "default" : status === "draft" ? "secondary" : "outline"}
      className="capitalize"
    >
      {status}
    </Badge>
  );
}
