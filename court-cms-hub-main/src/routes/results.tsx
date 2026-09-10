import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, PageHeader } from "@/components/site/Shell";
import { Panel, ScoreRow } from "@/components/site/pieces";
import { FilterButton } from "./fixtures";
import { useLeagues, useResults } from "@/lib/cms";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Results | Neighbourhood Academy" },
      { name: "description", content: "Final scores and match reports from Neighbourhood Academy games." },
      { property: "og:title", content: "Results | Neighbourhood Academy" },
      { property: "og:description", content: "Final scores from Neighbourhood Academy basketball games." },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const { data: leagues = [] } = useLeagues();
  const { data: results = [] } = useResults(slug);

  return (
    <Shell>
      <main>
        <PageHeader eyebrow="SCORES" title="Results" intro="How every game finished, newest first." />
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
            {results.length === 0 ? (
              <p className="py-6 text-sm text-muted-foreground">No results published yet.</p>
            ) : (
              results.map((r) => (
                <div key={r.id}>
                  <ScoreRow r={r} />
                  {r.report && <p className="pb-4 text-sm text-muted-foreground">{r.report}</p>}
                </div>
              ))
            )}
          </Panel>
        </section>
      </main>
    </Shell>
  );
}
