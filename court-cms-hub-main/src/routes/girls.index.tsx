import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, PageHeader } from "@/components/site/Shell";
import { Eyebrow } from "@/components/site/pieces";
import { useLeagues } from "@/lib/cms";

export const Route = createFileRoute("/girls/")({
  head: () => ({
    meta: [
      { title: "Girls Basketball | Neighbourhood Academy" },
      {
        name: "description",
        content: "The Girls NCL squad at Neighbourhood Academy — roster, fixtures, results and standings.",
      },
      { property: "og:title", content: "Girls Basketball | Neighbourhood Academy" },
      { property: "og:description", content: "The Girls NCL squad at Neighbourhood Academy." },
    ],
  }),
  component: GirlsHub,
});

function GirlsHub() {
  const { data: leagues = [] } = useLeagues();
  const girls = leagues.filter((l) => (l.gender ?? "").toLowerCase() === "girls");

  return (
    <Shell>
      <main>
        <PageHeader
          eyebrow="GIRLS"
          title="Girls programme"
          intro="Our Girls NCL squad competes nationally while developing players from grassroots up."
        />
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {girls.map((l) => (
              <Link
                key={l.id}
                to="/girls/ncl"
                className="group glass overflow-hidden rounded-2xl border border-border p-6 transition-shadow hover:glow"
              >
                <Eyebrow>GIRLS · {(l.name ?? "").toUpperCase()}</Eyebrow>
                <h2 className="mt-2 text-3xl">{l.name}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{l.description}</p>
                <span className="mt-4 inline-block font-mono text-[11px] tracking-widest group-hover:text-accent">
                  VIEW TEAM →
                </span>
              </Link>
            ))}
            {girls.length === 0 && <p className="text-sm text-muted-foreground">Coming soon.</p>}
          </div>
        </section>
      </main>
    </Shell>
  );
}
