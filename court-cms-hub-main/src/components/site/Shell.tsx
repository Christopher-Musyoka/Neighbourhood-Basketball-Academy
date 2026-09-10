import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="chalk-grid pointer-events-none fixed inset-0 -z-10" />
      <SiteNav />
      {children}
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string | null;
}) {
  return (
    <header className="mx-auto max-w-7xl px-5 pb-8 pt-12 md:px-8 md:pt-16">
      <p className="font-mono text-[11px] tracking-widest text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-3 text-balance text-4xl tracking-tight md:text-6xl">{title}</h1>
      {intro && <p className="mt-4 max-w-[60ch] text-pretty text-muted-foreground">{intro}</p>}
    </header>
  );
}
