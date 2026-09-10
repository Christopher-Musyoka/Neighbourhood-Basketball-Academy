import { createFileRoute } from "@tanstack/react-router";
import { LeaguePage, leagueHead } from "@/components/site/LeaguePage";

export const Route = createFileRoute("/boys/nba")({
  head: leagueHead(
    "Boys NBA Team | Neighbourhood Academy",
    "Roster, fixtures, results and standings for the Neighbourhood Academy Boys NBA squad.",
  ),
  component: () => <LeaguePage slug="boys-nba" />,
});
