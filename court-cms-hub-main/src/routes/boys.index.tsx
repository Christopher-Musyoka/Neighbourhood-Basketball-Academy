import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, PageHeader } from "@/components/site/Shell";
import { Eyebrow } from "@/components/site/pieces";
import { useLeagues } from "@/lib/cms";

export const Route = createFileRoute("/boys/")({
  head: () => ({
    meta: [
      { title: "Boys Basketball | Neighbourhood Academy" },
      {
        name: "description",
        content: "Boys NBA and Boys NCL squads at Neighbourhood Academy — rosters, fixtures and results.",
      },
      { property: "og:title", content: "Boys Basketball | Neighbourhood Academy" },
      { property: "og:description", content: "Boys NBA and Boys NCL squads at Neighbourhood Academy." },
    ],
  }),
  component: BoysHub,
});

const routes: Record<string, string> = { "boys-nba": "/boys/nba", "boys-ncl": "/boys/ncl" };

function BoysHub() {
  const { data: leagues = [] } = useLeagues();
  const boys = leagues.filter((l) => (l.gender ?? "").toLowerCase() === "boys");

  return (
    <Shell>
      <main>
        <PageHeader
          eyebrow="BOYS"
          title="Boys programme"
          intro="Two competitive pathways: the NBA development league and the NCL competition squad."
        />
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {boys.map((l) => (
              <Link
                key={l.id}
                to={routes[l.slug] ?? "/boys"}
                className="group glass overflow-hidden rounded-2xl border border-border p-6 transition-shadow hover:glow"
              >
                <Eyebrow>BOYS · {(l.name ?? "").toUpperCase()}</Eyebrow>
                <h2 className="mt-2 text-3xl">{l.name}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{l.description}</p>
                <span className="mt-4 inline-block font-mono text-[11px] tracking-widest group-hover:text-accent">
                  VIEW TEAM →
                </span>
              </Link>
            ))}
            {boys.length === 0 && <p className="text-sm text-muted-foreground">Coming soon.</p>}
          </div>
        </section>
      </main>
    </Shell>
  );
}
