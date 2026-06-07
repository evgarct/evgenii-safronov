"use client";

import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm({ configured }: { configured: boolean }) {
  async function signIn() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    });
  }

  return (
    <Button onClick={signIn} disabled={!configured} className="w-full">
      <Code2 />
      Continue with GitHub
    </Button>
  );
}
