import { Link } from "@tanstack/react-router";
import { formatDate, type Row } from "@/lib/cms";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] tracking-widest text-muted-foreground">{children}</p>;
}

export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass rounded-2xl border border-border p-5 ${className}`}>{children}</div>
  );
}

function sides(x: Row) {
  const us = x.teams?.name ?? "Neighbourhood";
  const away = String(x.home_away ?? "Home").toLowerCase() === "away";
  return away ? { home: x.opponent, guest: us } : { home: us, guest: x.opponent };
}

export function ScoreRow({ r }: { r: Row }) {
  const win = (r.our_score ?? 0) > (r.opponent_score ?? 0);
  const draw = (r.our_score ?? 0) === (r.opponent_score ?? 0);
  const s = sides(r);
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-4 last:border-0">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">
          {s.home} <span className="text-muted-foreground">vs</span> {s.guest}
        </p>
        <p className="mt-0.5 font-mono text-[11px] tracking-widest text-muted-foreground">
          {formatDate(r.match_date)} · {r.leagues?.name ?? r.competition ?? ""}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="num text-2xl tabular-nums">
          {r.our_score}–{r.opponent_score}
        </span>
        <span
          className={`grid size-7 place-items-center rounded-md font-mono text-[11px] font-bold ${
            draw
              ? "bg-muted text-muted-foreground"
              : win
                ? "bg-accent text-accent-foreground"
                : "bg-primary text-primary-foreground"
          }`}
        >
          {draw ? "D" : win ? "W" : "L"}
        </span>
      </div>
    </div>
  );
}

export function FixtureRow({ f }: { f: Row }) {
  const s = sides(f);
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-4 last:border-0">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">
          {s.home} <span className="text-muted-foreground">vs</span> {s.guest}
        </p>
        <p className="mt-0.5 font-mono text-[11px] tracking-widest text-muted-foreground">
          {f.leagues?.name ?? f.competition ?? ""} · {f.venue ?? ""}
        </p>
      </div>
      <div className="text-right">
        <p className="num text-lg leading-none">{formatDate(f.match_date)}</p>
        <p className="mt-1 font-mono text-[11px] tracking-widest text-muted-foreground">
          {f.match_time ?? ""}
        </p>
      </div>
    </div>
  );
}

export function StandingsTable({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">No standings published yet.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-border font-mono text-[11px] tracking-widest text-muted-foreground">
            <th className="py-3 text-left font-normal">#</th>
            <th className="py-3 text-left font-normal">TEAM</th>
            <th className="py-3 text-right font-normal">P</th>
            <th className="py-3 text-right font-normal">W</th>
            <th className="py-3 text-right font-normal">L</th>
            <th className="py-3 text-right font-normal">PF</th>
            <th className="py-3 text-right font-normal">PA</th>
            <th className="py-3 text-right font-normal">PTS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.id}
              className={`border-b border-border last:border-0 ${r.is_academy ? "bg-accent/10" : ""}`}
            >
              <td className="py-3 num">{r.position}</td>
              <td className="py-3 font-semibold">
                {r.team_name}
                {r.is_academy && (
                  <span className="ml-2 rounded bg-accent px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-accent-foreground">
                    US
                  </span>
                )}
              </td>
              <td className="py-3 text-right tabular-nums">{r.played}</td>
              <td className="py-3 text-right tabular-nums">{r.won}</td>
              <td className="py-3 text-right tabular-nums">{r.lost}</td>
              <td className="py-3 text-right tabular-nums">{r.points_for}</td>
              <td className="py-3 text-right tabular-nums">{r.points_against}</td>
              <td className="py-3 text-right num">{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function NewsCard({ n }: { n: Row }) {
  return (
    <Link
      to="/news/$slug"
      params={{ slug: n.slug }}
      className="group glass block overflow-hidden rounded-2xl border border-border transition-shadow hover:glow"
    >
      {n.featured_image_url && (
        <img
          src={n.featured_image_url}
          alt={n.title}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
      <div className="p-5">
        <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
          {(n.category ?? "NEWS").toUpperCase()} · {formatDate(n.published_at)}
        </p>
        <h3 className="mt-2 text-lg leading-tight">{n.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{n.excerpt}</p>
      </div>
    </Link>
  );
}

export function PlayerCard({ p }: { p: Row }) {
  return (
    <div className="glass overflow-hidden rounded-2xl border border-border">
      {p.photo_url ? (
        <img src={p.photo_url} alt={p.name} loading="lazy" className="aspect-[4/5] w-full object-cover" />
      ) : (
        <div className="grid aspect-[4/5] w-full place-items-center bg-muted">
          <span className="num text-5xl text-muted-foreground">{p.jersey_number ?? "–"}</span>
        </div>
      )}
      <div className="p-4">
        <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
          #{p.jersey_number ?? "–"} · {(p.position ?? "").toUpperCase()}
        </p>
        <h3 className="mt-1 text-base leading-tight">{p.name}</h3>
        {p.height && <p className="mt-1 text-sm text-muted-foreground">{p.height}</p>}
      </div>
    </div>
  );
}
