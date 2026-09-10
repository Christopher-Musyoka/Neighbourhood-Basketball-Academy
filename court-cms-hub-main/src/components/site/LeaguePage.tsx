import { Link } from "@tanstack/react-router";
import {
  useFixtures,
  useLeaguePage,
  useNews,
  useResults,
  useStandings,
  formatDate,
} from "@/lib/cms";
import { Shell } from "./Shell";
import {
  Eyebrow,
  FixtureRow,
  NewsCard,
  Panel,
  PlayerCard,
  ScoreRow,
  StandingsTable,
} from "./pieces";

export function LeaguePage({ slug }: { slug: string }) {
  const { data, isPending } = useLeaguePage(slug);
  const { data: fixtures = [] } = useFixtures(slug);
  const { data: results = [] } = useResults(slug);
  const { data: standings = [] } = useStandings(slug);
  const { data: news = [] } = useNews(slug, 3);

  const league = data?.league;
  const team = data?.team;
  const teams = data?.teams ?? [];
  const players = data?.players ?? [];
  const coaches = data?.coaches ?? [];
  const upcoming = fixtures.filter((f) => f.status !== "completed");
  const played = results.length;
  const won = results.filter((r) => (r.our_score ?? 0) > (r.opponent_score ?? 0)).length;

  return (
    <Shell>
      <main>
        <section className="relative overflow-hidden border-b border-border">
          {team?.image_url && (
            <img
              src={team.image_url}
              alt={team?.name ?? league?.name ?? "Team"}
              className="absolute inset-0 size-full object-cover opacity-25"
            />
          )}
          <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <Eyebrow>
              {(league?.gender ?? "").toUpperCase()} · {(league?.name ?? slug).toUpperCase()}
              {data?.season?.name ? ` · ${data.season.name}` : ""}
            </Eyebrow>
            <h1 className="rise mt-3 text-balance text-5xl tracking-tight md:text-7xl">
              {league?.name ?? (isPending ? "Loading" : "League")}
            </h1>
            <p className="mt-4 max-w-[60ch] text-pretty text-muted-foreground">
              {team?.description ?? league?.description}
            </p>

            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              {[
                { k: "PLAYED", v: played },
                { k: "WON", v: won },
                { k: "SQUAD", v: players.length },
              ].map((s) => (
                <Panel key={s.k} className="text-center">
                  <p className="num text-4xl">{s.v}</p>
                  <p className="mt-1 font-mono text-[11px] tracking-widest text-muted-foreground">
                    {s.k}
                  </p>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 md:grid-cols-2 md:px-8">
          <Panel>
            <Eyebrow>NEXT UP</Eyebrow>
            <div className="mt-2">
              {upcoming.length === 0 ? (
                <p className="py-6 text-sm text-muted-foreground">No fixtures scheduled.</p>
              ) : (
                upcoming.slice(0, 5).map((f) => <FixtureRow key={f.id} f={f} />)
              )}
            </div>
            <Link to="/fixtures" className="mt-4 inline-block font-mono text-[11px] tracking-widest hover:text-accent">
              ALL FIXTURES →
            </Link>
          </Panel>
          <Panel>
            <Eyebrow>LATEST RESULTS</Eyebrow>
            <div className="mt-2">
              {results.length === 0 ? (
                <p className="py-6 text-sm text-muted-foreground">No results yet.</p>
              ) : (
                results.slice(0, 5).map((r) => <ScoreRow key={r.id} r={r} />)
              )}
            </div>
            <Link to="/results" className="mt-4 inline-block font-mono text-[11px] tracking-widest hover:text-accent">
              ALL RESULTS →
            </Link>
          </Panel>
        </section>

        {standings.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
            <Eyebrow>LEAGUE TABLE</Eyebrow>
            <h2 className="mt-2 text-3xl md:text-4xl">Standings</h2>
            <Panel className="mt-5">
              <StandingsTable rows={standings} />
            </Panel>
          </section>
        )}

        {teams.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
            <Eyebrow>CLUBS</Eyebrow>
            <h2 className="mt-2 text-3xl md:text-4xl">Teams</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {teams.map((t) => (
                <Panel key={t.id}>
                  {t.image_url && (
                    <img
                      src={t.image_url}
                      alt={t.name}
                      loading="lazy"
                      className="mb-3 aspect-[16/10] w-full rounded-xl object-cover"
                    />
                  )}
                  <h3 className="text-base leading-tight">{t.name}</h3>
                  {t.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.description}</p>
                  )}
                </Panel>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
          <Eyebrow>ROSTER</Eyebrow>
          <h2 className="mt-2 text-3xl md:text-4xl">Squad</h2>
          {players.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Squad list coming soon.</p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
              {players.map((p) => (
                <PlayerCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </section>

        {coaches.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
            <Eyebrow>STAFF</Eyebrow>
            <h2 className="mt-2 text-3xl md:text-4xl">Coaching</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {coaches.map((c) => (
                <Panel key={c.id}>
                  <div className="flex items-center gap-4">
                    {c.photo_url && (
                      <img src={c.photo_url} alt={c.name} loading="lazy" className="size-14 rounded-xl object-cover" />
                    )}
                    <div>
                      <h3 className="text-base leading-tight">{c.name}</h3>
                      <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
                        {(c.role ?? "COACH").toUpperCase()}
                      </p>
                    </div>
                  </div>
                  {c.biography && <p className="mt-3 text-sm text-muted-foreground">{c.biography}</p>}
                </Panel>
              ))}
            </div>
          </section>
        )}

        {news.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
            <Eyebrow>TEAM NEWS</Eyebrow>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {news.map((n) => (
                <NewsCard key={n.id} n={n} />
              ))}
            </div>
          </section>
        )}
      </main>
    </Shell>
  );
}

export function leagueHead(title: string, description: string) {
  return () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  });
}

export { formatDate };
