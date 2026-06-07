import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="page-shell grid min-h-[70svh] place-items-center py-20 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-6xl font-semibold tracking-tight">Not found.</h1>
        <p className="mt-4 text-muted-foreground">
          This page is missing or is no longer published.
        </p>
        <Button className="mt-8" asChild>
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
}
