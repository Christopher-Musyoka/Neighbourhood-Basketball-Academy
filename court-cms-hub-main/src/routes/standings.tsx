import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader } from "@/components/site/Shell";
import { Eyebrow, Panel, StandingsTable } from "@/components/site/pieces";
import { useLeagues, useStandings } from "@/lib/cms";

export const Route = createFileRoute("/standings")({
  head: () => ({
    meta: [
      { title: "Standings | Neighbourhood Academy" },
      { name: "description", content: "League tables for Boys NBA, Boys NCL and Girls NCL." },
      { property: "og:title", content: "Standings | Neighbourhood Academy" },
      { property: "og:description", content: "League tables for every Neighbourhood Academy squad." },
    ],
  }),
  component: StandingsPage,
});

function StandingsPage() {
  const { data: leagues = [] } = useLeagues();
  const { data: standings = [] } = useStandings();

  return (
    <Shell>
      <main>
        <PageHeader eyebrow="TABLES" title="Standings" intro="Where each squad sits in its competition." />
        <section className="mx-auto max-w-7xl space-y-8 px-5 pb-20 md:px-8">
          {leagues.map((l) => {
            const rows = standings.filter((r) => r.leagues?.slug === l.slug);
            return (
              <div key={l.id}>
                <Eyebrow>
                  {(l.gender ?? "").toUpperCase()} · {l.name}
                </Eyebrow>
                <Panel className="mt-3">
                  <StandingsTable rows={rows} />
                </Panel>
              </div>
            );
          })}
        </section>
      </main>
    </Shell>
  );
}
