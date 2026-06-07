"use client";

import { Code2 } from "lucide-react";
import { signIn as authSignIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LoginForm({ configured }: { configured: boolean }) {
  async function signIn() {
    await authSignIn("github", { callbackUrl: "/admin" });
  }

  return (
    <Button onClick={signIn} disabled={!configured} className="w-full">
      <Code2 />
      Continue with GitHub
    </Button>
  );
}
