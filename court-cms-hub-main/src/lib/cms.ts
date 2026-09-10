import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * All website content is read from the database. Nothing here is hardcoded —
 * administrators change every value from the /admin dashboard.
 */

export type Row = any;

async function selectAll(table: string, order?: { column: string; ascending?: boolean }) {
  let q = supabase.from(table as any).select("*");
  if (order) q = q.order(order.column, { ascending: order.ascending ?? true });
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Row[];
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return (data ?? {}) as Row;
    },
  });
}

export function useContentBlocks(page = "main") {
  return useQuery({
    queryKey: ["content_blocks", page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_blocks")
        .select("*")
        .eq("page", page)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });
}

export function useLeagues() {
  return useQuery({ queryKey: ["leagues"], queryFn: () => selectAll("leagues", { column: "sort_order" }) });
}

export function useSponsors() {
  return useQuery({
    queryKey: ["sponsors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sponsors")
        .select("*")
        .eq("active", true)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });
}

export function useNews(section?: string, limit?: number) {
  return useQuery({
    queryKey: ["news", section ?? "all", limit ?? 0],
    queryFn: async () => {
      let q = supabase
        .from("news")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (section) q = q.eq("section", section);
      if (limit) q = q.limit(limit);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });
}

export function useGallery(category?: string) {
  return useQuery({
    queryKey: ["gallery", category ?? "all"],
    queryFn: async () => {
      let q = supabase.from("gallery").select("*").order("sort_order");
      if (category && category !== "all") q = q.eq("category", category);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });
}

export function useEvents() {
  return useQuery({ queryKey: ["events"], queryFn: () => selectAll("events", { column: "event_date" }) });
}

export function useTeams() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teams")
        .select("*, leagues(name, slug, gender)")
        .order("name");
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });
}

export function useResults(leagueSlug?: string, limit?: number) {
  return useQuery({
    queryKey: ["results", leagueSlug ?? "all", limit ?? 0],
    queryFn: async () => {
      let q = supabase
        .from("results")
        .select("*, leagues(name, slug, gender), teams(name)")
        .order("match_date", { ascending: false });
      if (limit) q = q.limit(limit);
      const { data, error } = await q;
      if (error) throw error;
      const rows = (data ?? []) as Row[];
      return leagueSlug ? rows.filter((r) => r.leagues?.slug === leagueSlug) : rows;
    },
  });
}

export function useFixtures(leagueSlug?: string, limit?: number) {
  return useQuery({
    queryKey: ["fixtures", leagueSlug ?? "all", limit ?? 0],
    queryFn: async () => {
      let q = supabase
        .from("fixtures")
        .select("*, leagues(name, slug, gender), teams(name)")
        .order("match_date", { ascending: true });
      if (limit) q = q.limit(limit);
      const { data, error } = await q;
      if (error) throw error;
      const rows = (data ?? []) as Row[];
      return leagueSlug ? rows.filter((r) => r.leagues?.slug === leagueSlug) : rows;
    },
  });
}

export function useStandings(leagueSlug?: string) {
  return useQuery({
    queryKey: ["standings", leagueSlug ?? "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("standings")
        .select("*, leagues(name, slug, gender)")
        .order("position");
      if (error) throw error;
      const rows = (data ?? []) as Row[];
      return leagueSlug ? rows.filter((r) => r.leagues?.slug === leagueSlug) : rows;
    },
  });
}

/** Everything needed to render one league page (team, coaches, players). */
export function useLeaguePage(slug: string) {
  return useQuery({
    queryKey: ["league_page", slug],
    queryFn: async () => {
      const { data: league, error: le } = await supabase
        .from("leagues")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (le) throw le;
      if (!league) return null;

      const [teams, players, coaches, season] = await Promise.all([
        supabase.from("teams").select("*").eq("league_id", league.id),
        supabase.from("players").select("*").eq("league_id", league.id).eq("active", true).order("jersey_number"),
        supabase.from("coaches").select("*").eq("league_id", league.id).eq("active", true),
        supabase.from("seasons").select("*").eq("active", true).maybeSingle(),
      ]);

      return {
        league: league as Row,
        teams: (teams.data ?? []) as Row[],
        team: (teams.data?.[0] ?? null) as Row | null,
        players: (players.data ?? []) as Row[],
        coaches: (coaches.data ?? []) as Row[],
        season: (season.data ?? null) as Row | null,
      };
    },
  });
}

export function formatDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
