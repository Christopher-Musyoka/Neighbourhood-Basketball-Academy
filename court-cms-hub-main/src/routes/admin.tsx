import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { Shell, PageHeader } from "@/components/site/Shell";
import { CrudManager, type CrudConfig } from "@/components/admin/CrudManager";
import { useAdminSession, useAdminTable } from "@/lib/admin";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin dashboard | Neighbourhood Academy" },
      {
        name: "description",
        content:
          "Manage Neighbourhood Academy teams, players, fixtures, standings, pictures, events and site content.",
      },
      { property: "og:title", content: "Admin dashboard | Neighbourhood Academy" },
      { property: "og:description", content: "Manage academy content without touching code." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { ready, userId, email, isAdmin } = useAdminSession();
  const { data: leagues = [] } = useAdminTable("leagues", { column: "sort_order" });
  const { data: teams = [] } = useAdminTable("teams", { column: "name" });
  const { data: seasons = [] } = useAdminTable("seasons", { column: "name" });
  const [tab, setTab] = useState("teams");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changing, setChanging] = useState(false);

  const leagueOptions = useMemo(
    () => leagues.map((l) => ({ value: l.id, label: l.name })),
    [leagues],
  );
  const teamOptions = useMemo(() => teams.map((t) => ({ value: t.id, label: t.name })), [teams]);
  const seasonOptions = useMemo(() => seasons.map((s) => ({ value: s.id, label: s.name })), [seasons]);

  const sections: { key: string; label: string; config: CrudConfig }[] = useMemo(
    () => [
      {
        key: "teams",
        label: "Teams",
        config: {
          table: "teams",
          title: "Teams",
          description: "Add a team and choose its category (NCL, NBA or Girls).",
          order: { column: "name" },
          defaults: { active: true, gender: "Boys" },
          listColumns: ["name", "league_id", "gender", "active"],
          fields: [
            { name: "name", label: "Team name", required: true },
            { name: "league_id", label: "Category", type: "select", options: leagueOptions },
            {
              name: "gender",
              label: "Gender",
              type: "select",
              options: [
                { value: "Boys", label: "Boys" },
                { value: "Girls", label: "Girls" },
              ],
            },
            { name: "season_id", label: "Season", type: "select", options: seasonOptions },
            { name: "description", label: "Description", type: "textarea" },
            { name: "image_url", label: "Team picture", type: "image" },
            { name: "active", label: "Active", type: "checkbox" },
          ],
        },
      },
      {
        key: "players",
        label: "Players",
        config: {
          table: "players",
          title: "Players",
          order: { column: "name" },
          defaults: { active: true },
          listColumns: ["name", "team_id", "jersey_number", "position", "active"],
          fields: [
            { name: "name", label: "Player name", required: true },
            { name: "team_id", label: "Team", type: "select", options: teamOptions },
            { name: "league_id", label: "Category", type: "select", options: leagueOptions },
            { name: "jersey_number", label: "Jersey number", type: "number" },
            { name: "position", label: "Position" },
            { name: "height", label: "Height" },
            { name: "date_of_birth", label: "Date of birth", type: "date" },
            { name: "photo_url", label: "Photo", type: "image" },
            { name: "biography", label: "Biography", type: "textarea" },
            { name: "active", label: "Active", type: "checkbox" },
          ],
        },
      },
      {
        key: "coaches",
        label: "Coaches",
        config: {
          table: "coaches",
          title: "Coaches",
          order: { column: "name" },
          defaults: { active: true },
          listColumns: ["name", "team_id", "role", "active"],
          fields: [
            { name: "name", label: "Coach name", required: true },
            { name: "team_id", label: "Team", type: "select", options: teamOptions },
            { name: "league_id", label: "Category", type: "select", options: leagueOptions },
            { name: "role", label: "Role" },
            { name: "photo_url", label: "Photo", type: "image" },
            { name: "biography", label: "Biography", type: "textarea" },
            { name: "active", label: "Active", type: "checkbox" },
          ],
        },
      },
      {
        key: "fixtures",
        label: "Fixtures",
        config: {
          table: "fixtures",
          title: "Fixtures",
          description: "Home/away team, category, date, time and venue.",
          order: { column: "match_date" },
          defaults: { home_away: "Home", status: "Scheduled" },
          listColumns: ["match_date", "team_id", "opponent", "league_id", "venue"],
          fields: [
            { name: "team_id", label: "Academy team", type: "select", options: teamOptions },
            { name: "opponent", label: "Opponent team", required: true },
            {
              name: "home_away",
              label: "Home or away",
              type: "select",
              options: [
                { value: "Home", label: "Home" },
                { value: "Away", label: "Away" },
              ],
            },
            { name: "league_id", label: "Category", type: "select", options: leagueOptions },
            { name: "season_id", label: "Season", type: "select", options: seasonOptions },
            { name: "match_date", label: "Date", type: "date", required: true },
            { name: "match_time", label: "Time", placeholder: "e.g. 4:00 PM" },
            { name: "venue", label: "Venue" },
            { name: "competition", label: "Competition" },
            {
              name: "status",
              label: "Status",
              type: "select",
              options: [
                { value: "Scheduled", label: "Scheduled" },
                { value: "Postponed", label: "Postponed" },
                { value: "Cancelled", label: "Cancelled" },
              ],
            },
          ],
        },
      },
      {
        key: "results",
        label: "Results",
        config: {
          table: "results",
          title: "Results",
          order: { column: "match_date", ascending: false },
          defaults: { home_away: "Home", status: "Final" },
          listColumns: ["match_date", "team_id", "opponent", "our_score", "opponent_score"],
          fields: [
            { name: "team_id", label: "Academy team", type: "select", options: teamOptions },
            { name: "opponent", label: "Opponent team", required: true },
            { name: "our_score", label: "Our score", type: "number" },
            { name: "opponent_score", label: "Opponent score", type: "number" },
            {
              name: "home_away",
              label: "Home or away",
              type: "select",
              options: [
                { value: "Home", label: "Home" },
                { value: "Away", label: "Away" },
              ],
            },
            { name: "league_id", label: "Category", type: "select", options: leagueOptions },
            { name: "season_id", label: "Season", type: "select", options: seasonOptions },
            { name: "match_date", label: "Date", type: "date", required: true },
            { name: "competition", label: "Competition" },
            { name: "report", label: "Match report", type: "textarea" },
          ],
        },
      },
      {
        key: "standings",
        label: "Standings & points",
        config: {
          table: "standings",
          title: "Standings & points",
          order: { column: "position" },
          defaults: { position: 1, played: 0, won: 0, lost: 0, points: 0, points_for: 0, points_against: 0 },
          listColumns: ["team_name", "league_id", "position", "played", "won", "lost", "points"],
          fields: [
            { name: "team_name", label: "Team name", required: true },
            { name: "league_id", label: "Category", type: "select", options: leagueOptions },
            { name: "season_id", label: "Season", type: "select", options: seasonOptions },
            { name: "position", label: "Position", type: "number" },
            { name: "played", label: "Played", type: "number" },
            { name: "won", label: "Won", type: "number" },
            { name: "lost", label: "Lost", type: "number" },
            { name: "points", label: "Points", type: "number" },
            { name: "points_for", label: "Points for", type: "number" },
            { name: "points_against", label: "Points against", type: "number" },
            { name: "is_academy", label: "Neighbourhood team", type: "checkbox" },
          ],
        },
      },
      {
        key: "gallery",
        label: "Pictures",
        config: {
          table: "gallery",
          title: "Pictures",
          description: "Upload, retitle or remove photos shown in the gallery.",
          order: { column: "sort_order" },
          defaults: { category: "main", featured: false, sort_order: 0 },
          listColumns: ["image_url", "caption", "category", "sort_order"],
          fields: [
            { name: "image_url", label: "Picture", type: "image", required: true },
            { name: "caption", label: "Title / caption" },
            { name: "alt_text", label: "Alt text" },
            { name: "category", label: "Category" },
            { name: "league_id", label: "Category (league)", type: "select", options: leagueOptions },
            { name: "featured", label: "Featured", type: "checkbox" },
            { name: "sort_order", label: "Sort order", type: "number" },
          ],
        },
      },
      {
        key: "events",
        label: "Events",
        config: {
          table: "events",
          title: "Events",
          description: "Events are managed here even though they are not shown on the main page.",
          order: { column: "event_date" },
          listColumns: ["name", "event_date", "location", "category"],
          fields: [
            { name: "name", label: "Event name", required: true },
            { name: "event_date", label: "Date", type: "date", required: true },
            { name: "event_time", label: "Time" },
            { name: "location", label: "Location" },
            { name: "category", label: "Category" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "image_url", label: "Picture", type: "image" },
          ],
        },
      },
      {
        key: "content_blocks",
        label: "Page content",
        config: {
          table: "content_blocks",
          title: "Page content",
          description:
            "Team Bonding, Open Trials 2026/2027, homepage intros and every other editable text block.",
          order: { column: "sort_order" },
          defaults: { page: "main", sort_order: 0 },
          listColumns: ["block_key", "page", "heading", "sort_order"],
          fields: [
            { name: "block_key", label: "Block key", required: true },
            { name: "page", label: "Page" },
            { name: "heading", label: "Heading" },
            { name: "body", label: "Body", type: "textarea" },
            { name: "image_url", label: "Picture", type: "image" },
            { name: "sort_order", label: "Sort order", type: "number" },
          ],
        },
      },
      {
        key: "news",
        label: "News",
        config: {
          table: "news",
          title: "News",
          order: { column: "published_at", ascending: false },
          defaults: { status: "published", section: "main" },
          listColumns: ["title", "section", "published_at", "status"],
          fields: [
            { name: "title", label: "Title", required: true },
            { name: "slug", label: "Slug", required: true },
            { name: "excerpt", label: "Excerpt", type: "textarea" },
            { name: "content", label: "Content", type: "textarea" },
            { name: "featured_image_url", label: "Featured picture", type: "image" },
            { name: "section", label: "Section" },
            { name: "league_id", label: "Category", type: "select", options: leagueOptions },
            { name: "author", label: "Author" },
            { name: "published_at", label: "Published", type: "date" },
            {
              name: "status",
              label: "Status",
              type: "select",
              options: [
                { value: "published", label: "Published" },
                { value: "draft", label: "Draft" },
              ],
            },
          ],
        },
      },
      {
        key: "sponsors",
        label: "Sponsors",
        config: {
          table: "sponsors",
          title: "Sponsors",
          order: { column: "sort_order" },
          defaults: { active: true, sort_order: 0 },
          listColumns: ["name", "website", "sort_order", "active"],
          fields: [
            { name: "name", label: "Sponsor name", required: true },
            { name: "logo_url", label: "Logo", type: "image" },
            { name: "website", label: "Website" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "sort_order", label: "Sort order", type: "number" },
            { name: "active", label: "Active", type: "checkbox" },
          ],
        },
      },
      {
        key: "leagues",
        label: "Categories",
        config: {
          table: "leagues",
          title: "Categories",
          order: { column: "sort_order" },
          defaults: { active: true, sort_order: 0 },
          listColumns: ["name", "slug", "gender", "active"],
          fields: [
            { name: "name", label: "Name", required: true },
            { name: "slug", label: "Slug", required: true },
            {
              name: "gender",
              label: "Gender",
              type: "select",
              options: [
                { value: "Boys", label: "Boys" },
                { value: "Girls", label: "Girls" },
              ],
            },
            { name: "description", label: "Description", type: "textarea" },
            { name: "sort_order", label: "Sort order", type: "number" },
            { name: "active", label: "Active", type: "checkbox" },
          ],
        },
      },
      {
        key: "site_settings",
        label: "Site settings",
        config: {
          table: "site_settings",
          title: "Site settings",
          description: "Academy name, logo, hero, contact details and social links.",
          listColumns: ["academy_name", "email", "phone"],
          fields: [
            { name: "academy_name", label: "Academy name" },
            { name: "logo_url", label: "Logo", type: "image" },
            { name: "hero_image_url", label: "Hero picture", type: "image" },
            { name: "hero_badge", label: "Hero badge" },
            { name: "hero_title", label: "Hero title" },
            { name: "hero_subtitle", label: "Hero subtitle", type: "textarea" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "phone", label: "Phone" },
            { name: "email", label: "Email" },
            { name: "address", label: "Address" },
            { name: "facebook_url", label: "Facebook" },
            { name: "instagram_url", label: "Instagram" },
            { name: "twitter_url", label: "X / Twitter" },
            { name: "youtube_url", label: "YouTube" },
            { name: "tiktok_url", label: "TikTok" },
            { name: "seo_title", label: "SEO title" },
            { name: "seo_description", label: "SEO description", type: "textarea" },
          ],
        },
      },
      {
        key: "contact_messages",
        label: "Inbox",
        config: {
          table: "contact_messages",
          title: "Contact inbox",
          order: { column: "created_at", ascending: false },
          listColumns: ["name", "email", "subject", "status"],
          fields: [
            { name: "name", label: "Name" },
            { name: "email", label: "Email" },
            { name: "phone", label: "Phone" },
            { name: "subject", label: "Subject" },
            { name: "message", label: "Message", type: "textarea" },
            {
              name: "status",
              label: "Status",
              type: "select",
              options: [
                { value: "new", label: "New" },
                { value: "read", label: "Read" },
                { value: "replied", label: "Replied" },
              ],
            },
          ],
        },
      },
    ],
    [leagueOptions, teamOptions, seasonOptions],
  );

  const activeSection = sections.find((s) => s.key === tab) ?? sections[0]!;

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setChanging(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
      current_password: currentPassword,
    });
    setChanging(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  if (!ready) {
    return (
      <Shell>
        <PageHeader eyebrow="ADMIN" title="Loading…" />
      </Shell>
    );
  }

  if (!userId) {
    return (
      <Shell>
        <PageHeader eyebrow="ADMIN" title="Sign in required" intro="Only academy administrators can open the dashboard." />
        <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <Link
            to="/auth"
            className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Go to sign in
          </Link>
        </div>
      </Shell>
    );
  }

  if (!isAdmin) {
    return (
      <Shell>
        <PageHeader
          eyebrow="ADMIN"
          title="No access"
          intro={`${email ?? "This account"} is not one of the two authorised administrator accounts.`}
        />
        <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              toast.success("Signed out");
            }}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <PageHeader
        eyebrow="ADMIN DASHBOARD"
        title="Manage the website"
        intro={`Signed in as ${email ?? ""}. Everything on the public site is edited here.`}
      />
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {sections.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setTab(s.key)}
              className={`rounded-md border px-3 py-1.5 font-mono text-[11px] tracking-widest ${
                tab === s.key
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label.toUpperCase()}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setTab("account")}
            className={`rounded-md border px-3 py-1.5 font-mono text-[11px] tracking-widest ${
              tab === "account"
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            ACCOUNT
          </button>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              toast.success("Signed out");
            }}
            className="ml-auto inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-semibold hover:bg-muted"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>

        {tab === "account" ? (
          <div className="glass rounded-xl border border-border p-6">
            <h2 className="font-display text-xl">Change password</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your current password, then choose a new one.
            </p>
            <form onSubmit={handleChangePassword} className="mt-4 grid max-w-md gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="current" className="text-sm font-medium text-muted-foreground">
                  Current password
                </label>
                <input
                  id="current"
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="new" className="text-sm font-medium text-muted-foreground">
                  New password
                </label>
                <input
                  id="new"
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="confirm" className="text-sm font-medium text-muted-foreground">
                  Confirm new password
                </label>
                <input
                  id="confirm"
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                disabled={changing}
                className="inline-flex justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {changing ? "Updating…" : "Update password"}
              </button>
            </form>
          </div>
        ) : (
          <CrudManager key={activeSection.key} config={activeSection.config} />
        )}
      </section>
    </Shell>
  );
}
