import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Shell, PageHeader } from "@/components/site/Shell";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/lib/admin";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin sign in | Neighbourhood Academy" },
      {
        name: "description",
        content: "Secure sign in for Neighbourhood Academy administrators managing the club website.",
      },
      { property: "og:title", content: "Admin sign in | Neighbourhood Academy" },
      { property: "og:description", content: "Secure sign in for academy administrators." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const input =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent";

function AuthPage() {
  const navigate = useNavigate();
  const { userId } = useAdminSession();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (userId) navigate({ to: "/admin", replace: true });
  }, [userId, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const fn =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    const { error } = await fn;
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(mode === "signin" ? "Signed in" : "Account created");
    navigate({ to: "/admin", replace: true });
  }

  return (
    <Shell>
      <PageHeader
        eyebrow="ADMINISTRATORS ONLY"
        title="Sign in"
        intro="Only the two authorised academy administrator accounts can manage website content."
      />
      <section className="mx-auto max-w-md px-5 pb-24 md:px-8">
        <form onSubmit={submit} className="glass grid gap-4 rounded-2xl border border-border p-6">
          <label className="grid gap-1.5">
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground">EMAIL</span>
            <input
              required
              type="email"
              className={input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="grid gap-1.5">
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground">PASSWORD</span>
            <input
              required
              type="password"
              className={input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            {mode === "signin" ? "Need to create the admin account?" : "Already have an account? Sign in"}
          </button>
        </form>
      </section>
    </Shell>
  );
}
