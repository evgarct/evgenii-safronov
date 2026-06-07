import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoginForm } from "@/app/admin/login/login-form";
import { authConfigured } from "@/auth";

export const metadata = { title: "Editor sign in" };

export default function AdminLoginPage() {
  return (
    <div className="page-shell grid min-h-[70svh] place-items-center py-16">
      <div className="w-full max-w-sm">
        <p className="eyebrow">Private editor</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Sign in.</h1>
        <p className="mt-3 mb-8 text-sm leading-6 text-muted-foreground">
          Access is restricted to the configured owner account.
        </p>
        {!authConfigured && (
          <Alert className="mb-5">
            <AlertTitle>GitHub authentication is not configured</AlertTitle>
            <AlertDescription>
              Add the Auth.js variables from .env.example to enable sign in.
            </AlertDescription>
          </Alert>
        )}
        <LoginForm configured={authConfigured} />
      </div>
    </div>
  );
}
