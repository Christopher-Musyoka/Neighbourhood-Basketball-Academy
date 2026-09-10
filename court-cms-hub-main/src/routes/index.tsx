import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import {
  Eyebrow,
  FixtureRow,
  NewsCard,
  Panel,
  ScoreRow,
} from "@/components/site/pieces";
import {
  useFixtures,
  useGallery,
  useLeagues,
  useNews,
  useResults,
  useSiteSettings,
  useSponsors,
} from "@/lib/cms";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neighbourhood Academy | Youth Basketball Club" },
      {
        name: "description",
        content:
          "Boys NBA, Boys NCL and Girls NCL basketball at Neighbourhood Academy — fixtures, results, standings, rosters and news.",
      },
      { property: "og:title", content: "Neighbourhood Academy | Youth Basketball Club" },
      {
        property: "og:description",
        content: "Fixtures, results, standings and news from Neighbourhood Academy basketball.",
      },
    ],
  }),
  component: Home,
});

const leagueRoutes: Record<string, string> = {
  "boys-nba": "/boys/nba",
  "boys-ncl": "/boys/ncl",
  "girls-ncl": "/girls/ncl",
};

function Home() {
  const { data: s } = useSiteSettings();
  const { data: leagues = [] } = useLeagues();
  const { data: fixtures = [] } = useFixtures(undefined, 5);
  const { data: results = [] } = useResults(undefined, 5);
  const { data: news = [] } = useNews(undefined, 3);
  const { data: sponsors = [] } = useSponsors();
  const { data: gallery = [] } = useGallery();

  const hero = s?.hero_image_url ?? "/starter/hero.jpg";

  return (
    <Shell>
      <main>
        <section className="relative overflow-hidden border-b border-border">
          <img
            src={hero}
            alt="Neighbourhood Academy players on court"
            className="absolute inset-0 size-full object-cover opacity-40 grayscale-[25%] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
            <Eyebrow>{(s?.hero_badge ?? "SEASON 2026 · LIVE").toUpperCase()}</Eyebrow>
            <h1 className="rise mt-4 max-w-[16ch] text-balance text-5xl leading-[0.95] tracking-tight text-glow md:text-8xl">
              {s?.hero_title ?? "Built on the hardwood."}
            </h1>
            <p className="mt-5 max-w-[55ch] text-pretty text-muted-foreground md:text-lg">
              {s?.hero_subtitle ??
                s?.description ??
                "Neighbourhood Academy develops young basketball players across Boys NBA, Boys NCL and Girls NCL."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/fixtures"
                className="glow-strong rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                See fixtures
              </Link>
              <Link
                to="/contact"
                className="glass glow rounded-md border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Join the academy
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
          <Eyebrow>PROGRAMMES</Eyebrow>
          <h2 className="mt-2 text-3xl md:text-4xl">Our teams</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {leagues.map((l) => (
              <Link
                key={l.id}
                to={leagueRoutes[l.slug] ?? "/main"}
                className="group glass overflow-hidden rounded-lg border border-border transition-all hover:border-primary/60 hover:glow"
              >
                <div className="p-6">
                  <Eyebrow>{(l.gender ?? "").toUpperCase()}</Eyebrow>
                  <h3 className="mt-2 text-2xl">{l.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{l.description}</p>
                  <span className="mt-4 inline-block font-mono text-[11px] tracking-widest group-hover:text-accent">
                    VIEW TEAM →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-14 md:grid-cols-2 md:px-8">
          <Panel>
            <Eyebrow>NEXT UP</Eyebrow>
            <div className="mt-2">
              {fixtures.length === 0 ? (
                <p className="py-6 text-sm text-muted-foreground">No fixtures scheduled.</p>
              ) : (
                fixtures.map((f) => <FixtureRow key={f.id} f={f} />)
              )}
            </div>
          </Panel>
          <Panel>
            <Eyebrow>LATEST RESULTS</Eyebrow>
            <div className="mt-2">
              {results.length === 0 ? (
                <p className="py-6 text-sm text-muted-foreground">No results yet.</p>
              ) : (
                results.map((r) => <ScoreRow key={r.id} r={r} />)
              )}
            </div>
          </Panel>
        </section>

        {news.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
            <Eyebrow>NEWSROOM</Eyebrow>
            <h2 className="mt-2 text-3xl md:text-4xl">Latest stories</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {news.map((n) => (
                <NewsCard key={n.id} n={n} />
              ))}
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
            <Eyebrow>GALLERY</Eyebrow>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                <img
                  key={g.id}
                  src={g.image_url}
                  alt={g.alt_text ?? g.caption ?? "Academy photo"}
                  loading="lazy"
                  className="aspect-square w-full rounded-lg border border-border object-cover transition-all hover:border-primary/60 hover:glow"
                />
              ))}
            </div>
            <Link to="/gallery" className="mt-4 inline-block font-mono text-[11px] tracking-widest hover:text-accent">
              ALL PHOTOS →
            </Link>
          </section>
        )}

        {sponsors.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
            <Eyebrow>PARTNERS</Eyebrow>
            <div className="mt-5 flex flex-wrap items-center gap-6">
              {sponsors.map((sp) => (
                <a
                  key={sp.id}
                  href={sp.website ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  {sp.logo_url ? (
                    <img src={sp.logo_url} alt={sp.name} loading="lazy" className="h-10 w-auto object-contain" />
                  ) : (
                    sp.name
                  )}
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </Shell>
  );
}
