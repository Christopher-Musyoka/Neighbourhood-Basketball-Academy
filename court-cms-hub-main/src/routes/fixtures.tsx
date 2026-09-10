import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, PageHeader } from "@/components/site/Shell";
import { FixtureRow, Panel } from "@/components/site/pieces";
import { useFixtures, useLeagues } from "@/lib/cms";

export const Route = createFileRoute("/fixtures")({
  head: () => ({
    meta: [
      { title: "Fixtures | Neighbourhood Academy" },
      { name: "description", content: "Upcoming basketball fixtures for every Neighbourhood Academy squad." },
      { property: "og:title", content: "Fixtures | Neighbourhood Academy" },
      { property: "og:description", content: "Upcoming basketball fixtures for every Academy squad." },
    ],
  }),
  component: FixturesPage,
});

function FixturesPage() {
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const { data: leagues = [] } = useLeagues();
  const { data: fixtures = [] } = useFixtures(slug);

  return (
    <Shell>
      <main>
        <PageHeader eyebrow="SCHEDULE" title="Fixtures" intro="Every scheduled game across the academy." />
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <div className="mb-5 flex flex-wrap gap-2">
            <FilterButton active={!slug} onClick={() => setSlug(undefined)} label="ALL" />
            {leagues.map((l) => (
              <FilterButton
                key={l.id}
                active={slug === l.slug}
                onClick={() => setSlug(l.slug)}
                label={`${(l.gender ?? "").toUpperCase()} · ${l.name}`}
              />
            ))}
          </div>
          <Panel>
            {fixtures.length === 0 ? (
              <p className="py-6 text-sm text-muted-foreground">No fixtures scheduled.</p>
            ) : (
              fixtures.map((f) => <FixtureRow key={f.id} f={f} />)
            )}
          </Panel>
        </section>
      </main>
    </Shell>
  );
}

export function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border border-border px-3 py-2 font-mono text-[11px] tracking-widest transition-colors ${
        active ? "bg-primary text-primary-foreground" : "glass hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
}
